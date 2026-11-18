import fs from 'node:fs'
import { spawn } from 'node:child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function run() {
  const chrome = spawn(chromePath, ['--headless=new', '--remote-debugging-port=9256', '--disable-gpu'])
  await new Promise(r => setTimeout(r, 2000))
  const res = await fetch('http://127.0.0.1:9256/json/new?http://localhost:5173/', { method: 'PUT' })
  const page = await res.json()
  const ws = new WebSocket(page.webSocketDebuggerUrl)
  let id = 1
  const send = (m, p = {}) => new Promise(r => {
    const cur = id++
    const h = (e) => {
      const d = JSON.parse(e.data)
      if (d.id === cur) { ws.removeEventListener('message', h); r(d.result) }
    }
    ws.addEventListener('message', h)
    ws.send(JSON.stringify({ id: cur, method: m, params: p }))
  })
  await new Promise(r => ws.onopen = r)
  await send('Page.enable')
  await send('Runtime.enable')

  // 1. Top bar screenshot
  await send('Emulation.setDeviceMetricsOverride', { width: 1300, height: 350, deviceScaleFactor: 2, mobile: false })
  await new Promise(r => setTimeout(r, 1200))
  const topShot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/navbar_top_contacts.png', Buffer.from(topShot.data, 'base64'))
  console.log('Saved navbar_top_contacts.png')

  // 2. Footer screenshot
  await send('Emulation.setDeviceMetricsOverride', { width: 1300, height: 800, deviceScaleFactor: 1.5, mobile: false })
  await send('Runtime.evaluate', {
    expression: `
      const el = Array.from(document.querySelectorAll('span')).find(s => s.textContent && s.textContent.includes('SMM-стратег & Команда таргетологів'));
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `
  })
  await new Promise(r => setTimeout(r, 1000))
  const footerShot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/footer_contacts_verified.png', Buffer.from(footerShot.data, 'base64'))
  console.log('Saved footer_contacts_verified.png')

  // 3. FAQ screenshot with both buttons
  await send('Runtime.evaluate', {
    expression: `
      const faq = document.getElementById('faq');
      if (faq) {
        const bottom = faq.querySelector('.mt-12');
        if (bottom) bottom.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    `
  })
  await new Promise(r => setTimeout(r, 1000))
  const faqShot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/faq_both_buttons.png', Buffer.from(faqShot.data, 'base64'))
  console.log('Saved faq_both_buttons.png')

  // 4. Mobile menu contacts screenshot
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true })
  await send('Runtime.evaluate', {
    expression: `
      window.scrollTo(0, 0);
      const menuBtn = document.querySelector('button[aria-label=\"Toggle navigation menu\"]');
      if (menuBtn) menuBtn.click();
    `
  })
  await new Promise(r => setTimeout(r, 1000))
  const mobileShot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/mobile_menu_contacts.png', Buffer.from(mobileShot.data, 'base64'))
  console.log('Saved mobile_menu_contacts.png')

  ws.close()
  chrome.kill('SIGKILL')
}
run()
