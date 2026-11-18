import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\ildar\\.gemini\\antigravity\\brain\\352211e8-68d8-4742-9c2b-e3a9f3850f82';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 2 });

  await page.goto('http://127.0.0.1:5173/?v=bdb', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.scrollBy(0, -180);
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, 'seam_04_capabilities_to_about_start.png') });
  console.log('✓ Captured seam_04_capabilities_to_about_start.png');

  await browser.close();
}

capture().catch(console.error);
