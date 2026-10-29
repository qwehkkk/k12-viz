/* 一二年级 8+7+8+9 组件截图抽查 */
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
srv.listen(8155, async () => {
  const prof = path.join(__dirname, 'cdp-p12');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9245', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1200,2200', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9245/json').toString()); if (targets.length) break; } catch (e) {}
  }
  if (!targets) { console.error('no CDP'); process.exit(1); }
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

  const pages = [
    ['/p1a-count/p1a-count-num.html', 'p1a-count.png'],
    ['/p1a-shape/p1a-shape-roll.html', 'p1a-shape1.png'],
    ['/p1a-clock/p1a-clock-oclock.html', 'p1a-clock1.png'],
    ['/p1b-100/p1b-100-chart.html', 'p1b-100.png'],
    ['/p1b-money/p1b-money-pay.html', 'p1b-money.png'],
    ['/p1b-sort/p1b-sort-table.html', 'p1b-sort.png'],
    ['/p2a-angle/p2a-angle-right.html', 'p2a-angle1.png'],
    ['/p2a-view/p2a-view-side.html', 'p2a-view0.png'],
    ['/p2b-motion/p2b-motion-spin.html', 'p2b-motion2.png'],
    ['/p2b-wan/p2b-wan-read.html', 'p2b-wan1.png'],
    ['/p2b-logic/p2b-logic-table.html', 'p2b-logic2.png'],
    ['/p2b-rem/p2b-rem-solve.html', 'p2b-rem3.png'],
    ['/tracks/primary/', 'tracks-primary7.png']
  ];
  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1500, deviceScaleFactor: 1, mobile: false });
    for (const [u, f] of pages) {
      await send('Page.navigate', { url: 'http://127.0.0.1:8155' + u });
      await sleep(1100);
      const box = await evalJs(`(function(){
        var v=document.querySelector('.viz-canvas');
        var t=document.querySelector('.tg-pz');
        var el=v||t;
        if(!el) return null;
        el.scrollIntoView({block:'center'});
        var r=el.getBoundingClientRect();
        return {x:Math.max(0,r.left-8),y:Math.max(0,r.top-8),w:r.width+16,h:r.height+16};
      })()`);
      await sleep(400);
      const shot = box && box.w > 50
        ? await send('Page.captureScreenshot', { format: 'png', clip: { x: box.x, y: box.y, width: box.w, height: box.h, scale: 1 } })
        : await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, f), Buffer.from(shot.data, 'base64'));
      console.log('saved', f);
    }
    ws.close();
    try { chrome.kill(); } catch (e) {}
    srv.close();
    process.exit(0);
  });
});
