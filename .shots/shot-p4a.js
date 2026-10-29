/* 四上 8 组件截图抽查 */
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
srv.listen(8145, async () => {
  const prof = path.join(__dirname, 'cdp-shot4a');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9235', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1200,2200', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9235/json').toString()); if (targets.length) break; } catch (e) {}
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
    ['/p4a-bignum/p4a-bignum-place.html', 'p4-num.png'],
    ['/p4a-hm2/p4a-hm2-ha.html', 'p4-area2.png'],
    ['/p4a-angle/p4a-angle-unit.html', 'p4-ang.png'],
    ['/p4a-mult3/p4a-mult3-vertical.html', 'p4-mult.png'],
    ['/p4a-quad/p4a-quad-family.html', 'p4-quad.png'],
    ['/p4a-div2/p4a-div2-trial.html', 'p4-div.png'],
    ['/p4a-bar/p4a-bar-read.html', 'p4-bar.png'],
    ['/p4a-opt/p4a-opt-pan.html', 'p4-opt.png'],
    ['/tracks/primary/', 'tracks-primary.png']
  ];
  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1500, deviceScaleFactor: 1, mobile: false });
    for (const [u, f] of pages) {
      await send('Page.navigate', { url: 'http://127.0.0.1:8145' + u });
      await sleep(1100);
      await evalJs(`(function(){var v=document.querySelector('.viz-canvas');if(v)v.scrollIntoView({block:'center'});else document.querySelector('.tg-pz')&&document.querySelector('.tg-pz').scrollIntoView({block:'center'});})()`);
      await sleep(400);
      const r = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(__dirname, f), Buffer.from(r.data, 'base64'));
      console.log('saved', f);
    }
    ws.close();
    try { chrome.kill(); } catch (e) {}
    srv.close();
    process.exit(0);
  });
});
