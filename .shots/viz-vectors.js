  /* ================= 平面向量（必修二第 6 章） ================= */
  function pvArrow(m, x1, y1, x2, y2, color, w, dash) {
    var ctx = m.ctx;
    var X1 = m.px(x1), Y1 = m.py(y1), X2 = m.px(x2), Y2 = m.py(y2);
    var ang = Math.atan2(Y2 - Y1, X2 - X1);
    ctx.strokeStyle = color; ctx.lineWidth = w || 2.4;
    ctx.setLineDash(dash || []);
    ctx.beginPath(); ctx.moveTo(X1, Y1); ctx.lineTo(X2, Y2); ctx.stroke();
    ctx.setLineDash([]);
    var len = Math.hypot(X2 - X1, Y2 - Y1);
    if (len < 4) return;
    var hl = Math.min(12, len * 0.42), ha = 0.40;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(X2, Y2);
    ctx.lineTo(X2 - hl * Math.cos(ang - ha), Y2 - hl * Math.sin(ang - ha));
    ctx.lineTo(X2 - hl * Math.cos(ang + ha), Y2 - hl * Math.sin(ang + ha));
    ctx.closePath(); ctx.fill();
  }

  function pvViewOf(pts, pad) {
    var xmin = 1e9, xmax = -1e9, ymin = 1e9, ymax = -1e9;
    pts.forEach(function (q) {
      xmin = Math.min(xmin, q[0]); xmax = Math.max(xmax, q[0]);
      ymin = Math.min(ymin, q[1]); ymax = Math.max(ymax, q[1]);
    });
    var pd = pad == null ? 1.6 : pad;
    return { xmin: xmin - pd, xmax: xmax + pd, ymin: ymin - pd, ymax: ymax + pd };
  }

  /* 向量的概念：模与方向 */
  function pvArrowLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = {
      x: v.x != null ? v.x : 3,
      y: v.y != null ? v.y : 2,
      unit: v.unit ? 1 : 0
    };
    function draw() {
      var view = { xmin: -1.4, xmax: 8.6, ymin: -2.6, ymax: 5.4 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      var mod = Math.hypot(p.x, p.y);
      /* 投影虚线 */
      ctx.setLineDash([4, 4]); ctx.strokeStyle = '#c9d3dc'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(m.px(p.x), m.py(0)); ctx.lineTo(m.px(p.x), m.py(p.y)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(m.px(0), m.py(p.y)); ctx.lineTo(m.px(p.x), m.py(p.y)); ctx.stroke();
      ctx.setLineDash([]);
      pvArrow(m, 0, 0, p.x, p.y, '#185fa5', 3);
      if (p.unit && mod > 0.01) {
        pvArrow(m, 0, 0, p.x / mod, p.y / mod, '#c0392b', 3, [6, 4]);
        cTag(m, p.x / mod + 0.75, p.y / mod + 0.42, '同向单位向量', '#c0392b', 0, 0);
      }
      cTag(m, p.x / 2 + 0.35, p.y / 2 + 0.42, 'a', '#185fa5', 0, 0);
      var deg = mod > 0.01 ? Math.atan2(p.y, p.x) * 180 / Math.PI : 0;
      cTag(m, 0.9, 4.7, 'a = (' + cFmt(p.x) + ', ' + cFmt(p.y) + ')', '#1d2b38', 0, 0);
      cTag(m, 0.9, 4.1, '|a| = ' + cFmt(mod) + '　方向角 ' + cFmt(deg) + '°', '#5b6b7a', 0, 0);
      if (mod < 0.01) cTag(m, 3.4, 1.0, '零向量：长度 0，方向任意', '#c0392b', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">向量 = <b>长度</b> + <b>方向</b>。长度就是 √(x² + y²)，方向用与 x 轴正方向的夹角刻画。把终点拖到原点得到<b>零向量</b>（方向任意），打开开关则画出与 a 同向、长度恒为 1 的<b>单位向量</b> a/|a|。</span>';
    }
    cSlider(s0.ctrl, '横坐标 x', p.x, -4, 8, 0.5, function (x) { p.x = x; draw(); });
    cSlider(s0.ctrl, '纵坐标 y', p.y, -2, 5, 0.5, function (x) { p.y = x; draw(); });
    cSlider(s0.ctrl, '显示单位向量（0 关 / 1 开）', p.unit, 0, 1, 1, function (x) { p.unit = x; draw(); });
    draw();
  }

  /* 加减法：三角形 / 平行四边形 / 减法 */
  function pvAddLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = {
      ax: v.ax != null ? v.ax : 3, ay: v.ay != null ? v.ay : 1,
      bx: v.bx != null ? v.bx : 1, by: v.by != null ? v.by : 2,
      mode: v.mode || 0
    };
    function draw() {
      var cxs = [0, p.ax, p.bx, p.ax + p.bx, p.ax - p.bx];
      var cys = [0, p.ay, p.by, p.ay + p.by, p.ay - p.by];
      var view = pvViewOf([[Math.min.apply(null, cxs), Math.min.apply(null, cys)],
        [Math.max.apply(null, cxs), Math.max.apply(null, cys)]], 1.5);
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      if (p.mode === 1) {
        /* 平行四边形：a、b 从同一点出发，补出平行边 */
        pvArrow(m, 0, 0, p.ax, p.ay, '#185fa5', 3);
        pvArrow(m, 0, 0, p.bx, p.by, '#0f6e56', 3);
        ctx.setLineDash([5, 5]); ctx.strokeStyle = '#b8c4cf'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(m.px(p.bx), m.py(p.by)); ctx.lineTo(m.px(p.ax + p.bx), m.py(p.ay + p.by)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(m.px(p.ax), m.py(p.ay)); ctx.lineTo(m.px(p.ax + p.bx), m.py(p.ay + p.by)); ctx.stroke();
        ctx.setLineDash([]);
        pvArrow(m, 0, 0, p.ax + p.bx, p.ay + p.by, '#c0392b', 3.4);
        cTag(m, (p.ax + p.bx) / 2 + 0.3, (p.ay + p.by) / 2 - 0.45, 'a + b（对角线）', '#c0392b', 0, 0);
      } else {
        pvArrow(m, 0, 0, p.ax, p.ay, '#185fa5', 3);
        pvArrow(m, p.ax, p.ay, p.ax + p.bx, p.ay + p.by, '#0f6e56', 3);
        if (p.mode === 2) {
          pvArrow(m, p.bx, p.by, p.ax, p.ay, '#c0392b', 3.4);
          pvArrow(m, 0, 0, p.bx, p.by, '#7d3c98', 2.4, [5, 4]);
          cTag(m, (p.ax + p.bx) / 2 + 0.35, (p.ay + p.by) / 2 + 0.5, 'a − b', '#c0392b', 0, 0);
        } else {
          pvArrow(m, 0, 0, p.ax + p.bx, p.ay + p.by, '#c0392b', 3.4);
          cTag(m, (p.ax + p.bx) / 2 - 0.55, (p.ay + p.by) / 2 - 0.42, 'a + b', '#c0392b', 0, 0);
        }
      }
      cTag(m, p.ax / 2 - 0.35, p.ay / 2 + 0.4, 'a', '#185fa5', 0, 0);
      cTag(m, p.bx / 2 + 0.4, p.by / 2 + 0.35, 'b', '#0f6e56', 0, 0);
      var sumx = p.ax + p.bx, sumy = p.ay + p.by;
      var nm = p.mode === 2 ? Math.hypot(p.ax - p.bx, p.ay - p.by) : Math.hypot(sumx, sumy);
      s0.info.innerHTML = '<span class="viz-meta">' + (p.mode === 2
        ? '减法 a − b：从 <b>b 的终点</b>指向 <b>a 的终点</b>，|a − b| = ' + cFmt(nm) + '。'
        : '加法两种画法结果相同：' + (p.mode === 1 ? '平行四边形取<b>对角线</b>' : '三角形法则<b>首尾相接</b>') + '，|a + b| = ' + cFmt(nm) + '。')
        + ' 把 b 拖到与 a 反向，和就会缩短（抵消）；同向则最长。恒有 ||a| − |b|| ≤ |a + b| ≤ |a| + |b|。</span>';
    }
    cSlider(s0.ctrl, 'a 的横坐标', p.ax, -4, 6, 0.5, function (x) { p.ax = x; draw(); });
    cSlider(s0.ctrl, 'a 的纵坐标', p.ay, -3, 5, 0.5, function (x) { p.ay = x; draw(); });
    cSlider(s0.ctrl, 'b 的横坐标', p.bx, -4, 6, 0.5, function (x) { p.bx = x; draw(); });
    cSlider(s0.ctrl, 'b 的纵坐标', p.by, -3, 5, 0.5, function (x) { p.by = x; draw(); });
    cSlider(s0.ctrl, '法则（0 三角形 / 1 平行四边形 / 2 减法）', p.mode, 0, 2, 1, function (x) { p.mode = x; draw(); });
    draw();
  }

  /* 坐标运算：a、b、a+b、a−b、k·a */
  function pvCoordLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = {
      ax: v.ax != null ? v.ax : 2, ay: v.ay != null ? v.ay : 1,
      bx: v.bx != null ? v.bx : -1, by: v.by != null ? v.by : 2,
      k: v.k != null ? v.k : 2
    };
    function draw() {
      var pts = [[p.ax, p.ay], [p.bx, p.by], [p.ax + p.bx, p.ay + p.by],
        [p.ax - p.bx, p.ay - p.by], [p.k * p.ax, p.k * p.ay], [0, 0]];
      var xs = pts.map(function (q) { return q[0]; }), ys = pts.map(function (q) { return q[1]; });
      var view = pvViewOf([[Math.min.apply(null, xs), Math.min.apply(null, ys)],
        [Math.max.apply(null, xs), Math.max.apply(null, ys)]], 1.4);
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      pvArrow(m, 0, 0, p.bx, p.by, '#0f6e56', 2.6);
      pvArrow(m, 0, 0, p.ax, p.ay, '#185fa5', 2.8);
      pvArrow(m, 0, 0, p.ax + p.bx, p.ay + p.by, '#c0392b', 2.4, [7, 4]);
      pvArrow(m, 0, 0, p.ax - p.bx, p.ay - p.by, '#8a5a00', 2.2, [3, 3]);
      pvArrow(m, 0, 0, p.k * p.ax, p.k * p.ay, '#7d3c98', 3.2);
      cTag(m, p.ax / 2 - 0.4, p.ay / 2 + 0.4, 'a', '#185fa5', 0, 0);
      cTag(m, p.bx / 2 + 0.4, p.by / 2 + 0.35, 'b', '#0f6e56', 0, 0);
      cTag(m, p.k * p.ax + (p.k >= 0 ? 0.6 : -0.6), p.k * p.ay + 0.3, 'k·a', '#7d3c98', 0, 0);
      cTag(m, (p.ax + p.bx) / 2 + 0.6, (p.ay + p.by) / 2 - 0.45, 'a+b', '#c0392b', 0, 0);
      cTag(m, (p.ax - p.bx) / 2 - 0.2, (p.ay - p.by) / 2 - 0.55, 'a−b', '#8a5a00', 0, 0);
      var cr = p.ax * p.by - p.ay * p.bx;
      s0.info.innerHTML = '<span class="viz-meta">坐标运算全部「分坐标各算」：a + b = (' + cFmt(p.ax + p.bx) + ', ' + cFmt(p.ay + p.by) + ')，a − b = ('
        + cFmt(p.ax - p.bx) + ', ' + cFmt(p.ay - p.by) + ')，k·a = (' + cFmt(p.k * p.ax) + ', ' + cFmt(p.k * p.ay) + ')。'
        + '<br>共线判定行列式 x₁y₂ − x₂y₁ = ' + cFmt(cr) + (Math.abs(cr) < 0.01 ? '，<b>等于 0 → a ∥ b</b>' : '，不为 0 → 不共线') + '。k 拖成负数时 k·a 直接掉头。</span>';
    }
    cSlider(s0.ctrl, 'a 的横坐标', p.ax, -4, 6, 0.5, function (x) { p.ax = x; draw(); });
    cSlider(s0.ctrl, 'a 的纵坐标', p.ay, -3, 5, 0.5, function (x) { p.ay = x; draw(); });
    cSlider(s0.ctrl, 'b 的横坐标', p.bx, -4, 6, 0.5, function (x) { p.bx = x; draw(); });
    cSlider(s0.ctrl, 'b 的纵坐标', p.by, -3, 5, 0.5, function (x) { p.by = x; draw(); });
    cSlider(s0.ctrl, '系数 k', p.k, -2, 3, 0.5, function (x) { p.k = x; draw(); });
    draw();
  }

  /* 数量积与夹角 */
  function pvDotLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = {
      ax: v.ax != null ? v.ax : 3, ay: v.ay != null ? v.ay : 1,
      bx: v.bx != null ? v.bx : 1, by: v.by != null ? v.by : 3
    };
    function draw() {
      var view = pvViewOf([[0, 0], [p.ax, p.ay], [p.bx, p.by]], 1.5);
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      var la = Math.hypot(p.ax, p.ay), lb = Math.hypot(p.bx, p.by);
      var dot = p.ax * p.bx + p.ay * p.by;
      var cos = la * lb > 1e-9 ? dot / (la * lb) : 0;
      cos = Math.max(-1, Math.min(1, cos));
      var th = Math.acos(cos) * 180 / Math.PI;
      /* 夹角扇形 */
      var a1 = Math.atan2(p.ay, p.ax), a2 = Math.atan2(p.by, p.bx);
      ctx.beginPath();
      ctx.moveTo(m.px(0), m.py(0));
      ctx.arc(m.px(0), m.py(0), Math.min(1.1 * m.sc, 62), -Math.max(a1, a2), -Math.min(a1, a2), false);
      ctx.closePath();
      ctx.fillStyle = 'rgba(192,57,43,0.13)'; ctx.fill();
      ctx.strokeStyle = 'rgba(192,57,43,0.5)'; ctx.lineWidth = 1.2; ctx.stroke();
      /* 投影：a 在 b 方向上的垂足 */
      if (lb > 1e-6) {
        var t = dot / (lb * lb);
        var fx = t * p.bx, fy = t * p.by;
        ctx.setLineDash([5, 4]); ctx.strokeStyle = '#b8c4cf'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(m.px(p.ax), m.py(p.ay)); ctx.lineTo(m.px(fx), m.py(fy)); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(m.px(0), m.py(0)); ctx.lineTo(m.px(fx), m.py(fy)); ctx.stroke();
        ctx.setLineDash([]);
        cDot(m, fx, fy, '#8a5a00', 4);
      }
      pvArrow(m, 0, 0, p.ax, p.ay, '#185fa5', 3);
      pvArrow(m, 0, 0, p.bx, p.by, '#0f6e56', 3);
      cTag(m, p.ax * 0.55 - 0.35, p.ay * 0.55 + 0.4, 'a', '#185fa5', 0, 0);
      cTag(m, p.bx * 0.55 + 0.4, p.by * 0.55 + 0.35, 'b', '#0f6e56', 0, 0);
      var xr = Math.max(p.ax, p.bx, 1) + 0.2, yr = Math.max(p.ay, p.by) + 1.5;
      cTag(m, xr, yr, 'a·b = ' + cFmt(dot), Math.abs(dot) < 0.01 ? '#c0392b' : '#1d2b38', 0, 0);
      cTag(m, xr, yr - 0.62, '|a| = ' + cFmt(la) + '　|b| = ' + cFmt(lb), '#5b6b7a', 0, 0);
      cTag(m, xr, yr - 1.24, '夹角 θ = ' + cFmt(th) + '°', Math.abs(dot) < 0.01 ? '#c0392b' : '#5b6b7a', 0, 0);
      var verdict = Math.abs(dot) < 0.02 ? '<b>点积为 0 → 两向量垂直</b>' : (dot > 0 ? '点积为正 → 夹角是锐角' : '点积为负 → 夹角是钝角');
      s0.info.innerHTML = '<span class="viz-meta">a·b = |a||b|cosθ = ' + cFmt(p.ax) + '×' + cFmt(p.bx) + ' + ' + cFmt(p.ay) + '×' + cFmt(p.by) + ' = ' + cFmt(dot) + '。' + verdict
        + '。灰虚线是 a 在 b 方向上的<b>投影</b>，长度 = (a·b)/|b| = ' + (lb > 1e-6 ? cFmt(dot / lb) : '—') + '。cos90° = 0，所以「垂直就是点积为零」不是记忆口诀，是定义直接推出来的。</span>';
    }
    cSlider(s0.ctrl, 'a 的横坐标', p.ax, -4, 6, 0.5, function (x) { p.ax = x; draw(); });
    cSlider(s0.ctrl, 'a 的纵坐标', p.ay, -3, 5, 0.5, function (x) { p.ay = x; draw(); });
    cSlider(s0.ctrl, 'b 的横坐标', p.bx, -4, 6, 0.5, function (x) { p.bx = x; draw(); });
    cSlider(s0.ctrl, 'b 的纵坐标', p.by, -3, 5, 0.5, function (x) { p.by = x; draw(); });
    draw();
  }

  /* 正弦定理：外接圆里看 a/sinA */
  function pvSineLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { A: v.A != null ? v.A : 50, B: v.B != null ? v.B : 60, c: v.c || 7 };
    function draw() {
      var A = Math.min(p.A, 150 - p.B), B = p.B;
      var Cang = 180 - A - B;
      var rad = Math.PI / 180;
      var c = p.c;
      var sinC = Math.sin(Cang * rad);
      var b = c * Math.sin(B * rad) / sinC;
      var a = c * Math.sin(A * rad) / sinC;
      var Ax = 0, Ay = 0, Bx = c, By = 0;
      var Cx = b * Math.cos(A * rad), Cy = b * Math.sin(A * rad);
      var R = c / (2 * sinC);
      var Ox = c / 2, Oy = (Cx * Cx + Cy * Cy - c * Cx) / (2 * (Cy || 0.001));
      var view = pvViewOf([
        [Ox - R, Oy - R], [Ox + R, Oy + R], [Ax, Ay], [Bx, By], [Cx, Cy]
      ], 0.6);
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      ctx.strokeStyle = '#c9d3dc'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(m.px(Ox), m.py(Oy), R * m.sc, 0, Math.PI * 2); ctx.stroke();
      cDot(m, Ox, Oy, '#8395a7', 3.5);
      cTag(m, Ox, Oy - 0.55, '外心 O', '#8395a7', 0, 0);
      var ctx2 = ctx;
      ctx2.beginPath();
      ctx2.moveTo(m.px(Ax), m.py(Ay)); ctx2.lineTo(m.px(Bx), m.py(By)); ctx2.lineTo(m.px(Cx), m.py(Cy));
      ctx2.closePath();
      ctx2.fillStyle = 'rgba(24,95,165,0.09)'; ctx2.fill();
      ctx2.strokeStyle = '#185fa5'; ctx2.lineWidth = 2.6; ctx2.stroke();
      cDot(m, Ax, Ay, '#185fa5', 4.5); cDot(m, Bx, By, '#185fa5', 4.5); cDot(m, Cx, Cy, '#185fa5', 4.5);
      cTag(m, Ax - 0.45, Ay - 0.45, 'A', '#1d2b38', 0, 0);
      cTag(m, Bx + 0.45, By - 0.45, 'B', '#1d2b38', 0, 0);
      cTag(m, Cx, Cy + 0.55, 'C', '#1d2b38', 0, 0);
      cTag(m, (Ax + Bx) / 2, Ay - 0.55, 'c = ' + cFmt(c), '#5b6b7a', 0, 0);
      cTag(m, (Bx + Cx) / 2 + 0.55, (By + Cy) / 2, 'a = ' + cFmt(a), '#c0392b', 0, 0);
      cTag(m, (Ax + Cx) / 2 - 0.6, (Ay + Cy) / 2, 'b = ' + cFmt(b), '#0f6e56', 0, 0);
      var topY = Math.max(Oy + R, Cy) + 0.55;
      cTag(m, Ox, topY, 'a/sinA = b/sinB = c/sinC = 2R = ' + cFmt(2 * R), '#1d2b38', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">A = ' + cFmt(A) + '°，B = ' + cFmt(B) + '°，C = ' + cFmt(Cang) + '°；a = ' + cFmt(a) + '、b = ' + cFmt(b) + '、c = ' + cFmt(c) + '。'
        + '三个比值都等于 <b>外接圆直径 2R = ' + cFmt(2 * R) + '</b>。这条比值不会随角度变化——正因为它是常数，才能「已知两角一边」求出所有边。</span>'
        + '<span class="viz-meta">记住边角对应：<b>a 对着 A，b 对着 B，c 对着 C</b>。把 A 拖到接近 0°，a 迅速缩短，但 a/sinA 依然不变。</span>';
    }
    cSlider(s0.ctrl, '角 A（度）', p.A, 10, 120, 1, function (x) { p.A = x; draw(); });
    cSlider(s0.ctrl, '角 B（度）', p.B, 10, 120, 1, function (x) { p.B = x; draw(); });
    cSlider(s0.ctrl, '边 c', p.c, 3, 12, 0.5, function (x) { p.c = x; draw(); });
    draw();
  }

  /* 余弦定理：拖夹角看第三边 */
  function pvCosineLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { a: v.a || 5, b: v.b || 7, C: v.C != null ? v.C : 60 };
    function draw() {
      var rad = Math.PI / 180;
      var Cx = 0, Cy = 0;
      var Ax = p.b, Ay = 0;
      var Bx = p.a * Math.cos(p.C * rad), By = p.a * Math.sin(p.C * rad);
      var c2 = p.a * p.a + p.b * p.b - 2 * p.a * p.b * Math.cos(p.C * rad);
      var c = Math.sqrt(Math.max(0, c2));
      var view = pvViewOf([[Cx, Cy], [Ax, Ay], [Bx, By]], 1.5);
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      ctx.beginPath();
      ctx.moveTo(m.px(Cx), m.py(Cy)); ctx.lineTo(m.px(Ax), m.py(Ay)); ctx.lineTo(m.px(Bx), m.py(By));
      ctx.closePath();
      ctx.fillStyle = 'rgba(15,110,86,0.10)'; ctx.fill();
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2.6; ctx.stroke();
      /* 直角标记（C = 90 时） */
      if (Math.abs(p.C - 90) < 1.5) {
        var s = Math.min(0.9, Math.min(p.a, p.b) * 0.18);
        ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(m.px(s), m.py(0)); ctx.lineTo(m.px(s), m.py(s)); ctx.lineTo(m.px(0), m.py(s));
        ctx.stroke();
      }
      cDot(m, Cx, Cy, '#0f6e56', 4.5); cDot(m, Ax, Ay, '#0f6e56', 4.5); cDot(m, Bx, By, '#0f6e56', 4.5);
      cTag(m, Cx - 0.5, Cy - 0.5, 'C', '#1d2b38', 0, 0);
      cTag(m, Ax + 0.5, Ay - 0.4, 'A', '#1d2b38', 0, 0);
      cTag(m, Bx + 0.3, By + 0.55, 'B', '#1d2b38', 0, 0);
      cTag(m, p.b / 2, -0.6, 'b = ' + cFmt(p.b), '#0f6e56', 0, 0);
      cTag(m, Bx * 0.5 - 0.75, By * 0.5, 'a = ' + cFmt(p.a), '#0f6e56', 0, 0);
      cTag(m, (Ax + Bx) / 2 + 0.7, (Ay + By) / 2 + 0.35, 'c = ' + cFmt(c), '#c0392b', 0, 0);
      var yy = Math.max(Ay, By) + 1.7;
      cTag(m, p.b * 0.5, yy, 'c² = a² + b² − 2ab·cosC', '#1d2b38', 0, 0);
      cTag(m, p.b * 0.5, yy - 0.62, cFmt(c2) + ' = ' + cFmt(p.a * p.a) + ' + ' + cFmt(p.b * p.b) + ' − ' + cFmt(2 * p.a * p.b) + '×(' + cFmt(Math.cos(p.C * rad)) + ')', '#5b6b7a', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">C = ' + cFmt(p.C) + '° 时 c = ' + cFmt(c) + '。把 C 拖到 <b>90°</b>：cosC = 0，修正项 −2ab·cosC 消失，公式退化成勾股定理 c² = a² + b²，此时 c = '
        + cFmt(Math.sqrt(p.a * p.a + p.b * p.b)) + '。C > 90° 时 cosC < 0，修正项变加号，c 反而更长——钝角三角形的对边就是最长边。</span>';
    }
    cSlider(s0.ctrl, '边 a', p.a, 2, 10, 0.5, function (x) { p.a = x; draw(); });
    cSlider(s0.ctrl, '边 b', p.b, 2, 10, 0.5, function (x) { p.b = x; draw(); });
    cSlider(s0.ctrl, '夹角 C（度）', p.C, 15, 165, 1, function (x) { p.C = x; draw(); });
    draw();
  }
