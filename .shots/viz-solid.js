  /* ================= 立体几何初步（必修二第 8 章） ================= */
  function sgProject(x, y, z) {
    return [(x - y) * 0.866, z - (x + y) * 0.42];
  }
  function sgPt(m, x, y, z) {
    var q = sgProject(x, y, z);
    return [m.px(q[0]), m.py(q[1])];
  }
  function sgLine3(m, x1, y1, z1, x2, y2, z2, color, w, dash) {
    var a = sgPt(m, x1, y1, z1), b = sgPt(m, x2, y2, z2);
    var ctx = m.ctx;
    ctx.strokeStyle = color; ctx.lineWidth = w || 1.8;
    ctx.setLineDash(dash || []);
    ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    ctx.setLineDash([]);
  }
  function sgPoly3(m, pts, fill, stroke, w) {
    var ctx = m.ctx;
    ctx.beginPath();
    pts.forEach(function (q, i) {
      var s = sgPt(m, q[0], q[1], q[2]);
      if (i === 0) ctx.moveTo(s[0], s[1]); else ctx.lineTo(s[0], s[1]);
    });
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = w || 2; ctx.stroke(); }
  }
  function sgBaseCircle(m, r, z, color, w) {
    var ctx = m.ctx;
    ctx.strokeStyle = color; ctx.lineWidth = w || 1.8;
    ctx.beginPath();
    for (var i = 0; i <= 72; i++) {
      var t = i / 72 * Math.PI * 2;
      var s = sgPt(m, r * Math.cos(t), r * Math.sin(t), z);
      if (i === 0) ctx.moveTo(s[0], s[1]); else ctx.lineTo(s[0], s[1]);
    }
    ctx.stroke();
  }
  function sgViewPanel(m, x, y, w, h, title) {
    var ctx = m.ctx;
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.strokeStyle = '#e2e8ee'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#8395a7';
    ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText(title, x + w / 2, y - 2);
    return { x: x + 10, y: y + 10, w: w - 20, h: h - 20 };
  }

  /* 几何体与三视图 */
  function sgSolidLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { s: v.s || 0, spin: v.spin != null ? v.spin : 30 };
    var NAME = ['正方体 / 棱柱', '圆柱', '圆锥', '球'];
    function draw() {
      var view = { xmin: -1.9, xmax: 2.6, ymin: -1.5, ymax: 2.2 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      cGrid(m, { xmin: -2, xmax: 3, ymin: -2, ymax: 2 });
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
      var t = p.spin * Math.PI / 180;
      /* 主体：单位尺度几何体，放在原点 */
      if (p.s === 0) {
        var cs = Math.cos(t), sn = Math.sin(t);
        var V = [], i, j;
        for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) for (var k = 0; k < 2; k++) {
          var xx = (i - 0.5) * 1.7, yy = (j - 0.5) * 1.7, zz = k * 1.7;
          V.push([xx * cs - yy * sn, xx * sn + yy * cs, zz]);
        }
        /* 顶点顺序：000,001,010,011,100,101,110,111 （i 最快） */
        var E = [[0, 1], [2, 3], [4, 5], [6, 7], [0, 2], [1, 3], [4, 6], [5, 7], [0, 4], [1, 5], [2, 6], [3, 7]];
        sgPoly3(m, [V[0], V[2], V[3], V[1]], 'rgba(24,95,165,0.10)', '#185fa5', 2);
        E.forEach(function (e) { sgLine3(m, V[e[0]][0], V[e[0]][1], V[e[0]][2], V[e[1]][0], V[e[1]][1], V[e[1]][2], '#185fa5', 1.8); });
      } else if (p.s === 1) {
        sgBaseCircle(m, 0.85, 0, '#185fa5', 2);
        sgBaseCircle(m, 0.85, 1.7, '#185fa5', 2);
        [-1, 1].forEach(function (s) {
          sgLine3(m, 0.85 * s, 0, 0, 0.85 * s, 0, 1.7, '#185fa5', 1.8);
          sgLine3(m, 0, 0.85 * s, 0, 0, 0.85 * s, 1.7, '#185fa5', 1.8);
        });
      } else if (p.s === 2) {
        sgBaseCircle(m, 0.9, 0, '#185fa5', 2);
        var apex = [0, 0, 1.8];
        for (var a = 0; a < 4; a++) {
          var th = a * Math.PI / 2 + 0.4;
          sgLine3(m, 0.9 * Math.cos(th), 0.9 * Math.sin(th), 0, apex[0], apex[1], apex[2], '#185fa5', 1.8);
        }
        var ap = sgPt(m, apex[0], apex[1], apex[2]);
        ctx.fillStyle = '#185fa5';
        ctx.beginPath(); ctx.arc(ap[0], ap[1], 2.6, 0, Math.PI * 2); ctx.fill();
      } else {
        var cc = sgPt(m, 0, 0, 0.9), rr = 0.9 * m.sc;
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(cc[0], cc[1], rr, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = 'rgba(24,95,165,0.35)'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.ellipse(cc[0], cc[1], rr, rr * 0.42, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(cc[0], cc[1], rr * 0.42, rr, 0, 0, Math.PI * 2); ctx.stroke();
      }
      /* 右侧三视图 */
      var px = m.w - 108, py = 34, pw = 84, ph = 88;
      var a1 = sgViewPanel(m, px, py, pw, ph, '正视图');
      var a2 = sgViewPanel(m, px, py + 112, pw, ph, '侧视图');
      var a3 = sgViewPanel(m, px, py + 224, pw, ph, '俯视图');
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2;
      function box(pn, shape) {
        var cx = pn.x + pn.w / 2, cy = pn.y + pn.h / 2;
        if (shape === 'rect' || shape === 'square') {
          var w = shape === 'square' ? Math.min(pn.w, pn.h) * 0.6 : pn.w * 0.72;
          var h = shape === 'square' ? w : pn.h * 0.72;
          ctx.strokeRect(cx - w / 2, cy - h / 2, w, h);
        } else if (shape === 'tri') {
          ctx.beginPath(); ctx.moveTo(cx, cy - pn.h * 0.36);
          ctx.lineTo(cx + pn.w * 0.34, cy + pn.h * 0.36);
          ctx.lineTo(cx - pn.w * 0.34, cy + pn.h * 0.36);
          ctx.closePath(); ctx.stroke();
        } else if (shape === 'circle') {
          ctx.beginPath(); ctx.arc(cx, cy, Math.min(pn.w, pn.h) * 0.36, 0, Math.PI * 2); ctx.stroke();
        } else if (shape === 'circleDot') {
          ctx.beginPath(); ctx.arc(cx, cy, Math.min(pn.w, pn.h) * 0.36, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = '#0f6e56';
          ctx.beginPath(); ctx.arc(cx, cy, 2.4, 0, Math.PI * 2); ctx.fill();
        }
      }
      var views = [['rect', 'rect', 'square'], ['rect', 'rect', 'circle'], ['tri', 'tri', 'circleDot'], ['circle', 'circle', 'circle']][p.s];
      box(a1, views[0]); box(a2, views[1]); box(a3, views[2]);
      cTag(m, -0.9, 1.95, NAME[p.s], '#1d2b38', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">右边三张就是<b>三视图</b>：正视图（从前看）、侧视图（从左看）、俯视图（从上往下看）。口诀 <b>长对正、高平齐、宽相等</b>。</span>'
        + '<span class="viz-meta">当前是' + NAME[p.s] + '：' + (p.s === 0 ? '三个视图都是正方形——正方体是唯一「三视图全同」的柱体。'
          : p.s === 1 ? '正视图与侧视图是矩形，俯视图是圆。矩形的宽等于底面<b>直径</b>，高等于柱高。'
            : p.s === 2 ? '正视图与侧视图是等腰三角形，俯视图是圆加一个圆心点（顶点在圆心正上方）。'
              : '三个视图都是同样大小的圆——球从任何方向看都一样。') + '</span>';
    }
    cSlider(s0.ctrl, '几何体（0 棱柱 / 1 圆柱 / 2 圆锥 / 3 球）', p.s, 0, 3, 1, function (x) { p.s = x; draw(); });
    cSlider(s0.ctrl, '旋转视角（棱柱）', p.spin, 0, 90, 5, function (x) { p.spin = x; draw(); });
    draw();
  }

  /* 展开图与侧面积 */
  function sgNetLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { s: v.s || 0, r: v.r || 3, h: v.h || 5 };
    function draw() {
      var view = { xmin: -1.2, xmax: 8.2, ymin: -2.2, ymax: 3.4 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
      /* 左侧：立体图 */
      var m2 = { ctx: ctx, w: m.w, h: m.h, sc: 52, px: function (u) { return 120 + u * 52; }, py: function (v2) { return 300 - v2 * 52; } };
      if (p.s === 0) {
        sgBaseCircle(m2, 0.9, 0, '#185fa5', 2);
        sgBaseCircle(m2, 0.9, 1.5, '#185fa5', 2);
        [-1, 1].forEach(function (s) {
          sgLine3(m2, 0.9 * s, 0, 0, 0.9 * s, 0, 1.5, '#185fa5', 1.8);
          sgLine3(m2, 0, 0.9 * s, 0, 0, 0.9 * s, 1.5, '#185fa5', 1.8);
        });
      } else {
        sgBaseCircle(m2, 0.95, 0, '#185fa5', 2);
        for (var a = 0; a < 6; a++) {
          var th = a * Math.PI / 3 + 0.3;
          sgLine3(m2, 0.95 * Math.cos(th), 0.95 * Math.sin(th), 0, 0, 0, 1.6, '#185fa5', 1.6);
        }
      }
      ctx.fillStyle = '#6b7a89';
      ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText('r = ' + cFmt(p.r) + '，h = ' + cFmt(p.h), 120, 330);
      /* 右侧：展开图（以像素绘制） */
      var ox = 260, oy = 90, maxW = m.w - ox - 40, maxH = 210;
      var lat = p.s === 0 ? 2 * Math.PI * p.r : Math.PI * p.r;
      var l = Math.sqrt(p.r * p.r + p.h * p.h);
      var sc = Math.min(maxW / (p.s === 0 ? lat : 2 * p.r * 1.35), maxH / (p.s === 0 ? p.h : l * 0.9));
      if (p.s === 0) {
        var W = lat * sc, H = p.h * sc;
        ctx.fillStyle = 'rgba(15,110,86,0.12)'; ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.rect(ox, oy, W, H); ctx.fill(); ctx.stroke();
        /* 上下两个底圆 */
        var rr = p.r * sc;
        [oy - rr * 2 - 8, oy + H + 8].forEach(function (cy2) {
          ctx.beginPath(); ctx.arc(ox + W / 2, cy2 + rr, rr, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(24,95,165,0.12)'; ctx.fill(); ctx.strokeStyle = '#185fa5'; ctx.stroke();
        });
        ctx.fillStyle = '#0f6e56';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText('长 = 2πr = ' + cFmt(lat), ox + W / 2, oy + H + 6 + rr * 2 + 6);
        ctx.save();
        ctx.translate(ox - 10, oy + H / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('h = ' + cFmt(p.h), 0, 0);
        ctx.restore();
      } else {
        var base = oy + maxH, R = l * sc;
        var half = Math.PI * p.r / l;
        var cx0 = ox + R * 0.55, cy0 = base;
        ctx.beginPath();
        ctx.moveTo(cx0, cy0);
        ctx.arc(cx0, cy0, R, -Math.PI / 2 - half, -Math.PI / 2 + half);
        ctx.closePath();
        ctx.fillStyle = 'rgba(15,110,86,0.12)'; ctx.fill();
        ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx0, cy0, p.r * sc, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(24,95,165,0.12)'; ctx.fill();
        ctx.strokeStyle = '#185fa5'; ctx.stroke();
        ctx.fillStyle = '#0f6e56';
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText('扇形半径 = 母线 l = ' + cFmt(l), cx0 + 8, cy0 - R * 0.5);
        ctx.fillText('弧长 = 2πr = ' + cFmt(lat), ox + 8, base + 26);
      }
      var Slat = p.s === 0 ? 2 * Math.PI * p.r * p.h : Math.PI * p.r * l;
      var Sall = p.s === 0 ? Slat + 2 * Math.PI * p.r * p.r : Slat + Math.PI * p.r * p.r;
      cTag(m, 4.0, 3.0, (p.s === 0 ? 'S侧 = 2πrh' : 'S侧 = πrl') + ' = ' + cFmt(Slat), '#0f6e56', 0, 0);
      cTag(m, 4.0, 2.5, 'S全 = ' + cFmt(Sall), '#1d2b38', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">求表面积只有一招：<b>把表面摊平</b>。圆柱侧面剪开是矩形（长 = 底面周长 2πr = ' + cFmt(2 * Math.PI * p.r) + '，宽 = h）；圆锥侧面剪开是扇形（弧长 = 2πr，半径 = 母线 l = ' + cFmt(l) + '）。</span>'
        + '<span class="viz-meta">扇形面积 = ½ × 弧长 × 半径 = ½ × ' + cFmt(2 * Math.PI * p.r) + ' × ' + cFmt(l) + ' = πrl = ' + cFmt(Math.PI * p.r * l) + '。注意 l 要用勾股定理 l² = r² + h²。</span>';
    }
    cSlider(s0.ctrl, '形体（0 圆柱 / 1 圆锥）', p.s, 0, 1, 1, function (x) { p.s = x; draw(); });
    cSlider(s0.ctrl, '底面半径 r', p.r, 1, 5, 0.5, function (x) { p.r = x; draw(); });
    cSlider(s0.ctrl, '高 h', p.h, 1, 9, 0.5, function (x) { p.h = x; draw(); });
    draw();
  }

  /* 体积：三个锥装满一个柱 */
  function sgVolumeLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { s: v.s || 0, n: v.n != null ? v.n : 1 };
    function draw() {
      var view = { xmin: -1.4, xmax: 8.4, ymin: -1.9, ymax: 3.2 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
      var m1 = { ctx: ctx, w: m.w, h: m.h, sc: 80, px: function (u) { return 150 + u * 80; }, py: function (v2) { return 300 - v2 * 80; } };
      var m2 = { ctx: ctx, w: m.w, h: m.h, sc: 80, px: function (u) { return 470 + u * 80; }, py: function (v2) { return 300 - v2 * 80; } };
      /* 左：圆锥 */
      sgBaseCircle(m1, 0.95, 0, '#185fa5', 2);
      sgPoly3(m1, [[0.95, 0, 0], [-0.95, 0, 0], [0, 0, 1.7]], 'rgba(24,95,165,0.10)', null);
      for (var a = 0; a < 6; a++) {
        var th = a * Math.PI / 3 + 0.3;
        sgLine3(m1, 0.95 * Math.cos(th), 0.95 * Math.sin(th), 0, 0, 0, 1.7, 'rgba(24,95,165,0.55)', 1.2);
      }
      /* 右：圆柱 + 液面 */
      var frac = Math.max(0, Math.min(1, p.n / 3));
      var lvl = 1.7 * frac;
      sgBaseCircle(m2, 0.95, 0, '#0f6e56', 2);
      sgBaseCircle(m2, 0.95, 1.7, '#0f6e56', 2);
      if (frac > 0.001) {
        sgPoly3(m2, [[0.95, 0, 0], [-0.95, 0, 0], [-0.95, 0, lvl], [0.95, 0, lvl]], 'rgba(15,110,86,0.18)', null);
        sgBaseCircle(m2, 0.95, lvl, '#0f6e56', 1.6);
      }
      [-1, 1].forEach(function (s) {
        sgLine3(m2, 0.95 * s, 0, 0, 0.95 * s, 0, 1.7, '#0f6e56', 1.8);
        sgLine3(m2, 0, 0.95 * s, 0, 0, 0.95 * s, 1.7, '#0f6e56', 1.8);
      });
      cTag(m, 0, 2.55, '圆锥 V = ⅓Sh', '#185fa5', 0, 0);
      cTag(m, 4.3, 2.55, '圆柱 V = Sh', '#0f6e56', 0, 0);
      cTag(m, 4.3, 2.0, '已倒入 ' + cFmt(frac) + ' Sh（' + cFmt(frac * 3) + ' 个锥）', '#1d2b38', 0, 0);
      cTag(m, 0, 2.0, p.n >= 3 ? '正好装满' : '还能再倒 ' + cFmt(3 - p.n) + ' 次', p.n >= 3 ? '#c0392b' : '#5b6b7a', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">把等底等高的锥一次次倒进柱里：第一次到 <b>1/3</b>，第二次 <b>2/3</b>，第三次刚好满。所以 V锥 = ⅓Sh 里的 1/3 是<b>数出来的</b>，不是硬记的系数。</span>'
        + '<span class="viz-meta">台体公式 V = ⅓h(S′ + √(S′S) + S) 是中间态：上底 S′ = S 时退化为柱 Sh，S′ = 0 时退化为锥 ⅓Sh。球则是 V = 4/3 πR³。</span>';
    }
    cSlider(s0.ctrl, '倒入锥的个数（0 ~ 3）', p.n, 0, 3, 1, function (x) { p.n = x; draw(); });
    draw();
  }

  /* 正方体中的位置关系 */
  function sgLinesLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { i: v.i || 0, j: v.j != null ? v.j : 6 };
    var V = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]];
    var E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    var EN = ['AB', 'BC', 'CD', 'DA', 'A₁B₁', 'B₁C₁', 'C₁D₁', 'D₁A₁', 'AA₁', 'BB₁', 'CC₁', 'DD₁'];
    function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
    function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
    function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
    function len(a) { return Math.sqrt(dot(a, a)); }
    function draw() {
      var view = { xmin: -1.9, xmax: 2.4, ymin: -1.6, ymax: 2.1 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
      var M = 1.6;
      function P(q) { return sgPt(m, (q[0] - 0.5) * M, (q[1] - 0.5) * M, q[2] * M); }
      /* 底面淡色 */
      var b0 = P(V[0]), b1 = P(V[1]), b2 = P(V[2]), b3 = P(V[3]);
      ctx.beginPath(); ctx.moveTo(b0[0], b0[1]); ctx.lineTo(b1[0], b1[1]); ctx.lineTo(b2[0], b2[1]); ctx.lineTo(b3[0], b3[1]);
      ctx.closePath(); ctx.fillStyle = 'rgba(24,95,165,0.07)'; ctx.fill();
      E.forEach(function (e, idx) {
        var col = '#9aa7b4', w = 1.6;
        if (idx === p.i) { col = '#185fa5'; w = 3.4; }
        else if (idx === p.j) { col = '#c0392b'; w = 3.4; }
        var A = P(V[e[0]]), B = P(V[e[1]]);
        ctx.strokeStyle = col; ctx.lineWidth = w;
        ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
      });
      V.forEach(function (q, idx) {
        var s = P(q);
        cDot(m, 0, 0, '#000', 0);
        ctx.fillStyle = '#8395a7';
        ctx.beginPath(); ctx.arc(s[0], s[1], 2.6, 0, Math.PI * 2); ctx.fill();
      });
      var e1 = E[p.i], e2 = E[p.j];
      var d1 = sub(V[e1[1]], V[e1[0]]), d2 = sub(V[e2[1]], V[e2[0]]);
      var cr = cross(d1, d2), cl = len(cr);
      var share = e1[0] === e2[0] || e1[0] === e2[1] || e1[1] === e2[0] || e1[1] === e2[1];
      var rel;
      if (cl < 1e-6) rel = (share ? '同一条直线' : '平行');
      else if (share) rel = '相交';
      else {
        /* 判断共面：混合积 */
        var mix = dot(cr, sub(V[e2[0]], V[e1[0]]));
        rel = Math.abs(mix) < 1e-6 ? '相交（延长后）' : '异面';
      }
      var cos = dot(d1, d2) / (len(d1) * len(d2));
      var ang = Math.acos(Math.max(-1, Math.min(1, cos))) * 180 / Math.PI;
      if (ang > 90) ang = 180 - ang;
      cTag(m, 0.2, 1.95, EN[p.i] + ' 与 ' + EN[p.j] + '：' + rel, rel === '异面' ? '#c0392b' : '#0f6e56', 0, 0);
      cTag(m, 0.2, 1.45, '所成角 = ' + cFmt(ang) + '°', '#1d2b38', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">正方体 12 条棱里任取两条：共点 → <b>相交</b>；方向相同 → <b>平行</b>；既不平行也不共点 → <b>异面</b>（不同在任何一个平面内）。当前：'
        + EN[p.i] + '（蓝）与 ' + EN[p.j] + '（红）是 <b>' + rel + '</b>。</span>'
        + '<span class="viz-meta">所成角的算法：两条直线的方向向量夹角取<b>锐角或直角</b>，所以算出 ' + cFmt(Math.acos(Math.max(-1, Math.min(1, cos))) * 180 / Math.PI) + '° 时要折算成 ' + cFmt(ang) + '°。</span>';
    }
    cSlider(s0.ctrl, '第一条棱', p.i, 0, 11, 1, function (x) { p.i = x; draw(); });
    cSlider(s0.ctrl, '第二条棱', p.j, 0, 11, 1, function (x) { p.j = x; draw(); });
    draw();
  }

  /* 线面角：斜线、垂线、射影 */
  function sgAngleLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { i: v.i || 0, deg: v.deg != null ? v.deg : 40 };
    function draw() {
      var view = { xmin: -2.4, xmax: 2.8, ymin: -1.8, ymax: 2.3 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
      /* 平面：z = 0 上的正方形 */
      sgPoly3(m, [[-1.2, -1.2, 0], [1.2, -1.2, 0], [1.2, 1.2, 0], [-1.2, 1.2, 0]], 'rgba(24,95,165,0.09)', '#9aa7b4', 1.6);
      var rad = p.deg * Math.PI / 180;
      var h = 1.4;
      var d = h / Math.tan(rad);
      var O = [0, 0, 0], Pp = [0, 0, h];
      var A = [Math.min(d, 1.6), -Math.min(d, 1.6) * 0.25, 0];
      /* 垂线 */
      sgLine3(m, O[0], O[1], O[2], Pp[0], Pp[1], Pp[2], '#7d3c98', 2.4, [6, 4]);
      /* 射影 */
      sgLine3(m, O[0], O[1], O[2], A[0], A[1], A[2], '#0f6e56', 2.6);
      /* 斜线 */
      sgLine3(m, Pp[0], Pp[1], Pp[2], A[0], A[1], A[2], '#c0392b', 3);
      /* 直角标记 */
      var O1 = sgPt(m, 0, 0, 0), P1 = sgPt(m, 0, 0, h * 0.22), A1 = sgPt(m, A[0] * 0.16, A[1] * 0.16, 0);
      ctx.strokeStyle = '#7d3c98'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(P1[0], P1[1]); ctx.lineTo(P1[0] + (A1[0] - O1[0]), P1[1] + (A1[1] - O1[1])); ctx.lineTo(A1[0], A1[1]); ctx.stroke();
      /* 角弧 */
      var angA = Math.atan2(Pp[2] - A[2], 0);
      var sA = sgPt(m, A[0], A[1], 0), sP = sgPt(m, Pp[0], Pp[1], Pp[2]);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(sA[0], sA[1], 30, Math.atan2(sP[1] - sA[1], sP[0] - sA[0]), Math.atan2(O1[1] - sA[1], O1[0] - sA[0]), false);
      ctx.stroke();
      cTag(m, Pp[0] + 0.25, Pp[2] + 0.15, 'P', '#7d3c98', 0, 0);
      cTag(m, O[0] - 0.3, 0.05, 'O（垂足）', '#7d3c98', 0, 0);
      cTag(m, A[0] + 0.3, 0.1, 'A', '#0f6e56', 0, 0);
      cTag(m, 0, 1.95, 'PA 与平面所成角 = ∠PAO = ' + cFmt(p.deg) + '°', '#c0392b', 0, 0);
      cTag(m, 0, 1.45, 'PO = ' + cFmt(h) + '（垂线段）　OA = ' + cFmt(Math.min(d, 1.6)) + '（射影）', '#5b6b7a', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">线面角的定义：斜线 PA 与它在平面内的<b>射影 OA</b> 的夹角。凑出直角三角形 <b>P-O-A</b>，直角在 O，于是 tan∠PAO = PO/OA。</span>'
        + '<span class="viz-meta">把角度拖到 90°：射影缩成一点，直线垂直于平面；拖到 10°：斜线几乎贴着平面，射影接近全长。线面角的范围是 <b>[0°, 90°]</b>，永远不会是钝角。</span>';
    }
    cSlider(s0.ctrl, '线面角（度）', p.deg, 10, 85, 1, function (x) { p.deg = x; draw(); });
    draw();
  }
