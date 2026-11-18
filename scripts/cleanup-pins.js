import sharp from 'sharp';
import fs from 'node:fs';

async function cleanupInstagram() {
  const { data, info } = await sharp('public/pins/pin-instagram.png').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Mask out anything outside the main rounded square body
  // Center is roughly (w/2, h/2). Radius is about w*0.48
  const cx = w / 2, cy = h / 2;
  const radius = w * 0.475;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      // Distance from center with superellipse / rounded box formula:
      // (|dx|^4.5 + |dy|^4.5)^(1/4.5) < radius
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const normDist = Math.pow(Math.pow(dx / radius, 5.5) + Math.pow(dy / radius, 5.5), 1 / 5.5);

      if (normDist > 1.0) {
        data[idx + 3] = 0;
      } else if (normDist > 0.985) {
        data[idx + 3] = Math.round(data[idx + 3] * (1 - (normDist - 0.985) / 0.015));
      }
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/pins/pin-instagram.png');
  console.log('Cleaned pin-instagram.png');
}

async function cleanupHandshake() {
  const { data, info } = await sharp('public/pins/pin-handshake.png').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // The shadow is at the very bottom: y > h - 35
  for (let y = h - 35; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      // If it's grayish/diffuse and dark shadow (not bright chrome highlight)
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Bottom shadow at bottom-right (x > 350)
      if (x > 300 && y > h - 25) {
        data[idx + 3] = 0;
      }
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/pins/pin-handshake.png');
  console.log('Cleaned pin-handshake.png');
}

async function main() {
  await cleanupInstagram();
  await cleanupHandshake();
}
main();
