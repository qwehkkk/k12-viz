/* ===== 小学六年级下册（p6b） ===== */

function p6bTxt(ctx, x, y, t, color, big, center) {
  ctx.fillStyle = color || '#2c3e50';
  ctx.font = (big ? 'bold 20' : 'bold 15') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign = center ? 'center' : 'left';
  ctx.fillText(t, x, y);
  ctx.textAlign = 'left';
}

/* 负数：温度计 / 数轴 / 比大小 / 海拔 */
function p6bNegLab(el, cfg) {
  var p = Object.assign({ mode: 0, t: 12, v: -3, t2: 5, alt: 200 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), T = Math.round(p.t), V = Math.round(p.v), T2 = Math.round(p.t2), ALT = Math.round(p.alt);
  var info = s0.info;

  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';

    if (mode === 0) {
      p6bTxt(ctx, 60, 45, '温度计就是一支竖着的数轴', '#2c3e50', 1);
      var cx = 190, yTop = 70, yBot = 345, lo = -20, hi = 40;
      function ty(v) { return yBot - (v - lo) / (hi - lo) * (yBot - yTop); }
      // 管身
      ctx.fillStyle = '#f4f8fc'; ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.rect(cx - 16, yTop, 32, yBot - yTop); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, yBot + 18, 24, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // 刻度
      var k;
      for (k = lo; k <= hi; k += 10) {
        ctx.strokeStyle = k === 0 ? '#2c3e50' : '#c2cdd8';
        ctx.lineWidth = k === 0 ? 2 : 1;
        ctx.beginPath(); ctx.moveTo(cx - 16, ty(k)); ctx.lineTo(cx + (k === 0 ? 24 : 10), ty(k)); ctx.stroke();
        p6bTxt(ctx, cx + 30, ty(k), k + '℃', k === 0 ? '#2c3e50' : '#6b7a89', 0);
      }
      // 液柱
      var y0 = ty(0), yv = ty(T);
      ctx.fillStyle = T >= 0 ? '#c0392b' : '#185fa5';
      if (T >= 0) ctx.fillRect(cx - 7, yv, 14, yBot + 18 - yv);
      else ctx.fillRect(cx - 7, y0, 14, yv - y0);
      ctx.beginPath(); ctx.arc(cx, yBot + 18, 17, 0, Math.PI * 2); ctx.fill();
      // 说明
      var side = T > 0 ? '零上' : T < 0 ? '零下' : '正好在分界';
      p6bTxt(ctx, 350, 120, '当前温度：' + T + '℃', T >= 0 ? '#c0392b' : '#185fa5', 1);
      p6bTxt(ctx, 350, 160, '读作：' + side + Math.abs(T) + '摄氏度', '#2c3e50');
      p6bTxt(ctx, 350, 200, T + ' ' + (T > 0 ? '>' : T < 0 ? '<' : '=') + ' 0', '#c0392b', 1);
      p6bTxt(ctx, 350, 246, '0 是正负的分界，不是最小的数', '#6b7a89');
      p6bTxt(ctx, 350, 282, T < 0 ? '零下的温度用负数表示' : '零上的温度用正数表示', '#0f6e56');
      p6bTxt(ctx, 350, 318, '−20℃ 比 −5℃ 更冷：越靠下越小', '#6b7a89');
    } else if (mode === 1) {
      p6bTxt(ctx, 60, 45, '把数放到数轴上', '#2c3e50', 1);
      var ax0 = 80, ax1 = 570, ay = 210, LO = -10, HI = 10;
      function ax(v) { return ax0 + (v - LO) / (HI - LO) * (ax1 - ax0); }
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ax0 - 20, ay); ctx.lineTo(ax1 + 20, ay); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ax1 + 20, ay); ctx.lineTo(ax1 + 8, ay - 7); ctx.lineTo(ax1 + 8, ay + 7); ctx.closePath();
      ctx.fillStyle = '#2c3e50'; ctx.fill();
      var kk;
      for (kk = LO; kk <= HI; kk++) {
        var big = kk % 5 === 0;
        ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(ax(kk), ay); ctx.lineTo(ax(kk), ay + (big ? 10 : 6)); ctx.stroke();
        if (big) p6bTxt(ctx, ax(kk), ay + 26, String(kk), kk === 0 ? '#2c3e50' : '#6b7a89', 0, 1);
      }
      // 0 标注
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(ax(0), ay - 34); ctx.lineTo(ax(0), ay + 12); ctx.stroke();
      p6bTxt(ctx, ax(0), ay - 48, '0', '#c0392b', 1, 1);
      // 点
      ctx.fillStyle = V >= 0 ? '#c0392b' : '#185fa5';
      ctx.beginPath(); ctx.arc(ax(V), ay, 7, 0, Math.PI * 2); ctx.fill();
      p6bTxt(ctx, ax(V), ay - 26, String(V), V >= 0 ? '#c0392b' : '#185fa5', 1, 1);
      p6bTxt(ctx, 60, 300, V === 0 ? '0 在原点，既不是正数也不是负数'
        : V > 0 ? V + ' 在 0 右边 ' + V + ' 格 → 正数'
          : '−' + (-V) + ' 在 0 左边 ' + (-V) + ' 格 → 负数', V === 0 ? '#6b7a89' : (V > 0 ? '#c0392b' : '#185fa5'), 1);
      p6bTxt(ctx, 60, 336, '相反数：分居 0 两侧、离 0 一样远（如 3 与 −3）', '#6b7a89');
      p6bTxt(ctx, 60, 366, '数轴三要素：原点、正方向、单位长度', '#0f6e56');
    } else if (mode === 2) {
      p6bTxt(ctx, 60, 45, '谁在右边谁就大', '#2c3e50', 1);
      function thermo(cx, t, name) {
        var yTop = 85, yBot = 320, lo = -20, hi = 40;
        function ty(v) { return yBot - (v - lo) / (hi - lo) * (yBot - yTop); }
        ctx.fillStyle = '#f4f8fc'; ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.rect(cx - 13, yTop, 26, yBot - yTop); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, yBot + 14, 19, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1;
        var k;
        for (k = lo; k <= hi; k += 10) {
          ctx.beginPath(); ctx.moveTo(cx - 13, ty(k)); ctx.lineTo(cx + 8, ty(k)); ctx.stroke();
        }
        ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(cx - 30, ty(0)); ctx.lineTo(cx + 30, ty(0)); ctx.stroke();
        p6bTxt(ctx, cx - 40, ty(0), '0', '#2c3e50', 0);
        var y0 = ty(0), yv = ty(t);
        ctx.fillStyle = t >= 0 ? '#c0392b' : '#185fa5';
        if (t >= 0) ctx.fillRect(cx - 6, yv, 12, yBot + 14 - yv);
        else ctx.fillRect(cx - 6, y0, 12, yv - y0);
        ctx.beginPath(); ctx.arc(cx, yBot + 14, 14, 0, Math.PI * 2); ctx.fill();
        p6bTxt(ctx, cx, yBot + 44, name + '：' + t + '℃', t >= 0 ? '#c0392b' : '#185fa5', 1, 1);
      }
      thermo(180, T, '甲');
      thermo(380, T2, '乙');
      var cmp = T > T2 ? '>' : T < T2 ? '<' : '=';
      p6bTxt(ctx, 280, 160, cmp === '>' ? '甲更暖' : cmp === '<' ? '乙更暖' : '一样暖', '#c0392b', 0, 1);
      p6bTxt(ctx, 60, 350, T + '℃ ' + cmp + ' ' + T2 + '℃', '#2c3e50', 1);
      p6bTxt(ctx, 60, 380, Math.abs(T) > Math.abs(T2)
        ? '数字大的反而小：负号后面越远，数越小'
        : '在数轴上找位置，右边的大', '#6b7a89');
    } else {
      p6bTxt(ctx, 60, 45, '海拔：以海平面为 0', '#2c3e50', 1);
      var sx = 210, yTop2 = 70, yBot2 = 350, sea = 210;
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sx, yTop2); ctx.lineTo(sx, yBot2); ctx.stroke();
      // 海平面
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sx - 90, sea); ctx.lineTo(sx + 90, sea); ctx.stroke();
      p6bTxt(ctx, sx + 100, sea, '海平面 0 米', '#185fa5', 0);
      // 刻度
      var k2;
      for (k2 = -400; k2 <= 400; k2 += 100) {
        var yy = sea - k2 / 400 * 140;
        ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(sx - 12, yy); ctx.lineTo(sx, yy); ctx.stroke();
        if (k2 !== 0) p6bTxt(ctx, sx - 20, yy, (k2 > 0 ? '+' : '') + k2, '#6b7a89', 0, 2);
      }
      // 当前点
      var yA = sea - ALT / 400 * 140;
      ctx.fillStyle = ALT > 0 ? '#c0392b' : ALT < 0 ? '#185fa5' : '#6b7a89';
      ctx.beginPath(); ctx.arc(sx, yA, 7, 0, Math.PI * 2); ctx.fill();
      p6bTxt(ctx, sx + 16, yA, '海拔 ' + ALT + ' 米', ALT >= 0 ? '#c0392b' : '#185fa5', 1);
      // 地块示意
      ctx.fillStyle = '#e8f3ec';
      if (ALT >= 0) { ctx.fillRect(sx - 120, sea - 6, 110, 130); ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.5; ctx.strokeRect(sx - 120, sea - 6, 110, 130); }
      else { ctx.fillRect(sx - 120, sea + 6, 110, 60); ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.5; ctx.strokeRect(sx - 120, sea + 6, 110, 60); }
      p6bTxt(ctx, 60, 372, ALT > 0 ? '高于海平面 ' + ALT + ' 米，记作 +' + ALT + ' 米'
        : ALT < 0 ? '低于海平面 ' + (-ALT) + ' 米，记作 ' + ALT + ' 米' : '与海平面齐平，记作 0 米', '#2c3e50', 1);
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '0 是**分界**，不是最小的数。'
        : mode === 1 ? '数轴上**右边的数大**。'
          : mode === 2 ? '负数比大小：**绝对值大的反而小**。'
            : '先定**基准**，再定正负。') + '</span>';
  }

  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) cSlider(s0.ctrl, '温度', T, -20, 40, 1, function (v) { T = v; p.t = v; draw(); });
  if (mode === 1) cSlider(s0.ctrl, '这个数', V, -10, 10, 1, function (v) { V = v; p.v = v; draw(); });
  if (mode === 2) {
    cSlider(s0.ctrl, '甲气温', T, -20, 40, 5, function (v) { T = v; p.t = v; draw(); });
    cSlider(s0.ctrl, '乙气温', T2, -20, 40, 5, function (v) { T2 = v; p.t2 = v; draw(); });
  }
  if (mode === 3) cSlider(s0.ctrl, '海拔', ALT, -400, 400, 50, function (v) { ALT = v; p.alt = v; draw(); });
  draw();
}

/* 百分数（二）：折扣 / 成数 / 税率 / 利率 */
function p6bPct2Lab(el, cfg) {
  var p = Object.assign({ mode: 0, price: 240, disc: 8, cheng: 2, rate: 5, money: 20000, yr: 3, ir: 2.75 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode);
  var PRICE = Math.round(p.price), DISC = Math.round(p.disc);
  var CH = Math.round(p.cheng), TAX = Math.round(p.rate);
  var MON = Math.round(p.money), YR = Math.round(p.yr), IR = Number(p.ir);
  var info = s0.info;

  function bar(ctx, x, y, bw, bh, frac, fill, label) {
    ctx.fillStyle = '#f4f8fc'; ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4;
    ctx.fillRect(x, y, bw, bh); ctx.strokeRect(x, y, bw, bh);
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, bw * frac, bh);
    ctx.strokeStyle = fill; ctx.lineWidth = 1.4; ctx.strokeRect(x, y, bw * frac, bh);
    if (label) p6bTxt(ctx, x + 8, y + bh / 2, label, '#2c3e50', 0);
  }

  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';

    if (mode === 0) {
      var d = DISC / 10, now = PRICE * d, save2 = PRICE - now;
      p6bTxt(ctx, 60, 45, DISC + ' 折 = 只收原价的 ' + (DISC * 10) + '%', '#2c3e50', 1);
      // 原价条
      p6bTxt(ctx, 60, 96, '原价', '#6b7a89');
      bar(ctx, 60, 108, 480, 46, 1, '#dceaf7', PRICE + ' 元');
      // 现价条
      p6bTxt(ctx, 60, 186, '现价（打 ' + DISC + ' 折）', '#6b7a89');
      bar(ctx, 60, 198, 480, 46, d, '#0f6e56', now + ' 元');
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(60 + 480 * d, 190); ctx.lineTo(60 + 480 * d, 252); ctx.stroke();
      ctx.setLineDash([]);
      p6bTxt(ctx, 60 + 480 * d + 10, 176, (DISC * 10) + '%', '#c0392b', 0);
      // 省下
      ctx.fillStyle = '#fdf0d5'; ctx.fillRect(60 + 480 * d, 198, 480 * (1 - d), 46);
      p6bTxt(ctx, 60 + 480 * d + 10, 221, '省 ' + save2 + ' 元', '#8a5a00', 0);
      p6bTxt(ctx, 60, 300, '现价 = 原价 × ' + (DISC * 10) + '% = ' + PRICE + ' × ' + d + ' = ' + now + ' 元', '#0f6e56', 1);
      p6bTxt(ctx, 60, 336, '省下的钱 = 原价 × (1 − ' + (DISC * 10) + '%) = ' + save2 + ' 元', '#c0392b', 1);
      p6bTxt(ctx, 60, 372, '注意：「打 ' + DISC + ' 折」是便宜 ' + (100 - DISC * 10) + '%，不是 80%', '#6b7a89');
    } else if (mode === 1) {
      var up = CH / 10, last = 500, nowY = last * (1 + up);
      p6bTxt(ctx, 60, 45, '增产 ' + CH + ' 成 = 比去年多 ' + (CH * 10) + '%', '#2c3e50', 1);
      p6bTxt(ctx, 60, 96, '去年（单位 1）', '#6b7a89');
      bar(ctx, 60, 108, 420, 44, 1, '#dceaf7', last + ' 千克');
      p6bTxt(ctx, 60, 186, '今年', '#6b7a89');
      bar(ctx, 60, 198, 420, 44, Math.min(1, 1 / (1 + up)), '#0f6e56', '');
      // 增量块
      ctx.fillStyle = '#fdf0d5'; ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 1.4;
      ctx.fillRect(60 + 420 / (1 + up), 198, 420 - 420 / (1 + up), 44);
      ctx.strokeRect(60 + 420 / (1 + up), 198, 420 - 420 / (1 + up), 44);
      p6bTxt(ctx, 60 + 420 / (1 + up) + 8, 220, '+' + (nowY - last) + ' 千克', '#8a5a00', 0);
      p6bTxt(ctx, 60, 278, '今年 = 去年 × (1 + ' + (CH * 10) + '%) = 500 × ' + (1 + up) + ' = ' + nowY + ' 千克', '#0f6e56', 1);
      p6bTxt(ctx, 60, 314, '「增产几成」里，' + '去年的产量是单位 1', '#c0392b', 1);
      p6bTxt(ctx, 60, 350, '反求去年：' + nowY + ' ÷ ' + (1 + up) + ' = 500 千克（用除法）', '#6b7a89');
      p6bTxt(ctx, 60, 380, '几成 = 十分之几：' + CH + ' 成 = ' + CH + '/10 = ' + (CH * 10) + '%', '#6b7a89');
    } else if (mode === 2) {
      var biz = 80000, tax = biz * TAX / 100, net = biz - tax;
      p6bTxt(ctx, 60, 45, '营业额 ' + biz + ' 元，税率 ' + TAX + '%', '#2c3e50', 1);
      var bw2 = 480;
      bar(ctx, 60, 110, bw2, 52, 1, '#dceaf7', '');
      ctx.fillStyle = '#c0392b'; ctx.fillRect(60, 110, bw2 * TAX / 100, 52);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.4; ctx.strokeRect(60, 110, bw2 * TAX / 100, 52);
      p6bTxt(ctx, 60 + 8, 136, '税 ' + tax + ' 元', TAX >= 8 ? '#fff' : '#2c3e50', 0);
      p6bTxt(ctx, 60 + bw2 * TAX / 100 + 10, 136, '净收入 ' + net + ' 元', '#185fa5', 0);
      p6bTxt(ctx, 60, 210, '应纳税额 = 计税金额 × 税率', '#2c3e50', 1);
      p6bTxt(ctx, 60, 246, '= ' + biz + ' × ' + TAX + '% = ' + tax + ' 元', '#c0392b', 1);
      p6bTxt(ctx, 60, 288, '税后收入 = ' + biz + ' − ' + tax + ' = ' + net + ' 元', '#0f6e56');
      p6bTxt(ctx, 60, 328, '税率是国家规定的百分率，不同项目不同', '#6b7a89');
      p6bTxt(ctx, 60, 362, '读题先认清「计税金额」是营业额还是利润', '#6b7a89');
    } else {
      var interest = MON * IR / 100 * YR, total = MON + interest;
      p6bTxt(ctx, 60, 45, '本金 ' + MON + ' 元，年利率 ' + IR + '%，存 ' + YR + ' 年', '#2c3e50', 1);
      // 本金块 + 每年利息块
      ctx.fillStyle = '#dceaf7'; ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.5;
      ctx.fillRect(60, 96, 150, 120); ctx.strokeRect(60, 96, 150, 120);
      p6bTxt(ctx, 135, 140, '本金', '#185fa5', 0, 1);
      p6bTxt(ctx, 135, 166, MON + ' 元', '#185fa5', 0, 1);
      var k, yb = 96;
      for (k = 0; k < YR; k++) {
        var per = MON * IR / 100;
        var hh = Math.max(16, 120 * per / (interest || 1) / Math.max(1, YR) * 1.2);
        ctx.fillStyle = '#fdf0d5'; ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 1.3;
        ctx.fillRect(230 + k * 56, 216 - hh, 44, hh); ctx.strokeRect(230 + k * 56, 216 - hh, 44, hh);
        p6bTxt(ctx, 252 + k * 56, 216 - hh / 2, '年' + (k + 1), '#8a5a00', 0, 1);
        p6bTxt(ctx, 252 + k * 56, 232, per + '', '#8a5a00', 0, 1);
      }
      p6bTxt(ctx, 60, 268, '每年利息 = 本金 × 利率 = ' + MON + ' × ' + IR + '% = ' + (MON * IR / 100) + ' 元', '#8a5a00');
      p6bTxt(ctx, 60, 302, '利息 = 本金 × 利率 × 时间 = ' + interest + ' 元', '#c0392b', 1);
      p6bTxt(ctx, 60, 338, '到期取回 = 本金 + 利息 = ' + MON + ' + ' + interest + ' = ' + total + ' 元', '#0f6e56', 1);
      p6bTxt(ctx, 60, 374, '年利率配年数，月利率配月数——单位要对齐', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '折扣先**翻译成百分数**。'
        : mode === 1 ? '「几成」= 十分之几，**比字后面是单位 1**。'
          : mode === 2 ? '应纳税额 = **计税金额 × 税率**。'
            : '利息 = 本金 × 利率 × **时间**。') + '</span>';
  }

  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) {
    cSlider(s0.ctrl, '原价', PRICE, 100, 500, 20, function (v) { PRICE = v; p.price = v; draw(); });
    cSlider(s0.ctrl, '折扣', DISC, 2, 9, 1, function (v) { DISC = v; p.disc = v; draw(); });
  }
  if (mode === 1) cSlider(s0.ctrl, '增产成数', CH, 1, 9, 1, function (v) { CH = v; p.cheng = v; draw(); });
  if (mode === 2) cSlider(s0.ctrl, '税率 %', TAX, 3, 20, 1, function (v) { TAX = v; p.rate = v; draw(); });
  if (mode === 3) {
    cSlider(s0.ctrl, '本金', MON, 5000, 50000, 5000, function (v) { MON = v; p.money = v; draw(); });
    cSlider(s0.ctrl, '年利率 %', IR, 1, 5, 0.25, function (v) { IR = v; p.ir = v; draw(); });
    cSlider(s0.ctrl, '年数', YR, 1, 5, 1, function (v) { YR = v; p.yr = v; draw(); });
  }
  draw();
}

/* 圆柱与圆锥：侧面展开 / 体积 / 圆锥 / 倒沙 */
function p6bCylLab(el, cfg) {
  var p = Object.assign({ mode: 0, r: 3, h: 8, n: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), R = Number(p.r), H = Number(p.h), N = Math.round(p.n);
  var info = s0.info;

  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';

    if (mode === 0) {
      p6bTxt(ctx, 60, 40, '侧面展开：长 = 2πr，宽 = h', '#2c3e50', 1);
      // 圆柱
      var cx = 150, top = 110, bot = 280, rx = 46;
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2; ctx.fillStyle = '#dceaf7';
      ctx.beginPath(); ctx.moveTo(cx - rx, top); ctx.lineTo(cx - rx, bot); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + rx, top); ctx.lineTo(cx + rx, bot); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx, bot, rx, 14, 0, 0, Math.PI); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx, top, rx, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      p6bTxt(ctx, cx, (top + bot) / 2, 'r=' + R, '#185fa5', 0, 1);
      p6bTxt(ctx, cx, bot + 34, '圆柱', '#185fa5', 0, 1);
      // 展开长方形
      var maxW = 300, maxH = 170;
      var rw = Math.min(maxW, 2 * Math.PI * R * 14), rh = Math.min(maxH, H * 14);
      var bx = 330, by = 200 - rh / 2;
      ctx.fillStyle = '#e2f2ea'; ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2;
      ctx.fillRect(bx, by, rw, rh); ctx.strokeRect(bx, by, rw, rh);
      // 标注
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(bx, by + rh + 16); ctx.lineTo(bx + rw, by + rh + 16); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx, by + rh + 12); ctx.lineTo(bx, by + rh + 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx + rw, by + rh + 12); ctx.lineTo(bx + rw, by + rh + 20); ctx.stroke();
      p6bTxt(ctx, bx + rw / 2, by + rh + 32, '长 = 2πr = ' + (Math.round(2 * 3.14 * R * 100) / 100), '#0f6e56', 0, 1);
      ctx.beginPath(); ctx.moveTo(bx - 16, by); ctx.lineTo(bx - 16, by + rh); ctx.stroke();
      p6bTxt(ctx, bx - 22, by + rh / 2, 'h=' + H, '#0f6e56', 0, 2);
      // 箭头
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(232, 230); ctx.lineTo(320, 210); ctx.stroke();
      ctx.setLineDash([]);
      p6bTxt(ctx, 60, 340, '侧面积 = 底面周长 × 高 = 2πrh = ' + (Math.round(2 * 3.14 * R * H * 100) / 100), '#2c3e50', 1);
      p6bTxt(ctx, 60, 372, '表面积 = 侧面积 + 2πr²（无盖只加一个底）', '#6b7a89');
    } else if (mode === 1) {
      var v = Math.round(3.14 * R * R * H * 100) / 100;
      p6bTxt(ctx, 60, 40, '一层层圆片叠起来：V = πr²h', '#2c3e50', 1);
      var cx2 = 200, baseY = 330, rr = 26 + R * 12, layerH = 12;
      var n = Math.min(10, Math.max(2, Math.round(H)));
      var k;
      for (k = 0; k < n; k++) {
        var yy = baseY - k * layerH;
        ctx.fillStyle = k % 2 ? '#dceaf7' : '#e2f2ea';
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.ellipse(cx2, yy, rr, 10, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(cx2 - rr, baseY); ctx.lineTo(cx2 - rr, baseY - n * layerH); ctx.stroke();
      p6bTxt(ctx, cx2 - rr - 8, baseY - n * layerH / 2, 'h=' + H, '#2c3e50', 0, 2);
      p6bTxt(ctx, cx2, baseY + 34, '底面积 = πr² = ' + (Math.round(3.14 * R * R * 100) / 100), '#185fa5', 0, 1);
      p6bTxt(ctx, 380, 130, 'V = 底面积 × 高', '#2c3e50', 1);
      p6bTxt(ctx, 380, 172, '= 3.14 × ' + R + '² × ' + H, '#185fa5');
      p6bTxt(ctx, 380, 214, '= ' + v, '#c0392b', 1);
      p6bTxt(ctx, 60, 372, '底面积 × 高，和长方体是同一个公式', '#6b7a89');
    } else if (mode === 2) {
      p6bTxt(ctx, 60, 40, '圆锥：一个底面、一个顶点、一条高', '#2c3e50', 1);
      var apx = 250, apexY = 90, by = 300, brx = 30 + R * 14;
      ctx.fillStyle = '#e2f2ea'; ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(apx, apexY); ctx.lineTo(apx - brx, by); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(apx, apexY); ctx.lineTo(apx + brx, by); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(apx, by, brx, 13, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // 高
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.6; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(apx, apexY); ctx.lineTo(apx, by); ctx.stroke();
      ctx.setLineDash([]);
      p6bTxt(ctx, apx + 8, (apexY + by) / 2, '高 h', '#c0392b', 0);
      // 母线
      p6bTxt(ctx, apx + brx / 2 + 6, (apexY + by) / 2 - 14, '母线 l', '#0f6e56', 0);
      p6bTxt(ctx, apx, by + 36, '底面半径 r = ' + R, '#0f6e56', 0, 1);
      p6bTxt(ctx, apx, apexY - 24, '顶点', '#2c3e50', 0, 1);
      p6bTxt(ctx, 60, 356, '高 = 顶点到底面圆心的距离，只有一条', '#2c3e50', 1);
      p6bTxt(ctx, 60, 386, '母线是斜边，比高长：l² = h² + r²', '#6b7a89');
    } else {
      p6bTxt(ctx, 60, 40, '等底等高：倒 3 次正好装满', '#2c3e50', 1);
      // 圆锥杯
      var ccx = 160, cTop = 130, cBot = 300, crx = 60;
      ctx.fillStyle = '#fdf0d5'; ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ccx - crx, cTop); ctx.lineTo(ccx + crx, cTop); ctx.lineTo(ccx + 6, cBot); ctx.lineTo(ccx - 6, cBot); ctx.closePath();
      ctx.fill(); ctx.stroke();
      if (N > 0) {
        ctx.fillStyle = '#f0c987';
        var frac = 1 - N / 3 * 0;
        ctx.beginPath(); ctx.ellipse(ccx, cTop + 12, crx - 4, 8, 0, 0, Math.PI * 2); ctx.fill();
      }
      p6bTxt(ctx, ccx, cTop - 20, '圆锥（满杯）', '#8a5a00', 0, 1);
      // 圆柱
      var gx = 360, gTop = 110, gBot = 310, grx = 70;
      ctx.fillStyle = '#f4f8fc'; ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(gx - grx, gTop); ctx.lineTo(gx - grx, gBot); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx + grx, gTop); ctx.lineTo(gx + grx, gBot); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(gx, gBot, grx, 14, 0, 0, Math.PI); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(gx, gTop, grx, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // 液面
      var level = gBot - (N / 3) * (gBot - gTop);
      if (N > 0) {
        ctx.fillStyle = '#f0c987';
        ctx.beginPath(); ctx.ellipse(gx, gBot - 2, grx - 2, 12, 0, 0, Math.PI); ctx.fill();
        ctx.fillRect(gx - grx + 2, level, 2 * (grx - 2), gBot - level - 2);
        ctx.beginPath(); ctx.ellipse(gx, level, grx - 2, 12, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.ellipse(gx, level, grx - 2, 12, 0, 0, Math.PI * 2); ctx.stroke();
      }
      p6bTxt(ctx, gx, gTop - 20, '圆柱（等底等高）', '#185fa5', 0, 1);
      // 箭头
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ccx + crx + 6, 200); ctx.lineTo(gx - grx - 8, 200); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx - grx - 8, 200); ctx.lineTo(gx - grx - 18, 195); ctx.lineTo(gx - grx - 18, 205); ctx.closePath();
      ctx.fillStyle = '#c0392b'; ctx.fill();
      p6bTxt(ctx, 60, 348, '已倒 ' + N + ' 次，圆柱里装了 ' + Math.round(N / 3 * 100) + '%', '#c0392b', 1);
      p6bTxt(ctx, 60, 378, 'V锥 = 1/3 × 底面积 × 高 = 圆柱体积的 1/3', '#2c3e50', 1);
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '侧面展开是**长方形**：长 2πr、宽 h。'
        : mode === 1 ? '圆柱体积 = **底面积 × 高**。'
          : mode === 2 ? '圆锥的**高只有一条**，别和高混母线。'
            : '圆锥体积 = **1/3** × 底面积 × 高。') + '</span>';
  }

  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0 || mode === 1 || mode === 2) {
    cSlider(s0.ctrl, '底面半径', R, 1, 5, 0.5, function (v) { R = v; p.r = v; draw(); });
  }
  if (mode === 0 || mode === 1) cSlider(s0.ctrl, '高', H, 2, 12, 1, function (v) { H = v; p.h = v; draw(); });
  if (mode === 3) cSlider(s0.ctrl, '倒入次数', N, 0, 3, 1, function (v) { N = v; p.n = v; draw(); });
  draw();
}

/* 比例：内项外项 / 正比例 / 反比例 / 比例尺 */
function p6bPropLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 2, b: 3, x: 4, cm: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var X = Math.round(p.x), CM2 = Number(p.cm);
  var info = s0.info;

  function axes(ctx, x0, y0, x1, y1, xlab, ylab) {
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.stroke();
    p6bTxt(ctx, x1 - 4, y0 + 18, xlab, '#6b7a89', 0, 2);
    p6bTxt(ctx, x0 - 6, y1 - 8, ylab, '#6b7a89', 0, 2);
    p6bTxt(ctx, x0 - 8, y0 + 14, '0', '#6b7a89', 0, 2);
  }

  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';

    if (mode === 0) {
      var c = A * 3, d = B * 3;
      p6bTxt(ctx, 60, 40, '外项之积 = 内项之积', '#2c3e50', 1);
      // 比例式
      var y1 = 120, y2 = 210;
      p6bTxt(ctx, 140, y1, String(A), '#c0392b', 1, 1);
      p6bTxt(ctx, 200, y1, ':', '#2c3e50', 1, 1);
      p6bTxt(ctx, 260, y1, String(B), '#185fa5', 1, 1);
      p6bTxt(ctx, 330, y1, '=', '#2c3e50', 1, 1);
      p6bTxt(ctx, 400, y1, String(c), '#185fa5', 1, 1);
      p6bTxt(ctx, 460, y1, ':', '#2c3e50', 1, 1);
      p6bTxt(ctx, 520, y1, String(d), '#c0392b', 1, 1);
      p6bTxt(ctx, 140, y1 - 34, '外项', '#c0392b', 0, 1);
      p6bTxt(ctx, 520, y1 - 34, '外项', '#c0392b', 0, 1);
      p6bTxt(ctx, 260, y1 - 34, '内项', '#185fa5', 0, 1);
      p6bTxt(ctx, 400, y1 - 34, '内项', '#185fa5', 0, 1);
      // 交叉线
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(140, y1 + 18); ctx.lineTo(520, y1 + 18); ctx.stroke();
      ctx.strokeStyle = '#185fa5';
      ctx.beginPath(); ctx.moveTo(260, y1 + 18); ctx.lineTo(400, y1 + 18); ctx.stroke();
      p6bTxt(ctx, 60, 280, '外项：' + A + ' × ' + d + ' = ' + (A * d), '#c0392b', 1);
      p6bTxt(ctx, 60, 318, '内项：' + B + ' × ' + c + ' = ' + (B * c), '#185fa5', 1);
      p6bTxt(ctx, 60, 356, (A * d === B * c ? '两者相等 → 这确实是一个比例' : '两者不等 → 不能组成比例'), '#0f6e56', 1);
      p6bTxt(ctx, 60, 386, '解比例就是把未知数放进这个等式', '#6b7a89');
    } else if (mode === 1) {
      var k = 5;
      p6bTxt(ctx, 60, 40, '正比例：单价一定，总价 ÷ 数量 = 5', '#2c3e50', 1);
      var x0 = 100, y0 = 330, x1 = 560, y1b = 90;
      axes(ctx, x0, y0, x1, y1b, '数量', '总价');
      function px2(u) { return x0 + u / 10 * (x1 - x0 - 20); }
      function py2(v) { return y0 - v / 50 * (y0 - y1b - 10); }
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(px2(0), py2(0)); ctx.lineTo(px2(10), py2(50)); ctx.stroke();
      var i;
      for (i = 1; i <= 5; i++) {
        ctx.fillStyle = '#185fa5';
        ctx.beginPath(); ctx.arc(px2(i), py2(i * k), 4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = '#c0392b';
      ctx.beginPath(); ctx.arc(px2(X), py2(X * k), 6, 0, Math.PI * 2); ctx.fill();
      p6bTxt(ctx, px2(X) + 10, py2(X * k) - 14, '(' + X + ', ' + X * k + ')', '#c0392b', 0);
      p6bTxt(ctx, 60, 366, '数量 ×' + X + ' → 总价 ×' + X + '：两者同向变化', '#c0392b', 1);
      p6bTxt(ctx, 380, 120, '比值一定', '#185fa5', 1);
      p6bTxt(ctx, 380, 154, '图像是过原点的直线', '#6b7a89');
    } else if (mode === 2) {
      p6bTxt(ctx, 60, 40, '反比例：速度 × 时间 = 120（一定）', '#2c3e50', 1);
      var ax0 = 100, ay0 = 330, ax1 = 560, ay1 = 90;
      axes(ctx, ax0, ay0, ax1, ay1, '速度', '时间');
      function px3(u) { return ax0 + u / 12 * (ax1 - ax0 - 20); }
      function py3(v) { return ay0 - v / 30 * (ay0 - ay1 - 10); }
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.5;
      ctx.beginPath();
      var i2, first = true;
      for (i2 = 4; i2 <= 120; i2++) {
        var u = i2 / 10, v = 120 / u;
        if (v > 30) continue;
        var xx = px3(u), yy = py3(v);
        if (first) { ctx.moveTo(xx, yy); first = false; } else ctx.lineTo(xx, yy);
      }
      ctx.stroke();
      var uu = Math.max(4, Math.min(30, X));
      ctx.fillStyle = '#c0392b';
      ctx.beginPath(); ctx.arc(px3(uu), py3(120 / uu), 6, 0, Math.PI * 2); ctx.fill();
      p6bTxt(ctx, px3(uu) + 10, py3(120 / uu) - 14, '(' + uu + ', ' + (Math.round(120 / uu * 10) / 10) + ')', '#c0392b', 0);
      p6bTxt(ctx, 60, 366, '速度变大 → 时间变小，乘积始终是 120', '#c0392b', 1);
      p6bTxt(ctx, 400, 120, '乘积一定', '#c0392b', 1);
      p6bTxt(ctx, 400, 154, '图像是曲线，不是直线', '#6b7a89');
    } else {
      var realKm = CM2 * 50;
      p6bTxt(ctx, 60, 40, '比例尺 1 : 5000000 → 图上 1 cm 表示实际 50 km', '#2c3e50', 1);
      // 尺子
      var sx = 60, sy = 130, seg = 60;
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + seg * 6, sy); ctx.stroke();
      var k2;
      for (k2 = 0; k2 <= 6; k2++) {
        ctx.beginPath(); ctx.moveTo(sx + k2 * seg, sy); ctx.lineTo(sx + k2 * seg, sy - (k2 % 2 ? 8 : 14)); ctx.stroke();
        p6bTxt(ctx, sx + k2 * seg, sy + 16, String(k2), '#6b7a89', 0, 1);
      }
      p6bTxt(ctx, sx, sy - 34, '图上（cm）', '#6b7a89');
      // 实际距离条
      var ry = 230;
      ctx.fillStyle = '#dceaf7'; ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.5;
      ctx.fillRect(sx, ry, Math.min(480, CM2 * 60), 40); ctx.strokeRect(sx, ry, Math.min(480, CM2 * 60), 40);
      p6bTxt(ctx, sx + 8, ry + 20, realKm + ' km', '#185fa5', 1);
      p6bTxt(ctx, sx, ry - 18, '实际（km）', '#185fa5', 0);
      p6bTxt(ctx, 60, 310, '实际距离 = 图上距离 ÷ 比例尺 = ' + CM2 + ' × 5000000 cm', '#2c3e50', 1);
      p6bTxt(ctx, 60, 346, '= ' + (CM2 * 5000000) + ' cm = ' + realKm + ' km', '#c0392b', 1);
      p6bTxt(ctx, 60, 382, '比例尺没有单位，算之前先统一成同一单位', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**外项积 = 内项积**，解比例靠它。'
        : mode === 1 ? '正比例：**商一定**，图像过原点成直线。'
          : mode === 2 ? '反比例：**积一定**，图像是曲线。'
            : '比例尺 = 图上 ÷ 实际，**单位先统一**。') + '</span>';
  }

  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) {
    cSlider(s0.ctrl, '前项', A, 1, 9, 1, function (v) { A = v; p.a = v; draw(); });
    cSlider(s0.ctrl, '后项', B, 1, 9, 1, function (v) { B = v; p.b = v; draw(); });
  }
  if (mode === 1) cSlider(s0.ctrl, '数量', X, 1, 10, 1, function (v) { X = v; p.x = v; draw(); });
  if (mode === 2) cSlider(s0.ctrl, '速度', X, 4, 30, 2, function (v) { X = v; p.x = v; draw(); });
  if (mode === 3) cSlider(s0.ctrl, '图上距离 cm', CM2, 1, 8, 1, function (v) { CM2 = v; p.cm = v; draw(); });
  draw();
}

/* 鸽巢问题 */
function p6bPigeonLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 7, m: 3, color: 3, k: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n), M = Math.round(p.m), CO = Math.round(p.color), K = Math.round(p.k);
  var info = s0.info;

  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';

    if (mode === 0) {
      var q = Math.floor(N / M), rr = N % M;
      p6bTxt(ctx, 60, 42, N + ' 只鸽子放进 ' + M + ' 个巢', '#2c3e50', 1);
      // 巢
      var cw = Math.min(150, 560 / M), gap = 16, x0 = (640 - (M * cw + (M - 1) * gap)) / 2;
      var i, j;
      for (i = 0; i < M; i++) {
        var bx = x0 + i * (cw + gap), by = 100, bh = 150;
        ctx.fillStyle = '#f4f8fc'; ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6;
        ctx.fillRect(bx, by, cw, bh); ctx.strokeRect(bx, by, cw, bh);
        p6bTxt(ctx, bx + cw / 2, by - 18, '巢 ' + (i + 1), '#6b7a89', 0, 1);
        // 分配：前 rr 个巢多 1 只
        var cnt = q + (i < rr ? 1 : 0);
        var show = Math.min(cnt, 6);
        for (j = 0; j < show; j++) {
          var dx = bx + 20 + (j % 3) * (cw - 40) / 2.2, dy = by + 34 + Math.floor(j / 3) * 44;
          ctx.fillStyle = i < rr ? '#c0392b' : '#185fa5';
          ctx.beginPath(); ctx.arc(dx, dy, 9, 0, Math.PI * 2); ctx.fill();
        }
        if (cnt > 6) p6bTxt(ctx, bx + cw / 2, by + bh - 12, '共 ' + cnt + ' 只', '#6b7a89', 0, 1);
        else p6bTxt(ctx, bx + cw / 2, by + bh - 12, cnt + ' 只', i < rr ? '#c0392b' : '#185fa5', 0, 1);
      }
      p6bTxt(ctx, 60, 288, N + ' ÷ ' + M + ' = ' + q + (rr ? ' …… ' + rr : ''), '#2c3e50', 1);
      p6bTxt(ctx, 60, 324, '总有一个巢至少 ' + (rr ? q + 1 : q) + ' 只' + (rr ? '（商 ' + q + ' + 1）' : '（整除，不加 1）'), '#c0392b', 1);
      p6bTxt(ctx, 60, 360, '红点 = 多出来的 ' + rr + ' 只，落进前 ' + rr + ' 个巢', '#6b7a89');
      p6bTxt(ctx, 60, 390, '鸽巢原理只说「至少」，不指定是哪一个', '#6b7a89');
    } else if (mode === 1) {
      var worst = CO, need = CO + 1;
      p6bTxt(ctx, 60, 42, CO + ' 种颜色的球，保证有 2 个同色', '#2c3e50', 1);
      // 颜色块
      var col = ['#c0392b', '#185fa5', '#0f6e56', '#8a5a00'];
      var i3;
      for (i3 = 0; i3 < CO; i3++) {
        var bx2 = 70 + i3 * 130;
        ctx.fillStyle = col[i3]; ctx.beginPath(); ctx.arc(bx2, 120, 16, 0, Math.PI * 2); ctx.fill();
        p6bTxt(ctx, bx2, 158, '第 ' + (i3 + 1) + ' 种', '#6b7a89', 0, 1);
        p6bTxt(ctx, bx2, 186, '先摸 1 个', '#6b7a89', 0, 1);
      }
      p6bTxt(ctx, 60, 236, '最不利：每种颜色各摸 1 个，共 ' + worst + ' 个', '#8a5a00', 1);
      p6bTxt(ctx, 60, 272, '再摸 1 个，无论什么颜色都会与之一同色', '#2c3e50', 1);
      p6bTxt(ctx, 60, 312, '保证数 = 最不利 + 1 = ' + worst + ' + 1 = ' + need + ' 个', '#c0392b', 1);
      p6bTxt(ctx, 60, 352, '「保证」= 把不达标的情况全用光，再多 1 个', '#6b7a89');
      p6bTxt(ctx, 60, 384, '注意问的是「同色」而不是「某一种颜色」', '#6b7a89');
    } else if (mode === 2) {
      var each = 5, other = (CO - 1) * each, need2 = other + K;
      p6bTxt(ctx, 60, 42, CO + ' 种颜色各 ' + each + ' 个，保证摸到 ' + K + ' 个同色', '#2c3e50', 1);
      var col2 = ['#c0392b', '#185fa5', '#0f6e56', '#8a5a00'];
      var i4, j4;
      for (i4 = 0; i4 < CO; i4++) {
        var bx3 = 70 + i4 * 130;
        p6bTxt(ctx, bx3, 96, '第 ' + (i4 + 1) + ' 种', '#6b7a89', 0, 1);
        for (j4 = 0; j4 < each; j4++) {
          ctx.fillStyle = col2[i4];
          ctx.beginPath(); ctx.arc(bx3 - 22 + (j4 % 3) * 22, 130 + Math.floor(j4 / 3) * 24, 8, 0, Math.PI * 2); ctx.fill();
        }
      }
      p6bTxt(ctx, 60, 240, '最不利：其他 ' + (CO - 1) + ' 种全摸完 = ' + other + ' 个', '#8a5a00', 1);
      p6bTxt(ctx, 60, 276, '再摸 ' + K + ' 个（同一种）就达标', '#2c3e50', 1);
      p6bTxt(ctx, 60, 316, '保证数 = ' + other + ' + ' + K + ' = ' + need2 + ' 个', '#c0392b', 1);
      p6bTxt(ctx, 60, 356, '若问「2 个同色」：各摸 1 个再 +1 = ' + (CO + 1) + ' 个', '#0f6e56');
      p6bTxt(ctx, 60, 388, '看清「同色」还是「指定的那种颜色」', '#6b7a89');
    } else {
      var per = Math.max(1, Math.floor((N - 1) / M));
      p6bTxt(ctx, 60, 42, '说理：假设每个巢最多 ' + per + ' 只', '#2c3e50', 1);
      var i5;
      for (i5 = 0; i5 < M; i5++) {
        var bx4 = 80 + i5 * 120, by4 = 110;
        ctx.fillStyle = '#f4f8fc'; ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6;
        ctx.fillRect(bx4, by4, 90, 110); ctx.strokeRect(bx4, by4, 90, 110);
        var j5, cnt2 = Math.min(per, 4);
        for (j5 = 0; j5 < cnt2; j5++) {
          ctx.fillStyle = '#c2cdd8';
          ctx.beginPath(); ctx.arc(bx4 + 26 + (j5 % 2) * 38, by4 + 30 + Math.floor(j5 / 2) * 38, 9, 0, Math.PI * 2); ctx.fill();
        }
        p6bTxt(ctx, bx4 + 45, by4 - 16, '最多 ' + per + ' 只', '#6b7a89', 0, 1);
      }
      p6bTxt(ctx, 60, 258, M + ' 个巢 × ' + per + ' 只 = ' + (M * per) + ' 只', '#c0392b', 1);
      p6bTxt(ctx, 60, 294, '可实际有 ' + N + ' 只，' + N + ' > ' + (M * per) + '，放不下', '#2c3e50', 1);
      p6bTxt(ctx, 60, 330, '→ 假设不成立，必有一个巢至少 ' + (per + 1) + ' 只', '#0f6e56', 1);
      p6bTxt(ctx, 60, 366, '说理三步：假设 → 算出容量不足 → 矛盾得结论', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '至少数 = **商 + 1**（有余数时）。'
        : mode === 1 ? '保证 = 最不利情况 + **1**。'
          : mode === 2 ? '先摸完**其他颜色**，再摸目标色。'
            : '假设每个抽屉不超标，推出**总数不够**。') + '</span>';
  }

  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) {
    cSlider(s0.ctrl, '鸽子数', N, 1, 12, 1, function (v) { N = v; p.n = v; draw(); });
    cSlider(s0.ctrl, '巢数', M, 2, 5, 1, function (v) { M = v; p.m = v; draw(); });
  }
  if (mode === 1) cSlider(s0.ctrl, '颜色数', CO, 2, 4, 1, function (v) { CO = v; p.color = v; draw(); });
  if (mode === 2) {
    cSlider(s0.ctrl, '颜色数', CO, 2, 4, 1, function (v) { CO = v; p.color = v; draw(); });
    cSlider(s0.ctrl, '保证几个同色', K, 2, 4, 1, function (v) { K = v; p.k = v; draw(); });
  }
  if (mode === 3) {
    cSlider(s0.ctrl, '鸽子数', N, 3, 12, 1, function (v) { N = v; p.n = v; draw(); });
    cSlider(s0.ctrl, '巢数', M, 2, 5, 1, function (v) { M = v; p.m = v; draw(); });
  }
  draw();
}
