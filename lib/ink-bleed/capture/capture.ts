import type { Theme } from '../ui/theme';

/**
 * Viewport snapshots of the page in a given theme. The live scroll position is part of
 * the snapshot key, so each reveal shows the right part of the page without rasterizing
 * the entire long portfolio. The theme is applied to html2canvas' cloned document via
 * `onclone`; the live page never flickers during capture.
 */

export interface Snapshot {
  theme: Theme;
  canvas: HTMLCanvasElement;
  /** Texture pixels per CSS pixel. */
  scale: number;
  /** Layout this snapshot is valid for; see {@link layoutKey}. */
  key: string;
  ms: number;
}

const BACKGROUND: Record<Theme, string> = {
  light: '#F6F4EE',
  dark: '#0A0B0A',
};

const isCoarsePointer = (): boolean => window.matchMedia('(pointer: coarse)').matches;

/** Device-pixel ratio used for both the snapshots and the overlay canvas. */
export function renderScale(): number {
  const cap = isCoarsePointer() ? 1.5 : 2;
  return Math.min(window.devicePixelRatio || 1, cap);
}

export function documentSize(): { width: number; height: number } {
  const el = document.documentElement;
  return { width: el.clientWidth, height: Math.max(el.scrollHeight, el.clientHeight) };
}

/**
 * Identifies the layout a snapshot depends on. Viewport height is deliberately
 * excluded (mobile URL-bar show/hide changes it without reflowing the document).
 */
export function layoutKey(scale: number): string {
  const { width, height } = documentSize();
  const viewportHeight = document.documentElement.clientHeight;
  return `${width}x${height}@${viewportHeight}:${Math.round(window.scrollX)},${Math.round(window.scrollY)}@${scale}`;
}

/** Wait for images in the captured viewport so snapshots don't freeze lazy-load placeholders. */
async function waitForVisibleImages(): Promise<void> {
  const visible = Array.from(document.images).filter((img) => {
    const rect = img.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
  });

  await Promise.all(visible.map(async (img) => {
    if (!img.complete || img.naturalWidth === 0) {
      // A lazy image can report complete while still having no loaded resource. These
      // images are in the captured viewport, so promote them before waiting for load.
      if (img.loading === 'lazy') img.loading = 'eager';
      await new Promise<void>((resolve) => {
        const done = () => {
          window.clearTimeout(timeout);
          img.removeEventListener('load', done);
          img.removeEventListener('error', done);
          resolve();
        };
        const timeout = window.setTimeout(done, 2500);
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      });
    }

    if (img.complete && img.naturalWidth > 0 && typeof img.decode === 'function') {
      await img.decode().catch(() => undefined);
    }
  }));

}

export async function capturePage(theme: Theme, scale: number, maxTextureSize: number): Promise<Snapshot> {
  const t0 = performance.now();
  await waitForVisibleImages();
  const key = layoutKey(scale);
  const { width } = documentSize();
  const height = document.documentElement.clientHeight;
  const scrollY = window.scrollY;

  // Never exceed what the GPU can hold; the shader handles scale != canvas DPR.
  const safeScale = Math.min(scale, maxTextureSize / width, maxTextureSize / height);

  // Lazy-loaded: html2canvas is ~200 KB and only needed after first paint.
  const { default: html2canvas } = await import('html2canvas');
  const canvas = await html2canvas(document.body, {
    scale: safeScale,
    backgroundColor: BACKGROUND[theme],
    x: 0,
    y: scrollY,
    width,
    height,
    scrollX: 0,
    scrollY: 0,
    // The clone iframe renders without a scrollbar, so give it the live page's
    // scrollbar-less width; otherwise centred content shifts by half a scrollbar.
    windowWidth: width,
    windowHeight: document.documentElement.clientHeight,
    logging: false,
    useCORS: true,
    foreignObjectRendering: true,
    onclone: (doc) => {
      doc.documentElement.dataset.theme = theme;
      // The foreignObject snapshot is serialized as an SVG data URL, where root-relative
      // image paths no longer resolve against the live page's origin.
      doc.querySelectorAll<HTMLImageElement>('img[src]').forEach((img) => {
        img.loading = 'eager';
        const src = img.getAttribute('src');
        if (src && !src.startsWith('data:')) {
          img.src = new URL(src, document.baseURI).href;
        }
      });
      // These sections are skipped while outside the live viewport. Restore their real
      // content in the full-page snapshot so the reveal remains complete after scrolling.
      doc.querySelectorAll<HTMLElement>('#about, #skills, #experience, #services, #contact, .portfolio-footer')
        .forEach((el) => { el.style.contentVisibility = 'visible'; });
      // The live toggle is drawn above the overlay, so leave a hole for it. `visibility`
      // (not data-html2canvas-ignore) keeps its box in the layout so the nav doesn't shift.
      doc.querySelectorAll<HTMLElement>('[data-ink-live]').forEach((el) => {
        el.style.visibility = 'hidden';
      });
    },
  });

  return { theme, canvas, scale: safeScale, key, ms: performance.now() - t0 };
}
