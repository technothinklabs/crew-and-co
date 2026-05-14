# optimize-images

Download images from external URLs, resize them for web use, convert to WebP, and save to `public/images/`. Then update all source-code references to use the local paths.

## Usage

- `/optimize-images` — scan the entire project for external image URLs and optimize them all
- `/optimize-images <url> [filename]` — optimize a single image from `<url>`, saving as `filename.webp` (defaults to a slug derived from the URL)
- `/optimize-images <url1> <url2> ...` — optimize multiple specific URLs

## What this skill does

### Step 1 — Collect URLs

**If $ARGUMENTS is empty (no-arg mode):**

Scan every `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs` file under `app/`, `components/`, `lib/`, `src/`, and any `data/` folder for:

- String literals that contain `https://` or `http://` image extensions (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.avif`)
- Any helper function call pattern like `PEXELS(id)` or `UNSPLASH(id)` that resolves to a remote URL

Build a de-duplicated list of `{ url, localPath, sourceFiles[] }` objects. For Pexels URLs, extract the photo ID and use `pexels-{id}.webp` as the local filename.

**If $ARGUMENTS contains URLs:**

Use the provided URLs directly. Derive a slug filename from the URL if none is given (strip query params, take the last path segment, replace extension with `.webp`).

### Step 2 — Install sharp if needed

Check `package.json` for `sharp` in `devDependencies` or `dependencies`. If missing, run:

```bash
npm install --save-dev sharp
```

### Step 3 — Create and run the download/convert script

Create `scripts/optimize-images.mjs` with this logic:

```js
import sharp from 'sharp';
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function download(url) {
  return new Promise((resolve, reject) => {
    const get = url.startsWith('https') ? https.get : http.get;
    get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302)
        return download(res.headers.location).then(resolve, reject);
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function process({ url, filename, maxWidth }) {
  console.log(`⬇  ${url}`);
  const buf = await download(url);
  const dest = path.join(OUT_DIR, filename);
  await sharp(buf)
    .resize(maxWidth, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 85 })
    .toFile(dest);
  const { size } = fs.statSync(dest);
  console.log(`✓  ${filename}  (${(size / 1024).toFixed(1)} KB)`);
}

// IMAGES array is injected by the skill
const IMAGES = REPLACE_WITH_IMAGES_ARRAY;

for (const img of IMAGES) {
  try { await process(img); }
  catch (e) { console.error(`✗  ${img.filename}:`, e.message); }
}
console.log('\nAll images saved to public/images/');
```

Replace `REPLACE_WITH_IMAGES_ARRAY` with the actual JS array built in Step 1.

**Size guidance:**
- Hero / full-width backgrounds: `maxWidth: 1920`
- Section / story images: `maxWidth: 1200`
- Card / thumbnail images: `maxWidth: 800`
- Avatars / small portraits: `maxWidth: 600`

Infer the appropriate `maxWidth` from the URL's query string (`w=` param) or context of where the image is used.

Run the script:

```bash
node scripts/optimize-images.mjs
```

### Step 4 — Update source references

For each `{ url, localPath, sourceFiles[] }` collected in Step 1:

- In each source file, replace the full external URL string literal with `/images/{filename}` (the local path).
- If the file uses a URL-building helper (e.g., `PEXELS(id, w)`) that is only used for remote images, simplify it to just return `/images/pexels-${id}.webp` (drop the unused `w` parameter).
- If the change makes an import or variable unused, remove it.

### Step 5 — Update next.config.ts (if applicable)

If all Pexels/Unsplash remote patterns are now local, remove the corresponding `remotePatterns` entry from `next.config.ts` to prevent accidental external image loading.

If any images remain remote (e.g., CMS images that are truly dynamic), leave those patterns in place.

### Step 6 — Verify

Run `npm run build` to confirm no TypeScript errors and that next/image is happy with all new local paths. Report the before/after count of external vs. local image references.

## Output format

After completing, report:

```
Downloaded and converted N images → public/images/
Updated M source files
Removed remote patterns: [list]

Images:
  pexels-302899.webp    142 KB   (was 600px JPEG from Pexels)
  pexels-1307698.webp   310 KB   (was 1920px JPEG from Pexels)
  ...
```
