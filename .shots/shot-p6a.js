/* 六上 8 组件截图抽查 */
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
srv.listen(8149, async () => {
  const prof = path.join(__dirname, 'cdp-shot6a');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9239', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1200,2200', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9239/json').toString()); if (targets.length) break; } catch (e) {}
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
    ['/p6a-fmul/p6a-fmul-frac.html', 'p6a-fmul.png'],
    ['/p6a-pos2/p6a-pos2-dir.html', 'p6a-pos2.png'],
    ['/p6a-fdiv/p6a-fdiv-calc.html', 'p6a-fdiv.png'],
    ['/p6a-ratio/p6a-ratio-split.html', 'p6a-ratio.png'],
    ['/p6a-circle/p6a-circle-area.html', 'p6a-circle.png'],
    ['/p6a-pct/p6a-pct-change.html', 'p6a-pct.png'],
    ['/p6a-pie/p6a-pie-read.html', 'p6a-pie.png'],
    ['/p6a-numshape/p6a-numshape-odd.html', 'p6a-numshape.png'],
    ['/tracks/primary/', 'tracks-primary5.png']
  ];
  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1500, deviceScaleFactor: 1, mobile: false });
    for (const [u, f] of pages) {
      await send('Page.navigate', { url: 'http://127.0.0.1:8149' + u });
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
