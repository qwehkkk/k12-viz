/* ===== 小学一年级下册（p1b） ===== */

/* 平面图形：名称 / 面从体来 / 拼组 / 数图形 */
function pFlat(ctx, k, cx, cy, s, hi) {
  var stroke = hi ? '#c0392b' : '#2c3e50', fill = hi ? '#fdecea' : '#eef4fa', lw = hi ? 3 : 1.8;
  ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = lw;
  ctx.beginPath();
  if (k === 0) ctx.rect(cx - s * 0.62, cy - s * 0.4, s * 1.24, s * 0.8);
  else if (k === 1) ctx.rect(cx - s * 0.5, cy - s * 0.5, s, s);
  else if (k === 2) { ctx.moveTo(cx, cy - s * 0.52); ctx.lineTo(cx + s * 0.55, cy + s * 0.42); ctx.lineTo(cx - s * 0.55, cy + s * 0.42); ctx.closePath(); }
  else ctx.arc(cx, cy, s * 0.52, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
}

/* 三棱柱：正面三角形 + 后方三角形 + 三条棱 */
function pPrism(ctx, cx, cy, s, hi) {
  var stroke = hi ? '#c0392b' : '#2c3e50', fill = hi ? '#fdecea' : '#eef4fa', lw = hi ? 3 : 1.8;
  var dx = s * 0.34, dy = s * 0.3, h = s * 0.72;
  ctx.fillStyle = fill; ctx.strokeStyle = stroke; ctx.lineWidth = lw;
  // 后方三角形
  ctx.beginPath();
  ctx.moveTo(cx + dx, cy - h / 2 - dy);
  ctx.lineTo(cx + dx + s * 0.5, cy + h / 2 - dy);
  ctx.lineTo(cx + dx - s * 0.5, cy + h / 2 - dy);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // 三条棱
  pLine(ctx, cx, cy - h / 2, cx + dx, cy - h / 2 - dy, stroke, lw);
  pLine(ctx, cx + s * 0.5, cy + h / 2, cx + dx + s * 0.5, cy + h / 2 - dy, stroke, lw);
  pLine(ctx, cx - s * 0.5, cy + h / 2, cx + dx - s * 0.5, cy + h / 2 - dy, stroke, lw);
  // 正面三角形
  ctx.beginPath();
  ctx.moveTo(cx, cy - h / 2);
  ctx.lineTo(cx + s * 0.5, cy + h / 2);
  ctx.lineTo(cx - s * 0.5, cy + h / 2);
  ctx.closePath(); ctx.fill(); ctx.stroke();
}

function p1bShape2Lab(el, cfg) {
  var p = Object.assign({ mode: 0, t: 0, k: 1 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), T = Math.round(p.t), K = Math.round(p.k);
  var rows, info = s0.info;
  var NAMES = ['长方形', '正方形', '三角形', '圆'];
  var SIDES = ['4 条边，对边相等', '4 条边都相等', '3 条边、3 个角', '没有直边，只有 1 条曲线'];

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 36, '四种平面图形：平平的，能摆在纸上', '#2c3e50', 1);
      var pos = [[170, 130], [450, 130], [170, 285], [450, 285]];
      for (i = 0; i < 4; i++) {
        pFlat(ctx, i, pos[i][0], pos[i][1], 76, i === T);
        pTxt(ctx, pos[i][0], pos[i][1] + 62, NAMES[i], i === T ? '#c0392b' : '#6b7a89', i === T, 1);
      }
      pTxt(ctx, 50, 356, NAMES[T] + '：' + SIDES[T], i === T ? '#c0392b' : '#2c3e50');
      pTxt(ctx, 50, 386, '长方形和正方形都是 4 条边，但正方形四条一样长', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">' + NAMES[T] + '：**' + SIDES[T] + '**。</span>';
    } else if (mode === 1) {
      pTxt(ctx, 50, 36, '面在体上：把立体的一面印在纸上', '#2c3e50', 1);
      if (T === 3) pPrism(ctx, 175, 150, 62, true);
      else pSolid(ctx, T, 175, 150, 70, false);
      pArrow(ctx, 175, 232, 175, 288, '#8a5a00', 2);
      pFlat(ctx, T, 175, 320, 70, true);
      pTxt(ctx, 320, 120, '这个立体的一个面', '#2c3e50', 0);
      pTxt(ctx, 320, 152, '印在纸上就是 ' + NAMES[T], '#c0392b', 0);
      pTxt(ctx, 320, 200, '长方体 → 长方形', T === 0 ? '#c0392b' : '#8a97a4', 0);
      pTxt(ctx, 320, 230, '正方体 → 正方形', T === 1 ? '#c0392b' : '#8a97a4', 0);
      pTxt(ctx, 320, 260, '圆柱 → 圆', T === 2 ? '#c0392b' : '#8a97a4', 0);
      pTxt(ctx, 320, 290, '三棱柱 → 三角形', T === 3 ? '#c0392b' : '#8a97a4', 0);
      pTxt(ctx, 320, 336, '面是体的一部分，体比面「厚」', '#0f6e56', 0);
      info.innerHTML = '<span class="viz-meta">立体的一**面**印下来，就是平面图形。</span>';
    } else if (mode === 2) {
      pTxt(ctx, 50, 36, '同样的两个三角形，能拼成不同的图形', '#2c3e50', 1);
      var s = 96, ax = 130, ay = 130;
      ctx.fillStyle = '#fdecea'; ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax, ay + s); ctx.lineTo(ax + s, ay + s); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e7f0fa'; ctx.strokeStyle = '#185fa5';
      ctx.beginPath(); ctx.moveTo(ax + s, ay); ctx.lineTo(ax + s, ay + s); ctx.lineTo(ax, ay); ctx.closePath(); ctx.fill(); ctx.stroke();
      pTxt(ctx, ax + s / 2, ay + s + 24, '两个一样的三角形', '#6b7a89', 0, 1);
      pArrow(ctx, 250, 180, 300, 180, '#8a5a00', 2);
      // 正方形
      ctx.fillStyle = '#eef4fa'; ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.rect(330, 82, 96, 96); ctx.fill(); ctx.stroke();
      pLine(ctx, 330, 82, 426, 178, '#9aa7b4', 1.6, [6, 4]);
      pTxt(ctx, 378, 202, '拼成正方形', '#0f6e56', 0, 1);
      // 平行四边形
      ctx.beginPath();
      ctx.moveTo(480, 200); ctx.lineTo(556, 200); ctx.lineTo(600, 290); ctx.lineTo(524, 290); ctx.closePath();
      ctx.fill(); ctx.stroke();
      pLine(ctx, 480, 200, 524, 290, '#9aa7b4', 1.6, [6, 4]);
      pTxt(ctx, 540, 314, '拼成平行四边形', '#0f6e56', 0, 1);
      pTxt(ctx, 50, 340, '拼组时，边要完全对齐，不能留缝也不能重叠', '#6b7a89');
      pTxt(ctx, 50, 372, '两个一样的三角形还能拼成大三角形', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">拼组：**边对齐、角相接**。</span>';
    } else {
      pTxt(ctx, 50, 36, '数一数：这个图案里各种图形各有几个', '#2c3e50', 1);
      // 小房子
      ctx.fillStyle = '#fdecea'; ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(190, 120); ctx.lineTo(270, 190); ctx.lineTo(110, 190); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#eef4fa'; ctx.strokeStyle = '#2c3e50';
      ctx.beginPath(); ctx.rect(120, 190, 140, 120); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.rect(160, 240, 56, 70); ctx.fill(); ctx.stroke();
      pLine(ctx, 188, 240, 188, 310, '#2c3e50', 1.6);
      ctx.fillStyle = '#fdf3dd'; ctx.strokeStyle = '#8a5a00';
      ctx.beginPath(); ctx.arc(330, 290, 26, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.arc(430, 150, 30, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e8f5ef'; ctx.strokeStyle = '#0f6e56';
      ctx.beginPath(); ctx.moveTo(400, 250); ctx.lineTo(470, 250); ctx.lineTo(435, 300); ctx.closePath(); ctx.fill(); ctx.stroke();
      var cnt = [3, 0, 2, 2];
      var idx = (K - 1) % 4;
      pTxt(ctx, 50, 336, NAMES[idx] + '：' + (idx === 1 ? '这个图案里没有' : cnt[idx] + ' 个'), '#c0392b', 1);
      pTxt(ctx, 50, 368, '长方形 3、三角形 2、圆 2（数图形要按类数）', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">按类数：**一个一个做记号**，不重不漏。</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['选一种图形', T, 0, 3, 1, function (v) { T = Math.round(v); draw(); }, [0, 1]],
    ['数的种类', K, 1, 4, 1, function (v) { K = Math.round(v); draw(); }, [3]]
  ]);
  draw();
}

/* 20 以内退位减法：破十法 / 平十法 / 想加算减 / 解决问题 */
function p1bSub20Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 13, b: 8 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var one = A - 10, res = A - B;

    if (mode === 0) {
      var r = 10 - B;
      pTxt(ctx, 50, 40, '破十法：把 10 拆开，先用 10 去减', '#2c3e50', 1);
      pBundle(ctx, 90, 96, '#8a5a00');
      pSticks(ctx, 190, 96, one, '#185fa5');
      pTxt(ctx, 110, 176, '1 个十', '#c0392b', 0, 1);
      pTxt(ctx, 205, 176, one + ' 个一', '#185fa5', 0, 1);
      pTxt(ctx, 330, 110, A + ' = 10 + ' + one, '#2c3e50', 0);
      pTxt(ctx, 50, 226, '① 破开那一捆：10 − ' + B + ' = ' + r, '#c0392b', 1);
      pTxt(ctx, 50, 262, '② 把剩下的 ' + one + ' 加上：' + r + ' + ' + one + ' = ' + res, '#0f6e56', 1);
      pTxt(ctx, 50, 306, A + ' − ' + B + ' = ' + res, '#2c3e50', 1);
      pTxt(ctx, 50, 342, '个位不够减，就向十位借 1 个十', '#6b7a89');
      pTxt(ctx, 50, 374, '借来的 10 减完，剩下的再和个位合起来', '#6b7a89');
    } else if (mode === 1) {
      var canFlat = B > one, m1 = Math.min(B, one), m2 = B - m1, mid = A - m1, fin = mid - m2;
      pTxt(ctx, 50, 40, '平十法：把减数拆成两部分，先减到整十', '#2c3e50', 1);
      pBundle(ctx, 90, 96, '#8a5a00');
      pSticks(ctx, 190, 96, one, '#185fa5');
      pTxt(ctx, 110, 176, '10', '#c0392b', 0, 1);
      pTxt(ctx, 205, 176, one, '#185fa5', 0, 1);
      pTxt(ctx, 330, 110, A + ' − ' + B + '：把 ' + B + ' 拆成 ' + m1 + ' + ' + m2, '#2c3e50', 0);
      pTxt(ctx, 50, 226, '① ' + A + ' − ' + m1 + ' = ' + mid + (mid === 10 ? '（凑成整十）' : ''), '#c0392b', 1);
      pTxt(ctx, 50, 262, '② ' + mid + ' − ' + m2 + ' = ' + fin, '#0f6e56', 1);
      pTxt(ctx, 50, 306, canFlat ? A + ' − ' + B + ' = ' + fin : '个位够减，不必拆十', '#2c3e50', 1);
      pTxt(ctx, 50, 342, '平十法是「连减两次」，一步一步来', '#6b7a89');
      pTxt(ctx, 50, 374, '先减到 10，再从 10 里减，心算更稳', '#6b7a89');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '想加算减：先想「加几得被减数」', '#2c3e50', 1);
      for (i = 0; i < B; i++) pCirc(ctx, 74 + (i % 3) * 34, 96 + Math.floor(i / 3) * 34, 14, '#185fa5');
      pTxt(ctx, 90, 200, B + ' 个', '#185fa5', 0);
      pTxt(ctx, 200, 130, '+ ？ = ' + A, '#c0392b', 1);
      for (i = 0; i < res; i++) pCirc(ctx, 290 + (i % 6) * 32, 96 + Math.floor(i / 6) * 32, 14, '#c0392b');
      if (res === 0) pTxt(ctx, 300, 110, '不用补', '#c0392b', 0);
      pTxt(ctx, 50, 210, B + ' + ' + res + ' = ' + A, '#2c3e50', 1);
      pTxt(ctx, 50, 250, '所以 ' + A + ' − ' + B + ' = ' + res, '#0f6e56', 1);
      pTxt(ctx, 50, 296, '加法算式帮我们记住减法得数', '#6b7a89');
      pTxt(ctx, 50, 330, '算完可以用「' + res + ' + ' + B + ' = ' + A + '」验算', '#6b7a89');
      pTxt(ctx, 50, 364, '这一步就是以后「解方程」的雏形', '#8a5a00');
    } else {
      pTxt(ctx, 50, 40, '解决问题：看清是「求剩下」还是「求多几」', '#2c3e50', 1);
      for (i = 0; i < A; i++) pCirc(ctx, 80 + (i % 7) * 34, 108 + Math.floor(i / 7) * 34, 13, '#c0392b');
      pTxt(ctx, 80, 182, '红气球 ' + A + ' 个', '#c0392b', 0);
      for (i = 0; i < B; i++) pCirc(ctx, 330 + (i % 7) * 34, 108 + Math.floor(i / 7) * 34, 13, '#185fa5');
      pTxt(ctx, 330, 182, '蓝气球 ' + B + ' 个', '#185fa5', 0);
      pTxt(ctx, 50, 232, '红气球比蓝气球多几个？', '#2c3e50', 1);
      pTxt(ctx, 50, 268, A + ' − ' + B + ' = ' + res + '（个）', '#c0392b', 1);
      pTxt(ctx, 50, 308, '求「多几个」用减法：把同样多的部分去掉', '#0f6e56');
      pTxt(ctx, 50, 342, '求「还剩」也用减法：从总量里去掉一部分', '#0f6e56');
      pTxt(ctx, 50, 376, '被减数最大，减数和差都比它小', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**破十**：先 10 − 减数，再加个位。'
        : mode === 1 ? '**平十**：把减数拆开，先减到 10。'
          : mode === 2 ? '**想加算减**：' + B + ' + ' + res + ' = ' + A + '。'
            : '求剩下 / 多几，都用**减法**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['被减数', A, 11, 18, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['减数', B, 2, 9, 1, function (v) { B = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}

/* 分类与整理：按标准分类 / 不同标准 / 统计表 / 自定标准 */
function p1bSortLab(el, cfg) {
  var p = Object.assign({ mode: 0, s: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), S = Math.round(p.s);
  var rows, info = s0.info;
  // 9 个物体：形状 0 圆 1 三角 2 方；颜色 0 红 1 蓝 2 黄；大小 0 大 1 小
  var ITEMS = [
    { sh: 0, cl: 0, sz: 0 }, { sh: 1, cl: 1, sz: 1 }, { sh: 2, cl: 2, sz: 0 },
    { sh: 0, cl: 1, sz: 1 }, { sh: 1, cl: 2, sz: 0 }, { sh: 2, cl: 0, sz: 1 },
    { sh: 0, cl: 2, sz: 0 }, { sh: 1, cl: 0, sz: 1 }, { sh: 2, cl: 1, sz: 0 }
  ];
  var CL = ['#c0392b', '#185fa5', '#c9a227'];
  var CLN = ['红', '蓝', '黄'];
  var SHN = ['圆', '三角形', '正方形'];
  var SZN = ['大', '小'];
  var STD = [SHN, CLN, SZN];
  var STDNAME = ['按形状分', '按颜色分', '按大小分'];

  function group(key, i) { return ITEMS[i][key]; }

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    function icon(it, x, y, r) {
      var c = CL[it.cl];
      if (it.sh === 0) pCirc(ctx, x, y, r, c);
      else if (it.sh === 1) {
        ctx.fillStyle = c; ctx.beginPath();
        ctx.moveTo(x, y - r); ctx.lineTo(x + r * 0.95, y + r * 0.75); ctx.lineTo(x - r * 0.95, y + r * 0.75);
        ctx.closePath(); ctx.fill();
      } else pRect(ctx, x - r * 0.85, y - r * 0.85, r * 1.7, r * 1.7, c);
    }
    var key = S === 0 ? 'sh' : S === 1 ? 'cl' : 'sz';

    if (mode === 0) {
      pTxt(ctx, 50, 36, '分类：先定一个标准，再把一样的放一起', '#2c3e50', 1);
      for (i = 0; i < 9; i++) icon(ITEMS[i], 105 + (i % 5) * 78, 110 + Math.floor(i / 5) * 78, 20);
      pTxt(ctx, 50, 236, '现在' + STDNAME[S] + '：', '#2c3e50', 1);
      var cnt = [0, 0, 0], ngrp = S === 2 ? 2 : 3;
      for (i = 0; i < 9; i++) cnt[group(key, i)]++;
      for (i = 0; i < ngrp; i++) {
        var bx = 70 + i * 175;
        pRect(ctx, bx, 258, 160, 116, '#f7fafd', S === 0 || i === S ? '#c0392b' : '#e3ebf3', 1.6);
        pTxt(ctx, bx + 80, 276, STD[S][i] + '：' + cnt[i] + ' 个', '#c0392b', 0, 1);
        var k = 0;
        for (j = 0; j < 9; j++) {
          if (group(key, j) === i) { icon(ITEMS[j], bx + 24 + (k % 4) * 36, 312 + Math.floor(k / 4) * 34, 11); k++; }
        }
      }
      pTxt(ctx, 50, 388, '每类加起来要等于总数 9 个 —— 这就是检验', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">' + STDNAME[S] + '：一类一类放，**不重不漏**。</span>';
    } else if (mode === 1) {
      pTxt(ctx, 50, 36, '同样的 9 个物体，标准不同，结果不同', '#2c3e50', 1);
      var k1 = 'cl', k2 = 'sh';
      var c1 = [0, 0, 0], c2 = [0, 0, 0];
      for (i = 0; i < 9; i++) { c1[ITEMS[i][k1]]++; c2[ITEMS[i][k2]]++; }
      pTxt(ctx, 50, 74, '按颜色分：3 类', '#185fa5', 0);
      for (i = 0; i < 3; i++) {
        pRect(ctx, 60 + i * 90, 92, 80, 46, '#eef4fa', null);
        pTxt(ctx, 100 + i * 90, 115, CLN[i] + ' ' + c1[i], '#185fa5', 0, 1);
      }
      pTxt(ctx, 50, 156, '按形状分：3 类', '#0f6e56', 0);
      for (i = 0; i < 3; i++) {
        pRect(ctx, 60 + i * 90, 174, 80, 46, '#e8f5ef', null);
        pTxt(ctx, 100 + i * 90, 197, SHN[i].slice(0, 2) + ' ' + c2[i], '#0f6e56', 0, 1);
      }
      pTxt(ctx, 380, 100, '同一堆东西', '#2c3e50', 0);
      pTxt(ctx, 380, 130, '可以有好几种分法', '#2c3e50', 0);
      pTxt(ctx, 380, 170, '标准换了，', '#c0392b', 0);
      pTxt(ctx, 380, 198, '每类的个数也变了', '#c0392b', 0);
      pTxt(ctx, 50, 254, '按大小分还能分成 2 类：大 ' + (function () { var c = 0; for (i = 0; i < 9; i++) if (ITEMS[i].sz === 0) c++; return c; })() + '、小 ' + (function () { var c = 0; for (i = 0; i < 9; i++) if (ITEMS[i].sz === 1) c++; return c; })() + '', '#8a5a00', 1);
      pTxt(ctx, 50, 292, '分类的结果和你选的标准一一对应', '#6b7a89');
      pTxt(ctx, 50, 326, '问「一共有几个」时，不管怎么分，总数都一样', '#0f6e56');
      pTxt(ctx, 50, 360, '这就是分类的价值：换个角度，看得更清楚', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">**标准不同，结果不同**；总数永远不变。</span>';
    } else if (mode === 2) {
      var cnt3 = [0, 0, 0], n3 = S === 2 ? 2 : 3;
      for (i = 0; i < 9; i++) cnt3[group(key, i)]++;
      pTxt(ctx, 50, 36, '把分类结果整理成统计表', '#2c3e50', 1);
      pRect(ctx, 90, 70, 460, 44, '#eef4fa', '#9aa7b4');
      pTxt(ctx, 200, 92, S === 0 ? '形状' : S === 1 ? '颜色' : '大小', '#2c3e50', 0, 1);
      pTxt(ctx, 420, 92, '个数', '#2c3e50', 0, 1);
      for (i = 0; i < n3; i++) {
        pRect(ctx, 90, 114 + i * 44, 460, 44, '#ffffff', '#dfe8f1');
        pTxt(ctx, 200, 136 + i * 44, STD[S][i], '#2c3e50', 0, 1);
        pTxt(ctx, 420, 136 + i * 44, String(cnt3[i]), '#c0392b', 1, 1);
      }
      pRect(ctx, 90, 114 + n3 * 44, 460, 44, '#f7fafd', '#9aa7b4');
      pTxt(ctx, 200, 136 + n3 * 44, '合计', '#2c3e50', 0, 1);
      pTxt(ctx, 420, 136 + n3 * 44, String(n3 === 2 ? cnt3[0] + cnt3[1] : 9), '#c0392b', 1, 1);
      pTxt(ctx, 50, 344, '表头写清「分什么」「数什么」', '#6b7a89');
      pTxt(ctx, 50, 376, '合计那一栏能帮你检查有没有数错', '#0f6e56');
      info.innerHTML = '<span class="viz-meta">统计表 = **分类 + 数个数**，最后要能合计。</span>';
    } else {
      pTxt(ctx, 50, 36, '自己定标准：为什么这样分？', '#2c3e50', 1);
      pTxt(ctx, 50, 80, '① 按能不能滚：' + '圆、球类会滚，方方正正的不滚', '#2c3e50', 0);
      pTxt(ctx, 50, 112, '② 按颜色：红 / 蓝 / 黄', '#2c3e50', 0);
      pTxt(ctx, 50, 144, '③ 按大小：大 / 小', '#2c3e50', 0);
      pTxt(ctx, 50, 176, '④ 按用途：玩的 / 吃的 / 用的', '#2c3e50', 0);
      var cnt4 = [0, 0, 0];
      for (i = 0; i < 9; i++) cnt4[group('sz', i)]++;
      pRect(ctx, 80, 214, 200, 130, '#f7fafd', '#c0392b', 1.8);
      pTxt(ctx, 180, 236, '按大小分', '#c0392b', 0, 1);
      var kk = 0, kk2 = 0;
      for (i = 0; i < 9; i++) {
        if (ITEMS[i].sz === 0) { icon(ITEMS[i], 116 + (kk % 4) * 38, 272 + Math.floor(kk / 4) * 34, 12); kk++; }
      }
      pTxt(ctx, 180, 330, '大 ' + cnt4[0] + ' 个', '#c0392b', 0, 1);
      pRect(ctx, 320, 214, 200, 130, '#f7fafd', '#185fa5', 1.8);
      pTxt(ctx, 420, 236, '按大小分', '#185fa5', 0, 1);
      for (i = 0; i < 9; i++) {
        if (ITEMS[i].sz === 1) { icon(ITEMS[i], 356 + (kk2 % 4) * 38, 272 + Math.floor(kk2 / 4) * 34, 12); kk2++; }
      }
      pTxt(ctx, 420, 330, '小 ' + cnt4[1] + ' 个', '#185fa5', 0, 1);
      pTxt(ctx, 50, 372, '标准要说得清、分得开，才叫好标准', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">好标准：**说得清、分得开、不漏项**。</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['选一种标准', S, 0, 2, 1, function (v) { S = Math.round(v); draw(); }, [0, 2]]
  ]);
  draw();
}

/* 100 以内数的认识：满十进一 / 数位 / 比大小 / 百数表 */
function p1b100Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 34, b: 43 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var ten = Math.floor(A / 10), one = A % 10;

    if (mode === 0) {
      pTxt(ctx, 50, 40, '每满 10 根就捆一捆，一捆就是 1 个十', '#2c3e50', 1);
      var showB = Math.min(ten, 6), bx6 = 80;
      for (i = 0; i < showB; i++) pBundle(ctx, bx6 + i * 70, 96, '#8a5a00');
      pTxt(ctx, bx6 + showB * 35, 172, ten + ' 个十' + (ten > 6 ? '（画出前 6 捆）' : ''), '#c0392b', 0, 1);
      pSticks(ctx, 100 + showB * 70, 96, one, '#185fa5');
      pTxt(ctx, 100 + showB * 70 + one * 5, 172, one + ' 个一', '#185fa5', 0, 1);
      pTxt(ctx, 50, 222, ten + ' 个十和 ' + one + ' 个一，合起来是 ' + A, '#c0392b', 1);
      pTxt(ctx, 50, 258, '10 个一 = 1 个十，10 个十 = 1 个百', '#2c3e50');
      pTxt(ctx, 50, 294, '写数时左边是十位，右边是个位', '#0f6e56');
      pTxt(ctx, 50, 330, '满十就要往前一位进 1 —— 这叫十进制', '#6b7a89');
      pTxt(ctx, 50, 362, '99 再添 1 就是 100：两位变三位', '#6b7a89');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '数位表：十位上一个数字就代表 10', '#2c3e50', 1);
      pRect(ctx, 130, 90, 160, 52, '#eef4fa', '#9aa7b4');
      pRect(ctx, 290, 90, 160, 52, '#eef4fa', '#9aa7b4');
      pTxt(ctx, 210, 116, '十位', '#6b7a89', 0, 1);
      pTxt(ctx, 370, 116, '个位', '#6b7a89', 0, 1);
      pRect(ctx, 130, 142, 160, 96, '#ffffff', '#c0392b', 2.4);
      pRect(ctx, 290, 142, 160, 96, '#ffffff', '#185fa5', 2.4);
      pBig(ctx, 210, 192, String(ten), '#c0392b', 60);
      pBig(ctx, 370, 192, String(one), '#185fa5', 60);
      pTxt(ctx, 50, 276, '读作：' + A + '　写作：' + A, '#c0392b', 1);
      pTxt(ctx, 50, 312, '十位上的 ' + ten + ' 表示 ' + (ten * 10) + '，个位上的 ' + one + ' 表示 ' + one, '#2c3e50');
      pTxt(ctx, 50, 346, '读几十几时，中间的「十」不能丢', '#0f6e56');
      pTxt(ctx, 50, 378, '例：' + A + ' 读作「' + (ten === 0 ? one + '' : one === 0 ? ten + '十' : ten + '十' + one) + '」', '#6b7a89');
    } else if (mode === 2) {
      var t1 = Math.floor(A / 10), t2 = Math.floor(B / 10), sym = A > B ? '>' : A < B ? '<' : '=';
      pTxt(ctx, 50, 40, '比大小：先比十位，十位相同再比个位', '#2c3e50', 1);
      pRect(ctx, 70, 96, 150, 60, '#fdecea', '#c0392b', 2);
      pTxt(ctx, 145, 126, '十位 ' + t1, '#c0392b', 1, 1);
      pRect(ctx, 240, 96, 150, 60, '#eef4fa', '#185fa5', 2);
      pTxt(ctx, 315, 126, '十位 ' + t2, '#185fa5', 1, 1);
      pTxt(ctx, 200, 186, String(A), '#c0392b', 1, 1);
      pTxt(ctx, 400, 186, String(B), '#185fa5', 1, 1);
      pBig(ctx, 300, 190, sym, '#0f6e56', 50);
      pTxt(ctx, 50, 250, A + ' ' + sym + ' ' + B, '#0f6e56', 1);
      pTxt(ctx, 50, 288, t1 !== t2 ? '十位不同：十位大的那个数就大' : '十位相同，再比个位：' + (A % 10) + ' 和 ' + (B % 10), '#2c3e50');
      pTxt(ctx, 50, 324, '两位数先看十位，因为十位上的 1 就是 10', '#6b7a89');
      pTxt(ctx, 50, 356, '数位越多，数越大（三位数 > 两位数）', '#6b7a89');
    } else {
      pTxt(ctx, 50, 34, '百数表：横着看多 1，竖着看多 10', '#2c3e50', 1);
      var gx0 = 130, gy0 = 66, cw = 38, chh = 27, nn = Math.max(1, Math.min(99, A));
      for (i = 0; i < 10; i++) {
        for (j = 0; j < 10; j++) {
          var num = i * 10 + j + 1;
          var on = num === nn;
          var nb = num === nn - 10 || num === nn + 10 || num === nn - 1 || num === nn + 1;
          pRect(ctx, gx0 + j * cw, gy0 + i * chh, cw, chh,
            on ? '#c0392b' : nb ? '#fdf3dd' : '#ffffff', '#e3ebf3');
          ctx.fillStyle = on ? '#ffffff' : nb ? '#8a5a00' : '#2c3e50';
          ctx.font = (on ? 'bold ' : '') + '12px "PingFang SC","Microsoft YaHei",sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(String(num), gx0 + j * cw + cw / 2, gy0 + i * chh + chh / 2);
          ctx.textAlign = 'left';
        }
      }
      pTxt(ctx, 50, 356, nn + ' 的上面是 ' + (nn - 10 > 0 ? nn - 10 : '没有') + '，下面是 ' + (nn + 10 <= 100 ? nn + 10 : '没有'), '#8a5a00');
      pTxt(ctx, 50, 384, '左边 ' + (nn % 10 === 1 ? '换行' : nn - 1) + '，右边 ' + (nn % 10 === 0 ? '换行' : nn + 1), '#6b7a89');
      info.innerHTML = '<span class="viz-meta">百数表：**右 +1、下 +10**。</span>';
    }

    if (mode !== 3) {
      info.innerHTML = '<span class="viz-meta">' +
        (mode === 0 ? '**满十进一**：10 个一 = 1 个十。'
          : mode === 1 ? '十位表示**几个十**。'
            : '先比**十位**，再比个位。') + '</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['第一个数', A, 11, 99, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第二个数', B, 11, 99, 1, function (v) { B = Math.round(v); draw(); }, [2]]
  ]);
  draw();
}

/* 认识人民币：元角分 / 几元几角 / 付钱方案 / 找零 */
function p1bMoneyLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 3, b: 5 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), Y = Math.round(p.a), J = Math.round(p.b);
  var rows, info = s0.info;

  function bill(ctx, x, y, w, h, text, color) {
    pRect(ctx, x, y, w, h, '#ffffff', color, 1.8);
    pTxt(ctx, x + w / 2, y + h / 2, text, color, 0, 1);
  }

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var total = Y * 10 + J;

    if (mode === 0) {
      pTxt(ctx, 50, 40, '元、角、分：相邻两个单位都是 10 倍', '#2c3e50', 1);
      bill(ctx, 70, 80, 150, 80, '1 元', '#c0392b');
      pArrow(ctx, 232, 120, 282, 120, '#8a5a00', 2);
      pTxt(ctx, 300, 120, '= 10 角', '#8a5a00');
      for (i = 0; i < 10; i++) bill(ctx, 300 + (i % 5) * 44, 152 + Math.floor(i / 5) * 34, 40, 30, '1角', '#185fa5');
      pArrow(ctx, 232, 260, 282, 260, '#8a5a00', 2);
      pTxt(ctx, 300, 260, '1 角 = 10 分', '#8a5a00');
      pTxt(ctx, 50, 300, '1 元 = 10 角 = 100 分', '#c0392b', 1);
      pTxt(ctx, 50, 336, '元最大、分最小；买东西一般用到角就够了', '#2c3e50');
      pTxt(ctx, 50, 368, '写钱数时小数点后两位就是角和分', '#6b7a89');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '几元几角：合起来是多少角', '#2c3e50', 1);
      for (i = 0; i < Math.min(Y, 6); i++) bill(ctx, 70 + i * 62, 84, 54, 46, Y + '元', '#c0392b');
      if (Y > 6) pTxt(ctx, 70 + 6 * 62, 108, '共 ' + Y + ' 张', '#6b7a89', 0);
      pTxt(ctx, 80, 158, Y + ' 元', '#c0392b');
      for (i = 0; i < Math.min(J, 8); i++) pRect(ctx, 70 + i * 46, 196, 40, 34, '#eef4fa', '#185fa5', 1.6);
      for (i = 0; i < Math.min(J, 8); i++) pTxt(ctx, 90 + i * 46, 213, '1角', '#185fa5', 0, 1);
      pTxt(ctx, 80, 252, J + ' 角', '#185fa5');
      pTxt(ctx, 50, 300, Y + ' 元 ' + J + ' 角 = ' + total + ' 角', '#c0392b', 1);
      pTxt(ctx, 50, 336, Y + ' 元就是 ' + (Y * 10) + ' 角，再加上 ' + J + ' 角', '#2c3e50');
      pTxt(ctx, 50, 368, '反过来：' + total + ' 角 = ' + Y + ' 元 ' + J + ' 角', '#0f6e56');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '付钱方法不止一种：要付 ' + Y + ' 元', '#2c3e50', 1);
      var five = Math.floor(Y / 5), restY = Y % 5;
      pTxt(ctx, 50, 84, '① 全用 1 元：' + Y + ' 张', '#185fa5');
      for (i = 0; i < Math.min(Y, 9); i++) bill(ctx, 60 + i * 44, 100, 40, 32, '1元', '#185fa5');
      pTxt(ctx, 50, 168, '② 先用 5 元：' + five + ' 张 5 元' + (restY ? ' + ' + restY + ' 张 1 元' : ''), '#c0392b');
      for (i = 0; i < five; i++) bill(ctx, 60 + i * 84, 184, 76, 32, '5元', '#c0392b');
      for (i = 0; i < restY; i++) bill(ctx, 60 + five * 84 + i * 44, 184, 40, 32, '1元', '#c0392b');
      pTxt(ctx, 50, 244, '③ 用 10 元找零：付 1 张 10 元', Y < 10 ? '#0f6e56' : '#8a97a4');
      bill(ctx, 60, 260, 90, 32, '10元', '#0f6e56');
      pTxt(ctx, 50, 320, '张数越少越方便，但钱要正好够', '#2c3e50');
      pTxt(ctx, 50, 354, '不管怎么付，总钱数都必须等于 ' + Y + ' 元', '#c0392b');
      pTxt(ctx, 50, 384, '买贵一点的东西，常用 5 元、10 元搭配', '#6b7a89');
    } else {
      var pay = 10, back = pay * 10 - total;
      pTxt(ctx, 50, 40, '找零：付出的钱 − 商品的价钱', '#2c3e50', 1);
      bill(ctx, 70, 84, 120, 60, '10 元', '#c0392b');
      pTxt(ctx, 210, 114, '−', '#2c3e50', 1, 1);
      bill(ctx, 240, 84, 130, 60, Y + ' 元 ' + J + ' 角', '#185fa5');
      pTxt(ctx, 390, 114, '=', '#2c3e50', 1, 1);
      pBig(ctx, 470, 118, (back / 10) + ' 元', '#0f6e56', 40);
      pTxt(ctx, 50, 186, '10 元 = ' + pay * 10 + ' 角，商品 = ' + total + ' 角', '#6b7a89');
      pTxt(ctx, 50, 226, back + ' 角 = ' + Math.floor(back / 10) + ' 元 ' + (back % 10) + ' 角', '#c0392b', 1);
      pTxt(ctx, 50, 268, '先换成同样的单位（角），再相减', '#0f6e56');
      pTxt(ctx, 50, 302, '找零 = 付的钱 − 东西的价钱', '#2c3e50');
      pTxt(ctx, 50, 336, '付的钱不够就不能买，差额要先算清楚', '#6b7a89');
      pTxt(ctx, 50, 368, '实际付钱时，可以拆成几张来数', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**1 元 = 10 角 = 100 分**。'
        : mode === 1 ? '先换成**角**再相加。'
          : mode === 2 ? '付法可以多样，**总钱数不变**。'
            : '找零 = **付出的 − 价钱**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['几元', Y, 1, 9, 1, function (v) { Y = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['几角', J, 0, 9, 1, function (v) { J = Math.round(v); draw(); }, [1, 3]]
  ]);
  draw();
}

/* 100 以内加减法（一）：整十数 / 两位数加减一位数 / 加减整十 / 小括号 */
function p1bAdd100Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 4, b: 5, c: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b), C = Math.round(p.c);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      var c0 = Math.min(C, 9 - A), s0sum = A + c0, sp0 = Math.min(62, Math.floor(300 / (A + c0)));
      pTxt(ctx, 50, 40, '整十数加减：几个十加几个十，还是几个十', '#2c3e50', 1);
      for (i = 0; i < A; i++) pBundle(ctx, 70 + i * sp0, 88, '#8a5a00');
      pTxt(ctx, 70 + A * sp0 / 2, 160, A + ' 个十', '#c0392b', 0, 1);
      pTxt(ctx, 70 + A * sp0 + 6, 116, '+', '#2c3e50', 1, 1);
      for (i = 0; i < c0; i++) pBundle(ctx, 84 + A * sp0 + i * sp0, 88, '#185fa5');
      pTxt(ctx, 84 + A * sp0 + c0 * sp0 / 2, 160, c0 + ' 个十', '#185fa5', 0, 1);
      pTxt(ctx, 50, 210, A * 10 + ' + ' + c0 * 10 + ' = ' + s0sum * 10, '#c0392b', 1);
      pTxt(ctx, 50, 246, '也就是：' + A + ' + ' + c0 + ' = ' + s0sum + '，再添个 0', '#2c3e50');
      pTxt(ctx, 50, 282, A * 10 + ' − ' + c0 * 10 + ' = ' + (A - c0) * 10, '#0f6e56', 1);
      pTxt(ctx, 50, 320, '整十数相加减，只看十位上的数', '#6b7a89');
      pTxt(ctx, 50, 354, '算完别忘了在后面补回那个 0', '#6b7a89');
    } else if (mode === 1) {
      var N = A * 10 + B, sum = N + C, carry = B + C >= 10;
      pTxt(ctx, 50, 40, '两位数加一位数：先加个位，满十进一', '#2c3e50', 1);
      pRect(ctx, 120, 80, 74, 118, '#f7fafd', '#9aa7b4');
      pRect(ctx, 194, 80, 74, 118, '#f7fafd', '#9aa7b4');
      pTxt(ctx, 157, 102, '十位', '#6b7a89', 0, 1);
      pTxt(ctx, 231, 102, '个位', '#6b7a89', 0, 1);
      pBig(ctx, 157, 158, String(A), '#2c3e50', 40);
      pBig(ctx, 231, 158, String(B), '#c0392b', 40);
      pTxt(ctx, 320, 140, '+', '#2c3e50', 1, 1);
      pBig(ctx, 380, 158, String(C), '#185fa5', 40);
      pTxt(ctx, 440, 140, '=', '#2c3e50', 1, 1);
      pBig(ctx, 510, 158, String(sum), '#0f6e56', 44);
      pTxt(ctx, 50, 240, B + ' + ' + C + ' = ' + (B + C) + (carry ? '，满十向十位进 1' : '，个位直接写'), '#c0392b', 1);
      pTxt(ctx, 50, 276, N + ' + ' + C + ' = ' + sum, '#0f6e56', 1);
      pTxt(ctx, 50, 314, '个位相加满十，就要向十位进 1', '#2c3e50');
      pTxt(ctx, 50, 348, '十位上的数要记得把进上来的 1 加上', '#6b7a89');
      pTxt(ctx, 50, 380, '不进位时，个位相加直接写下来', '#6b7a89');
    } else if (mode === 2) {
      var N2 = A * 10 + B, add = C * 10, plus = N2 + add, minus = Math.max(0, N2 - add);
      pTxt(ctx, 50, 40, '加减整十数：十位变，个位不变', '#2c3e50', 1);
      pTxt(ctx, 70, 100, N2 + ' + ' + add + ' = ' + plus, '#c0392b', 1);
      pTxt(ctx, 70, 140, '十位：' + A + ' + ' + C + ' = ' + (A + C) + '，个位还是 ' + B, '#2c3e50');
      pRect(ctx, 70, 168, 480, 52, '#fdecea', '#c0392b', 1.6);
      pTxt(ctx, 90, 194, '变化的是十位，个位保持 ' + B + ' 不变', '#c0392b', 0);
      pTxt(ctx, 70, 258, N2 + ' − ' + add + ' = ' + minus, '#0f6e56', 1);
      pTxt(ctx, 70, 296, '十位：' + A + ' − ' + C + ' = ' + (A - C) + '，个位还是 ' + B, '#2c3e50');
      pTxt(ctx, 70, 336, '整十数加减只动十位，别把个位也改了', '#6b7a89');
      pTxt(ctx, 70, 370, '可以用「几十几 ± 几十」读一遍检验', '#6b7a89');
    } else {
      var X = A * 10 + B, Y = C * 10, okVal = X - (Y + B), badVal = X - Y + B;
      pTxt(ctx, 50, 40, '有括号先算括号里的', '#2c3e50', 1);
      pRect(ctx, 70, 76, 480, 66, '#e8f5ef', '#0f6e56', 1.8);
      pTxt(ctx, 90, 100, X + ' − (' + Y + ' + ' + B + ')', '#0f6e56', 1);
      pTxt(ctx, 90, 126, '= ' + X + ' − ' + (Y + B) + ' = ' + okVal, '#0f6e56', 0);
      pRect(ctx, 70, 162, 480, 66, '#fdecea', '#c0392b', 1.8);
      pTxt(ctx, 90, 186, X + ' − ' + Y + ' + ' + B + '（没括号，从左往右）', '#c0392b', 1);
      pTxt(ctx, 90, 212, '= ' + (X - Y) + ' + ' + B + ' = ' + badVal, '#c0392b', 0);
      pTxt(ctx, 50, 258, '结果不一样：' + okVal + ' ≠ ' + badVal, '#8a5a00', 1);
      pTxt(ctx, 50, 296, '括号改变运算顺序，顺序变了结果就变', '#2c3e50');
      pTxt(ctx, 50, 330, '去掉括号要变号：− (' + Y + ' + ' + B + ') = − ' + Y + ' − ' + B, '#0f6e56');
      pTxt(ctx, 50, 364, '拿不准就先算括号，最稳', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '整十数：只看**十位**。'
        : mode === 1 ? '个位**满十进一**。'
          : mode === 2 ? '加减整十数，**个位不变**。'
            : '**先算括号**，顺序变结果变。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['十位上的数', A, 1, 8, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['个位上的数', B, 0, 9, 1, function (v) { B = Math.round(v); draw(); }, [1, 2, 3]],
    ['另一个数', C, 1, 8, 1, function (v) { C = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}

/* 找规律：图形周期 / 数列 / 数组 / 自创规律 */
function p1bPatternLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 3, b: 8 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), P = Math.round(p.a), N = Math.round(p.b);
  var rows, info = s0.info;
  var COLS = ['#c0392b', '#185fa5', '#0f6e56', '#8a5a00', '#7a3f9d'];

  function shape(ctx, k, x, y, r) {
    var c = COLS[k % COLS.length];
    if (k % 3 === 0) pCirc(ctx, x, y, r, c);
    else if (k % 3 === 1) {
      ctx.fillStyle = c; ctx.beginPath();
      ctx.moveTo(x, y - r); ctx.lineTo(x + r * 0.95, y + r * 0.75); ctx.lineTo(x - r * 0.95, y + r * 0.75);
      ctx.closePath(); ctx.fill();
    } else pRect(ctx, x - r * 0.85, y - r * 0.85, r * 1.7, r * 1.7, c);
  }

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var per = Math.max(2, Math.min(5, P));

    if (mode === 0) {
      pTxt(ctx, 50, 40, '图形规律：一组一组重复出现', '#2c3e50', 1);
      var seq = [];
      for (i = 0; i < 9; i++) seq.push(i % per);
      for (i = 0; i < 9; i++) shape(ctx, seq[i], 80 + i * 58, 120, 22);
      // 分组框：只画放得下的组
      for (i = 0; i < 3; i++) {
        var gx = 80 + i * per * 58 - 26;
        if (gx + per * 58 > 620) break;
        pRect(ctx, gx, 84, per * 58, 72, null, i === 0 ? '#0f6e56' : '#dfe8f1', i === 0 ? 2.4 : 1.4);
      }
      pTxt(ctx, 50, 200, '每 ' + per + ' 个一组，一直重复', '#0f6e56', 1);
      pTxt(ctx, 50, 236, '第 10 个是什么？看它排在第几个位置', '#2c3e50');
      var r10 = (10 - 1) % per;
      pTxt(ctx, 50, 272, '10 ÷ ' + per + ' 余 ' + ((10 - 1) % per + 1) + ' → 与第 ' + (r10 + 1) + ' 个相同', '#c0392b', 1);
      pTxt(ctx, 50, 308, '先找出「一组」是什么，再看余数', '#6b7a89');
      pTxt(ctx, 50, 342, '一组的最后一个后面，又开始新的一组', '#6b7a89');
      pTxt(ctx, 50, 374, '周期 ' + per + '：3 种以上图形也能当一组', '#8a97a4');
    } else if (mode === 1) {
      var step = Math.max(1, Math.min(9, P)), first = 2;
      pTxt(ctx, 50, 40, '数的规律：每次增加（或减少）同样的数', '#2c3e50', 1);
      for (i = 0; i < 6; i++) {
        var v = first + i * step;
        pRect(ctx, 70 + i * 92, 96, 78, 56, i === 5 ? '#fdecea' : '#eef4fa', i === 5 ? '#c0392b' : '#9aa7b4', 1.8);
        pTxt(ctx, 109 + i * 92, 124, i === 5 ? '?' : String(v), i === 5 ? '#c0392b' : '#2c3e50', 1, 1);
        if (i < 5) {
          pArrow(ctx, 154 + i * 92, 124, 176 + i * 92, 124, '#8a5a00', 1.6);
          pTxt(ctx, 165 + i * 92, 106, '+' + step, '#8a5a00', 0, 1);
        }
      }
      pTxt(ctx, 50, 190, '每两个相邻的数都相差 ' + step, '#8a5a00', 1);
      pTxt(ctx, 50, 226, first + '、' + (first + step) + '、' + (first + 2 * step) + '、' + (first + 3 * step) + '…', '#2c3e50');
      pTxt(ctx, 50, 262, '第 6 个数 = ' + first + ' + ' + step + '×5 = ' + (first + step * 5), '#c0392b', 1);
      pTxt(ctx, 50, 298, '公差相同，就把每个数一次一次加上去', '#6b7a89');
      pTxt(ctx, 50, 332, '也可以用减法看：后一个 − 前一个 = ' + step, '#6b7a89');
      pTxt(ctx, 50, 366, '差不变，规律就找到了', '#0f6e56');
    } else if (mode === 2) {
      var rowsN = Math.max(2, Math.min(6, N - 3)), k2;
      pTxt(ctx, 50, 40, '数组规律：一行一行看，每行多几个', '#2c3e50', 1);
      for (i = 0; i < rowsN; i++) {
        for (k2 = 0; k2 <= i; k2++) pCirc(ctx, 120 + k2 * 34, 100 + i * 40, 13, COLS[i % COLS.length]);
        pTxt(ctx, 90, 100 + i * 40, '第 ' + (i + 1) + ' 行：' + (i + 1) + ' 个', '#6b7a89', 0);
      }
      pTxt(ctx, 380, 130, '1 + 2 + 3 + … + ' + rowsN, '#2c3e50', 0);
      pTxt(ctx, 380, 168, '= ' + (rowsN * (rowsN + 1) / 2) + ' 个', '#c0392b', 1);
      pTxt(ctx, 380, 212, '每行比上一行多 1 个', '#8a5a00', 0);
      pTxt(ctx, 380, 246, '这就是「三角形数」', '#0f6e56', 0);
      pTxt(ctx, 50, 356, '数阵规律常常要「横看一层、竖看一层」', '#6b7a89');
      pTxt(ctx, 50, 386, '找到每一层的变化，就能算出总数', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">数阵：**逐层看变化**。</span>';
    } else {
      pTxt(ctx, 50, 40, '自己创造规律：定好一组，再重复', '#2c3e50', 1);
      var seq2 = [];
      for (i = 0; i < N; i++) seq2.push(i % per);
      for (i = 0; i < N; i++) shape(ctx, seq2[i], 70 + i * (500 / N), 120, 20);
      pTxt(ctx, 50, 190, '周期 ' + per + '，一共 ' + N + ' 个图形', '#c0392b', 1);
      pTxt(ctx, 50, 226, '这一组是：' + (function () { var s = '', q; for (q = 0; q < per; q++) s += ['○', '△', '□', '◇', '☆'][q % 5]; return s; })() + ' 循环', '#2c3e50');
      pTxt(ctx, 50, 262, '第 ' + N + ' 个是：' + ['○', '△', '□', '◇', '☆'][seq2[N - 1] % 5], '#0f6e56', 1);
      pTxt(ctx, 50, 302, '创造规律三件事：定一组、定周期、往后排', '#6b7a89');
      pTxt(ctx, 50, 336, '同样的图形，换个排法就是新规律', '#6b7a89');
      pTxt(ctx, 50, 368, '能用一句话说清「怎么重复」，才算规律', '#8a5a00');
    }

    if (mode !== 2) {
      info.innerHTML = '<span class="viz-meta">' +
        (mode === 0 ? '找「一组」，用**除法看余数**。'
          : mode === 1 ? '看**相邻两数的差**是否一样。'
            : '定一组 → 定周期 → 往后排。') + '</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['周期 / 公差', P, 1, 5, 1, function (v) { P = Math.round(v); draw(); }, [0, 1, 3]],
    ['一共几个', N, 5, 10, 1, function (v) { N = Math.round(v); draw(); }, [2, 3]]
  ]);
  draw();
}
