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
  await new Promise(r => setTimeout(r, 1500));

  // 1. Hero Screenshot
  await page.screenshot({ path: path.join(artifactDir, 'v7_01_hero_verified.png') });
  console.log('✓ Captured v7_01_hero_verified.png');

  // 2. Scroll into Expertise
  await page.evaluate(() => {
    const el = document.getElementById('expertise');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'v7_02_expertise_verified.png') });
  console.log('✓ Captured v7_02_expertise_verified.png');

  // 3. Scroll to Manifesto
  await page.evaluate(() => {
    const el = document.getElementById('philosophy');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'v7_03_manifesto_verified.png') });
  console.log('✓ Captured v7_03_manifesto_verified.png');

  // 4. Scroll to Wheel
  await page.evaluate(() => {
    const el = document.getElementById('wheel');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'v7_04_wheel_verified.png') });
  console.log('✓ Captured v7_04_wheel_verified.png');

  // 5. Scroll to Works
  await page.evaluate(() => {
    const el = document.getElementById('cases');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'v7_05_works_verified.png') });
  console.log('✓ Captured v7_05_works_verified.png');

  // 6. Scroll to About
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'v7_06_about_verified.png') });
  console.log('✓ Captured v7_06_about_verified.png');

  // 7. Scroll to FAQ
  await page.evaluate(() => {
    const el = document.getElementById('faq');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'v7_07_faq_verified.png') });
  console.log('✓ Captured v7_07_faq_verified.png');

  await browser.close();
}

capture().catch(console.error);
