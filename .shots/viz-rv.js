/* ===== 选择性必修第三册：随机变量及其分布（rv） ===== */

/* 分布列：掷两枚骰子的点数和 */
function rvDistLab(el, cfg) {
  var p = Object.assign({ x: 7 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var x = Math.round(p.x);
    var m = linMap(s0.cv, { xmin: 1.2, xmax: 12.8, ymin: 0, ymax: 0.135 }, 34);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var k, cum = 0, cumX = 0;
    for (k = 2; k <= 12; k++) {
      var cnt = 6 - Math.abs(7 - k);
      var hi = (k === x);
      var bw = (m.px(3) - m.px(2)) * 0.62;
      var bx = m.px(k) - bw / 2;
      cum += cnt; if (k <= x) cumX += cnt;
      ctx.fillStyle = hi ? 'rgba(192,57,43,0.75)' : 'rgba(24,95,165,0.55)';
      ctx.fillRect(bx, m.py(cnt / 36), bw, m.py(0) - m.py(cnt / 36));
      ctx.fillStyle = hi ? '#c0392b' : '#6b7a89'; ctx.font = (hi ? 'bold ' : '') + FONT;
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(cnt + '/36', m.px(k), m.py(cnt / 36) - 4);
      ctx.fillStyle = '#6b7a89'; ctx.textBaseline = 'top';
      ctx.fillText(String(k), m.px(k), m.py(0) + 6);
    }
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(20, m.py(0)); ctx.lineTo(m.w - 20, m.py(0)); ctx.stroke();
    ctx.fillStyle = '#6b7a89'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('X（点数和）', m.w - 96, m.py(0) + 6);
    ctx.fillStyle = 'rgba(138,90,0,0.8)'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('P(X=x)', 46, m.py(0.13) - 4);
    // 底部累积概率进度条 F(x)
    var gy = m.h - 16, gw = m.w - 120, gx = 90;
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1;
    ctx.strokeRect(gx, gy - 6, gw, 10);
    ctx.fillStyle = 'rgba(138,90,0,0.7)';
    ctx.fillRect(gx, gy - 6, gw * (cumX / 36), 10);
    ctx.fillStyle = '#8a5a00'; ctx.font = FONT; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText('F(x)', gx - 8, gy);
    ctx.textAlign = 'left';
    ctx.fillText('F(' + x + ') = ' + cumX + '/36 \u2248 ' + cFmt(cumX / 36), gx + gw + 8, gy);
    var cnt2 = 6 - Math.abs(7 - x);
    s0.info.innerHTML = '<span class="viz-meta">掷两枚骰子，X = 点数和。分布列把「每个可能取值 + 对应概率」一张表写全，且<b>所有 P 之和必须等于 1</b>（这里 36/36 = 1）。' +
      ' 当前 P(X = ' + x + ') = ' + cnt2 + '/36 \u2248 <b>' + cFmt(cnt2 / 36) + '</b>；' +
      ' 累积 F(' + x + ') = P(X \u2264 ' + x + ') = ' + cumX + '/36 \u2248 <b>' + cFmt(cumX / 36) + '</b>（底部进度条）。' +
      ' 分布列是离散型随机变量的「身份证」：期望、方差全部由它算出。</span>';
  }
  cSlider(s0.ctrl, '当前取值 x', p.x, 2, 12, 1, function (v) { p.x = v; draw(); });
  draw();
}

/* 期望与方差：三点分布 */
function rvMeanLab(el, cfg) {
  var p = Object.assign({ p: 0.4, q: 0.3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var p1 = p.p, q1 = p.q, p0 = 1 - p1 - q1;
    var valid = p0 >= -1e-9 && p1 >= 0 && q1 >= 0;
    if (p0 < 0) p0 = 0;
    var probs = [p0, p1, q1];
    var m = linMap(s0.cv, { xmin: -0.7, xmax: 2.7, ymin: 0, ymax: 0.95 }, 34);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var i;
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(24, m.py(0)); ctx.lineTo(m.w - 24, m.py(0)); ctx.stroke();
    var bw = (m.px(1) - m.px(0)) * 0.44;
    for (i = 0; i < 3; i++) {
      var bad = !valid && probs[i] < 0;
      ctx.fillStyle = bad ? 'rgba(192,57,43,0.35)' : (i === 2 ? 'rgba(15,110,86,0.6)' : 'rgba(24,95,165,0.55)');
      var hgt = Math.max(probs[i], 0);
      ctx.fillRect(m.px(i) - bw / 2, m.py(hgt), bw, m.py(0) - m.py(hgt));
      ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(cFmt(Math.round(probs[i] * 100) / 100), m.px(i), m.py(Math.max(probs[i], 0.02)) - 4);
      ctx.fillStyle = '#333'; ctx.textBaseline = 'top';
      ctx.fillText('X=' + i, m.px(i), m.py(0) + 6);
    }
    var E, D, exLine = '';
    if (valid) {
      E = p1 * 1 + q1 * 2;
      D = p0 * E * E + p1 * (1 - E) * (1 - E) + q1 * (2 - E) * (2 - E);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(m.px(E), m.py(0)); ctx.lineTo(m.px(E), m.py(Math.max(p0, p1, q1) + 0.12)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText('E(X)=' + cFmt(E), m.px(E), m.py(Math.max(p0, p1, q1) + 0.12) - 4);
      exLine = ' E(X) = 0\u00d7' + cFmt(p0) + ' + 1\u00d7' + cFmt(p1) + ' + 2\u00d7' + cFmt(q1) + ' = <b>' + cFmt(E) + '</b>；' +
        ' D(X) = \u03a3(x\u1d62\u2212E)\u00b2p\u1d62 = <b>' + cFmt(D) + '</b>。';
    }
    if (!valid) {
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('P 之和 = ' + cFmt(p1 + q1 + p0) + ' 超过了 1，不是合法分布！', m.w / 2, m.h - 24);
    }
    s0.info.innerHTML = '<span class="viz-meta">X 取 0、1、2，P(X=1) = ' + cFmt(p1) + '，P(X=2) = ' + cFmt(q1) + '，P(X=0) = 1\u2212\u2026 = ' + cFmt(p0) + '。' +
      (valid
        ? exLine +
          ' 期望是「加权平均」（红虚线位置，权重是概率）；方差是「离期望的平均平方距离」，越大越分散。' +
          ' <b>分布列合法性：每个概率 \u2265 0 且总和 = 1</b>——把两个滑块拉满就立刻非法。'
        : ' <b style="color:#c0392b">概率和大于 1</b>，这不是分布列——三条性质（非负、可列、和为 1）缺一不可。考试求常数 c 就靠「和为 1」列方程。') +
      '</span>';
  }
  cSlider(s0.ctrl, 'P(X=1)', p.p, 0, 0.9, 0.05, function (v) { p.p = v; draw(); });
  cSlider(s0.ctrl, 'P(X=2)', p.q, 0, 0.9, 0.05, function (v) { p.q = v; draw(); });
  draw();
}

/* 二项分布 B(n,p) */
function rvBinomLab(el, cfg) {
  var p = Object.assign({ n: 8, p: 0.5 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var n = Math.round(p.n), pp = p.p;
    var i, maxP = 0;
    var probs = [];
    for (i = 0; i <= n; i++) {
      var v = cpC(n, i) * Math.pow(pp, i) * Math.pow(1 - pp, n - i);
      probs.push(v); if (v > maxP) maxP = v;
    }
    var m = linMap(s0.cv, { xmin: -0.8, xmax: n + 0.8, ymin: 0, ymax: maxP * 1.3 }, 34);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(24, m.py(0)); ctx.lineTo(m.w - 24, m.py(0)); ctx.stroke();
    var bw = (m.px(1) - m.px(0)) * 0.6;
    for (i = 0; i <= n; i++) {
      ctx.fillStyle = 'rgba(24,95,165,0.55)';
      ctx.fillRect(m.px(i) - bw / 2, m.py(probs[i]), bw, m.py(0) - m.py(probs[i]));
      ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(String(i), m.px(i), m.py(0) + 5);
    }
    // 期望线
    var E = n * pp;
    if (E > -0.5 && E < n + 0.5) {
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(m.px(E), m.py(0)); ctx.lineTo(m.px(E), m.py(maxP * 1.18)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
      ctx.fillText('E=np=' + cFmt(E), m.px(E) + 5, m.py(maxP * 1.18) + 10);
    }
    ctx.fillStyle = '#6b7a89'; ctx.font = FONT; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('k（n 次试验中的成功次数）', m.w / 2, m.py(0) + 22);
    s0.info.innerHTML = '<span class="viz-meta">X ~ B(' + n + ', ' + cFmt(pp) + ')：' + n + ' 次<b>独立重复</b>试验，每次成功率 ' + cFmt(pp) +
      '，P(X=k) = C(' + n + ',k)\u00b7' + cFmt(pp) + '^k\u00b7' + cFmt(1 - pp) + '^(' + n + '\u2212k)。' +
      ' E(X) = np = <b>' + cFmt(E) + '</b>，D(X) = np(1\u2212p) = <b>' + cFmt(n * pp * (1 - pp)) + '</b>。' +
      (pp === 0.5 ? ' p = 0.5 时左右对称；' : (pp < 0.5 ? ' p < 0.5 时图形向左偏（大概率拿小值）；' : ' p > 0.5 时图形向右偏（大概率拿大值）；')) +
      ' 拖 n 变高变瘦、拖 p 整体左右挪。<b>判定口诀：独立 + 每次同概率 = 二项分布</b>。</span>';
  }
  cSlider(s0.ctrl, '试验次数 n', p.n, 1, 14, 1, function (v) { p.n = v; draw(); });
  cSlider(s0.ctrl, '单次成功率 p', p.p, 0.05, 0.95, 0.05, function (v) { p.p = v; draw(); });
  draw();
}

/* 超几何分布（无放回）对比二项（有放回） */
function rvHyperLab(el, cfg) {
  var p = Object.assign({ N: 12, M: 4, n: 5 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var N = Math.round(p.N);
    var M = Math.min(Math.round(p.M), N - 1);
    var nn = Math.min(Math.round(p.n), N);
    var kLo = Math.max(0, nn - (N - M)), kHi = Math.min(M, nn);
    var i, maxP = 0.02;
    var probs = [];
    for (i = kLo; i <= kHi; i++) {
      var v = cpC(M, i) * cpC(N - M, nn - i) / cpC(N, nn);
      probs.push(v); if (v > maxP) maxP = v;
    }
    var m = linMap(s0.cv, { xmin: -0.8, xmax: M + 0.8, ymin: 0, ymax: maxP * 1.35 }, 34);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(24, m.py(0)); ctx.lineTo(m.w - 24, m.py(0)); ctx.stroke();
    var bw = Math.max(14, (m.px(1) - m.px(0)) * 0.5);
    for (i = kLo; i <= kHi; i++) {
      var v = cpC(M, i) * cpC(N - M, nn - i) / cpC(N, nn);
      ctx.fillStyle = 'rgba(15,110,86,0.6)';
      ctx.fillRect(m.px(i) - bw / 2, m.py(v), bw, m.py(0) - m.py(v));
      ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(cFmt(Math.round(v * 1000) / 1000), m.px(i), m.py(v) - 3);
    }
    // 二项近似：B(nn, M/N)
    var pb0 = M / N;
    ctx.fillStyle = '#8a5a00'; ctx.font = FONT;
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    for (i = kLo; i <= kHi; i++) {
      var vb = cpC(nn, i) * Math.pow(pb0, i) * Math.pow(1 - pb0, nn - i);
      if (vb > 0.001) {
        ctx.beginPath(); ctx.arc(m.px(i), m.py(vb), 4, 0, Math.PI * 2);
        ctx.fillStyle = '#8a5a00'; ctx.fill();
      }
    }
    for (i = kLo; i <= kHi; i++) {
      ctx.fillStyle = '#6b7a89'; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText(String(i), m.px(i), m.py(0) + 5);
    }
    ctx.fillStyle = '#0f6e56'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('绿柱：超几何（无放回）', 14, 10);
    ctx.fillStyle = '#8a5a00';
    ctx.fillText('圆点：二项 B(' + nn + ',' + cFmt(pb0) + ')（有放回近似）', 14, 26);
    s0.info.innerHTML = '<span class="viz-meta">N = ' + N + ' 件产品含 M = ' + M + ' 件次品，<b>不放回</b>抽 nn = ' + nn + ' 件，X = 抽到次品数：' +
      ' P(X=k) = C(' + M + ',k)C(' + (N - M) + ',' + (nn - k) + ') / C(' + N + ',' + nn + ')。' +
      (nn <= M + 0 ? '' : '') +
      ' 当前 k 取值范围 ' + kLo + ' ~ ' + kHi + '（抽 ' + nn + ' 件最多只可能中 ' + kHi + ' 件次品、最少 ' + kLo + ' 件）。' +
      ' 棕色圆点是「有放回」的二项分布 B(' + nn + ', ' + cFmt(pb0) + ')：把 N 拖大，两组点几乎重合——<b>N 很大时无放回 ≈ 有放回</b>，这正是二项分布能近似超几何的原因。' +
      ' 区分口诀：<b>不放回用超几何，有放回（或独立重复）用二项</b>。</span>';
  }
  cSlider(s0.ctrl, '产品总数 N', p.N, 6, 20, 1, function (v) { p.N = v; draw(); });
  cSlider(s0.ctrl, '次品数 M', p.M, 1, 9, 1, function (v) { p.M = v; draw(); });
  cSlider(s0.ctrl, '抽取件数 n', p.n, 1, 10, 1, function (v) { p.n = v; draw(); });
  draw();
}

/* 正态分布 */
function rvPhi(z) {
  var t = 1 / (1 + 0.2316419 * Math.abs(z));
  var d = 0.3989423 * Math.exp(-z * z / 2);
  var pr = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - pr : pr;
}
function rvNormalLab(el, cfg) {
  var p = Object.assign({ mu: 0, sigma: 1, c: 1 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var mu = p.mu, sg = p.sigma, c = p.c;
    var f = function (x) { return Math.exp(-(x - mu) * (x - mu) / (2 * sg * sg)) / (sg * 2.5066282746); };
    var view = { xmin: mu - 4 * sg, xmax: mu + 4 * sg, ymin: 0, ymax: f(mu) * 1.25 };
    var m = linMap(s0.cv, view);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    // 阴影区 [mu-cσ, mu+cσ]
    ctx.beginPath();
    ctx.moveTo(m.px(mu - c * sg), m.py(0));
    var i, N = 80;
    for (i = 0; i <= N; i++) {
      var xx = mu - c * sg + 2 * c * sg * i / N;
      ctx.lineTo(m.px(xx), m.py(f(xx)));
    }
    ctx.lineTo(m.px(mu + c * sg), m.py(0));
    ctx.closePath();
    ctx.fillStyle = 'rgba(192,57,43,0.16)';
    ctx.fill();
    // x 轴 + 网格线（σ 的整数倍）
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(20, m.py(0)); ctx.lineTo(m.w - 20, m.py(0)); ctx.stroke();
    ctx.strokeStyle = 'rgba(154,167,180,0.5)'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    for (i = -2; i <= 2; i++) {
      if (i === 0) continue;
      ctx.beginPath(); ctx.moveTo(m.px(mu + i * sg), m.py(0)); ctx.lineTo(m.px(mu + i * sg), m.py(f(mu) * 0.98)); ctx.stroke();
    }
    ctx.setLineDash([]);
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.4;
    ctx.beginPath();
    var first = true;
    for (i = 0; i <= 240; i++) {
      var x2 = view.xmin + (view.xmax - view.xmin) * i / 240;
      var y2 = f(x2);
      if (first) { ctx.moveTo(m.px(x2), m.py(y2)); first = false; } else ctx.lineTo(m.px(x2), m.py(y2));
    }
    ctx.stroke();
    ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (i = -3; i <= 3; i++) {
      if (i === 0) continue;
      ctx.fillText((i > 0 ? '\u03bc+' : '\u03bc') + (Math.abs(i) === 1 ? '' : Math.abs(i)) + '\u03c3', m.px(mu + i * sg), m.py(0) + 6);
    }
    ctx.fillText('\u03bc=' + cFmt(mu), m.px(mu), m.py(0) + 6);
    var prob = 2 * rvPhi(c) - 1;
    s0.info.innerHTML = '<span class="viz-meta">X ~ N(\u03bc, \u03c3\u00b2)，钟形曲线关于 x = \u03bc = <b>' + cFmt(mu) + '</b> 对称，\u03c3 = ' + cFmt(sg) + ' 控制胖瘦（\u03c3 越大数据越散）。' +
      ' 红色区域是 \u03bc \u00b1 ' + cFmt(c) + '\u03c3，面积 = P(|X\u2212\u03bc| < ' + cFmt(c) + '\u03c3) \u2248 <b>' + cFmt(prob) + '</b>。' +
      ' 必背三值：\u00b11\u03c3 \u2192 68.3%，\u00b12\u03c3 \u2192 95.4%，\u00b13\u03c3 \u2192 99.7%。' +
      ' 解题全靠<b>对称性</b>：P(X > \u03bc+a) = P(X < \u03bc\u2212a) = 1 \u2212 \u03a6(a)。变量连续、取值充满区间——和离散的分布列本质不同。</span>';
  }
  cSlider(s0.ctrl, '均值 \u03bc', p.mu, -2, 2, 0.5, function (v) { p.mu = v; draw(); });
  cSlider(s0.ctrl, '标准差 \u03c3', p.sigma, 0.4, 2, 0.1, function (v) { p.sigma = v; draw(); });
  cSlider(s0.ctrl, '区域宽 c（\u00b1c\u03c3）', p.c, 0.5, 3, 0.5, function (v) { p.c = v; draw(); });
  draw();
}
