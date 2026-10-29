/* ===== 小学四年级上册：大数 / 公顷平方千米 / 角 / 三位数乘两位数 / 平行四边形梯形 / 两位数除法 / 条形图 / 优化 ===== */

/* 大数读法（纯函数，读 0..99999999） */
function p4Read4(d) {
  var D = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var U = ['', '十', '百', '千'];
  var s = '', zero = false, i, v, u;
  for (i = 0; i < 4; i++) {
    v = d[i]; u = U[3 - i];
    if (v === 0) { zero = true; continue; }
    if (zero && s) s += '零';
    zero = false;
    if (v === 1 && u === '十' && !s) s += '十';
    else s += D[v] + u;
  }
  return s;
}
function p4ReadNum(n) {
  if (n === 0) return '零';
  var s = String(n);
  while (s.length % 4 !== 0) s = '0' + s;
  var g1 = s.slice(0, s.length - 4).split('').map(Number);
  var g2 = s.slice(s.length - 4).split('').map(Number);
  var r1 = p4Read4(g1), r2 = p4Read4(g2);
  var out = '';
  if (r1) out += r1 + '万';
  if (r2) {
    if (out && g2[0] === 0) out += '零';
    out += r2;
  }
  return out;
}
function p4Digits(n, cols) {
  var s = String(n);
  while (s.length < cols) s = ' ' + s;
  return s.split('').map(function (c) { return c === ' ' ? '' : c; });
}

/* 大数的认识 */
function p4NumLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 24960000, b: 100101 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    var names = ['千万', '百万', '十万', '万', '千', '百', '十', '个'];
    var dg = p4Digits(A, 8);
    var cellW = Math.min(56, (w - 90) / 8), x0 = w - 40 - cellW * 8, y0 = 92, cellH = 46;
    function table(digits, yTop, colorHi, colorLo) {
      var i;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#5f5e5a'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
      for (i = 0; i < 8; i++) ctx.fillText(names[i], x0 + i * cellW + cellW / 2, yTop - 12);
      for (i = 0; i < 8; i++) {
        var inWan = i < 4;
        ctx.fillStyle = '#fff';
        ctx.fillRect(x0 + i * cellW, yTop, cellW, cellH);
        ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1;
        ctx.strokeRect(x0 + i * cellW, yTop, cellW, cellH);
        if (i === 3 || i === 7) { ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 2; ctx.strokeRect(x0 + i * cellW, yTop, cellW, cellH); }
        if (digits[i]) {
          ctx.fillStyle = digits[i] === colorHi ? '#c0392b' : (inWan ? '#185fa5' : colorLo);
          ctx.font = 'bold ' + Math.round(cellH * 0.55) + 'px "PingFang SC","Microsoft YaHei",sans-serif';
          ctx.fillText(digits[i], x0 + i * cellW + cellW / 2, yTop + cellH / 2);
        }
      }
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(x0, yTop + cellH + 8); ctx.lineTo(x0 + cellW * 4, yTop + cellH + 8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x0 + cellW * 4, yTop + cellH + 8); ctx.lineTo(x0 + cellW * 8, yTop + cellH + 8); ctx.stroke();
      ctx.fillStyle = '#185fa5'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('万级', x0 + cellW * 2, yTop + cellH + 24);
      ctx.fillText('个级', x0 + cellW * 6, yTop + cellH + 24);
      ctx.textAlign = 'left';
    }
    if (mode === 0) {
      table(dg, y0, '#', '#2c3e50');
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 19px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('读作：' + p4ReadNum(A), 40, y0 + cellH * 2 + 44);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('先分级（每 4 位一级），万级照个级读、补「万」字。', 40, y0 + cellH * 2 + 76);
      var zeroTip = /零/.test(p4ReadNum(A)) ? '读法里有「零」：中间的 0 要读，末尾的 0 不读。' : '末尾的 0 一个都不读。';
      ctx.fillText(zeroTip, 40, y0 + cellH * 2 + 100);
    } else if (mode === 1) {
      table(dg, y0, '#', '#2c3e50');
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('每个数字表示多少：', 40, y0 + cellH * 2 + 40);
      var units = ['千万', '百万', '十万', '万', '千', '百', '十', '一（个）'];
      var shown = 0, i2;
      for (i2 = 0; i2 < 8 && shown < 3; i2++) {
        if (dg[i2]) {
          ctx.fillStyle = '#185fa5'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
          ctx.fillText(dg[i2] + ' 在' + units[i2] + '位，表示 ' + dg[i2] + ' 个' + units[i2], 40 + (shown % 2) * 250, y0 + cellH * 2 + 70 + Math.floor(shown / 2) * 26);
          shown++;
        }
      }
      if (!shown) { ctx.fillStyle = '#c0392b'; ctx.fillText('把滑块拖到非零的数看看', 40, y0 + cellH * 2 + 70); }
    } else if (mode === 2) {
      table(dg, y0, '#', '#2c3e50');
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      var isWhole = A % 10000 === 0;
      var wan = A / 10000;
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(isWhole ? A + ' = ' + wan + ' 万（大小不变，用 =）' : A + ' 不是整万数', 40, y0 + cellH * 2 + 46);
      var approx = Math.round(A / 10000);
      var tail = A % 10000;
      ctx.fillStyle = '#c0392b';
      ctx.fillText('省略万位后面的尾数：' + A + ' ≈ ' + approx + ' 万', 40, y0 + cellH * 2 + 82);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('尾数是 ' + tail + '，看千位 ' + (Math.floor(tail / 1000) % 10) + '：' + (Math.floor(tail / 1000) % 10 >= 5 ? '满 5 进 1' : '不满 5 舍去'), 40, y0 + cellH * 2 + 110);
    } else {
      var da = p4Digits(A, 8), db = p4Digits(B, 8);
      var cmpY = 70;
      table(da, cmpY, '#', '#2c3e50');
      table(db, cmpY + cellH * 2 + 8, '#', '#2c3e50');
      var la = String(A).length, lb = String(B).length, verdict;
      var diffCol = -1;
      for (var j = 0; j < 8; j++) { if (da[j] !== db[j]) { diffCol = j; break; } }
      if (la !== lb) verdict = A > B ? A + ' > ' + B + '（位数多的更大）' : A + ' < ' + B + '（位数多的更大）';
      else if (A === B) verdict = A + ' = ' + B;
      else verdict = A > B ? A + ' > ' + B + '（第 ' + (diffCol + 1) + ' 位见分晓）' : A + ' < ' + B + '（第 ' + (diffCol + 1) + ' 位见分晓）';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(verdict, 40, cmpY + cellH * 4 + 46);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('先比位数，再从最高位一位一位比。', 40, cmpY + cellH * 4 + 74);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '分级是读大数的**第一步**：从右起每 4 位画一条线。'
        : mode === 1 ? '同一个数字，站的位置不同，表示的大小完全不同——这就是**位值**。'
          : mode === 2 ? '改写用 **=**（大小不变），近似用 **≈**（四舍五入）。'
            : '比大小两步：先数位数，再从最高位逐位比。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '数 A', A, 1000, 99999999, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, '数 B', B, 1000, 99999999, 1, function (v) { B = v; p.b = v; draw(); });
  draw();
}

/* 公顷和平方千米 */
function p4Area2Lab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 1 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    if (mode === 0) {
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 19px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('1 公顷：边长 100 米的正方形', 40, 50);
      var bx = 70, by = 84, bs = 230;
      ctx.fillStyle = '#e6f1fb'; ctx.fillRect(bx, by, bs, bs);
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.5; ctx.strokeRect(bx, by, bs, bs);
      var i;
      ctx.strokeStyle = 'rgba(24,95,165,.18)'; ctx.lineWidth = 1;
      for (i = 1; i < 10; i++) {
        ctx.beginPath(); ctx.moveTo(bx + i * bs / 10, by); ctx.lineTo(bx + i * bs / 10, by + bs); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx, by + i * bs / 10); ctx.lineTo(bx + bs, by + i * bs / 10); ctx.stroke();
      }
      ctx.fillStyle = '#185fa5'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('100 米', bx + bs / 2, by - 14);
      ctx.save();
      ctx.translate(bx - 20, by + bs / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('100 米', 0, 0);
      ctx.restore();
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('100 × 100 = 10000 个 1 平方米', bx + bs / 2, by + bs + 24);
      ctx.textAlign = 'left';
      var ry = 96;
      ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('量感参照', bx + bs + 56, ry);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      var refs = ['1 个 400 米跑道操场 ≈ 1 公顷', '标准足球场 ≈ 7140 平方米', '1 公顷 ≈ 1.4 个足球场', '一间教室 ≈ 60 平方米'];
      for (i = 0; i < refs.length; i++) ctx.fillText(refs[i], bx + bs + 56, ry + 30 + i * 28);
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('1 公顷 = 10000 平方米', 40, h - 34);
    } else if (mode === 1) {
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 19px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(N + ' 公顷换算', 40, 54);
      var rowY = 110, step = 62;
      function row(label, val, color) {
        ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(label, 60, rowY - 14);
        ctx.fillStyle = color; ctx.font = 'bold 24px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(val, 60, rowY + 14);
        rowY += step;
      }
      row('平方千米（÷100）', (N / 100) + ' 平方千米', '#0f6e56');
      row('公顷', N + ' 公顷', '#185fa5');
      row('平方米（×10000）', (N * 10000).toLocaleString('en-US').replace(/,/g, '') + ' 平方米', '#c0392b');
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('化成平方米：添 4 个 0；化成平方千米：去 2 个 0。', 60, h - 50);
    } else {
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 19px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('1 平方千米 = 100 公顷', 40, 50);
      var bx2 = 70, by2 = 84, bs2 = 250;
      ctx.fillStyle = '#e1f5ee'; ctx.fillRect(bx2, by2, bs2, bs2);
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2.5; ctx.strokeRect(bx2, by2, bs2, bs2);
      var r, c;
      ctx.strokeStyle = 'rgba(15,110,86,.35)'; ctx.lineWidth = 1;
      for (r = 1; r < 10; r++) {
        ctx.beginPath(); ctx.moveTo(bx2 + r * bs2 / 10, by2); ctx.lineTo(bx2 + r * bs2 / 10, by2 + bs2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(bx2, by2 + r * bs2 / 10); ctx.lineTo(bx2 + bs2, by2 + r * bs2 / 10); ctx.stroke();
      }
      ctx.fillStyle = '#0f6e56'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('每小格 = 1 公顷', bx2 + bs2 / 2, by2 + bs2 / 2);
      ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('1000 米', bx2 + bs2 / 2, by2 - 14);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('1000 × 1000 = 1000000 平方米', 40, h - 64);
      ctx.fillStyle = '#c0392b';
      ctx.fillText('平方米 → 平方千米：一共去 6 个 0', 40, h - 36);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '公顷是量**土地**的单位，1 公顷 = 10000 平方米。'
        : mode === 1 ? '大化小乘进率、小化大除以进率；数 0 验算。'
          : '1 平方千米 = 100 公顷 = 1000000 平方米。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 2, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '公顷数', N, 1, 500, 1, function (v) { N = v; p.n = v; draw(); });
  draw();
}

/* 角的度量 */
function p4AngLab(el, cfg) {
  var p = Object.assign({ mode: 0, deg: 60 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), deg = Math.round(p.deg);
  var info = s0.info;
  function protractor(ctx, cx, cy, R) {
    var i, ang;
    ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fill();
    ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
    for (i = 0; i <= 180; i += 5) {
      ang = Math.PI - i / 180 * Math.PI;
      var big = i % 10 === 0;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * (R - (big ? 14 : 8)), cy - Math.sin(ang) * (R - (big ? 14 : 8)));
      ctx.lineTo(cx + Math.cos(ang) * (R - 2), cy - Math.sin(ang) * (R - 2));
      ctx.strokeStyle = big ? '#2c3e50' : '#c2cdd8'; ctx.lineWidth = big ? 1.8 : 1; ctx.stroke();
      if (big && i % 20 === 0) {
        ctx.fillStyle = '#5f5e5a'; ctx.font = '10px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(String(i), cx + Math.cos(ang) * (R - 26), cy - Math.sin(ang) * (R - 26));
      }
    }
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    if (mode === 0) {
      var y1 = 90, y2 = 210, y3 = 330;
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(80, y1 - 12); ctx.lineTo(280, y1 - 12); ctx.stroke();
      ctx.beginPath(); ctx.arc(80, y1 - 12, 4, 0, Math.PI * 2); ctx.fillStyle = '#2c3e50'; ctx.fill();
      ctx.beginPath(); ctx.arc(280, y1 - 12, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('线段：2 个端点，可量长度', 320, y1 - 12);
      ctx.beginPath(); ctx.moveTo(80, y2 - 12); ctx.lineTo(280, y2 - 12); ctx.stroke();
      ctx.beginPath(); ctx.arc(80, y2 - 12, 4, 0, Math.PI * 2); ctx.fill();
      ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(280, y2 - 12); ctx.lineTo(330, y2 - 12); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#0f6e56';
      ctx.fillText('射线：1 个端点，向一端无限延伸', 320, y2 - 12);
      ctx.beginPath(); ctx.moveTo(80, y3 - 12); ctx.lineTo(330, y3 - 12); ctx.stroke();
      ctx.setLineDash([6, 6]);
      ctx.beginPath(); ctx.moveTo(60, y3 - 12); ctx.lineTo(80, y3 - 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(330, y3 - 12); ctx.lineTo(350, y3 - 12); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#c0392b';
      ctx.fillText('直线：没有端点，向两端无限延伸', 320, y3 - 12);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('角 = 从一点引出两条射线。虚线部分表示「无限延伸，画不完」。', 80, h - 24);
    } else if (mode === 1) {
      var cx = 200, cy = 250, R = 150;
      protractor(ctx, cx, cy, R);
      var ang = Math.PI - deg / 180 * Math.PI;
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx - R - 12, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(ang) * (R + 12), cy - Math.sin(ang) * (R + 12)); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fillStyle = '#c0392b'; ctx.fill();
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('∠ = ' + deg + '°', cx + R + 34, 90);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('两重合：中心点对顶点，', cx + R + 34, 122);
      ctx.fillText('0° 刻度线对一条边。', cx + R + 34, 144);
      ctx.fillText('一看：另一边指哪读哪——', cx + R + 34, 174);
      ctx.fillText('0° 在内圈读内圈，在外圈读外圈。', cx + R + 34, 196);
      ctx.fillStyle = deg < 90 ? '#0f6e56' : '#8a5a00';
      ctx.fillText(deg < 90 ? '锐角（<90°）读数合理 ✓' : (deg === 90 ? '直角' : '钝角（>90°）读数合理 ✓'), cx + R + 34, 232);
      ctx.fillStyle = '#6b7a89';
      ctx.fillText('角的边画长画短，角的大小不变。', cx + R + 34, 262);
    } else {
      var cx2 = 190, cy2 = h * 0.55, R2 = 120;
      var ang2 = Math.PI - deg / 180 * Math.PI;
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx2, cy2); ctx.lineTo(cx2 + R2 + 16, cy2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx2, cy2);
      ctx.lineTo(cx2 + Math.cos(ang2) * (R2 + 16), cy2 - Math.sin(ang2) * (R2 + 16)); ctx.stroke();
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(deg + '°', cx2 + R2 + 40, cy2 - 60);
      var cls, color;
      if (deg < 90) { cls = '锐角'; color = '#0f6e56'; }
      else if (deg === 90) { cls = '直角'; color = '#c0392b'; }
      else if (deg < 180) { cls = '钝角'; color = '#8a5a00'; }
      else if (deg === 180) { cls = '平角'; color = '#185fa5'; }
      else { cls = '周角'; color = '#185fa5'; }
      ctx.fillStyle = color; ctx.font = 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(cls, cx2 + R2 + 40, cy2 - 24);
      var bands = [['锐角 <90°', 0, 89, '#0f6e56'], ['直角 =90°', 90, 90, '#c0392b'], ['钝角 90~179°', 91, 179, '#8a5a00'], ['平角 =180°', 180, 180, '#185fa5'], ['周角 =360°', 181, 360, '#5f5e5a']];
      var i3;
      for (i3 = 0; i3 < bands.length; i3++) {
        var b = bands[i3];
        var on = deg >= b[1] && deg <= b[2];
        ctx.fillStyle = on ? color : '#c2cdd8';
        ctx.font = (on ? 'bold ' : '') + '13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText((on ? '▸ ' : '　 ') + b[0], 40, 60 + i3 * 26);
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('1 平角 = 2 直角；1 周角 = 4 直角。', 40, h - 30);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '角由两条**射线**组成——先认线再认角。'
        : mode === 1 ? '量角器口诀：**两重合、一看**。'
          : '五类角以 90° 和 180° 为界，拖滑块看类别切换。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 2, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '角度', deg, 5, 175, 1, function (v) { deg = v; p.deg = v; draw(); });
  draw();
}

/* 三位数乘两位数 */
function p4MultLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 145, b: 12, k: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b), K = Math.round(p.k);
  var info = s0.info;
  function right(ctx, x, y, t, color, size) {
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillStyle = color || '#2c3e50';
    ctx.font = (size ? 'bold ' + size : 'bold 20') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(String(t), x, y);
    ctx.textAlign = 'left';
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    if (mode === 0) {
      var xR = 250, y = 60, step = 44;
      var p1 = A * (B % 10);
      var p2 = A * Math.floor(B / 10);
      var zeroTail = (A % 10 === 0 ? 1 : 0) + (B % 10 === 0 ? 1 : 0);
      var simple = zeroTail === 2 && A % 100 === 0;
      right(ctx, xR, y, A);
      right(ctx, xR, y + step, '× ' + B, '#6b7a89');
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(xR - 170, y + step * 1.5); ctx.lineTo(xR, y + step * 1.5); ctx.stroke();
      if (simple) {
        var sa = Math.round(A / 100), sb = Math.round(B / 10) * 10 === B ? Math.round(B / 10) : B;
        right(ctx, xR, y + step * 2, sa + ' × ' + (B / 10) + ' = ' + (sa * (B / 10)), '#185fa5', 17);
        right(ctx, xR, y + step * 3, '补 ' + zeroTail + ' 个 0', '#185fa5', 15);
        right(ctx, xR, y + step * 4.2, A * B, '#c0392b', 22);
      } else {
        right(ctx, xR, y + step * 2, p1 + '（个位乘）', '#185fa5');
        right(ctx, xR, y + step * 3, p2 + '0（十位乘，错一位）', '#0f6e56');
        ctx.strokeStyle = '#9aa7b4'; ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(xR - 200, y + step * 3.6); ctx.lineTo(xR, y + step * 3.6); ctx.stroke();
        ctx.setLineDash([]);
        right(ctx, xR, y + step * 4.4, A * B, '#c0392b', 22);
      }
      var x0 = 330, ry = 80;
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('两层积的来历：', x0, ry);
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('第一层：' + A + ' × ' + (B % 10) + ' = ' + p1, x0, ry + 30);
      ctx.fillStyle = '#0f6e56';
      ctx.fillText('第二层：' + A + ' × ' + Math.floor(B / 10) + '（个十）= ' + p2 + ' 个十', x0, ry + 60);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('十位乘的是几个十，积末位要对齐十位。', x0, ry + 96);
      ctx.fillText('估算检验：' + A + '×' + B + ' ≈ ' + (Math.round(A / 10) * 10) + '×' + (Math.round(B / 10) * 10) + ' = ' + (Math.round(A / 10) * 10 * Math.round(B / 10) * 10).toLocaleString('en-US').replace(/,/g, ''), x0, ry + 122);
      ctx.fillText('精确值 ' + (A * B).toLocaleString('en-US').replace(/,/g, '') + '，量级一致 ✓', x0, ry + 148);
    } else {
      var base = A * B;
      var y0 = 80;
      right(ctx, 300, y0, A + ' × ' + B + ' = ' + base, '#2c3e50', 20);
      right(ctx, 300, y0 + 52, A + ' × ' + (B * K) + ' = ' + base * K, '#c0392b', 20);
      ctx.fillStyle = '#6b7a89'; ctx.font = '14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('一个因数不变（' + A + '），另一个因数 ' + B + ' → ' + B * K + '（×' + K + '）', 60, y0 + 116);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('积 ' + base + ' → ' + base * K + '，也 ×' + K, 60, y0 + 148);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('反过来除以几，积也除以几（0 除外）。', 60, y0 + 184);
      ctx.fillText('两个因数同时 ×10，积就 ×100。', 60, y0 + 210);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '竖式三层积：**个位乘、十位乘（错一位）、相加**。'
        : '积的变化规律：因数乘几，积跟着**乘几**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 1, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '三位数', A, 100, 999, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, '两位数', B, 11, 99, 1, function (v) { B = v; p.b = v; draw(); });
  cSlider(s0.ctrl, '变化倍数', K, 2, 9, 1, function (v) { K = v; p.k = v; draw(); });
  draw();
}

/* 平行四边形和梯形 */
function p4QuadLab(el, cfg) {
  var p = Object.assign({ mode: 0, s: 40, hgt: 55 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), S = Math.round(p.s), HG = Math.round(p.hgt);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    if (mode === 0) {
      var tilt = (S - 40) / 2;
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(70, 110); ctx.lineTo(570, 110 + tilt); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(70, 290); ctx.lineTo(570, 290 + tilt); ctx.stroke();
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('平行：永不相交（把两条线画到无限远也不会碰头）', 70, 60);
      ctx.strokeStyle = '#c0392b';
      ctx.beginPath(); ctx.moveTo(140, 330); ctx.lineTo(140 + tilt * 2 + 90, 390); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(420, 320); ctx.lineTo(420 + tilt, 390); ctx.stroke();
      ctx.fillStyle = '#c0392b';
      ctx.fillText('相交：交叉一次', 70, 352);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('相交成直角（90°）时，两条直线互相垂直。', 70, 382);
    } else if (mode === 1) {
      var bx = 90, bw = 300, by = 90, bh = 180;
      var skew = (S - 40) * 2.2;
      var x1 = bx + skew, y1 = by + (100 - bh) * 0, topY = by;
      var A2 = { x: bx + skew, y: by }, B2 = { x: bx + bw + skew, y: by };
      var C2 = { x: bx + bw, y: by + bh }, D2 = { x: bx, y: by + bh };
      ctx.fillStyle = '#e6f1fb';
      ctx.beginPath();
      ctx.moveTo(A2.x, A2.y); ctx.lineTo(B2.x, B2.y); ctx.lineTo(C2.x, C2.y); ctx.lineTo(D2.x, D2.y); ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.5; ctx.stroke();
      var hx = bx + bw * 0.62 + skew * 0.5;
      ctx.setLineDash([6, 5]); ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(hx, by); ctx.lineTo(hx, by + bh); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(hx, by, 3.5, 0, Math.PI * 2); ctx.fillStyle = '#c0392b'; ctx.fill();
      ctx.beginPath(); ctx.moveTo(hx, by + bh - 14); ctx.lineTo(hx + 12, by + bh - 14); ctx.lineTo(hx + 12, by + bh); ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('高（虚线＋直角符号）', hx + 18, by + bh * 0.5);
      ctx.fillStyle = '#185fa5';
      ctx.fillText('对边平行且相等：上 = 下，左 = 右', 60, by + bh + 42);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('拖滑块让形状变形——不管怎么歪，两组对边始终平行。', 60, by + bh + 70);
      ctx.fillText('易变形（不稳定）：伸缩门、晾衣架利用这个特性。', 60, by + bh + 94);
    } else if (mode === 2) {
      var bx3 = 100, bw3 = 300, topW = 90 + (S - 40) * 3, by3 = 90, bh3 = 180;
      var off = (bw3 - topW) / 2;
      ctx.fillStyle = '#e1f5ee';
      ctx.beginPath();
      ctx.moveTo(bx3 + off, by3); ctx.lineTo(bx3 + off + topW, by3);
      ctx.lineTo(bx3 + bw3, by3 + bh3); ctx.lineTo(bx3, by3 + bh3); ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2.5; ctx.stroke();
      ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('上底', bx3 + off + topW / 2, by3 - 16);
      ctx.fillText('下底', bx3 + bw3 / 2, by3 + bh3 + 20);
      ctx.textAlign = 'left';
      ctx.fillText('腰', bx3 + off + topW + 26, by3 + bh3 * 0.3);
      ctx.fillText('腰', bx3 + off - 60, by3 + bh3 * 0.3);
      var hx3 = bx3 + bw3 * 0.3;
      ctx.setLineDash([6, 5]); ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(hx3, by3); ctx.lineTo(hx3, by3 + bh3); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('高', hx3 + 12, by3 + bh3 * 0.5);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('只有一组对边平行（上底 ∥ 下底）；高夹在两底之间。', 60, by3 + bh3 + 52);
    } else {
      var cx = w * 0.55, cy = 210;
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse ? ctx.ellipse(cx, cy, 250, 150, 0, 0, Math.PI * 2) : ctx.arc(cx, cy, 200, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('四边形', cx, cy - 120);
      ctx.beginPath(); ctx.ellipse ? ctx.ellipse(cx - 90, cy + 20, 120, 80, 0, 0, Math.PI * 2) : ctx.arc(cx - 90, cy + 20, 90, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#185fa5';
      ctx.fillText('平行四边形', cx - 90, cy + 40);
      ctx.strokeStyle = '#0f6e56';
      ctx.beginPath(); ctx.ellipse ? ctx.ellipse(cx + 110, cy + 20, 80, 70, 0, 0, Math.PI * 2) : ctx.arc(cx + 110, cy + 20, 70, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#0f6e56';
      ctx.fillText('梯形', cx + 110, cy + 40);
      ctx.beginPath(); ctx.ellipse ? ctx.ellipse(cx - 90, cy - 15, 95, 55, 0, 0, Math.PI * 2) : ctx.arc(cx - 90, cy - 15, 70, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#8a5a00';
      ctx.fillText('长方形', cx - 90, cy - 20);
      ctx.beginPath(); ctx.ellipse ? ctx.ellipse(cx - 90, cy - 40, 55, 30, 0, 0, Math.PI * 2) : ctx.arc(cx - 90, cy - 40, 45, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#c0392b';
      ctx.fillText('正方形', cx - 90, cy - 42);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('小圈在大圈里 = 包含：正方形 ⊂ 长方形 ⊂ 平行四边形。', 40, h - 34);
      ctx.fillText('梯形和平行四边形是并列关系，互不包含。', 40, h - 12);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '同一平面内两直线：**平行**或相交，垂直是成直角的相交。'
        : mode === 1 ? '两组对边分别平行 = 平行四边形，**高画虚线＋直角符号**。'
          : mode === 2 ? '只有一组对边平行 = 梯形；底、腰、高各就各位。'
            : '四边形家族：**小圈满足大圈的一切条件**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '形状参数', S, 10, 90, 1, function (v) { S = v; p.s = v; draw(); });
  cSlider(s0.ctrl, '高度', HG, 30, 90, 1, function (v) { HG = v; p.hgt = v; draw(); });
  draw();
}

/* 除数是两位数的除法 */
function p4DivLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 430, b: 62 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    if (mode === 0) {
      var zeros = 0, a2 = A, b2 = B;
      while (a2 % 10 === 0 && b2 % 10 === 0 && a2 > 0 && b2 > 0) { a2 /= 10; b2 /= 10; zeros++; }
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(A + ' ÷ ' + B, 60, 70);
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('遮 ' + zeros + ' 个 0 → ' + a2 + ' ÷ ' + b2, 60, 126);
      ctx.fillStyle = '#0f6e56';
      ctx.fillText('= ' + (a2 / b2 === Math.floor(a2 / b2) ? a2 / b2 : (a2 / b2).toFixed(2)), 60, 178);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('被除数、除数末尾同时遮同样多个 0，商不变。', 60, 236);
      ctx.fillText('口诀回归：' + b2 + ' × ' + Math.floor(a2 / b2 || 1) + ' 最接近 ' + a2 + '。', 60, 262);
      ctx.fillText('商不变性质：被除数、除数同乘或同除一个数（0 除外），商不变。', 60, 296);
    } else if (mode === 1) {
      var q0 = Math.floor(A / (Math.round(B / 10) * 10) || 0);
      if (q0 < 1) q0 = 1;
      var prod = B * q0, rem = A - prod;
      var adjusted = rem >= B;
      var q = adjusted ? q0 + 1 : q0;
      if (B * q > A) { q = q0; prod = B * q0; rem = A - prod; adjusted = false; }
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(A + ' ÷ ' + B + ' = ?', 60, 60);
      var look = Math.round(B / 10) * 10;
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('① 试商：' + B + (B % 10 < 5 ? ' 四舍' : ' 五入') + '看成 ' + look + '，' + Math.floor(A / 10) + ' ÷ ' + Math.round(look / 10) + ' → 初商 ' + q0, 60, 116);
      ctx.fillStyle = '#0f6e56';
      ctx.fillText('② 验证：' + B + ' × ' + q0 + ' = ' + B * q0 + (B * q0 <= A ? ' ≤ ' + A + ' ✓' : ' > ' + A + ' ✗ 偏大'), 60, 156);
      if (B * q0 <= A) {
        ctx.fillStyle = '#c0392b';
        ctx.fillText('③ 余数 ' + rem + (rem >= B ? ' ≥ ' + B + '，商小了，调大成 ' + q : ' < ' + B + '，商正好'), 60, 196);
        ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(A + ' ÷ ' + B + ' = ' + q + '……' + (A - B * q), 60, 244);
      } else {
        ctx.fillStyle = '#c0392b';
        ctx.fillText('③ 商调小：' + B + ' × ' + q0 + ' > ' + A + '，改商 ' + (q0 - 1), 60, 196);
        ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(A + ' ÷ ' + B + ' = ' + (q0 - 1) + '……' + (A - B * (q0 - 1)), 60, 244);
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('四舍看小 → 初商偏大 → 调小；五入看大 → 初商偏小 → 调大。', 60, 292);
      ctx.fillText('铁律：每一步的余数必须比除数小。', 60, 318);
    } else if (mode === 2) {
      var a0 = A, b0 = B;
      var digits = String(a0).split('').map(Number);
      var qd = [];
      var cur = 0;
      for (var i = 0; i < digits.length; i++) {
        cur = cur * 10 + digits[i];
        var qi = Math.floor(cur / b0);
        if (qi > 9) qi = 9;
        if (i === 0 && qi === 0) { qd.push(null); continue; }
        qd.push(qi);
        cur -= qi * b0;
      }
      var qStr = qd.map(function (x) { return x === null ? '' : x; }).join('');
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 24px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(String(a0), 130, 80);
      ctx.fillStyle = '#6b7a89';
      ctx.fillText(' ÷ ' + b0 + ' = ', 230, 80);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 24px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(qStr + (cur ? '……' + cur : ''), 330, 80);
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      var first = String(a0).slice(0, String(b0).length);
      ctx.fillText('前两位 ' + first + (Number(first) >= b0 ? ' ≥ ' + b0 + '：够除，商从这一位写起' : ' < ' + b0 + '：不够除，看前三位'), 60, 140);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      var lines = ['① 除到哪一位，商就写在哪一位上面', '② 每步余数和下一位数字合起来继续除', '③ 余数必须比除数小（' + (cur < b0 ? '现在 ' + cur + ' < ' + b0 + ' ✓' : '检查！') + '）', '④ 验算：商 × 除数 + 余数 = 被除数'];
      for (var j = 0; j < lines.length; j++) ctx.fillText(lines[j], 60, 190 + j * 30);
      ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      var chk = qStr * b0 + cur;
      ctx.fillText('验算：' + qStr + ' × ' + b0 + (cur ? ' + ' + cur : '') + ' = ' + chk + (chk === a0 ? ' ✓' : ''), 60, 190 + lines.length * 30 + 12);
    } else {
      var qSame = Math.floor(A / B);
      var remReal = A - qSame * B;
      var scale = 1;
      if (A % 10 === 0 && B % 10 === 0) scale = 10;
      var aS = A / scale, bS = B / scale;
      var qS = Math.floor(aS / bS), remS = aS - qS * bS;
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(A + ' ÷ ' + B + '：同时 ÷' + scale + ' → ' + aS + ' ÷ ' + bS, 60, 70);
      ctx.fillStyle = '#185fa5';
      ctx.fillText('商不变：都是 ' + qSame, 60, 120);
      ctx.fillStyle = '#c0392b';
      if (scale > 1 && remReal) {
        ctx.fillText('余数会变！简算余 ' + remS + '，真余数 = ' + remS + ' × ' + scale + ' = ' + remReal, 60, 170);
      } else {
        ctx.fillText(remReal ? '余数 ' + remReal : '正好除尽，没有余数', 60, 170);
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('商不变性质：被除数、除数同乘或同除一个数（0 除外），商不变。', 60, 226);
      ctx.fillText('但余数跟着缩小了——用简算求余数，最后要乘回去。', 60, 252);
      ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('验算：' + qSame + ' × ' + B + (remReal ? ' + ' + remReal : '') + ' = ' + (qSame * B + remReal) + ' ✓', 60, 296);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '整十数除法**遮 0 套口诀**。'
        : mode === 1 ? '试商：四舍五入看整十，**验证后调商**。'
          : mode === 2 ? '除到哪一位，**商写在哪一位**。'
            : '商不变，**余数会变**——记得乘回去。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '被除数', A, 100, 999, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, '除数', B, 11, 99, 1, function (v) { B = v; p.b = v; draw(); });
  draw();
}

/* 条形统计图 */
function p4BarLab(el, cfg) {
  var p = Object.assign({ mode: 0, unit: 1 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), U = Math.round(p.unit);
  var names = ['足球', '篮球', '跳绳', '羽毛球'];
  var data = [mode === 1 ? 9 : 24, 15, mode === 1 ? 6 : 18, mode === 1 ? 7 : 12];
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var ux = (U === 1 || U === 2 || U === 5 || U === 10) ? U : 5;
    var title = mode === 2 ? '同一组数据，每格代表几才合适？' : '四年级同学最喜欢的运动（人数）';
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(title, 40, 34);
    var gx0 = 90, gx1 = w - 60, gy1 = h - 64, gy0 = 66;
    var maxData = Math.max.apply(null, data);
    var axisMax = Math.ceil(maxData / ux) * ux;
    var rowsN = Math.round(axisMax / ux);
    var kStep = Math.max(1, Math.ceil(rowsN / 6));
    var per = gy1 - gy0;
    var i;
    ctx.strokeStyle = '#e6ebf1'; ctx.lineWidth = 1;
    for (i = 0; i <= rowsN; i++) {
      var yy = gy1 - per * i / rowsN;
      ctx.beginPath(); ctx.moveTo(gx0, yy); ctx.lineTo(gx1, yy); ctx.stroke();
      if (i % kStep === 0) {
        ctx.fillStyle = '#5f5e5a'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(String(i * ux), gx0 - 8, yy);
        ctx.textAlign = 'left';
      }
    }
    ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(gx0, gy0 - 6); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
    ctx.fillStyle = '#5f5e5a'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('人数（每格代表 ' + ux + '）', gx0 - 40, gy0 - 18);
    var colors = ['#185fa5', '#c0392b', '#0f6e56', '#8a5a00'];
    var bw = Math.min(70, (gx1 - gx0 - 100) / 4);
    for (i = 0; i < 4; i++) {
      var cx0 = gx0 + 40 + i * (gx1 - gx0 - 80) / 4;
      var barH = per * data[i] / axisMax;
      ctx.fillStyle = colors[i];
      ctx.fillRect(cx0, gy1 - barH, bw, barH);
      ctx.fillStyle = colors[i]; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(data[i]), cx0 + bw / 2, gy1 - barH - 12);
      ctx.fillStyle = '#2c3e50'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(names[i], cx0 + bw / 2, gy1 + 18);
      ctx.fillStyle = '#6b7a89'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText((data[i] / ux).toFixed(1) + ' 格', cx0 + bw / 2, gy1 + 36);
      ctx.textAlign = 'left';
    }
    var msg = mode === 0 ? '每格从 1 涨到 10，图越来越紧凑——大数据必须让格子「涨价」。'
      : mode === 1 ? '每格代表 2 时奇数占半格：半格 = 一半。'
        : mode === 2 ? '最大数据接近纵轴顶端的身价最合适：1、2、5、10 都是候选。'
          : '比较条的高矮就是比较数量；相差要换算成真实数量再减。';
    ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(msg, 40, h - 12);
    info.innerHTML = '<span class="viz-meta">读图第一步：**看纵轴每格代表几**；格数 × 身价 = 数量。</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '每格代表', U, 1, 10, 1, function (v) { U = v; p.unit = v; draw(); });
  draw();
}

/* 数学广角——优化 */
function p4OptLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    if (mode === 0) {
      var tea = [['洗水壶', 1, '#185fa5'], ['接水', 1, '#185fa5'], ['烧水', 8, '#c0392b'], ['沏茶', 1, '#185fa5']];
      var par = [['洗茶杯', 2, '#0f6e56'], ['拿茶叶', 1, '#0f6e56']];
      var x0 = 60, sc = Math.min(52, (w - 200) / 13), y0 = 90, bh = 40;
      var acc = 0, i;
      ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      for (i = 0; i < tea.length; i++) {
        var t0 = tea[i];
        ctx.fillStyle = t0[2];
        ctx.fillRect(x0 + acc * sc, y0, t0[1] * sc, bh);
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(t0[0], x0 + acc * sc + t0[1] * sc / 2, y0 + bh / 2 - 6);
        ctx.fillText(t0[1] + '分', x0 + acc * sc + t0[1] * sc / 2, y0 + bh / 2 + 10);
        acc += t0[1];
      }
      ctx.textAlign = 'left';
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('主线：1+1+8+1 = 11 分钟', x0, y0 + bh + 26);
      var py = y0 + bh + 58;
      var pacc = 2;
      for (i = 0; i < par.length; i++) {
        ctx.fillStyle = par[i][2];
        ctx.fillRect(x0 + pacc * sc, py, par[i][1] * sc, 30);
        ctx.fillStyle = '#fff'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(par[i][0] + ' ' + par[i][1] + '分', x0 + pacc * sc + par[i][1] * sc / 2, py + 15);
        pacc += par[i][1];
      }
      ctx.textAlign = 'left';
      ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('支线（藏在烧水的 8 分钟空档里）', x0, py - 12);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('挨着做要 14 分钟；塞进等待空档后只要 11 分钟。', x0, py + 58);
      ctx.fillText('找「机器在跑、人在等」的时间段。', x0, py + 84);
    } else if (mode === 1) {
      var n = Math.min(6, Math.max(3, N));
      var per = 3;
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('烙 ' + n + ' 张饼（每锅 2 张，每面 ' + per + ' 分钟）', 50, 50);
      // 时段表：每个时段锅里 2 个面
      var slots = [];
      if (n === 3) {
        slots = [[[1, '正'], [2, '正']], [[1, '反'], [3, '正']], [[2, '反'], [3, '反']]];
      } else {
        var start = 1;
        if (n % 2 === 1) {
          slots = [[[1, '正'], [2, '正']], [[1, '反'], [3, '正']], [[2, '反'], [3, '反']]];
          start = 4;
        }
        for (var g = start; g + 1 <= n; g += 2) {
          slots.push([[g, '正'], [g + 1, '正']]);
          slots.push([[g, '反'], [g + 1, '反']]);
        }
      }
      var bx = 118, sc2 = Math.min(80, (w - 220) / 2), by = 84;
      var r;
      ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      for (r = 0; r < slots.length; r++) {
        var yy = by + r * 40;
        if (yy > h - 90) break;
        ctx.fillStyle = '#6b7a89';
        ctx.fillText('第 ' + (r + 1) + ' 锅', 46, yy + 15);
        for (var k = 0; k < slots[r].length; k++) {
          var it = slots[r][k];
          var col = it[1] === '正' ? '#185fa5' : '#0f6e56';
          var cx = bx + k * (sc2 + 14);
          ctx.fillStyle = col;
          ctx.fillRect(cx, yy, sc2, 28);
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.fillText(it[0] + '号·' + it[1] + '面', cx + sc2 / 2, yy + 14);
        }
        ctx.textAlign = 'left';
      }
      var minT = slots.length * per;
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('最短 ' + minT + ' 分钟（锅里始终不空）', 46, Math.min(by + slots.length * 40 + 18, h - 56));
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('总面数 ' + n * 2 + ' ÷ 每锅 2 面 = ' + slots.length + ' 锅；' + slots.length + ' × ' + per + ' = ' + minT + ' 分。', 46, Math.min(by + slots.length * 40 + 44, h - 30));
      ctx.fillText('3 张是关键：轮流烙，锅一次都不空。', 46, Math.min(by + slots.length * 40 + 68, h - 8));
    } else {
      var rows = [['我方下等马', '齐王上等马', '输（计划内）', '#8a5a00'], ['我方上等马', '齐王中等马', '赢', '#0f6e56'], ['我方中等马', '齐王下等马', '赢', '#0f6e56']];
      var y = 90;
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('田忌赛马：牺牲一场，赢下两场', 50, 52);
      ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      for (var r2 = 0; r2 < rows.length; r2++) {
        var row = rows[r2];
        ctx.fillStyle = '#2c3e50';
        ctx.fillText(row[0], 70, y);
        ctx.fillStyle = '#6b7a89';
        ctx.fillText('对', 210, y);
        ctx.fillText(row[1], 260, y);
        ctx.fillStyle = row[3];
        ctx.fillText(row[2], 440, y);
        y += 44;
      }
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('总分 2 : 1，田忌胜', 70, y + 12);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('三匹马同级对拼必 0:3——调整**出场顺序**以弱换强。', 70, y + 48);
      ctx.fillText('策略思想：局部牺牲一场，换整体最优。', 70, y + 74);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '优化的本质：**把等待时间填满**。'
        : mode === 1 ? '烙饼题核心：**锅里始终不空**。'
          : '对策题核心：**以弱换强，调整顺序**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 2, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '饼数', N, 3, 6, 1, function (v) { N = v; p.n = v; draw(); });
  draw();
}
