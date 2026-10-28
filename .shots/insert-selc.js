const fs = require('fs');
const path = require('path');
const P = path.join(__dirname, '..', 'assets', 'viz.js');

const parts = ['viz-cp.js', 'viz-rv.js', 'viz-pd.js']
  .map(f => fs.readFileSync(path.join(__dirname, f), 'utf8'));

const names = [
  'cpPrincipleLab', 'cpPermLab', 'cpCombLab', 'cpPascalLab', 'cpBinomialLab',
  'rvDistLab', 'rvMeanLab', 'rvBinomLab', 'rvHyperLab', 'rvNormalLab',
  'pdScatterLab', 'pdRegressLab', 'pdFitLab', 'pdTableLab', 'pdChi2Lab'
];

let src = fs.readFileSync(P, 'utf8');
const ANCHOR = '  window.VIZ = { ';
if (src.indexOf(ANCHOR) < 0) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
if (src.indexOf('function cpPrincipleLab') >= 0) { console.error('ALREADY INSERTED'); process.exit(1); }

const block = '\n/* ===== 选择性必修第三册（计数原理 / 随机变量 / 成对数据） ===== */\n'
  + parts.join('\n\n') + '\n';

const reg = names.map(n => n + ': ' + n + ', ').join('');
src = src.replace(ANCHOR, block + '\n' + ANCHOR + reg);
fs.writeFileSync(P, src);
console.log('inserted', names.length, 'components; total lines:', src.split('\n').length);
