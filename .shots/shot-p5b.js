/* 五下 8 组件截图抽查 */
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
srv.listen(8148, async () => {
  const prof = path.join(__dirname, 'cdp-shot5b');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9238', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1200,2200', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9238/json').toString()); if (targets.length) break; } catch (e) {}
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
    ['/p5b-view3/p5b-view3-dir.html', 'p5b-view3.png'],
    ['/p5b-factor/p5b-factor-pair.html', 'p5b-factor.png'],
    ['/p5b-box/p5b-box-volume.html', 'p5b-box.png'],
    ['/p5b-frac/p5b-frac-mean.html', 'p5b-frac.png'],
    ['/p5b-rot/p5b-rot-design.html', 'p5b-rot.png'],
    ['/p5b-fadd/p5b-fadd-diff.html', 'p5b-fadd.png'],
    ['/p5b-line/p5b-line-trend.html', 'p5b-line.png'],
    ['/p5b-find/p5b-find-div3.html', 'p5b-find.png'],
    ['/tracks/primary/', 'tracks-primary4.png']
  ];
  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1500, deviceScaleFactor: 1, mobile: false });
    for (const [u, f] of pages) {
      await send('Page.navigate', { url: 'http://127.0.0.1:8148' + u });
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
