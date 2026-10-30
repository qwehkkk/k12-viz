/* 新功能端到端：搜索 / 收藏 / 自测 / 错题本 / 暗色 / 章目录定位 */
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
    res.writeHead(200, { 'Content-Type': fp.endsWith('.html') ? 'text/html; charset=utf-8' : (fp.endsWith('.json') ? 'application/json' : 'application/javascript') });
    res.end(buf);
  });
});
srv.listen(8159, async () => {
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9249', '--user-data-dir=.shots/cdp-x',
    '--no-first-run', '--window-size=1100,1400', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9249/json').toString()); if (targets.length) break; } catch (e) {}
  }
  const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  function send(m, p = {}) { return new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); }); }
  ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); } });
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  async function evalJs(expr) {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 300));
    return r.result.value;
  }
  async function go(u) { await send('Page.navigate', { url: 'http://127.0.0.1:8159' + u }); await sleep(900); }

  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1100, height: 1300, deviceScaleFactor: 1, mobile: false });

    // 0) 知识点页：ctx、星标、自测条
    await go('/p5b-factor/p5b-factor-pair.html');
    const base = await evalJs(`({
      ctx: JSON.stringify(window.__PAGE_CTX__),
      star: (document.querySelector('.fav-star') || {}).textContent || null,
      stBar: !!document.querySelector('.st-bar'),
      themeBtn: (document.querySelector('#nav-theme') || {}).textContent,
      searchBtn: !!document.querySelector('#nav-search'),
      favLink: !!document.querySelector('a[href="/favorites.html"], a[href="favorites.html"]')
    })`);
    console.log('0 point page:', JSON.stringify(base));

    // 1) 收藏
    await evalJs(`document.querySelector('.fav-star').click()`);
    const starred = await evalJs(`({star: document.querySelector('.fav-star').textContent, ls: localStorage.getItem('k12v-fav')})`);
    console.log('1 fav:', JSON.stringify(starred));

    // 2) 自测：进入模式 → 点不会 → localStorage 错题
    await evalJs(`document.querySelector('.st-toggle').click()`);
    const stOn = await evalJs(`({
      cls: document.querySelector('section.blk .st-on') ? 'on' : (document.querySelectorAll('.st-row')[0] && getComputedStyle(document.querySelectorAll('.st-row')[0]).display),
      rows: document.querySelectorAll('.st-row').length
    })`);
    console.log('2 selftest on:', JSON.stringify(stOn));
    await evalJs(`document.querySelector('.st-no').click()`);
    const wrong = await evalJs(`localStorage.getItem('k12v-wrong')`);
    console.log('2 wrong ls:', wrong);

    // 3) 搜索
    await evalJs(`document.querySelector('#nav-search').click()`);
    await evalJs(`document.getElementById('sov-in').value='配方法'; document.getElementById('sov-in').dispatchEvent(new Event('input'))`);
    await sleep(400);
    const search = await evalJs(`({
      items: document.querySelectorAll('.sov-item').length,
      first: (document.querySelector('.sov-item .sov-t') || {}).textContent || null,
      kinds: [].map.call(document.querySelectorAll('.sov-item .sov-k'), k => k.textContent).slice(0,5)
    })`);
    console.log('3 search 配方法:', JSON.stringify(search));
    await evalJs(`document.getElementById('sov-in').value='因数'; document.getElementById('sov-in').dispatchEvent(new Event('input'))`);
    await sleep(300);
    const search2 = await evalJs(`document.querySelectorAll('.sov-item').length`);
    console.log('3 search 因数:', search2);
    await evalJs(`document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))`);

    // 4) 暗色模式
    await evalJs(`document.querySelector('#nav-theme').click()`);
    const dark = await evalJs(`({
      attr: document.documentElement.getAttribute('data-theme'),
      bg: getComputedStyle(document.body).backgroundColor,
      icon: document.querySelector('#nav-theme').textContent,
      ls: localStorage.getItem('k12v-theme')
    })`);
    console.log('4 dark:', JSON.stringify(dark));
    await evalJs(`document.body.scrollTop=0; document.documentElement.scrollTop=0`);
    await sleep(200);
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'x-dark.png'), Buffer.from(shot.data, 'base64'));
    // 切回浅色，避免影响后续截图
    await evalJs(`if(document.documentElement.getAttribute('data-theme')==='dark') document.querySelector('#nav-theme').click()`);

    // 5) 收藏页
    await go('/favorites.html');
    const favpg = await evalJs(`({
      tabs: [].map.call(document.querySelectorAll('.fv-tab'), b => b.textContent),
      items: document.querySelectorAll('.fav-item').length,
      first: (document.querySelector('.fav-item b') || {}).textContent
    })`);
    console.log('5 fav page:', JSON.stringify(favpg));
    await evalJs(`document.querySelectorAll('.fv-tab')[1].click()`);
    const wrongTab = await evalJs(`({items: document.querySelectorAll('.fav-item').length, first: (document.querySelector('.fav-item b') || {}).textContent})`);
    console.log('5 wrong tab:', JSON.stringify(wrongTab));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, 'x-fav.png'), Buffer.from(shot.data, 'base64'));

    // 6) 章目录定位：访问另一个点，再回章目录
    await go('/p5b-factor/p5b-factor-prime.html');
    await go('/p5b-factor/index.html');
    const chIdx = await evalJs(`({
      card: (document.querySelector('.card.last-pt-card h3') || {}).textContent || null,
      badge: (document.querySelector('.card.last-pt-card .last-badge') || {}).textContent || null,
      scrolled: window.scrollY > 0
    })`);
    console.log('6 chapter locate:', JSON.stringify(chIdx));

    // 7) 首页高三下占位文案
    await go('/index.html');
    const g3 = await evalJs(`(document.querySelector('.grade-block .grade-soon') ? document.body.innerText.match(/高三下册[\\s\\S]{0,80}/) || ['(none)'] : ['(none)'])[0]`);
    console.log('7 高三下:', JSON.stringify(g3));

    ws.close(); try { chrome.kill(); } catch (e) {} srv.close(); process.exit(0);
  });
});
