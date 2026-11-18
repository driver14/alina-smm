import fs from 'node:fs';

const urls = [
  { name: 'ig_metal_1.png', url: 'https://pngate.com/wp-content/uploads/2025/03/instagram-logo-icon-3d-realistic-metallic-1.png' },
  { name: 'ig_metal_2.png', url: 'https://static.vecteezy.com/system/resources/previews/012/933/430/non_2x/metal-icon-instagram-free-png.png' },
  { name: 'ig_metal_3.jpg', url: 'https://i.pinimg.com/originals/74/92/7d/74927dc4f555c4da26647da322272a51.jpg' }
];

async function downloadAll() {
  for (const item of urls) {
    try {
      console.log('Fetching', item.name, '...');
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (!res.ok) {
        console.log('Failed:', item.name, res.status);
        continue;
      }
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(item.name, Buffer.from(buffer));
      console.log('Saved', item.name, 'size:', buffer.byteLength);
    } catch (e) {
      console.error('Error fetching', item.name, e);
    }
  }
}

downloadAll();
