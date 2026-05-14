import sharp from 'sharp';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function download(url) {
  return new Promise((resolve, reject) => {
    const get = url.startsWith('https') ? https.get : http.get;
    get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302)
        return download(res.headers.location).then(resolve, reject);
      if (res.statusCode !== 200)
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function optimizeImage({ url, filename, maxWidth }) {
  const dest = path.join(OUT_DIR, filename);
  if (fs.existsSync(dest)) {
    console.log(`skip  ${filename}  (already exists)`);
    return;
  }
  process.stdout.write(`⬇   ${filename}  …`);
  const buf = await download(url);
  await sharp(buf)
    .resize(maxWidth, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 85 })
    .toFile(dest);
  const { size } = fs.statSync(dest);
  console.log(`  ✓  (${(size / 1024).toFixed(1)} KB)`);
}

const pexels = (id, w) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const IMAGES = [
  // ── Menu items ────────────────────────────────────────────────────────────
  { url: pexels(302899,   800), filename: 'pexels-302899.webp',   maxWidth: 800 },
  { url: pexels(312418,   800), filename: 'pexels-312418.webp',   maxWidth: 800 },
  { url: pexels(28504478, 800), filename: 'pexels-28504478.webp', maxWidth: 800 },
  { url: pexels(37300029, 800), filename: 'pexels-37300029.webp', maxWidth: 800 },
  { url: pexels(37218332, 800), filename: 'pexels-37218332.webp', maxWidth: 800 },
  { url: pexels(29285138, 800), filename: 'pexels-29285138.webp', maxWidth: 800 },
  { url: pexels(6416558,  800), filename: 'pexels-6416558.webp',  maxWidth: 800 },
  { url: pexels(37119337, 800), filename: 'pexels-37119337.webp', maxWidth: 800 },
  { url: pexels(33107433, 800), filename: 'pexels-33107433.webp', maxWidth: 800 },
  { url: pexels(33107436, 800), filename: 'pexels-33107436.webp', maxWidth: 800 },
  // ── Events ────────────────────────────────────────────────────────────────
  { url: pexels(1840320,  800), filename: 'pexels-1840320.webp',  maxWidth: 800 },
  { url: pexels(34505585, 800), filename: 'pexels-34505585.webp', maxWidth: 800 },
  // ── Hero (large) ──────────────────────────────────────────────────────────
  { url: pexels(1307698, 1920), filename: 'pexels-1307698.webp',  maxWidth: 1920 },
  // ── About page ────────────────────────────────────────────────────────────
  { url: pexels(15259599, 1200), filename: 'pexels-15259599.webp', maxWidth: 1200 },
  { url: pexels(34207050,  600), filename: 'pexels-34207050.webp', maxWidth: 600 },
  { url: pexels(6077664,   600), filename: 'pexels-6077664.webp',  maxWidth: 600 },
];

console.log(`Saving to: ${OUT_DIR}\n`);
for (const img of IMAGES) {
  try {
    await optimizeImage(img);
  } catch (err) {
    console.error(`✗   ${img.filename}:`, err.message);
  }
}
console.log('\nDone.');
