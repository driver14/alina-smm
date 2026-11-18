import fs from 'node:fs'
import { spawn } from 'node:child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function run() {
  const chrome = spawn(chromePath, ['--headless=new', '--remote-debugging-port=9245', '--disable-gpu'])
  await new Promise(r => setTimeout(r, 2000))
  const res = await fetch('http://127.0.0.1:9245/json/new?http://localhost:5173/#faq', { method: 'PUT' })
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1.5, mobile: false })
  await new Promise(r => setTimeout(r, 1200))

  await send('Runtime.evaluate', {
    expression: `
      const target = document.querySelector('div.mt-12.p-6.bg-white\\\\/90') || Array.from(document.querySelectorAll('div')).find(d => d.textContent && d.textContent.includes('Залишилися індивідуальні запитання'));
      if (target) target.scrollIntoView({ behavior: 'instant', block: 'center' });
    `
  })
  await new Promise(r => setTimeout(r, 1000))

  const shot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/faq_banner_verified_3d.png', Buffer.from(shot.data, 'base64'))
  console.log('Saved faq_banner_verified_3d.png')
  ws.close()
  chrome.kill('SIGKILL')
}
run()
