  /* ================= 统计（必修二第 9 章） ================= */
  function shRnd(i) { var x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); }

  /* 分层抽样配额 */
  function shSampleLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { n: v.n || 100, a: v.a || 400, b: v.b || 300, c: v.c || 300 };
    function draw() {
      var ctx = s0.cv.getContext('2d');
      var s = setupCanvas(s0.cv);
      var m = { ctx: s.ctx, w: s.w, h: s.h };
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
      var total = p.a + p.b + p.c;
      var groups = [
        { name: '高一', n: p.a, col: '#185fa5' },
        { name: '高二', n: p.b, col: '#0f6e56' },
        { name: '高三', n: p.c, col: '#8a5a00' }
      ];
      var bx = 60, bw = m.w - 130;
      var y1 = 90, y2 = 220, bh = 56;
      ctx.fillStyle = '#6b7a89';
      ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillText('总体 N = ' + total + ' 人', bx, y1 - 10);
      ctx.fillText('样本 n = ' + p.n + ' 人（抽样比 ' + cFmt(p.n / total) + '）', bx, y2 - 10);
      var x = bx;
      groups.forEach(function (g) {
        var w = bw * g.n / total;
        ctx.fillStyle = g.col;
        ctx.globalAlpha = 0.22; ctx.fillRect(x, y1, w, bh); ctx.globalAlpha = 1;
        ctx.strokeStyle = g.col; ctx.lineWidth = 1.6; ctx.strokeRect(x, y1, w, bh);
        ctx.fillStyle = g.col;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(g.name + ' ' + g.n, x + w / 2, y1 + bh / 2);
        x += w;
      });
      x = bx;
      groups.forEach(function (g) {
        var q = Math.round(p.n * g.n / total);
        var w = bw * g.n / total;
        ctx.fillStyle = g.col;
        ctx.fillRect(x, y2, Math.max(2, w), bh);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        if (w > 34) ctx.fillText(q + ' 人', x + w / 2, y2 + bh / 2);
        ctx.fillStyle = g.col;
        ctx.textBaseline = 'top';
        if (w <= 34) ctx.fillText(q, x + w / 2, y2 + bh + 6);
        x += w;
      });
      ctx.fillStyle = '#8395a7';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText('各层名额 = 样本量 × 该层占比：每层抽到的比例完全相同', m.w / 2, y2 + bh + 30);
      /* 每层抽取比例标注 */
      ctx.textAlign = 'left';
      ctx.fillStyle = '#5b6b7a';
      var tx = bx, ty = y2 + bh + 66;
      groups.forEach(function (g) {
        var q = Math.round(p.n * g.n / total);
        ctx.fillStyle = g.col;
        ctx.fillText(g.name + '：' + g.n + ' × ' + cFmt(p.n / total) + ' = ' + q + ' 人', tx, ty);
        tx += (m.w - 100) / 3;
      });
      s0.info.innerHTML = '<span class="viz-meta">分层抽样的全部要点就一句：<b>每层的抽取比例都等于 n/N</b>。所以三层的名额 40 / 30 / 30 与人数 400 / 300 / 300 结构完全一致。</span>'
        + '<span class="viz-meta">为什么要分层？因为层内差异小、层间差异大时，分层比简单随机更精确。反之若层间没有差异，分层就没必要了。</span>';
    }
    cSlider(s0.ctrl, '样本量 n', p.n, 10, 300, 10, function (x) { p.n = x; draw(); });
    cSlider(s0.ctrl, '高一人数', p.a, 100, 700, 50, function (x) { p.a = x; draw(); });
    cSlider(s0.ctrl, '高二人数', p.b, 100, 700, 50, function (x) { p.b = x; draw(); });
    cSlider(s0.ctrl, '高三人数', p.c, 100, 700, 50, function (x) { p.c = x; draw(); });
    draw();
  }

  /* 频率分布直方图：纵轴 = 频率/组距 */
  function shHistLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { n: v.n || 1, d: v.d || 10 };
    var DATA = [];
    (function () {
      for (var i = 0; i < 120; i++) {
        var u = shRnd(i + 1), u2 = shRnd(i + 71);
        var z = (u + u2 + shRnd(i + 131) + shRnd(i + 197)) / 4;
        DATA.push(30 + z * 70);
      }
    })();
    function draw() {
      var d = p.d, lo = 30, hi = 100;
      var nb = Math.max(1, Math.round((hi - lo) / d));
      var cnt = [], i;
      for (i = 0; i < nb; i++) cnt.push(0);
      DATA.forEach(function (x) {
        var k = Math.floor((x - lo) / d);
        if (k < 0) k = 0; if (k >= nb) k = nb - 1;
        cnt[k]++;
      });
      var total = DATA.length;
      var maxH = 0;
      cnt.forEach(function (c) { maxH = Math.max(maxH, c / total / d); });
      var view = { xmin: lo - 6, xmax: hi + 6, ymin: -maxH * 0.28, ymax: maxH * 1.32 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      for (i = 0; i < nb; i++) {
        var f = cnt[i] / total;
        var hh = f / d;
        var x0 = lo + i * d, x1 = x0 + d;
        ctx.fillStyle = 'rgba(24,95,165,0.16)';
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.rect(m.px(x0), m.py(hh), Math.max(1, m.px(x1) - m.px(x0) - 1), m.py(0) - m.py(hh));
        ctx.fill(); ctx.stroke();
        if (d >= 8) cTag(m, (x0 + x1) / 2, -maxH * 0.11, String(x0), '#8395a7', 0, 0);
      }
      var areaSum = 0;
      cnt.forEach(function (c) { areaSum += c / total; });
      cTag(m, (lo + hi) / 2, maxH * 1.18, '组距 = ' + d + '，纵轴 = 频率/组距', '#1d2b38', 0, 0);
      cTag(m, (lo + hi) / 2, maxH * 1.05, '各矩形面积之和 = ' + cFmt(areaSum) + '（必为 1）', '#0f6e56', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">纵轴为什么是「频率 / 组距」？因为只有这样才能让 <b>面积 = 频率</b>：面积 = 高 × 宽 = (频率/组距) × 组距。所有面积加起来正好 1，可以当校验用。</span>'
        + '<span class="viz-meta">拖动组距：变小（组距 5）→ 组数多、图更细但出现锯齿；变大（组距 20）→ 组数少、形状平滑但看不到细节。选组距就是「分辨率」的取舍。</span>';
    }
    cSlider(s0.ctrl, '组距', p.d, 5, 20, 5, function (x) { p.d = x; draw(); });
    draw();
  }

  /* 平均数 vs 中位数：极端值的影响 */
  function shCentralLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { v: v.v != null ? v.v : 13 };
    var BASE = [3, 5, 7, 9, 11, 13];
    function draw() {
      var arr = BASE.concat([p.v]).slice().sort(function (a, b) { return a - b; });
      var n = arr.length;
      var sum = arr.reduce(function (a, b) { return a + b; }, 0);
      var mean = sum / n;
      var med = n % 2 ? arr[(n - 1) / 2] : (arr[n / 2 - 1] + arr[n / 2]) / 2;
      var xmax = Math.max(p.v, 14) + 2;
      var view = { xmin: 0, xmax: xmax, ymin: -2.4, ymax: 3.2 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      /* 数轴刻度 */
      for (var t = 0; t <= xmax; t += 2) cTag(m, t, -0.55, String(t), '#9aa7b4', 0, 0);
      arr.forEach(function (x, i) {
        var lvl = (i % 3) * 0.5;
        cDot(m, x, lvl, '#185fa5', 6);
      });
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(m.px(mean), m.py(0.9)); ctx.lineTo(m.px(mean), m.py(2.5)); ctx.stroke();
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(m.px(med), m.py(0.9)); ctx.lineTo(m.px(med), m.py(2.5)); ctx.stroke();
      ctx.setLineDash([]);
      cTag(m, mean, 2.75, '平均数 ' + cFmt(mean), '#0f6e56', 0, 0);
      cTag(m, med, 2.15, '中位数 ' + cFmt(med), '#c0392b', 0, 0);
      cTag(m, xmax / 2, 1.55, '数据：3, 5, 7, 9, 11, 13, 加上一个可拖的极端值', '#5b6b7a', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">把极端值拖到 80：<b>平均数</b>被一路拉高，<b>中位数</b>基本不动（只在极端值越过中间位置时才挪一格）。平均数用了每个数据的信息，所以灵敏也脆弱；中位数只看位置，所以稳定也粗糙。</span>'
        + '<span class="viz-meta">这就是「平均工资」和「工资中位数」要同时公布的原因：少数极高值会把平均数抬得远离大多数人的真实水平。</span>';
    }
    cSlider(s0.ctrl, '极端值', p.v, 13, 80, 1, function (x) { p.v = x; draw(); });
    draw();
  }

  /* 方差：分散程度 */
  function shSpreadLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { s: v.s != null ? v.s : 1 };
    var RAW = [-1.0, -0.6, -0.3, -0.1, 0.15, 0.4, 0.75, 1.05];
    function draw() {
      var arr = RAW.map(function (x) { return 10 + x * p.s * 3; });
      var mean = arr.reduce(function (a, b) { return a + b; }, 0) / arr.length;
      var va = arr.reduce(function (a, b) { return a + (b - mean) * (b - mean); }, 0) / arr.length;
      var sd = Math.sqrt(va);
      var view = { xmin: 0, xmax: 20, ymin: -2.2, ymax: 3.0 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      for (var t = 0; t <= 20; t += 2) cTag(m, t, -0.5, String(t), '#9aa7b4', 0, 0);
      /* 均值线 */
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(m.px(mean), m.py(-0.1)); ctx.lineTo(m.px(mean), m.py(1.9)); ctx.stroke();
      cTag(m, mean, 2.2, '平均数 ' + cFmt(mean) + '（不变）', '#0f6e56', 0, 0);
      /* 标准差带 */
      ctx.fillStyle = 'rgba(192,57,43,0.10)';
      ctx.fillRect(m.px(mean - sd), m.py(0.15), (m.px(mean + sd) - m.px(mean - sd)), m.py(0.9) - m.py(0.15));
      ctx.strokeStyle = 'rgba(192,57,43,0.55)'; ctx.setLineDash([4, 4]); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(m.px(mean - sd), m.py(0.15)); ctx.lineTo(m.px(mean - sd), m.py(1.1)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(m.px(mean + sd), m.py(0.15)); ctx.lineTo(m.px(mean + sd), m.py(1.1)); ctx.stroke();
      ctx.setLineDash([]);
      cTag(m, mean + sd, 1.25, '±s', '#c0392b', 0, 0);
      arr.forEach(function (x, i) {
        cDot(m, x, 0.5 + (i % 2) * 0.32, '#185fa5', 5.5);
        ctx.strokeStyle = 'rgba(24,95,165,0.25)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(m.px(x), m.py(0.5 + (i % 2) * 0.32)); ctx.lineTo(m.px(mean), m.py(1.9)); ctx.stroke();
      });
      cTag(m, 10, 2.75, '方差 s² = ' + cFmt(va) + '　标准差 s = ' + cFmt(sd), '#1d2b38', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">拖动分散程度：平均数那条绿线<b>纹丝不动</b>，而方差 s² = ' + cFmt(va) + ' 猛涨。这说明方差只测「散得多开」，与整体高低无关。</span>'
        + '<span class="viz-meta">计算顺序永远是：先求平均数 → 每个数减去它并平方（避免正负抵消）→ 求平均 → 开方得标准差。标准差与原数据同单位，所以比方差更好解释。</span>';
    }
    cSlider(s0.ctrl, '分散程度', p.s, 0.1, 2.4, 0.1, function (x) { p.s = x; draw(); });
    draw();
  }

  /* 相关关系与回归直线 */
  function shCorrLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { r: v.r != null ? v.r : 0.8 };
    var XS = [];
    (function () { for (var i = 0; i < 14; i++) XS.push(2 + i * 0.7); })();
    function draw() {
      var n = XS.length;
      var ys = [], i;
      var xm = 0, ym = 0;
      for (i = 0; i < n; i++) {
        var e = (shRnd(i + 3) - 0.5) * 2;
        var yy = 6 + (XS[i] - 6.5) * 0.9 * p.r * 3 + e * (3.4 - Math.abs(p.r) * 2.2);
        ys.push(yy); xm += XS[i]; ym += yy;
      }
      xm /= n; ym /= n;
      var sxy = 0, sxx = 0;
      for (i = 0; i < n; i++) { sxy += (XS[i] - xm) * (ys[i] - ym); sxx += (XS[i] - xm) * (XS[i] - xm); }
      var b = sxx > 1e-9 ? sxy / sxx : 0;
      var a = ym - b * xm;
      var view = { xmin: 0, xmax: 14, ymin: 0, ymax: 16 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(m.px(view.xmin), m.py(a + b * view.xmin));
      ctx.lineTo(m.px(view.xmax), m.py(a + b * view.xmax));
      ctx.stroke();
      for (i = 0; i < n; i++) {
        ctx.strokeStyle = 'rgba(131,149,167,0.35)'; ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath(); ctx.moveTo(m.px(XS[i]), m.py(ys[i])); ctx.lineTo(m.px(XS[i]), m.py(a + b * XS[i])); ctx.stroke();
        ctx.setLineDash([]);
        cDot(m, XS[i], ys[i], '#185fa5', 5);
      }
      cDot(m, xm, ym, '#0f6e56', 6);
      cTag(m, xm + 0.9, ym - 0.75, '样本中心 (x̄, ȳ)', '#0f6e56', 0, 0);
      cTag(m, 11.4, 2.2, 'ŷ = ' + cFmt(b) + 'x + ' + cFmt(a), '#c0392b', 0, 0);
      cTag(m, 11.4, 1.2, '相关系数 r = ' + cFmt(p.r), Math.abs(p.r) < 0.3 ? '#8a5a00' : '#1d2b38', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">红线是用<b>最小二乘</b>拟合的回归直线：让所有点竖直偏差的平方和最小，且一定穿过样本中心 (x̄, ȳ) = (' + cFmt(xm) + ', ' + cFmt(ym) + ')。</span>'
        + '<span class="viz-meta">把 r 拖到 0：点云散成一团，直线几乎水平，预测毫无意义；拖到 0.95：点几乎贴线。所以 r 就是「这条线值不值得信」的刻度。<b>但相关不等于因果</b>——雪糕销量与溺水人数同涨，只是都被气温带着走。</span>';
    }
    cSlider(s0.ctrl, '相关系数 r', p.r, -0.98, 0.98, 0.02, function (x) { p.r = x; draw(); });
    draw();
  }
