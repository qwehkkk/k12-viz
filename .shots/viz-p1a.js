/* ===== 小学一二年级共用小工具（p1a / p1b / p2a / p2b） ===== */

function pTxt(ctx, x, y, t, color, big, center) {
  ctx.fillStyle = color || '#2c3e50';
  ctx.font = (big ? 'bold 20' : 'bold 15') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign = center ? 'center' : 'left';
  ctx.fillText(t, x, y);
  ctx.textAlign = 'left';
}

function pBig(ctx, x, y, t, color, size) {
  ctx.fillStyle = color || '#2c3e50';
  ctx.font = 'bold ' + (size || 46) + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(t, x, y);
  ctx.textAlign = 'left';
}

function pRect(ctx, x, y, w, h, fill, stroke, lw) {
  if (fill) { ctx.fillStyle = fill; ctx.fillRect(x, y, w, h); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1.6; ctx.strokeRect(x, y, w, h); }
}

function pCirc(ctx, x, y, r, fill, stroke, lw) {
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw || 1.6; ctx.stroke(); }
}

function pLine(ctx, x1, y1, x2, y2, color, lw, dash) {
  ctx.strokeStyle = color || '#2c3e50'; ctx.lineWidth = lw || 2;
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  if (dash) ctx.setLineDash([]);
}

function pArrow(ctx, x1, y1, x2, y2, color, lw) {
  pLine(ctx, x1, y1, x2, y2, color, lw);
  var a = Math.atan2(y2 - y1, x2 - x1), L = 11;
  ctx.fillStyle = color || '#2c3e50';
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - L * Math.cos(a - 0.4), y2 - L * Math.sin(a - 0.4));
  ctx.lineTo(x2 - L * Math.cos(a + 0.4), y2 - L * Math.sin(a + 0.4));
  ctx.closePath(); ctx.fill();
}

function pChip(ctx, x, y, t, bg, fg) {
  var i, w = 18;
  for (i = 0; i < t.length; i++) w += t.charCodeAt(i) > 255 ? 13 : 8;
  pRect(ctx, x, y, w, 26, bg || '#eef4fa', null);
  pTxt(ctx, x + 9, y + 13, t, fg || '#185fa5', 0);
  return w;
}

/* 十格阵：2 行 5 列，画 n 个圆点 */
function pTen(ctx, x, y, n, color, cw, ch) {
  var i;
  cw = cw || 36; ch = ch || 34;
  for (i = 0; i < 10; i++) {
    var cx = x + (i % 5) * cw, cy = y + Math.floor(i / 5) * ch;
    pRect(ctx, cx, cy, cw, ch, '#ffffff', '#9aa7b4', 1.2);
    if (i < n) pCirc(ctx, cx + cw / 2, cy + ch / 2, Math.min(cw, ch) * 0.3, color || '#c0392b');
  }
}

/* 一捆小棒（10 根） */
function pBundle(ctx, x, y, color) {
  var i;
  for (i = 0; i < 5; i++) pRect(ctx, x + i * 6, y, 5, 56, color || '#8a5a00');
  for (i = 0; i < 5; i++) pRect(ctx, x + 30 + i * 6, y, 5, 56, color || '#8a5a00');
  pRect(ctx, x - 4, y + 22, 64, 8, '#c0392b');
}

/* 散棒 */
function pSticks(ctx, x, y, n, color) {
  var i;
  for (i = 0; i < n; i++) pRect(ctx, x + i * 11, y, 6, 56, color || '#8a5a00');
}

/* 滑块面板：defs = [标签, 默认值, min, max, step, setter, 适用模式数组|null] */
function pPanel(s0, defs) {
  var rows = [], i;
  for (i = 0; i < defs.length; i++) {
    (function (d) {
      var n0 = s0.ctrl.children.length;
      var inp = cSlider(s0.ctrl, d[0], d[1], d[2], d[3], d[4], function (v) { d[5](v); });
      rows.push({ inp: inp, row: s0.ctrl.children[n0], modes: d[6] });
    })(defs[i]);
  }
  return rows;
}

function pVis(rows, mode) {
  var i;
  for (i = 0; i < rows.length; i++) {
    var mm = rows[i].modes, r = rows[i].row;
    if (!r || !r.style) continue;
    r.style.display = (!mm || mm.indexOf(mode) >= 0) ? '' : 'none';
  }
}

/* 钟面 */
function pClock(ctx, cx, cy, r, hh, mm, opt) {
  opt = opt || {};
  var i, k;
  pCirc(ctx, cx, cy, r, '#ffffff', '#2c3e50', 2.4);
  // 60 个分刻度
  for (i = 0; i < 60; i++) {
    var a = i * Math.PI / 30;
    var big = i % 5 === 0;
    var r1 = big ? r - 14 : r - 8;
    pLine(ctx, cx + r1 * Math.sin(a), cy - r1 * Math.cos(a), cx + (r - 4) * Math.sin(a), cy - (r - 4) * Math.cos(a),
      big ? '#2c3e50' : '#bec9d4', big ? 2.2 : 1);
  }
  // 12 个数
  for (k = 1; k <= 12; k++) {
    var aa = k * Math.PI / 6;
    pTxt(ctx, cx + (r - 30) * Math.sin(aa), cy - (r - 30) * Math.cos(aa), String(k), opt.bigNum ? '#c0392b' : '#2c3e50', 1, 1);
  }
  if (opt.fiveMin) {
    for (k = 0; k < 12; k++) {
      var ab = k * Math.PI / 6;
      pTxt(ctx, cx + (r + 20) * Math.sin(ab), cy - (r + 20) * Math.cos(ab), clkMin(k * 5), '#185fa5', 0, 1);
    }
  }
  // 指针
  var ha = ((hh % 12) + mm / 60) * Math.PI / 6;
  var ma = mm * Math.PI / 30;
  pLine(ctx, cx, cy, cx + r * 0.52 * Math.sin(ha), cy - r * 0.52 * Math.cos(ha), '#2c3e50', 5);
  pLine(ctx, cx, cy, cx + r * 0.78 * Math.sin(ma), cy - r * 0.78 * Math.cos(ma), '#c0392b', 3);
  pCirc(ctx, cx, cy, 5, '#2c3e50');
}

function clkMin(m) { return m === 0 ? '0' : (m < 10 ? '0' + m : String(m)); }

function clkText(hh, mm) {
  var h12 = hh > 12 ? hh - 12 : hh;
  if (mm === 0) return h12 + ' 时';
  if (mm === 30) return h12 + ' 时半';
  return h12 + ' 时 ' + mm + ' 分';
}

/* ===== 小学一年级上册（p1a） ===== */

/* 数一数、比多少、比长短、第几 */
function p1aCountLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 7, k: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n), K = Math.round(p.k);
  var rows, info = s0.info;
  var col = ['#c0392b', '#185fa5', '#0f6e56', '#8a5a00', '#7a3f9d'];

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '一个一个地数，数到最后一个就是总数', '#2c3e50', 1);
      for (i = 0; i < N; i++) {
        var cx = 105 + (i % 5) * 100, cy = 125 + Math.floor(i / 5) * 100;
        pCirc(ctx, cx, cy, 27, col[i % 5]);
        pTxt(ctx, cx, cy, String(i + 1), '#ffffff', 1, 1);
      }
      pTxt(ctx, 50, 330, '一共 ' + N + ' 个', '#c0392b', 1);
      pTxt(ctx, 50, 362, '数过的在脑子里做标记：不重复，也不漏掉', '#6b7a89');
      pTxt(ctx, 430, 40, '最后一个数到 ' + N, '#0f6e56');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '一一对应地比：谁有剩下的，谁就多', '#2c3e50', 1);
      var y0 = 96, gap = 26;
      pTxt(ctx, 90, 70, '甲 ' + N + ' 个', '#c0392b', 0, 1);
      pTxt(ctx, 250, 70, '乙 ' + K + ' 个', '#185fa5', 0, 1);
      for (i = 0; i < Math.min(N, K); i++) pLine(ctx, 104, y0 + i * gap, 236, y0 + i * gap, '#c2cdd8', 1.4, [5, 4]);
      for (i = 0; i < N; i++) pCirc(ctx, 90, y0 + i * gap, 10, '#c0392b');
      for (i = 0; i < K; i++) pCirc(ctx, 250, y0 + i * gap, 10, '#185fa5');
      var d = N - K;
      pTxt(ctx, 330, 110, d > 0 ? '甲比乙多 ' + d + ' 个' : d < 0 ? '甲比乙少 ' + (-d) + ' 个' : '两人同样多', d ? '#c0392b' : '#0f6e56', 1);
      pTxt(ctx, 330, 150, '配成对的说明一样多，', '#6b7a89');
      pTxt(ctx, 330, 178, '多出来的那 ' + Math.abs(d) + ' 个就是差', '#6b7a89');
      pTxt(ctx, 330, 226, '多与少是比出来的，', '#2c3e50');
      pTxt(ctx, 330, 254, '不是看谁个儿大', '#2c3e50');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '比长短：左端对齐，看右端谁伸得远', '#2c3e50', 1);
      var bx = 140, s = 38;
      pLine(ctx, bx, 92, bx, 232, '#9aa7b4', 2, [5, 4]);
      pRect(ctx, bx, 106, N * s, 32, '#c0392b');
      pRect(ctx, bx, 176, K * s, 32, '#185fa5');
      pTxt(ctx, bx - 14, 122, '甲', '#c0392b', 0);
      pTxt(ctx, bx - 14, 192, '乙', '#185fa5', 0);
      pTxt(ctx, bx + N * s + 16, 122, N + ' 格', '#c0392b');
      pTxt(ctx, bx + K * s + 16, 192, K + ' 格', '#185fa5');
      var dd = N - K;
      pTxt(ctx, 50, 268, dd > 0 ? '甲比乙长 ' + (dd) + ' 格' : dd < 0 ? '甲比乙短 ' + (-dd) + ' 格' : '两段一样长', '#c0392b', 1);
      pTxt(ctx, 50, 304, '比长短要高的一端对齐，不能只看形状', '#6b7a89');
      pTxt(ctx, 50, 336, '比高矮也是同一个道理：从同一地面量起', '#6b7a89');
    } else {
      pTxt(ctx, 50, 40, '从左往右数，数到第几个', '#2c3e50', 1);
      for (i = 0; i < 6; i++) {
        var x2 = 92 + i * 88, y2 = 155, on = (i + 1) === K;
        pCirc(ctx, x2, y2, 30, on ? '#c0392b' : '#dfe8f1');
        pCirc(ctx, x2 - 10, y2 - 6, 4, on ? '#ffffff' : '#6b7a89');
        pCirc(ctx, x2 + 10, y2 - 6, 4, on ? '#ffffff' : '#6b7a89');
        pTxt(ctx, x2, y2 + 52, '第 ' + (i + 1), on ? '#c0392b' : '#8a97a4', 0, 1);
      }
      pTxt(ctx, 50, 250, '红的是第 ' + K + ' 个', '#c0392b', 1);
      pTxt(ctx, 50, 286, '它的前面有 ' + (K - 1) + ' 个，后面有 ' + (6 - K) + ' 个', '#2c3e50');
      pTxt(ctx, 50, 322, '「第几」只指 1 个，「几个」指数全部', '#0f6e56');
      pTxt(ctx, 50, 356, '顺序要在同一条起点线上数', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '数到最后一个，就是**总数 ' + N + '**。'
        : mode === 1 ? '一一对应后，**多出来的就是差 ' + (N - K) + '**。'
          : mode === 2 ? '一端对齐，**比另一端**。'
            : '「第 ' + K + ' 个」= 从起点数，**数到它为止**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['甲的数量', N, 3, 10, 1, function (v) { N = Math.round(v); draw(); }, [0, 1, 2]],
    ['乙的数量', K, 1, 6, 1, function (v) { K = Math.round(v); draw(); }, [1, 2, 3]]
  ]);
  draw();
}

/* 上下、前后、左右、位置的相对性 */
function p1aPosLab(el, cfg) {
  var p = Object.assign({ mode: 0, k: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), K = Math.round(p.k);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '上、下：说竖着的位置', '#2c3e50', 1);
      var shelf = [106, 186, 266], pick = (K - 1) % 3;
      for (i = 0; i < 3; i++) pRect(ctx, 90, shelf[i], 300, 9, '#d7c4a8');
      for (i = 0; i < 3; i++) {
        var on = i === pick;
        pRect(ctx, 150, shelf[i] - 46, 46, 46, on ? '#fdecea' : '#eef4fa', on ? '#c0392b' : '#9aa7b4', on ? 3 : 1.6);
        pTxt(ctx, 173, shelf[i] - 76, '第 ' + (i + 1) + ' 层', on ? '#c0392b' : '#8a97a4', 0, 1);
      }
      pLine(ctx, 300, shelf[pick] - 26, 340, shelf[pick] - 26, '#c0392b', 2);
      pTxt(ctx, 348, shelf[pick] - 26, '就是它', '#c0392b');
      pTxt(ctx, 50, 320, '红盒子在第 ' + (pick + 1) + ' 层（从上往下数）', '#c0392b', 1);
      pTxt(ctx, 50, 352, pick === 0 ? '它上面没有东西，在最上面' : '它上面还有 ' + pick + ' 个盒子', '#2c3e50');
      pTxt(ctx, 50, 382, '上、下是相对的：说「在…上面」要讲清跟谁比', '#6b7a89');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '前、后：排成一队，脸朝的方向是前', '#2c3e50', 1);
      pTxt(ctx, 62, 88, '前', '#c0392b');
      pArrow(ctx, 50, 88, 92, 88, '#c0392b', 2);
      for (i = 0; i < 5; i++) {
        var x2 = 130 + i * 88, on2 = (i + 1) === K;
        pCirc(ctx, x2, 150, 28, on2 ? '#c0392b' : '#dfe8f1');
        pTxt(ctx, x2, 150, String(i + 1), on2 ? '#ffffff' : '#6b7a89', 1, 1);
        pTxt(ctx, x2, 196, i + 1 === 1 ? '队首' : '', '#8a97a4', 0, 1);
      }
      pTxt(ctx, 50, 240, '红的是第 ' + K + ' 个', '#c0392b', 1);
      pTxt(ctx, 50, 276, '它前面有 ' + (K - 1) + ' 人，后面有 ' + (5 - K) + ' 人', '#2c3e50');
      pTxt(ctx, 50, 312, K === 1 ? '队首的人前面没有人' : K === 5 ? '队尾的人后面没有人' : '前后都以「它自己」为界线', '#0f6e56');
      pTxt(ctx, 50, 346, '转身之后，前和后会对调', '#6b7a89');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '左、右：以「自己的左右手」为准', '#2c3e50', 1);
      pTxt(ctx, 60, 92, '左手', '#185fa5', 0);
      pTxt(ctx, 540, 92, '右手', '#185fa5', 0);
      for (i = 0; i < 5; i++) {
        var x3 = 110 + i * 100, on3 = (i + 1) === K;
        pRect(ctx, x3 - 26, 130, 52, 52, on3 ? '#fdecea' : '#eef4fa', on3 ? '#c0392b' : '#9aa7b4', on3 ? 3 : 1.6);
        pTxt(ctx, x3, 210, String(i + 1), on3 ? '#c0392b' : '#8a97a4', 0, 1);
      }
      pTxt(ctx, 50, 258, '红方块是第 ' + K + ' 个', '#c0392b', 1);
      pTxt(ctx, 50, 294, '它左边有 ' + (K - 1) + ' 个，右边有 ' + (5 - K) + ' 个', '#2c3e50');
      pTxt(ctx, 50, 330, '左右容易混：先分清「谁的左右」', '#0f6e56');
      pTxt(ctx, 50, 364, '两个人的左右常常是相反的', '#6b7a89');
    } else {
      pTxt(ctx, 50, 40, '同一件东西，两人说法却相反', '#2c3e50', 1);
      var ax = 150, bx2 = 490, cakeX = 190 + K * 62;
      pCirc(ctx, ax, 175, 26, '#185fa5');
      pTxt(ctx, ax, 175, '甲', '#ffffff', 1, 1);
      pCirc(ctx, bx2, 175, 26, '#0f6e56');
      pTxt(ctx, bx2, 175, '乙', '#ffffff', 1, 1);
      pArrow(ctx, ax + 34, 175, ax + 74, 175, '#185fa5', 2);
      pArrow(ctx, bx2 - 34, 175, bx2 - 74, 175, '#0f6e56', 2);
      pTxt(ctx, ax, 122, '甲朝右看', '#185fa5', 0, 1);
      pTxt(ctx, bx2, 122, '乙朝左看', '#0f6e56', 0, 1);
      pRect(ctx, cakeX - 22, 158, 44, 34, '#f6c445', '#8a5a00', 1.6);
      pTxt(ctx, cakeX, 210, '蛋糕', '#8a5a00', 0, 1);
      pTxt(ctx, 50, 268, '甲说：蛋糕在我的右边', '#185fa5', 1);
      pTxt(ctx, 50, 304, '乙说：蛋糕在我的左边', '#0f6e56', 1);
      pTxt(ctx, 50, 340, '两人面对面，左右正好相反', '#c0392b');
      pTxt(ctx, 50, 372, '所以描述位置一定要说「从谁的角度看」', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '上、下说**竖着**的位置。'
        : mode === 1 ? '前、后说**横着排队**的顺序。'
          : mode === 2 ? '左、右以**自己的左右手**为准。'
            : '面对面时，两人的左右**相反**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['选第几个', K, 1, 5, 1, function (v) { K = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}

/* 1~5 的认识、比大小、5 以内加减法 */
function p1a15Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 3, b: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '数一数：几个圆点就是几', '#2c3e50', 1);
      for (i = 0; i < A; i++) pCirc(ctx, 105 + i * 76, 165, 30, '#c0392b');
      pBig(ctx, 520, 180, String(A), '#c0392b', 90);
      pRect(ctx, 470, 100, 100, 130, null, '#c0392b', 2.4);
      pTxt(ctx, 50, 262, A + ' 个圆点 → 写作 ' + A, '#c0392b', 1);
      pTxt(ctx, 50, 298, '1、2、3…数到几，就是几个', '#2c3e50');
      pTxt(ctx, 50, 334, '每个数都比前一个数多 1', '#0f6e56');
      pTxt(ctx, 50, 366, '0 表示一个也没有', '#6b7a89');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '比大小：先一一对应，再看剩下的', '#2c3e50', 1);
      for (i = 0; i < A; i++) pCirc(ctx, 95 + i * 62, 130, 26, '#c0392b');
      for (i = 0; i < B; i++) pCirc(ctx, 95 + i * 62, 230, 26, '#185fa5');
      pTxt(ctx, 60, 96, '红 ' + A + ' 个', '#c0392b', 0);
      pTxt(ctx, 60, 196, '蓝 ' + B + ' 个', '#185fa5', 0);
      var sym = A > B ? '>' : A < B ? '<' : '=';
      pBig(ctx, 400, 180, sym, '#0f6e56', 64);
      pTxt(ctx, 50, 300, A + ' ' + sym + ' ' + B, '#0f6e56', 1);
      pTxt(ctx, 50, 336, '开口对着大数，尖头对着小数', '#2c3e50');
      pTxt(ctx, 50, 368, '同样多就用等号', '#6b7a89');
    } else if (mode === 2) {
      var s2 = Math.min(A, 5), add = Math.min(B, 5 - s2), sum = s2 + add;
      pTxt(ctx, 50, 40, '把两部分合起来，用加法', '#2c3e50', 1);
      for (i = 0; i < s2; i++) pCirc(ctx, 80 + i * 58, 150, 24, '#c0392b');
      pTxt(ctx, 320, 150, '+', '#2c3e50', 1, 1);
      for (i = 0; i < add; i++) pCirc(ctx, 360 + i * 58, 150, 24, '#185fa5');
      pTxt(ctx, 80, 200, s2 + ' 个', '#c0392b', 0);
      pTxt(ctx, 360, 200, add + ' 个', '#185fa5', 0);
      pBig(ctx, 500, 165, '=', '#2c3e50', 44);
      pBig(ctx, 580, 180, String(sum), '#0f6e56', 66);
      pTxt(ctx, 50, 262, s2 + ' + ' + add + ' = ' + sum, '#0f6e56', 1);
      pTxt(ctx, 50, 298, '合在一起数一数，就是和', '#2c3e50');
      pTxt(ctx, 50, 334, '加号读作「加」，结果叫「和」', '#6b7a89');
      pTxt(ctx, 50, 366, '两部分交换位置，和不变', '#6b7a89');
    } else {
      var big = Math.max(A, B), small = Math.min(A, B), rest = big - small;
      pTxt(ctx, 50, 40, '从总数里去掉一部分，用减法', '#2c3e50', 1);
      for (i = 0; i < big; i++) {
        var gone = i < small;
        pCirc(ctx, 85 + i * 60, 150, 24, gone ? '#f0f3f6' : '#c0392b', gone ? '#c2cdd8' : null, 1.4);
        if (gone) pLine(ctx, 85 + i * 60 - 17, 133, 85 + i * 60 + 17, 167, '#9aa7b4', 2);
      }
      pTxt(ctx, 50, 210, '划掉的 ' + small + ' 个就是去掉的', '#6b7a89');
      pBig(ctx, 200, 290, String(big), '#c0392b', 46);
      pBig(ctx, 260, 290, '−', '#2c3e50', 40);
      pBig(ctx, 320, 290, String(small), '#185fa5', 46);
      pBig(ctx, 380, 290, '=', '#2c3e50', 40);
      pBig(ctx, 440, 290, String(rest), '#0f6e56', 52);
      pTxt(ctx, 50, 340, big + ' 个去掉 ' + small + ' 个，还剩 ' + rest + ' 个', '#2c3e50');
      pTxt(ctx, 50, 372, '减法结果叫「差」，去掉的都划掉', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '数到几就是**几**。'
        : mode === 1 ? '**开口朝大数**：' + A + ' ' + (A > B ? '>' : A < B ? '<' : '=') + ' ' + B + '。'
          : mode === 2 ? '合起来用**加法**：' + A + ' + ' + B + '。'
            : '去掉一部分用**减法**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['第一个数', A, 1, 5, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第二个数', B, 1, 5, 1, function (v) { B = Math.round(v); draw(); }, [1, 2, 3]]
  ]);
  draw();
}

/* 四种立体图形：名称 / 滚动 / 生活原型 / 数图形 */
function pSolid(ctx, k, cx, cy, s, hi) {
  var stroke = hi ? '#c0392b' : '#2c3e50', fill = hi ? '#fdecea' : '#eef4fa', lw = hi ? 3 : 1.8;
  if (k === 0 || k === 1) {
    var ww = k === 0 ? s * 1.2 : s, hh = k === 0 ? s * 0.78 : s;
    var dx = s * 0.36, dy = s * 0.3;
    ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(cx - ww / 2, cy - hh / 2);
    ctx.lineTo(cx - ww / 2 + dx, cy - hh / 2 - dy);
    ctx.lineTo(cx + ww / 2 + dx, cy - hh / 2 - dy);
    ctx.lineTo(cx + ww / 2, cy - hh / 2);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.rect(cx - ww / 2, cy - hh / 2, ww, hh); ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + ww / 2, cy - hh / 2);
    ctx.lineTo(cx + ww / 2 + dx, cy - hh / 2 - dy);
    ctx.lineTo(cx + ww / 2 + dx, cy + hh / 2 - dy);
    ctx.lineTo(cx + ww / 2, cy + hh / 2);
    ctx.closePath(); ctx.fill(); ctx.stroke();
  } else if (k === 2) {
    var rw = s * 0.52, rh = s * 1.1, ry = s * 0.15;
    ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.rect(cx - rw, cy - rh / 2, rw * 2, rh); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy - rh / 2, rw, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx, cy + rh / 2, rw, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.arc(cx, cy, s * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = fill; ctx.fill();
    ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke();
    ctx.beginPath(); ctx.ellipse(cx - s * 0.2, cy - s * 0.22, s * 0.24, s * 0.14, -0.5, 0, Math.PI * 2);
    ctx.strokeStyle = hi ? '#c0392b' : '#9aa7b4'; ctx.lineWidth = 1.4; ctx.stroke();
  }
}

function p1aShapeLab(el, cfg) {
  var p = Object.assign({ mode: 0, t: 0, k: 1 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), T = Math.round(p.t), K = Math.round(p.k);
  var rows, info = s0.info;
  var NAMES = ['长方体', '正方体', '圆柱', '球'];
  var LIFE = ['冰箱、砖头、书本', '骰子、方糖、魔方', '易拉罐、水杯、笔筒', '足球、皮球、汤圆'];

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 36, '四种立体图形，摸了才知道长什么样', '#2c3e50', 1);
      var pos = [[175, 140], [445, 140], [175, 290], [445, 290]];
      for (i = 0; i < 4; i++) {
        pSolid(ctx, i, pos[i][0], pos[i][1], 72, i === T);
        pTxt(ctx, pos[i][0], pos[i][1] + 66, NAMES[i], i === T ? '#c0392b' : '#6b7a89', i === T, 1);
      }
      info.innerHTML = '<span class="viz-meta">当前：**' + NAMES[T] + '**——' + LIFE[T] + '。</span>';
    } else if (mode === 1) {
      pTxt(ctx, 50, 36, '斜面上一放：会滚的、不会滚的一目了然', '#2c3e50', 1);
      pLine(ctx, 70, 300, 580, 190, '#8a97a4', 3);
      pTxt(ctx, 60, 320, '斜面', '#8a97a4');
      // 会滚：圆柱躺下 + 球
      var onSlope = [[150, 292], [300, 254], [470, 205]];
      // 圆柱躺下（手算世界坐标，不依赖 translate）
      var lcx = onSlope[0][0], lcy = onSlope[0][1] - 26;
      ctx.fillStyle = T === 2 ? '#fdecea' : '#eef4fa';
      ctx.strokeStyle = T === 2 ? '#c0392b' : '#2c3e50';
      ctx.lineWidth = T === 2 ? 3 : 1.8;
      ctx.beginPath(); ctx.rect(lcx - 40, lcy - 22, 80, 44); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(lcx + 40, lcy, 9, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(lcx - 40, lcy, 9, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      pSolid(ctx, 3, 300, 228, 40, T === 3);
      pTxt(ctx, 150, 336, '圆柱躺下会滚', '#c0392b');
      pTxt(ctx, 300, 348, '球怎么放都会滚', '#c0392b');
      pArrow(ctx, 200, 322, 250, 322, '#c0392b', 2);
      pArrow(ctx, 348, 358, 398, 358, '#c0392b', 2);
      // 不会滚：长方体、正方体 立在平面上
      pLine(ctx, 420, 330, 610, 330, '#8a97a4', 2);
      pSolid(ctx, 0, 470, 300, 42, T === 0);
      pSolid(ctx, 1, 570, 288, 40, T === 1);
      pTxt(ctx, 470, 372, '只会滑，不会滚', '#6b7a89');
      pTxt(ctx, 50, 60, '有平面的容易摆稳，有曲面的容易滚', '#0f6e56');
    } else if (mode === 2) {
      pTxt(ctx, 50, 36, '生活中到处是这四种形状', '#2c3e50', 1);
      var lp = [[170, 150], [470, 150], [170, 300], [470, 300]];
      for (i = 0; i < 4; i++) {
        pRect(ctx, lp[i][0] - 78, lp[i][1] - 58, 156, 116, i === T ? '#fdecea' : '#f7fafd', i === T ? '#c0392b' : '#e3ebf3', 2);
        pSolid(ctx, i, lp[i][0], lp[i][1] - 6, 46, i === T);
        pTxt(ctx, lp[i][0], lp[i][1] + 42, NAMES[i], i === T ? '#c0392b' : '#6b7a89', i === T, 1);
      }
      pTxt(ctx, 50, 386, LIFE[T], '#c0392b');
      info.innerHTML = '<span class="viz-meta">' + NAMES[T] + '：' + LIFE[T] + '。</span>';
    } else {
      pTxt(ctx, 50, 36, '数一数：每种形状各有几个', '#2c3e50', 1);
      var mix = [0, 2, 0, 1, 3, 0, 2, 1];
      var cnt = [0, 0, 0, 0], mx = 0;
      for (i = 0; i < mix.length; i++) cnt[mix[i]]++;
      for (i = 0; i < 4; i++) if (cnt[i] > mx) mx = cnt[i];
      for (i = 0; i < mix.length; i++) {
        var gx = 110 + (i % 4) * 110, gy = 120 + Math.floor(i / 4) * 110;
        pSolid(ctx, mix[i], gx, gy, 34, mix[i] === (K - 1) % 4);
      }
      pTxt(ctx, 50, 320, NAMES[(K - 1) % 4] + ' 有 ' + cnt[(K - 1) % 4] + ' 个', '#c0392b', 1);
      pTxt(ctx, 50, 354, '长方体 ' + cnt[0] + '、正方体 ' + cnt[1] + '、圆柱 ' + cnt[2] + '、球 ' + cnt[3], '#2c3e50');
      pTxt(ctx, 50, 384, '按形状分类，相同形状的归成一类', '#6b7a89');
    }

    if (mode === 0) {
      /* info 已在分支内写 */
    } else if (mode !== 2) {
      info.innerHTML = '<span class="viz-meta">' +
        (mode === 1 ? '有**曲面**的会滚，有**平面**的能摆稳。' : '按形状**分类数**，别漏也別重。') + '</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['选一个形状', T, 0, 3, 1, function (v) { T = Math.round(v); draw(); }, [0, 1, 2]],
    ['数的种类', K, 1, 4, 1, function (v) { K = Math.round(v); draw(); }, [3]]
  ]);
  draw();
}

/* 6~10 的认识、10 的组成、一图四式、连加连减 */
function p1a610Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 7, b: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '十格阵：满格是 10，看着就知道有几个', '#2c3e50', 1);
      pTen(ctx, 90, 100, A, '#c0392b', 42, 40);
      pRect(ctx, 90, 100, 210, 80, null, '#c0392b', 2.6);
      pBig(ctx, 480, 150, String(A), '#c0392b', 90);
      pTxt(ctx, 50, 258, A + ' 个圆点 → 写作 ' + A, '#c0392b', 1);
      pTxt(ctx, 50, 294, '6 到 10：比 5 多出来 ' + Math.max(0, A - 5) + ' 个', '#2c3e50');
      pTxt(ctx, 50, 330, '先看整格，再数零散的', '#0f6e56');
      pTxt(ctx, 50, 362, '10 个一是 1 个十，后面会常用', '#6b7a89');
    } else if (mode === 1) {
      var other = 10 - A;
      pTxt(ctx, 50, 40, '10 的组成：两部分合起来正好装满', '#2c3e50', 1);
      pTen(ctx, 90, 100, A, '#c0392b', 42, 40);
      for (i = 0; i < other; i++) {
        var idx = A + i;
        var cx = 90 + (idx % 5) * 42, cy = 100 + Math.floor(idx / 5) * 40;
        pCirc(ctx, cx + 21, cy + 20, 12, '#185fa5');
      }
      pTxt(ctx, 50, 258, A + ' + ' + other + ' = 10', '#c0392b', 1);
      pTxt(ctx, 50, 294, '红 ' + A + ' 个，蓝 ' + other + ' 个，正好 10 个', '#2c3e50');
      pTxt(ctx, 50, 330, '看到 ' + A + ' 就想到 ' + other + '：凑十的好搭档', '#0f6e56');
      pTxt(ctx, 50, 362, '10 的组成要背到脱口而出', '#6b7a89');
    } else if (mode === 2) {
      var red = Math.min(A, 10), blue = Math.min(B, 10 - red), tot = red + blue;
      pTxt(ctx, 50, 40, '一幅图，写出四个算式', '#2c3e50', 1);
      for (i = 0; i < red; i++) pCirc(ctx, 90 + i * 42, 110, 17, '#c0392b');
      for (i = 0; i < blue; i++) pCirc(ctx, 90 + (red + i) * 42, 110, 17, '#185fa5');
      pTxt(ctx, 90, 148, red + ' 个红', '#c0392b', 0);
      pTxt(ctx, 90 + red * 42, 148, blue + ' 个蓝', '#185fa5', 0);
      pTxt(ctx, 50, 196, red + ' + ' + blue + ' = ' + tot, '#2c3e50', 1);
      pTxt(ctx, 50, 230, blue + ' + ' + red + ' = ' + tot, '#2c3e50', 1);
      pTxt(ctx, 50, 264, tot + ' − ' + red + ' = ' + blue, '#0f6e56', 1);
      pTxt(ctx, 50, 298, tot + ' − ' + blue + ' = ' + red, '#0f6e56', 1);
      pTxt(ctx, 50, 340, '上面两式是加法：合起来；下面两式是减法：去掉一部分', '#6b7a89');
      pTxt(ctx, 50, 372, '同一幅图，能问四个问题', '#6b7a89');
    } else {
      var step1 = 10 - Math.min(A, 9), step2 = Math.min(step1 + B, 10);
      pTxt(ctx, 50, 40, '连加连减：一步一步算，先算前两个', '#2c3e50', 1);
      pTen(ctx, 60, 74, 10, '#c0392b', 36, 34);
      pTxt(ctx, 270, 100, '10 个', '#c0392b', 0);
      pTen(ctx, 60, 168, step1, '#c0392b', 36, 34);
      pTxt(ctx, 270, 194, '减 ' + Math.min(A, 9) + ' 后剩 ' + step1, '#c0392b', 0);
      pTen(ctx, 60, 262, step2, '#0f6e56', 36, 34);
      pTxt(ctx, 270, 288, '加 ' + B + ' 后是 ' + step2, '#0f6e56', 0);
      pTxt(ctx, 400, 140, '10 − ' + Math.min(A, 9) + ' = ' + step1, '#2c3e50', 0);
      pTxt(ctx, 400, 234, step1 + ' + ' + B + ' = ' + step2, '#2c3e50', 0);
      pTxt(ctx, 400, 306, '综合：10 − ' + Math.min(A, 9) + ' + ' + B + ' = ' + step2, '#0f6e56', 0);
      pTxt(ctx, 50, 356, '从左往右算，把每一步的结果记下来', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '先看**整格**，再数零散。'
        : mode === 1 ? A + ' 和 ' + (10 - A) + ' 合成 **10**。'
          : mode === 2 ? '一图四式：**两加两减**。'
            : '连加连减：**从左到右**逐步算。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['第一个数', A, 1, 10, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第二个数', B, 0, 10, 1, function (v) { B = Math.round(v); draw(); }, [2, 3]]
  ]);
  draw();
}

/* 11~20 的认识、数位、比大小、十加几 */
function p1a1120Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 15, b: 18 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var ten = Math.floor(A / 10), one = A % 10;

    if (mode === 0) {
      pTxt(ctx, 50, 40, '把 10 根捆成一捆，就是 1 个十', '#2c3e50', 1);
      pBundle(ctx, 120, 110, '#8a5a00');
      pTxt(ctx, 150, 186, '1 个十', '#c0392b', 0, 1);
      pSticks(ctx, 300, 110, one, '#185fa5');
      if (one === 0) pTxt(ctx, 300, 138, '没有散的', '#8a97a4', 0);
      pTxt(ctx, 300, 186, one + ' 个一', '#185fa5', 0, 1);
      pTxt(ctx, 50, 250, '1 个十和 ' + one + ' 个一，合起来是 ' + A, '#c0392b', 1);
      pTxt(ctx, 50, 286, '捆好的那一捆，就是十位上的 1', '#2c3e50');
      pTxt(ctx, 50, 322, '散着的根数，就是个位上的数', '#2c3e50');
      pTxt(ctx, 50, 356, '满十就捆一捆 —— 这就是「十进」', '#0f6e56');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '数位表：左边一位是十位，右边一位是个位', '#2c3e50', 1);
      pRect(ctx, 140, 90, 150, 56, '#eef4fa', '#9aa7b4');
      pRect(ctx, 290, 90, 150, 56, '#eef4fa', '#9aa7b4');
      pTxt(ctx, 215, 118, '十位', '#6b7a89', 0, 1);
      pTxt(ctx, 365, 118, '个位', '#6b7a89', 0, 1);
      pRect(ctx, 140, 146, 150, 90, null, '#c0392b', 2.4);
      pRect(ctx, 290, 146, 150, 90, null, '#185fa5', 2.4);
      pBig(ctx, 215, 195, String(ten), '#c0392b', 58);
      pBig(ctx, 365, 195, String(one), '#185fa5', 58);
      pTxt(ctx, 50, 272, '读作：' + A + '，写作：' + A, '#c0392b', 1);
      pTxt(ctx, 50, 308, '十位上的 ' + ten + ' 表示 ' + (ten * 10) + '，个位上的 ' + one + ' 表示 ' + one, '#2c3e50');
      pTxt(ctx, 50, 342, '同一个数字在不同数位上，表示的大小不同', '#0f6e56');
      pTxt(ctx, 50, 374, '11 里面有两个 1，意思却不一样', '#6b7a89');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '比大小：先看十位，十位相同再看个位', '#2c3e50', 1);
      var ax0 = 110, ax1 = 560, ay = 190;
      pLine(ctx, ax0, ay, ax1, ay, '#2c3e50', 2);
      pArrow(ctx, ax1 - 6, ay, ax1, ay, '#2c3e50', 2);
      for (i = 10; i <= 20; i++) {
        var ax = ax0 + (i - 10) / 10 * (ax1 - ax0);
        pLine(ctx, ax, ay, ax, ay + (i % 5 === 0 ? 9 : 5), '#9aa7b4', 1.2);
        if (i % 5 === 0 || i === 11 || i === 19) pTxt(ctx, ax, ay + 26, String(i), '#6b7a89', 0, 1);
      }
      var pa = ax0 + (A - 10) / 10 * (ax1 - ax0), pb = ax0 + (B - 10) / 10 * (ax1 - ax0);
      pCirc(ctx, pa, ay, 8, '#c0392b');
      pCirc(ctx, pb, ay, 8, '#185fa5');
      pTxt(ctx, pa, ay - 24, String(A), '#c0392b', 1, 1);
      pTxt(ctx, pb, ay - 52, String(B), '#185fa5', 1, 1);
      var sym = A > B ? '>' : A < B ? '<' : '=';
      pTxt(ctx, 50, 268, A + ' ' + sym + ' ' + B, '#0f6e56', 1);
      pTxt(ctx, 50, 304, A === B ? '两个数一样大' : '在数轴上，右边的数更大', '#2c3e50');
      pTxt(ctx, 50, 338, '十位不同：十位大的数就大', '#6b7a89');
      pTxt(ctx, 50, 370, '十位相同：再比个位', '#6b7a89');
    } else {
      pTxt(ctx, 50, 40, '十加几：整捆的不动，只加散的', '#2c3e50', 1);
      pBundle(ctx, 110, 100, '#8a5a00');
      pTxt(ctx, 140, 180, '10', '#c0392b', 1, 1);
      pTxt(ctx, 240, 128, '+', '#2c3e50', 1, 1);
      pSticks(ctx, 285, 100, one, '#185fa5');
      pTxt(ctx, 320, 180, one, '#185fa5', 1, 1);
      pTxt(ctx, 400, 128, '=', '#2c3e50', 1, 1);
      pBig(ctx, 480, 130, String(A), '#0f6e56', 56);
      pTxt(ctx, 50, 250, '10 + ' + one + ' = ' + A, '#0f6e56', 1);
      pTxt(ctx, 50, 286, '反过来：' + A + ' − ' + one + ' = 10', '#2c3e50');
      pTxt(ctx, 50, 322, '整十数加几，十位不变，个位就是那个几', '#0f6e56');
      pTxt(ctx, 50, 356, '十几减几，剩下的还是那一整捆', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**10 根捆 1 捆 = 1 个十**。'
        : mode === 1 ? '十位表示**几个十**，个位表示**几个一**。'
          : mode === 2 ? '先比**十位**，再比**个位**。'
            : '十加几得十几，**十位不变**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['第一个数', A, 11, 20, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第二个数', B, 11, 20, 1, function (v) { B = Math.round(v); draw(); }, [2]]
  ]);
  draw();
}

/* 认识钟表：钟面 / 整时 / 半时 / 大约几时 */
function p1aClockLab(el, cfg) {
  var p = Object.assign({ mode: 0, h: 8, m: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), H = Math.round(p.h), M = Math.round(p.m);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var cx = 210, cy = 190, r = 128;

    if (mode === 0) {
      pClock(ctx, cx, cy, r, H, M, { bigNum: false });
      pTxt(ctx, 400, 90, '钟面上有 12 个数', '#2c3e50', 0);
      pTxt(ctx, 400, 122, '从 1 到 12 围成一圈', '#6b7a89', 0);
      pTxt(ctx, 400, 160, '两根针：', '#2c3e50', 0);
      pLine(ctx, 400, 186, 440, 186, '#2c3e50', 5);
      pTxt(ctx, 452, 186, '短而粗的是时针', '#6b7a89', 0);
      pLine(ctx, 400, 214, 440, 214, '#c0392b', 3);
      pTxt(ctx, 452, 214, '长而细的是分针', '#6b7a89', 0);
      pTxt(ctx, 400, 254, '12 个数把钟面分成 12 大格', '#0f6e56', 0);
      pTxt(ctx, 400, 286, '时针走 1 大格 = 1 小时', '#6b7a89', 0);
      pTxt(ctx, 400, 318, '分针走 1 圈 = 60 分 = 1 小时', '#6b7a89', 0);
      pTxt(ctx, 400, 352, '看时间先看时针指在哪，再看分针', '#8a5a00', 0);
    } else if (mode === 1) {
      pClock(ctx, cx, cy, r, H, 0, {});
      pTxt(ctx, 400, 120, '整时：分针正好指 12', '#2c3e50', 0);
      pBig(ctx, 440, 180, H + ':00', '#c0392b', 44);
      pTxt(ctx, 400, 232, '读作：' + H + ' 时', '#c0392b', 0);
      pTxt(ctx, 400, 268, '时针指几，就是几时', '#2c3e50', 0);
      pTxt(ctx, 400, 302, '两种写法：' + H + ' 时 或 ' + H + ':00', '#0f6e56', 0);
      pTxt(ctx, 400, 336, '分针指 12 时才叫「整时」', '#6b7a89', 0);
    } else if (mode === 2) {
      pClock(ctx, cx, cy, r, H, 30, {});
      pTxt(ctx, 400, 120, '半时：分针正好指 6', '#2c3e50', 0);
      pBig(ctx, 440, 180, H + ':30', '#c0392b', 44);
      pTxt(ctx, 400, 232, '读作：' + H + ' 时半', '#c0392b', 0);
      pTxt(ctx, 400, 268, '此时时针在 ' + H + ' 和 ' + ((H % 12) + 1) + ' 中间', '#2c3e50', 0);
      pTxt(ctx, 400, 302, '分针走半圈 = 30 分', '#0f6e56', 0);
      pTxt(ctx, 400, 336, '时针也走半大格，别以为它还指着 ' + H, '#6b7a89', 0);
    } else {
      var near = M <= 15 ? H : M >= 45 ? H + 1 : H;
      pClock(ctx, cx, cy, r, H, M, {});
      pTxt(ctx, 400, 110, '还没到整点或刚过一点', '#2c3e50', 0);
      pBig(ctx, 450, 168, clkText(H, M), '#c0392b', 34);
      pTxt(ctx, 400, 216, M === 0 ? '正好 ' + H + ' 时' : M <= 15 ? H + ' 时刚过' : M >= 45 ? '快到 ' + ((H % 12) + 1) + ' 时' : H + ' 时半左右', '#0f6e56', 0);
      pTxt(ctx, 400, 254, M === 0 ? '分针指 12' : '大约 ' + near + ' 时', '#c0392b', 0);
      pTxt(ctx, 400, 290, '「大约几时」看时针离哪个数最近', '#6b7a89', 0);
      pTxt(ctx, 400, 324, '分针没到 12：还没到整点', '#6b7a89', 0);
      pTxt(ctx, 400, 356, '分针过了 12：刚过整点', '#6b7a89', 0);
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**短针时针、长针分针**。'
        : mode === 1 ? '分针指 **12** → 整时。'
          : mode === 2 ? '分针指 **6** → 半时。'
            : '**大约几时**：看时针靠近哪个数。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['几时', H, 1, 12, 1, function (v) { H = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['几分', M, 0, 55, 5, function (v) { M = Math.round(v); draw(); }, [0, 3]]
  ]);
  draw();
}

/* 20 以内进位加法：9 加几 / 凑十法 / 交换加数 / 解决问题 */
function p1aCarryLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 8, b: 5 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      var need = 1, rest = B - 1;
      pTxt(ctx, 50, 40, '9 加几：从第二个数里借 1，先凑成 10', '#2c3e50', 1);
      pTen(ctx, 70, 100, 9, '#c0392b', 40, 38);
      pTxt(ctx, 70, 190, '9 个，差 1 个就满 10', '#c0392b', 0);
      pTen(ctx, 330, 100, B, '#185fa5', 40, 38);
      pTxt(ctx, 330, 190, B + ' 个：拆成 1 和 ' + rest, '#185fa5', 0);
      pArrow(ctx, 310, 120, 290, 120, '#8a5a00', 2);
      pTxt(ctx, 300, 96, '借 1', '#8a5a00', 0, 1);
      pTxt(ctx, 50, 240, '9 + 1 = 10', '#c0392b', 1);
      pTxt(ctx, 50, 274, B + ' = 1 + ' + rest, '#185fa5', 1);
      pTxt(ctx, 50, 308, '10 + ' + rest + ' = ' + (9 + B), '#0f6e56', 1);
      pTxt(ctx, 50, 348, '9 + ' + B + ' = ' + (9 + B) + '（凑十法）', '#2c3e50');
      pTxt(ctx, 50, 380, '见 9 想 1：这就是「凑十」的开始', '#6b7a89');
    } else if (mode === 1) {
      var needA = 10 - A, restB = B - needA, okToTen = B >= needA;
      pTxt(ctx, 50, 40, '凑十法：看第一个数差几凑成 10，就把第二个数拆开', '#2c3e50', 1);
      pTen(ctx, 70, 100, A, '#c0392b', 40, 38);
      pTxt(ctx, 70, 190, A + ' 个，差 ' + needA + ' 个满 10', '#c0392b', 0);
      pTen(ctx, 330, 100, B, '#185fa5', 40, 38);
      pTxt(ctx, 330, 190, B + ' 个', '#185fa5', 0);
      pTxt(ctx, 50, 240, okToTen ? A + ' + ' + needA + ' = 10' : A + ' + ' + B + ' 还没到 10，不用拆', '#c0392b', 1);
      if (okToTen) {
        pTxt(ctx, 50, 274, B + ' = ' + needA + ' + ' + restB, '#185fa5', 1);
        pTxt(ctx, 50, 308, '10 + ' + restB + ' = ' + (A + B), '#0f6e56', 1);
      }
      pTxt(ctx, 50, 348, A + ' + ' + B + ' = ' + (A + B), '#2c3e50');
      pTxt(ctx, 50, 380, '拆小数、凑大数，算得又快又准', '#6b7a89');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '交换加数：位置换了，得数不变', '#2c3e50', 1);
      for (i = 0; i < B; i++) pCirc(ctx, 90 + i * 48, 110, 19, '#185fa5');
      pTxt(ctx, 150, 156, B + ' 个 + ' + A + ' 个', '#185fa5', 0, 1);
      for (i = 0; i < A; i++) pCirc(ctx, 330 + i * 34, 110, 15, '#c0392b');
      pTxt(ctx, 380, 156, A + ' 个', '#c0392b', 0);
      pTxt(ctx, 50, 210, B + ' + ' + A + ' = ' + (A + B), '#185fa5', 1);
      pTxt(ctx, 50, 250, A + ' + ' + B + ' = ' + (A + B), '#c0392b', 1);
      pTxt(ctx, 50, 296, '两式得数一样：加法可以交换位置', '#0f6e56');
      pTxt(ctx, 50, 330, '但凑十时，用「大数 + 小数」更快', '#2c3e50');
      pTxt(ctx, 50, 364, '例：' + Math.max(A, B) + ' + ' + Math.min(A, B) + ' 比反过来好算', '#6b7a89');
    } else {
      var total = A + B;
      pTxt(ctx, 50, 40, '解决问题：先说清「已知」和「要求」', '#2c3e50', 1);
      for (i = 0; i < A; i++) pCirc(ctx, 80 + (i % 5) * 34, 110 + Math.floor(i / 5) * 34, 13, '#c0392b');
      for (i = 0; i < B; i++) pCirc(ctx, 300 + (i % 5) * 34, 110 + Math.floor(i / 5) * 34, 13, '#185fa5');
      pTxt(ctx, 80, 176, '第一组 ' + A + ' 人', '#c0392b', 0);
      pTxt(ctx, 300, 176, '第二组 ' + B + ' 人', '#185fa5', 0);
      pTxt(ctx, 50, 226, '一共有多少人？', '#2c3e50', 1);
      pTxt(ctx, 50, 262, A + ' + ' + B + ' = ' + total + '（人）', '#c0392b', 1);
      pTxt(ctx, 50, 302, '求「一共」用加法：把两部分合起来', '#0f6e56');
      pTxt(ctx, 50, 336, '算完别忘了写单位，再回答题目问的问题', '#6b7a89');
      pTxt(ctx, 50, 368, '再回读一遍：' + total + ' 人合理吗？', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '见 **9 想 1**：拆第二个数。'
        : mode === 1 ? '**拆小数、凑大数、凑成十**。'
          : mode === 2 ? '**交换加数**，得数不变。'
            : '求一共 → **加法**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['第一个加数', A, 5, 9, 1, function (v) { A = Math.round(v); draw(); }, [1, 2, 3]],
    ['第二个加数', B, 2, 9, 1, function (v) { B = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}
