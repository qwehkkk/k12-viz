  /* ================= 复数（必修二第 7 章） ================= */
  function cxPlane(m, view) {
    xyAxes(m, view);
    var ctx = m.ctx;
    ctx.strokeStyle = '#dfe6ec'; ctx.lineWidth = 1;
    cTag(m, view.xmax - 0.3, 0.45, '实轴', '#8395a7', 0, 0);
    cTag(m, 0.75, view.ymax - 0.4, '虚轴', '#8395a7', 0, 0);
  }

  function cxTagZ(m, x, y, label, color, dx, dy) {
    cDot(m, x, y, color, 5);
    cTag(m, x + (dx || 0.45), y + (dy || 0.42), label, color, 0, 0);
  }

  /* 复数的概念与分类 */
  function cxClassLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { a: v.a != null ? v.a : 3, b: v.b != null ? v.b : 2 };
    function draw() {
      var view = { xmin: -5.5, xmax: 5.5, ymin: -4, ymax: 4 };
      var m = circleMap(s0.cv, view);
      cxPlane(m, view);
      pvArrow(m, 0, 0, p.a, p.b, '#185fa5', 2.6);
      cxTagZ(m, p.a, p.b, 'z = ' + cFmt(p.a) + (p.b >= 0 ? ' + ' : ' − ') + cFmt(Math.abs(p.b)) + 'i', '#185fa5');
      ctxDash(m, p.a, p.b);
      var kind, col;
      if (Math.abs(p.b) < 0.001) { kind = '实数（b = 0）'; col = '#0f6e56'; }
      else if (Math.abs(p.a) < 0.001) { kind = '纯虚数（a = 0 且 b ≠ 0）'; col = '#c0392b'; }
      else { kind = '虚数（b ≠ 0，非纯虚）'; col = '#8a5a00'; }
      cTag(m, 0, 3.55, '实部 a = ' + cFmt(p.a) + '　虚部 b = ' + cFmt(p.b), '#1d2b38', 0, 0);
      cTag(m, 0, 3.0, kind, col, 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">分类<b>只看虚部 b</b>：b = 0 是实数（点落在实轴上）；b ≠ 0 是虚数；只有当 a = 0 <b>且</b> b ≠ 0 时才是纯虚数（点落在虚轴上且不是原点）。</span>'
        + '<span class="viz-meta">原点 z = 0 是实数，<b>不是</b>纯虚数——这是分类题最常见的陷阱。复数不能比大小，但模可以。</span>';
    }
    function ctxDash(m, x, y) {
      var c = m.ctx;
      c.setLineDash([4, 4]); c.strokeStyle = '#c9d3dc'; c.lineWidth = 1.3;
      c.beginPath(); c.moveTo(m.px(x), m.py(0)); c.lineTo(m.px(x), m.py(y)); c.stroke();
      c.beginPath(); c.moveTo(m.px(0), m.py(y)); c.lineTo(m.px(x), m.py(y)); c.stroke();
      c.setLineDash([]);
    }
    cSlider(s0.ctrl, '实部 a', p.a, -5, 5, 0.5, function (x) { p.a = x; draw(); });
    cSlider(s0.ctrl, '虚部 b', p.b, -3.5, 3.5, 0.5, function (x) { p.b = x; draw(); });
    draw();
  }

  /* 复数相等与共轭 */
  function cxEqualLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { a: v.a != null ? v.a : 3, b: v.b != null ? v.b : 2, c: v.c != null ? v.c : 1, d: v.d != null ? v.d : 4 };
    function draw() {
      var pts = [[p.a, p.b], [p.c, p.d], [p.a, -p.b], [0, 0]];
      var xs = pts.map(function (q) { return q[0]; }), ys = pts.map(function (q) { return q[1]; });
      var view = pvViewOf([[Math.min.apply(null, xs), Math.min.apply(null, ys)],
        [Math.max.apply(null, xs), Math.max.apply(null, ys)]], 1.6);
      var m = circleMap(s0.cv, view);
      cxPlane(m, view);
      var ctx = m.ctx;
      ctx.setLineDash([4, 4]); ctx.strokeStyle = '#d8c6b0'; ctx.lineWidth = 1.3;
      ctx.beginPath(); ctx.moveTo(m.px(p.a), m.py(p.b)); ctx.lineTo(m.px(p.a), m.py(-p.b)); ctx.stroke();
      ctx.setLineDash([]);
      pvArrow(m, 0, 0, p.a, p.b, '#185fa5', 2.6);
      pvArrow(m, 0, 0, p.c, p.d, '#0f6e56', 2.6);
      cxTagZ(m, p.a, -p.b, 'z̄ = ' + cFmt(p.a) + (p.b > 0 ? ' − ' : ' + ') + cFmt(Math.abs(p.b)) + 'i', '#c0392b', 0.5, -0.5);
      cTag(m, p.a + 0.5, p.b + 0.42, 'z₁', '#185fa5', 0, 0);
      cTag(m, p.c + 0.5, p.d + 0.42, 'z₂', '#0f6e56', 0, 0);
      var eq = Math.abs(p.a - p.c) < 0.001 && Math.abs(p.b - p.d) < 0.001;
      var yy = view.ymax - 0.55;
      cTag(m, (view.xmin + view.xmax) / 2, yy, eq ? '实部、虚部都相同 → z₁ = z₂' : '实部差 ' + cFmt(p.a - p.c) + '，虚部差 ' + cFmt(p.b - p.d) + ' → 不相等',
        eq ? '#0f6e56' : '#8a5a00', 0, 0);
      cTag(m, (view.xmin + view.xmax) / 2, yy - 0.6, 'z₁·z̄₁ = ' + cFmt(p.a * p.a + p.b * p.b) + '（= |z₁|²，一定是实数）', '#5b6b7a', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">把 z₂ 的两个滑块拖到与 z₁ 相同，实验台判定「相等」——<b>一个复数等式 = 两个实数方程</b>（实部 = 实部、虚部 = 虚部），这是所有含参复数题的入口。</span>'
        + '<span class="viz-meta">红色点是 z₁ 的<b>共轭</b> z̄：关于实轴翻折（实部不动、虚部变号）。把它和 z₁ 相乘必得 (a² + b²)，正是 |z₁|²——除法「分母实数化」就靠这一条。</span>';
    }
    cSlider(s0.ctrl, 'z₁ 实部', p.a, -4, 5, 0.5, function (x) { p.a = x; draw(); });
    cSlider(s0.ctrl, 'z₁ 虚部', p.b, -3, 4, 0.5, function (x) { p.b = x; draw(); });
    cSlider(s0.ctrl, 'z₂ 实部', p.c, -4, 5, 0.5, function (x) { p.c = x; draw(); });
    cSlider(s0.ctrl, 'z₂ 虚部', p.d, -3, 4, 0.5, function (x) { p.d = x; draw(); });
    draw();
  }

  /* 四则运算 */
  function cxOpLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = {
      a: v.a != null ? v.a : 2, b: v.b != null ? v.b : 1,
      c: v.c != null ? v.c : 3, d: v.d != null ? v.d : -1,
      op: v.op || 0
    };
    var NAME = ['加法', '减法', '乘法', '除法'];
    function calc() {
      var a = p.a, b = p.b, c = p.c, d = p.d;
      if (p.op === 0) return [a + c, b + d];
      if (p.op === 1) return [a - c, b - d];
      if (p.op === 2) return [a * c - b * d, a * d + b * c];
      var den = c * c + d * d;
      if (den < 1e-9) return null;
      return [(a * c + b * d) / den, (b * c - a * d) / den];
    }
    function draw() {
      var r = calc();
      var pts = [[p.a, p.b], [p.c, p.d], [0, 0], r || [0, 0]];
      var xs = pts.map(function (q) { return q[0]; }), ys = pts.map(function (q) { return q[1]; });
      var view = pvViewOf([[Math.min.apply(null, xs), Math.min.apply(null, ys)],
        [Math.max.apply(null, xs), Math.max.apply(null, ys)]], 1.6);
      var m = circleMap(s0.cv, view);
      cxPlane(m, view);
      pvArrow(m, 0, 0, p.c, p.d, '#0f6e56', 2.4);
      pvArrow(m, 0, 0, p.a, p.b, '#185fa5', 2.6);
      if (r) {
        pvArrow(m, 0, 0, r[0], r[1], '#c0392b', 3.2);
        cTag(m, r[0] + (r[0] >= 0 ? 0.7 : -0.7), r[1] + 0.45, '结果', '#c0392b', 0, 0);
      }
      cTag(m, p.a + 0.5, p.b + 0.42, 'z₁', '#185fa5', 0, 0);
      cTag(m, p.c + 0.5, p.d + 0.42, 'z₂', '#0f6e56', 0, 0);
      var yy = view.ymax - 0.5;
      var mid = (view.xmin + view.xmax) / 2;
      cTag(m, mid, yy, '运算：' + NAME[p.op], '#1d2b38', 0, 0);
      if (!r) {
        cTag(m, mid, yy - 0.6, '分母为 0（z₂ = 0），除法无意义', '#c0392b', 0, 0);
      } else {
        cTag(m, mid, yy - 0.6, '结果 = ' + cFmt(r[0]) + ' + (' + cFmt(r[1]) + ')i', '#c0392b', 0, 0);
      }
      var extra = p.op === 2 ? '乘法就是<b>多项式展开 + i² = −1</b>：四项相乘后把 i² 收成 −1，实部与虚部就分出来了。几何上它是「旋转 + 伸缩」。'
        : p.op === 3 ? '除法关键一步：分子分母同乘分母的<b>共轭</b>，分母变成 c² + d²（实数），整个式子立刻可算。'
        : '加减法就是<b>实部虚部分别加减</b>，几何上等同于向量加减。';
      s0.info.innerHTML = '<span class="viz-meta">' + extra + '</span>'
        + '<span class="viz-meta">把 z₂ 拖到 (0, 1)（即 i），再选乘法：结果会变成 z₁ 逆时针转 90°——这就是「乘 i 等于旋转 90°」的代数版。</span>';
    }
    cSlider(s0.ctrl, 'z₁ 实部', p.a, -4, 5, 0.5, function (x) { p.a = x; draw(); });
    cSlider(s0.ctrl, 'z₁ 虚部', p.b, -3, 4, 0.5, function (x) { p.b = x; draw(); });
    cSlider(s0.ctrl, 'z₂ 实部', p.c, -4, 5, 0.5, function (x) { p.c = x; draw(); });
    cSlider(s0.ctrl, 'z₂ 虚部', p.d, -3, 4, 0.5, function (x) { p.d = x; draw(); });
    cSlider(s0.ctrl, '运算（0 加 / 1 减 / 2 乘 / 3 除）', p.op, 0, 3, 1, function (x) { p.op = x; draw(); });
    draw();
  }

  /* 复平面：z、z̄、−z、iz */
  function cxPlaneLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { a: v.a != null ? v.a : 3, b: v.b != null ? v.b : 2 };
    function draw() {
      var mod = Math.hypot(p.a, p.b);
      var R = Math.max(mod, 1) + 1.4;
      var view = { xmin: -R, xmax: R, ymin: -R * 0.82, ymax: R * 0.82 };
      var m = circleMap(s0.cv, view);
      cxPlane(m, view);
      var ctx = m.ctx;
      ctx.strokeStyle = '#dfe6ec'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(m.px(0), m.py(0), mod * m.sc, 0, Math.PI * 2); ctx.stroke();
      pvArrow(m, 0, 0, p.a, p.b, '#185fa5', 2.8);
      pvArrow(m, 0, 0, -p.b, p.a, '#7d3c98', 2.2, [6, 4]);
      pvArrow(m, 0, 0, -p.a, -p.b, '#8a5a00', 2.2, [3, 4]);
      pvArrow(m, 0, 0, p.a, -p.b, '#c0392b', 2.2);
      cTag(m, p.a + 0.55, p.b + 0.42, 'z', '#185fa5', 0, 0);
      cTag(m, -p.b - 0.55, p.a + 0.35, 'iz（转 90°）', '#7d3c98', 0, 0);
      cTag(m, -p.a - 0.55, -p.b - 0.42, '−z', '#8a5a00', 0, 0);
      cTag(m, p.a + 0.6, -p.b - 0.42, 'z̄', '#c0392b', 0, 0);
      cTag(m, 0, view.ymax - 0.45, '|z| = √(a² + b²) = ' + cFmt(mod), '#1d2b38', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">复平面里横轴是实轴、纵轴是虚轴，z 就是从原点出发的向量。半径 <b>|z|</b> = ' + cFmt(mod) + ' 就是模（到原点的距离）。</span>'
        + '<span class="viz-meta">四个点各有身份：z̄ 关于实轴翻折、−z 关于原点对称、<b>iz 恒比 z 领先 90°</b>（紫色的虚线箭头）。所以 |z₁ − z₂| 就是两点距离——轨迹题一画就懂。</span>';
    }
    cSlider(s0.ctrl, '实部 a', p.a, -5, 5, 0.5, function (x) { p.a = x; draw(); });
    cSlider(s0.ctrl, '虚部 b', p.b, -4, 4, 0.5, function (x) { p.b = x; draw(); });
    draw();
  }

  /* 判别式小于零：抛物线离开 x 轴，根钻进复平面 */
  function cxQuadLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { b: v.b != null ? v.b : 2, c: v.c != null ? v.c : 5 };
    function draw() {
      var ymin = Math.min(p.c, p.c - p.b * p.b / 4) - 2;
      var ymax = p.c + 7;
      var view = { xmin: -5.2, xmax: 4.2, ymin: ymin, ymax: ymax };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      /* 抛物线 */
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.6;
      ctx.beginPath();
      var first = true;
      for (var i = 0; i <= 240; i++) {
        var x = view.xmin + (view.xmax - view.xmin) * i / 240;
        var y = x * x + p.b * x + p.c;
        if (y < view.ymin - 3 || y > view.ymax + 3) { first = true; continue; }
        if (first) { ctx.moveTo(m.px(x), m.py(y)); first = false; } else ctx.lineTo(m.px(x), m.py(y));
      }
      ctx.stroke();
      var delta = p.b * p.b - 4 * p.c;
      var vx = -p.b / 2, vy = p.c - p.b * p.b / 4;
      cDot(m, vx, vy, '#7d3c98', 5);
      cTag(m, vx, vy + 0.6, '顶点 (' + cFmt(vx) + ', ' + cFmt(vy) + ')', '#7d3c98', 0, 0);
      if (delta >= 0) {
        var r1 = (-p.b - Math.sqrt(delta)) / 2, r2 = (-p.b + Math.sqrt(delta)) / 2;
        cDot(m, r1, 0, '#c0392b', 5.5); cDot(m, r2, 0, '#c0392b', 5.5);
        cTag(m, r1, -1.1, cFmt(r1), '#c0392b', 0, 0);
        cTag(m, r2, -1.1, cFmt(r2), '#c0392b', 0, 0);
      }
      cTag(m, (view.xmin + view.xmax) / 2, view.ymax - 0.5, 'y = x² + ' + cFmt(p.b) + 'x + ' + cFmt(p.c) + '　Δ = b² − 4c = ' + cFmt(delta), '#1d2b38', 0, 0);
      cTag(m, (view.xmin + view.xmax) / 2, view.ymax - 1.1,
        delta > 0 ? 'Δ > 0：两个不等实根' : (Math.abs(delta) < 0.01 ? 'Δ = 0：一个重根（抛物线与 x 轴相切）' : 'Δ < 0：无实根 → 一对共轭虚根'),
        delta > 0 ? '#0f6e56' : (Math.abs(delta) < 0.01 ? '#8a5a00' : '#c0392b'), 0, 0);
      /* 右下角插图：复平面上的根 */
      if (delta < 0) {
        var bx = m.w - 190, by = 24, bw = 168, bh = 132;
        ctx.fillStyle = 'rgba(255,255,255,0.94)';
        ctx.strokeStyle = '#dbe3ea'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.fill(); ctx.stroke();
        var ox = bx + bw / 2, oy = by + bh / 2;
        ctx.strokeStyle = '#c9d3dc'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(bx + 8, oy); ctx.lineTo(bx + bw - 8, oy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ox, by + 8); ctx.lineTo(ox, by + bh - 8); ctx.stroke();
        var im = Math.sqrt(-delta) / 2, re = -p.b / 2;
        var sc = Math.min((bw / 2 - 26) / Math.max(2.2, Math.abs(re) + 1), (bh / 2 - 20) / Math.max(1.2, im));
        ctx.fillStyle = '#c0392b';
        [-1, 1].forEach(function (sgn) {
          ctx.beginPath(); ctx.arc(ox + re * sc, oy - sgn * im * sc, 4.5, 0, Math.PI * 2); ctx.fill();
        });
        ctx.fillStyle = '#8a5a00';
        ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText('根在复平面：' + cFmt(re) + ' ± ' + cFmt(im) + 'i', bx + bw / 2, by + bh - 22);
      }
      s0.info.innerHTML = '<span class="viz-meta">把 c 拖大：抛物线整体上移，(x 轴上的) 两个交点靠近、合并、然后消失——这正是 <b>Δ 由正变负</b>。消失之后根没有丢，它们钻进复平面，成为一对关于实轴对称的点：实部都是 −b/2 = '
        + cFmt(-p.b / 2) + '，虚部互为相反数 ±' + (delta < 0 ? cFmt(Math.sqrt(-delta) / 2) : '0') + 'i。</span>'
        + '<span class="viz-meta">求根时把 √Δ 写成 √|Δ|·i 代入原公式即可，韦达定理照样成立（两根之和 = −b、之积 = c）。</span>';
    }
    cSlider(s0.ctrl, '一次项系数 b', p.b, -6, 6, 0.5, function (x) { p.b = x; draw(); });
    cSlider(s0.ctrl, '常数项 c', p.c, -6, 10, 0.5, function (x) { p.c = x; draw(); });
    draw();
  }
