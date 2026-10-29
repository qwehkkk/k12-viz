const fs = require('fs');
const path = require('path');
const VIZ = path.join(__dirname, '..', 'assets', 'viz.js');
const APP = path.join(__dirname, '..', 'assets', 'app.js');

const block = fs.readFileSync(path.join(__dirname, 'viz-p4a.js'), 'utf8');

const names = [
  ['p4-num', 'p4NumLab'], ['p4-area2', 'p4AreaLab'], ['p4-ang', 'p4AngLab'],
  ['p4-mult', 'p4MultLab'], ['p4-quad', 'p4QuadLab'], ['p4-div', 'p4DivLab'],
  ['p4-bar', 'p4BarLab'], ['p4-opt', 'p4OptLab']
];

let src = fs.readFileSync(VIZ, 'utf8');
const ANCHOR = '  window.VIZ = { ';
if (src.indexOf(ANCHOR) < 0) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
if (src.indexOf('function p4NumLab') >= 0) { console.error('ALREADY INSERTED'); process.exit(1); }

const reg = names.map(n => n[1] + ': ' + n[1] + ', ').join('');
src = src.replace(ANCHOR, '\n/* ===== 小学四年级上册（p4） ===== */\n' + block + '\n\n' + ANCHOR + reg);
fs.writeFileSync(VIZ, src);

let app = fs.readFileSync(APP, 'utf8');
const A = "      else if (cfg.type === 'ep-match') VIZ.epMatchLab(el, cfg);";
if (app.indexOf(A) < 0) { console.error('APP ANCHOR NOT FOUND'); process.exit(1); }
const routes = names.map(n => "      else if (cfg.type === '" + n[0] + "') VIZ." + n[1] + "(el, cfg);").join('\n');
app = app.replace(A, A + '\n' + routes);
fs.writeFileSync(APP, app);

console.log('inserted', names.length, 'components + routes');
