const BASE = 'http://127.0.0.1:8137';
const ws = new WebSocket(process.argv[2]);
const fs = require('fs');
let id = 0; const pending = new Map();
function send(m, p = {}) { return new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method: m, params: p })); }); }
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { const { res, rej } = pending.get(m.id); pending.delete(m.id); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); } });
const sleep = ms => new Promise(r => setTimeout(r, ms));
ws.addEventListener('open', async () => {
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: BASE + '/rotate/clock-app.html' }); await sleep(1100);
  const r = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('.shots/r-clock2.png', Buffer.from(r.data, 'base64'));
  console.log('saved');
  ws.close(); process.exit(0);
});
