/* 探针：页面加载状态 */
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
srv.listen(8143, async () => {
  const prof = path.join(__dirname, 'cdp-pz');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9233', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1400,900', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9233/json').toString()); if (targets.length) break; } catch (e) {}
  }
  console.log('targets:', targets.map(t => t.type + ':' + t.url).join(' | '));
  const t0 = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(t0.webSocketDebuggerUrl);
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
    await send('Page.navigate', { url: 'http://127.0.0.1:8143/tracks/primary/' });
    await sleep(2500);
    console.log(await evalJs(`JSON.stringify({url:location.href,ready:document.readyState,tgz:!!document.querySelector('.tg-pz'),cls:(document.querySelector('.tg-pz')||{className:'-'}).className,title:document.title,bodyLen:document.body?document.body.innerHTML.length:0})`));
    ws.close(); try { chrome.kill(); } catch (e) {} srv.close(); process.exit(0);
  });
});
