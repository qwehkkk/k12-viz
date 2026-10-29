// 修复折线统计图：周五气温滑块对 mode 0/1/2 无效
// 根因：data 里周五硬编码 20，只有 mode 3 用了变量 W
const fs = require('fs');
const path = require('path');
const VIZ = path.join(__dirname, '..', 'assets', 'viz.js');
let s = fs.readFileSync(VIZ, 'utf8');
let n = 0;

function rep(a, b) {
  if (s.indexOf(a) < 0) { console.error('MISS: ' + a.slice(0, 60)); process.exit(1); }
  s = s.replace(a, b); n++;
}

// 1) 去掉写死的数据源，改为 draw 内按 W 生成（四个模式共用）
rep(
  "  var info = s0.info;\n  var data = [12, 15, 14, 18, 20];\n  var days = ['一', '二', '三', '四', '五'];",
  "  var info = s0.info;\n  var days = ['一', '二', '三', '四', '五'];"
);

rep(
  "    var i;\n    var gx = 90, gy = 330, gw = 420, gh = 250, ymax2 = 30;",
  "    var i;\n    // 周五气温由滑块控制，四个模式共用同一份数据\n" +
  "    var data = [12, 15, 14, 18, W];\n" +
  "    var gx = 90, gy = 330, gw = 420, gh = 250, ymax2 = 30;"
);

// 2) mode 1：陡缓对比文案动态化（原来写死「升 3℃ / 升 2℃」）
rep(
  "      drawPts(data, '#6b7a89', 0);\n" +
  "      p5bTxt(ctx, 60, 385, '升 3℃（红）比升 2℃（绿）更陡更快', '#c0392b');",
  "      drawPts(data, '#6b7a89', 0);\n" +
  "      var d01 = data[1] - data[0], d34 = data[4] - data[3];\n" +
  "      var seg34 = d34 > 0 ? '升 ' + d34 + '℃' : d34 < 0 ? '降 ' + (-d34) + '℃' : '持平';\n" +
  "      var steeper = Math.abs(d34) > Math.abs(d01) ? '绿段更陡、变化更快'\n" +
  "        : Math.abs(d34) < Math.abs(d01) ? '红段更陡、变化更快' : '两段一样陡';\n" +
  "      p5bTxt(ctx, 60, 385, '红：升 ' + d01 + '℃，绿：' + seg34 + ' → ' + steeper, '#c0392b');"
);

// 3) mode 3：data2 已与 data 等价，直接复用；预测文案随升降变化
rep(
  "    var data2 = [data[0], data[1], data[2], data[3], W];\n",
  ""
);
rep(
  "      drawLine(data2.slice(0, 4), '#185fa5', false, 0);\n" +
  "      drawPts(data2.slice(0, 4), '#185fa5', 0);\n" +
  "      drawLine([data2[3], data2[4]], '#c0392b', true, 0);\n" +
  "      var q5 = pt(4, data2[4]);",
  "      drawLine(data.slice(0, 4), '#185fa5', false, 0);\n" +
  "      drawPts(data.slice(0, 4), '#185fa5', 0);\n" +
  "      drawLine([data[3], data[4]], '#c0392b', true, 0);\n" +
  "      var q5 = pt(4, data[4]);"
);
rep(
  "      p5bTxt(ctx, 60, 385, '连续缓升 → 周五「可能」' + W + '℃（留余地）', '#c0392b');",
  "      var tri = W > data[3] ? '仍在升' : W < data[3] ? '转为回落' : '与周四持平';\n" +
  "      p5bTxt(ctx, 60, 385, '顺着前 4 天走势 → 周五「可能」' + W + '℃（' + tri + '，用「可能」留余地）', '#c0392b');"
);

// 4) mode 0 标题点明滑块作用，避免用户不知道能拖
rep(
  "      p5bTxt(ctx, 60, 45, '一周气温折线图：描点 → 标数 → 连线', '#2c3e50', 1);",
  "      p5bTxt(ctx, 60, 45, '一周气温折线图：描点 → 标数 → 连线', '#2c3e50', 1);\n" +
  "      p5bTxt(ctx, 470, 45, '拖滑块改周五', '#6b7a89', 0, 1);"
);

fs.writeFileSync(VIZ, s);
console.log('patched ' + n + ' blocks');
