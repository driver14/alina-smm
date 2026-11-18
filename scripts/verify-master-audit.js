import puppeteer from 'puppeteer-core';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\ildar\\.gemini\\antigravity\\brain\\352211e8-68d8-4742-9c2b-e3a9f3850f82';

async function runMasterAudit() {
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const errors = [];
  const warnings = [];

  const page = await browser.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
    if (msg.type() === 'warning') warnings.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.toString()));

  // 1. DESKTOP AUDIT (1440x950)
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 2 });
  await page.goto('http://127.0.0.1:5173/?v=bdb', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Check desktop horizontal overflow
  const desktopOverflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Desktop horizontal overflow:', desktopOverflow);

  // Capture Desktop Full Page or key sections
  const sectionsToTest = ['hero', 'expertise', 'philosophy', 'wheel', 'approach', 'inquiries', 'cases', 'services', 'about', 'faq'];
  
  for (const secId of sectionsToTest) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.dispatchEvent(new Event('scroll'));
    }, secId);
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(artifactDir, `master_desktop_${secId}.png`) });
    console.log(`✓ Captured master_desktop_${secId}.png`);
  }

  // 2. MOBILE AUDIT (375x812 iPhone / Mobile standard)
  const mobilePage = await browser.newPage();
  mobilePage.on('pageerror', (err) => errors.push(err.toString()));
  await mobilePage.setViewport({ width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await mobilePage.goto('http://127.0.0.1:5173/?v=bdb', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const mobileOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  console.log('Mobile horizontal overflow:', mobileOverflow);

  // Capture Mobile key sections
  const mobileSections = ['hero', 'cases', 'services', 'about'];
  for (const secId of mobileSections) {
    await mobilePage.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      window.dispatchEvent(new Event('scroll'));
    }, secId);
    await new Promise(r => setTimeout(r, 400));
    await mobilePage.screenshot({ path: path.join(artifactDir, `master_mobile_${secId}.png`) });
    console.log(`✓ Captured master_mobile_${secId}.png`);
  }

  // 3. KEYBOARD FOCUS & ACCESSIBILITY AUDIT
  const a11yAudit = await page.evaluate(() => {
    const focusable = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const missingLabels = [];
    focusable.forEach((el) => {
      const text = el.textContent?.trim();
      const ariaLabel = el.getAttribute('aria-label');
      const title = el.getAttribute('title');
      if (!text && !ariaLabel && !title) {
        missingLabels.push(el.outerHTML.slice(0, 100));
      }
    });

    const images = document.querySelectorAll('img');
    const missingAlt = [];
    images.forEach((img) => {
      if (!img.hasAttribute('alt')) {
        missingAlt.push(img.src);
      }
    });

    return {
      focusableCount: focusable.length,
      missingLabels,
      imageCount: images.length,
      missingAlt
    };
  });

  console.log('A11y Audit:', a11yAudit);
  console.log('Console errors:', errors);

  await browser.close();
}

runMasterAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
