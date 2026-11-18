import fs from 'node:fs'
import { spawn } from 'node:child_process'

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'

async function run() {
  const chrome = spawn(chromePath, ['--headless=new', '--remote-debugging-port=9255', '--disable-gpu'])
  await new Promise(r => setTimeout(r, 2000))
  const res = await fetch('http://127.0.0.1:9255/json/new?http://localhost:5173/', { method: 'PUT' })
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

  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1.5, mobile: false })
  await new Promise(r => setTimeout(r, 1500))
  await send('Runtime.evaluate', {
    expression: `
      const el = Array.from(document.querySelectorAll('span')).find(s => s.textContent && s.textContent.includes('SMM-стратег & Команда таргетологів'));
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    `
  })
  await new Promise(r => setTimeout(r, 1000))
  const footerShot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/footer_brand_verified.png', Buffer.from(footerShot.data, 'base64'))
  console.log('Saved footer_brand_verified.png')

  ws.close()
  chrome.kill('SIGKILL')
}
run()
