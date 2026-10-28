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
      ['/space-vector/sv-coord.html', 'sv-space.png'],
      ['/space-vector/sv-dot.html', 'sv-dot.png'],
      ['/space-vector/sv-normal.html', 'sv-normal.png'],
      ['/space-vector/sv-angle.html', 'sv-angle.png'],
      ['/space-vector/sv-dist.html', 'sv-dist.png'],
      ['/line-circle/lc-slope.html', 'lc-slope.png'],
      ['/line-circle/lc-eq.html', 'lc-eq.png'],
      ['/line-circle/lc-pos.html', 'lc-pos.png'],
      ['/line-circle/lc-circle.html', 'lc-circle.png'],
      ['/line-circle/lc-cpos.html', 'lc-cpos.png'],
      ['/conic/cn-ellipse.html', 'cn-ellipse.png'],
      ['/conic/cn-eprop.html', 'cn-eprop.png'],
      ['/conic/cn-hyperbola.html', 'cn-hyperbola.png'],
      ['/conic/cn-parabola.html', 'cn-parabola.png'],
      ['/conic/cn-line.html', 'cn-line.png'],
      ['/sequence/sq-concept.html', 'sq-concept.png'],
      ['/sequence/sq-arith.html', 'sq-arith.png'],
      ['/sequence/sq-geo.html', 'sq-geo.png'],
      ['/sequence/sq-sum.html', 'sq-sum.png'],
      ['/sequence/sq-recur.html', 'sq-recur.png'],
      ['/derivative/dv-def.html', 'dv-def.png'],
      ['/derivative/dv-calc.html', 'dv-calc.png'],
      ['/derivative/dv-mono.html', 'dv-mono.png'],
      ['/derivative/dv-extreme.html', 'dv-extreme.png'],
      ['/derivative/dv-opt.html', 'dv-opt.png']
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
