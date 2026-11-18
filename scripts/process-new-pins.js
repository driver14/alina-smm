import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const brainDir = 'C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/.user_uploaded/';
const outDir = path.join(process.cwd(), 'public/pins');

async function processBlackBg(inputPath, outputPath, threshold = 18) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const rgba = Buffer.alloc(w * h * 4);

  // Black background removal with smooth feathering
  const isBg = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Black background
      if (r <= threshold && g <= threshold && b <= threshold) {
        isBg[y * w + x] = 1;
      }
    }
  }

  // BFS from edges so we only remove outer black background, not dark reflections inside metal
  const outerBg = new Uint8Array(w * h);
  const queue = [];
  for (let x = 0; x < w; x++) {
    if (isBg[x]) { outerBg[x] = 1; queue.push(x); }
    if (isBg[(h - 1) * w + x]) { outerBg[(h - 1) * w + x] = 1; queue.push((h - 1) * w + x); }
  }
  for (let y = 0; y < h; y++) {
    if (isBg[y * w]) { outerBg[y * w] = 1; queue.push(y * w); }
    if (isBg[y * w + (w - 1)]) { outerBg[y * w + (w - 1)] = 1; queue.push(y * w + (w - 1)); }
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % w;
    const cy = Math.floor(curr / w);
    const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nIdx = ny * w + nx;
        if (!outerBg[nIdx] && isBg[nIdx]) {
          outerBg[nIdx] = 1;
          queue.push(nIdx);
        }
      }
    }
  }

  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const oIdx = (y * w + x) * 4;
      rgba[oIdx] = data[idx];
      rgba[oIdx+1] = data[idx+1];
      rgba[oIdx+2] = data[idx+2];

      if (outerBg[y * w + x]) {
        rgba[oIdx+3] = 0;
      } else {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        // Antialias near outer background
        let bgNeighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const qx = x + dx, qy = y + dy;
            if (qx >= 0 && qx < w && qy >= 0 && qy < h) {
              if (outerBg[qy * w + qx]) bgNeighbors++;
            }
          }
        }
        if (bgNeighbors > 0) {
          rgba[oIdx+3] = Math.round(255 * (1 - (bgNeighbors / 9) * 0.7));
        } else {
          rgba[oIdx+3] = 255;
        }
      }
    }
  }

  const padding = 12;
  const cropLeft = Math.max(0, minX - padding);
  const cropTop = Math.max(0, minY - padding);
  const cropWidth = Math.min(w - cropLeft, (maxX - minX) + padding * 2);
  const cropHeight = Math.min(h - cropTop, (maxY - minY) + padding * 2);

  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png()
    .toFile(outputPath);

  console.log('Saved', path.basename(outputPath), cropWidth, 'x', cropHeight);
}

async function processWhiteBg(inputPath, outputPath, isBgFn, bbox, padding = 12) {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  const isBg = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (isBgFn(data, x, y, w)) {
        isBg[y * w + x] = 1;
      }
    }
  }

  // BFS from edges
  const outerBg = new Uint8Array(w * h);
  const queue = [];
  for (let x = 0; x < w; x++) {
    if (isBg[x]) { outerBg[x] = 1; queue.push(x); }
    if (isBg[(h - 1) * w + x]) { outerBg[(h - 1) * w + x] = 1; queue.push((h - 1) * w + x); }
  }
  for (let y = 0; y < h; y++) {
    if (isBg[y * w]) { outerBg[y * w] = 1; queue.push(y * w); }
    if (isBg[y * w + (w - 1)]) { outerBg[y * w + (w - 1)] = 1; queue.push(y * w + (w - 1)); }
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    const cx = curr % w;
    const cy = Math.floor(curr / w);
    const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nIdx = ny * w + nx;
        if (!outerBg[nIdx] && isBg[nIdx]) {
          outerBg[nIdx] = 1;
          queue.push(nIdx);
        }
      }
    }
  }

  const rgba = Buffer.alloc(w * h * 4);
  let minX = w, maxX = 0, minY = h, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 3;
      const oIdx = (y * w + x) * 4;
      rgba[oIdx] = data[idx];
      rgba[oIdx+1] = data[idx+1];
      rgba[oIdx+2] = data[idx+2];

      if (outerBg[y * w + x] || isBg[y * w + x]) {
        rgba[oIdx+3] = 0;
      } else {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        let bgNeighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const qx = x + dx, qy = y + dy;
            if (qx >= 0 && qx < w && qy >= 0 && qy < h) {
              if (outerBg[qy * w + qx] || isBg[qy * w + qx]) bgNeighbors++;
            }
          }
        }
        if (bgNeighbors > 0) {
          rgba[oIdx+3] = Math.round(255 * (1 - (bgNeighbors / 9) * 0.7));
        } else {
          rgba[oIdx+3] = 255;
        }
      }
    }
  }

  const effectiveBbox = bbox || { minX, maxX, minY, maxY };
  const cropLeft = Math.max(0, effectiveBbox.minX - padding);
  const cropTop = Math.max(0, effectiveBbox.minY - padding);
  const cropWidth = Math.min(w - cropLeft, (effectiveBbox.maxX - effectiveBbox.minX) + padding * 2);
  const cropHeight = Math.min(h - cropTop, (effectiveBbox.maxY - effectiveBbox.minY) + padding * 2);

  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
    .png()
    .toFile(outputPath);

  console.log('Saved', path.basename(outputPath), cropWidth, 'x', cropHeight);
}

async function run() {
  // 1. Telegram Paper Plane (Photo 1)
  await processBlackBg(
    brainDir + 'media_1792425848164_5825e024.jpg',
    path.join(outDir, 'pin-telegram.png'),
    25
  );

  // 2. Instagram Metallic Camera (Candidate 3 - exact match!)
  await processBlackBg(
    'ig_metal_3.jpg',
    path.join(outDir, 'pin-instagram.png'),
    30
  );

  // 3. Handshake (Photo 2) - Ignore bottom text (y > 750)
  await processWhiteBg(
    brainDir + 'media_1792425848168_caf2cf58.jpg',
    path.join(outDir, 'pin-handshake.png'),
    (d, x, y, w) => {
      if (y > 750) return true; // ignore prompt banner at bottom
      const idx = (y * w + x) * 3;
      const r = d[idx], g = d[idx+1], b = d[idx+2];
      return r > 230 && g > 230 && b > 230 && Math.abs(r - g) < 8 && Math.abs(g - b) < 8;
    },
    { minX: 18, maxX: 615, minY: 270, maxY: 685 }
  );

  // 4. Rocket (Photo 3)
  await processWhiteBg(
    brainDir + 'media_1792425848170_b73d5723.jpg',
    path.join(outDir, 'pin-rocket.png'),
    (d, x, y, w) => {
      const idx = (y * w + x) * 3;
      const r = d[idx], g = d[idx+1], b = d[idx+2];
      return r > 225 && g > 225 && b > 225 && Math.abs(r - g) < 8 && Math.abs(g - b) < 8;
    }
  );

  // 5. Person / Avatar (Photo 4)
  await processWhiteBg(
    brainDir + 'media_1792425848171_bedf7ec5.jpg',
    path.join(outDir, 'pin-person.png'),
    (d, x, y, w) => {
      const idx = (y * w + x) * 3;
      return d[idx] > 245 && d[idx+1] > 245 && d[idx+2] > 245;
    }
  );

  // 6. Push Pin (Photo 5)
  await processWhiteBg(
    brainDir + 'media_1792425848176_2df91b47.jpg',
    path.join(outDir, 'pin-pushpin.png'),
    (d, x, y, w) => {
      const idx = (y * w + x) * 3;
      const r = d[idx], g = d[idx+1], b = d[idx+2];
      return r > 220 && g > 220 && b > 220 && Math.abs(r - g) < 8 && Math.abs(g - b) < 8;
    }
  );

  console.log('ALL NEW PINS PROCESSED!');
}

run();
