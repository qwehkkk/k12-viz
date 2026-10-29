const fs = require('fs');
const f = 'assets/viz.js';
let s = fs.readFileSync(f, 'utf8');
const before = s.length;
s = s.replace('var cx = 210, cy = 210, R = 130, d = DEG * RAD;', 'var cx = 210, cy = 222, R = 106, d = DEG * RAD;');
s = s.replace("p6aTxt(ctx, 60, 372, '角度小于 45° 时，习惯把小的那个方向放前面', '#6b7a89');", "p6aTxt(ctx, 60, 372, '角度小于 45°：把小的方向放前面', '#6b7a89');");
const oldBlock = [
  "      p6aTxt(ctx, bx + A * cw / 2, 127, '甲 ' + A + ' 份', '#185fa5', 0, 1);",
  "      p6aTxt(ctx, bx + bw - B * cw / 2, 127, '乙 ' + B + ' 份', '#8a5a00', 0, 1);",
  "      p6aTxt(ctx, bx + bw / 2, 180, '总份数 = ' + A + ' + ' + B + ' = ' + tot, '#6b7a89', 0, 1);",
  "      p6aTxt(ctx, 80, 226, '① 每份 = ' + TT + ' ÷ ' + tot + ' = ' + (Math.round(each * 100) / 100), '#0f6e56');",
  "      p6aTxt(ctx, 80, 262, '② 甲 = ' + (Math.round(each * 100) / 100) + ' × ' + A + ' = ' + (Math.round(each * A * 100) / 100), '#185fa5');",
  "      p6aTxt(ctx, 80, 298, '③ 乙 = ' + (Math.round(each * 100) / 100) + ' × ' + B + ' = ' + (Math.round(each * B * 100) / 100), '#8a5a00');",
  "      p6aTxt(ctx, 80, 340, '检验：' + (Math.round(each * A * 100) / 100) + ' + ' + (Math.round(each * B * 100) / 100) + ' = ' + TT + ' ✓', '#c0392b');",
  "      p6aTxt(ctx, 80, 378, '也可以：甲 = 总量 × ' + A + '/' + tot + '（同一个答案）', '#6b7a89');"
].join('\n');
const newBlock = [
  "      p6aTxt(ctx, bx + A * cw / 2, 176, '甲 ' + A + ' 份', '#185fa5', 0, 1);",
  "      p6aTxt(ctx, bx + bw - B * cw / 2, 176, '乙 ' + B + ' 份', '#8a5a00', 0, 1);",
  "      p6aTxt(ctx, 80, 226, '① 总份数 = ' + A + ' + ' + B + ' = ' + tot, '#6b7a89');",
  "      p6aTxt(ctx, 80, 262, '② 每份 = ' + TT + ' ÷ ' + tot + ' = ' + (Math.round(each * 100) / 100), '#0f6e56');",
  "      p6aTxt(ctx, 80, 298, '③ 甲 = ' + (Math.round(each * A * 100) / 100) + '，乙 = ' + (Math.round(each * B * 100) / 100), '#185fa5');",
  "      p6aTxt(ctx, 80, 336, '检验：' + (Math.round(each * A * 100) / 100) + ' + ' + (Math.round(each * B * 100) / 100) + ' = ' + TT + ' ✓', '#c0392b');",
  "      p6aTxt(ctx, 80, 374, '也可以：甲 = 总量 × ' + A + '/' + tot + '（同一个答案）', '#6b7a89');"
].join('\n');
if (s.indexOf(oldBlock) < 0) { console.error('RATIO BLOCK NOT FOUND'); process.exit(1); }
s = s.replace(oldBlock, newBlock);
fs.writeFileSync(f, s);
console.log('patched', before, '->', s.length);
