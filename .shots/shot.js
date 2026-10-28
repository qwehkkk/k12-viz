const BASE = 'http://127.0.0.1:8137';
const ws = new WebSocket(process.argv[2]);
const fs = require('fs');
let id = 0; const pending = new Map();
function send(m, p = {}) { return new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); }); }
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); } });
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function shot(file) {
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
  console.log('saved', file);
}
ws.addEventListener('open', async () => {
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/patterns.html' }); await sleep(700);
  await send('Page.navigate', { url: BASE + '/pattern/t04.html' }); await sleep(700);
  await send('Page.navigate', { url: BASE + '/point/p04.html' }); await sleep(900);
  await shot('.shots/nav-top.png');
  await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1100)' }); await sleep(600);
  await shot('.shots/nav-scrolled.png');
  ws.close(); process.exit(0);
});
