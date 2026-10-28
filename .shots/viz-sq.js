/* 独立缩放映射：横纵轴单位不同时用它（circleMap 是等比的，会把扁图压成一条线） */
function linMap(cv, view, pad) {
  var s = setupCanvas(cv);
  if (pad == null) pad = 30;
  var sx = (s.w - pad * 2) / (view.xmax - view.xmin);
  var sy = (s.h - pad * 2) / (view.ymax - view.ymin);
  return {
    ctx: s.ctx, w: s.w, h: s.h, sc: sy, sx: sx, sy: sy,
    px: function (u) { return pad + (u - view.xmin) * sx; },
    py: function (v) { return s.h - pad - (v - view.ymin) * sy; },
    ux: function (q) { return view.xmin + (q - pad) / sx; },
    vy: function (q) { return view.ymin + (s.h - pad - q) / sy; }
  };
}

/* 数列的坐标轴（横轴 n 只画正整数刻度） */
function sqAxes(m, view, nMax) {
  var ctx = m.ctx;
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
  ctx.strokeStyle = '#eef2f6'; ctx.lineWidth = 1;
  var i;
  for (i = 1; i <= nMax; i++) {
    ctx.beginPath(); ctx.moveTo(m.px(i), 0); ctx.lineTo(m.px(i), m.h); ctx.stroke();
  }
  ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
  ctx.beginPath(); ctx.moveTo(m.px(view.xmin), m.py(0)); ctx.lineTo(m.px(view.xmax), m.py(0)); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(m.px(0), 0); ctx.lineTo(m.px(0), m.h); ctx.stroke();
  ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'top';
  for (i = 1; i <= nMax; i++) ctx.fillText(String(i), m.px(i), m.py(0) + 5);
  ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
  ctx.fillText('n', m.px(view.xmax) - 2, m.py(0) + 16);
}

/* 数列概念：通项就是定义在正整数上的函数 */
function sqConceptLab(el, cfg) {
  var p = Object.assign({ mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var names = ['aₙ = 2n − 1', 'aₙ = 1/n', 'aₙ = (n−5)(n−8)'];
  function fn(mode, n) {
    if (mode === 0) return 2 * n - 1;
    if (mode === 1) return 1 / n;
    return (n - 5) * (n - 8);
  }
  function draw() {
    var mode = Math.round(p.mode), N = 10;
    var vs = [], i;
    for (i = 1; i <= N; i++) vs.push(fn(mode, i));
    var lo = Math.min.apply(null, vs), hi = Math.max.apply(null, vs);
    if (lo > 0) lo = 0;
    var span = hi - lo || 1;
    var view = { xmin: 0.3, xmax: N + 0.7, ymin: lo - span * 0.15, ymax: hi + span * 0.18 };
    var m = linMap(s0.cv, view);
    sqAxes(m, view, N);
    var ctx = m.ctx;
    // 折线（虚线，提示趋势但不是数列本身）
    ctx.strokeStyle = 'rgba(24,95,165,0.30)'; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]);
    ctx.beginPath();
    for (i = 1; i <= N; i++) {
      if (i === 1) ctx.moveTo(m.px(i), m.py(vs[i - 1])); else ctx.lineTo(m.px(i), m.py(vs[i - 1]));
    }
    ctx.stroke(); ctx.setLineDash([]);
    for (i = 1; i <= N; i++) {
      ctx.beginPath(); ctx.arc(m.px(i), m.py(vs[i - 1]), 4.6, 0, Math.PI * 2);
      ctx.fillStyle = '#185fa5'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4; ctx.stroke();
    }
    // 前 3 项标数值
    for (i = 1; i <= Math.min(3, N); i++) {
      ctx.fillStyle = '#c0392b'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(cFmt(vs[i - 1]), m.px(i), m.py(vs[i - 1]) - 8);
    }
    var trend;
    if (mode === 0) trend = '公差为 2 的等差数列，点全在一条直线上——通项是<b>一次函数</b>。';
    else if (mode === 1) trend = '递减但始终为正，点越走越贴近 x 轴却永不到达（有界）。';
    else trend = '先减后增：n = 6 与 n = 7 都取最小值 −2，之后开始上升——<b>二次型通项</b>的典型形状。';
    s0.info.innerHTML = '<span class="viz-meta">' + names[mode] + '，图上每个点是一「项」，' +
      '横轴只取 n = 1, 2, 3, …（<b>离散的点，不是连续曲线</b>）。' + trend +
      ' 虚线只是帮忙看趋势，数列本身只有那些点。</span>';
  }
  cSlider(s0.ctrl, '切换通项（0/1/2）', p.mode, 0, 2, 1, function (v) { p.mode = v; draw(); });
  draw();
}

/* 等差数列 */
function sqArithLab(el, cfg) {
  var p = Object.assign({ a1: 2, d: 3, n: 10 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var N = Math.round(p.n), i;
    var vs = [];
    for (i = 1; i <= N; i++) vs.push(p.a1 + (i - 1) * p.d);
    var lo = Math.min(0, Math.min.apply(null, vs)), hi = Math.max.apply(null, vs.concat([1]));
    var span = hi - lo || 1;
    var view = { xmin: 0.3, xmax: 12.7, ymin: lo - span * 0.12, ymax: hi + span * 0.16 };
    var m = linMap(s0.cv, view);
    sqAxes(m, view, 12);
    var ctx = m.ctx;
    // 通项直线（延伸到 n = 12）
    ctx.strokeStyle = 'rgba(192,57,43,0.75)'; ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(m.px(0.5), m.py(p.a1 + (0.5 - 1) * p.d));
    ctx.lineTo(m.px(12.4), m.py(p.a1 + (12.4 - 1) * p.d));
    ctx.stroke();
    // 台阶：相邻项之间的差值（公差可视化）
    for (i = 1; i < N; i++) {
      ctx.strokeStyle = 'rgba(15,110,86,0.45)'; ctx.lineWidth = 1.2; ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(m.px(i), m.py(vs[i - 1])); ctx.lineTo(m.px(i), m.py(vs[i]));
      ctx.lineTo(m.px(i + 1), m.py(vs[i]));
      ctx.stroke(); ctx.setLineDash([]);
    }
    for (i = 1; i <= N; i++) {
      ctx.beginPath(); ctx.arc(m.px(i), m.py(vs[i - 1]), 4.6, 0, Math.PI * 2);
      ctx.fillStyle = '#185fa5'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4; ctx.stroke();
    }
    // 最后一个点标值
    ctx.fillStyle = '#c0392b'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    ctx.fillText('a' + N + ' = ' + cFmt(vs[N - 1]), m.px(N) - 8, m.py(vs[N - 1]) - 4);
    var S = N * (p.a1 + vs[N - 1]) / 2;
    s0.info.innerHTML = '<span class="viz-meta">a₁ = ' + cFmt(p.a1) + '、d = ' + cFmt(p.d) +
      '，通项 aₙ = ' + cFmt(p.a1) + ' + (n−1)×' + cFmt(p.d) + '，故 a' + N + ' = <b>' + cFmt(vs[N - 1]) +
      '</b>。绿色小台阶就是每一级的<b>公差 d</b>——所有台阶一样高，所以点在一条直线上。' +
      ' S' + N + ' = ' + N + '×(' + cFmt(p.a1) + ' + ' + cFmt(vs[N - 1]) + ')/2 = <b>' + cFmt(S) + '</b>。</span>';
  }
  cSlider(s0.ctrl, '首项 a₁', p.a1, -3, 5, 1, function (v) { p.a1 = v; draw(); });
  cSlider(s0.ctrl, '公差 d', p.d, -3, 3, 0.5, function (v) { p.d = v; draw(); });
  cSlider(s0.ctrl, '项数 n', p.n, 3, 12, 1, function (v) { p.n = v; draw(); });
  draw();
}

/* 等比数列 */
function sqGeoLab(el, cfg) {
  var p = Object.assign({ a1: 1, q: 2, n: 8 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var N = Math.round(p.n), i;
    var vs = [];
    for (i = 1; i <= N; i++) vs.push(p.a1 * Math.pow(p.q, i - 1));
    var hi = Math.max.apply(null, vs) || 1;
    var view = { xmin: 0.3, xmax: 9.7, ymin: -hi * 0.1, ymax: hi * 1.15 };
    var m = linMap(s0.cv, view);
    sqAxes(m, view, 9);
    var ctx = m.ctx;
    // 光滑指数曲线
    ctx.strokeStyle = 'rgba(192,57,43,0.65)'; ctx.lineWidth = 1.8;
    ctx.beginPath();
    var first = true;
    for (i = 0; i <= 120; i++) {
      var nn = 0.5 + 8.8 * i / 120;
      var vv = p.a1 * Math.pow(p.q, nn - 1);
      if (vv > hi * 1.2) { first = true; continue; }
      if (first) { ctx.moveTo(m.px(nn), m.py(vv)); first = false; } else ctx.lineTo(m.px(nn), m.py(vv));
    }
    ctx.stroke();
    for (i = 1; i <= N; i++) {
      ctx.beginPath(); ctx.arc(m.px(i), m.py(vs[i - 1]), 4.6, 0, Math.PI * 2);
      ctx.fillStyle = '#7d3c98'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4; ctx.stroke();
    }
    ctx.fillStyle = '#7d3c98'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    for (i = 1; i <= Math.min(4, N); i++) ctx.fillText(cFmt(vs[i - 1]), m.px(i), m.py(vs[i - 1]) - 8);
    var S = Math.abs(p.q - 1) < 0.001 ? p.a1 * N : p.a1 * (1 - Math.pow(p.q, N)) / (1 - p.q);
    s0.info.innerHTML = '<span class="viz-meta">a₁ = ' + cFmt(p.a1) + '、q = <b>' + cFmt(p.q) +
      '</b>，a' + N + ' = ' + cFmt(p.a1) + '×' + cFmt(p.q) + '^' + (N - 1) + ' = <b>' + cFmt(vs[N - 1]) +
      '</b>。前 ' + N + ' 项和 S' + N + ' = <b>' + cFmt(S) + '</b>。' +
      (p.q > 1.2 ? ' q > 1 时点越来越陡——<b>指数爆炸</b>，几十项之后就是天文数字。'
        : (p.q < 0.8 ? ' 0 < q < 1 时点迅速贴近 x 轴，无穷项之和收敛到 a₁/(1−q) = ' + cFmt(p.a1 / (1 - p.q)) + '。'
          : ' q ≈ 1 时几乎是一条水平线，此时求和要特别小心 q = 1 的情形。')) + '</span>';
  }
  cSlider(s0.ctrl, '首项 a₁', p.a1, 1, 3, 0.5, function (v) { p.a1 = v; draw(); });
  cSlider(s0.ctrl, '公比 q', p.q, 0.3, 2, 0.1, function (v) { p.q = v; draw(); });
  cSlider(s0.ctrl, '项数 n', p.n, 3, 8, 1, function (v) { p.n = v; draw(); });
  draw();
}

/* 求和方法：裂项相消 / 错位相减 */
function sqSumLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 8 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var mode = Math.round(p.mode), N = Math.round(p.n);
    var view = { xmin: 0, xmax: 1, ymin: 0, ymax: 1 };
    var m = linMap(s0.cv, view, 18);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var W = m.w - 60, x0 = 46, i;
    if (mode === 0) {
      // 裂项相消
      var cw = Math.min(W / N, 74), gap = 4;
      var yA = m.h * 0.42, yB = m.h * 0.62;
      ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (i = 1; i <= N; i++) {
        var x = x0 + (i - 1) * (cw + gap);
        // 上行 1/k
        ctx.fillStyle = 'rgba(24,95,165,0.14)';
        ctx.fillRect(x, yA - 17, cw, 34);
        ctx.strokeStyle = 'rgba(24,95,165,0.55)'; ctx.lineWidth = 1;
        ctx.strokeRect(x, yA - 17, cw, 34);
        ctx.fillStyle = '#185fa5';
        ctx.fillText('1/' + i, x + cw / 2, yA);
        // 下行 −1/(k+1)
        ctx.fillStyle = 'rgba(192,57,43,0.12)';
        ctx.fillRect(x, yB - 17, cw, 34);
        ctx.strokeStyle = 'rgba(192,57,43,0.5)';
        ctx.strokeRect(x, yB - 17, cw, 34);
        ctx.fillStyle = '#c0392b';
        ctx.fillText('−1/' + (i + 1), x + cw / 2, yB);
      }
      // 抵消：第 i 格的 −1/(k+1) 与第 i+1 格的 1/(k+1) 配对
      for (i = 1; i < N; i++) {
        var xA = x0 + (i - 1) * (cw + gap) + cw / 2;
        var xB = x0 + i * (cw + gap) + cw / 2;
        ctx.strokeStyle = 'rgba(120,120,120,0.65)'; ctx.lineWidth = 1.4; ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(xA, yB + 18); ctx.lineTo(xB, yA - 18); ctx.stroke();
        ctx.setLineDash([]);
        var mx = (xA + xB) / 2, my = (yA + yB) / 2;
        ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(mx - 4, my - 4); ctx.lineTo(mx + 4, my + 4);
        ctx.moveTo(mx + 4, my - 4); ctx.lineTo(mx - 4, my + 4);
        ctx.stroke();
      }
      ctx.fillStyle = '#333'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText('↑ 首项 1/1 保留', x0 + 2, yA - 32);
      ctx.fillText('↑ 末项 −1/' + (N + 1) + ' 保留', x0 + 2, yB + 34);
      s0.info.innerHTML = '<span class="viz-meta">裂项：1/[k(k+1)] = 1/k − 1/(k+1)。' +
        '把 ' + N + ' 项都这样拆开，<b>中间的 ' + (N - 1) + ' 对全部抵消</b>（灰线连的就是互相抵消的一对），' +
        '只剩首项 1 和末项 −1/' + (N + 1) + '。所以 S' + N + ' = 1 − 1/' + (N + 1) +
        ' = <b>' + N + '/' + (N + 1) + '</b>。看到分母是「相邻整数乘积」，就该想到裂项。</span>';
    } else {
      // 错位相减：aₙ = n·2ⁿ
      var cw2 = Math.min((W - 30) / (N + 1), 62), gap2 = 4;
      var y1 = m.h * 0.34, y2 = m.h * 0.58;
      ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (i = 1; i <= N; i++) {
        var xa = x0 + (i - 1) * (cw2 + gap2);
        ctx.fillStyle = 'rgba(24,95,165,0.14)';
        ctx.fillRect(xa, y1 - 16, cw2, 32);
        ctx.fillStyle = '#185fa5';
        ctx.fillText(i + '·2' + (i === 1 ? '' : '^' + i), xa + cw2 / 2, y1);
        var xb = x0 + (i) * (cw2 + gap2) + cw2 * 0.32;
        if (xb + cw2 < m.w - 12) {
          ctx.fillStyle = 'rgba(192,57,43,0.12)';
          ctx.fillRect(xb, y2 - 16, cw2, 32);
          ctx.fillStyle = '#c0392b';
          ctx.fillText(i + '·2' + (i + 1 === 1 ? '' : '^' + (i + 1)), xb + cw2 / 2, y2);
        }
      }
      ctx.fillStyle = '#333'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText('Sₙ', x0 - 8, y1);
      ctx.fillText('2Sₙ', x0 - 8, y2);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#6b7a89';
      ctx.fillText('红色整体右移一格（乘 2 的效果）', x0, m.h * 0.80);
      s0.info.innerHTML = '<span class="viz-meta">错位相减：aₙ = n·2ⁿ 是「<b>等差 × 等比</b>」。' +
        'Sₙ 与 2Sₙ 写出来后整体错开一格相减，中间会形成一串等比数列 ' +
        '2 + 4 + 8 + …，用等比公式求和，最后整理出 Sₙ = <b>(n−1)·2ⁿ⁺¹ + 2</b>。' +
        ' 验证 n = ' + N + '：公式给 ' + ((N - 1) * Math.pow(2, N + 1) + 2) + '。' +
        ' 相减时最后一项的符号最容易错，建议整体加括号再展开。</span>';
    }
  }
  cSlider(s0.ctrl, '方法（0 裂项 / 1 错位）', p.mode, 0, 1, 1, function (v) { p.mode = v; draw(); });
  cSlider(s0.ctrl, '项数 n', p.n, 3, 8, 1, function (v) { p.n = v; draw(); });
  draw();
}

/* Sn 与 an 的关系：Sn 去掉最后一段就是 S(n-1) */
function sqRecurLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 8 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  function draw() {
    var N = Math.round(p.n), i;
    var S = 0;
    for (i = 1; i <= N; i++) S += i;
    var Sm = S - N;
    var view = { xmin: 0, xmax: 1, ymin: 0, ymax: 1 };
    var m = linMap(s0.cv, view, 18);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var totalW = m.w - 130, x0 = 40, barH = 34, yBar = m.h * 0.42;
    // 阶梯长条：第 k 段长度 = k
    var unit = totalW / S;
    var x = x0;
    for (i = 1; i <= N; i++) {
      var segW = i * unit;
      ctx.fillStyle = (i === N) ? 'rgba(192,57,43,0.85)' : 'rgba(24,95,165,0.65)';
      ctx.fillRect(x, yBar, segW, barH);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5;
      ctx.strokeRect(x, yBar, segW, barH);
      if (segW > 22) {
        ctx.fillStyle = '#fff'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(i), x + segW / 2, yBar + barH / 2);
      }
      x += segW;
    }
    // Sm 括号
    var xS = x0 + Sm * unit, xE = x0 + S * unit;
    ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(x0, yBar - 14); ctx.lineTo(x0, yBar - 22); ctx.lineTo(xS, yBar - 22); ctx.lineTo(xS, yBar - 14);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xS, yBar - 14); ctx.lineTo(xS, yBar - 22); ctx.lineTo(xE, yBar - 22); ctx.lineTo(xE, yBar - 14);
    ctx.stroke();
    ctx.fillStyle = '#0f6e56'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('S' + (N - 1) + ' = ' + Sm, (x0 + xS) / 2, yBar - 26);
    ctx.fillStyle = '#c0392b';
    ctx.fillText('a' + N + ' = ' + N, (xS + xE) / 2, yBar - 26);
    // 说明
    ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillStyle = '#333';
    ctx.fillText('S' + N + ' = S' + (N - 1) + ' + a' + N + ' = ' + Sm + ' + ' + N + ' = ' + S, x0, yBar + barH + 24);
    ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('反过来：a' + N + ' = S' + N + ' − S' + (N - 1) + ' —— 长条去掉最后一段，剩下的就是第 ' + N + ' 项。', x0, yBar + barH + 50);
    s0.info.innerHTML = '<span class="viz-meta">蓝色长条是把 a₁ 到 a' + (N - 1) +
      ' 一段段接起来（第 k 段长 k），总长就是 S' + (N - 1) + ' = ' + Sm +
      '；再接上红色那段 a' + N + ' = ' + N + '，总长变成 S' + N + ' = <b>' + S + '</b>。' +
      ' 所以 <b>aₙ = Sₙ − Sₙ₋₁（n ≥ 2）</b>，这是所有「已知 Sₙ 求 aₙ」题的唯一入口。' +
      ' 用这个式子求完后，<b>n = 1 必须单独算</b>，再看能否统一。</span>';
  }
  cSlider(s0.ctrl, '项数 n', p.n, 3, 10, 1, function (v) { p.n = v; draw(); });
  draw();
}
