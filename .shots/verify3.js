const BASE = 'http://127.0.0.1:8137';
const ws = new WebSocket(process.argv[2]);
let id = 0; const pending = new Map(); const errors = [];
function send(m, p = {}) { return new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); }); }
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); }
  if (m.method === 'Runtime.exceptionThrown') errors.push((m.params.exceptionDetails.exception||{}).description || m.params.exceptionDetails.text);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function nav(url) { await send('Page.navigate', { url }); await sleep(800); }
async function js(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  if (r.exceptionDetails) return 'ERR:' + r.exceptionDetails.text;
  return r.result.value;
}
const CANVAS_INK = `(function(){
  var cvs = document.querySelectorAll('.viz-canvas');
  if (!cvs.length) return 'no-canvas';
  return [...cvs].map(function(cv){
    var ctx = cv.getContext('2d');
    try {
      var d = ctx.getImageData(0, 0, cv.width, cv.height).data;
      var ink = 0;
      for (var i = 0; i < d.length; i += 400) {
        if (d[i] < 245 || d[i+1] < 245 || d[i+2] < 245) ink++;
      }
      return ink;
    } catch(e) { return 'err'; }
  }).join(',');
})()`;

ws.addEventListener('open', async () => {
  await send('Page.enable'); await send('Runtime.enable');
  const cases = [
    ['/', '首页目录'],
    ['/rotate/index.html', '旋转章节页'],
    ['/rotate/rotation-concept.html', '旋转概念'],
    ['/rotate/rotation-properties.html', '旋转性质'],
    ['/rotate/rotation-drawing.html', '旋转作图'],
    ['/rotate/rotation-coordinate.html', '坐标旋转'],
    ['/rotate/center-symmetry.html', '中心对称'],
    ['/rotate/rotation-patterns.html', '旋转对称'],
    ['/rotate/clock-app.html', '钟表问题'],
    ['/rotate/patterns.html', '题型库'],
    ['/rotate/pattern/hand-in-hand.html', '手拉手题型'],
    ['/rotate/locate.html', '定位器']
  ];
  for (const [u, name] of cases) {
    await nav(BASE + u);
    const ink = await js(CANVAS_INK);
    console.log(name.padEnd(10), 'canvas墨点=' + ink);
  }
  // 钟表滑块联动
  await nav(BASE + '/rotate/clock-app.html');
  const b1 = await js(`document.querySelector('.viz-info').textContent.replace(/\\s+/g,' ').slice(0,60)`);
  await js(`(function(){var i=document.querySelectorAll('.viz-slider input')[1]; i.value=50; i.dispatchEvent(new Event('input'));})()`);
  await sleep(250);
  const b2 = await js(`document.querySelector('.viz-info').textContent.replace(/\\s+/g,' ').slice(0,60)`);
  console.log('\n钟表 30分→50分 联动:', b1 !== b2 ? '✓' : '✗', '|', b2.slice(0, 40));
  // 坐标旋转联动
  await nav(BASE + '/rotate/rotation-coordinate.html');
  const c1 = await js(`document.querySelector('.viz-expr').textContent`);
  await js(`(function(){var i=document.querySelectorAll('.viz-slider input')[0]; i.value=-3; i.dispatchEvent(new Event('input'));})()`);
  await sleep(250);
  const c2 = await js(`document.querySelector('.viz-expr').textContent`);
  console.log('坐标旋转 (3,2)→(-3,2) 联动:', c1 !== c2 ? '✓' : '✗', '|', c2);
  console.log('\nJS 异常:', errors.length ? errors.slice(0,3) : '无');
  ws.close(); process.exit(0);
});
