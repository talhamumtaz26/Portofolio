import gsap from 'gsap';
import { capturePage, layoutKey, renderScale } from '../capture/capture';
import { inkParams } from '../gl/params';
import { InkRenderer, type InkFrame, type InkSource } from '../gl/renderer';
import { applyTheme, getTheme, otherTheme, type Theme } from './theme';

export interface Point {
  x: number;
  y: number;
}

const EASE = 'power3.out';
const FADE_OUT = 0.15;
const RESIZE_DEBOUNCE_MS = 250;
const SCROLL_DEBOUNCE_MS = 450;
/** CSS cross-fade used without WebGL2, with reduced motion, or before snapshots are ready. */
const CSS_FADE_S = 0.45;

/**
 * Spread shape over time. `growth`: base radius at progress 1 relative to the farthest
 * corner. `cleanupFrom`: fraction of the (linear) duration after which a uniform extra
 * reach slowly eats whatever the noise left behind, so the page is fully covered exactly
 * at the end. `cleanupReach`: that extra reach at t = 1, relative to the farthest corner.
 */
export const SPREAD = { growth: 0.7, cleanupFrom: 0.45, cleanupReach: 0.4, cleanupPow: 2 };

/** Everything needed to reproduce a transition exactly ("replay last click"). */
export interface ClickRecord {
  point: Point;
  seed: InkFrame['seed'];
  from: Theme;
}

const REPLAY_HOLD_MS = 400;

type ActiveFrame = Omit<InkFrame, 'progress' | 'radius' | 'time' | 'cleanup'>;

/**
 * Orchestrates the theme transition:
 *  1. keeps fresh snapshots of both themes on the GPU (pre-captured, re-captured on layout change)
 *  2. on toggle, covers the page with the "from" image, flips the live DOM underneath,
 *     spreads the ink, then fades the overlay away onto the already-flipped page
 *  3. if toggled mid-spread, freezes the frame on screen and spreads the next ink over it
 *  4. falls back to a CSS colour cross-fade without WebGL2 or with reduced motion
 */
export class InkTransition {
  private readonly renderer: InkRenderer | null;
  private toggleButton: HTMLButtonElement | null = null;
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  private readonly onThemeChange: (theme: Theme) => void;
  private readonly state = { progress: 0, time: 0 };
  private tween: gsap.core.Tween | null = null;
  private fade: gsap.core.Tween | null = null;
  private frame: ActiveFrame | null = null;
  private cssFadeTimer = 0;
  private replayTimer = 0;
  private scrollTimer = 0;
  private last: ClickRecord | null = null;

  private captureGen = 0;
  private capturing = false;
  private captureQueued = false;
  private resizeTimer = 0;
  private disposed = false;
  private resizeObserver: ResizeObserver | null = null;
  private readonly onResize = () => {
    this.renderer?.resize(renderScale());
    if (this.frame) this.draw();
    this.scheduleCapture(RESIZE_DEBOUNCE_MS);
  };
  private readonly onMotionPreferenceChange = () => this.scheduleCapture(0);
  private readonly onScroll = () => {
    window.clearTimeout(this.scrollTimer);
    this.scrollTimer = window.setTimeout(() => this.scheduleCapture(0), SCROLL_DEBOUNCE_MS);
  };

  constructor(
    canvas: HTMLCanvasElement,
    onThemeChange: (theme: Theme) => void,
    opts: { webgl?: boolean } = {},
  ) {
    this.onThemeChange = onThemeChange;
    this.renderer = opts.webgl === false ? null : InkRenderer.create(canvas);
    if (!this.renderer) {
      document.documentElement.dataset.ink = 'css';
      return;
    }
    document.documentElement.dataset.ink = 'webgl';

    this.renderer.resize(renderScale());
    this.renderer.watchContext(
      () => this.cancel(),
      () => this.scheduleCapture(0),
    );

    window.addEventListener('resize', this.onResize, { passive: true });
    window.addEventListener('scroll', this.onScroll, { passive: true });
    // Catches document-height changes that aren't window resizes (late fonts, images).
    this.resizeObserver = new ResizeObserver(() => this.scheduleCapture(RESIZE_DEBOUNCE_MS));
    this.resizeObserver.observe(document.body);
    // Snapshots are skipped under reduced motion; take them if the preference is lifted.
    this.reducedMotion.addEventListener('change', this.onMotionPreferenceChange);

    void document.fonts.ready.then(() => this.scheduleCapture(0));
  }

  get isWebGL(): boolean {
    return this.renderer !== null;
  }

  get isAnimating(): boolean {
    return this.frame !== null;
  }

  /** The most recent click, for "replay last click". */
  get lastClick(): ClickRecord | null {
    return this.last;
  }

  /**
   * Toggle the theme, spreading from `point` (viewport CSS px) or from the toggle button.
   * `seed` reproduces a previous spread exactly.
   */
  toggle(point?: Point, toggleButton?: HTMLButtonElement, seed?: InkFrame['seed']): void {
    if (this.disposed) return;
    this.toggleButton = toggleButton ?? this.toggleButton;
    window.clearTimeout(this.replayTimer);
    window.clearTimeout(this.scrollTimer);
    // The live DOM always holds the latest target, so this is right even mid-transition.
    const to = otherTheme(getTheme());
    const renderer = this.renderer;
    const scale = renderScale();
    const key = layoutKey(scale);
    const interrupting = this.frame !== null;

    const canAnimate =
      renderer !== null &&
      !renderer.isLost &&
      !this.isReducedMotion() &&
      renderer.hasValid(to, key) &&
      (interrupting || renderer.hasValid(getTheme(), key));

    if (!canAnimate || !renderer) {
      this.cancel();
      this.crossFade(to);
      if (renderer && !this.isReducedMotion()) this.scheduleCapture(0);
      return;
    }

    // Interrupted: freeze exactly what is on screen and spread the new ink over it.
    let from: InkSource = getTheme();
    if (interrupting) {
      this.tween?.kill();
      this.fade?.kill();
      this.tween = this.fade = null;
      renderer.resize(scale);
      const frozen = this.currentFrame();
      from = frozen && renderer.freeze(frozen) ? 'composite' : getTheme();
    }

    const center = point ?? this.toggleCenter();
    const maxDist = farthestCorner(center);
    const frameSeed = seed ?? randomSeed();
    this.last = { point: center, seed: frameSeed, from: otherTheme(to) };
    this.frame = { from, to, center, maxDist, seed: frameSeed };
    this.state.progress = 0;
    this.state.time = 0;

    renderer.resize(scale);
    this.draw();
    // Same task: the overlay (showing "from") and the flipped DOM hit the screen together.
    gsap.set(renderer.canvas, { opacity: 1 });
    renderer.canvas.classList.add('is-active');
    document.documentElement.classList.add('theme-switching');
    this.setTheme(to);

    const duration = inkParams.duration;
    this.tween = gsap.to(this.state, {
      progress: 1,
      duration,
      ease: EASE,
      onUpdate: () => {
        // Tween-local seconds: slow motion slows the drift too, so it looks identical.
        this.state.time = this.tween?.time() ?? 0;
        this.draw();
      },
      onComplete: () => this.finish(),
    });
    this.tween.timeScale(inkParams.timeScale);
  }

  /**
   * Re-run the last click: snap back to the theme it started from, hold briefly (a clean
   * first frame for the recording), then spread again with the same point and seed.
   */
  replay(): boolean {
    const last = this.last;
    if (!last) return false;
    window.clearTimeout(this.replayTimer);
    this.cancel();
    if (getTheme() !== last.from) {
      this.setTheme(last.from);
    }
    this.replayTimer = window.setTimeout(() => this.toggle(last.point, this.toggleButton ?? undefined, last.seed), REPLAY_HOLD_MS);
    return true;
  }

  /** Live playback rate (slow motion), applied to a running transition too. */
  setTimeScale(scale: number): void {
    inkParams.timeScale = scale;
    this.tween?.timeScale(scale);
    this.fade?.timeScale(scale);
  }

  destroy(): void {
    this.disposed = true;
    window.clearTimeout(this.resizeTimer);
    window.clearTimeout(this.cssFadeTimer);
    window.clearTimeout(this.replayTimer);
    this.tween?.kill();
    this.fade?.kill();
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    this.reducedMotion.removeEventListener('change', this.onMotionPreferenceChange);
    this.renderer?.canvas.remove();
    document.documentElement.classList.remove('theme-switching', 'theme-fade');
  }

  private currentFrame(): InkFrame | null {
    if (!this.frame) return null;
    const { progress, time } = this.state;
    const { maxDist } = this.frame;
    const linear = Math.min(1, time / inkParams.duration);
    const ramp = Math.max(0, (linear - SPREAD.cleanupFrom) / (1 - SPREAD.cleanupFrom));
    // Second term only acts in the last ~3% (≈40ms): a guarantee for unlucky seeds so the
    // final frame is exactly the "to" snapshot before the fade (measured residual is 0).
    const cleanup =
      ramp ** SPREAD.cleanupPow * maxDist * SPREAD.cleanupReach + Math.max(0, (linear - 0.97) / 0.03) * maxDist;
    return { ...this.frame, progress, time, radius: progress * maxDist * SPREAD.growth, cleanup };
  }

  private draw(): void {
    const frame = this.currentFrame();
    if (this.renderer && frame) this.renderer.draw(frame);
  }

  private finish(): void {
    const canvas = this.renderer?.canvas;
    this.tween = null;
    if (!canvas) return;
    this.fade = gsap
      .to(canvas, { opacity: 0, duration: FADE_OUT, ease: 'none', onComplete: () => this.hide() })
      .timeScale(inkParams.timeScale);
  }

  private hide(): void {
    this.fade = null;
    this.frame = null;
    this.renderer?.canvas.classList.remove('is-active');
    document.documentElement.classList.remove('theme-switching');
    if (this.captureQueued) this.scheduleCapture(0);
  }

  private cancel(): void {
    if (!this.frame) return;
    this.tween?.kill();
    this.fade?.kill();
    this.tween = null;
    this.hide();
  }

  /** Plain CSS colour transition (no WebGL2, reduced motion, or snapshots not ready yet). */
  private crossFade(to: Theme): void {
    const root = document.documentElement;
    root.classList.add('theme-fade');
    root.style.setProperty('--theme-fade', `${CSS_FADE_S}s`);
    this.setTheme(to);
    window.clearTimeout(this.cssFadeTimer);
    this.cssFadeTimer = window.setTimeout(() => {
      root.classList.remove('theme-fade');
      if (this.captureQueued) this.scheduleCapture(0);
    }, CSS_FADE_S * 1000 + 50);
  }

  private toggleCenter(): Point {
    const r = this.toggleButton?.getBoundingClientRect();
    if (!r) return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  }

  // ---------- Capture scheduling ----------

  private scheduleCapture(delay: number): void {
    if (this.disposed) return;
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => void this.captureAll(), delay);
  }

  private async captureAll(): Promise<void> {
    const renderer = this.renderer;
    if (this.disposed || !renderer || renderer.isLost || this.isReducedMotion()) return;

    // Capturing blocks the main thread; never do it mid-animation (or mid CSS fade, which
    // would bake half-transitioned colours into the snapshot).
    if (this.capturing || this.frame || document.documentElement.classList.contains('theme-fade')) {
      this.captureQueued = true;
      return;
    }

    const scale = renderScale();
    const key = layoutKey(scale);
    const current = getTheme();
    const themes: Theme[] = [current, otherTheme(current)].filter((t) => !renderer.hasValid(t, key));
    this.captureQueued = false;
    if (themes.length === 0) return;

    const gen = ++this.captureGen;
    this.capturing = true;
    try {
      for (const theme of themes) {
        const snap = await capturePage(theme, scale, renderer.maxTextureSize);
        if (gen !== this.captureGen) return;
        if (snap.key !== layoutKey(renderScale())) {
          // Layout changed while capturing; this snapshot is already stale.
          this.captureQueued = true;
          break;
        }
        renderer.upload(snap);
        if (import.meta.env.DEV) {
          console.debug(
            `[ink] captured ${theme} ${snap.canvas.width}×${snap.canvas.height} in ${snap.ms.toFixed(0)}ms`,
          );
        }
      }
    } catch (err) {
      console.error('[ink] capture failed', err);
    } finally {
      this.capturing = false;
    }
    if (this.captureQueued) this.scheduleCapture(RESIZE_DEBOUNCE_MS);
  }

  private setTheme(theme: Theme): void {
    applyTheme(theme, this.toggleButton);
    this.onThemeChange(theme);
  }

  private isReducedMotion(): boolean {
    return this.reducedMotion.matches || document.documentElement.dataset.motion === 'reduced';
  }
}

function farthestCorner(p: Point): number {
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;
  return Math.max(Math.hypot(p.x, p.y), Math.hypot(w - p.x, p.y), Math.hypot(p.x, h - p.y), Math.hypot(w - p.x, h - p.y)) + 4;
}

function randomSeed(): InkFrame['seed'] {
  return { x: Math.random() * 64 - 32, y: Math.random() * 64 - 32, angle: Math.random() * Math.PI * 2 };
}
