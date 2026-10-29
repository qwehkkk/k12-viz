const fs = require('fs');
const path = require('path');
const VIZ = path.join(__dirname, '..', 'assets', 'viz.js');
const APP = path.join(__dirname, '..', 'assets', 'app.js');

const block = fs.readFileSync(path.join(__dirname, 'viz-p6a.js'), 'utf8');

const names = [
  ['p6a-fmul', 'p6aFmulLab'], ['p6a-pos2', 'p6aPos2Lab'],
  ['p6a-fdiv', 'p6aFdivLab'], ['p6a-ratio', 'p6aRatioLab'],
  ['p6a-circle', 'p6aCircleLab'], ['p6a-pct', 'p6aPctLab'],
  ['p6a-pie', 'p6aPieLab'], ['p6a-numshape', 'p6aNumshapeLab']
];

let src = fs.readFileSync(VIZ, 'utf8');
const ANCHOR = '  window.VIZ = { ';
if (src.indexOf(ANCHOR) < 0) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
if (src.indexOf('function p6aFmulLab') >= 0) { console.error('ALREADY INSERTED'); process.exit(1); }

const reg = names.map(n => n[1] + ': ' + n[1] + ', ').join('');
src = src.replace(ANCHOR, '\n/* ===== 小学六年级上册（p6a） ===== */\n' + block + '\n\n' + ANCHOR + reg);
fs.writeFileSync(VIZ, src);

let app = fs.readFileSync(APP, 'utf8');
const A = "      else if (cfg.type === 'p5b-find') VIZ.p5bFindLab(el, cfg);";
if (app.indexOf(A) < 0) { console.error('APP ANCHOR NOT FOUND'); process.exit(1); }
const routes = names.map(n => "      else if (cfg.type === '" + n[0] + "') VIZ." + n[1] + "(el, cfg);").join('\n');
app = app.replace(A, A + '\n' + routes);
fs.writeFileSync(APP, app);

console.log('inserted', names.length, 'components + routes');
