/* 定位器交互截图：p5b-factor locate 页 + 一个高中文字 route 的题型页 */
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
srv.listen(8156, async () => {
  const prof = path.join(__dirname, 'cdp-loc');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9246', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1200,2200', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9246/json').toString()); if (targets.length) break; } catch (e) {}
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
    await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1600, deviceScaleFactor: 1, mobile: false });

    // 1) 定位器：点问题1选项 + 两个信号词
    await send('Page.navigate', { url: 'http://127.0.0.1:8156/p5b-factor/locate.html' });
    await sleep(900);
    const state1 = await evalJs(`(function(){
      var askBtns = document.querySelectorAll('#loc-asks .loc-opt');
      var featBtns = document.querySelectorAll('#loc-feats .loc-opt');
      return { asks: [].map.call(askBtns, b => b.textContent), feats: [].map.call(featBtns, b => b.textContent) };
    })()`);
    console.log('Q1 options:', JSON.stringify(state1.asks));
    console.log('Q2 options:', JSON.stringify(state1.feats));
    await evalJs(`document.querySelector('#loc-asks .loc-opt').click();
      var fb = document.querySelectorAll('#loc-feats .loc-opt');
      if (fb[0]) fb[0].click();`);
    await sleep(300);
    const resTxt = await evalJs(`(function(){
      var b = document.getElementById('loc-result');
      b.scrollIntoView({block:'start'});
      return b.innerText.slice(0, 300);
    })()`);
    console.log('result text:\n' + resTxt);
    await sleep(300);
    const full = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'loc-factor.png'), Buffer.from(full.data, 'base64'));
    console.log('saved loc-factor.png');

    // 2) 高中题型页（route 是文字步骤，应原样显示）
    await send('Page.navigate', { url: 'http://127.0.0.1:8156/circle/pattern/chord-pythagora.html' });
    await sleep(800);
    const routeTxt = await evalJs(`(function(){
      var ol = document.querySelector('ol.route');
      if (!ol) return '(no route)';
      ol.scrollIntoView({block:'center'});
      return ol.innerText.slice(0, 200);
    })()`);
    console.log('circle route:\n' + routeTxt);

    ws.close();
    try { chrome.kill(); } catch (e) {}
    srv.close();
    process.exit(0);
  });
});
