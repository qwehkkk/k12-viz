/* 导航升级验证：学段记忆 + 返回上一级栏 */
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
srv.listen(8157, async () => {
  const prof = path.join(__dirname, 'cdp-nav');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9247', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1100,1600', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9247/json').toString()); if (targets.length) break; } catch (e) {}
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

    // 1) 打开高中一章（应写入 k12v-last: senior / b1c2 之类）
    await send('Page.navigate', { url: 'http://127.0.0.1:8157/circle/index.html' });
    await sleep(700);
    const stored = await evalJs(`localStorage.getItem('k12v-last')`);
    console.log('stored after chapter visit:', stored);

    // 2) 章目录页底部返回栏截图
    const bar = await evalJs(`(function(){
      var u = document.querySelector('.up-back');
      if (!u) return null;
      u.scrollIntoView({block:'center'});
      var r = u.getBoundingClientRect();
      return {x: Math.max(0, r.left - 8), y: Math.max(0, r.top - 8), w: r.width + 16, h: r.height + 16};
    })()`);
    await sleep(200);
    const s1 = await send('Page.captureScreenshot', { format: 'png', clip: { x: bar.x, y: bar.y, width: bar.w, height: bar.h, scale: 1 } });
    fs.writeFileSync(path.join(__dirname, 'nav-upback.png'), Buffer.from(s1.data, 'base64'));
    console.log('saved nav-upback.png');

    // 3) 站内跳回首页 → 应自动切到高中页签并高亮「圆」
    await send('Page.navigate', { url: 'http://127.0.0.1:8157/index.html' });
    await sleep(700);
    const st = await evalJs(`(function(){
      var checked = document.querySelector('.stage-tabs input:checked');
      var card = document.querySelector('.chapter-card.last-card');
      return {
        tab: checked ? checked.id : null,
        lastCard: card ? card.querySelector('h3').textContent : null,
        badge: card ? (card.querySelector('.last-badge') || {}).textContent || null : null,
        scrolled: window.scrollY
      };
    })()`);
    console.log('home restore:', JSON.stringify(st));
    // 滚到高亮卡截图
    await evalJs(`var c=document.querySelector('.chapter-card.last-card'); if(c) c.scrollIntoView({block:'center'});`);
    await sleep(300);
    const s2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'nav-home.png'), Buffer.from(s2.data, 'base64'));
    console.log('saved nav-home.png');

    ws.close();
    try { chrome.kill(); } catch (e) {}
    srv.close();
    process.exit(0);
  });
});
