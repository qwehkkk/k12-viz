/* 抽查新章组件渲染：起本地服务 → CDP 截图 */
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
srv.listen(8139, async () => {
  const prof = path.join(__dirname, 'cdp-ineq');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9227', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1200,2400', 'about:blank'
  ]);
  // 等调试端口就绪
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9227/json').toString()); if (targets.length) break; } catch (e) {}
  }
  if (!targets) { console.error('no CDP'); process.exit(1); }
  const wsUrl = targets[0].webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  let id = 0; const pending = new Map();
  function send(m, p = {}) { return new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); }); }
  ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); } });
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 2600, deviceScaleFactor: 1, mobile: false });
    const pages = [
      ['/vectors/pv-concept.html', 'pv-arrow.png'],
      ['/vectors/pv-add.html', 'pv-add.png'],
      ['/vectors/pv-coord.html', 'pv-coord.png'],
      ['/vectors/pv-dot.html', 'pv-dot.png'],
      ['/vectors/pv-sine.html', 'pv-sine.png'],
      ['/vectors/pv-cosine.html', 'pv-cosine.png'],
      ['/complex-num/cx-concept.html', 'cx-class.png'],
      ['/complex-num/cx-equal.html', 'cx-equal.png'],
      ['/complex-num/cx-op.html', 'cx-op.png'],
      ['/complex-num/cx-plane.html', 'cx-plane.png'],
      ['/complex-num/cx-quad.html', 'cx-quad.png'],
      ['/solid-geo/sg-solid.html', 'sg-solid.png'],
      ['/solid-geo/sg-area.html', 'sg-net.png'],
      ['/solid-geo/sg-volume.html', 'sg-volume.png'],
      ['/solid-geo/sg-lines.html', 'sg-lines.png'],
      ['/solid-geo/sg-angle.html', 'sg-angle.png'],
      ['/stat-hs/sh-sample.html', 'sh-sample.png'],
      ['/stat-hs/sh-hist.html', 'sh-hist.png'],
      ['/stat-hs/sh-central.html', 'sh-central.png'],
      ['/stat-hs/sh-spread.html', 'sh-spread.png'],
      ['/stat-hs/sh-corr.html', 'sh-corr.png'],
      ['/prob-hs/ph-space.html', 'ph-dice.png'],
      ['/prob-hs/ph-props.html', 'ph-add.png'],
      ['/prob-hs/ph-indep.html', 'ph-indep.png'],
      ['/prob-hs/ph-freq.html', 'ph-freq.png']
    ];
    for (const [u, f] of pages) {
      await send('Page.navigate', { url: 'http://127.0.0.1:8139' + u });
      await sleep(900);
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
