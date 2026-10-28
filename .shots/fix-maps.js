const fs = require('fs');
const path = require('path');
const vp = path.join(__dirname, '..', 'assets', 'viz.js');
let src = fs.readFileSync(vp, 'utf8');

/* ---------- 替换 shHistLab ---------- */
const histNew = `  /* 频率分布直方图：纵轴 = 频率/组距（自定义线性映射，纵轴独立缩放） */
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
        if (k < 0) k = 0;
        if (k >= nb) k = nb - 1;
        cnt[k]++;
      });
      var total = DATA.length;
      var maxH = 0;
      cnt.forEach(function (c) { maxH = Math.max(maxH, c / total / d); });
      var s = setupCanvas(s0.cv);
      var ctx = s.ctx;
      var X0 = 56, X1 = s.w - 20, Y0 = s.h - 46, Y1 = 46;
      var xmin = lo - 6, xmax = hi + 6, ymax = maxH * 1.3;
      function PX(u) { return X0 + (u - xmin) / (xmax - xmin) * (X1 - X0); }
      function PY(v2) { return Y0 - v2 / ymax * (Y0 - Y1); }
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, s.w, s.h);
      ctx.strokeStyle = '#eef2f6'; ctx.lineWidth = 1;
      for (i = 0; i <= 4; i++) {
        var gy = Y0 - (Y0 - Y1) * i / 4;
        ctx.beginPath(); ctx.moveTo(X0, gy); ctx.lineTo(X1, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(X0, Y1 - 8); ctx.lineTo(X0, Y0); ctx.lineTo(X1, Y0); ctx.stroke();
      ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillStyle = '#8395a7';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      for (i = 0; i <= nb; i++) ctx.fillText(String(lo + i * d), PX(lo + i * d), Y0 + 6);
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      ctx.fillText('0', X0 - 6, PY(0));
      ctx.fillText(cFmt(ymax / 2), X0 - 6, PY(ymax / 2));
      ctx.fillText(cFmt(ymax), X0 - 6, PY(ymax));
      for (i = 0; i < nb; i++) {
        var hh = cnt[i] / total / d;
        var x0 = lo + i * d;
        ctx.fillStyle = 'rgba(24,95,165,0.16)';
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.rect(PX(x0) + 0.5, PY(hh), Math.max(1, PX(x0 + d) - PX(x0) - 1), PY(0) - PY(hh));
        ctx.fill(); ctx.stroke();
      }
      ctx.fillStyle = '#1d2b38';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText('组距 = ' + d + '，纵轴 = 频率/组距（各矩形面积之和 = 1）', (X0 + X1) / 2, 10);
      s0.info.innerHTML = '<span class="viz-meta">纵轴为什么是「频率 / 组距」？因为只有这样才能让 <b>面积 = 频率</b>：面积 = 高 × 宽 = (频率/组距) × 组距。所有面积加起来正好 1，可以当校验用。</span>'
        + '<span class="viz-meta">拖动组距：变小（组距 5）→ 组数多、图更细但出现锯齿；变大（组距 20）→ 组数少、形状平滑但看不到细节。选组距就是「分辨率」的取舍。</span>';
    }
    cSlider(s0.ctrl, '组距', p.d, 5, 20, 5, function (x) { p.d = x; draw(); });
    draw();
  }
`;

/* ---------- 替换 phFreqLab ---------- */
const freqNew = `  /* 频率收敛到概率（自定义线性映射，纵轴独立缩放） */
  function phFreqLab(el, cfg) {
    var s0 = circleScaffold(el);
    var v = (cfg && cfg.values) || {};
    var p = { n: v.n != null ? v.n : 10 };
    function draw() {
      var N = Math.max(10, Math.round(p.n));
      var s = setupCanvas(s0.cv);
      var ctx = s.ctx;
      var X0 = 56, X1 = s.w - 20, Y0 = s.h - 46, Y1 = 30;
      var xmin = 0, xmax = 1200, ymin = 0.2, ymax = 0.8;
      function PX(u) { return X0 + (u - xmin) / (xmax - xmin) * (X1 - X0); }
      function PY(v2) { return Y0 - (v2 - ymin) / (ymax - ymin) * (Y0 - Y1); }
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, s.w, s.h);
      ctx.strokeStyle = '#eef2f6'; ctx.lineWidth = 1;
      [0.3, 0.4, 0.5, 0.6, 0.7].forEach(function (g) {
        ctx.beginPath(); ctx.moveTo(X0, PY(g)); ctx.lineTo(X1, PY(g)); ctx.stroke();
      });
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(X0, Y1 - 6); ctx.lineTo(X0, Y0); ctx.lineTo(X1, Y0); ctx.stroke();
      ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillStyle = '#8395a7';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      [0, 300, 600, 900, 1200].forEach(function (t) { ctx.fillText(String(t), PX(t), Y0 + 6); });
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      [0.3, 0.4, 0.5, 0.6, 0.7].forEach(function (g) { ctx.fillText(cFmt(g), X0 - 6, PY(g)); });
      ctx.strokeStyle = '#c0392b'; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(X0, PY(0.5)); ctx.lineTo(X1, PY(0.5)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#c0392b'; ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillText('理论概率 0.5', X0 + 6, PY(0.5) - 4);
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.2;
      ctx.beginPath();
      var heads = 0, last = 0.5;
      for (var i = 1; i <= N; i++) {
        if (shRnd(i * 1.37 + 5) < 0.5) heads++;
        last = heads / i;
        var X = PX(i), Y = PY(Math.max(ymin, Math.min(ymax, last)));
        if (i === 1) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      }
      ctx.stroke();
      ctx.fillStyle = '#0f6e56';
      ctx.beginPath(); ctx.arc(PX(N), PY(Math.max(ymin, Math.min(ymax, last))), 6, 0, Math.PI * 2); ctx.fill();
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText('抛 ' + N + ' 次，正面频率 = ' + cFmt(last), (X0 + X1) / 2, 10);
      s0.info.innerHTML = '<span class="viz-meta">试验次数很少时，频率上下大幅抖动（抛 5 次可能全正面，频率 1.0）；次数增大后曲线被「吸」向 0.5，<b>但永远在抖</b>。这就是大数定律：频率稳定于概率，而不是「越来越等于」。</span>'
        + '<span class="viz-meta">概率是事件的<b>理论属性</b>（客观存在），频率是<b>试验结果</b>（会变）。没有理论模型时，就用大量试验的频率去估计概率——这就是蒙特卡洛方法。</span>';
    }
    cSlider(s0.ctrl, '试验次数 n', p.n, 10, 1200, 10, function (x) { p.n = x; draw(); });
    draw();
  }
`;

function replaceBetween(startMark, endMark, newText) {
  const a = src.indexOf(startMark);
  const b = src.indexOf(endMark, a);
  if (a < 0 || b < 0) throw new Error('marker not found: ' + startMark);
  src = src.slice(0, a) + newText + '\n' + src.slice(b);
}

replaceBetween('  /* 频率分布直方图：纵轴 = 频率/组距 */', '  /* 平均数 vs 中位数', histNew);
replaceBetween('  /* 频率收敛到概率 */', '  window.VIZ = {', freqNew);

fs.writeFileSync(vp, src);
console.log('replaced, lines =', src.split('\n').length);
