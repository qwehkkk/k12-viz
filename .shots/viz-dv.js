/* ===== 导数及其应用（dv） ===== */

/* 导数的定义：割线趋近切线 */
function dvDefLab(el, cfg) {
  var p = Object.assign({ x0: 1, dx: 150 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var x0 = p.x0, h = p.dx / 100;    // dx 存 150 表示 1.50
    var X = Math.max(Math.abs(x0) + h + 1.2, 2.6);
    var view = { xmin: -X, xmax: X, ymin: -1.2, ymax: X * X + 1.2 };
    var m = linMap(s0.cv, view);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    // 网格
    ctx.strokeStyle = '#eef2f6'; ctx.lineWidth = 1;
    var g;
    for (g = Math.ceil(view.xmin); g <= view.xmax; g++) {
      ctx.beginPath(); ctx.moveTo(m.px(g), 0); ctx.lineTo(m.px(g), m.h); ctx.stroke();
    }
    for (g = 0; g <= view.ymax; g += Math.max(1, Math.round(X / 3))) {
      ctx.beginPath(); ctx.moveTo(0, m.py(g)); ctx.lineTo(m.w, m.py(g)); ctx.stroke();
    }
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(0, m.py(0)); ctx.lineTo(m.w, m.py(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(m.px(0), 0); ctx.lineTo(m.px(0), m.h); ctx.stroke();
    // 抛物线
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.4;
    ctx.beginPath();
    var first = true, i;
    for (i = 0; i <= 200; i++) {
      var xx = view.xmin + (view.xmax - view.xmin) * i / 200;
      var yy = xx * xx;
      if (yy > view.ymax) { first = true; continue; }
      if (first) { ctx.moveTo(m.px(xx), m.py(yy)); first = false; } else ctx.lineTo(m.px(xx), m.py(yy));
    }
    ctx.stroke();
    var y0 = x0 * x0, x1 = x0 + h, y1 = x1 * x1;
    var kSec = (y1 - y0) / h, kTan = 2 * x0;
    // 切线（过 P，斜率 2x0）
    ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(m.px(x0 - 2.2), m.py(y0 - 2.2 * kTan));
    ctx.lineTo(m.px(x0 + 2.2), m.py(y0 + 2.2 * kTan));
    ctx.stroke();
    // 割线 PQ
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    var ext = 1.6;
    var ux = ext / Math.hypot(1, kSec), uy = kSec * ux;
    ctx.beginPath();
    ctx.moveTo(m.px(x0 - ux * 1.6), m.py(y0 - uy * 1.6));
    ctx.lineTo(m.px(x1 + ux), m.py(y1 + uy));
    ctx.stroke(); ctx.setLineDash([]);
    // 点
    ctx.beginPath(); ctx.arc(m.px(x0), m.py(y0), 5, 0, Math.PI * 2);
    ctx.fillStyle = '#0f6e56'; ctx.fill();
    ctx.beginPath(); ctx.arc(m.px(x1), m.py(y1), 5, 0, Math.PI * 2);
    ctx.fillStyle = '#c0392b'; ctx.fill();
    ctx.fillStyle = '#333'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
    ctx.fillText('P', m.px(x0) - 16, m.py(y0) - 6);
    ctx.fillStyle = '#c0392b';
    ctx.fillText('Q', m.px(x1) + 8, m.py(y1) - 6);
    // Δx 标注
    ctx.strokeStyle = 'rgba(192,57,43,0.5)'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(m.px(x0), m.py(y0)); ctx.lineTo(m.px(x1), m.py(y0)); ctx.stroke();
    ctx.fillStyle = '#c0392b'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('Δx = ' + cFmt(h), (m.px(x0) + m.px(x1)) / 2, m.py(y0) + 6);
    s0.info.innerHTML = '<span class="viz-meta">f(x) = x²，P(' + cFmt(x0) + ', ' + cFmt(y0) +
      ') 固定，Q 随 Δx 移动。割线 PQ 的斜率 = [f(x₀+Δx) − f(x₀)]/Δx = <b>' + cFmt(kSec) + '</b>；' +
      '切线（绿色）斜率 = f′(x₀) = <b>' + cFmt(kTan) + '</b>。' +
      ' Δx = ' + cFmt(h) + ' 时割线斜率比切线多出的正是 Δx 本身。' +
      ' <b>把 Δx 拖到最小，红色割线会慢慢转到绿色切线上</b>——但永远差那么一点，极限才真正相等。这就是「导数是割线斜率的极限」。</span>';
  }
  cSlider(s0.ctrl, '切点 x₀', p.x0, -2, 2, 0.25, function (v) { p.x0 = v; draw(); });
  cSlider(s0.ctrl, 'Δx（×0.01）', p.dx, 10, 200, 5, function (v) { p.dx = v; draw(); });
  draw();
}

/* 求导：逐层剥开 */
function dvCalcLab(el, cfg) {
  var p = Object.assign({ mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var cases = [
    { f: '(2x + 1)³', outer: '外层：u³ → 3u²', inner: '内层：u = 2x + 1 → u′ = 2', res: '6(2x + 1)²', note: '复合函数：外层导数 × 内层导数' },
    { f: 'x · eˣ', outer: '乘积：u′v + uv′', inner: 'u = x → 1，v = eˣ → eˣ', res: 'eˣ(1 + x)', note: '乘积法则：两项分别求导再相加' },
    { f: 'lnx / x', outer: '商：(u′v − uv′)/v²', inner: 'u = lnx → 1/x，v = x → 1', res: '(1 − lnx)/x²', note: '商的法则：分子是「分母乘分子导 − 分子乘分母导」' }
  ];
  function draw() {
    var c = cases[Math.round(p.mode) % 3];
    var view = { xmin: 0, xmax: 1, ymin: 0, ymax: 1 };
    var m = linMap(s0.cv, view, 14);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var rows = [
      { label: '原式', text: c.f, color: '#185fa5', bg: 'rgba(24,95,165,0.10)' },
      { label: '结构', text: c.outer, color: '#7d3c98', bg: 'rgba(125,60,152,0.10)' },
      { label: '细节', text: c.inner, color: '#8a5a00', bg: 'rgba(138,90,0,0.10)' },
      { label: '结果', text: c.res, color: '#c0392b', bg: 'rgba(192,57,43,0.12)' }
    ];
    var cardH = Math.min((m.h - 40) / rows.length - 10, 48);
    var cardW = m.w - 110, x0 = 78;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    rows.forEach(function (r, i) {
      var y = 22 + i * (cardH + 12);
      ctx.fillStyle = r.bg;
      ctx.fillRect(x0, y, cardW, cardH);
      ctx.strokeStyle = r.color; ctx.lineWidth = 1.4;
      ctx.strokeRect(x0, y, cardW, cardH);
      ctx.fillStyle = r.color;
      ctx.font = (i === 3 ? 'bold ' : '') + '15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(r.text, x0 + cardW / 2, y + cardH / 2);
      ctx.fillStyle = '#6b7a89';
      ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(r.label, x0 - 10, y + cardH / 2);
      ctx.textAlign = 'center';
      if (i < rows.length - 1) {
        ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.6;
        var cx2 = x0 + cardW / 2;
        ctx.beginPath();
        ctx.moveTo(cx2, y + cardH); ctx.lineTo(cx2, y + cardH + 8);
        ctx.stroke();
      }
    });
    s0.info.innerHTML = '<span class="viz-meta">' + c.note + '。求导的第一步不是套公式，而是' +
      '<b>认出结构</b>：是加减、乘积、商，还是复合？结构认错，公式必然套错。' +
      ' 上面这条链子就是思考顺序：<b>先看外层，再剥内层，最后相乘</b>。' +
      ' 复合函数最容易漏的是内层导数（如 (2x+1)³ 漏乘 2）。</span>';
  }
  cSlider(s0.ctrl, '例题（0/1/2）', p.mode, 0, 2, 1, function (v) { p.mode = v; draw(); });
  draw();
}

/* 导数与单调性 */
function dvMonoLab(el, cfg) {
  var p = Object.assign({ a: 1, b: -3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var b = p.b;                       // f(x) = x³ − 3bx
    var f = function (x) { return x * x * x - 3 * b * x; };
    var df = function (x) { return 3 * x * x - 3 * b; };
    var view = { xmin: -3.2, xmax: 3.2, ymin: -13, ymax: 13 };
    var m = linMap(s0.cv, view);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.strokeStyle = '#eef2f6'; ctx.lineWidth = 1;
    var g;
    for (g = -3; g <= 3; g++) { ctx.beginPath(); ctx.moveTo(m.px(g), 0); ctx.lineTo(m.px(g), m.h); ctx.stroke(); }
    for (g = -12; g <= 12; g += 4) { ctx.beginPath(); ctx.moveTo(0, m.py(g)); ctx.lineTo(m.w, m.py(g)); ctx.stroke(); }
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(0, m.py(0)); ctx.lineTo(m.w, m.py(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(m.px(0), 0); ctx.lineTo(m.px(0), m.h); ctx.stroke();
    // 按 f' 符号分段着色
    var N = 320, i, pts = [];
    for (i = 0; i <= N; i++) {
      var x = view.xmin + (view.xmax - view.xmin) * i / N;
      pts.push([x, f(x)]);
    }
    for (i = 0; i < N; i++) {
      var xm = (pts[i][0] + pts[i + 1][0]) / 2;
      var up = df(xm) > 0;
      ctx.strokeStyle = up ? '#c0392b' : '#185fa5';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(m.px(pts[i][0]), m.py(pts[i][1]));
      ctx.lineTo(m.px(pts[i + 1][0]), m.py(pts[i + 1][1]));
      ctx.stroke();
    }
    // 极值点
    var hasEx = b > 0, sq = Math.sqrt(Math.max(b, 0));
    if (hasEx) {
      [[-sq, '极大'], [sq, '极小']].forEach(function (o) {
        ctx.beginPath(); ctx.arc(m.px(o[0]), m.py(f(o[0])), 5, 0, Math.PI * 2);
        ctx.fillStyle = '#8a5a00'; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.fillStyle = '#8a5a00'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText(o[1], m.px(o[0]), m.py(f(o[0])) - 9);
      });
    }
    ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('红：f′ > 0（增）　蓝：f′ < 0（减）', 12, 10);
    s0.info.innerHTML = '<span class="viz-meta">f(x) = x³ − ' + cFmt(3 * b) + 'x，f′(x) = 3x² − ' +
      cFmt(3 * b) + '。' + (hasEx
        ? ' 解 f′ > 0 得 x < −' + cFmt(sq) + ' 或 x > ' + cFmt(sq) + '，这两段<b style="color:#c0392b">红色上升</b>；' +
          '中间 (−' + cFmt(sq) + ', ' + cFmt(sq) + ') <b style="color:#185fa5">蓝色下降</b>。' +
          ' b = ' + cFmt(b) + ' 时两个转折点在 x = ±' + cFmt(sq) + '。'
        : ' b = ' + cFmt(b) + ' ≤ 0 时 3x² − ' + cFmt(3 * b) + ' ≥ 0 恒成立，' +
          '所以曲线<b style="color:#c0392b">整条上升</b>，没有极值点——这就是「f′ ≥ 0 且只在孤立点取等仍然递增」。') +
      ' 判断单调性不需要画图，只要解 f′ 的不等式。</span>';
  }
  cSlider(s0.ctrl, '参数 b（f(x) = x³ − 3bx）', p.b, -1, 3, 0.25, function (v) { p.b = v; draw(); });
  draw();
}

/* 极值与最值 */
function dvExtremeLab(el, cfg) {
  var p = Object.assign({ a: 1, b: -3, c: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var c = p.c;
    var f = function (x) { return x * x * x - 3 * x + c; };
    var view = { xmin: -3.2, xmax: 3.2, ymin: -8, ymax: 8 };
    var m = linMap(s0.cv, view);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.strokeStyle = '#eef2f6'; ctx.lineWidth = 1;
    var g;
    for (g = -3; g <= 3; g++) { ctx.beginPath(); ctx.moveTo(m.px(g), 0); ctx.lineTo(m.px(g), m.h); ctx.stroke(); }
    for (g = -8; g <= 8; g += 2) { ctx.beginPath(); ctx.moveTo(0, m.py(g)); ctx.lineTo(m.w, m.py(g)); ctx.stroke(); }
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(0, m.py(0)); ctx.lineTo(m.w, m.py(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(m.px(0), 0); ctx.lineTo(m.px(0), m.h); ctx.stroke();
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.8;
    ctx.beginPath();
    var first = true, i;
    for (i = 0; i <= 240; i++) {
      var x = view.xmin + (view.xmax - view.xmin) * i / 240;
      var y = f(x);
      if (first) { ctx.moveTo(m.px(x), m.py(y)); first = false; } else ctx.lineTo(m.px(x), m.py(y));
    }
    ctx.stroke();
    // 极值点与端点
    var items = [[-1, f(-1), '极大值', '#c0392b'], [1, f(1), '极小值', '#0f6e56']];
    items.forEach(function (o) {
      ctx.beginPath(); ctx.arc(m.px(o[0]), m.py(o[1]), 5.5, 0, Math.PI * 2);
      ctx.fillStyle = o[3]; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = o[3]; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(o[2] + ' ' + cFmt(o[1]), m.px(o[0]), m.py(o[1]) - 10);
    });
    // 导数零点竖虚线
    ctx.strokeStyle = 'rgba(138,90,0,0.5)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 4]);
    [-1, 1].forEach(function (x) {
      ctx.beginPath(); ctx.moveTo(m.px(x), 0); ctx.lineTo(m.px(x), m.h); ctx.stroke();
    });
    ctx.setLineDash([]);
    ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('虚线：f′ = 0 的位置（候选极值点）', 12, 10);
    s0.info.innerHTML = '<span class="viz-meta">f(x) = x³ − 3x + ' + cFmt(c) +
      '，f′(x) = 3x² − 3，零点 x = ±1。' +
      ' x = −1 处 f′ 从正变负 ⇒ <b style="color:#c0392b">极大值 ' + cFmt(2 + c) + '</b>；' +
      ' x = 1 处 f′ 从负变正 ⇒ <b style="color:#0f6e56">极小值 ' + cFmt(-2 + c) + '</b>。' +
      ' 注意极大值 ' + cFmt(2 + c) + ' 与极小值 ' + cFmt(-2 + c) + ' 只是<b>局部</b>的高低；' +
      ' 若区间是 [0, 3]，还要算端点 f(0) = ' + cFmt(c) + '、f(3) = ' + cFmt(27 - 9 + c) +
      '，最大值取 ' + cFmt(Math.max(2 + c, 27 - 9 + c, c)) + '。<b>端点不能漏</b>。</span>';
  }
  cSlider(s0.ctrl, '常数 c（上下平移）', p.c, -3, 3, 0.5, function (v) { p.c = v; draw(); });
  draw();
}

/* 优化：周长固定求最大面积 */
function dvOptLab(el, cfg) {
  var p = Object.assign({ w: 5 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var w = p.w, h = 10 - w, S = w * h;
    var view = { xmin: 0, xmax: 1, ymin: 0, ymax: 1 };
    var m = linMap(s0.cv, view, 16);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var halfW = m.w * 0.44;
    // 左：矩形
    var sc = Math.min((halfW - 60) / 10, (m.h - 90) / 10);
    var bx = 52, by = m.h - 46;
    ctx.fillStyle = 'rgba(24,95,165,0.14)';
    ctx.fillRect(bx, by - h * sc, w * sc, h * sc);
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.2;
    ctx.strokeRect(bx, by - h * sc, w * sc, h * sc);
    ctx.fillStyle = '#185fa5'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('w = ' + cFmt(w), bx + w * sc / 2, by + 6);
    ctx.save();
    ctx.translate(bx - 10, by - h * sc / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('h = ' + cFmt(h), 0, 0);
    ctx.restore();
    ctx.fillStyle = '#c0392b'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('S = ' + cFmt(S), bx + w * sc / 2, by - h * sc - 22);
    // 右：S(w) 抛物线
    var rx = m.w * 0.52, rw = m.w - rx - 26, rh = m.h - 80;
    var ry = m.h - 44;
    var sx = rw / 10, sy = rh / 25;
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx + rw, ry); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx, ry - rh); ctx.stroke();
    ctx.strokeStyle = '#7d3c98'; ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (var i = 0; i <= 100; i++) {
      var wx = 10 * i / 100, Sw = wx * (10 - wx);
      var px = rx + wx * sx, py = ry - Sw * sy;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
    // 当前点
    var cx2 = rx + w * sx, cy2 = ry - S * sy;
    ctx.strokeStyle = 'rgba(192,57,43,0.5)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(cx2, ry); ctx.lineTo(cx2, cy2); ctx.lineTo(rx, cy2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(cx2, cy2, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#c0392b'; ctx.fill();
    // 顶点
    ctx.beginPath(); ctx.arc(rx + 5 * sx, ry - 25 * sy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#0f6e56'; ctx.fill();
    ctx.fillStyle = '#0f6e56'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
    ctx.fillText('顶点 (5, 25)', rx + 5 * sx + 6, ry - 25 * sy - 4);
    ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('S(w) = w(10 − w)', rx + rw / 2, ry + 8);
    var dS = 10 - 2 * w;
    s0.info.innerHTML = '<span class="viz-meta">周长 20 的矩形：长 w、宽 ' + cFmt(h) +
      '，面积 S = w(10 − w)。当前 S = <b>' + cFmt(S) + '</b>，S′(w) = 10 − 2w = <b>' + cFmt(dS) + '</b>。' +
      (Math.abs(dS) < 0.01
        ? ' <b style="color:#c0392b">S′ = 0 ⇒ 到了顶点，此时 w = 5 是正方形，面积 25 最大。</b>'
        : (dS > 0 ? ' S′ > 0 ⇒ 面积还在增大，把 w 往 5 拖。' : ' S′ < 0 ⇒ 面积已经开始减小，把 w 往 5 拖。')) +
      ' 优化题的四步：设变量 → 写目标函数 → 求导找驻点 → 回答实际问题。</span>';
  }
  cSlider(s0.ctrl, '长 w（宽 = 10 − w）', p.w, 0.5, 9.5, 0.5, function (v) { p.w = v; draw(); });
  draw();
}
