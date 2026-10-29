const fs = require('fs');
const path = require('path');
const VIZ = path.join(__dirname, '..', 'assets', 'viz.js');
const APP = path.join(__dirname, '..', 'assets', 'app.js');

const files = [
  ['viz-p1a.js', '/* ===== 小学一年级上册（p1a） ===== */'],
  ['viz-p1b.js', '/* ===== 小学一年级下册（p1b） ===== */'],
  ['viz-p2a.js', '/* ===== 小学二年级上册（p2a） ===== */'],
  ['viz-p2b.js', '/* ===== 小学二年级下册（p2b） ===== */']
];

const names = [
  ['p1a-count', 'p1aCountLab'], ['p1a-pos', 'p1aPosLab'], ['p1a-15', 'p1a15Lab'],
  ['p1a-shape', 'p1aShapeLab'], ['p1a-610', 'p1a610Lab'], ['p1a-1120', 'p1a1120Lab'],
  ['p1a-clock', 'p1aClockLab'], ['p1a-carry', 'p1aCarryLab'],
  ['p1b-shape2', 'p1bShape2Lab'], ['p1b-sub20', 'p1bSub20Lab'], ['p1b-sort', 'p1bSortLab'],
  ['p1b-100', 'p1b100Lab'], ['p1b-money', 'p1bMoneyLab'], ['p1b-add100', 'p1bAdd100Lab'],
  ['p1b-pattern', 'p1bPatternLab'],
  ['p2a-len', 'p2aLenLab'], ['p2a-add2', 'p2aAdd2Lab'], ['p2a-angle', 'p2aAngleLab'],
  ['p2a-mult1', 'p2aMult1Lab'], ['p2a-view', 'p2aViewLab'], ['p2a-mult2', 'p2aMult2Lab'],
  ['p2a-time', 'p2aTimeLab'], ['p2a-match', 'p2aMatchLab'],
  ['p2b-data', 'p2bDataLab'], ['p2b-div1', 'p2bDiv1Lab'], ['p2b-motion', 'p2bMotionLab'],
  ['p2b-div2', 'p2bDiv2Lab'], ['p2b-mixed', 'p2bMixedLab'], ['p2b-rem', 'p2bRemLab'],
  ['p2b-wan', 'p2bWanLab'], ['p2b-weight', 'p2bWeightLab'], ['p2b-logic', 'p2bLogicLab']
];

let src = fs.readFileSync(VIZ, 'utf8');
const ANCHOR = '  window.VIZ = { ';
if (src.indexOf(ANCHOR) < 0) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
if (src.indexOf('function p1aCountLab') >= 0) { console.error('ALREADY INSERTED'); process.exit(1); }

let block = '';
for (const [f] of files) {
  block += '\n' + fs.readFileSync(path.join(__dirname, f), 'utf8') + '\n';
}

const reg = names.map(n => n[1] + ': ' + n[1] + ', ').join('');
src = src.replace(ANCHOR, block + '\n' + ANCHOR + reg);
fs.writeFileSync(VIZ, src);

let app = fs.readFileSync(APP, 'utf8');
const A = "      else if (cfg.type === 'p6b-pigeon') VIZ.p6bPigeonLab(el, cfg);";
if (app.indexOf(A) < 0) { console.error('APP ANCHOR NOT FOUND'); process.exit(1); }
const routes = names.map(n => "      else if (cfg.type === '" + n[0] + "') VIZ." + n[1] + "(el, cfg);").join('\n');
app = app.replace(A, A + '\n' + routes);
fs.writeFileSync(APP, app);

console.log('inserted', names.length, 'components + routes');
