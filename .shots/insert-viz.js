const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const FILES = ['viz-vectors.js', 'viz-complex.js', 'viz-solid.js', 'viz-stat.js', 'viz-prob.js'];
const REG = [
  ['pv-arrow', 'pvArrowLab'], ['pv-add', 'pvAddLab'], ['pv-coord', 'pvCoordLab'],
  ['pv-dot', 'pvDotLab'], ['pv-sine', 'pvSineLab'], ['pv-cosine', 'pvCosineLab'],
  ['cx-class', 'cxClassLab'], ['cx-equal', 'cxEqualLab'], ['cx-op', 'cxOpLab'],
  ['cx-plane', 'cxPlaneLab'], ['cx-quad', 'cxQuadLab'],
  ['sg-solid', 'sgSolidLab'], ['sg-net', 'sgNetLab'], ['sg-volume', 'sgVolumeLab'],
  ['sg-lines', 'sgLinesLab'], ['sg-angle', 'sgAngleLab'],
  ['sh-sample', 'shSampleLab'], ['sh-hist', 'shHistLab'], ['sh-central', 'shCentralLab'],
  ['sh-spread', 'shSpreadLab'], ['sh-corr', 'shCorrLab'],
  ['ph-dice', 'phDiceLab'], ['ph-add', 'phAddLab'], ['ph-indep', 'phIndepLab'], ['ph-freq', 'phFreqLab']
];

let add = '';
FILES.forEach(function (f) {
  const t = fs.readFileSync(path.join(__dirname, f), 'utf8');
  if (/window\.VIZ/.test(t)) throw new Error('file contains VIZ: ' + f);
  add += t + '\n';
});

/* 1) viz.js：插入组件 + 注册 */
const vp = path.join(ROOT, 'assets', 'viz.js');
let src = fs.readFileSync(vp, 'utf8');
if (src.indexOf('pvArrowLab') >= 0) throw new Error('already inserted');
const anchor = '  window.VIZ = {';
const idx = src.indexOf(anchor);
if (idx < 0) throw new Error('VIZ anchor not found');
const names = REG.map(function (r) { return r[1] + ': ' + r[1] + ', '; }).join('');
src = src.slice(0, idx) + add + '\n' + anchor + ' ' + names + src.slice(idx + anchor.length + 1);
fs.writeFileSync(vp, src);
console.log('viz.js inserted, lines =', src.split('\n').length);

/* 2) app.js：追加路由 */
const ap = path.join(ROOT, 'assets', 'app.js');
let app = fs.readFileSync(ap, 'utf8');
const lastRoute = "      else if (cfg.type === 'fr-eq') VIZ.frEqLab(el, cfg);";
if (app.indexOf(lastRoute) < 0) throw new Error('route anchor not found');
const routes = REG.map(function (r) { return "      else if (cfg.type === '" + r[0] + "') VIZ." + r[1] + '(el, cfg);'; }).join('\n');
app = app.replace(lastRoute, lastRoute + '\n' + routes);
fs.writeFileSync(ap, app);
console.log('app.js routes added:', REG.length);
