const BASE = 'http://127.0.0.1:8137';
const ws = new WebSocket(process.argv[2]);
let id = 0; const pending = new Map(); const errors = [];
function send(m, p = {}) { return new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); }); }
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); }
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text + ' ' + (m.params.exceptionDetails.exception||{}).description);
});
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function nav(url) { await send('Page.navigate', { url }); await sleep(800); }
async function js(expr) {
  const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  if (r.exceptionDetails) return 'ERR:' + r.exceptionDetails.text;
  return r.result.value;
}
// canvas 是否真有内容
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
  await send('Page.enable');
  await send('Runtime.enable');
  const cases = [
    ['/', '课程目录'],
    ['/quadratic-equation/index.html', '章节页'],
    ['/quadratic-equation/completing-square.html', '配方法（几何拼图）'],
    ['/quadratic-equation/formula.html', '公式法（判别式实验台）'],
    ['/quadratic-equation/growth.html', '增长率'],
    ['/quadratic-equation/square-root.html', '开平方'],
    ['/quadratic-equation/vieta.html', '韦达'],
    ['/quadratic-equation/pattern/growth-model.html', '题型页'],
    ['/quadratic-equation/locate.html', '定位器']
  ];
  for (const [u, name] of cases) {
    await nav(BASE + u);
    const canvasInk = await js(CANVAS_INK);
    const hasPrev = await js(`!!document.querySelector('.prev-bar')`);
    console.log(`${name.padEnd(22)} canvas墨点=${String(canvasInk).padEnd(10)} prev=${hasPrev}`);
  }
  // 检查配方法页的滑块交互
  await nav(BASE + '/quadratic-equation/completing-square.html');
  const before = await js(`document.querySelector('.viz-info') ? document.querySelector('.viz-info').textContent.slice(0,40) : 'none'`);
  await js(`(function(){var i=document.querySelector('.viz-slider input'); i.value=10; i.dispatchEvent(new Event('input'));})()`);
  await sleep(300);
  const after = await js(`document.querySelector('.viz-info') ? document.querySelector('.viz-info').textContent.slice(0,40) : 'none'`);
  console.log('\n配方法拖滑块前:', before);
  console.log('配方法拖滑块后:', after);
  console.log('内容变化:', before !== after ? '✓' : '✗ 无变化');

  await nav(BASE + '/quadratic-equation/formula.html');
  const d1 = await js(`document.querySelectorAll('.viz-info')[0].textContent.replace(/\\s+/g,' ').slice(0,90)`);
  console.log('\n公式法实验台读数:', d1);

  console.log('\nJS 异常:', errors.length ? errors.slice(0,3) : '无');
  ws.close(); process.exit(0);
});
