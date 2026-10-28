const BASE = 'http://127.0.0.1:8137';
const ws = new WebSocket(process.argv[2]);
const fs = require('fs');
let id = 0; const pending = new Map(); const errors = [];
function send(m, p = {}) { return new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); }); }
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); }
  if (m.method === 'Runtime.exceptionThrown') errors.push((m.params.exceptionDetails.exception||{}).description || m.params.exceptionDetails.text);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function js(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) return 'ERR:' + (r.exceptionDetails.exception||{}).description || r.exceptionDetails.text;
  return r.result.value;
}

ws.addEventListener('open', async () => {
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/rotate/rotation-concept.html' }); await sleep(1100);

  // 1. 按钮存在，面板默认关闭
  console.log('① fab 存在:', await js(`!!document.getElementById('fb-fab')`), '| 面板初始关闭:', await js(`!document.getElementById('fb-panel').classList.contains('open')`));

  // 2. 滚到组件处，打开面板
  await js(`document.querySelector('.viz-wrap').scrollIntoView({block:'center'})`); await sleep(400);
  await js(`document.getElementById('fb-fab').click()`); await sleep(400);
  console.log('② 面板打开:', await js(`document.getElementById('fb-panel').classList.contains('open')`));

  // 3. 上下文预览：应检测到 rotate 组件 + 状态文字
  const preview = await js(`document.getElementById('fb-ctx').textContent`);
  console.log('③ 上下文预览:', preview.slice(0, 110));

  // 4. 填写并提交
  await js(`document.getElementById('fb-text').value = '希望顶点式的动画能加一个自动对比两条曲线的功能'`);
  await js(`document.getElementById('fb-nick').value = '测试家长'`);
  await js(`document.getElementById('fb-send').click()`); await sleep(500);

  // 5. 校验 localStorage：字段完整、缩略图存在
  const stored = await js(`JSON.parse(localStorage.getItem('tuzhi_feedback_v1')||'[]')`);
  const last = stored[stored.length - 1];
  console.log('④ 已存留言:', stored.length, '条 | 昵称:', last.nick, '| 状态:', last.status);
  console.log('   ctx.page:', last.ctx.page, '| title:', last.ctx.title);
  console.log('   画面引用:', last.ctx.vizzes.map(v => v.type + ' 缩略图=' + (v.thumb ? v.thumb.length + 'B' : '无')).join(', '));
  console.log('   状态文字:', (last.ctx.vizzes[0] && last.ctx.vizzes[0].state || '').slice(0, 60));

  // 6. 列表渲染
  const listInfo = await js(`({n: document.querySelectorAll('.fb-item').length, badge: (document.querySelector('.fb-badge')||{}).textContent, hasThumb: !!document.querySelector('.fb-thumb'), ref: (document.querySelector('.fb-ref')||{}).textContent ? document.querySelector('.fb-ref').textContent.slice(0,70) : ''})`);
  console.log('⑤ 列表:', JSON.stringify(listInfo));

  // 7. 关闭再打开，状态保持；换页不留错
  await js(`document.getElementById('fb-close').click()`); await sleep(200);
  await send('Page.navigate', { url: BASE + '/rotate/index.html' }); await sleep(900);
  const otherPage = await js(`JSON.parse(localStorage.getItem('tuzhi_feedback_v1')||'[]').length`);
  await js(`document.getElementById('fb-fab').click()`); await sleep(300);
  const emptyHere = await js(`(document.querySelector('.fb-empty')||{}).textContent`);
  console.log('⑥ 换页后总存储仍为', otherPage, '条 | 本章页列表:', emptyHere);

  await send('Page.navigate', { url: BASE + '/rotate/rotation-concept.html' }); await sleep(1000);
  await js(`document.getElementById('fb-fab').click()`); await sleep(300);
  await js(`window.scrollTo(0, 500)`); await sleep(300);

  console.log('\nJS 异常:', errors.length ? errors.slice(0,3) : '无');
  ws.close(); process.exit(0);
});
