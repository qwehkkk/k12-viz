/* 折线统计图滑块联动回归：拖「周五气温」后画布像素必须变化 */
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

const SIG = `(function(){
  var c = document.querySelector('.viz-canvas');
  if (!c) return 'NOCANVAS';
  var g = c.getContext('2d');
  var d = g.getImageData(0, 0, c.width, c.height).data;
  var h = 0;
  for (var i = 0; i < d.length; i += 13) h = (h * 31 + d[i]) >>> 0;
  return h + ':' + c.width + 'x' + c.height;
})()`;

const SET_W = w => `(function(){
  var ins = document.querySelectorAll('input[type=range]');
  var t = null;
  for (var i = 0; i < ins.length; i++) {
    var lab = ins[i].closest('.viz-slider');
    var nm = lab && lab.querySelector('.viz-slider-name');
    if (nm && nm.textContent.indexOf('周五') >= 0) { t = ins[i]; break; }
  }
  if (!t) return 'NOSLIDER:' + ins.length;
  t.value = ${w};
  t.dispatchEvent(new Event('input', { bubbles: true }));
  return 'OK:' + t.value;
})()`;

const pages = [
  ['/p5b-line/p5b-line-draw.html', 'mode0 描点连线'],
  ['/p5b-line/p5b-line-trend.html', 'mode1 陡缓'],
  ['/p5b-line/p5b-line-dual.html', 'mode2 双线'],
  ['/p5b-line/p5b-line-forecast.html', 'mode3 预测']
];

srv.listen(8150, async () => {
  const prof = path.join(__dirname, 'cdp-line');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9240', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1200,1600', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9240/json').toString()); if (targets.length) break; } catch (e) {}
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

  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1400, deviceScaleFactor: 1, mobile: false });
    let fail = 0;
    for (const [u, name] of pages) {
      await send('Page.navigate', { url: 'http://127.0.0.1:8150' + u });
      await sleep(1200);
      const a = await evalJs(SIG);
      // 往上拖到 26（上升），再拖到 8（低于下限会被 clamp 到 15）
      const set1 = await evalJs(SET_W(26));
      await sleep(250);
      const b = await evalJs(SIG);
      const set2 = await evalJs(SET_W(16));
      await sleep(250);
      const c = await evalJs(SIG);
      const ok = a !== b && b !== c && String(set1).indexOf('OK') === 0 && String(set2).indexOf('OK') === 0;
      if (!ok) fail++;
      console.log((ok ? 'PASS' : 'FAIL') + ' ' + name + ' | ' + set1 + ' | ' + a + ' -> ' + b + ' -> ' + c);
    }
    console.log(fail === 0 ? 'ALL PASS (4/4)' : 'FAILED ' + fail);
    ws.close();
    try { chrome.kill(); } catch (e) {}
    srv.close();
    process.exit(fail === 0 ? 0 : 1);
  });
});
