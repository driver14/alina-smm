import fs from 'node:fs'
import { spawn } from 'node:child_process'

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'

async function run() {
  const edge = spawn(edgePath, ['--headless=new', '--remote-debugging-port=9233', '--disable-gpu'])
  await new Promise(r => setTimeout(r, 2000))
  const res = await fetch('http://127.0.0.1:9233/json/new?http://localhost:5173/', { method: 'PUT' })
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
  await new Promise(r => setTimeout(r, 1000))

  await send('Runtime.evaluate', {
    expression: `
      const btns = Array.from(document.querySelectorAll('button'));
      const target = btns.find(b => b.textContent && (b.textContent.includes('сесію') || b.textContent.includes('СЕСІЯ')));
      if (target) target.click();
    `,
  })
  await new Promise(r => setTimeout(r, 900))

  const shot = await send('Page.captureScreenshot', { format: 'png' })
  fs.writeFileSync('C:/Users/ildar/.gemini/antigravity/brain/352211e8-68d8-4742-9c2b-e3a9f3850f82/modal_verified_3d.png', Buffer.from(shot.data, 'base64'))
  console.log('Saved modal_verified_3d.png')
  ws.close()
  edge.kill('SIGKILL')
}
run()
