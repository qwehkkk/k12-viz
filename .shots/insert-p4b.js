const fs = require('fs');
const path = require('path');
const VIZ = path.join(__dirname, '..', 'assets', 'viz.js');
const APP = path.join(__dirname, '..', 'assets', 'app.js');

const block = fs.readFileSync(path.join(__dirname, 'viz-p4b.js'), 'utf8');

const names = [
  ['p4b-arith', 'p4bArithLab'], ['p4b-view', 'p4bViewLab'], ['p4b-law', 'p4bLawLab'],
  ['p4b-dec2', 'p4bDec2Lab'], ['p4b-tri', 'p4bTriLab'], ['p4b-decalc', 'p4bDecalcLab'],
  ['p4b-motion', 'p4bMotionLab'], ['p4b-avg', 'p4bAvgLab'], ['p4b-cage', 'p4bCageLab']
];

let src = fs.readFileSync(VIZ, 'utf8');
const ANCHOR = '  window.VIZ = { ';
if (src.indexOf(ANCHOR) < 0) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
if (src.indexOf('function p4bArithLab') >= 0) { console.error('ALREADY INSERTED'); process.exit(1); }

const reg = names.map(n => n[1] + ': ' + n[1] + ', ').join('');
src = src.replace(ANCHOR, '\n/* ===== 小学四年级下册（p4b） ===== */\n' + block + '\n\n' + ANCHOR + reg);
fs.writeFileSync(VIZ, src);

let app = fs.readFileSync(APP, 'utf8');
const A = "      else if (cfg.type === 'p4-opt') VIZ.p4OptLab(el, cfg);";
if (app.indexOf(A) < 0) { console.error('APP ANCHOR NOT FOUND'); process.exit(1); }
const routes = names.map(n => "      else if (cfg.type === '" + n[0] + "') VIZ." + n[1] + "(el, cfg);").join('\n');
app = app.replace(A, A + '\n' + routes);
fs.writeFileSync(APP, app);

console.log('inserted', names.length, 'components + routes');
