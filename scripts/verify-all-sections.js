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
  await new Promise(r => setTimeout(r, 1600));

  // 1. Hero capture (after preloader opened)
  await page.screenshot({ path: path.join(artifactDir, 'v6_hero_clean.png') });
  console.log('✓ Captured v6_hero_clean.png');

  // 2. Interactive Wheel direct scroll
  await page.evaluate(() => {
    // Find the wheel section by searching text or structure
    const sections = Array.from(document.querySelectorAll('section'));
    const wheelSec = sections.find(s => s.innerText.includes('КЛЮЧОВІ ВЕКТОРИ СИСТЕМИ'));
    if (wheelSec) {
      wheelSec.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'v6_wheel_clean.png') });
  console.log('✓ Captured v6_wheel_clean.png');

  await browser.close();
  console.log('Hero & Wheel verification captures completed successfully!');
}

capture().catch(console.error);
