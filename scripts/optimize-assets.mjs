import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ASSETS_DIR = path.resolve('src/assets');
const ORIGINALS_DIR = path.join(ASSETS_DIR, '_originals');
const PUBLIC_DIR = path.resolve('public');

// Ensure output directories exist
if (!fs.existsSync(ORIGINALS_DIR)) {
  fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// 1. Backup originals
function backupOriginal(filename) {
  const src = path.join(ASSETS_DIR, filename);
  const dest = path.join(ORIGINALS_DIR, filename);
  if (fs.existsSync(src) && !fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
    console.log(`Backed up original: ${filename}`);
  }
}

// 2. Logo background cutout with flood-fill & smooth alpha
async function cutoutLogo(inputPath, isDark) {
  const img = sharp(inputPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const visited = new Uint8Array(w * h);
  const queue = [];

  // Seed boundary pixels
  for (let x = 0; x < w; x++) {
    queue.push(x, 0);
    queue.push(x, h - 1);
    visited[x] = 1;
    visited[(h - 1) * w + x] = 1;
  }
  for (let y = 0; y < h; y++) {
    queue.push(0, y);
    queue.push(w - 1, y);
    visited[y * w] = 1;
    visited[y * w + (w - 1)] = 1;
  }

  // BFS flood fill
  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];

    const neighbors = [
      [cx + 1, cy],
      [cx - 1, cy],
      [cx, cy + 1],
      [cx, cy - 1],
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nidx = ny * w + nx;
        if (!visited[nidx]) {
          const pidx = nidx * 3;
          const r = data[pidx];
          const g = data[pidx + 1];
          const b = data[pidx + 2];

          const isBg = isDark
            ? r < 20 && g < 20 && b < 20
            : r > 240 && g > 240 && b > 240;

          if (isBg) {
            visited[nidx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Also flood fill internal pockets of pure background (e.g. inside letters/scales)
  // Check any remaining pixel that is very pure bg
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (!visited[idx]) {
        const pidx = idx * 3;
        const r = data[pidx];
        const g = data[pidx + 1];
        const b = data[pidx + 2];
        const isPureBg = isDark
          ? r < 6 && g < 6 && b < 6
          : r > 250 && g > 250 && b > 250;
        if (isPureBg) {
          visited[idx] = 1;
        }
      }
    }
  }

  // Find bounding box of non-background content
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (!visited[idx]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Create RGBA buffer with soft edge transitions
  const out = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const pidx = idx * 3;
      const oidx = idx * 4;
      const r = data[pidx];
      const g = data[pidx + 1];
      const b = data[pidx + 2];

      let alpha = 255;
      if (visited[idx] === 1) {
        alpha = 0;
      } else {
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        if (isDark) {
          if (lum < 25) {
            alpha = Math.min(255, Math.max(0, Math.round(((lum - 5) / 20) * 255)));
          }
        } else {
          const diff = 255 - lum;
          if (diff < 25) {
            alpha = Math.min(255, Math.max(0, Math.round(((diff - 5) / 20) * 255)));
          }
        }
      }

      out[oidx] = r;
      out[oidx + 1] = g;
      out[oidx + 2] = b;
      out[oidx + 3] = alpha;
    }
  }

  // Add 24px padding around bounding box
  const pad = 24;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropW = Math.min(w - cropX, maxX - minX + pad * 2);
  const cropH = Math.min(h - cropY, maxY - minY + pad * 2);

  const fullSharp = sharp(out, {
    raw: { width: w, height: h, channels: 4 },
  });

  const cropped = fullSharp.extract({
    left: cropX,
    top: cropY,
    width: cropW,
    height: cropH,
  });

  return { fullSharp, cropped, bbox: { minX, minY, maxX, maxY } };
}

async function run() {
  console.log('--- Starting Alzina Asset Optimization Pipeline ---');

  // 1. Back up originals
  const originalFiles = [
    'alzina-logo-dark.jpg',
    'alzina-logo-light.jpg',
    'alzina-principal-image-1.jpg',
    'alzina-principal-image-2.jpg',
  ];
  for (const f of originalFiles) {
    backupOriginal(f);
  }

  // 2. Process Logos
  console.log('Processing logo-light (for light backgrounds)...');
  const lightResult = await cutoutLogo(
    path.join(ORIGINALS_DIR, 'alzina-logo-light.jpg'),
    false
  );
  // PNG fallback/source
  await lightResult.cropped
    .clone()
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(ASSETS_DIR, 'logo-light.png'));
  // WebP primary
  await lightResult.cropped
    .clone()
    .webp({ quality: 90, alphaQuality: 95 })
    .toFile(path.join(ASSETS_DIR, 'logo-light.webp'));
  console.log('Saved logo-light.png & logo-light.webp');

  console.log('Processing logo-dark (for dark backgrounds)...');
  const darkResult = await cutoutLogo(
    path.join(ORIGINALS_DIR, 'alzina-logo-dark.jpg'),
    true
  );
  // PNG fallback/source
  await darkResult.cropped
    .clone()
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(path.join(ASSETS_DIR, 'logo-dark.png'));
  // WebP primary
  await darkResult.cropped
    .clone()
    .webp({ quality: 90, alphaQuality: 95 })
    .toFile(path.join(ASSETS_DIR, 'logo-dark.webp'));
  console.log('Saved logo-dark.png & logo-dark.webp');

  // 3. Generate Favicons from Emblem portion
  console.log('Generating favicon set from logo emblem...');
  const lightLogoPath = path.join(ASSETS_DIR, 'logo-light.png');
  const lightMeta = await sharp(lightLogoPath).metadata();
  const emblemH = Math.round(lightMeta.height * 0.65);

  const emblemBuffer = await sharp(lightLogoPath)
    .extract({
      left: 0,
      top: 0,
      width: lightMeta.width,
      height: emblemH,
    })
    .png()
    .toBuffer();

  // Trim transparent edges so the emblem fills the favicon bounds entirely
  const trimmedEmblem = await sharp(emblemBuffer)
    .trim({ threshold: 0 })
    .png()
    .toBuffer();

  // Square container for icon
  const iconBase = await sharp(trimmedEmblem)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp(iconBase).resize(512, 512).png().toFile(path.join(PUBLIC_DIR, 'icon-512.png'));
  await sharp(iconBase).resize(192, 192).png().toFile(path.join(PUBLIC_DIR, 'icon-192.png'));
  await sharp(iconBase).resize(180, 180).png().toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  await sharp(iconBase).resize(32, 32).png().toFile(path.join(PUBLIC_DIR, 'favicon-32x32.png'));
  await sharp(iconBase).resize(16, 16).png().toFile(path.join(PUBLIC_DIR, 'favicon-16x16.png'));
  // For favicon.ico, 32x32 PNG is supported by modern browsers
  await sharp(iconBase).resize(32, 32).png().toFile(path.join(PUBLIC_DIR, 'favicon.ico'));
  console.log('Favicon set generated in public/');

  // 4. Principal Photos
  console.log('Processing principal photography...');
  const p1Src = path.join(ORIGINALS_DIR, 'alzina-principal-image-1.jpg');
  const p2Src = path.join(ORIGINALS_DIR, 'alzina-principal-image-2.jpg');

  // Principal 1 (Blue suit with library & Alzina sign)
  await sharp(p1Src)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(ASSETS_DIR, 'principal-1-desktop.webp'));

  await sharp(p1Src)
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(ASSETS_DIR, 'principal-1-mobile.webp'));

  await sharp(p1Src)
    .resize(600, 750, { fit: 'cover', position: 'top' })
    .webp({ quality: 82 })
    .toFile(path.join(ASSETS_DIR, 'principal-1-card.webp'));

  // Principal 2 (Black suit with scales statue)
  await sharp(p2Src)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(ASSETS_DIR, 'principal-2-desktop.webp'));

  await sharp(p2Src)
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(ASSETS_DIR, 'principal-2-mobile.webp'));

  await sharp(p2Src)
    .resize(600, 750, { fit: 'cover', position: 'top' })
    .webp({ quality: 82 })
    .toFile(path.join(ASSETS_DIR, 'principal-2-card.webp'));

  console.log('Principal images processed (desktop, mobile, card variants).');

  // Clean up any test images
  const testFiles = [
    'test-light.png',
    'test-dark.png',
    'test-dark-flood.png',
    'test-dark-on-oxblood.png',
    'test-light-on-subtle.png',
  ];
  for (const tf of testFiles) {
    const tp = path.join(ASSETS_DIR, tf);
    if (fs.existsSync(tp)) {
      fs.unlinkSync(tp);
    }
  }

  console.log('--- Asset Optimization Pipeline Completed Successfully ---');
}

run().catch((err) => {
  console.error('Error optimizing assets:', err);
  process.exit(1);
});
