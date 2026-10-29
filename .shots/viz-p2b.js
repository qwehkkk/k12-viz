/* ===== 小学二年级下册（p2b） ===== */

/* 数据收集整理：收集 / 正字记录 / 统计表 / 做判断 */
function p2bDataLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 4, b: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.min(3, Math.round(p.b));
  var rows, info = s0.info;
  var CAT = ['苹果', '香蕉', '橘子', '葡萄'];
  var COL = ['#c0392b', '#c9a227', '#e07b39', '#7a3f9d'];

  function counts() {
    return [5 + A, 3 + Math.floor(A / 2), 4, Math.max(1, 2 + (A % 3))];
  }

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var C = counts(), total = C[0] + C[1] + C[2] + C[3];

    if (mode === 0) {
      pTxt(ctx, 50, 40, '收集数据：先问一遍，把票记下来', '#2c3e50', 1);
      for (i = 0; i < 4; i++) {
        var bx = 90 + i * 130;
        pTxt(ctx, bx, 92, CAT[i], '#2c3e50', 0, 1);
        for (j = 0; j < Math.min(C[i], 12); j++) {
          pCirc(ctx, bx - 40 + (j % 4) * 27, 122 + Math.floor(j / 4) * 26, 8, COL[i]);
        }
        pTxt(ctx, bx, 234, C[i] + ' 票', COL[i], 1, 1);
      }
      pTxt(ctx, 50, 286, '一共调查了 ' + total + ' 人', '#c0392b', 1);
      pTxt(ctx, 50, 322, '每人只投一票，票数加起来等于总人数', '#2c3e50');
      pTxt(ctx, 50, 356, '收集时要问清楚：问谁、问什么、怎么记', '#6b7a89');
    } else if (mode === 1) {
      var c = C[B], full = Math.floor(c / 5), rem = c % 5;
      pTxt(ctx, 50, 40, '画「正」字记录：一笔一票，一个正字 5 票', '#2c3e50', 1);
      pTxt(ctx, 50, 88, '要记录：' + CAT[B] + ' 有 ' + c + ' 票', '#c0392b', 1);
      ctx.font = 'bold 44px "PingFang SC","Microsoft YaHei",sans-serif';
      for (i = 0; i < Math.min(full, 6); i++) {
        ctx.fillStyle = COL[B];
        ctx.fillText('正', 90 + i * 76, 190);
      }
      if (full === 0) pTxt(ctx, 90, 180, '还不足 5 票，没有完整的正字', '#8a97a4', 0);
      pTxt(ctx, 50, 250, full + ' 个正字 = ' + full * 5 + ' 票，再补 ' + rem + ' 笔 = ' + c + ' 票', '#0f6e56', 1);
      pTxt(ctx, 50, 292, '一个正字 5 笔，数起来快，写起来也快', '#2c3e50');
      pTxt(ctx, 50, 328, '也可以用打勾、画圈、写数字来记录', '#6b7a89');
      pTxt(ctx, 50, 362, '不管哪种方法，结果要能数得清', '#6b7a89');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '整理成统计表：一类一行，最后合计', '#2c3e50', 1);
      pRect(ctx, 90, 72, 420, 44, '#eef4fa', '#9aa7b4');
      pTxt(ctx, 200, 94, '水果', '#2c3e50', 0, 1);
      pTxt(ctx, 400, 94, '人数', '#2c3e50', 0, 1);
      for (i = 0; i < 4; i++) {
        pRect(ctx, 90, 116 + i * 42, 420, 42, '#ffffff', '#dfe8f1');
        pTxt(ctx, 200, 137 + i * 42, CAT[i], '#2c3e50', 0, 1);
        pTxt(ctx, 400, 137 + i * 42, String(C[i]), COL[i], 1, 1);
      }
      pRect(ctx, 90, 116 + 4 * 42, 420, 42, '#f7fafd', '#9aa7b4');
      pTxt(ctx, 200, 137 + 4 * 42, '合计', '#2c3e50', 0, 1);
      pTxt(ctx, 400, 137 + 4 * 42, String(total), '#c0392b', 1, 1);
      pTxt(ctx, 50, 348, '表头写清楚：一类是什么，数的是什么', '#6b7a89');
      pTxt(ctx, 50, 380, '合计 = 各类相加，能帮你检查有没有数错', '#0f6e56');
    } else {
      var mx = 0, mi = 0, k;
      for (k = 0; k < 4; k++) { if (C[k] > C[mx]) mx = k; if (C[k] < C[mi]) mi = k; }
      pTxt(ctx, 50, 40, '根据数据做判断：谁最多、谁最少、差多少', '#2c3e50', 1);
      for (i = 0; i < 4; i++) {
        var hh = C[i] * 16, bx2 = 90 + i * 130;
        pRect(ctx, bx2 - 30, 280 - hh, 60, hh, i === mx ? '#fdecea' : i === mi ? '#eef4fa' : '#f2f5f8', i === mx ? '#c0392b' : '#c2cdd8', 1.6);
        pTxt(ctx, bx2, 296, CAT[i], '#6b7a89', 0, 1);
        pTxt(ctx, bx2, 274 - hh, String(C[i]), i === mx ? '#c0392b' : '#6b7a89', 0, 1);
      }
      pTxt(ctx, 50, 330, '最喜欢' + CAT[mx] + '的人最多，' + CAT[mi] + '最少', '#c0392b', 1);
      pTxt(ctx, 50, 362, '最多的比最少的多 ' + (C[mx] - C[mi]) + ' 人', '#0f6e56');
      pTxt(ctx, 50, 392, '数据能帮我们做决定：多进哪种水果？', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '票数相加 = **总人数**。'
        : mode === 1 ? '一个「正」= **5 票**。'
          : mode === 2 ? '统计表要有**合计**。'
            : '比多少 → **做判断**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['票数变化', A, 0, 10, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['看第几种', B, 0, 3, 1, function (v) { B = Math.min(3, Math.round(v)); draw(); }, [1]]
  ]);
  draw();
}

/* 表内除法（一）：平均分 / 除法的意义 / 口诀求商 / 解决问题 */
function p2bDiv1Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 12, b: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var q = Math.floor(A / B), rest = A % B, tot = q * B;

    if (mode === 0) {
      pTxt(ctx, 50, 40, '平均分：每份分得同样多', '#2c3e50', 1);
      for (i = 0; i < B; i++) {
        var bx = 60 + i * (520 / B);
        pRect(ctx, bx, 80, 520 / B - 14, 120, '#f7fafd', '#dfe8f1', 1.6);
        pTxt(ctx, bx + (520 / B - 14) / 2, 68, '第 ' + (i + 1) + ' 份', '#6b7a89', 0, 1);
        for (j = 0; j < Math.min(q, 8); j++) {
          pCirc(ctx, bx + 18 + (j % 4) * 26, 108 + Math.floor(j / 4) * 30, 9, '#c0392b');
        }
        pTxt(ctx, bx + (520 / B - 14) / 2, 180, q + ' 个', '#c0392b', 0, 1);
      }
      pTxt(ctx, 50, 236, A + ' 个平均分成 ' + B + ' 份，每份 ' + q + ' 个' + (rest ? '（还剩 ' + rest + ' 个）' : ''), '#c0392b', 1);
      pTxt(ctx, 50, 274, A + ' ÷ ' + B + ' = ' + q + (rest ? ' …… ' + rest : ''), '#2c3e50', 1);
      pTxt(ctx, 50, 312, '每份分得一样多，才叫「平均分」', '#0f6e56');
      pTxt(ctx, 50, 344, '检查：' + q + ' × ' + B + ' = ' + tot + (rest ? '，再加 ' + rest : '') + ' = ' + A, '#6b7a89');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '12 ÷ 3 = 4 的两种意思', '#2c3e50', 1);
      pTxt(ctx, 50, 84, '① 把 ' + tot + ' 个平均分成 ' + B + ' 份，每份 ' + q + ' 个', '#c0392b', 0);
      for (i = 0; i < B; i++) {
        pRect(ctx, 60 + i * 120, 104, 106, 74, '#fdecea', '#c0392b', 1.4);
        for (j = 0; j < Math.min(q, 4); j++) pCirc(ctx, 80 + i * 120 + j * 22, 132, 7, '#c0392b');
        pTxt(ctx, 113 + i * 120, 162, q + ' 个', '#c0392b', 0, 1);
      }
      pTxt(ctx, 50, 214, '② 把 ' + tot + ' 个每 ' + B + ' 个一份，能分 ' + q + ' 份', '#185fa5', 0);
      for (i = 0; i < q; i++) {
        pRect(ctx, 60 + i * 120, 232, 106, 56, '#eef4fa', '#185fa5', 1.4);
        for (j = 0; j < Math.min(B, 4); j++) pCirc(ctx, 80 + i * 120 + j * 22, 258, 7, '#185fa5');
      }
      pTxt(ctx, 50, 316, '总数 ÷ 份数 = 每份数；总数 ÷ 每份数 = 份数', '#0f6e56');
      pTxt(ctx, 50, 350, '除号「÷」读作「除以」，表示平均分', '#2c3e50');
      pTxt(ctx, 50, 382, '除法是乘法的逆运算', '#8a5a00');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '用口诀求商：想「几乘除数得被除数」', '#2c3e50', 1);
      pRect(ctx, 70, 80, 300, 66, '#fdecea', '#c0392b', 2);
      pTxt(ctx, 90, 113, tot + ' ÷ ' + B + ' = ' + q, '#c0392b', 1);
      pTxt(ctx, 400, 100, '想：' + pCn(Math.min(B, q)) + pCn(Math.max(B, q)) + (tot < 10 ? '得' : '') + pCn(tot), '#6b7a89', 0);
      pTxt(ctx, 400, 134, '所以商是 ' + q, '#0f6e56', 0);
      pTxt(ctx, 50, 190, '因为 ' + B + ' × ' + q + ' = ' + tot + '，所以 ' + tot + ' ÷ ' + B + ' = ' + q, '#0f6e56', 1);
      pTxt(ctx, 50, 230, '一句口诀能算两道乘、两道除', '#2c3e50');
      pTxt(ctx, 50, 266, '例：' + pCn(Math.min(B, q)) + pCn(Math.max(B, q)) + pCn(tot) + ' → ' + B + '×' + q + '、' + q + '×' + B + '、' + tot + '÷' + B + '、' + tot + '÷' + q, '#6b7a89');
      pTxt(ctx, 50, 302, '口诀不熟，就先写乘法算式再看', '#6b7a89');
      pTxt(ctx, 50, 336, '求商用除法，验算用乘法', '#0f6e56');
    } else {
      pTxt(ctx, 50, 40, '解决问题：分清「求每份」还是「求份数」', '#2c3e50', 1);
      pTxt(ctx, 50, 84, '有 ' + tot + ' 个苹果，平均放在 ' + B + ' 个盘子里', '#2c3e50');
      pTxt(ctx, 50, 118, '每个盘子放几个？', '#c0392b', 1);
      pTxt(ctx, 50, 152, tot + ' ÷ ' + B + ' = ' + q + '（个）', '#c0392b', 1);
      pTxt(ctx, 50, 196, '有 ' + tot + ' 个苹果，每盘放 ' + B + ' 个', '#2c3e50');
      pTxt(ctx, 50, 230, '需要几个盘子？', '#185fa5', 1);
      pTxt(ctx, 50, 264, tot + ' ÷ ' + B + ' = ' + q + '（盘）', '#185fa5', 1);
      pTxt(ctx, 50, 306, '两题都用除法，但问的东西不同', '#0f6e56');
      pTxt(ctx, 50, 340, '「平均每份多少」和「能分几份」都靠除法', '#6b7a89');
      pTxt(ctx, 50, 374, '答语要写单位：个 / 盘 / 人', '#8a5a00');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**平均分**：每份一样多。'
        : mode === 1 ? '除法有两种意思：**分份 / 每份几个**。'
          : mode === 2 ? '求商**想乘法口诀**。'
            : '问「每份多少」和「几份」都用除法。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['总数', A, 4, 24, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['份数', B, 2, 6, 1, function (v) { B = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}

/* 表内除法（二）：7 的口诀 / 8、9 的口诀 / 填空逆推 / 解决问题 */
function p2bDiv2Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 7, b: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var base = mode === 0 ? Math.max(7, Math.min(7, A)) : mode === 1 ? (A >= 8 ? A : 8) : 7;
    var n = Math.min(B + 2, 9), prod = base * n;

    if (mode === 0 || mode === 1) {
      pTxt(ctx, 50, 40, base + ' 的口诀与求商：' + base + ' 的乘法要熟到脱口而出', '#2c3e50', 1);
      for (i = 1; i <= n; i++) {
        var bx = 60 + ((i - 1) % 3) * 190, by = 76 + Math.floor((i - 1) / 3) * 64;
        pRect(ctx, bx, by, 172, 54, i === n ? '#fdecea' : '#f7fafd', i === n ? '#c0392b' : '#e3ebf3', i === n ? 2.2 : 1.4);
        pTxt(ctx, bx + 10, by + 16, base + ' × ' + i + ' = ' + (base * i), i === n ? '#c0392b' : '#2c3e50', 0);
        pTxt(ctx, bx + 10, by + 38, (base * i) + ' ÷ ' + base + ' = ' + i + '　' + (base * i) + ' ÷ ' + i + ' = ' + base, '#6b7a89', 0);
      }
      pTxt(ctx, 50, 296, prod + ' ÷ ' + base + ' = ' + n, '#c0392b', 1);
      pTxt(ctx, 50, 332, '想口诀：' + pCn(Math.min(base, n)) + pCn(Math.max(base, n)) + (prod < 10 ? '得' : '') + pCn(prod), '#0f6e56', 1);
      pTxt(ctx, 50, 366, base >= 8 ? '8、9 的积较大：可用「整十数减一减」估一估' : '7 的口诀：7×7=49 是最容易混的一句', '#8a5a00');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '填空逆推：括号里求的是「几」', '#2c3e50', 1);
      pRect(ctx, 70, 80, 320, 62, '#fdecea', '#c0392b', 2);
      pTxt(ctx, 90, 111, '（  ）× ' + base + ' = ' + (base * n), '#c0392b', 1);
      pTxt(ctx, 70, 176, '想：' + pCn(base) + ' 几' + pCn(base * n), '#6b7a89', 0);
      pTxt(ctx, 70, 210, '因为 ' + n + ' × ' + base + ' = ' + (base * n), '#0f6e56', 0);
      pTxt(ctx, 70, 244, '所以括号里填 ' + n, '#0f6e56', 1);
      pTxt(ctx, 50, 290, '也可以写成 ' + (base * n) + ' ÷ ' + base + ' = ' + n, '#2c3e50');
      pTxt(ctx, 50, 326, '乘法和除法互相帮忙：一个算式两种问法', '#6b7a89');
      pTxt(ctx, 50, 360, '代回去检查：' + n + ' × ' + base + ' 是不是 ' + (base * n), '#8a5a00');
    } else {
      var q4 = Math.max(2, Math.min(9, B)), tot4 = 6 * q4;
      pTxt(ctx, 50, 40, '解决问题：先想这是「求每份」还是「求几份」', '#2c3e50', 1);
      for (i = 0; i < q4; i++) {
        pRect(ctx, 70 + i * 78, 80, 68, 64, '#eef4fa', '#185fa5', 1.4);
        for (var j = 0; j < 6; j++) pCirc(ctx, 86 + i * 78 + (j % 3) * 20, 100 + Math.floor(j / 3) * 26, 7, '#185fa5');
      }
      pTxt(ctx, 50, 172, '每盒 6 个，共 ' + q4 + ' 盒，一共 ' + tot4 + ' 个', '#2c3e50', 1);
      pTxt(ctx, 50, 210, '6 × ' + q4 + ' = ' + tot4 + '（个）', '#c0392b', 1);
      pTxt(ctx, 50, 250, tot4 + ' ÷ 6 = ' + q4 + '（盒）　' + tot4 + ' ÷ ' + q4 + ' = 6（个）', '#0f6e56', 1);
      pTxt(ctx, 50, 292, '一句口诀管三道题：一乘两除', '#2c3e50');
      pTxt(ctx, 50, 326, '求总数用乘法，求份数/每份用除法', '#6b7a89');
      pTxt(ctx, 50, 360, '看清单位：个、盒、人、行', '#8a5a00');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 2 ? '括号里求**几**：想口诀，或改用除法。'
        : mode === 3 ? '一乘两除：**同一句口诀**。'
          : base + ' 的乘法要**脱口而出**，除法才快。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['除数', A, 7, 9, 1, function (v) { A = Math.round(v); draw(); }, [0, 1]],
    ['商', B, 2, 7, 1, function (v) { B = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}

/* 混合运算：先乘除 / 同级从左 / 有括号先算 / 列综合算式 */
function p2bMixedLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 5, b: 4, c: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b), C = Math.round(p.c);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      var mul = B * C, sum = A + mul;
      pTxt(ctx, 50, 40, '先乘除，后加减', '#2c3e50', 1);
      pTxt(ctx, 70, 90, A + ' + ' + B + ' × ' + C, '#2c3e50', 1);
      pRect(ctx, 240, 70, 100, 40, null, '#c0392b', 2.4);
      pTxt(ctx, 290, 90, '先算', '#c0392b', 0, 1);
      pTxt(ctx, 70, 140, '① ' + B + ' × ' + C + ' = ' + mul, '#c0392b', 0);
      pTxt(ctx, 70, 176, '② ' + A + ' + ' + mul + ' = ' + sum, '#0f6e56', 0);
      pTxt(ctx, 50, 226, A + ' + ' + B + ' × ' + C + ' = ' + sum, '#c0392b', 1);
      pTxt(ctx, 50, 266, '乘法是「几个几相加」，所以比加减更「高一级」', '#2c3e50');
      pTxt(ctx, 50, 300, '如果先算加法，结果就错了：(' + A + '+' + B + ')×' + C + ' = ' + (A + B) * C, '#8a5a00');
      pTxt(ctx, 50, 334, '同级运算（只有加减、只有乘除）才从左往右', '#6b7a89');
      pTxt(ctx, 50, 368, '看到乘除号先画个圈，提醒自己先算它', '#6b7a89');
    } else if (mode === 1) {
      var s1 = A - B, s2 = s1 + C;
      pTxt(ctx, 50, 40, '同级运算：从左往右，一步一步算', '#2c3e50', 1);
      pTxt(ctx, 70, 92, A + ' − ' + B + ' + ' + C, '#2c3e50', 1);
      pTxt(ctx, 70, 140, '① ' + A + ' − ' + B + ' = ' + s1, '#c0392b', 0);
      pTxt(ctx, 70, 176, '② ' + s1 + ' + ' + C + ' = ' + s2, '#0f6e56', 0);
      pTxt(ctx, 50, 226, A + ' − ' + B + ' + ' + C + ' = ' + s2, '#c0392b', 1);
      pTxt(ctx, 50, 266, '如果先算后面：' + A + ' − (' + B + ' + ' + C + ') = ' + (A - B - C) + '，就错了', '#8a5a00');
      pTxt(ctx, 50, 300, '同级运算没有「谁优先」，只有「谁在前」', '#2c3e50');
      pTxt(ctx, 50, 334, '把每一步的结果写下来，不容易乱', '#6b7a89');
      pTxt(ctx, 50, 368, '减法在前就先减，加法在后就后加', '#6b7a89');
    } else if (mode === 2) {
      var inP = B + C, mulIn = A * inP;
      pTxt(ctx, 50, 40, '有括号先算括号里的', '#2c3e50', 1);
      pRect(ctx, 70, 74, 460, 62, '#e8f5ef', '#0f6e56', 1.8);
      pTxt(ctx, 90, 105, A + ' × (' + B + ' + ' + C + ')，先算 ' + B + ' + ' + C + ' = ' + inP, '#0f6e56', 0);
      pTxt(ctx, 90, 168, '再算 ' + A + ' × ' + inP + ' = ' + mulIn, '#0f6e56', 0);
      pRect(ctx, 70, 200, 460, 62, '#fdecea', '#c0392b', 1.8);
      pTxt(ctx, 90, 231, '没有括号：' + A + ' × ' + B + ' + ' + C + ' = ' + (A * B) + ' + ' + C + ' = ' + (A * B + C), '#c0392b', 0);
      pTxt(ctx, 50, 296, '结果不同：' + mulIn + ' ≠ ' + (A * B + C), '#8a5a00', 1);
      pTxt(ctx, 50, 332, '括号的作用就是「改变运算顺序」', '#2c3e50');
      pTxt(ctx, 50, 366, '括号里的算完，括号就没了', '#6b7a89');
    } else {
      var each = B, num = C, add2 = A, tot = each * num + add2;
      pTxt(ctx, 50, 40, '列综合算式：把分步合成一个式子', '#2c3e50', 1);
      pTxt(ctx, 50, 84, '已知：每盒 ' + each + ' 个，买了 ' + num + ' 盒，又送 ' + add2 + ' 个', '#2c3e50');
      pTxt(ctx, 50, 120, '分步：', '#6b7a89', 0);
      pTxt(ctx, 110, 148, each + ' × ' + num + ' = ' + (each * num), '#185fa5', 0);
      pTxt(ctx, 110, 178, (each * num) + ' + ' + add2 + ' = ' + tot, '#185fa5', 0);
      pTxt(ctx, 50, 220, '综合：' + each + ' × ' + num + ' + ' + add2 + ' = ' + tot, '#c0392b', 1);
      pTxt(ctx, 50, 262, '综合算式里，乘号那部分自动先算，不用加括号', '#0f6e56');
      pTxt(ctx, 50, 296, '如果先加减再乘除，就必须加括号', '#8a5a00');
      pTxt(ctx, 50, 330, '列完再看一遍：有没有丢掉某一步', '#6b7a89');
      pTxt(ctx, 50, 364, '答：一共有 ' + tot + ' 个。', '#2c3e50');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**先乘除、后加减**。'
        : mode === 1 ? '同级运算**从左往右**。'
          : mode === 2 ? '**括号最优先**。'
            : '分步 → **合成一个式子**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['第一个数', A, 1, 9, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第二个数', B, 1, 9, 1, function (v) { B = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第三个数', C, 1, 9, 1, function (v) { C = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}

/* 图形的运动（一）：轴对称 / 平移 / 旋转 / 生活中的运动 */
function p2bMotionLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 0, b: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), T = Math.min(2, Math.round(p.a)), D = Math.round(p.b);
  var rows, info = s0.info;
  var KIND = ['轴对称', '平移', '旋转'];

  function tree(ctx, x, y, s, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - s);
    ctx.lineTo(x + s * 0.62, y + s * 0.4);
    ctx.lineTo(x - s * 0.62, y + s * 0.4);
    ctx.closePath(); ctx.fill();
    pRect(ctx, x - s * 0.1, y + s * 0.4, s * 0.2, s * 0.34, '#8a5a00');
  }

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '轴对称图形：沿一条直线对折，两边完全重合', '#2c3e50', 1);
      var ax = 180 + D * 40;
      // 对称轴
      pLine(ctx, ax, 70, ax, 320, '#c0392b', 2, [8, 6]);
      pTxt(ctx, ax, 52, '对称轴', '#c0392b', 0, 1);
      // 左半（半个树）
      ctx.save();
      ctx.beginPath(); ctx.rect(70, 60, ax - 70, 270); ctx.clip();
      tree(ctx, ax, 200, 96, '#0f6e56');
      ctx.restore();
      // 右半（镜像）
      ctx.save();
      ctx.beginPath(); ctx.rect(ax, 60, 560 - ax, 270); ctx.clip();
      ctx.translate(2 * ax, 0); ctx.scale(-1, 1);
      tree(ctx, ax, 200, 96, '#7fa8c9');
      ctx.restore();
      pLine(ctx, ax, 70, ax, 320, '#c0392b', 2, [8, 6]);
      pTxt(ctx, 50, 344, '左右两边形状一样、方向相反，就是对称', '#2c3e50');
      pTxt(ctx, 50, 376, '圆有无数条对称轴，正方形有 4 条', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">对折后**完全重合** → 轴对称。</span>';
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '平移：沿直线移动，形状和方向都不变', '#2c3e50', 1);
      pLine(ctx, 70, 320, 580, 320, '#c2cdd8', 2);
      var dx = D * 52;
      tree(ctx, 120, 230, 70, '#c2cdd8');
      pTxt(ctx, 120, 300, '原来的位置', '#8a97a4', 0, 1);
      tree(ctx, 120 + dx, 230, 70, '#0f6e56');
      pTxt(ctx, 120 + dx, 300, '平移后', '#0f6e56', 0, 1);
      pArrow(ctx, 150, 214, 120 + dx - 20, 214, '#c0392b', 2.4);
      pTxt(ctx, 150 + dx / 2, 190, '向右平移 ' + D + ' 格', '#c0392b', 0, 1);
      pTxt(ctx, 50, 348, '平移只看位置变没变，大小、方向都不变', '#2c3e50');
      pTxt(ctx, 50, 380, '平移的距离 = 每个点移动的格数', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">平移：**形状、大小、方向都不变**，只换位置。</span>';
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '旋转：绕一个点转，形状不变方向变', '#2c3e50', 1);
      var cx = 210, cy = 190, ang = D * 30;
      pCirc(ctx, cx, cy, 4, '#2c3e50');
      pTxt(ctx, cx + 112, cy + 42, '旋转中心', '#2c3e50', 0);
      for (i = 0; i < 4; i++) {
        var a0 = (i * 90 + ang) * Math.PI / 180;
        ctx.fillStyle = i % 2 ? '#7fa8c9' : '#c0392b';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + 96 * Math.cos(a0), cy - 96 * Math.sin(a0));
        ctx.lineTo(cx + 96 * Math.cos(a0 + 0.5), cy - 96 * Math.sin(a0 + 0.5));
        ctx.closePath(); ctx.fill();
      }
      pTxt(ctx, 400, 120, '风车转了 ' + ang + '°', '#c0392b', 1, 0);
      pTxt(ctx, 400, 158, '（顺时针 ' + (360 - ang) + '° 也行）', '#6b7a89', 0);
      pTxt(ctx, 400, 196, '形状、大小不变', '#0f6e56', 0);
      pTxt(ctx, 400, 228, '方向变了', '#0f6e56', 0);
      pTxt(ctx, 50, 340, '旋转要说清：绕哪一点、转多少度、往哪边转', '#2c3e50');
      pTxt(ctx, 50, 372, '转满一圈 360°，转半圈 180°', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">旋转：**绕点转 ' + ang + '°**，方向改变。</span>';
    } else {
      pTxt(ctx, 50, 40, '三种运动：对折、平移、旋转', '#2c3e50', 1);
      for (i = 0; i < 3; i++) {
        var bx = 60 + i * 186, on = i === T;
        pRect(ctx, bx, 78, 168, 190, on ? '#fdecea' : '#f7fafd', on ? '#c0392b' : '#e3ebf3', on ? 2.6 : 1.4);
        pTxt(ctx, bx + 84, 100, KIND[i], on ? '#c0392b' : '#6b7a89', 1, 1);
        if (i === 0) {
          pLine(ctx, bx + 84, 120, bx + 84, 240, '#c0392b', 2, [6, 5]);
          tree(ctx, bx + 60, 180, 40, '#0f6e56');
          ctx.save(); ctx.translate(2 * (bx + 84), 0); ctx.scale(-1, 1);
          tree(ctx, bx + 60, 180, 40, '#7fa8c9'); ctx.restore();
        } else if (i === 1) {
          pLine(ctx, bx + 24, 236, bx + 144, 236, '#c2cdd8', 2);
          tree(ctx, bx + 50, 190, 30, '#c2cdd8');
          tree(ctx, bx + 110, 190, 30, '#0f6e56');
          pArrow(ctx, bx + 62, 158, bx + 98, 158, '#c0392b', 2);
        } else {
          var ccx = bx + 84, ccy = 180;
          pCirc(ctx, ccx, ccy, 3, '#2c3e50');
          for (var q = 0; q < 4; q++) {
            var a1 = (q * 90 + 40) * Math.PI / 180;
            ctx.fillStyle = q % 2 ? '#7fa8c9' : '#c0392b';
            ctx.beginPath(); ctx.moveTo(ccx, ccy);
            ctx.lineTo(ccx + 52 * Math.cos(a1), ccy - 52 * Math.sin(a1));
            ctx.lineTo(ccx + 52 * Math.cos(a1 + 0.55), ccy - 52 * Math.sin(a1 + 0.55));
            ctx.closePath(); ctx.fill();
          }
        }
        pTxt(ctx, bx + 84, 252, ['对折能重合', '沿直线移动', '绕点转圈'][i], '#6b7a89', 0, 1);
      }
      pTxt(ctx, 50, 300, '生活中的例子：', '#2c3e50', 1);
      pTxt(ctx, 50, 332, '轴对称：蝴蝶、窗花、剪纸上的人像', '#0f6e56');
      pTxt(ctx, 50, 362, '平移：电梯上下、推拉窗、地铁直线行驶', '#185fa5');
      pTxt(ctx, 50, 392, '旋转：风扇、钟表指针、摩天轮', '#c0392b');
      info.innerHTML = '<span class="viz-meta">当前：**' + KIND[T] + '**。</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['选一种运动', T, 0, 2, 1, function (v) { T = Math.min(2, Math.round(v)); draw(); }, [3]],
    ['移动几格 / 转几度', D, 1, 6, 1, function (v) { D = Math.round(v); draw(); }, [0, 1, 2]]
  ]);
  draw();
}

/* 有余数的除法：意义 / 余数<除数 / 验算 / 进一法去尾法 */
function p2bRemLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 17, b: 5 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    var q = Math.floor(A / B), r = A % B;

    if (mode === 0) {
      pTxt(ctx, 50, 40, '有余数的除法：分不完剩下的，就是余数', '#2c3e50', 1);
      var groups = Math.min(q, 6), show = Math.ceil(A / (groups + 1));
      for (i = 0; i < groups; i++) {
        pRect(ctx, 60 + i * 82, 76, 74, 96, '#f7fafd', '#dfe8f1', 1.4);
        for (j = 0; j < Math.min(B, 6); j++) pCirc(ctx, 76 + i * 82 + (j % 3) * 20, 96 + Math.floor(j / 3) * 26, 7, '#185fa5');
        pTxt(ctx, 97 + i * 82, 158, '第 ' + (i + 1) + ' 份', '#6b7a89', 0, 1);
      }
      for (j = 0; j < r; j++) pCirc(ctx, 90 + j * 34, 210, 9, '#c0392b');
      if (r) pTxt(ctx, 90 + r * 17, 240, '剩下 ' + r + ' 个（不够再分一份）', '#c0392b', 0, 1);
      pTxt(ctx, 50, 286, A + ' ÷ ' + B + ' = ' + q + ' …… ' + r, '#c0392b', 1);
      pTxt(ctx, 50, 322, '读作：' + A + ' 除以 ' + B + ' 商 ' + q + ' 余 ' + r, '#2c3e50');
      pTxt(ctx, 50, 356, '余数一定比除数小，否则还能再分一份', '#0f6e56');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '余数一定小于除数', '#2c3e50', 1);
      pTxt(ctx, 50, 82, '被除数 ' + A + ' 不变，换不同除数试试：', '#6c7a89', 0);
      for (i = 2; i <= 7; i++) {
        var qq = Math.floor(A / i), rr = A % i;
        var on = i === B;
        pRect(ctx, 60, 104 + (i - 2) * 40, 420, 36, on ? '#fdecea' : '#ffffff', on ? '#c0392b' : '#e3ebf3', on ? 2 : 1.2);
        pTxt(ctx, 74, 122 + (i - 2) * 40, A + ' ÷ ' + i + ' = ' + qq + ' …… ' + rr, on ? '#c0392b' : '#2c3e50', 0);
        pTxt(ctx, 400, 122 + (i - 2) * 40, '余数 ' + rr + (rr < i ? ' < 除数 ✓' : ' ✗'), rr < i ? '#0f6e56' : '#c0392b', 0);
      }
      pTxt(ctx, 50, 366, '如果余数等于或大于除数，说明商还能再大 1', '#8a5a00');
    } else if (mode === 2) {
      var chk = q * B + r;
      pTxt(ctx, 50, 40, '验算：商 × 除数 + 余数 = 被除数', '#2c3e50', 1);
      pRect(ctx, 70, 76, 460, 54, '#fdecea', '#c0392b', 2);
      pTxt(ctx, 90, 103, A + ' ÷ ' + B + ' = ' + q + ' …… ' + r, '#c0392b', 1);
      pTxt(ctx, 70, 158, '① ' + q + ' × ' + B + ' = ' + (q * B), '#185fa5', 0);
      pTxt(ctx, 70, 194, '② ' + (q * B) + ' + ' + r + ' = ' + chk, '#185fa5', 0);
      pTxt(ctx, 70, 234, '③ ' + chk + ' = ' + A + ' ✓ 算对了', '#0f6e56', 1);
      pTxt(ctx, 50, 282, '有余数除法也能验算，只是要记得加余数', '#2c3e50');
      pTxt(ctx, 50, 316, '余数丢了或加错了，验算就对不上', '#6b7a89');
      pTxt(ctx, 50, 350, '这类题以后会变成「被除数 = 除数 × 商 + 余数」', '#8a5a00');
    } else {
      var inOne = Math.ceil(A / B), cut = Math.floor(A / B);
      pTxt(ctx, 50, 40, '进一法 与 去尾法：看问题怎么问', '#2c3e50', 1);
      pRect(ctx, 60, 72, 240, 130, '#fdecea', '#c0392b', 1.8);
      pTxt(ctx, 80, 96, '进一法（要都装下）', '#c0392b', 0);
      pTxt(ctx, 80, 128, A + ' 人，每条船坐 ' + B + ' 人', '#2c3e50', 0);
      pTxt(ctx, 80, 160, '至少要 ' + inOne + ' 条船', '#c0392b', 1);
      pTxt(ctx, 80, 186, '剩 ' + r + ' 人也得再开一条', '#6b7a89', 0);
      pRect(ctx, 320, 72, 240, 130, '#eef4fa', '#185fa5', 1.8);
      pTxt(ctx, 340, 96, '去尾法（只做完整的）', '#185fa5', 0);
      pTxt(ctx, 340, 128, B + ' 米布做一套衣服，', '#2c3e50', 0);
      pTxt(ctx, 340, 152, A + ' 米最多做 ' + cut + ' 套', '#185fa5', 1);
      pTxt(ctx, 340, 186, '剩的布不够一套，不算', '#6b7a89', 0);
      pTxt(ctx, 50, 232, A + ' ÷ ' + B + ' = ' + q + ' …… ' + r + '：商 ' + q + ' 是完整的份数', '#2c3e50', 1);
      pTxt(ctx, 50, 270, '要「都装下、都坐车」→ 进一法（商 + 1）', '#c0392b');
      pTxt(ctx, 50, 304, '要「能做几套、几组」→ 去尾法（就是商）', '#185fa5');
      pTxt(ctx, 50, 338, '关键不是算法，而是读清题目在问什么', '#0f6e56');
      pTxt(ctx, 50, 372, '有剩余时，多问一句：这点儿还剩的算不算一份？', '#8a5a00');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '余数 = **分不完剩下的**。'
        : mode === 1 ? '**余数 < 除数**，永远成立。'
          : mode === 2 ? '验算：**商×除数 + 余数**。'
            : '进一法 +1，去尾法取商。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['被除数', A, 10, 30, 1, function (v) { A = Math.round(v); draw(); }, [0, 2, 3]],
    ['除数', B, 3, 8, 1, function (v) { B = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}

/* 万以内数的认识：千与万 / 读写 / 比大小 / 近似数 */
function p2bWanLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 3456, b: 2890 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;
  var UNITS = ['千', '百', '十', '个'];

  function digits(n) {
    var s = String(Math.max(0, Math.min(9999, n)));
    while (s.length < 4) s = '0' + s;
    return s.split('');
  }

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '10 个一百是一千，10 个一千是一万', '#2c3e50', 1);
      for (i = 0; i < 10; i++) pRect(ctx, 60 + i * 31, 80, 24, 60, '#fdecea', '#c0392b', 1);
      pTxt(ctx, 215, 160, '10 个一百 = 一千', '#c0392b', 0, 1);
      for (i = 0; i < 10; i++) pRect(ctx, 60 + i * 31, 190, 24, 60, '#eef4fa', '#185fa5', 1);
      pTxt(ctx, 215, 268, '10 个一千 = 一万', '#185fa5', 0, 1);
      pTxt(ctx, 380, 110, '数位顺序：', '#2c3e50', 0);
      pTxt(ctx, 380, 142, '万 千 百 十 个', '#c0392b', 0);
      pTxt(ctx, 380, 178, '每相邻两位都是 10 倍', '#6b7a89', 0);
      pTxt(ctx, 380, 214, '满十就向前一位进 1', '#0f6e56', 0);
      pTxt(ctx, 380, 250, '四位数的最高位是千位', '#6b7a89', 0);
      pTxt(ctx, 50, 310, A + ' 里面有 ' + Math.floor(A / 1000) + ' 个千', '#c0392b', 1);
      pTxt(ctx, 50, 344, '读四位数：先读千，再读百、十、个', '#2c3e50');
      pTxt(ctx, 50, 376, '中间有 0 要读「零」，末尾的 0 不读', '#8a5a00');
    } else if (mode === 1) {
      var d = digits(A);
      pTxt(ctx, 50, 40, '数位表：从右往左，一位一位读', '#2c3e50', 1);
      for (i = 0; i < 4; i++) {
        pRect(ctx, 80 + i * 120, 76, 110, 44, '#eef4fa', '#9aa7b4');
        pTxt(ctx, 135 + i * 120, 98, UNITS[i] + '位', '#6b7a89', 0, 1);
        pRect(ctx, 80 + i * 120, 120, 110, 80, '#ffffff', d[i] === '0' ? '#dfe8f1' : '#c0392b', 1.8);
        pBig(ctx, 135 + i * 120, 160, d[i], d[i] === '0' ? '#c2cdd8' : '#c0392b', 40);
      }
      pTxt(ctx, 50, 236, '读作：' + (function () {
        var rs = '', zero = false, q;
        var names = ['千', '百', '十', ''];
        for (q = 0; q < 4; q++) {
          if (d[q] === '0') { zero = true; continue; }
          if (zero && rs) rs += '零';
          zero = false;
          rs += P_CN[+d[q]] + names[q];
        }
        return rs || '零';
      })(), '#c0392b', 1);
      pTxt(ctx, 50, 276, '写作：' + A, '#2c3e50', 1);
      pTxt(ctx, 50, 314, '中间有一个或两个 0，都只读一个「零」', '#0f6e56');
      pTxt(ctx, 50, 348, '末尾的 0 不读，但写数时不能漏', '#6b7a89');
    } else if (mode === 2) {
      var sym = A > B ? '>' : A < B ? '<' : '=';
      var dA = digits(A), dB = digits(B);
      pTxt(ctx, 50, 40, '比大小：先比位数，位数相同从最高位比起', '#2c3e50', 1);
      pRect(ctx, 70, 80, 200, 90, '#fdecea', '#c0392b', 2);
      pRect(ctx, 320, 80, 200, 90, '#eef4fa', '#185fa5', 2);
      pTxt(ctx, 170, 125, String(A), '#c0392b', 1, 1);
      pTxt(ctx, 420, 125, String(B), '#185fa5', 1, 1);
      pBig(ctx, 295, 128, sym, '#0f6e56', 44);
      var firstDiff = -1;
      for (i = 0; i < 4; i++) if (dA[i] !== dB[i]) { firstDiff = i; break; }
      pTxt(ctx, 50, 208, A + ' ' + sym + ' ' + B, '#0f6e56', 1);
      pTxt(ctx, 50, 246, firstDiff < 0 ? '四个数位都一样，所以相等' : UNITS[firstDiff] + '位：' + dA[firstDiff] + ' 和 ' + dB[firstDiff] + ' 不同，先看这一位', '#2c3e50');
      pTxt(ctx, 50, 284, '位数不同的，位数多的那个数大', '#6b7a89');
      pTxt(ctx, 50, 318, '位数相同，从左起第一位不同的数开始比', '#0f6e56');
      pTxt(ctx, 50, 352, '后面几位再大，也救不回来', '#8a5a00');
    } else {
      var near10 = Math.round(A / 10) * 10, near100 = Math.round(A / 100) * 100, near1000 = Math.round(A / 1000) * 1000;
      pTxt(ctx, 50, 40, '近似数：找一个「差不多」的整十、整百、整千', '#2c3e50', 1);
      pRect(ctx, 70, 76, 470, 52, '#fdecea', '#c0392b', 2);
      pTxt(ctx, 90, 102, '原数：' + A, '#c0392b', 1);
      pTxt(ctx, 70, 152, '① 精确到十位：看个位 ' + (A % 10) + (A % 10 >= 5 ? ' ≥5，进 1' : ' <5，舍去'), '#2c3e50', 0);
      pTxt(ctx, 340, 152, '≈ ' + near10, '#0f6e56', 1, 0);
      pTxt(ctx, 70, 186, '② 精确到百位：看十位 ' + (Math.floor(A / 10) % 10) + (Math.floor(A / 10) % 10 >= 5 ? ' ≥5，进 1' : ' <5，舍去'), '#2c3e50', 0);
      pTxt(ctx, 340, 186, '≈ ' + near100, '#0f6e56', 1, 0);
      pTxt(ctx, 70, 220, '③ 精确到千位：看百位 ' + (Math.floor(A / 100) % 10) + (Math.floor(A / 100) % 10 >= 5 ? ' ≥5，进 1' : ' <5，舍去'), '#2c3e50', 0);
      pTxt(ctx, 340, 220, '≈ ' + near1000, '#0f6e56', 1, 0);
      pTxt(ctx, 50, 268, '四舍五入：看要保留的下一位是几', '#0f6e56', 1);
      pTxt(ctx, 50, 304, '下一位 < 5 就舍去，≥ 5 就进 1', '#2c3e50');
      pTxt(ctx, 50, 338, '近似数要用「≈」，不能用「=」', '#c0392b');
      pTxt(ctx, 50, 372, '近似到哪一位，就看它右边那一位', '#6b7a89');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**满十进一**，四位数的最高位是千位。'
        : mode === 1 ? '中间 0 只读**一个零**，末尾 0 不读。'
          : mode === 2 ? '先比**位数**，再从**最高位**比。'
            : '近似数：**四舍五入**，用 ≈。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['第一个数', A, 100, 9999, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第二个数', B, 100, 9999, 1, function (v) { B = Math.round(v); draw(); }, [2]]
  ]);
  draw();
}

/* 克和千克：克 / 千克 / 秤与读数 / 合理单位 */
function p2bWeightLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 5, b: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.min(3, Math.round(p.b));
  var rows, info = s0.info;
  var OBJ = ['一枚 1 元硬币', '一个鸡蛋', '一袋盐', '一个西瓜'];
  var W = ['约 6 克', '约 50 克', '约 500 克', '约 5 千克'];

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '克（g）：称很轻的东西', '#2c3e50', 1);
      // 天平
      pLine(ctx, 130, 150, 390, 150, '#2c3e50', 3);
      pLine(ctx, 260, 150, 260, 280, '#2c3e50', 3);
      pRect(ctx, 210, 280, 100, 12, '#2c3e50');
      pLine(ctx, 130, 150, 130, 190, '#6b7a89', 1.6);
      pLine(ctx, 390, 150, 390, 190, '#6b7a89', 1.6);
      pRect(ctx, 90, 190, 80, 10, '#6b7a89');
      pRect(ctx, 350, 190, 80, 10, '#6b7a89');
      for (i = 0; i < Math.min(A, 10); i++) pCirc(ctx, 108 + (i % 5) * 14, 184 - Math.floor(i / 5) * 9, 6, '#c9a227');
      pTxt(ctx, 130, 216, A + ' 枚 1 元硬币', '#c0392b', 0, 1);
      pRect(ctx, 360, 172, 60, 20, '#eef4fa', '#185fa5', 1.4);
      pTxt(ctx, 390, 214, A + ' 克', '#185fa5', 0, 1);
      pTxt(ctx, 50, 316, '1 枚 1 元硬币大约 6 克', '#2c3e50');
      pTxt(ctx, 50, 350, '天平两边一样高，说明质量相等', '#0f6e56');
      pTxt(ctx, 50, 382, '很轻的东西（硬币、邮票、药片）用克', '#6b7a89');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '千克（kg）：称重的东西，1 千克 = 1000 克', '#2c3e50', 1);
      pRect(ctx, 70, 90, 180, 120, '#fdecea', '#c0392b', 2);
      pTxt(ctx, 160, 132, '1 千克', '#c0392b', 1, 1);
      pTxt(ctx, 160, 172, '= 1000 克', '#c0392b', 0, 1);
      pTxt(ctx, 280, 152, '=', '#2c3e50', 1, 1);
      for (i = 0; i < 10; i++) pRect(ctx, 320 + (i % 5) * 60, 90 + Math.floor(i / 5) * 62, 52, 54, '#eef4fa', '#185fa5', 1.4);
      for (i = 0; i < 10; i++) pTxt(ctx, 346 + (i % 5) * 60, 117 + Math.floor(i / 5) * 62, '100克', '#185fa5', 0, 1);
      pTxt(ctx, 50, 246, '1 千克 = 1000 克（3 个 0，别少写）', '#c0392b', 1);
      pTxt(ctx, 50, 284, '5 千克 = 5000 克；2 千克 300 克 = 2300 克', '#2c3e50');
      pTxt(ctx, 50, 320, '两袋盐大约 1 千克，一袋米有 10 千克', '#6b7a89');
      pTxt(ctx, 50, 354, '千克和克之间的进率是 1000', '#0f6e56');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '读秤：指针指着几，就是几千克（或几克）', '#2c3e50', 1);
      var cx = 200, cy = 190, R = 104, v = A % 11;
      pCirc(ctx, cx, cy, R, '#ffffff', '#2c3e50', 2.6);
      for (i = 0; i <= 10; i++) {
        var ang = Math.PI + i * Math.PI / 10;
        pLine(ctx, cx + (R - 12) * Math.cos(ang), cy + (R - 12) * Math.sin(ang),
          cx + (R - 2) * Math.cos(ang), cy + (R - 2) * Math.sin(ang), '#2c3e50', 2);
        pTxt(ctx, cx + (R - 30) * Math.cos(ang), cy + (R - 30) * Math.sin(ang), String(i), '#6b7a89', 0, 1);
      }
      var pa = Math.PI + v * Math.PI / 10;
      pLine(ctx, cx, cy, cx + (R - 16) * Math.cos(pa), cy + (R - 16) * Math.sin(pa), '#c0392b', 3);
      pCirc(ctx, cx, cy, 6, '#2c3e50');
      pTxt(ctx, cx, 244, '指针：' + v + ' 千克', '#c0392b', 1, 1);
      pTxt(ctx, 380, 120, '读数三步：', '#2c3e50', 0);
      pTxt(ctx, 380, 152, '① 看单位（kg 还是 g）', '#6b7a89', 0);
      pTxt(ctx, 380, 184, '② 看指针靠近哪个刻度', '#6b7a89', 0);
      pTxt(ctx, 380, 216, '③ 数出小格（每格 100 克）', '#6b7a89', 0);
      pTxt(ctx, 380, 252, '当前读数：' + v + ' 千克', '#0f6e56', 0);
      pTxt(ctx, 50, 320, '称东西前先看秤是不是指在 0', '#8a5a00');
      pTxt(ctx, 50, 354, '指针在 0 上，称出来才准确', '#6b7a89');
    } else {
      pTxt(ctx, 50, 40, '选单位：先估一估有多重', '#2c3e50', 1);
      for (i = 0; i < 4; i++) {
        var bx = 60 + i * 148, on = i === B;
        pRect(ctx, bx, 78, 132, 148, on ? '#fdecea' : '#f7fafd', on ? '#c0392b' : '#e3ebf3', on ? 2.6 : 1.4);
        pTxt(ctx, bx + 66, 102, OBJ[i], on ? '#c0392b' : '#6b7a89', 0, 1);
        pTxt(ctx, bx + 66, 148, W[i], on ? '#c0392b' : '#2c3e50', 1, 1);
        pTxt(ctx, bx + 66, 194, i < 3 ? '用克' : '用千克', '#0f6e56', 0, 1);
      }
      pTxt(ctx, 50, 256, OBJ[B] + '：' + W[B], '#c0392b', 1);
      pTxt(ctx, 50, 292, '轻的东西用克，重的东西用千克', '#2c3e50');
      pTxt(ctx, 50, 326, '1 千克大约：20 个鸡蛋 / 2 袋盐', '#6b7a89');
      pTxt(ctx, 50, 360, '单位选错，数字再对也没意义', '#8a5a00');
      info.innerHTML = '<span class="viz-meta">' + OBJ[B] + '：**' + W[B] + '**。</span>';
    }

    if (mode < 3) {
      info.innerHTML = '<span class="viz-meta">' +
        (mode === 0 ? '轻的东西用**克**。'
          : mode === 1 ? '**1 千克 = 1000 克**。'
            : '读数：**看单位 → 看刻度 → 数小格**。') + '</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['重量 / 指针', A, 1, 10, 1, function (v) { A = Math.round(v); draw(); }, [0, 2]],
    ['选一个物体', B, 0, 3, 1, function (v) { B = Math.min(3, Math.round(v)); draw(); }, [3]]
  ]);
  draw();
}

/* 数学广角——推理 */
function p2bLogicLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), S = Math.max(0, Math.min(5, Math.round(p.a)));
  var rows, info = s0.info;
  var NAMES = ['小明', '小红', '小刚'];

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '两个条件，一步步排除', '#2c3e50', 1);
      pTxt(ctx, 50, 86, '条件① 甲不是第一名', '#2c3e50', 0);
      pTxt(ctx, 50, 118, '条件② 乙不是第一名，也不是第二名', '#2c3e50', 0);
      pTxt(ctx, 50, 164, '推理：', '#c0392b', 0);
      pTxt(ctx, 70, 196, '乙不是第一、第二 → 乙是第三名', '#0f6e56', 0);
      pTxt(ctx, 70, 228, '甲不是第一 → 甲是第二名', '#0f6e56', 0);
      pTxt(ctx, 70, 260, '剩下的丙就是第一名', '#0f6e56', 0);
      pRect(ctx, 60, 288, 480, 46, '#fdecea', '#c0392b', 1.8);
      pTxt(ctx, 80, 311, '结论：丙第一，甲第二，乙第三', '#c0392b', 1);
      pTxt(ctx, 60, 362, '排除法：把「不可能」的一个个划掉', '#8a5a00');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '三个条件，三个人三个物', '#2c3e50', 1);
      pTxt(ctx, 50, 82, '① 小明不喜欢吃苹果', '#2c3e50', 0);
      pTxt(ctx, 50, 112, '② 小红既不选苹果，也不选香蕉', '#2c3e50', 0);
      pTxt(ctx, 50, 142, '③ 每人只能选一种水果', '#2c3e50', 0);
      // 表
      var fruits = ['苹果', '香蕉', '橘子'];
      pRect(ctx, 60, 176, 460, 40, '#eef4fa', '#9aa7b4');
      pTxt(ctx, 200, 196, '苹果', '#2c3e50', 0, 1);
      pTxt(ctx, 300, 196, '香蕉', '#2c3e50', 0, 1);
      pTxt(ctx, 400, 196, '橘子', '#2c3e50', 0, 1);
      var ans = [[0, 0, 1], [0, 0, 0], [0, 1, 0]];
      ans[1][0] = 0; ans[1][1] = 0; ans[1][2] = 1;
      ans[0][0] = 0; ans[0][1] = 1; ans[0][2] = 0;
      ans[2][0] = 1; ans[2][1] = 0; ans[2][2] = 0;
      for (i = 0; i < 3; i++) {
        pRect(ctx, 60, 216 + i * 44, 460, 44, '#ffffff', '#dfe8f1');
        pTxt(ctx, 110, 238 + i * 44, NAMES[i], '#2c3e50', 0, 1);
        for (j = 0; j < 3; j++) {
          pTxt(ctx, 200 + j * 100, 238 + i * 44, ans[i][j] ? '√' : '×', ans[i][j] ? '#0f6e56' : '#c2cdd8', 1, 1);
        }
      }
      pTxt(ctx, 60, 372, '小红只能选橘子，小明就选香蕉，小刚选苹果', '#c0392b');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '表格推理：一行一列只能有一个 √', '#2c3e50', 1);
      var hdr = ['红', '黄', '蓝'];
      pRect(ctx, 90, 80, 420, 42, '#eef4fa', '#9aa7b4');
      for (i = 0; i < 3; i++) pTxt(ctx, 210 + i * 120, 101, hdr[i], '#2c3e50', 0, 1);
      for (i = 0; i < 3; i++) {
        pRect(ctx, 90, 122 + i * 52, 420, 52, '#ffffff', '#dfe8f1');
        pTxt(ctx, 150, 148 + i * 52, NAMES[i], '#2c3e50', 0, 1);
        for (j = 0; j < 3; j++) {
          var mark = (i === S % 3 && j === 2) || (i === (S + 1) % 3 && j === 0) || (i === (S + 2) % 3 && j === 1);
          var cross = !mark && ((i === S % 3 && j !== 2) || (i === (S + 1) % 3 && j !== 0));
          pTxt(ctx, 210 + j * 120, 148 + i * 52, mark ? '√' : cross ? '×' : '', mark ? '#0f6e56' : '#c2cdd8', 1, 1);
        }
      }
      pTxt(ctx, 50, 306, '先找「只能是一种」的格子打 √，同行同列其余打 ×', '#2c3e50');
      pTxt(ctx, 50, 340, '每行每列都只有一个 √ —— 这是检验标准', '#0f6e56');
      pTxt(ctx, 50, 374, '表格把「想不清楚的关系」变成「看得见的格子」', '#8a5a00');
    } else {
      pTxt(ctx, 50, 40, '方格里的数：每行每列不能重复', '#2c3e50', 1);
      var grid = [[1, 2, 3], [3, 1, 2], [2, 3, 1]];
      var hole = S % 9;
      for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
          var bx = 130 + j * 100, by = 84 + i * 84;
          pRect(ctx, bx, by, 94, 78, '#ffffff', '#9aa7b4', 1.6);
          if (i * 3 + j === hole) pTxt(ctx, bx + 47, by + 39, '?', '#c0392b', 1, 1);
          else pTxt(ctx, bx + 47, by + 39, String(grid[i][j]), '#2c3e50', 1, 1);
        }
      }
      pTxt(ctx, 430, 110, '每行 1~3 各一次', '#6b7a89', 0);
      pTxt(ctx, 430, 142, '每列 1~3 各一次', '#6b7a89', 0);
      pTxt(ctx, 50, 348, '问号处：看这一行缺哪个数，再看这一列缺哪个数', '#2c3e50');
      pTxt(ctx, 50, 382, '同时满足行和列的那个数，就是答案', '#0f6e56');
      info.innerHTML = '<span class="viz-meta">问号处应填 **' + grid[Math.floor(hole / 3)][hole % 3] + '**（行、列各缺它）。</span>';
    }

    if (mode < 3) {
      info.innerHTML = '<span class="viz-meta">' +
        (mode === 0 ? '**排除不可能**，剩下就是答案。'
          : mode === 1 ? '条件越多，越要先**列表**。'
            : '表格推理：**一行一列只一个 √**。') + '</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['换一种情形', S, 0, 5, 1, function (v) { S = Math.round(v); draw(); }, [2, 3]]
  ]);
  draw();
}
