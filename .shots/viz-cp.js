/* ===== 选择性必修第三册：计数原理（cp） ===== */

function cpFact(n) { var r = 1, i; for (i = 2; i <= n; i++) r *= i; return r; }
function cpC(n, r) { if (r < 0 || r > n) return 0; return cpFact(n) / (cpFact(r) * cpFact(n - r)); }
function cpSup(e, letter) { var s = ['\u2070', '\u00b9', '\u00b2', '\u00b3', '\u2074', '\u2075', '\u2076', '\u2077', '\u2078', '\u2079']; if (e === 0) return ''; if (e === 1) return letter; return letter + s[e]; }

/* 两个基本计数原理：分类加法 vs 分步乘法 */
function cpPrincipleLab(el, cfg) {
  var p = Object.assign({ mode: 0, k: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function node(ctx, x, y, color) {
    ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = color; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4; ctx.stroke();
  }
  function draw() {
    var mode = Math.round(p.mode), k = Math.round(p.k);
    var m = linMap(s0.cv, { xmin: 0, xmax: 1, ymin: 0, ymax: 1 }, 14);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    var total, explain;
    if (mode === 0) {
      var counts = [], i, sum = 0;
      for (i = 0; i < k; i++) { counts.push(i + 2); sum += i + 2; }
      total = sum;
      var rx = 70, gx = 250, lx = 470;
      var gy = function (i) { return 50 + (m.h - 100) * (i + 0.5) / k; };
      node(ctx, rx, m.h / 2, '#185fa5');
      ctx.fillStyle = '#333'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('出发', rx, m.h / 2 + 20);
      var leaves = [], j;
      for (i = 0; i < k; i++) {
        var yy = gy(i);
        ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(rx + 6, m.h / 2); ctx.lineTo(gx - 6, yy); ctx.stroke();
        node(ctx, gx, yy, '#7d3c98');
        var sp = Math.min(30, (m.h - 90) / counts[i]);
        for (j = 0; j < counts[i]; j++) {
          var ly = yy + (j - (counts[i] - 1) / 2) * sp;
          ctx.strokeStyle = ['rgba(192,57,43,0.55)', 'rgba(24,95,165,0.55)', 'rgba(15,110,86,0.55)', 'rgba(138,90,0,0.55)'][i % 4];
          ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.moveTo(gx + 6, yy); ctx.lineTo(lx - 6, ly); ctx.stroke();
          node(ctx, lx, ly, '#c0392b');
          leaves.push(ly);
        }
        ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
        ctx.fillText('第' + (i + 1) + '类 ' + counts[i] + ' 种', gx, yy - 16);
      }
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('N = ' + counts.slice(0, k).join(' + ') + ' = ' + total + ' 种', lx + 18, m.h / 2);
      ctx.textAlign = 'center';
      explain = '完成这件事共有 <b>' + k + ' 类</b>互不重叠的办法，每类各有若干种——<b>加法原理</b>：N = n\u2081 + n\u2082 + \u2026 + n\u2096。';
    } else {
      var d, j2;
      var px2 = function (d) { return 90 + d * (m.w - 210) / k; };
      for (d = 0; d < k; d++) {
        var cnt = Math.pow(2, d);
        for (j2 = 0; j2 < cnt; j2++) {
          var y = 46 + (m.h - 92) * (j2 + 0.5) / cnt;
          if (d > 0) {
            var pj = Math.floor(j2 / 2), py = 46 + (m.h - 92) * (pj + 0.5) / cnt;
            ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4;
            ctx.beginPath(); ctx.moveTo(px2(d - 1) + 6, py); ctx.lineTo(px2(d) - 6, y); ctx.stroke();
          }
          node(ctx, px2(d), y, d === k - 1 ? '#c0392b' : '#185fa5');
        }
        ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
        ctx.fillText('第' + (d + 1) + '步（2 种）', px2(d), 26);
      }
      total = Math.pow(2, k);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('N = ' + new Array(k + 1).join('2\u00d7').slice(0, -1) + ' = 2^' + k + ' = ' + total + ' 种', 24, m.h - 16);
      ctx.textAlign = 'center';
      explain = '完成这件事要<b>依次走 k 步</b>，每步独立且有 2 种选择——<b>乘法原理</b>：N = n\u2081 \u00d7 n\u2082 \u00d7 \u2026 \u00d7 n\u2096。走到最后每条路径都是一个完整方案。';
    }
    s0.info.innerHTML = '<span class="viz-meta">' + explain +
      ' 口诀：<b>分类「或」相加，分步「且」相乘</b>。判断用哪个原理，就看「做完这件事」是选一条路就够（分类），还是每一步都必须走（分步）。' +
      ' 当前总数 = <b>' + total + '</b> 种。复杂计数题都是这两个原理的嵌套：先分类、类内再分步。</span>';
  }
  cSlider(s0.ctrl, '原理（0 分类加法 / 1 分步乘法）', p.mode, 0, 1, 1, function (v) { p.mode = v; draw(); });
  cSlider(s0.ctrl, '类数 / 步数 k', p.k, 2, 4, 1, function (v) { p.k = v; draw(); });
  draw();
}

/* 排列：从 n 个里选 r 个排成一列 */
function cpPermLab(el, cfg) {
  var p = Object.assign({ n: 5, r: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var n = Math.round(p.n), r = Math.round(p.r);
    var re = Math.min(r, n);
    var m = linMap(s0.cv, { xmin: 0, xmax: 1, ymin: 0, ymax: 1 }, 14);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    var i;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    // 上排 n 个人
    ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
    ctx.fillText(n + ' 个人（人人不同，讲究顺序）', m.w / 2, 26);
    for (i = 0; i < n; i++) {
      var x = m.w / 2 + (i - (n - 1) / 2) * 54;
      ctx.beginPath(); ctx.arc(x, 78, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#185fa5'; ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(letters[i], x, 79);
    }
    // 下排 r 个槽位
    var total = cpFact(n) / cpFact(n - re), prod = [], opts = [];
    for (i = 0; i < re; i++) opts.push(n - i);
    var sy = 200, sw = 62, gap = 14;
    var startX = m.w / 2 - (re * sw + (re - 1) * gap) / 2;
    for (i = 0; i < re; i++) {
      var sx = startX + i * (sw + gap);
      ctx.fillStyle = 'rgba(192,57,43,0.08)';
      ctx.fillRect(sx, sy - 26, sw, 52);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.6;
      ctx.strokeRect(sx, sy - 26, sw, 52);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(opts[i] + ' 种', sx + sw / 2, sy - 8);
      ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
      ctx.fillText('第 ' + (i + 1) + ' 位', sx + sw / 2, sy + 14);
      ctx.fillText('剩 ' + opts[i] + ' 人可选', sx + sw / 2, sy + 30);
    }
    // 箭头：人群 → 槽位
    ctx.strokeStyle = 'rgba(24,95,165,0.4)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(m.w / 2, 96); ctx.lineTo(m.w / 2, sy - 34); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#333'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(opts.join(' \u00d7 ') + ' = ' + total + ' 种排法', m.w / 2, 136);
    ctx.fillStyle = '#8a5a00'; ctx.font = FONT;
    ctx.fillText('A(n,r) = n!/(n\u2212r)! = ' + n + '!/' + (n - re) + '! = ' + total, m.w / 2, 158);
    var warn = r > n ? ' <b style="color:#c0392b">r 不能超过 n，已按 r = ' + re + ' 显示。</b>' : '';
    s0.info.innerHTML = '<span class="viz-meta">从 ' + n + ' 个人里选 ' + re + ' 个排成一列：第 1 位有 ' + n +
      ' 种选法，第 2 位只剩 ' + (n - 1) + ' 种……第 ' + re + ' 位剩 ' + (n - re + 1) + ' 种。' +
      ' 按乘法原理：A(' + n + ',' + re + ') = ' + opts.join(' \u00d7 ') + ' = <b>' + total + '</b>。' + warn +
      ' <b>「排列」的关键是顺序</b>：交换两个人就是不同排法。槽位越往后，可选项越少——每用掉一人少一种。</span>';
  }
  cSlider(s0.ctrl, '人数 n', p.n, 2, 6, 1, function (v) { p.n = v; draw(); });
  cSlider(s0.ctrl, '排几个 r', p.r, 1, 6, 1, function (v) { p.r = v; draw(); });
  draw();
}

/* 组合：只选不排，C(n,r) = A(n,r)/r! */
function cpCombLab(el, cfg) {
  var p = Object.assign({ n: 5, r: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var n = Math.round(p.n), r = Math.round(p.r);
    var re = Math.min(r, n);
    var A = cpFact(n) / cpFact(n - re), C = cpC(n, re);
    var m = linMap(s0.cv, { xmin: 0, xmax: 1, ymin: 0, ymax: 1 }, 14);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    var i;
    // 左：两根对比柱
    var baseY = m.h - 60, maxH = m.h - 150;
    var bw = 64;
    var scale = maxH / Math.max(A, 1);
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillStyle = 'rgba(24,95,165,0.75)';
    ctx.fillRect(70, baseY - A * scale, bw, A * scale);
    ctx.fillStyle = 'rgba(192,57,43,0.75)';
    ctx.fillRect(170, baseY - C * scale, bw, C * scale);
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(50, baseY); ctx.lineTo(260, baseY); ctx.stroke();
    ctx.fillStyle = '#185fa5'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('A(' + n + ',' + re + ') = ' + cFmt(A), 70 + bw / 2, baseY - A * scale - 20);
    ctx.fillStyle = '#c0392b';
    ctx.fillText('C(' + n + ',' + re + ') = ' + cFmt(C), 170 + bw / 2, baseY - C * scale - 20);
    ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
    ctx.fillText('排队（计顺序）', 70 + bw / 2, baseY + 8);
    ctx.fillText('组队（不计顺序）', 170 + bw / 2, baseY + 8);
    // 右：同一组的 r! 种排法
    var grp = letters.slice(0, re);
    var rx = 310, ry2 = 70;
    ctx.fillStyle = '#333'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText('选中 {' + grp.join(', ') + '} 这一组：', rx, ry2);
    var perms = [[], []], arr = grp.slice(0, Math.min(re, 3));
    // 列出前 3 种排法示意
    var ex = re >= 2 ? [grp.slice(), grp.slice(0, 2).reverse().concat(grp.slice(2))] : [grp.slice()];
    if (re >= 3) ex.push([grp[0], grp[2], grp[1]].concat(grp.slice(3)));
    for (i = 0; i < ex.length; i++) {
      ctx.fillStyle = '#185fa5'; ctx.font = FONT;
      ctx.fillText(ex[i].join(' '), rx + 24, ry2 + 26 + i * 22);
    }
    ctx.fillStyle = '#c0392b'; ctx.font = FONT;
    ctx.fillText('\u2026\u2026 共 r! = ' + cpFact(re) + ' 种排法', rx + 24, ry2 + 26 + ex.length * 22 + 4);
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(rx + 6, ry2 + 16);
    ctx.lineTo(rx + 6, ry2 + 26 + ex.length * 22 + 8);
    ctx.stroke();
    ctx.fillStyle = '#8a5a00';
    ctx.fillText('但这 r! 种排法都是同一个组合！', rx + 24, ry2 + 26 + ex.length * 22 + 26);
    var warn = r > n ? ' <b style="color:#c0392b">r 不能超过 n，已按 r = ' + re + ' 显示。</b>' : '';
    s0.info.innerHTML = '<span class="viz-meta">同样从 ' + n + ' 个里取 ' + re + ' 个：<b>排队要管顺序，组队不用</b>。' +
      ' 每个组合内部还有 ' + cpFact(re) + ' 种排法，所以 A(' + n + ',' + re + ') = C(' + n + ',' + re + ') \u00d7 ' + cpFact(re) +
      '，即 <b>C(' + n + ',' + re + ') = ' + A + ' / ' + cpFact(re) + ' = ' + C + '</b>。' + warn +
      ' 判断技巧：问「几个人去几个岗位」用排列（谁去哪有区别）；问「选几个人出来」用组合（选完就完）。</span>';
  }
  cSlider(s0.ctrl, '总数 n', p.n, 2, 6, 1, function (v) { p.n = v; draw(); });
  cSlider(s0.ctrl, '选几个 r', p.r, 1, 6, 1, function (v) { p.r = v; draw(); });
  draw();
}

/* 杨辉三角：组合数的表格 */
function cpPascalLab(el, cfg) {
  var p = Object.assign({ n: 7, r: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var n = Math.round(p.n), rr = Math.min(Math.round(p.r), n - 1);
    var m = linMap(s0.cv, { xmin: 0, xmax: 1, ymin: 0, ymax: 1 }, 14);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    var ys = Math.min(40, (m.h - 80) / n);
    var y0 = (m.h - (n - 1) * ys) / 2 - 10;
    var cx0 = m.w / 2, dx = 52;
    var i, j;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (i = 0; i < n; i++) {
      var isHi = (i === rr);
      for (j = 0; j <= i; j++) {
        var x = cx0 + (j - i / 2) * dx;
        var y = y0 + i * ys;
        var v = Math.round(cpC(i, j));
        if (isHi) {
          ctx.fillStyle = 'rgba(192,57,43,0.10)';
          ctx.fillRect(x - 22, y - ys / 2, 44, ys);
        }
        ctx.fillStyle = isHi ? '#c0392b' : '#185fa5';
        ctx.font = (isHi ? 'bold ' : '') + '13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(String(v), x, y);
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = FONT;
      ctx.textAlign = 'left';
      ctx.fillText('C(' + i + ',j) 行和 ' + Math.pow(2, i), 14, y0 + i * ys);
      ctx.textAlign = 'center';
    }
    // 行和标注
    var hy = y0 + rr * ys;
    ctx.strokeStyle = 'rgba(192,57,43,0.5)'; ctx.lineWidth = 1.2; ctx.setLineDash([4, 3]);
    ctx.beginPath(); ctx.moveTo(cx0 - (rr / 2 + 1) * dx, hy); ctx.lineTo(cx0 + (rr / 2 + 1) * dx, hy); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#c0392b'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('第 ' + rr + ' 行：C(' + rr + ',0) + \u2026 + C(' + rr + ',' + rr + ') = 2^' + rr + ' = ' + Math.pow(2, rr), cx0, m.h - 16);
    s0.info.innerHTML = '<span class="viz-meta">杨辉三角就是<b>组合数表</b>：第 i 行第 j 个数 = C(i,j)，且每个数 = 肩上两数之和（C(i,j) = C(i\u22121,j\u22121) + C(i\u22121,j)，即「含它的方案 = 含且再选 + 不含它」）。' +
      ' 红色高亮第 <b>' + rr + '</b> 行：行内各数之和恒等于 2^' + rr + ' = <b>' + Math.pow(2, rr) + '</b>——这正是「从 ' + rr + ' 个元素里任意选或不选」的全部分类。' +
      ' 二项式 (a+b)^i 展开系数就是这一行，所以它又叫「二项式系数三角」。</span>';
  }
  cSlider(s0.ctrl, '行数 n', p.n, 3, 9, 1, function (v) { p.n = v; draw(); });
  cSlider(s0.ctrl, '高亮第 r 行', p.r, 0, 8, 1, function (v) { p.r = v; draw(); });
  draw();
}

/* 二项式定理：(a+b)^n 展开，通项高亮 */
function cpBinomialLab(el, cfg) {
  var p = Object.assign({ n: 4, k: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var FONT = '12px "PingFang SC","Microsoft YaHei",sans-serif';
  function draw() {
    var n = Math.round(p.n), kk = Math.min(Math.round(p.k), n);
    var m = linMap(s0.cv, { xmin: 0, xmax: 1, ymin: 0, ymax: 1 }, 14);
    var ctx = m.ctx;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, m.w, m.h);
    // 上：系数柱
    var i, maxC = cpC(n, Math.floor(n / 2));
    var bw = Math.min(56, (m.w - 80) / (n + 1) - 8);
    var baseY = m.h - 90, maxH = m.h - 200;
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    for (i = 0; i <= n; i++) {
      var c = Math.round(cpC(n, i));
      var x = m.w / 2 - ((n + 1) * bw + n * 8) / 2 + i * (bw + 8);
      var hi = (i === kk);
      ctx.fillStyle = hi ? 'rgba(192,57,43,0.8)' : 'rgba(24,95,165,0.6)';
      ctx.fillRect(x, baseY - c / maxC * maxH, bw, c / maxC * maxH);
      ctx.fillStyle = hi ? '#c0392b' : '#6b7a89'; ctx.font = (hi ? 'bold ' : '') + FONT;
      ctx.fillText(String(c), x + bw / 2, baseY - c / maxC * maxH - 16);
      ctx.fillStyle = '#6b7a89';
      ctx.fillText('C(' + n + ',' + i + ')', x + bw / 2, baseY + 6);
    }
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(30, baseY); ctx.lineTo(m.w - 30, baseY); ctx.stroke();
    // 下：展开式逐项排布，第 k 项高亮
    var terms = [];
    for (i = 0; i <= n; i++) {
      var co = Math.round(cpC(n, i));
      var t = (co === 1 ? '' : String(co)) + cpSup(n - i, 'a') + cpSup(i, 'b');
      if (t === '') t = '1';
      terms.push(t);
    }
    ctx.font = '15px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var head = '(' + 'a + b' + ')' + cpSup(n, '');
    ctx.fillStyle = '#333';
    ctx.fillText(head, 30, baseY + 52);
    var tx = 30 + ctx.measureText(head).width + 16;
    ctx.fillStyle = '#6b7a89';
    ctx.fillText('=', tx, baseY + 52);
    tx += ctx.measureText('=').width + 12;
    for (i = 0; i <= n; i++) {
      var w2 = ctx.measureText(terms[i]).width;
      if (i === kk) {
        ctx.fillStyle = 'rgba(192,57,43,0.14)';
        ctx.fillRect(tx - 4, baseY + 40, w2 + 8, 24);
        ctx.fillStyle = '#c0392b';
      } else ctx.fillStyle = '#333';
      ctx.fillText(terms[i], tx, baseY + 52);
      tx += w2;
      if (i < n) {
        ctx.fillStyle = '#6b7a89';
        ctx.fillText(' + ', tx, baseY + 52);
        tx += ctx.measureText(' + ').width;
      }
      if (tx > m.w - 40 && i < n) { tx = 60; baseY += 0; }
    }
    s0.info.innerHTML = '<span class="viz-meta">(a+b)^' + n + ' = \u03a3 C(' + n + ',k) a^(' + n + '\u2212k) b^k，' +
      ' 展开共 n+1 = <b>' + (n + 1) + '</b> 项，系数正是杨辉三角第 ' + n + ' 行。' +
      ' 高亮第 k = ' + kk + ' 项（通项 T(' + (kk + 1) + ') = C(' + n + ',' + kk + ') a^' + (n - kk) + ' b^' + kk + '）：' +
      ' 二项式系数 <b>C(' + n + ',' + kk + ') = ' + Math.round(cpC(n, kk)) + '</b>，k 从 0 数起——<b>第 k+1 项</b>才是 T(k+1)。' +
      ' 求特定字母次数的系数：令指数对上号解出 k，再代回通项。所有系数之和 = 2^' + n + ' = ' + Math.pow(2, n) + '（令 a=b=1）。</span>';
  }
  cSlider(s0.ctrl, '指数 n', p.n, 1, 6, 1, function (v) { p.n = v; draw(); });
  cSlider(s0.ctrl, '高亮第 k 项（通项下标）', p.k, 0, 6, 1, function (v) { p.k = v; draw(); });
  draw();
}
