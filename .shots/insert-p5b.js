const fs = require('fs');
const path = require('path');
const VIZ = path.join(__dirname, '..', 'assets', 'viz.js');
const APP = path.join(__dirname, '..', 'assets', 'app.js');

const block = fs.readFileSync(path.join(__dirname, 'viz-p5b.js'), 'utf8');

const names = [
  ['p5b-view3', 'p5bView3Lab'], ['p5b-factor', 'p5bFactorLab'], ['p5b-box', 'p5bBoxLab'],
  ['p5b-frac', 'p5bFracLab'], ['p5b-rot', 'p5bRotLab'], ['p5b-fadd', 'p5bFaddLab'],
  ['p5b-line', 'p5bLineLab'], ['p5b-find', 'p5bFindLab']
];

let src = fs.readFileSync(VIZ, 'utf8');
const ANCHOR = '  window.VIZ = { ';
if (src.indexOf(ANCHOR) < 0) { console.error('ANCHOR NOT FOUND'); process.exit(1); }
if (src.indexOf('function p5bView3Lab') >= 0) { console.error('ALREADY INSERTED'); process.exit(1); }

const reg = names.map(n => n[1] + ': ' + n[1] + ', ').join('');
src = src.replace(ANCHOR, '\n/* ===== 小学五年级下册（p5b） ===== */\n' + block + '\n\n' + ANCHOR + reg);
fs.writeFileSync(VIZ, src);

let app = fs.readFileSync(APP, 'utf8');
const A = "      else if (cfg.type === 'p5a-tree') VIZ.p5aTreeLab(el, cfg);";
if (app.indexOf(A) < 0) { console.error('APP ANCHOR NOT FOUND'); process.exit(1); }
const routes = names.map(n => "      else if (cfg.type === '" + n[0] + "') VIZ." + n[1] + "(el, cfg);").join('\n');
app = app.replace(A, A + '\n' + routes);
fs.writeFileSync(APP, app);

console.log('inserted', names.length, 'components + routes');
