/* ===== 圆锥曲线（cn） ===== */

/* 椭圆：拖动 P 看两段距离之和 */
function cnEllipseLab(el, cfg) {
  var p = Object.assign({ a: 5, b: 3, t: 60 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -7, xmax: 7, ymin: -4.4, ymax: 4.4 };
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    var a = p.a || 5, b = p.b || 3, c = Math.sqrt(a * a - b * b);
    // 椭圆
    ctx.beginPath();
    for (var i = 0; i <= 160; i++) {
      var tt = i / 160 * Math.PI * 2;
      var xx = a * Math.cos(tt), yy = b * Math.sin(tt);
      if (i === 0) ctx.moveTo(m.px(xx), m.py(yy)); else ctx.lineTo(m.px(xx), m.py(yy));
    }
    ctx.closePath();
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.4; ctx.stroke();
    ctx.fillStyle = 'rgba(24,95,165,0.05)'; ctx.fill();
    // 焦点
    cDot(m, -c, 0, '#c0392b', 5); cDot(m, c, 0, '#c0392b', 5);
    cTag(m, -c, 0, 'F₁(−' + cFmt(c) + ', 0)', '#c0392b', -38, 14);
    cTag(m, c, 0, 'F₂(' + cFmt(c) + ', 0)', '#c0392b', 34, 14);
    // P
    var rad = p.t * Math.PI / 180;
    var px = a * Math.cos(rad), py = b * Math.sin(rad);
    var r1 = Math.hypot(px + c, py), r2 = Math.hypot(px - c, py);
    ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(m.px(-c), m.py(0)); ctx.lineTo(m.px(px), m.py(py)); ctx.stroke();
    ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(m.px(c), m.py(0)); ctx.lineTo(m.px(px), m.py(py)); ctx.stroke();
    cDot(m, px, py, '#7d3c98', 5.5);
    cTag(m, px, py, 'P', '#7d3c98', 12, -12);
    s0.info.innerHTML = '<span class="viz-meta">a = ' + cFmt(a) + '、b = ' + cFmt(b) +
      ' ⇒ c = √(' + cFmt(a * a) + ' − ' + cFmt(b * b) + ') = <b>' + cFmt(c) + '</b>。' +
      '|PF₁| = ' + cFmt(r1) + '，|PF₂| = ' + cFmt(r2) + '，两段之和 = <b>' + cFmt(r1 + r2) +
      '</b>（恒等于 2a = ' + cFmt(2 * a) + '，与 P 在哪无关）。这就是椭圆的定义：<b>到两定点距离之和为常数</b>。' +
      ' 当 P 走到短轴端点时两段相等，各为 ' + cFmt(a) + '——这正说明 b² + c² = a²。</span>';
  }
  cSlider(s0.ctrl, 'P 的位置角', p.t, 0, 360, 5, function (v) { p.t = v; draw(); });
  draw();
}

/* 椭圆离心率 */
function cnEpropLab(el, cfg) {
  var p = Object.assign({ a: 5, e: 60 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var a = 5, e = p.e / 100;
    var c = a * e, b = Math.sqrt(Math.max(a * a - c * c, 0.0001));
    var R = a + 1.4;
    var view = { xmin: -R, xmax: R, ymin: -R * 0.62, ymax: R * 0.62 };
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    ctx.beginPath();
    for (var i = 0; i <= 160; i++) {
      var tt = i / 160 * Math.PI * 2;
      var xx = a * Math.cos(tt), yy = b * Math.sin(tt);
      if (i === 0) ctx.moveTo(m.px(xx), m.py(yy)); else ctx.lineTo(m.px(xx), m.py(yy));
    }
    ctx.closePath();
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.6; ctx.stroke();
    cDot(m, -c, 0, '#c0392b', 5); cDot(m, c, 0, '#c0392b', 5);
    if (c > 0.15) { cTag(m, -c, 0, 'F₁', '#c0392b', -12, 10); cTag(m, c, 0, 'F₂', '#c0392b', 12, 10); }
    // 短半轴标记
    ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.8; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(m.px(0), m.py(0)); ctx.lineTo(m.px(0), m.py(b)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(m.px(0), m.py(0)); ctx.lineTo(m.px(c), m.py(0)); ctx.stroke();
    ctx.setLineDash([]);
    cTag(m, 0, b / 2, 'b = ' + cFmt(b), '#0f6e56', 26, 0);
    cTag(m, c / 2, 0, 'c = ' + cFmt(c), '#c0392b', 0, 12);
    s0.info.innerHTML = '<span class="viz-meta">a 固定为 5，离心率 e = <b>' + cFmt(e) +
      '</b>，故 c = ae = ' + cFmt(c) + '，b = √(a²−c²) = <b>' + cFmt(b) + '</b>。' +
      (e < 0.08 ? ' e ≈ 0 时两焦点几乎重合，椭圆退化成<b>圆</b>（b = a）。'
        : (e > 0.8 ? ' e 接近 1 时 b 很小，椭圆被压得又长又扁，焦点跑到接近顶点。'
          : ' e 在中间值时形状最「标准」，既不是圆也不是极端扁。')) +
      ' 记住：<b>e 只管形状，a 只管大小</b>。</span>';
  }
  cSlider(s0.ctrl, '离心率 e (%)', p.e, 0, 92, 2, function (v) { p.e = v; draw(); });
  draw();
}

/* 双曲线 */
function cnHyperbolaLab(el, cfg) {
  var p = Object.assign({ a: 3, b: 4, t: 40 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var a = p.a, b = p.b, c = Math.sqrt(a * a + b * b);
    var R = Math.max(a, b) * 2.9 + 1;
    var view = { xmin: -R, xmax: R, ymin: -R * 0.62, ymax: R * 0.62 };
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    // 渐近线
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4; ctx.setLineDash([6, 4]);
    [1, -1].forEach(function (sg) {
      ctx.beginPath();
      ctx.moveTo(m.px(-R), m.py(-R * (b / a) * sg));
      ctx.lineTo(m.px(R), m.py(R * (b / a) * sg));
      ctx.stroke();
    });
    ctx.setLineDash([]);
    // 两支
    [-1, 1].forEach(function (sg) {
      ctx.beginPath();
      var first = true;
      for (var i = 0; i <= 120; i++) {
        var u = -2.3 + 4.6 * i / 120;
        var xx = sg * a * Math.cosh(u), yy = b * Math.sinh(u);
        if (!isFinite(xx) || Math.abs(xx) > R * 1.4) { first = true; continue; }
        if (first) { ctx.moveTo(m.px(xx), m.py(yy)); first = false; } else ctx.lineTo(m.px(xx), m.py(yy));
      }
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.6; ctx.stroke();
    });
    cDot(m, -c, 0, '#c0392b', 4.5); cDot(m, c, 0, '#c0392b', 4.5);
    cTag(m, -c, 0, 'F₁', '#c0392b', -12, 10); cTag(m, c, 0, 'F₂', '#c0392b', 12, 10);
    // P 在右支
    var u0 = (p.t - 50) / 22;
    var px = a * Math.cosh(u0), py = b * Math.sinh(u0);
    var r1 = Math.hypot(px + c, py), r2 = Math.hypot(px - c, py);
    ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(m.px(-c), m.py(0)); ctx.lineTo(m.px(px), m.py(py)); ctx.stroke();
    ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(m.px(c), m.py(0)); ctx.lineTo(m.px(px), m.py(py)); ctx.stroke();
    cDot(m, px, py, '#7d3c98', 5.5);
    cTag(m, px, py, 'P', '#7d3c98', 12, -12);
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1;
    s0.info.innerHTML = '<span class="viz-meta">a = ' + cFmt(a) + '、b = ' + cFmt(b) +
      ' ⇒ c = √(a²+b²) = <b>' + cFmt(c) + '</b>（双曲线里 <b>c 最大</b>，与椭圆相反）。' +
      '渐近线 y = ±(' + cFmt(b) + '/' + cFmt(a) + ')x。P 在右支时 |PF₁| = ' + cFmt(r1) +
      '，|PF₂| = ' + cFmt(r2) + '，<b>差 = ' + cFmt(r1 - r2) + ' = 2a</b>。' +
      ' 注意定义里是「差的绝对值」，P 换到左支时两条线互换。</span>';
  }
  cSlider(s0.ctrl, '实半轴 a', p.a, 1, 4, 0.5, function (v) { p.a = v; draw(); });
  cSlider(s0.ctrl, '虚半轴 b', p.b, 1, 4, 0.5, function (v) { p.b = v; draw(); });
  cSlider(s0.ctrl, 'P 的位置', p.t, 0, 100, 2, function (v) { p.t = v; draw(); });
  draw();
}

/* 抛物线：到焦点 = 到准线 */
function cnParabolaLab(el, cfg) {
  var p = Object.assign({ p: 4, t: 60 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var pp = p.p;   // 2p 就是标准式里的 2p
    var view = { xmin: -pp * 0.95, xmax: pp * 2.55, ymin: -pp * 2.4, ymax: pp * 2.4 };
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    // 抛物线 y² = 2p x
    ctx.beginPath();
    var first = true;
    for (var i = 0; i <= 160; i++) {
      var yy = -pp * 2.3 + pp * 4.6 * i / 160;
      var xx = yy * yy / (2 * pp);
      if (xx > view.xmax) { first = true; continue; }
      if (first) { ctx.moveTo(m.px(xx), m.py(yy)); first = false; } else ctx.lineTo(m.px(xx), m.py(yy));
    }
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.6; ctx.stroke();
    // 准线 x = -p/2
    ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 1.8; ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(m.px(-pp / 2), 0); ctx.lineTo(m.px(-pp / 2), m.h); ctx.stroke();
    ctx.setLineDash([]);
    cTag(m, -pp / 2, view.ymax * 0.92, '准线 x = −' + cFmt(pp / 2), '#8a5a00', 0, 0);
    // 焦点
    cDot(m, pp / 2, 0, '#c0392b', 5);
    cTag(m, pp / 2, 0, 'F(' + cFmt(pp / 2) + ', 0)', '#c0392b', 40, 14);
    // P
    var s = (p.t - 50) / 50;
    var py = s * 2 * pp, px = py * py / (2 * pp);
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(m.px(pp / 2), m.py(0)); ctx.lineTo(m.px(px), m.py(py)); ctx.stroke();
    ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2.2;
    ctx.beginPath(); ctx.moveTo(m.px(-pp / 2), m.py(py)); ctx.lineTo(m.px(px), m.py(py)); ctx.stroke();
    cDot(m, px, py, '#7d3c98', 5.5);
    cTag(m, px, py, 'P', '#7d3c98', 12, -12);
    var dF = Math.hypot(px - pp / 2, py);
    var dL = px + pp / 2;
    s0.info.innerHTML = '<span class="viz-meta">y² = ' + cFmt(2 * pp) + 'x（即 2p = ' + cFmt(2 * pp) +
      '，p = ' + cFmt(pp) + '）。焦点 (<b>' + cFmt(pp / 2) + ', 0</b>)，准线 x = <b>−' + cFmt(pp / 2) + '</b>。' +
      '|PF| = ' + cFmt(dF) + '，P 到准线的水平距离 = ' + cFmt(dL) + '，<b>两者恒相等</b>——这就是抛物线的定义，' +
      '也是它离心率恰好为 1 的含义。注意焦点坐标是 p/2，<b>不是 p</b>。</span>';
  }
  cSlider(s0.ctrl, 'p（焦点到准线距离）', p.p, 1, 6, 0.5, function (v) { p.p = v; draw(); });
  cSlider(s0.ctrl, 'P 的位置', p.t, 0, 100, 2, function (v) { p.t = v; draw(); });
  draw();
}

/* 直线与抛物线：弦长随斜率变化 */
function cnLineLab(el, cfg) {
  var p = Object.assign({ m: 0.6 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -2.5, xmax: 12, ymin: -7.5, ymax: 7.5 };
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    xyAxes(m, view);
    // 抛物线 y² = 4x
    ctx.beginPath();
    var first = true;
    for (var i = 0; i <= 160; i++) {
      var yy = -7.2 + 14.4 * i / 160;
      var xx = yy * yy / 4;
      if (xx > view.xmax) { first = true; continue; }
      if (first) { ctx.moveTo(m.px(xx), m.py(yy)); first = false; } else ctx.lineTo(m.px(xx), m.py(yy));
    }
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.6; ctx.stroke();
    // 直线 x = my + 1（过焦点 (1,0)）
    var mm = p.m;
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(m.px(1 + mm * (-7.4)), m.py(-7.4));
    ctx.lineTo(m.px(1 + mm * 7.4), m.py(7.4));
    ctx.stroke();
    cDot(m, 1, 0, '#8a5a00', 5);
    cTag(m, 1, 0, 'F(1,0)', '#8a5a00', 34, 14);
    // 两个交点：y = 2m ± 2√(m²+1)
    var sr = Math.sqrt(mm * mm + 1);
    var y1 = 2 * mm + 2 * sr, y2 = 2 * mm - 2 * sr;
    var x1 = y1 * y1 / 4, x2 = y2 * y2 / 4;
    cDot(m, x1, y1, '#0f6e56', 5); cDot(m, x2, y2, '#0f6e56', 5);
    cTag(m, x1, y1, 'A', '#0f6e56', 12, -12);
    cTag(m, x2, y2, 'B', '#0f6e56', 12, 14);
    var chord = 4 * (mm * mm + 1);
    s0.info.innerHTML = '<span class="viz-meta">抛物线 y² = 4x 与过焦点 F(1,0) 的直线 x = ' +
      cFmt(mm) + 'y + 1。联立得 y² − ' + cFmt(4 * mm) + 'y − 4 = 0，韦达得 y₁+y₂ = ' +
      cFmt(4 * mm) + '、y₁y₂ = −4。' +
      ' 弦长 |AB| = <b>' + cFmt(chord) + '</b> = 4(m² + 1)。m = 0 时（竖直线）弦长最短为 <b>4</b>，' +
      '这条最短弦叫<b>通径</b>，长 2p。</span>';
  }
  cSlider(s0.ctrl, '直线参数 m（x = my + 1）', p.m, 0, 2, 0.1, function (v) { p.m = v; draw(); });
  draw();
}
