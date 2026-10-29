/* 专项图谱交互回归：真实鼠标事件验证 拖动/缩放/适配/全屏/链接 */
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
srv.listen(8141, async () => {
  const prof = path.join(__dirname, 'cdp-pz');
  const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
    '--headless=new', '--remote-debugging-port=9231', '--user-data-dir=' + prof,
    '--no-first-run', '--window-size=1400,900', 'about:blank'
  ]);
  let targets = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 500));
    try { targets = JSON.parse(execSync('curl -s http://127.0.0.1:9231/json').toString()); if (targets.length) break; } catch (e) {}
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
  // 真实鼠标事件（触发 pointer 事件链，与用户操作一致）
  async function click(x, y) {
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', clickCount: 1 });
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', clickCount: 1 });
    await sleep(150);
  }
  async function centerOf(sel) {
    const r = await evalJs(`(function(){var e=document.querySelector(${JSON.stringify(sel)});var b=e.getBoundingClientRect();return {x:b.x+b.width/2,y:b.y+b.height/2}})()`);
    return r;
  }
  function tf() { return evalJs(`document.querySelector('.tg-pz .tg-stage').style.transform`); }
  async function scale() {
    const v = await evalJs(`(document.querySelector('.tg-pz .tg-stage').style.transform.match(/scale\\(([\\d.]+)\\)/) || ['', '1'])[1]`);
    return parseFloat(v);
  }

  ws.addEventListener('open', async () => {
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 900, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: 'http://127.0.0.1:8141/tracks/primary/' });
    await sleep(1200);
    await evalJs(`document.querySelector('.tg-pz').scrollIntoView({block:'center'})`);
    await sleep(300);

    try {
      const t0 = await tf();
      const s0 = await scale();
      console.log('① 初始 transform:', t0);

      // ② 放大按钮
      let c = await centerOf('[data-pz-act="in"]');
      await click(c.x, c.y);
      const s1 = await scale();
      console.log('② 点放大后 scale:', s1, Math.abs(s1 - s0 * 1.3) < 0.01 ? '✅ 按钮生效(×1.3)' : '❌ 无效果');

      // ③ 适配按钮
      c = await centerOf('[data-pz-act="fit"]');
      await click(c.x, c.y);
      const s2 = await scale();
      console.log('③ 点适配后 scale:', s2, Math.abs(s2 - s0) < 0.01 ? '✅ 回到基准' : '❌ 无效果');

      // ④ 拖动：按住移动 120px
      const root = await centerOf('.tg-pz');
      const sx = root.x - 100, sy = root.y;
      await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: sx, y: sy, button: 'left', clickCount: 1 });
      for (let i = 1; i <= 6; i++) {
        await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: sx + i * 20, y: sy + i * 5, button: 'left' });
        await sleep(40);
      }
      await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: sx + 120, y: sy + 30, button: 'left', clickCount: 1 });
      await sleep(150);
      const t1 = await tf();
      const m = t1.match(/translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/);
      const t0m = t0.match(/translate\((-?[\d.]+)px,\s*(-?[\d.]+)px\)/);
      const dx = m ? +m[1] - +t0m[1] : NaN, dy = m ? +m[2] - +t0m[2] : NaN;
      console.log('④ 拖动 120/30px 后位移 Δ:', dx.toFixed(1) + ',' + dy.toFixed(1),
        Math.abs(dx - 120) < 8 && Math.abs(dy - 30) < 8 ? '✅ 跟手' : '❌ 跳坐标');

      // ⑤ 全屏
      c = await centerOf('[data-pz-act="full"]');
      await click(c.x, c.y);
      const isFull = await evalJs(`document.querySelector('.tg-pz').classList.contains('is-full')`);
      const fullBtnText = await evalJs(`document.querySelector('[data-pz-act="full"]').textContent`);
      console.log('⑤ 点全屏后 is-full:', isFull, fullBtnText === '退出' ? '✅(' + fullBtnText + ')' : '❌ 按钮文案=' + fullBtnText);
      // 退出
      const c2 = await centerOf('[data-pz-act="full"]');
      await click(c2.x, c2.y);
      const isFull2 = await evalJs(`document.querySelector('.tg-pz').classList.contains('is-full')`);
      console.log('   再点退出后 is-full:', isFull2, !isFull2 ? '✅' : '❌');

      // ⑥ 缩小按钮
      c = await centerOf('[data-pz-act="out"]');
      await click(c.x, c.y);
      const s3 = await scale();
      console.log('⑥ 点缩小后 scale:', s3, s3 < 1 ? '✅' : '❌');

      // ⑦ 普通点击章节链接仍可跳转（没拖动过）
      await send('Page.navigate', { url: 'http://127.0.0.1:8141/tracks/primary/' });
      await sleep(1200);
      await evalJs(`document.querySelector('.tg-pz').scrollIntoView({block:'center'})`);
      await sleep(300);
      const link = await centerOf('.tg-pz a[href]');
      await click(link.x, link.y);
      await sleep(600);
      const loc = await evalJs(`location.pathname`);
      console.log('⑦ 点图谱节点后落点:', loc, loc.indexOf('tracks') === -1 ? '✅ 链接正常' : '❌ 没跳转');
    } catch (e) {
      console.error('ERROR', e.message);
    }
    ws.close();
    try { chrome.kill(); } catch (e) {}
    srv.close();
    process.exit(0);
  });
});
