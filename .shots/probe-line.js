/* 特写截取 forecast 页画布 + 列出画布数量 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const DIST = path.join(__dirname, '..', 'dist');
const srv = http.createServer((req, res) => {
  let fp = path.join(DIST, decodeURIComponent(req.url.split('?')[0]));
  if (fp.endsWith('/') || fp.endsWith('\\')) fp = path.join(fp, 'index.html');
  fs.readFile(fp, (e, buf) => {
    if (e) { res.writeHead(404); res.end('nf'); return; }
    res.writeHead(200, { 'Content-Type': fp.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/javascript' });
    res.end(buf);
  });
});

srv.listen(8153, async () => {
  const prof = path.join(__dirname, 'cdp-line4');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9243', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1200,1600', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9243/json').toString()); if (targets.length) break; } catch (e) {}
  }
  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  function send(m, p = {}) { return new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); }); }
  ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); } });
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  async function evalJs(expr) {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  }

  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1400, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://127.0.0.1:8153/p5b-line/p5b-line-forecast.html' });
    await sleep(1300);
    const ncv = await evalJs("document.querySelectorAll('.viz-canvas').length");
    const b = JSON.parse(await evalJs("JSON.stringify(document.querySelector('.viz-canvas').getBoundingClientRect())"));
    console.log('canvases:', ncv, '| rect:', Math.round(b.left), Math.round(b.top), Math.round(b.width), Math.round(b.height));
    const shot = await send('Page.captureScreenshot', { format: 'png', clip: { x: b.left, y: b.top, width: b.width, height: b.height, scale: 1 } });
    fs.writeFileSync(path.join(__dirname, 'line-canvas.png'), Buffer.from(shot.data, 'base64'));
    console.log('saved line-canvas.png');
    ws.close();
    try { chrome.kill(); } catch (e) {}
    srv.close();
    process.exit(0);
  });
});
