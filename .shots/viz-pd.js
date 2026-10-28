/* ===== 选择性必修第三册：成对数据的统计分析（pd） ===== */

function pdRnd(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

/* 散点图与相关：拖相关强度看形状 */
function pdScatterLab(el, cfg) {
  var p = Object.assign({ t: 0.7 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var t = p.t;
    var xs = [], ys = [], i;
    for (i = 1; i <= 12; i++) {
      xs.push(i);
      ys.push(20 + t * (i - 6.5) * 3 + (pdRnd(i) - 0.5) * 5 * (1 - 0.82 * Math.abs(t)));
    }
    var n = 12, mx = 0, my = 0;
    for (i = 0; i < n; i++) { mx += xs[i] / n; my += ys[i] / n; }
    var sxy = 0, sxx = 0, syy = 0;
    for (i = 0; i < n; i++) {
      sxy += (xs[i] - mx) * (ys[i] - my);
      sxx += (xs[i] - mx) * (xs[i] - mx);
      syy += (ys[i] - my) * (ys[i] - my);
    }
    var r = sxy / Math.sqrt(sxx * syy);
    var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
    var view = { xmin: 0, xmax: 13, ymin: ymin - 3, ymax: ymax + 3 };
    var m = linMap(s0.cv, view);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(24, m.py(0)); ctx.lineTo(m.w - 20, m.py(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(m.px(0), 20); ctx.lineTo(m.px(0), m.h - 20); ctx.stroke();
    ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (i = 2; i <= 12; i += 2) ctx.fillText(String(i), m.px(i), m.py(0) + 5);
    for (i = 0; i < n; i++) {
      ctx.beginPath(); ctx.arc(m.px(xs[i]), m.py(ys[i]), 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(24,95,165,0.75)'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
    }
    var level = Math.abs(r) < 0.3 ? '基本不相关' : (Math.abs(r) < 0.7 ? '相关性中等' : '相关性很强');
    var dir = r > 0.05 ? '同增同减（正相关）' : (r < -0.05 ? '一增一减（负相关）' : '无明显方向');
    s0.info.innerHTML = '<span class="viz-meta">12 个样本点的散点图，样本相关系数 r \u2248 <b>' + cFmt(Math.round(r * 100) / 100) + '</b>：' + level + '，' + dir + '。' +
      ' <b>先画散点图再谈回归</b>：|r| 接近 1 点才排在一条带子上；t 拖到 0 时点云乱成一团——这时候硬套回归直线毫无意义。' +
      ' r > 0 是正相关（直线向右上），r < 0 是负相关。r 只衡量<b>线性</b>关系，弯曲关系（如抛物线型）r 也会很小。</span>';
  }
  cSlider(s0.ctrl, '相关强度 t（\u22121 \u2192 1）', p.t, -1, 1, 0.1, function (v) { p.t = v; draw(); });
  draw();
}

/* 最小二乘法：亲手拖直线，挑战 SSE 最小 */
function pdRegressLab(el, cfg) {
  var p = Object.assign({ b: 1.0, a: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  var xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var ys = [4, 6, 7, 10, 12, 13, 16, 17, 19, 21];
  function ols() {
    var n = xs.length, i, mx = 0, my = 0;
    for (i = 0; i < n; i++) { mx += xs[i] / n; my += ys[i] / n; }
    var sxy = 0, sxx = 0;
    for (i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) * (xs[i] - mx); }
    var b = sxy / sxx;
    return { b: b, a: my - b * mx };
  }
  function sse(b, a) {
    var s = 0, i;
    for (i = 0; i < xs.length; i++) { var d = ys[i] - a - b * xs[i]; s += d * d; }
    return s;
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 11, ymin: 0, ymax: 24 }, 34);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var view = { xmin: 0, xmax: 11, ymin: 0, ymax: 24 };
    var i;
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(24, m.py(0)); ctx.lineTo(m.w - 20, m.py(0)); ctx.stroke();
    ctx.fillStyle = '#6b7a89'; ctx.font = FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (i = 2; i <= 10; i += 2) ctx.fillText(String(i), m.px(i), m.py(0) + 5);
    // 最小二乘直线（红虚线）
    var o = ols();
    tLineIn(m, view, [0, o.a], [1, o.a + o.b], 'rgba(192,57,43,0.8)', 2, [7, 5]);
    // 用户直线（蓝）
    tLineIn(m, view, [0, p.a], [1, p.a + p.b], '#185fa5', 2);
    // 数据点
    for (i = 0; i < xs.length; i++) {
      ctx.beginPath(); ctx.arc(m.px(xs[i]), m.py(ys[i]), 5, 0, Math.PI * 2);
      ctx.fillStyle = '#333'; ctx.fill();
    }
    var s1 = sse(p.b, p.a), s0m = sse(o.b, o.a);
    ctx.fillStyle = '#185fa5'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('\u4f60\u7684\u76f4\u7ebf \u0177 = ' + cFmt(p.b) + 'x + ' + cFmt(p.a), m.w - 200, 16);
    ctx.fillStyle = '#c0392b';
    ctx.fillText('\u6700\u5c0f\u4e8c\u4e58\u76f4\u7ebf\uff08\u865a\u7ebf\uff09', m.w - 200, 36);
    ctx.fillStyle = '#333';
    ctx.fillText('SSE = \u03a3(y\u1d62\u2212\u0177\u1d62)\u00b2', m.w - 200, 60);
    s0.info.innerHTML = '<span class="viz-meta">10 个数据点。蓝实线是你拖的直线，红虚线是<b>最小二乘法</b>的最优解：b\u0302 = \u03a3(x\u1d62\u2212x\u0304)(y\u1d62\u2212\u0233) / \u03a3(x\u1d62\u2212x\u0304)\u00b2 \u2248 <b>' + cFmt(Math.round(o.b * 100) / 100) + '</b>，\u00e2 = \u0233 \u2212 b\u0302x\u0304 \u2248 <b>' + cFmt(Math.round(o.a * 100) / 100) + '</b>。' +
      ' 你的误差平方和 = <b>' + cFmt(s1) + '</b>，理论最小值 = <b>' + cFmt(Math.round(s0m * 100) / 100) + '</b>。' +
      (s1 <= s0m + 0.05 ? ' <b style="color:#0f6e56">\u229a \u5df2\u7ecf\u8d34\u7740\u6700\u4f18\u89e3\u4e86\uff01</b>' : ' 把蓝线往红虚线上靠，看数字往下掉。<b>最小二乘 = 让误差平方和最小</b>，平方保证正负误差不抵消、且惩罚离群点。') +
      ' 回归直线必过样本中心点 (x\u0304, \u0233)——这是检验结果的快速手段。</span>';
  }
  cSlider(s0.ctrl, '斜率 b', p.b, -1, 4, 0.1, function (v) { p.b = v; draw(); });
  cSlider(s0.ctrl, '截距 a', p.a, -5, 10, 0.25, function (v) { p.a = v; draw(); });
  draw();
}

/* 拟合效果：残差与 R² */
function pdFitLab(el, cfg) {
  var p = Object.assign({ ds: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  var sets = [
    { name: '线性数据', gen: function (i) { return [i, 2 * i + 1 + (pdRnd(i) - 0.5) * 2.4]; } },
    { name: '弯曲数据（U 形）', gen: function (i) { return [i, 0.55 * (i - 5.5) * (i - 5.5) * 0.55 + 2 + (pdRnd(i + 40) - 0.5) * 2.4]; } },
    { name: '纯随机', gen: function (i) { return [i, 8 + (pdRnd(i + 90) - 0.5) * 9]; } }
  ];
  function draw() {
    var ds = sets[Math.round(p.ds) % 3];
    var xs = [], ys = [], i;
    for (i = 1; i <= 10; i++) { var xy = ds.gen(i); xs.push(xy[0]); ys.push(xy[1]); }
    var n = 10, mx = 0, my = 0;
    for (i = 0; i < n; i++) { mx += xs[i] / n; my += ys[i] / n; }
    var sxy = 0, sxx = 0, syy = 0;
    for (i = 0; i < n; i++) {
      sxy += (xs[i] - mx) * (ys[i] - my);
      sxx += (xs[i] - mx) * (xs[i] - mx);
      syy += (ys[i] - my) * (ys[i] - my);
    }
    var b = sxy / sxx, a = my - b * mx;
    var r = sxy / Math.sqrt(sxx * syy), R2 = r * r;
    var ymin = Math.min.apply(null, ys), ymax = Math.max.apply(null, ys);
    var view = { xmin: 0, xmax: 11, ymin: ymin - 2.5, ymax: ymax + 2.5 };
    var m = linMap(s0.cv, view);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(24, m.py(0)); ctx.lineTo(m.w - 20, m.py(0)); ctx.stroke();
    // 回归直线
    tLineIn(m, view, [0, a], [1, a + b], 'rgba(192,57,43,0.8)', 2);
    // 残差线段 + 数据点
    for (i = 0; i < n; i++) {
      var yh = a + b * xs[i];
      ctx.strokeStyle = 'rgba(15,110,86,0.6)'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(m.px(xs[i]), m.py(ys[i])); ctx.lineTo(m.px(xs[i]), m.py(yh)); ctx.stroke();
      ctx.beginPath(); ctx.arc(m.px(xs[i]), m.py(ys[i]), 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#333'; ctx.fill();
    }
    ctx.fillStyle = '#c0392b'; ctx.font = FONT; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('\u56de\u5f52\u76f4\u7ebf', m.w - 90, 14);
    ctx.fillStyle = '#0f6e56';
    ctx.fillText('\u7eff\u7ebf = \u6b8b\u5dee', m.w - 90, 32);
    var quality = R2 > 0.8 ? '<b style="color:#0f6e56">\u7ebf\u6027\u62df\u5408\u5f88\u597d</b>' : (R2 > 0.4 ? '\u62df\u5408\u4e00\u822c\uff0c\u53ea\u89e3\u91ca\u4e86\u4e00\u534a\u591a\u7684\u53d8\u5316' : '<b style="color:#c0392b">\u7ebf\u6027\u6a21\u578b\u4e0d\u5408\u9002</b>');
    s0.info.innerHTML = '<span class="viz-meta">' + ds.name + '：r \u2248 <b>' + cFmt(Math.round(r * 100) / 100) + '</b>，决定系数 R\u00b2 = r\u00b2 \u2248 <b>' + cFmt(Math.round(R2 * 100) / 100) + '</b> \u2192 ' + quality + '。' +
      ' R\u00b2 = 1 \u2212 \u03a3\u6b8b\u5dee\u00b2/\u03a3\u603b\u504f\u5dee\u00b2\uff0c\u542b\u4e49\u662f\u300c\u56de\u5f52\u76f4\u7ebf\u89e3\u91ca\u4e86 ' + Math.round(R2 * 100) + '% 的 y 变化\u300d。' +
      ' 判断流程：<b>散点图看形状 \u2192 r/R\u00b2 看强度 \u2192 残差点散乱随机 = 模型合适</b>；残差呈规律（如 U 形数据的绿线两头翘）说明该换模型，别硬用直线。</span>';
  }
  cSlider(s0.ctrl, '数据集（0 线性 / 1 弯曲 / 2 随机）', p.ds, 0, 2, 1, function (v) { p.ds = v; draw(); });
  draw();
}

/* 2×2 列联表与患病率对比 */
function pdTableLab(el, cfg) {
  var p = Object.assign({ a: 30, b: 20, c: 10, d: 40 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var a = Math.round(p.a), b = Math.round(p.b), c = Math.round(p.c), d = Math.round(p.d);
    var n1 = a + b, n0 = c + d, n = n1 + n0;
    var r1 = a / n1, r0 = c / n0;
    var m = linMap(s0.cv, { xmin: 0, xmax: 1, ymin: 0, ymax: 1 }, 14);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    // 表格
    var tx = 120, ty = 24, cw = 130, ch = 40;
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4;
    ctx.fillStyle = 'rgba(24,95,165,0.06)';
    ctx.fillRect(tx, ty, cw * 2, ch * 3);
    var lines = [
      ['', '\u60a3\u75c5', '\u4e0d\u60a3\u75c5', '\u5408\u8ba1'],
      ['\u5438\u70df', String(a), String(b), String(n1)],
      ['\u4e0d\u5438\u70df', String(c), String(d), String(n0)],
      ['\u5408\u8ba1', String(a + c), String(b + d), String(n)]
    ];
    var i, j;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.font = FONT;
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        var x = tx + j * cw * 0.62, y = ty + i * ch;
        ctx.fillStyle = i === 0 || j === 0 ? '#333' : '#185fa5';
        ctx.font = (i === 0 || j === 0 ? 'bold ' : '') + FONT;
        ctx.fillText(lines[i][j], x + cw * 0.31, y + ch / 2);
      }
    }
    for (i = 0; i <= 3; i++) {
      ctx.beginPath(); ctx.moveTo(tx, ty + i * ch); ctx.lineTo(tx + cw * 2.48, ty + i * ch); ctx.stroke();
    }
    for (j = 0; j <= 3; j++) {
      ctx.beginPath(); ctx.moveTo(tx + j * cw * 0.62, ty); ctx.lineTo(tx + j * cw * 0.62, ty + ch * 3); ctx.stroke();
    }
    // 两组患病率横条
    var by = ty + ch * 3 + 44, bw2 = m.w - 260, bx = 150;
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#333'; ctx.font = FONT;
    ctx.fillText('\u5438\u70df\u7ec4', bx - 12, by);
    ctx.fillText('\u4e0d\u5438\u70df\u7ec4', bx - 12, by + 34);
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1;
    ctx.strokeRect(bx, by - 10, bw2, 20);
    ctx.strokeRect(bx, by + 24, bw2, 20);
    ctx.fillStyle = 'rgba(192,57,43,0.6)';
    ctx.fillRect(bx, by - 10, bw2 * r1, 20);
    ctx.fillStyle = 'rgba(15,110,86,0.6)';
    ctx.fillRect(bx, by + 24, bw2 * r0, 20);
    ctx.fillStyle = '#c0392b'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(Math.round(r1 * 1000) / 10 + '%', bx + bw2 + 8, by);
    ctx.fillStyle = '#0f6e56';
    ctx.fillText(Math.round(r0 * 1000) / 10 + '%', bx + bw2 + 8, by + 34);
    ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
    ctx.fillText('0%', bx, by + 48);
    ctx.textAlign = 'right';
    ctx.fillText('100%', bx + bw2, by + 48);
    s0.info.innerHTML = '<span class="viz-meta">列联表把两类「是否」数据交叉计数。吸烟组患病率 = ' + a + '/' + n1 + ' \u2248 <b>' + cFmt(Math.round(r1 * 1000) / 1000) + '</b>，不吸烟组 = ' + c + '/' + n0 + ' \u2248 <b>' + cFmt(Math.round(r0 * 1000) / 1000) + '</b>。' +
      (Math.abs(r1 - r0) < 0.02
        ? ' 两组几乎一样高——<b>频率差不多 \u2260 一定独立</b>，够不够「有关联」的结论要交给 \u03c7\u00b2 检验。'
        : ' 两组频率差距明显——<b>但「看起来差很多」是描述，\u03c7\u00b2 检验才是推断</b>：差这么多是否可能只是抽样波动？下一节回答。') +
      '</span>';
  }
  cSlider(s0.ctrl, 'a 吸烟且患病', p.a, 5, 60, 5, function (v) { p.a = v; draw(); });
  cSlider(s0.ctrl, 'b 吸烟不患病', p.b, 5, 60, 5, function (v) { p.b = v; draw(); });
  cSlider(s0.ctrl, 'c 不吸烟患病', p.c, 5, 60, 5, function (v) { p.c = v; draw(); });
  cSlider(s0.ctrl, 'd 不吸烟不患病', p.d, 5, 60, 5, function (v) { p.d = v; draw(); });
  draw();
}

/* 独立性检验：χ² 统计量与临界值 */
function pdChi2Lab(el, cfg) {
  var p = Object.assign({ a: 30, b: 20, c: 10, d: 40 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var a = Math.round(p.a), b = Math.round(p.b), c = Math.round(p.c), d = Math.round(p.d);
    var n = a + b + c + d;
    var num = n * (a * d - b * c) * (a * d - b * c);
    var den = (a + b) * (c + d) * (a + c) * (b + d);
    var chi2 = den > 0 ? num / den : 0;
    var m = linMap(s0.cv, { xmin: 0, xmax: 1, ymin: 0, ymax: 1 }, 14);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    // 公式卡
    ctx.fillStyle = 'rgba(138,90,0,0.07)';
    ctx.fillRect(30, 20, m.w - 60, 46);
    ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 1.2;
    ctx.strokeRect(30, 20, m.w - 60, 46);
    ctx.fillStyle = '#333'; ctx.font = '14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('\u03c7\u00b2 = n(ad\u2212bc)\u00b2 / [(a+b)(c+d)(a+c)(b+d)] = ' + cFmt(n) + '\u00d7(' + (a * d - b * c) + ')\u00b2 / ' + cFmt(den) + ' \u2248 ' + cFmt(Math.round(chi2 * 100) / 100), m.w / 2, 44);
    // 量尺
    var gx = 60, gw = m.w - 140, gy = 150, top = 12;
    var sc = gw / top;
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gw, gy); ctx.stroke();
    var marks = [[2.706, '90%', 0.1], [3.841, '95%', 0.05], [6.635, '99%', 0.01]];
    var i;
    for (i = 0; i < marks.length; i++) {
      var x = gx + marks[i][0] * sc;
      ctx.strokeStyle = 'rgba(138,90,0,0.7)'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(x, gy - 12); ctx.lineTo(x, gy + 12); ctx.stroke();
      ctx.fillStyle = '#8a5a00'; ctx.font = FONT;
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(marks[i][1] + '\uff5c' + marks[i][0], x, gy + 16);
    }
    for (i = 0; i <= 5; i++) {
      ctx.fillStyle = '#6b7a89'; ctx.font = FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(String(i * 2), gx + i * 2 * sc, gy + 34);
    }
    // 指针
    var nx = gx + Math.min(chi2, top) * sc;
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(nx, gy - 26); ctx.lineTo(nx, gy + 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(nx, gy - 26); ctx.lineTo(nx - 6, gy - 16); ctx.lineTo(nx + 6, gy - 16);
    ctx.closePath(); ctx.fillStyle = '#c0392b'; ctx.fill();
    ctx.fillStyle = '#c0392b'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('\u03c7\u00b2 = ' + cFmt(Math.round(chi2 * 100) / 100), nx, gy - 30);
    var concl;
    if (chi2 > 6.635) concl = '<b style="color:#c0392b">\u03c7\u00b2 > 6.635\uff1a\u6709 99% \u7684\u628a\u63e1\u8ba4\u4e3a\u4e24\u53d8\u91cf\u6709\u5173\u8054</b>';
    else if (chi2 > 3.841) concl = '<b style="color:#c0392b">\u03c7\u00b2 > 3.841\uff1a\u6709 95% \u7684\u628a\u63e1\u8ba4\u4e3a\u6709\u5173\u8054</b>';
    else if (chi2 > 2.706) concl = '<b style="color:#8a5a00">\u03c7\u00b2 > 2.706\uff1a\u6709 90% \u7684\u628a\u63e1\u8ba4\u4e3a\u6709\u5173\u8054\uff08\u4e0d\u5230 95%\uff0c\u8bf4\u670d\u529b\u5f31\uff09</b>';
    else concl = '\u03c7\u00b2 \u592a\u5c0f\uff1a<b>\u6ca1\u6709\u5145\u5206\u8bc1\u636e</b>说明有关联（注意：不能说「独立」，只能说证据不足）';
    s0.info.innerHTML = '<span class="viz-meta">\u4e00\u3001\u5217\u8868\u3001\u7b97 \u03c7\u00b2\uff1b\u4e8c\u3001\u5bf9\u4e34\u754c\u503c\u3001\u4e0b\u7ed3\u8bba\u3002' +
      ' ad\u2212bc \u8d8a\u5927\uff08\u8868\u683c\u5bf9\u89d2\u5dee\u5f02\u8d8a\u60ac\u6b8a\uff09\uff0c\u03c7\u00b2 \u8d8a\u5927\uff1b' + concl + '。' +
      ' <b>\u53cd\u76f4\u89c9\u4e4b\u5904</b>\uff1a\u03c7\u00b2 \u68c0\u9a8c\u7684\u96f6\u5047\u8bbe\u662f「两变量<b>独立</b>（无关联）」，拒绝它才说有关——而且说的是概率层面的把握，不是因果。n 越大、差异越悬殊，\u03c7\u00b2 越容易过线。</span>';
  }
  cSlider(s0.ctrl, 'a（吸烟且患病）', p.a, 5, 60, 5, function (v) { p.a = v; draw(); });
  cSlider(s0.ctrl, 'b（吸烟不患病）', p.b, 5, 60, 5, function (v) { p.b = v; draw(); });
  cSlider(s0.ctrl, 'c（不吸烟患病）', p.c, 5, 60, 5, function (v) { p.c = v; draw(); });
  cSlider(s0.ctrl, 'd（不吸烟不患病）', p.d, 5, 60, 5, function (v) { p.d = v; draw(); });
  draw();
}
