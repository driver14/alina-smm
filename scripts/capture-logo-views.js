import fs from 'node:fs'
import { spawn } from 'node:child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function run() {
  const chrome = spawn(chromePath, ['--headless=new', '--remote-debugging-port=9251', '--disable-gpu'])
  await new Promise(r => setTimeout(r, 2000))
  const res = await fetch('http://127.0.0.1:9251/json/new?http://localhost:5173/', { method: 'PUT' })
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

  // 1. Desktop Navbar screenshot
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 420, deviceScaleFactor: 2, mobile: false })
  await new Promise(r => setTimeout(r, 1200))
  const navShot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/navbar_logo_desktop.png', Buffer.from(navShot.data, 'base64'))
  console.log('Saved navbar_logo_desktop.png')

  // 2. Desktop Modal with BrandLogo screenshot
  await send('Runtime.evaluate', {
    expression: `
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent && (b.textContent.includes('СЕСІЯ') || b.textContent.includes('сесію')));
      if (btn) btn.click();
    `
  })
  await new Promise(r => setTimeout(r, 900))
  const modalShot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/modal_logo_desktop.png', Buffer.from(modalShot.data, 'base64'))
  console.log('Saved modal_logo_desktop.png')

  // 3. Desktop Footer screenshot
  await send('Runtime.evaluate', {
    expression: `
      const closeBtn = document.querySelector('button[aria-label=\"Close\"]') || document.querySelector('button.cursor-pointer.text-\\\\[\\\\#141937\\\\]\\\\/60');
      if (closeBtn) closeBtn.click();
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'instant', block: 'center' });
    `
  })
  await new Promise(r => setTimeout(r, 1000))
  const footerShot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/footer_logo_desktop.png', Buffer.from(footerShot.data, 'base64'))
  console.log('Saved footer_logo_desktop.png')

  ws.close()
  chrome.kill('SIGKILL')
}
run()
