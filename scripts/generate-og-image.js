import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateOgBanner() {
  const width = 1200;
  const height = 630;

  // 1. Process Alina's portrait photo for the right side
  const photoWidth = 430;
  const photoHeight = 530;
  const photoRadius = 24;

  const photoBuffer = await sharp('public/photos/alina-hero.jpg')
    .resize(photoWidth, photoHeight, { fit: 'cover', position: 'top' })
    .toBuffer();

  // Create rounded corner mask for the photo
  const photoMask = Buffer.from(`
    <svg width="${photoWidth}" height="${photoHeight}">
      <rect x="0" y="0" width="${photoWidth}" height="${photoHeight}" rx="${photoRadius}" ry="${photoRadius}" fill="#fff"/>
    </svg>
  `);

  const roundedPhoto = await sharp(photoBuffer)
    .composite([{ input: photoMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Resize Logo Monogram
  const logoBuffer = await sharp('public/brand/logo-cream.png')
    .resize(84, 102, { fit: 'contain' })
    .toBuffer();

  // 3. Compose the full 1200x630 banner SVG with typography and styling
  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Background Gradients -->
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#141937"/>
          <stop offset="50%" stop-color="#10142e"/>
          <stop offset="100%" stop-color="#0b0e22"/>
        </linearGradient>

        <radialGradient id="pinkGlow" cx="80%" cy="30%" r="55%">
          <stop offset="0%" stop-color="#F3C3CF" stop-opacity="0.30"/>
          <stop offset="60%" stop-color="#F3C3CF" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#141937" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="creamGlow" cx="20%" cy="80%" r="50%">
          <stop offset="0%" stop-color="#EEEBDA" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#141937" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="cardBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4"/>
          <stop offset="100%" stop-color="#F3C3CF" stop-opacity="0.2"/>
        </linearGradient>

        <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F3C3CF"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
      </defs>

      <!-- Background Fill -->
      <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
      <rect width="${width}" height="${height}" fill="url(#pinkGlow)"/>
      <rect width="${width}" height="${height}" fill="url(#creamGlow)"/>

      <!-- Ambient Decorative Border -->
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" rx="28" fill="none" stroke="rgba(238,235,218,0.12)" stroke-width="1.5"/>

      <!-- Left Column: Branding, Title, Subtitle, Badges -->
      <g transform="translate(64, 60)">
        
        <!-- Category Tag -->
        <g transform="translate(100, 16)">
          <rect x="0" y="0" width="220" height="28" rx="14" fill="rgba(243,195,207,0.18)" stroke="rgba(243,195,207,0.35)" stroke-width="1"/>
          <text x="14" y="18" fill="#F3C3CF" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="11" font-weight="800" letter-spacing="1.5">✦ SMM-СТРАТЕГ &amp; КОМАНДА</text>
        </g>

        <!-- Brand Title -->
        <text x="100" y="68" fill="#EEEBDA" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="28" font-weight="900" letter-spacing="2">
          АЛІНА ВОЛОШИНА
        </text>

        <!-- Main Catchy Headline -->
        <g transform="translate(0, 140)">
          <text x="0" y="46" fill="#EEEBDA" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="44" font-weight="900" letter-spacing="-0.5">
            Системні продажі
          </text>
          
          <!-- Highlighted block -->
          <rect x="0" y="66" width="375" height="56" rx="12" fill="#F3C3CF"/>
          <text x="16" y="108" fill="#141937" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="42" font-weight="900" letter-spacing="-0.5">
            із соцмереж
          </text>
        </g>

        <!-- Description Subtitle -->
        <g transform="translate(0, 290)">
          <text x="0" y="20" fill="rgba(238,235,218,0.85)" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="16" font-weight="500">
            Повний цикл просування для бізнесів та експертів:
          </text>
          <text x="0" y="46" fill="#F3C3CF" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="16" font-weight="700">
            Аналітика • SMM-стратегія • Контент • Таргетинг • Продажі
          </text>
        </g>

        <!-- Proof Trust Metrics Pill Bar -->
        <g transform="translate(0, 375)">
          <!-- Metric 1 -->
          <rect x="0" y="0" width="168" height="64" rx="16" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
          <text x="16" y="28" fill="#F3C3CF" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="20" font-weight="900">×10 ROMI</text>
          <text x="16" y="48" fill="rgba(238,235,218,0.7)" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="10" font-weight="700">Окупність у Beauty</text>

          <!-- Metric 2 -->
          <rect x="180" y="0" width="168" height="64" rx="16" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
          <text x="196" y="28" fill="#F3C3CF" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="20" font-weight="900">3 Ринки</text>
          <text x="196" y="48" fill="rgba(238,235,218,0.7)" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="10" font-weight="700">США • Європа • Україна</text>

          <!-- Metric 3 -->
          <rect x="360" y="0" width="186" height="64" rx="16" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.14)" stroke-width="1"/>
          <text x="376" y="28" fill="#F3C3CF" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="20" font-weight="900">1 Команда</text>
          <text x="376" y="48" fill="rgba(238,235,218,0.7)" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="10" font-weight="700">Власний таргетолог</text>
        </g>

        <!-- Bottom URL Tag -->
        <g transform="translate(0, 480)">
          <text x="0" y="0" fill="rgba(238,235,218,0.5)" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="13" font-weight="700" letter-spacing="1">
            ALINA-SMM • ЗАПИС НА БЕЗКОШТОВНУ СТРАТЕГІЧНУ СЕСІЮ →
          </text>
        </g>

      </g>

      <!-- Right Column: Card Frame around photo -->
      <g transform="translate(710, 50)">
        <!-- Outer Glow shadow -->
        <rect x="-6" y="-6" width="${photoWidth + 12}" height="${photoHeight + 12}" rx="30" fill="none" stroke="url(#cardBorder)" stroke-width="2"/>
        
        <!-- Bottom Floating Trust Badge -->
        <g transform="translate(24, ${photoHeight - 64})">
          <rect x="0" y="0" width="280" height="46" rx="23" fill="rgba(20,25,55,0.92)" stroke="rgba(243,195,207,0.35)" stroke-width="1.5"/>
          <circle cx="24" cy="23" r="6" fill="#F3C3CF"/>
          <text x="40" y="28" fill="#EEEBDA" font-family="system-ui, -apple-system, Montserrat, sans-serif" font-size="12" font-weight="800">
            Власна команда з таргетологом
          </text>
        </g>
      </g>
    </svg>
  `;

  // Combine layers using sharp
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: '#141937'
    }
  })
    .composite([
      { input: Buffer.from(svgOverlay), top: 0, left: 0 },
      // Place Alina's photo inside the frame
      { input: roundedPhoto, top: 50, left: 710 },
      // Place monogram logo top-left
      { input: logoBuffer, top: 60, left: 64 }
    ])
    .jpeg({ quality: 92, chromaSubsampling: '4:4:4' })
    .toFile('public/og-image.jpg');

  console.log('Generated public/og-image.jpg');

  // Also write PNG version
  await sharp('public/og-image.jpg')
    .png()
    .toFile('public/og-image.png');

  console.log('Generated public/og-image.png');
}

generateOgBanner().catch(console.error);
