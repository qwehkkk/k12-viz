/* ===== 小学五年级上册（p5a） ===== */
/* 人教版五年级上册 7 个 viz 组件 */
function p5aFmt(intStr, digits) {
  // 整数字符串 + 小数位数 → 小数字符串（去末尾 0）
  if (digits <= 0) return intStr;
  while (intStr.length <= digits) intStr = '0' + intStr;
  var s = intStr.slice(0, intStr.length - digits) + '.' + intStr.slice(intStr.length - digits);
  s = s.replace(/0+$/, '').replace(/\.$/, '');
  return s;
}
function p5aShift(intStr, digits, k) {
  // 小数点右移 k 位后的数字字符串（digits 为原小数位数）
  var total = digits - k, s = intStr;
  if (total > 0) { while (s.length <= total) s = '0' + s; s = s.slice(0, s.length - total) + '.' + s.slice(s.length - total); }
  else if (total < 0) { for (var i = 0; i < -total; i++) s += '0'; }
  return s;
}

/* 小数乘法 */
function p5aDecmulLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 8, da: 1, b: 3, x: 12, km: 8 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), DA = Math.round(p.da), B = Math.round(p.b),
    X = Math.round(p.x), KM = Math.round(p.km);
  var info = s0.info;
  function line(ctx, x, y, t, color, big) {
    ctx.fillStyle = color || '#2c3e50';
    ctx.font = (big ? 'bold 20' : 'bold 17') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(t, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, j;
    if (mode === 0) {
      var prod = A * B;
      var num = p5aFmt(String(A), DA);
      line(ctx, 60, 60, num + ' × ' + B + ' = ?', '#2c3e50', 1);
      line(ctx, 60, 105, '第 1 步：把小数点藏起来', '#6b7a89');
      line(ctx, 60, 140, '按整数乘：' + A + ' × ' + B + ' = ' + prod, '#185fa5');
      line(ctx, 60, 180, '第 2 步：放回小数点', '#6b7a89');
      line(ctx, 60, 215, '因数共 ' + DA + ' 位小数 → 积也 ' + DA + ' 位', '#185fa5');
      line(ctx, 60, 260, p5aFmt(String(prod), DA), '#c0392b', 1);
      line(ctx, 60, 315, '0.' + A + ' 里有 ' + A + ' 个 0.01，乘 ' + B + ' 后个数也 ×' + B, '#0f6e56', 0);
    } else if (mode === 1) {
      var cs = 27, gx = 160, gy = 352;
      line(ctx, 60, 40, '0.' + A + ' × 0.' + B + '：两色重叠占几格？', '#2c3e50', 1);
      for (i = 0; i < 10; i++) for (j = 0; j < 10; j++) {
        var blue = i < A, yel = j < B, both = blue && yel;
        ctx.fillStyle = both ? '#0f6e56' : blue ? '#dceaf7' : yel ? '#fdf0d5' : '#fff';
        ctx.fillRect(gx + i * cs, gy - (j + 1) * cs, cs - 2, cs - 2);
        ctx.strokeStyle = both ? '#0f6e56' : '#c2cdd8'; ctx.lineWidth = both ? 2 : 1;
        ctx.strokeRect(gx + i * cs, gy - (j + 1) * cs, cs - 2, cs - 2);
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('1 米² = 100 格（每格 0.01 米²）', gx + 40, gy + 26);
      var prod2 = A * B;
      line(ctx, 470, 120, '0.' + A + ' × 0.' + B, '#2c3e50', 1);
      line(ctx, 470, 155, A + ' × ' + B + ' = ' + prod2, '#185fa5');
      line(ctx, 470, 190, '共 1 + 1 = 2 位小数', '#185fa5');
      line(ctx, 470, 230, '= ' + p5aFmt(String(prod2), 2), '#c0392b', 1);
      line(ctx, 470, 275, '重叠 ' + prod2 + ' 格 = ' + p5aFmt(String(prod2), 2) + ' 米²', '#0f6e56');
    } else if (mode === 2) {
      var xv = X / 10, pr = Math.round(A * xv * 100) / 100;
      line(ctx, 60, 60, A + ' × ' + xv.toFixed(1) + ' = ' + (Math.round(pr * 100) / 100), '#2c3e50', 1);
      line(ctx, 60, 110, '第二个因数 ' + xv.toFixed(1) + (xv > 1 ? ' > 1' : xv < 1 ? ' < 1' : ' = 1'), '#185fa5');
      line(ctx, 60, 150, xv > 1 ? '乘比 1 大的数 → 积变大' : xv < 1 ? '乘比 1 小的数 → 积变小' : '乘 1 → 积不变', '#c0392b', 1);
      line(ctx, 60, 200, '积 ' + (Math.round(pr * 100) / 100) + (pr > A ? ' > ' : pr < A ? ' < ' : ' = ') + A, '#0f6e56');
      line(ctx, 60, 255, '估算检查：0.9 × 6.4 的积应比 6.4 小', '#6b7a89');
      line(ctx, 60, 290, '打折 = 乘一个比 1 小的数，越乘越便宜', '#6b7a89');
    } else {
      var over = Math.max(0, KM - 3), fee = 8 + over * 1.8;
      line(ctx, 60, 55, '出租车：3 千米内 8 元，超出每千米 1.8 元', '#2c3e50', 1);
      line(ctx, 60, 110, '里程 ' + KM + ' 千米 → 分两段算', '#6b7a89');
      var bx = 70, bw = 500, kx = bx + bw * 3 / 15, cx2 = bx + bw * KM / 15;
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 10; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(bx, 160); ctx.lineTo(bx + bw, 160); ctx.stroke();
      ctx.strokeStyle = '#185fa5'; ctx.beginPath(); ctx.moveTo(bx, 160); ctx.lineTo(Math.min(kx, cx2), 160); ctx.stroke();
      ctx.strokeStyle = '#e67e22'; ctx.beginPath(); ctx.moveTo(Math.min(kx, cx2), 160); ctx.lineTo(cx2, 160); ctx.stroke();
      ctx.lineCap = 'butt';
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('0', bx - 4, 185); ctx.fillText('3 千米', kx - 14, 185); ctx.fillText('15', bx + bw - 8, 185);
      ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(cx2, 160, 7, 0, Math.PI * 2); ctx.fill();
      line(ctx, 60, 240, '① 起步段：3 千米 → 8 元（只加一次）', '#185fa5');
      line(ctx, 60, 275, '② 超出段：' + over + ' × 1.8 = ' + (Math.round(over * 18) / 10) + ' 元', '#185fa5');
      line(ctx, 60, 315, '合计 8 + ' + (Math.round(over * 18) / 10) + ' = ' + (Math.round(fee * 10) / 10) + ' 元', '#c0392b', 1);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '先按**整数乘**，再点小数点。'
        : mode === 1 ? '积的位数 = 两个因数**小数位数之和**。'
          : mode === 2 ? '因数比 1 大积变大，比 1 小积变小。'
            : '分段计费：**起步价 + 超出量 × 单价**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, 'A', A, 2, 99, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, 'A 的小数位', DA, 1, 2, 1, function (v) { DA = v; p.da = v; draw(); });
  cSlider(s0.ctrl, 'B', B, 1, 9, 1, function (v) { B = v; p.b = v; draw(); });
  cSlider(s0.ctrl, 'x（0.1 步进）', X, 5, 20, 1, function (v) { X = v; p.x = v; draw(); });
  cSlider(s0.ctrl, '里程', KM, 1, 15, 1, function (v) { KM = v; p.km = v; draw(); });
  draw();
}

/* 位置（数对） */
function p5aPosLab(el, cfg) {
  var p = Object.assign({ mode: 0, col: 3, row: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), COL = Math.min(6, Math.max(1, Math.round(p.col))), ROW = Math.min(5, Math.max(1, Math.round(p.row)));
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var cs = 52, gx = 100, gy = 330, i, j;
    ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    for (i = 0; i < 6; i++) {
      var on = (mode === 0 || mode === 2) && (i + 1) === COL;
      ctx.fillStyle = on ? '#185fa5' : '#6b7a89';
      ctx.fillText((i + 1) + ' 列', gx + i * cs + cs / 2, 385);
    }
    for (j = 0; j < 5; j++) {
      var on2 = (mode === 0 || mode === 2) && (j + 1) === ROW;
      ctx.fillStyle = on2 ? '#0f6e56' : '#6b7a89';
      ctx.textAlign = 'right';
      ctx.fillText((j + 1) + ' 行', gx - 10, gy - j * cs - cs / 2);
      ctx.textAlign = 'center';
    }
    for (j = 0; j < 5; j++) for (i = 0; i < 6; i++) {
      var x = gx + i * cs, y = gy - (j + 1) * cs;
      var isCol = (i + 1) === COL, isRow = (j + 1) === ROW, isSelf = isCol && isRow;
      var fill = '#f4f7fa';
      if (mode === 0 || mode === 2) { if (isCol) fill = '#dceaf7'; if (isRow) fill = '#e2f2ea'; if (isSelf) fill = '#0f6e56'; }
      if (mode === 1 && isSelf) fill = '#185fa5';
      if (mode === 3 && isSelf) fill = '#e67e22';
      ctx.fillStyle = fill; ctx.fillRect(x + 2, y + 2, cs - 4, cs - 4);
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1; ctx.strokeRect(x + 2, y + 2, cs - 4, cs - 4);
    }
    if (mode === 3) {
      var sx0 = gx + cs / 2, sy0 = gy - cs * 1.5;
      var tx0 = gx + (COL - 0.5) * cs, ty0 = gy - (ROW - 0.5) * cs;
      ctx.strokeStyle = '#e67e22'; ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(sx0, sy0); ctx.lineTo(tx0, sy0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(tx0, sy0); ctx.lineTo(tx0, ty0); ctx.stroke();
      ctx.fillStyle = '#e67e22';
      ctx.beginPath(); ctx.arc(tx0, ty0 - 8, 7, 0, Math.PI * 2); ctx.fill();
    }
    ctx.textAlign = 'left';
    function line(x, y, t, color, big) {
      ctx.fillStyle = color || '#2c3e50';
      ctx.font = (big ? 'bold 20' : 'bold 16') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(t, x, y);
    }
    if (mode === 0) {
      line(420, 80, '竖排叫列（从左往右数）', '#185fa5');
      line(420, 115, '横排叫行（从前往后数）', '#0f6e56');
      line(420, 160, '目标：第 ' + COL + ' 列第 ' + ROW + ' 行', '#c0392b', 1);
      line(420, 205, '先数列，再数行', '#6b7a89');
      line(420, 240, '两条线一交，位置唯一', '#6b7a89');
    } else if (mode === 1) {
      line(420, 80, '先列后行，写数对：', '#6b7a89');
      line(420, 125, '(' + COL + ', ' + ROW + ')', '#185fa5', 1);
      line(420, 170, '第 ' + COL + ' 列 → 第一个数', '#6b7a89');
      line(420, 205, '第 ' + ROW + ' 行 → 第二个数', '#6b7a89');
      line(420, 250, '(3,2) 和 (2,3) 位置不同！', '#c0392b');
    } else if (mode === 2) {
      line(420, 80, '同列：第一个数相同', '#185fa5', 1);
      line(420, 115, '第 ' + COL + ' 列一整列都是', '#185fa5');
      line(420, 155, '同行：第二个数相同', '#0f6e56', 1);
      line(420, 190, '第 ' + ROW + ' 行一整排都是', '#0f6e56');
      line(420, 235, '如 (' + COL + ', 1)、(' + COL + ', 5) 同列', '#6b7a89');
      line(420, 270, '如 (1, ' + ROW + ')、(6, ' + ROW + ') 同行', '#6b7a89');
    } else {
      line(420, 80, '从 (1,1) 走到 (' + COL + ',' + ROW + ')：', '#2c3e50', 1);
      line(420, 120, '向右 ' + (COL - 1) + ' 格：列 +' + (COL - 1) + '，行不变', '#185fa5');
      line(420, 150, '(1,1) → (' + COL + ',1)', '#185fa5');
      line(420, 190, '向上 ' + (ROW - 1) + ' 格：行 +' + (ROW - 1) + '，列不变', '#0f6e56');
      line(420, 220, '(' + COL + ',1) → (' + COL + ',' + ROW + ')', '#0f6e56');
      line(420, 265, '左右改列、上下改行', '#c0392b');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**竖排是列、横排是行**。'
        : mode === 1 ? '数对 **(列, 行)**，顺序不能反。'
          : mode === 2 ? '同列第一个数相同，**同行第二个数相同**。'
            : '平移只改一个数：**横向改列、纵向改行**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '列', COL, 1, 6, 1, function (v) { COL = v; p.col = v; draw(); });
  cSlider(s0.ctrl, '行', ROW, 1, 5, 1, function (v) { ROW = v; p.row = v; draw(); });
  draw();
}

/* 小数除法 */
function p5aDecdivLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 224, da: 1, b: 7, x: 6, y: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), DA = Math.round(p.da), B = Math.round(p.b),
    X = Math.round(p.x), Y = Math.round(p.y);
  var info = s0.info;
  function line(ctx, x, y, t, color, big) {
    ctx.fillStyle = color || '#2c3e50';
    ctx.font = (big ? 'bold 20' : 'bold 17') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(t, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    if (mode === 0) {
      var dv = p5aFmt(String(A), DA);
      var qstr;
      if (A % B === 0) qstr = p5aFmt(String(A / B), DA);
      else {
        var ipq = Math.floor(A / B), rq = A % B, dsq = [], kq;
        for (kq = 0; kq < 4; kq++) { rq *= 10; dsq.push(Math.floor(rq / B)); rq = rq % B; if (rq === 0) break; }
        qstr = ipq + (dsq.length ? '.' + dsq.join('') : '');
      }
      line(ctx, 60, 55, dv + ' ÷ ' + B + ' = ' + qstr, '#2c3e50', 1);
      line(ctx, 60, 105, '竖式动作和整数除法完全一样', '#6b7a89');
      ctx.font = 'bold 26px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillStyle = '#2c3e50';
      var qx = 320, qy = 160;
      var dvDigits = dv.replace('.', '');
      var dotPos = dv.indexOf('.');
      var intLen = dotPos >= 0 ? dotPos : dv.length;
      var qIntLen = qstr.indexOf('.') >= 0 ? qstr.indexOf('.') : qstr.length;
      var qOff = Math.max(0, intLen - qIntLen);
      ctx.fillText(dv, qx + 60, qy + 70);
      ctx.fillText(String(B), qx - 16, qy + 70);
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(qx + 26, qy + 38); ctx.lineTo(qx + 26, qy + 94); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(qx + 26, qy + 38); ctx.lineTo(qx + 56, qy + 56); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(qx + 26, qy + 94); ctx.lineTo(qx + 74 + dv.length * 20, qy + 94); ctx.stroke();
      ctx.fillStyle = '#c0392b';
      ctx.fillText(qstr, qx + 60 + qOff * 20, qy);
      ctx.fillStyle = '#e67e22';
      var qdot = qstr.indexOf('.');
      if (dotPos >= 0 && qdot >= 0) {
        var col1 = qx + 60 + dotPos * 20 + 7, col2 = qx + 60 + (qOff + qdot) * 20 + 7;
        ctx.beginPath(); ctx.arc(col1, qy + 70, 3.2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(col2, qy, 3.2, 0, Math.PI * 2); ctx.fill();
        ctx.setLineDash([3, 4]); ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(col1, qy + 56); ctx.lineTo(col2, qy + 16); ctx.stroke();
        ctx.setLineDash([]);
      }
      line(ctx, 60, 275, '橙色圆点 + 虚线：商的小数点与被除数的小数点上下对齐', '#e67e22');
      line(ctx, 60, 310, '整数部分不够商 1，先商 0 占位（0.56 ÷ 7 = 0.08）', '#0f6e56');
    } else if (mode === 1) {
      var r0 = X, digs = [], rem = r0, k, rr = r0, done = false;
      var remSeq = [rem];
      for (k = 0; k < 5 && !done; k++) {
        var t = rr * 10, dgt = Math.floor(t / Y);
        digs.push(dgt); rr = t - dgt * Y; remSeq.push(rr);
        if (rr === 0) done = true;
      }
      var decStr2 = digs.join('');
      line(ctx, 60, 55, X + ' ÷ ' + Y + '：整数部分不够商 1', '#2c3e50', 1);
      line(ctx, 60, 100, '① 商 0 点小数点，得 0.', '#185fa5');
      line(ctx, 60, 140, '② 添 0：' + (X * 10) + ' ÷ ' + Y + ' = ' + Math.floor(X * 10 / Y) + ' 余 ' + (X * 10 % Y), '#185fa5');
      line(ctx, 60, 180, '③ 继续添 0 除下去：' + X + ' ÷ ' + Y + ' = 0.' + decStr2 + (done ? '' : '……'), '#c0392b', 1);
      line(ctx, 60, 230, '依据：小数末尾添 0，大小不变（' + X + ' = ' + X + '.000…）', '#0f6e56');
      line(ctx, 60, 265, '余数序列：' + remSeq.slice(0, 6).join(' → ') + (done ? '' : ' …'), '#6b7a89');
      line(ctx, 60, 305, done ? '余数为 0，除尽得到有限小数' : '余数一直不归零 → 除不尽 → 循环小数', '#6b7a89');
    } else if (mode === 2) {
      var ip = Math.floor(X / Y), rem2 = X % Y;
      var digits3 = [], seen = {}, cycStart = -1, seq = [];
      var r3 = rem2, n3;
      for (n3 = 0; n3 < 14; n3++) {
        if (seen[r3] !== undefined) { cycStart = seen[r3]; break; }
        seen[r3] = n3; seq.push(r3);
        var t3 = r3 * 10; digits3.push(Math.floor(t3 / Y)); r3 = t3 % Y;
        if (r3 === 0) break;
      }
      var cyc = cycStart >= 0 ? digits3.slice(cycStart) : [];
      line(ctx, 60, 55, X + ' ÷ ' + Y + ' = ' + ip + (digits3.length ? '.' + digits3.join('') : ''), '#2c3e50', 1);
      line(ctx, 60, 100, '商的小数部分：', '#6b7a89');
      ctx.font = 'bold 24px "PingFang SC","Microsoft YaHei",sans-serif';
      var dx0 = 60;
      for (i = 0; i < digits3.length; i++) {
        var inCyc = cycStart >= 0 && i >= cycStart;
        ctx.fillStyle = inCyc ? '#c0392b' : '#2c3e50';
        ctx.fillText(String(digits3[i]), dx0 + i * 30, 140);
        if (inCyc) { ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2; ctx.strokeRect(dx0 + i * 30 - 10, 122, 24, 32); }
      }
      line(ctx, 60, 190, cyc.length ? '红框 = 循环节「' + cyc.join('') + '」，记作 ' + ip + '.' +
        digits3.slice(0, cycStart).join('') +
        (cyc.length === 1 ? cyc[0] + '̇' : cyc[0] + ' ' + cyc[cyc.length - 1] + ' ̇（首尾点点）')
        : (r3 === 0 ? '余数为 0，是有限小数，不循环' : ''), '#c0392b');
      line(ctx, 60, 240, '余数 ' + (cycStart >= 0 ? '重复出现 → 商跟着循环' : '序列：' + seq.slice(0, 8).join('→')), '#0f6e56');
      line(ctx, 60, 285, '除不尽 = 无限小数；重复 = 循环小数', '#6b7a89');
    } else {
      var shifted = p5aShift(String(A), DA, Y);
      line(ctx, 60, 55, p5aFmt(String(A), DA) + ' ÷ 0.' + Y, '#2c3e50', 1);
      line(ctx, 60, 100, '依据：商不变性质——两边同乘同一个数，商不变', '#6b7a89');
      line(ctx, 60, 140, '除数 0.' + Y + ' → ' + Y + '（小数点右移 ' + Y.toString().length + ' 位）', '#185fa5');
      line(ctx, 60, 175, '被除数 ' + p5aFmt(String(A), DA) + ' → ' + shifted + '（同步右移，不够补 0）', '#185fa5');
      line(ctx, 60, 220, '变成整数除法：' + shifted + ' ÷ ' + Y + ' = ' + (A / Y), '#c0392b', 1);
      line(ctx, 60, 265, '口诀：看除数——它有几位小数，两边一起移几位', '#0f6e56');
      line(ctx, 60, 300, '高频错误：只移除数、忘了被除数', '#c0392b');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '商的小数点**与被除数对齐**。'
        : mode === 1 ? '末尾添 0 大小不变，**能一直除下去**。'
          : mode === 2 ? '余数重复 → 商**循环**。'
            : '看除数移几位，**两边同步移**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '被除数（整数）', A, 10, 999, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, '小数位', DA, 0, 2, 1, function (v) { DA = v; p.da = v; draw(); });
  cSlider(s0.ctrl, '除数', B, 2, 9, 1, function (v) { B = v; p.b = v; draw(); });
  cSlider(s0.ctrl, '被除数（添0）', X, 1, 9, 1, function (v) { X = v; p.x = v; draw(); });
  cSlider(s0.ctrl, '除数（添0/移位）', Y, 2, 9, 1, function (v) { Y = v; p.y = v; draw(); });
  draw();
}

/* 可能性 */
function p5aPossLab(el, cfg) {
  var p = Object.assign({ mode: 0, r: 5, b: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), R = Math.round(p.r), B = Math.round(p.b);
  var info = s0.info;
  function line(ctx, x, y, t, color, big) {
    ctx.fillStyle = color || '#2c3e50';
    ctx.font = (big ? 'bold 20' : 'bold 17') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(t, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, total = R + B;
    // 盒子与球
    var bx = 70, by = 110, bw = 180, bh = 150;
    ctx.fillStyle = '#fff8ee'; ctx.fillRect(bx, by, bw, bh);
    ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 3; ctx.strokeRect(bx, by, bw, bh);
    ctx.fillStyle = '#8a5a00'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('摸球盒', bx + 8, by - 14);
    var per = Math.ceil((R + B) / 8), cols = Math.max(R, B) > 4 ? 5 : Math.max(R, B, 1);
    var rad = 11;
    for (i = 0; i < R; i++) {
      var px = bx + 22 + (i % 5) * 32, py = by + 30 + Math.floor(i / 5) * 30;
      ctx.fillStyle = '#d0453e'; ctx.beginPath(); ctx.arc(px, py, rad, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#a8332d'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    for (i = 0; i < B; i++) {
      var px2 = bx + 22 + ((R + i) % 5) * 32, py2 = by + 30 + Math.floor((R + i) / 5) * 30;
      ctx.fillStyle = '#3a6fd0'; ctx.beginPath(); ctx.arc(px2, py2, rad, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#2c55a5'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('红 ' + R + ' 个', bx, by + bh + 22);
    ctx.fillText('蓝 ' + B + ' 个', bx + 70, by + bh + 22);
    // 数量对比条
    var tbx = 300, tbw = 220;
    ctx.fillStyle = '#d0453e'; ctx.fillRect(tbx, 120, total ? tbw * R / Math.max(total, 1) : 0, 26);
    ctx.fillStyle = '#3a6fd0'; ctx.fillRect(tbx, 156, total ? tbw * B / Math.max(total, 1) : 0, 26);
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1; ctx.strokeRect(tbx, 120, tbw, 26); ctx.strokeRect(tbx, 156, tbw, 26);
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('红 ' + R, tbx + tbw + 12, 133); ctx.fillText('蓝 ' + B, tbx + tbw + 12, 169);
    function line2(x, y, t, color, big) { line(ctx, x, y, t, color, big); }
    if (mode === 0) {
      line2(300, 60, '判断：摸出一个红球', '#2c3e50', 1);
      if (R > 0 && B === 0) { line2(300, 220, '盒里只有红球 → 一定', '#c0392b', 1); line2(300, 255, '（也可以说：不可能摸到蓝球）', '#6b7a89'); }
      else if (R === 0) { line2(300, 220, '盒里没有红球 → 不可能', '#6b7a89', 1); line2(300, 255, '全部是蓝球时红球绝无机会', '#6b7a89'); }
      else { line2(300, 220, '有红有蓝 → 可能', '#0f6e56', 1); line2(300, 255, '红蓝都在，摸到谁说不准', '#6b7a89'); }
    } else if (mode === 1) {
      line2(300, 60, '可能性有大有小', '#2c3e50', 1);
      if (!total) line2(300, 220, '盒子里没有球', '#6b7a89');
      else {
        line2(300, 220, R > B ? '红球多 → 摸到红球可能性大' : R < B ? '蓝球多 → 摸到蓝球可能性大' : '红蓝一样多 → 可能性相等', '#c0392b', 1);
        line2(300, 260, '但可能性大 ≠ 一定！每次摸球都可能出意外', '#e67e22');
        line2(300, 295, '数量对比条越长，机会越大', '#6b7a89');
      }
    } else if (mode === 2) {
      line2(300, 60, '规则：摸到红甲赢，摸到蓝乙赢', '#2c3e50', 1);
      line2(300, 220, R === B ? '红蓝数量相等 → 公平！' : (R > B ? '红多 → 甲占优，不公平' : '蓝多 → 乙占优，不公平'), R === B ? '#0f6e56' : '#c0392b', 1);
      line2(300, 260, R === B ? '双方赢的可能性一样大' : '改法：把两种球数量调成相等', '#6b7a89');
      line2(300, 295, '公平只看可能性是否相等', '#0f6e56');
    } else {
      line2(300, 60, '把要求翻译成数量', '#2c3e50', 1);
      var rows = [
        ['一定摸到红球', '只放红球（蓝 = 0）'],
        ['不可能摸到蓝球', '蓝 = 0'],
        ['摸到红可能性大', '红 > 蓝'],
        ['游戏公平', '红 = 蓝']
      ];
      for (i = 0; i < rows.length; i++) {
        line2(300, 110 + i * 38, '要求「' + rows[i][0] + '」→ ' + rows[i][1], '#2c3e50');
      }
      line2(300, 290, '当前摆法：' + R + ' 红 ' + B + ' 蓝 —— 对照左表看看满足哪条？', '#0f6e56');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '一定 / 可能 / 不可能，**看条件里有什么**。'
        : mode === 1 ? '**数量多的可能性大**，但不等于一定。'
          : mode === 2 ? '**可能性相等才公平**。'
            : '设计题 = 把要求**反向翻译**成数量。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '红球', R, 0, 9, 1, function (v) { R = v; p.r = v; draw(); });
  cSlider(s0.ctrl, '蓝球', B, 0, 9, 1, function (v) { B = v; p.b = v; draw(); });
  draw();
}

/* 简易方程 */
function p5aEqLab(el, cfg) {
  var p = Object.assign({ mode: 0, diff: 30, x: 12, a: 6, b: 20, price: 8, total: 50 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), DIFF = Math.round(p.diff), X = Math.round(p.x),
    A = Math.round(p.a), B = Math.round(p.b), TY = Math.round(p.ty || 0),
    PRICE = Math.round(p.price), TOTAL = Math.round(p.total);
  var info = s0.info;
  function line(ctx, x, y, t, color, big) {
    ctx.fillStyle = color || '#2c3e50';
    ctx.font = (big ? 'bold 20' : 'bold 17') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(t, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    if (mode === 0) {
      line(ctx, 60, 60, '我 ' + X + ' 岁，爸爸比我大 ' + DIFF + ' 岁', '#2c3e50', 1);
      line(ctx, 60, 105, '爸爸的年龄：x + ' + DIFF, '#185fa5', 1);
      line(ctx, 60, 145, '代入 x = ' + X + '：' + X + ' + ' + DIFF + ' = ' + (X + DIFF), '#185fa5');
      line(ctx, 60, 190, 'x 换成任何数，式子 x + ' + DIFF + ' 都不用改', '#0f6e56');
      line(ctx, 60, 235, '一个字母式 = 一类关系的「照片」', '#c0392b');
      line(ctx, 60, 280, '乘号省略：a × 3 写成 3a（数字在前）', '#6b7a89');
      line(ctx, 60, 315, '1 × a 直接写 a', '#6b7a89');
    } else if (mode === 1) {
      var bx = 320;
      line(ctx, 60, 40, 'x + ' + A + ' = ' + B + '（天平平衡）', '#2c3e50', 1);
      // 底座与立柱
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(bx, 150); ctx.lineTo(bx, 300); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx - 70, 302); ctx.lineTo(bx + 70, 302); ctx.stroke();
      // 横梁
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(bx - 170, 150); ctx.lineTo(bx + 170, 150); ctx.stroke();
      ctx.fillStyle = '#2c3e50'; ctx.beginPath(); ctx.arc(bx, 150, 7, 0, Math.PI * 2); ctx.fill();
      function pan(cx3, label, blocks, color, tag) {
        ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx3, 150); ctx.lineTo(cx3, 205); ctx.stroke();
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(cx3 - 78, 205); ctx.lineTo(cx3 + 78, 205); ctx.stroke();
        var show = Math.min(blocks, 6);
        for (var k = 0; k < show; k++) {
          var bx2 = cx3 - show * 11 + k * 22;
          ctx.fillStyle = color; ctx.fillRect(bx2, 173, 20, 30);
          ctx.lineWidth = 1.6; ctx.strokeRect(bx2, 173, 20, 30);
          if (tag && k === 0) {
            ctx.fillStyle = '#185fa5'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
            ctx.textAlign = 'center'; ctx.fillText('x', bx2 + 10, 189); ctx.textAlign = 'left';
          }
        }
        if (blocks > show) {
          ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
          ctx.fillText('…', cx3 + 88, 189);
        }
        ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, cx3, 232);
        ctx.textAlign = 'left';
      }
      pan(bx - 130, 'x + ' + A, 1 + A, '#dceaf7', true);
      pan(bx + 130, String(B), B, '#e2f2ea', false);
      line(ctx, 60, 280, '左盘：一个 x 块 + ' + A + ' 个小砝码　右盘：' + B + ' 个小砝码', '#6b7a89');
      line(ctx, 60, 340, '两边同时拿走 ' + A + ' 克：x = ' + B + ' − ' + A + ' = ' + (B - A) + '，天平仍然平衡', '#c0392b', 1);
    } else if (mode === 2) {
      var types = ['x + a = b', 'x − a = b', 'a × x = b', 'x ÷ a = b'];
      var sols = ['x = b − a', 'x = b + a', 'x = b ÷ a', 'x = b × a'];
      line(ctx, 60, 50, '四种方程，同一招：卸掉 x 身上的操作', '#2c3e50', 1);
      for (i = 0; i < 4; i++) {
        var on = i === TY;
        ctx.fillStyle = on ? '#0f6e56' : '#c2cdd8';
        ctx.fillRect(60 + i * 140, 80, 120, 34);
        ctx.fillStyle = on ? '#fff' : '#6b7a89';
        ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(types[i], 78 + i * 140, 97);
      }
      line(ctx, 60, 155, '例：' + types[TY].replace('a', A).replace('b', B), '#185fa5', 1);
      line(ctx, 60, 200, '动作：' + sols[TY], '#6b7a89');
      var ans2 = TY === 0 ? B - A : TY === 1 ? B + A : TY === 2 ? (A ? Math.round(B / A * 100) / 100 : 0) : B * A;
      line(ctx, 60, 240, 'x = ' + ans2, '#c0392b', 1);
      var chk = TY === 0 ? ans2 + A : TY === 1 ? ans2 - A : TY === 2 ? ans2 * A : (A ? ans2 / A : 0);
      line(ctx, 60, 285, '验算：' + ans2 + (TY === 0 ? ' + ' : TY === 1 ? ' − ' : TY === 2 ? ' × ' : ' ÷ ') + A + ' = ' + (Math.round(chk * 100) / 100) + ' ✓', '#0f6e56');
      line(ctx, 60, 330, '加了就减、减了就加、乘了就除、除了就乘', '#6b7a89');
    } else {
      var back = 10, xAns = (TOTAL - back) / 5;
      line(ctx, 60, 50, '买 5 支笔付 ' + TOTAL + ' 元，找回 ' + back + ' 元', '#2c3e50', 1);
      line(ctx, 60, 95, '① 设每支笔 x 元', '#185fa5');
      line(ctx, 60, 130, '② 等量关系：笔钱 + 找回 = 付的钱', '#185fa5');
      line(ctx, 60, 165, '③ 列方程：5x + ' + back + ' = ' + TOTAL, '#c0392b', 1);
      line(ctx, 60, 200, '④ 解：5x = ' + (TOTAL - back) + '，x = ' + (Math.round(xAns * 100) / 100), '#c0392b', 1);
      line(ctx, 60, 235, '⑤ 验：5 × ' + (Math.round(xAns * 100) / 100) + ' + ' + back + ' = ' + TOTAL + ' ✓ → 答：每支 ' + (Math.round(xAns * 100) / 100) + ' 元', '#0f6e56');
      line(ctx, 60, 290, '方程法顺着题意列，不用倒着想', '#6b7a89');
      line(ctx, 60, 325, '找等量关系：「一共」「相差」「是几倍」', '#6b7a89');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '字母式是**一类关系的照片**。'
        : mode === 1 ? '等式两边**同变仍平衡**。'
          : mode === 2 ? '用**相反的操作**卸掉 x 身上的包袱。'
            : '列方程：**设 → 找关系 → 列 → 解 → 验**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '类型（模式2）', TY, 0, 3, 1, function (v) { TY = v; p.ty = v; draw(); });
  cSlider(s0.ctrl, '年龄差 / a', DIFF, 1, 40, 1, function (v) { DIFF = v; p.diff = v; A = Math.min(40, v); p.a = A; draw(); });
  cSlider(s0.ctrl, '我的年龄 / b', X, 1, 60, 1, function (v) { X = v; p.x = v; B = Math.min(60, v); p.b = B; draw(); });
  cSlider(s0.ctrl, '付的钱', TOTAL, 20, 100, 5, function (v) { TOTAL = v; p.total = v; draw(); });
  draw();
}

/* 多边形的面积 */
function p5aAreaLab(el, cfg) {
  var p = Object.assign({ mode: 0, b: 8, h: 4, a: 4, t: 0, cut: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), B = Math.round(p.b), H = Math.round(p.h), A2 = Math.min(B, Math.round(p.a)),
    T = p.t, CUT = Math.round(p.cut);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var sc = 26, x0 = 130, y0 = 320, i;
    function poly(pts, fill, stroke) {
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.closePath();
      ctx.fillStyle = fill; ctx.fill();
      ctx.strokeStyle = stroke || '#2c3e50'; ctx.lineWidth = 2; ctx.stroke();
    }
    function bl(u, v) { return [x0 + u * sc, y0 - v * sc]; }
    if (mode === 0) {
      var skew = 2, b4 = B / 2, h4 = H / 2;
      var A_ = bl(0, 0), Bp = bl(b4, 0), Cp = bl(b4 + skew, h4), Dp = bl(skew, h4);
      poly([A_, Bp, Cp, Dp], '#dceaf7');
      var piece = [[A_[0], A_[1]], [bl(skew, 0)[0], bl(skew, 0)[1]], [Dp[0], Dp[1]]];
      var dx = T * b4 * sc;
      ctx.save(); ctx.translate(dx, 0);
      poly(piece, '#f7cfae');
      ctx.restore();
      ctx.strokeStyle = '#8a5a00'; ctx.setLineDash([6, 4]); ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(bl(skew, 0)[0], bl(skew, 0)[1]); ctx.lineTo(Dp[0], Dp[1]); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('底 ' + B, x0 + b4 * sc - 24, y0 + 22);
      ctx.fillText('高 ' + H, bl(skew, 0)[0] + 6, y0 - h4 * sc / 2);
      var s = B * H;
      ctx.fillStyle = T >= 1 ? '#0f6e56' : '#6b7a89';
      ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(T >= 1 ? '长方形：S = ' + B + ' × ' + H + ' = ' + s + '，平行四边形同面积' : '橙色三角剪下 → 平移 → 补成长方形', 420, 120);
      if (T >= 1) ctx.fillText('S = 底 × 高 = ' + s, 420, 155);
    } else if (mode === 1) {
      var skew2 = 2, b5 = B / 2, h5 = H / 2, g = (1 - T) * 3;
      var T1 = [bl(0, 0), bl(b5, 0), bl(skew2, h5)];
      poly(T1, '#dceaf7');
      var T2 = [bl(b5 + g, 0), bl(skew2 + b5 + g, h5), bl(b5 + g, h5)];
      poly(T2, '#f7cfae');
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('底 ' + B, x0 + b5 * sc / 2 - 14, y0 + 22);
      var s2 = B * H / 2;
      ctx.fillStyle = '#6b7a89';
      ctx.fillText('蓝橙两个三角形完全一样', 420, 90);
      ctx.fillStyle = T >= 1 ? '#0f6e56' : '#6b7a89';
      ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(T >= 1 ? '拼成平行四边形：底 ' + B + ' × 高 ' + H + ' = ' + (B * H) : '复制一个，旋转拼上去', 420, 130);
      if (T >= 1) { ctx.fillText('三角形占一半：', 420, 165); ctx.fillText('S = ' + B + ' × ' + H + ' ÷ 2 = ' + s2, 420, 200); }
    } else if (mode === 2) {
      var h6 = H / 2, a5 = A2 / 2, b6 = B / 2, g2 = (1 - T) * 3;
      var Q1 = [bl(0, 0), bl(b6, 0), bl(a5 + 2, h6), bl(2, h6)];
      poly(Q1, '#dceaf7');
      var Q2 = [bl(b6 + g2, 0), bl(a5 + 2 + b6 + g2, h6), bl(a5 + 2 + g2, h6), bl(2 + b6 + g2, 0)];
      Q2 = [Q2[0], Q2[3], Q2[2], Q2[1]];
      poly(Q2, '#f7cfae');
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('下底 ' + B, x0 + b6 * sc - 26, y0 + 22);
      ctx.fillText('上底 ' + A2, x0 + (2 + a5 / 2) * sc - 12, y0 - h6 * sc - 16);
      var s3 = (A2 + B) * H / 2;
      ctx.fillStyle = T >= 1 ? '#0f6e56' : '#6b7a89';
      ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(T >= 1 ? '拼成的底 = 上底 + 下底 = ' + (A2 + B) : '两个完全一样的梯形倒扣拼合', 420, 110);
      if (T >= 1) ctx.fillText('S = (' + A2 + ' + ' + B + ') × ' + H + ' ÷ 2 = ' + s3, 420, 150);
    } else {
      var W = 10, Ht = 8, nw = 4, nh = 2;
      function rect(x, y, ww, hh, fill, lab) {
        poly([bl(x, y), bl(x + ww, y), bl(x + ww, y + hh), bl(x, y + hh)], fill);
        ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(lab, x0 + (x + ww / 2) * sc - 20, y0 - (y + hh / 2) * sc);
      }
      if (CUT === 0) {
        rect(0, 0, W - nw, Ht, '#dceaf7', (W - nw) + '×' + Ht + '=' + (W - nw) * Ht);
        rect(W - nw, 0, nw, Ht - nh, '#e2f2ea', nw + '×' + (Ht - nh) + '=' + nw * (Ht - nh));
        ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText('竖切：' + (W - nw) * Ht + ' + ' + nw * (Ht - nh) + ' = ' + (W - nw) * Ht + nw * (Ht - nh), 430, 110);
      } else if (CUT === 1) {
        rect(0, Ht - nh, W - nw, nh, '#e2f2ea', (W - nw) + '×' + nh + '=' + (W - nw) * nh);
        rect(0, 0, W, Ht - nh, '#dceaf7', W + '×' + (Ht - nh) + '=' + W * (Ht - nh));
        ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText('横切：' + (W - nw) * nh + ' + ' + W * (Ht - nh) + ' = ' + ((W - nw) * nh + W * (Ht - nh)), 430, 110);
      } else {
        rect(0, 0, W, Ht, '#f7e2c8', W + '×' + Ht + '=' + W * Ht);
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.fillRect(x0 + (W - nw) * sc, y0 - Ht * sc, nw * sc, nh * sc);
        ctx.strokeStyle = '#c0392b'; ctx.setLineDash([5, 4]); ctx.lineWidth = 1.8;
        ctx.strokeRect(x0 + (W - nw) * sc, y0 - Ht * sc, nw * sc, nh * sc);
        ctx.setLineDash([]);
        ctx.restore();
        ctx.fillStyle = '#c0392b'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText('添补：' + W * Ht + ' − ' + nw * nh + ' = ' + (W * Ht - nw * nh), 430, 110);
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('切法不同，答案相同 —— 互相验证', 430, 160);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '割补成长方形，**S = 底 × 高**。'
        : mode === 1 ? '双拼成平行四边形，**S = ah ÷ 2**。'
          : mode === 2 ? '拼合后底 = 上底 + 下底，**S = (a+b)h ÷ 2**。'
            : '组合图形：**分割相加**或**添补相减**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '底 / 下底', B, 4, 12, 1, function (v) { B = v; p.b = v; A2 = Math.min(A2, v); p.a = A2; draw(); });
  cSlider(s0.ctrl, '高', H, 2, 6, 1, function (v) { H = v; p.h = v; draw(); });
  cSlider(s0.ctrl, '上底', A2, 1, B, 1, function (v) { A2 = v; p.a = v; draw(); });
  cSlider(s0.ctrl, '拼合进度', T, 0, 1, 0.05, function (v) { T = v; p.t = v; draw(); });
  cSlider(s0.ctrl, '切法', CUT, 0, 2, 1, function (v) { CUT = v; p.cut = v; draw(); });
  draw();
}

/* 植树问题 */
function p5aTreeLab(el, cfg) {
  var p = Object.assign({ mode: 0, len: 20, gap: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), LEN = Math.round(p.len), GAP = Math.round(p.gap);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, n = LEN / GAP;
    function tree(x, y, sz) {
      ctx.fillStyle = '#8a5a00'; ctx.fillRect(x - 2, y - sz * 0.4, 4, sz * 0.4);
      ctx.beginPath(); ctx.moveTo(x, y - sz * 1.5); ctx.lineTo(x - sz * 0.55, y - sz * 0.4); ctx.lineTo(x + sz * 0.55, y - sz * 0.4); ctx.closePath();
      ctx.fillStyle = '#0f6e56'; ctx.fill(); ctx.strokeStyle = '#0a5040'; ctx.lineWidth = 1.5; ctx.stroke();
    }
    if (mode < 3) {
      var rx0 = 60, rx1 = 580, ry = 250, scale = (rx1 - rx0) / 40;
      var roadW = LEN * scale;
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 12; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(rx0, ry); ctx.lineTo(rx0 + roadW, ry); ctx.stroke();
      ctx.lineCap = 'butt';
      if (mode === 1) { ctx.fillStyle = '#b9b2a6'; ctx.fillRect(rx0 - 14, ry - 40, 14, 80); ctx.fillStyle = '#8a5a00'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif'; ctx.fillText('墙', rx0 - 12, ry - 50); }
      if (mode === 2) {
        ctx.fillStyle = '#b9b2a6'; ctx.fillRect(rx0 - 14, ry - 40, 14, 80); ctx.fillRect(rx0 + roadW, ry - 40, 14, 80);
        ctx.fillStyle = '#8a5a00'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText('楼', rx0 - 12, ry - 50); ctx.fillText('楼', rx0 + roadW + 2, ry - 50);
      }
      var count = 0, pos = [];
      if (mode === 0) for (i = 0; i <= n; i++) pos.push(i * GAP);
      if (mode === 1) for (i = 1; i <= n; i++) pos.push(i * GAP);
      if (mode === 2) for (i = 1; i < n; i++) pos.push(i * GAP);
      count = pos.length;
      for (i = 0; i < pos.length; i++) tree(rx0 + pos[i] * scale, ry - 6, 22);
      ctx.strokeStyle = '#e67e22'; ctx.lineWidth = 2;
      for (i = 0; i < n; i++) {
        var ax = rx0 + i * GAP * scale, bx3 = rx0 + (i + 1) * GAP * scale;
        ctx.beginPath(); ctx.moveTo(ax, ry + 22); ctx.lineTo(bx3, ry + 22); ctx.stroke();
        ctx.fillStyle = '#e67e22'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(String(i + 1), (ax + bx3) / 2 - 4, ry + 40);
      }
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 19px "PingFang SC","Microsoft YaHei",sans-serif';
      var tail = mode === 0 ? ' + 1' : mode === 2 ? ' − 1' : '';
      ctx.fillText(LEN + ' 米，每 ' + GAP + ' 米一段：间隔 ' + n + ' 个，棵数 ' + n + tail + ' = ' + count, 60, 70);
      ctx.fillStyle = '#6b7a89'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(mode === 0 ? '两端都栽：像手指，点比空多 1' : mode === 1 ? '一端不栽：棵数 = 间隔数' : '两端都不栽：棵数比间隔数少 1', 60, 105);
    } else {
      var cx3 = 200, cy3 = 210, rr3 = 110, n3 = Math.round(LEN / GAP);
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 10;
      ctx.beginPath(); ctx.arc(cx3, cy3, rr3, 0, Math.PI * 2); ctx.stroke();
      for (i = 0; i < n3; i++) {
        var ang = -Math.PI / 2 + i * Math.PI * 2 / n3;
        tree(cx3 + Math.cos(ang) * rr3, cy3 + Math.sin(ang) * rr3 + 4, 20);
      }
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 19px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('圆池周长 ' + LEN + ' 米：', 370, 90);
      ctx.fillText('间隔 ' + n3 + ' 个 → 棵数 ' + n3, 370, 125);
      ctx.fillStyle = '#c0392b'; ctx.fillText('封闭：棵数 = 间隔数（不 ±1）', 370, 165);
      ctx.fillStyle = '#6b7a89'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('锯木头：段数 − 1 = 次数', 370, 210);
      ctx.fillText('上楼梯：楼层差 = 走的层数', 370, 240);
      ctx.fillText('敲钟：间隔数 = 次数 − 1', 370, 270);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '两端都栽：棵数 = 间隔数 **+ 1**。'
        : mode === 1 ? '一端不栽：棵数 = **间隔数**。'
          : mode === 2 ? '两端都不栽：棵数 = 间隔数 **− 1**。'
            : '封闭路线：棵数 = **间隔数**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '路长', LEN, 8, 40, 1, function (v) { LEN = v; p.len = v; draw(); });
  cSlider(s0.ctrl, '每段长', GAP, 2, 8, 1, function (v) { GAP = v; p.gap = v; draw(); });
  draw();
}
