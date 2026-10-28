const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'assets', 'viz.js');

const parts = ['viz-sv.js', 'viz-lc.js', 'viz-cn.js', 'viz-sq.js', 'viz-dv.js']
  .map(f => fs.readFileSync(path.join(__dirname, f), 'utf8'));

const names = [
  'svSpaceLab', 'svDotLab', 'svNormalLab', 'svAngleLab', 'svDistLab',
  'lcSlopeLab', 'lcEqLab', 'lcPosLab', 'lcCircleLab', 'lcCposLab',
  'cnEllipseLab', 'cnEpropLab', 'cnHyperbolaLab', 'cnParabolaLab', 'cnLineLab',
  'sqConceptLab', 'sqArithLab', 'sqGeoLab', 'sqSumLab', 'sqRecurLab',
  'dvDefLab', 'dvCalcLab', 'dvMonoLab', 'dvExtremeLab', 'dvOptLab'
];

let src = fs.readFileSync(P, 'utf8');
const ANCHOR = '  window.VIZ = { ';
if (src.indexOf(ANCHOR) < 0) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
if (src.indexOf('function svSpaceLab') >= 0) { console.error('ALREADY INSERTED'); process.exit(1); }

const block = '\n/* ===== 选择性必修（空间向量 / 直线与圆 / 圆锥曲线 / 数列 / 导数） ===== */\n'
  + parts.join('\n\n') + '\n';

const reg = names.map(n => n + ': ' + n + ', ').join('');
src = src.replace(ANCHOR, block + '\n' + ANCHOR + reg);
fs.writeFileSync(P, src);
console.log('inserted', names.length, 'components; total lines:', src.split('\n').length);
