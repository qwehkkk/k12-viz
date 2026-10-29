const fs = require('fs');
const path = require('path');
const VIZ = path.join(__dirname, '..', 'assets', 'viz.js');
const APP = path.join(__dirname, '..', 'assets', 'app.js');

const block = fs.readFileSync(path.join(__dirname, 'viz-p6b.js'), 'utf8');

const names = [
  ['p6b-neg', 'p6bNegLab'], ['p6b-pct2', 'p6bPct2Lab'], ['p6b-cyl', 'p6bCylLab'],
  ['p6b-prop', 'p6bPropLab'], ['p6b-pigeon', 'p6bPigeonLab']
];

let src = fs.readFileSync(VIZ, 'utf8');
const ANCHOR = '  window.VIZ = { ';
if (src.indexOf(ANCHOR) < 0) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
if (src.indexOf('function p6bNegLab') >= 0) { console.error('ALREADY INSERTED'); process.exit(1); }

const reg = names.map(n => n[1] + ': ' + n[1] + ', ').join('');
src = src.replace(ANCHOR, '\n/* ===== 小学六年级下册（p6b） ===== */\n' + block + '\n\n' + ANCHOR + reg);
fs.writeFileSync(VIZ, src);

let app = fs.readFileSync(APP, 'utf8');
const A = "      else if (cfg.type === 'p6a-numshape') VIZ.p6aNumshapeLab(el, cfg);";
if (app.indexOf(A) < 0) { console.error('APP ANCHOR NOT FOUND'); process.exit(1); }
const routes = names.map(n => "      else if (cfg.type === '" + n[0] + "') VIZ." + n[1] + "(el, cfg);").join('\n');
app = app.replace(A, A + '\n' + routes);
fs.writeFileSync(APP, app);

console.log('inserted', names.length, 'components + routes');
