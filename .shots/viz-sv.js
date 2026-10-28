/* ===== 选择性必修第一册：空间向量（sv） ===== */

/* 3D 场景里的文字标注 */
function svLabel(m, x, y, z, t, color, dx, dy) {
  var s = sgPt(m, x, y, z);
  m.ctx.fillStyle = color || '#333';
  m.ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  m.ctx.textAlign = 'center';
  m.ctx.textBaseline = 'middle';
  m.ctx.fillText(t, s[0] + (dx || 0), s[1] + (dy || 0));
}

/* 3D 箭头（用 2D 画，避免 canvas 变换） */
function svArrow3(m, x1, y1, z1, x2, y2, z2, color, w) {
  var a = sgPt(m, x1, y1, z1), b = sgPt(m, x2, y2, z2);
  var ctx = m.ctx;
  ctx.strokeStyle = color; ctx.lineWidth = w || 2.2;
  ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
  var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
  var ux = dx / L, uy = dy / L, hl = 10;
  ctx.beginPath();
  ctx.moveTo(b[0], b[1]);
  ctx.lineTo(b[0] - ux * hl - uy * hl * 0.5, b[1] - uy * hl + ux * hl * 0.5);
  ctx.lineTo(b[0] - ux * hl + uy * hl * 0.5, b[1] - uy * hl - ux * hl * 0.5);
  ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}

/* 空间直角坐标系 + 向量坐标 */
function svSpaceLab(el, cfg) {
  var p = Object.assign({ x: 2, y: 2, z: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -5.5, xmax: 5.5, ymin: -4.5, ymax: 4.5 };
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    cGrid(m, view);
    // 三条轴
    sgLine3(m, 0, 0, 0, 3.4, 0, 0, '#9aa7b4', 1.5);
    sgLine3(m, 0, 0, 0, 0, 3.4, 0, '#9aa7b4', 1.5);
    sgLine3(m, 0, 0, 0, 0, 0, 3.4, '#9aa7b4', 1.5);
    svLabel(m, 3.9, 0, 0, 'x', '#6b7a89');
    svLabel(m, 0, 3.9, 0, 'y', '#6b7a89');
    svLabel(m, 0, 0, 3.9, 'z', '#6b7a89');
    // 底面投影虚线：P0 = (x, y, 0) 到原点两条
    var P0 = [p.x, p.y, 0];
    sgLine3(m, 0, 0, 0, p.x, 0, 0, '#c9d4de', 1.2, [4, 4]);
    sgLine3(m, p.x, 0, 0, p.x, p.y, 0, '#c9d4de', 1.2, [4, 4]);
    sgLine3(m, 0, 0, 0, 0, p.y, 0, '#c9d4de', 1.2, [4, 4]);
    sgLine3(m, 0, p.y, 0, p.x, p.y, 0, '#c9d4de', 1.2, [4, 4]);
    // 竖起那段
    sgLine3(m, p.x, p.y, 0, p.x, p.y, p.z, '#f0a04b', 1.8, [5, 4]);
    // 向量 OP
    svArrow3(m, 0, 0, 0, p.x, p.y, p.z, '#c0392b', 2.4);
    var s = sgPt(m, p.x, p.y, p.z);
    ctx.beginPath(); ctx.arc(s[0], s[1], 4.5, 0, Math.PI * 2);
    ctx.fillStyle = '#c0392b'; ctx.fill();
    svLabel(m, p.x, p.y, p.z, 'P', '#c0392b', 12, -10);
    var mod = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    s0.info.innerHTML = '<span class="viz-meta"><b>P(' + cFmt(p.x) + ', ' + cFmt(p.y) +
      ', ' + cFmt(p.z) + ')</b>，向量 OP 的模 |OP| = √(' + cFmt(p.x) + '² + ' +
      cFmt(p.y) + '² + ' + cFmt(p.z) + '²) = <b>' + cFmt(mod) + '</b>。' +
      '橙色虚线那一竖就是「高度 z」，底面那圈折线是「平面位置 (x, y)」——' +
      '所以坐标可以读成 <b>平面位置 + 高度</b>。</span>';
  }
  cSlider(s0.ctrl, 'x', p.x, -2, 2, 0.5, function (v) { p.x = v; draw(); });
  cSlider(s0.ctrl, 'y', p.y, -2, 2, 0.5, function (v) { p.y = v; draw(); });
  cSlider(s0.ctrl, 'z', p.z, -2, 2, 0.5, function (v) { p.z = v; draw(); });
  draw();
}

/* 空间向量数量积 */
function svDotLab(el, cfg) {
  var p = Object.assign({ x1: 1, y1: 2, z1: -2, x2: 2, y2: -1, z2: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -5.5, xmax: 5.5, ymin: -4.5, ymax: 4.5 };
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    cGrid(m, view);
    sgLine3(m, 0, 0, 0, 3.4, 0, 0, '#e2e8ee', 1.3);
    sgLine3(m, 0, 0, 0, 0, 3.4, 0, '#e2e8ee', 1.3);
    sgLine3(m, 0, 0, 0, 0, 0, 3.4, '#e2e8ee', 1.3);
    svArrow3(m, 0, 0, 0, p.x1, p.y1, p.z1, '#185fa5', 2.6);
    svArrow3(m, 0, 0, 0, p.x2, p.y2, p.z2, '#0f6e56', 2.6);
    svLabel(m, p.x1, p.y1, p.z1, 'a', '#185fa5', 12, -10);
    svLabel(m, p.x2, p.y2, p.z2, 'b', '#0f6e56', 12, -10);
    var dot = p.x1 * p.x2 + p.y1 * p.y2 + p.z1 * p.z2;
    var ma = Math.sqrt(p.x1 * p.x1 + p.y1 * p.y1 + p.z1 * p.z1);
    var mb = Math.sqrt(p.x2 * p.x2 + p.y2 * p.y2 + p.z2 * p.z2);
    var cosv = (ma > 0.01 && mb > 0.01) ? dot / (ma * mb) : 0;
    var ang = Math.acos(Math.max(-1, Math.min(1, cosv))) * 180 / Math.PI;
    var perp = Math.abs(dot) < 0.02;
    if (perp) {
      ctx.fillStyle = 'rgba(15,110,86,0.10)';
      ctx.fillRect(0, 0, m.w, m.h);
    }
    s0.info.innerHTML = '<span class="viz-meta">a·b = ' + cFmt(p.x1) + '×' + cFmt(p.x2) +
      ' + ' + cFmt(p.y1) + '×' + cFmt(p.y2) + ' + ' + cFmt(p.z1) + '×' + cFmt(p.z2) +
      ' = <b>' + cFmt(dot) + '</b>；|a| = ' + cFmt(ma) + '，|b| = ' + cFmt(mb) +
      '，夹角 <b>' + cFmt(ang) + '°</b>。' +
      (perp
        ? ' <b style="color:#0f6e56">点积为 0 ⇒ a ⊥ b，两向量成直角。</b>'
        : (dot > 0 ? ' 点积为正 ⇒ 夹角是锐角。' : ' 点积为负 ⇒ 夹角是钝角。')) + '</span>';
  }
  cSlider(s0.ctrl, 'b 的 x', p.x2, -3, 3, 0.5, function (v) { p.x2 = v; draw(); });
  cSlider(s0.ctrl, 'b 的 y', p.y2, -3, 3, 0.5, function (v) { p.y2 = v; draw(); });
  cSlider(s0.ctrl, 'b 的 z', p.z2, -3, 3, 0.5, function (v) { p.z2 = v; draw(); });
  draw();
}

/* 平面的法向量 */
function svNormalLab(el, cfg) {
  var p = Object.assign({ x: 1, y: 1, z: 1 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -2.1, xmax: 2.1, ymin: -1.7, ymax: 1.9 };
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    cGrid(m, view);
    // 平面 ABC（A(1,0,0) B(0,1,0) C(0,0,1)）向四周延展一点：画成三角面 + 半透明
    sgPoly3(m, [[1, 0, 0], [0, 1, 0], [0, 0, 1]], 'rgba(24,95,165,0.16)', '#185fa5', 2);
    svLabel(m, 1, 0, 0, 'A', '#185fa5', 10, 8);
    svLabel(m, 0, 1, 0, 'B', '#185fa5', 10, 8);
    svLabel(m, 0, 0, 1, 'C', '#185fa5', -2, -12);
    // 平面内两个向量
    svArrow3(m, 1, 0, 0, 0, 1, 0, '#7d3c98', 1.8);
    svArrow3(m, 1, 0, 0, 0, 0, 1, '#7d3c98', 1.8);
    svLabel(m, 0.5, 0.5, 0, 'AB', '#7d3c98', 0, 14);
    svLabel(m, 0.5, 0, 0.5, 'AC', '#7d3c98', -16, 0);
    // 法向量 n（从重心出发，按比例缩放以适配视野）
    var g = [1 / 3, 1 / 3, 1 / 3];
    var nlen = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
    var scale = nlen > 0.01 ? 1.15 / nlen : 0;
    svArrow3(m, g[0], g[1], g[2], g[0] + p.x * scale, g[1] + p.y * scale, g[2] + p.z * scale, '#c0392b', 2.6);
    svLabel(m, g[0] + p.x * scale, g[1] + p.y * scale, g[2] + p.z * scale, 'n', '#c0392b', 12, -10);
    var d1 = p.x * (-1) + p.y * (1) + p.z * 0;
    var d2 = p.x * (-1) + p.y * 0 + p.z * (1);
    var ok1 = Math.abs(d1) < 0.02, ok2 = Math.abs(d2) < 0.02;
    s0.info.innerHTML = '<span class="viz-meta">n·AB = ' + cFmt(d1) + '，n·AC = ' + cFmt(d2) +
      '。' + (ok1 && ok2
        ? '<b style="color:#0f6e56">两个点积都归零 ⇒ n = (' + cFmt(p.x) + ', ' + cFmt(p.y) + ', ' +
          cFmt(p.z) + ') 是平面的法向量。</b>'
        : '要让两个点积同时为 0，n 才垂直于整个平面（' + (ok1 ? 'AB 已满足' : 'AB 还不满足') +
          '，' + (ok2 ? 'AC 已满足' : 'AC 还不满足') + '）。') + '</span>';
  }
  cSlider(s0.ctrl, 'n 的 x', p.x, -2, 2, 0.5, function (v) { p.x = v; draw(); });
  cSlider(s0.ctrl, 'n 的 y', p.y, -2, 2, 0.5, function (v) { p.y = v; draw(); });
  cSlider(s0.ctrl, 'n 的 z', p.z, -2, 2, 0.5, function (v) { p.z = v; draw(); });
  draw();
}

/* 正方体里的三种角 */
function svAngleLab(el, cfg) {
  var p = Object.assign({ mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -1.7, xmax: 1.7, ymin: -1.35, ymax: 1.55 };
  var D = [0, 0, 0], A = [1, 0, 0], C = [0, 1, 0], B = [1, 1, 0];
  var D1 = [0, 0, 1], A1 = [1, 0, 1], B1 = [1, 1, 1], C1 = [0, 1, 1];
  function cube(m, ctx, hi) {
    var E = [[D, A], [A, B], [B, C], [C, D], [D1, A1], [A1, B1], [B1, C1], [C1, D1],
      [D, D1], [A, A1], [B, B1], [C, C1]];
    E.forEach(function (e) { sgLine3(m, e[0][0], e[0][1], e[0][2], e[1][0], e[1][1], e[1][2], '#c2cdd8', 1.4); });
    [[D, 'D'], [A, 'A'], [C, 'C'], [B, 'B'], [D1, 'D₁'], [A1, 'A₁'], [B1, 'B₁'], [C1, 'C₁']]
      .forEach(function (o) { svLabel(m, o[0][0], o[0][1], o[0][2], o[1], '#7a8794', 0, 13); });
  }
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    cGrid(m, view);
    var mode = Math.round(p.mode);
    if (mode === 0) {
      cube(m, ctx);
      sgLine3(m, A1[0], A1[1], A1[2], B[0], B[1], B[2], '#c0392b', 2.8);
      sgLine3(m, B1[0], B1[1], B1[2], C[0], C[1], C[2], '#0f6e56', 2.8);
      svLabel(m, 0.5, 0.5, 0.5, 'A₁B 与 B₁C 所成角', '#333', 0, -46);
      s0.info.innerHTML = '<span class="viz-meta">A₁B = (0, 1, −1)，B₁C = (−1, 0, −1)。' +
        '点积 = 0 + 0 + 1 = <b>1</b>，两向量模都是 √2，cosθ = 1/2 ⇒ <b>θ = 60°</b>。' +
        '线线角取绝对值，因为异面直线所成角不超过 90°。</span>';
    } else if (mode === 1) {
      cube(m, ctx);
      sgPoly3(m, [D, A, B, C], 'rgba(24,95,165,0.14)', null);
      sgLine3(m, A1[0], A1[1], A1[2], B[0], B[1], B[2], '#c0392b', 2.8);
      sgLine3(m, A[0], A[1], A[2], B[0], B[1], B[2], '#0f6e56', 2.2, [5, 4]);
      sgLine3(m, A1[0], A1[1], A1[2], A[0], A[1], A[2], '#7d3c98', 1.8, [4, 4]);
      svLabel(m, 0.5, 0.6, 0.55, 'A₁B 与底面 ABCD', '#333', 0, -46);
      s0.info.innerHTML = '<span class="viz-meta">底面法向量 n = (0, 0, 1)，A₁B = (0, 1, −1)。' +
        'sinθ = |A₁B·n| / (|A₁B||n|) = 1/√2 ⇒ <b>θ = 45°</b>。' +
        '绿色虚线 AB 是 A₁B 在底面的射影，紫色虚线 AA₁ 是高度——等腰直角三角形成立。</span>';
    } else {
      cube(m, ctx);
      sgPoly3(m, [A1, B, D], 'rgba(192,57,43,0.18)', '#c0392b', 2);
      sgPoly3(m, [D, A, B, C], 'rgba(24,95,165,0.10)', null);
      svLabel(m, 0.55, 0.35, 0.6, '平面 A₁BD 与底面', '#333', 0, -46);
      s0.info.innerHTML = '<span class="viz-meta">底面法向量 n₁ = (0, 0, 1)；平面 A₁BD 的法向量 ' +
        'n₂ = (1, −1, 1)。cos⟨n₁, n₂⟩ = 1/√3 = √3/3，这个二面角是锐角，' +
        '所以 <b>θ = arccos(√3/3) ≈ 54.7°</b>。法向量夹角与二面角相等或互补，要结合图形定锐钝。</span>';
    }
  }
  var lab = ['线线角（异面）', '线面角', '二面角'];
  cSlider(s0.ctrl, '切换角类型', p.mode, 0, 2, 1, function (v) { p.mode = v; draw(); });
  draw();
}

/* 点到平面的距离 */
function svDistLab(el, cfg) {
  var p = Object.assign({ k: 1 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var view = { xmin: -2.6, xmax: 2.6, ymin: -2.0, ymax: 2.2 };
  function draw() {
    var m = circleMap(s0.cv, view), ctx = m.ctx;
    cGrid(m, view);
    var a = p.k;
    var D = [0, 0, 0], A1 = [a, 0, a], C1 = [0, a, a], B = [a, a, 0], A = [a, 0, 0], C = [0, a, 0];
    // 正方体线框
    [[D, [a, 0, 0]], [[a, 0, 0], [a, a, 0]], [[a, a, 0], [0, a, 0]], [[0, a, 0], D],
      [[0, 0, a], [a, 0, a]], [[a, 0, a], [a, a, a]], [[a, a, a], [0, a, a]], [[0, a, a], [0, 0, a]],
      [D, [0, 0, a]], [[a, 0, 0], [a, 0, a]], [[a, a, 0], [a, a, a]], [[0, a, 0], [0, a, a]]]
      .forEach(function (e) {
        sgLine3(m, e[0][0], e[0][1], e[0][2], e[1][0], e[1][1], e[1][2], '#d5dde5', 1.2);
      });
    // 平面 A₁C₁B
    sgPoly3(m, [A1, C1, B], 'rgba(24,95,165,0.20)', '#185fa5', 2);
    // 距离向量：D 到平面的垂足（法向量 (1,1,1)，平面 x+y+z = 2a）
    // 垂足 = D + t(1,1,1)，满足 3t = 2a ⇒ t = 2a/3
    var t = 2 * a / 3;
    var foot = [t, t, t];
    svArrow3(m, D[0], D[1], D[2], foot[0], foot[1], foot[2], '#c0392b', 2.4);
    sgLine3(m, D[0], D[1], D[2], foot[0], foot[1], foot[2], '#c0392b', 2.4);
    var sD = sgPt(m, 0, 0, 0), sF = sgPt(m, foot[0], foot[1], foot[2]);
    ctx.beginPath(); ctx.arc(sD[0], sD[1], 4, 0, Math.PI * 2); ctx.fillStyle = '#c0392b'; ctx.fill();
    ctx.beginPath(); ctx.arc(sF[0], sF[1], 4, 0, Math.PI * 2); ctx.fillStyle = '#185fa5'; ctx.fill();
    svLabel(m, 0, 0, 0, 'D', '#c0392b', -10, 12);
    svLabel(m, foot[0], foot[1], foot[2], '垂足', '#185fa5', 12, 12);
    svLabel(m, a, 0, a, 'A₁', '#185fa5', 8, -10);
    svLabel(m, 0, a, a, 'C₁', '#185fa5', -10, -10);
    svLabel(m, a, a, 0, 'B', '#185fa5', 10, 6);
    var d = 2 * a / Math.sqrt(3);
    s0.info.innerHTML = '<span class="viz-meta">棱长 a = <b>' + cFmt(a) + '</b>。平面 A₁C₁B 的法向量 n = (1,1,1)，' +
      '平面过 A₁ 得方程 x + y + z = ' + cFmt(2 * a) + '。D(0,0,0) 到它的距离 ' +
      'd = |DA₁·n| / |n| = ' + cFmt(2 * a) + '/√3 = <b>' + cFmt(d) + '</b>。' +
      '注意：不需要知道垂足在哪，这正是向量法比几何法省事的地方。</span>';
  }
  cSlider(s0.ctrl, '棱长 a', p.k, 0.6, 1.6, 0.1, function (v) { p.k = v; draw(); });
  draw();
}
