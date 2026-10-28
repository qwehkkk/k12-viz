  /* ================= 概率（必修二第 10 章） ================= */
  var PH_EVENTS = [
    { name: '点数和为 7', test: function (i, j) { return i + j === 7; } },
    { name: '点数相同', test: function (i, j) { return i === j; } },
    { name: '至少一个 6 点', test: function (i, j) { return i === 6 || j === 6; } },
    { name: '点数和大于 10', test: function (i, j) { return i + j > 10; } }
  ];

  /* 掷两枚骰子：36 个样本点 */
  function phDiceLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { ev: v.ev || 0 };
    function draw() {
      var ctx = s0.cv.getContext('2d');
      var s = setupCanvas(s0.cv);
      var W = s.w, H = s.h;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
      var cell = Math.min((W - 150) / 6, (H - 120) / 6);
      var ox = 78, oy = 74;
      var ev = PH_EVENTS[p.ev] || PH_EVENTS[0];
      var k = 0;
      ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (var i = 1; i <= 6; i++) {
        for (var j = 1; j <= 6; j++) {
          var hit = ev.test(i, j);
          if (hit) k++;
          var x = ox + (j - 1) * cell, y = oy + (i - 1) * cell;
          ctx.fillStyle = hit ? 'rgba(192,57,43,0.82)' : '#f2f5f8';
          ctx.strokeStyle = hit ? '#c0392b' : '#dfe6ec';
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.rect(x, y, cell - 1, cell - 1); ctx.fill(); ctx.stroke();
          ctx.fillStyle = hit ? '#ffffff' : '#9aa7b4';
          ctx.fillText(i + ',' + j, x + cell / 2, y + cell / 2);
        }
      }
      ctx.fillStyle = '#5b6b7a';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      for (var c = 1; c <= 6; c++) ctx.fillText(String(c), ox + (c - 0.5) * cell, oy - 20);
      ctx.textAlign = 'right';
      for (var r2 = 1; r2 <= 6; r2++) ctx.fillText(String(r2), ox - 8, oy + (r2 - 0.5) * cell - 6);
      ctx.textAlign = 'center';
      ctx.fillStyle = '#8395a7';
      ctx.fillText('第一枚', ox + 3 * cell, oy + 6 * cell + 18);
      ctx.save();
      ctx.translate(ox - 44, oy + 3 * cell);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('第二枚', 0, 0);
      ctx.restore();
      /* 结论面板 */
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillStyle = '#1d2b38';
      ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      var tx = ox + 6 * cell + 26;
      ctx.fillText('事件：' + ev.name, tx, oy + 6);
      ctx.fillStyle = '#c0392b';
      ctx.fillText('k = ' + k + ' 个样本点', tx, oy + 32);
      ctx.fillStyle = '#5b6b7a';
      ctx.fillText('n = 36', tx, oy + 56);
      ctx.fillStyle = '#0f6e56';
      ctx.font = '15px "PingFang SC","Microsoft YaHei",sans-serif';
      var g = 1, a = k, b = 36;
      while (b) { var t2 = a % b; a = b; b = t2; }
      g = a || 1;
      ctx.fillText('P = ' + k + '/36' + (g > 1 ? ' = ' + (k / g) + '/' + (36 / g) : ''), tx, oy + 82);
      s0.info.innerHTML = '<span class="viz-meta">这 36 个格子就是掷两枚骰子的<b>样本空间</b>：每一格是一个样本点，且概率都是 1/36（等可能）。事件就是格子的集合，数格子就是求分子。</span>'
        + '<span class="viz-meta">注意必须是 <b>6 × 6</b> 而不是 C(6,2) = 15 种组合——「第一枚 1、第二枚 2」和「第一枚 2、第二枚 1」是两个不同样本点，合并会让它们概率翻倍。</span>';
    }
    cSlider(s0.ctrl, '选择事件（0 和为7 / 1 相同 / 2 至少一个6 / 3 和大于10）', p.ev, 0, 3, 1, function (x) { p.ev = x; draw(); });
    draw();
  }

  /* 互斥 / 一般 / 对立 */
  function phAddLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { pa: v.pa != null ? v.pa : 0.3, pb: v.pb != null ? v.pb : 0.4, mode: v.mode || 0 };
    function draw() {
      var ctx = s0.cv.getContext('2d');
      var s = setupCanvas(s0.cv);
      var W = s.w, H = s.h;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
      var bw = Math.min(W - 120, 420), bh = Math.min(H - 150, 220);
      var bx = (W - bw) / 2 - 40, by = 70;
      /* 样本空间方框（面积 = 1） */
      ctx.fillStyle = '#f6f9fb'; ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#8395a7';
      ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText('样本空间 Ω（面积 = 1）', bx + 6, by - 18);
      var PA = Math.min(0.92, p.pa), PB = Math.min(0.92, p.pb);
      var overlap = p.mode === 0 ? 0 : (p.mode === 1 ? 0.14 : 0);
      if (p.mode === 2) {
        /* 对立：A 与 Ā 铺满 */
        ctx.fillStyle = 'rgba(24,95,165,0.25)';
        ctx.fillRect(bx, by, bw * PA, bh);
        ctx.fillStyle = 'rgba(15,110,86,0.22)';
        ctx.fillRect(bx + bw * PA, by, bw * (1 - PA), bh);
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw * PA, bh);
        ctx.strokeStyle = '#0f6e56';
        ctx.strokeRect(bx + bw * PA, by, bw * (1 - PA), bh);
        ctx.fillStyle = '#185fa5';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('A  ' + cFmt(PA), bx + bw * PA / 2, by + bh / 2);
        ctx.fillStyle = '#0f6e56';
        ctx.fillText('Ā  ' + cFmt(1 - PA), bx + bw * PA + bw * (1 - PA) / 2, by + bh / 2);
      } else {
        var wA = bw * PA, wB = bw * PB;
        var xA = bx + 12, xB = bx + wA - wA * overlap + 12;
        ctx.fillStyle = 'rgba(24,95,165,0.24)';
        ctx.fillRect(xA, by + 18, wA * 0.72, bh - 36);
        ctx.fillStyle = 'rgba(192,57,43,0.22)';
        ctx.fillRect(xB, by + 40, wB * 0.72, bh - 84);
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2;
        ctx.strokeRect(xA, by + 18, wA * 0.72, bh - 36);
        ctx.strokeStyle = '#c0392b';
        ctx.strokeRect(xB, by + 40, wB * 0.72, bh - 84);
        ctx.fillStyle = '#185fa5';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('A  ' + cFmt(PA), xA + wA * 0.36, by + 18 + 14);
        ctx.fillStyle = '#c0392b';
        ctx.fillText('B  ' + cFmt(PB), xB + wB * 0.36, by + 40 + 14);
        if (p.mode === 1) {
          var xo = Math.max(xA, xB), xe = Math.min(xA + wA * 0.72, xB + wB * 0.72);
          ctx.fillStyle = 'rgba(138,90,0,0.30)';
          ctx.fillRect(xo, by + 40, Math.max(0, xe - xo), bh - 84);
          ctx.fillStyle = '#8a5a00';
          ctx.fillText('重叠 ' + cFmt(overlap), (xo + xe) / 2, by + bh - 26);
        }
      }
      var union = p.mode === 0 ? Math.min(1, PA + PB) : (p.mode === 1 ? Math.min(1, PA + PB - overlap) : 1);
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillStyle = '#1d2b38';
      ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      var ty = by + bh + 26;
      ctx.fillText(p.mode === 0 ? '互斥：P(A∪B) = P(A) + P(B) = ' + cFmt(union)
        : p.mode === 1 ? '一般：P(A∪B) = P(A) + P(B) − P(AB) = ' + cFmt(PA) + ' + ' + cFmt(PB) + ' − ' + cFmt(overlap) + ' = ' + cFmt(union)
          : '对立：P(A) + P(Ā) = ' + cFmt(PA) + ' + ' + cFmt(1 - PA) + ' = 1', bx, ty);
      s0.info.innerHTML = '<span class="viz-meta">把概率想成<b>面积</b>：整个方框面积是 1。两块不重叠（互斥）时直接相加；一旦重叠，相加会把重叠部分算两次，所以必须减掉一次；对立则是两块正好铺满整个方框，和为 1。</span>'
        + '<span class="viz-meta">判据速查：P(A) + P(B) > 1 就一定<b>不</b>互斥（必然有重叠）；互斥不一定对立（可能还有第三种结果）；对立一定互斥。</span>';
    }
    cSlider(s0.ctrl, 'P(A)', p.pa, 0.05, 0.9, 0.05, function (x) { p.pa = x; draw(); });
    cSlider(s0.ctrl, 'P(B)', p.pb, 0.05, 0.9, 0.05, function (x) { p.pb = x; draw(); });
    cSlider(s0.ctrl, '关系（0 互斥 / 1 有重叠 / 2 对立）', p.mode, 0, 2, 1, function (x) { p.mode = x; draw(); });
    draw();
  }

  /* 独立性：串联 / 并联 */
  function phIndepLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { pa: v.pa != null ? v.pa : 0.8, pb: v.pb != null ? v.pb : 0.7, mode: v.mode || 0 };
    function draw() {
      var ctx = s0.cv.getContext('2d');
      var s = setupCanvas(s0.cv);
      var W = s.w, H = s.h;
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, W, H);
      var cx = W / 2, cy = H / 2 - 20;
      var bw = 96, bh = 62;
      function box(x, y, label, pr, col) {
        ctx.fillStyle = 'rgba(24,95,165,0.08)';
        ctx.strokeStyle = col; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.rect(x - bw / 2, y - bh / 2, bw, bh); ctx.fill(); ctx.stroke();
        ctx.fillStyle = col;
        ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(label, x, y - 10);
        ctx.font = '15px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(cFmt(pr), x, y + 16);
      }
      function wire(x1, y1, x2, y2) {
        ctx.strokeStyle = '#8395a7'; ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      }
      if (p.mode === 0) {
        var gap = 130;
        wire(cx - gap * 1.5, cy, cx - gap / 2 - bw / 2, cy);
        box(cx - gap / 2, cy, '元件 1', p.pa, '#185fa5');
        wire(cx - gap / 2 + bw / 2, cy, cx + gap / 2 - bw / 2, cy);
        box(cx + gap / 2, cy, '元件 2', p.pb, '#0f6e56');
        wire(cx + gap / 2 + bw / 2, cy, cx + gap * 1.5, cy);
        ctx.fillStyle = '#5b6b7a';
        ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText('串联：两个都要正常才通电', cx, cy + bh / 2 + 26);
        ctx.fillStyle = '#c0392b';
        ctx.font = '15px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText('P = ' + cFmt(p.pa) + ' × ' + cFmt(p.pb) + ' = ' + cFmt(p.pa * p.pb), cx, cy + bh / 2 + 54);
      } else {
        var g2 = 90;
        wire(cx - 190, cy, cx - 190, cy - g2);
        wire(cx - 190, cy - g2, cx - bw / 2, cy - g2);
        box(cx, cy - g2, '元件 1', p.pa, '#185fa5');
        wire(cx + bw / 2, cy - g2, cx + 190, cy - g2);
        wire(cx + 190, cy - g2, cx + 190, cy);
        wire(cx - 190, cy, cx - 190, cy + g2);
        wire(cx - 190, cy + g2, cx - bw / 2, cy + g2);
        box(cx, cy + g2, '元件 2', p.pb, '#0f6e56');
        wire(cx + bw / 2, cy + g2, cx + 190, cy + g2);
        wire(cx + 190, cy + g2, cx + 190, cy);
        ctx.fillStyle = '#5b6b7a';
        ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText('并联：只要一个正常就通电', cx, cy + g2 + bh / 2 + 18);
        ctx.fillStyle = '#c0392b';
        ctx.font = '15px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText('P = 1 − ' + cFmt(1 - p.pa) + ' × ' + cFmt(1 - p.pb) + ' = ' + cFmt(1 - (1 - p.pa) * (1 - p.pb)), cx, cy + g2 + bh / 2 + 46);
      }
      s0.info.innerHTML = '<span class="viz-meta">串联 = 「<b>都</b>要正常」→ 独立事件直接相乘，概率必然比任何一个都小（' + cFmt(p.pa) + ' × ' + cFmt(p.pb) + ' = ' + cFmt(p.pa * p.pb) + '）。</span>'
        + '<span class="viz-meta">并联 = 「<b>至少一个</b>正常」→ 先算都坏（' + cFmt((1 - p.pa) * (1 - p.pb)) + '），再用 1 减，结果比任何一个都大。飞机、服务器做冗余，就是靠这个「1 减去很小的数」。</span>';
    }
    cSlider(s0.ctrl, '元件 1 正常概率', p.pa, 0.1, 0.99, 0.01, function (x) { p.pa = x; draw(); });
    cSlider(s0.ctrl, '元件 2 正常概率', p.pb, 0.1, 0.99, 0.01, function (x) { p.pb = x; draw(); });
    cSlider(s0.ctrl, '结构（0 串联 / 1 并联）', p.mode, 0, 1, 1, function (x) { p.mode = x; draw(); });
    draw();
  }

  /* 频率收敛到概率 */
  function phFreqLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { n: v.n != null ? v.n : 10 };
    function draw() {
      var N = Math.max(10, Math.round(p.n));
      var view = { xmin: 0, xmax: 1200, ymin: 0.2, ymax: 0.8 };
      var m = circleMap(s0.cv, view), ctx = m.ctx;
      xyAxes(m, view);
      /* 0.5 参考线 */
      ctx.strokeStyle = '#c0392b'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(m.px(0), m.py(0.5)); ctx.lineTo(m.px(1200), m.py(0.5)); ctx.stroke();
      ctx.setLineDash([]);
      cTag(m, 1150, 0.53, '理论概率 0.5', '#c0392b', 0, 0);
      /* 累计频率曲线 */
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.2;
      ctx.beginPath();
      var heads = 0;
      var last = 0;
      for (var i = 1; i <= 1200; i++) {
        if (shRnd(i * 1.37 + 5) < 0.5) heads++;
        var f = heads / i;
        last = f;
        if (i > N) break;
        var X = m.px(i), Y = m.py(Math.max(view.ymin, Math.min(view.ymax, f)));
        if (i === 1) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.stroke();
      cDot(m, N, Math.max(view.ymin, Math.min(view.ymax, last)), '#0f6e56', 6);
      cTag(m, N * 0.5, 0.75, '抛 ' + N + ' 次，正面频率 = ' + cFmt(last), '#0f6e56', 0, 0);
      s0.info.innerHTML = '<span class="viz-meta">试验次数很少时，频率上下大幅抖动（抛 5 次可能全正面，频率 1.0）；次数增大后曲线被「吸」向 0.5，<b>但永远在抖</b>。这就是大数定律：频率稳定于概率，而不是「越来越等于」。</span>'
        + '<span class="viz-meta">概率是事件的<b>理论属性</b>（客观存在），频率是<b>试验结果</b>（会变）。没有理论模型时，就用大量试验的频率去估计概率——这就是蒙特卡洛方法。</span>';
    }
    cSlider(s0.ctrl, '试验次数 n', p.n, 10, 1200, 10, function (x) { p.n = x; draw(); });
    draw();
  }
