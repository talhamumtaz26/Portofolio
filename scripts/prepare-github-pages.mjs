import fs from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve(process.env.DIST_DIR ?? 'dist');
const basePath = '/Portofolio';
const origin = 'https://talhamumtaz26.github.io/Portofolio';
const textExtensions = new Set(['.html', '.js', '.css', '.xml', '.txt', '.webmanifest', '.json']);

async function walk(directory) {
  const entries = await fs.readdir(directory, {withFileTypes: true});
  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(filePath);
      continue;
    }
    if (!textExtensions.has(path.extname(entry.name))) continue;

    let content = await fs.readFile(filePath, 'utf8');
    content = content
      .replace(/(["'`])\/(?!\/|Portofolio\/)/g, `$1${basePath}/`)
      .replace(/url\(\/(?!\/|Portofolio\/)/g, `url(${basePath}/`)
      .replaceAll('https://talha-portofolio.vercel.app', origin);
    await fs.writeFile(filePath, content);
  }
}

await walk(distDir);
await fs.writeFile(path.join(distDir, '.nojekyll'), '');
console.log(`Prepared GitHub Pages files in ${distDir}`);
