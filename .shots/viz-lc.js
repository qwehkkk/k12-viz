/* ===== 直线与圆的方程（lc） ===== */

/* 倾斜角与斜率 */
function lcSlopeLab(el, cfg) {
  var p = Object.assign({ a: 45 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -4.4, xmax: 4.4, ymin: -2.9, ymax: 2.9 };
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    var deg = p.a, rad = deg * Math.PI / 180;
    var vert = Math.abs(deg - 90) < 0.6;
    var k = vert ? null : Math.tan(rad);
    if (vert) {
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.moveTo(m.px(0), 0); ctx.lineTo(m.px(0), m.h); ctx.stroke();
    } else {
      var L = 4.2;
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.moveTo(m.px(-L), m.py(-L * k));
      ctx.lineTo(m.px(L), m.py(L * k));
      ctx.stroke();
    }
    // 角度弧（从 x 正方向逆时针到直线方向）
    ctx.beginPath();
    ctx.arc(m.px(0), m.py(0), 34, 0, -rad, true);
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2;
    ctx.stroke();
    // 斜率三角：水平 1 竖直 k
    if (!vert && Math.abs(k) < 6) {
      var x1 = 1.0;
      ctx.strokeStyle = 'rgba(15,110,86,0.65)'; ctx.lineWidth = 1.6; ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(m.px(0), m.py(0)); ctx.lineTo(m.px(x1), m.py(0));
      ctx.lineTo(m.px(x1), m.py(x1 * k));
      ctx.stroke(); ctx.setLineDash([]);
      cTag(m, x1 / 2, -0.28, '1', '#0f6e56');
      cTag(m, x1 + 0.5, x1 * k / 2, 'k = ' + cFmt(k), '#0f6e56');
    }
    cTag(m, 1.35, 0.42, 'α = ' + cFmt(deg) + '°', '#185fa5');
    s0.info.innerHTML = vert
      ? '<span class="viz-meta">α = 90° 时直线竖直，<b>斜率不存在</b>——因为「前进量」Δx = 0，无法作除数。' +
        '这不是例外，而是斜率定义本身的适用边界，所以竖直线永远单独写：x = x₀。</span>'
      : '<span class="viz-meta">α = <b>' + cFmt(deg) + '°</b>，k = tanα = <b>' + cFmt(k) + '</b>。' +
        (deg < 90 ? ' α 是锐角，k > 0，直线从左下往右上走。'
          : (deg > 90 ? ' α 是钝角，k < 0，直线从左上往右下走。' : ' α = 0°，k = 0，直线水平。')) +
        ' 绿色小三角就是「竖直增量 ÷ 水平增量」——k 的几何定义。</span>';
  }
  cSlider(s0.ctrl, '倾斜角 α', p.a, 0, 180, 1, function (v) { p.a = v; draw(); });
  draw();
}

/* 直线方程的几种形式 */
function lcEqLab(el, cfg) {
  var p = Object.assign({ k: 2, b: 1 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -4.6, xmax: 4.6, ymin: -3.0, ymax: 3.0 };
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(m.px(-4.6), m.py(-4.6 * p.k + p.b));
    ctx.lineTo(m.px(4.6), m.py(4.6 * p.k + p.b));
    ctx.stroke();
    // 截距点
    cDot(m, 0, p.b, '#c0392b', 4.5);
    cTag(m, 0, p.b, '截距 b = ' + cFmt(p.b), '#c0392b', 58, -12);
    // 一个点 (1, k+b)
    cDot(m, 1, p.k + p.b, '#0f6e56', 4.5);
    cTag(m, 1, p.k + p.b, '(1, ' + cFmt(p.k + p.b) + ')', '#0f6e56', 34, -12);
    var A = -p.k, B = 1, C = -p.b;
    s0.info.innerHTML = '<span class="viz-meta">斜截式：<b>y = ' + cFmt(p.k) + 'x ' +
      (p.b >= 0 ? '+ ' : '− ') + cFmt(Math.abs(p.b)) + '</b>；' +
      '一般式：<b>' + cFmt(A) + 'x + ' + cFmt(B) + 'y ' + (C >= 0 ? '+ ' : '− ') + cFmt(Math.abs(C)) + ' = 0</b>；' +
      '过点 (1, ' + cFmt(p.k + p.b) + ') 的点斜式：y − ' + cFmt(p.k + p.b) + ' = ' + cFmt(p.k) + '(x − 1)。' +
      ' 三种写法描述的是<b>同一条直线</b>——形式只是视角不同。</span>';
  }
  cSlider(s0.ctrl, '斜率 k', p.k, -3, 3, 0.25, function (v) { p.k = v; draw(); });
  cSlider(s0.ctrl, '截距 b', p.b, -2.5, 2.5, 0.25, function (v) { p.b = v; draw(); });
  draw();
}

/* 两直线位置关系 */
function lcPosLab(el, cfg) {
  var p = Object.assign({ k2: -0.5, b2: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -4.6, xmax: 4.6, ymin: -3.0, ymax: 3.0 };
  var k1 = 2, b1 = -1;
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(m.px(-4.6), m.py(-4.6 * k1 + b1));
    ctx.lineTo(m.px(4.6), m.py(4.6 * k1 + b1));
    ctx.stroke();
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(m.px(-4.6), m.py(-4.6 * p.k2 + p.b2));
    ctx.lineTo(m.px(4.6), m.py(4.6 * p.k2 + p.b2));
    ctx.stroke();
    var prod = k1 * p.k2;
    var isPerp = Math.abs(prod + 1) < 0.06;
    var isPara = Math.abs(p.k2 - k1) < 0.06;
    var rel, colr;
    if (isPerp) { rel = '垂直（k₁k₂ = −1）'; colr = '#0f6e56'; }
    else if (isPara) { rel = '平行（斜率相等、截距不同）'; colr = '#8a5a00'; }
    else { rel = '相交'; colr = '#c0392b'; }
    if (!isPara) {
      var xi = (p.b2 - b1) / (k1 - p.k2), yi = k1 * xi + b1;
      if (Math.abs(xi) < 4.4 && Math.abs(yi) < 3) {
        cDot(m, xi, yi, colr, 5);
        cTag(m, xi, yi, '交点 (' + cFmt(xi) + ', ' + cFmt(yi) + ')', colr, 0, -16);
      }
    }
    s0.info.innerHTML = '<span class="viz-meta">l₁: y = 2x − 1（固定），l₂: y = ' + cFmt(p.k2) + 'x ' +
      (p.b2 >= 0 ? '+ ' : '− ') + cFmt(Math.abs(p.b2)) + '。k₁·k₂ = <b>' + cFmt(prod) + '</b>，' +
      '位置关系：<b style="color:' + colr + '">' + rel + '</b>。' +
      ' 把 k₂ 拖到 −0.5 就是垂直；拖到 2 就是平行。注意垂直的判据是<b>乘积为 −1</b>，不是「一正一负」。</span>';
  }
  cSlider(s0.ctrl, 'l₂ 斜率 k₂', p.k2, -3, 3, 0.25, function (v) { p.k2 = v; draw(); });
  cSlider(s0.ctrl, 'l₂ 截距 b₂', p.b2, -2.5, 2.5, 0.25, function (v) { p.b2 = v; draw(); });
  draw();
}

/* 圆的方程 */
function lcCircleLab(el, cfg) {
  var p = Object.assign({ a: 1, b: -2, r: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var R = Math.max(Math.abs(p.a) + p.r, Math.abs(p.b) + p.r, 2.4) + 1.2;
    var view = { xmin: -R, xmax: R, ymin: -R * 0.62, ymax: R * 0.62 };
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    ctx.beginPath();
    ctx.arc(m.px(p.a), m.py(p.b), p.r * m.sc, 0, Math.PI * 2);
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.6; ctx.stroke();
    ctx.fillStyle = 'rgba(24,95,165,0.07)'; ctx.fill();
    cDot(m, p.a, p.b, '#c0392b', 5);
    cTag(m, p.a, p.b, '(' + cFmt(p.a) + ', ' + cFmt(p.b) + ')', '#c0392b', 0, -16);
    // 半径线段
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.8; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(m.px(p.a), m.py(p.b)); ctx.lineTo(m.px(p.a + p.r), m.py(p.b)); ctx.stroke();
    ctx.setLineDash([]);
    cTag(m, p.a + p.r / 2, p.b, 'r = ' + cFmt(p.r), '#c0392b', 0, 14);
    var D = -2 * p.a, E = -2 * p.b, F = p.a * p.a + p.b * p.b - p.r * p.r;
    var disc = D * D + E * E - 4 * F;
    s0.info.innerHTML = '<span class="viz-meta">标准式：<b>(x ' + (p.a >= 0 ? '− ' : '+ ') + cFmt(Math.abs(p.a)) +
      ')² + (y ' + (p.b >= 0 ? '− ' : '+ ') + cFmt(Math.abs(p.b)) + ')² = ' + cFmt(p.r * p.r) + '</b>。' +
      '展开得 x² + y² ' + (D >= 0 ? '+ ' : '− ') + cFmt(Math.abs(D)) + 'x ' +
      (E >= 0 ? '+ ' : '− ') + cFmt(Math.abs(E)) + 'y ' + (F >= 0 ? '+ ' : '− ') + cFmt(Math.abs(F)) + ' = 0。' +
      ' 判别式 D² + E² − 4F = <b>' + cFmt(disc) + ' > 0</b>，确实是圆。（等于 0 是一个点，小于 0 无图形。）</span>';
  }
  cSlider(s0.ctrl, '圆心横坐标 a', p.a, -3, 3, 0.5, function (v) { p.a = v; draw(); });
  cSlider(s0.ctrl, '圆心纵坐标 b', p.b, -3, 3, 0.5, function (v) { p.b = v; draw(); });
  cSlider(s0.ctrl, '半径 r', p.r, 0.5, 4, 0.5, function (v) { p.r = v; draw(); });
  draw();
}

/* 直线与圆的位置关系 */
function lcCposLab(el, cfg) {
  var p = Object.assign({ d: 3, r: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -7.2, xmax: 7.2, ymin: -7.2, ymax: 5.2 };
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    var r = 4, d = p.d;
    ctx.beginPath();
    ctx.arc(m.px(0), m.py(0), r * m.sc, 0, Math.PI * 2);
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.fillStyle = 'rgba(24,95,165,0.06)'; ctx.fill();
    // 直线 y = −d
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(0, m.py(-d)); ctx.lineTo(m.w, m.py(-d)); ctx.stroke();
    // 距离线段（圆心垂线）
    ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.8; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(m.px(0), m.py(0)); ctx.lineTo(m.px(0), m.py(-d)); ctx.stroke();
    ctx.setLineDash([]);
    cTag(m, 0, -d / 2, 'd = ' + cFmt(d), '#0f6e56', 30, 0);
    var rel, colr, chord = 0;
    if (d < r - 0.02) {
      rel = '相交（两个交点）'; colr = '#c0392b';
      chord = 2 * Math.sqrt(r * r - d * d);
      var hx = Math.sqrt(r * r - d * d);
      cDot(m, hx, -d, '#c0392b', 5); cDot(m, -hx, -d, '#c0392b', 5);
      ctx.strokeStyle = 'rgba(192,57,43,0.55)'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(m.px(-hx), m.py(-d)); ctx.lineTo(m.px(hx), m.py(-d)); ctx.stroke();
    } else if (d <= r + 0.02) {
      rel = '相切（一个交点）'; colr = '#8a5a00';
      cDot(m, 0, -d, '#8a5a00', 5.5);
    } else {
      rel = '相离（无交点）'; colr = '#6b7a89';
    }
    s0.info.innerHTML = '<span class="viz-meta">圆的半径 r = <b>4</b>，圆心到直线的距离 d = <b>' + cFmt(d) +
      '</b>。d ' + (d < r - 0.02 ? '<' : (d > r + 0.02 ? '>' : '=')) + ' r ⇒ <b style="color:' + colr + '">' +
      rel + '</b>。' + (chord > 0
        ? ' 弦长 = 2√(r² − d²) = 2√(16 − ' + cFmt(d * d) + ') = <b>' + cFmt(chord) + '</b>。'
        : ' d = r 时半弦长为 0，弦退化成一个切点。') +
      ' 这条「d 与 r 比大小」的思路，也是判断圆与圆关系的模板（换成圆心距 d 与 r₁ ± r₂ 比）。</span>';
  }
  cSlider(s0.ctrl, '圆心到直线的距离 d', p.d, 0, 6, 0.2, function (v) { p.d = v; draw(); });
  draw();
}
