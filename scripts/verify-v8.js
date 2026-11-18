import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\ildar\\.gemini\\antigravity\\brain\\352211e8-68d8-4742-9c2b-e3a9f3850f82';

async function testV8() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 2 });

  await page.goto('http://127.0.0.1:5173/?v=bdb', { waitUntil: 'networkidle2' });
  // Wait 2s for luxury preloader to finish its 0.75s + 0.45s animation
  await new Promise(r => setTimeout(r, 2000));

  // 1. Hero fully loaded
  await page.screenshot({ path: path.join(artifactDir, 'v8_hero_loaded.png') });
  console.log('✓ Captured v8_hero_loaded.png');

  // 2. Scroll to Pinned Horizontal Cases
  await page.evaluate(() => {
    const el = document.getElementById('cases');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'v8_cases_horizontal_showcase.png') });
  console.log('✓ Captured v8_cases_horizontal_showcase.png');

  // 3. Scroll to Kinetic Manifesto
  await page.evaluate(() => {
    const el = document.getElementById('philosophy');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'v8_kinetic_manifesto.png') });
  console.log('✓ Captured v8_kinetic_manifesto.png');

  // 4. Scroll to Diagnostic Inquiries
  await page.evaluate(() => {
    const el = document.getElementById('inquiries');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.dispatchEvent(new Event('scroll'));
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(artifactDir, 'v8_diagnostic_inquiries.png') });
  console.log('✓ Captured v8_diagnostic_inquiries.png');

  await browser.close();
}

testV8().catch(console.error);
