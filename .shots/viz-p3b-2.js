/* ===== 小学三年级下册：面积 / 年月日 / 小数初步 / 搭配 ===== */

/* 面积：数方格 → 公式 → 单位换算 */
function epAreaLab(el, cfg) {
  var p = Object.assign({ w: 4, h: 3, mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var ww = Math.max(1, Math.min(10, Math.round(p.w)));
  var hh = Math.max(1, Math.min(8, Math.round(p.h)));
  var mode = Math.round(p.mode || 0);
  var FONT = '14px "PingFang SC","Microsoft YaHei",sans-serif';
  function txt(ctx, x, y, t, color, font, align) {
    ctx.fillStyle = color; ctx.font = font || FONT;
    ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(t, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    if (mode === 2) {
      // 单位换算阶梯
      var rows = [
        ['1 平方厘米', '边长 1 厘米的正方形', '指甲盖差不多'],
        ['1 平方分米', '边长 1 分米的正方形 = 100 平方厘米', '手掌摊开'],
        ['1 平方米', '边长 1 米的正方形 = 100 平方分米', '一张课桌面'],
        ['1 公顷', '边长 100 米的正方形 = 10000 平方米', '一个操场'],
        ['1 平方千米', '边长 1 千米 = 100 公顷', '一个村子的地']
      ];
      var y0 = 78;
      txt(ctx, 74, 44, '面积单位：每上一级 ×100（长度是 ×10）', '#c0392b', 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif');
      rows.forEach(function (r, i) {
        var yy = y0 + i * 54;
        ctx.fillStyle = i % 2 ? '#f7fafd' : '#fff';
        ctx.fillRect(70, yy - 20, w - 140, 42);
        ctx.strokeStyle = '#e3eaf2'; ctx.lineWidth = 1; ctx.strokeRect(70, yy - 20, w - 140, 42);
        txt(ctx, 86, yy + 1, r[0], '#185fa5', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif');
        txt(ctx, 226, yy + 1, r[1], '#2c3e50', '13px "PingFang SC","Microsoft YaHei",sans-serif');
        txt(ctx, 470, yy + 1, r[2], '#8a97a4', '12px "PingFang SC","Microsoft YaHei",sans-serif');
      });
      txt(ctx, 74, y0 + 5 * 54 + 6, '反例：1 平方米 ≠ 100 平方厘米（那是 10000）——面积换算两次，长度换算一次。',
        '#c0392b', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">长度相邻单位进率是 <b>10</b>，面积是 <b>10×10=100</b>——因为长和宽各放大一次。这是本单元最容易错的一处。</span>';
      return;
    }
    var cell = Math.min(40, 300 / ww, 210 / hh);
    var gx = 92, gy = 120 + 210 - hh * cell;
    var i, j;
    for (i = 0; i < ww; i++) {
      for (j = 0; j < hh; j++) {
        ctx.fillStyle = (i + j) % 2 ? 'rgba(24,95,165,0.14)' : 'rgba(24,95,165,0.28)';
        ctx.fillRect(gx + i * cell, gy + j * cell, cell, cell);
      }
    }
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.6;
    for (i = 0; i <= ww; i++) {
      ctx.beginPath(); ctx.moveTo(gx + i * cell, gy); ctx.lineTo(gx + i * cell, gy + hh * cell); ctx.stroke();
    }
    for (j = 0; j <= hh; j++) {
      ctx.beginPath(); ctx.moveTo(gx, gy + j * cell); ctx.lineTo(gx + ww * cell, gy + j * cell); ctx.stroke();
    }
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.4;
    ctx.strokeRect(gx, gy, ww * cell, hh * cell);
    // 边长标注
    txt(ctx, gx + ww * cell / 2, gy - 20, ww + ' 厘米', '#185fa5', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    ctx.save(); ctx.translate(gx - 22, gy + hh * cell / 2); ctx.rotate(-Math.PI / 2);
    txt(ctx, 0, 0, hh + ' 厘米', '#185fa5', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    ctx.restore();

    var area = ww * hh;
    var rx = gx + ww * cell + 54, ry = 100;
    if (mode === 0) {
      txt(ctx, rx, ry, '数一数有几个方格', '#c0392b', 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 34, '每格 1 平方厘米，共 ' + area + ' 格', '#2c3e50', '15px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 62, '所以面积 = ' + area + ' 平方厘米', '#0f6e56', 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 100, '面积 = 图形「占了多少地」', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 122, '周长 = 图形「一圈多长」', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 152, '周长 ' + 2 * (ww + hh) + ' 厘米', '#8a5a00', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 174, '两个数完全不同，别混。', '#c0392b', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">面积的本质是「<b>铺满要几个单位正方形</b>」。数格子就是定义，公式只是把数格子算快了。</span>';
    } else {
      txt(ctx, rx, ry, '公式：长 × 宽', '#c0392b', 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 34, ww + ' × ' + hh + ' = ' + area + ' 平方厘米', '#2c3e50', 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 66, '为什么是乘？', '#185fa5', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 88, '每行 ' + ww + ' 格，共 ' + hh + ' 行', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 110, '→ ' + ww + ' × ' + hh + ' = ' + area, '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      if (ww === hh) {
        txt(ctx, rx, ry + 144, '这是正方形：边长 × 边长', '#0f6e56', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif');
        txt(ctx, rx, ry + 166, area + ' = ' + ww + '²', '#0f6e56', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      } else {
        txt(ctx, rx, ry + 144, '长和宽相等时就是正方形。', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
        txt(ctx, rx, ry + 166, '拖成一样长试试。', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      }
      s0.info.innerHTML = '<span class="viz-meta">长方形面积 = 长 × 宽，正方形 = 边长 × 边长。注意<b>单位必须是「平方」</b>：平方厘米、平方分米、平方米。</span>';
    }
  }
  cSlider(s0.ctrl, '长（厘米）', ww, 1, 10, 1, function (v) { ww = Math.round(v); p.w = ww; draw(); });
  cSlider(s0.ctrl, '宽（厘米）', hh, 1, 8, 1, function (v) { hh = Math.round(v); p.h = hh; draw(); });
  cSlider(s0.ctrl, '模式（0 数方格 / 1 公式 / 2 单位换算）', mode, 0, 2, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); });
  draw();
}

/* 年、月、日 */
function epCalLab(el, cfg) {
  var p = Object.assign({ month: 1, leap: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mth = Math.max(1, Math.min(12, Math.round(p.month)));
  var leap = Math.round(p.leap) ? 1 : 0;
  var FONT = '14px "PingFang SC","Microsoft YaHei",sans-serif';
  function daysOf(mo, lp) {
    if (mo === 2) return lp ? 29 : 28;
    return [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mo - 1];
  }
  function txt(ctx, x, y, t, color, font, align) {
    ctx.fillStyle = color; ctx.font = font || FONT;
    ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(t, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    // 4 列 × 3 行月份格
    var x0 = 56, y0 = 84, cw = 96, chh = 74, i;
    txt(ctx, x0, 50, (leap ? '闰年' : '平年') + '：每个月的天数', '#2c3e50', 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif');
    for (i = 1; i <= 12; i++) {
      var ci = (i - 1) % 4, ri = Math.floor((i - 1) / 4);
      var x = x0 + ci * (cw + 8), y = y0 + ri * (chh + 10);
      var on = i === mth;
      var dd = daysOf(i, leap);
      ctx.fillStyle = on ? 'rgba(192,57,43,0.1)' : '#f7fafd';
      ctx.fillRect(x, y, cw, chh);
      ctx.strokeStyle = on ? '#c0392b' : '#e3eaf2'; ctx.lineWidth = on ? 2.2 : 1;
      ctx.strokeRect(x, y, cw, chh);
      txt(ctx, x + cw / 2, y + 22, i + ' 月', on ? '#c0392b' : '#2c3e50',
        'bold 14px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      txt(ctx, x + cw / 2, y + 48, dd + ' 天', on ? '#c0392b' : '#5f5e5a',
        'bold 14px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    }
    // 右侧说明
    var rx = 56 + 4 * (cw + 8) + 34, ry = 92;
    var dd2 = daysOf(mth, leap);
    txt(ctx, rx, ry, mth + ' 月有 ' + dd2 + ' 天', '#c0392b', 'bold 19px "PingFang SC","Microsoft YaHei",sans-serif');
    var kind = mth === 2 ? (leap ? '闰年二月（特殊月）' : '平年二月（特殊月）')
      : (dd2 === 31 ? '大月（31 天）' : '小月（30 天）');
    txt(ctx, rx, ry + 30, kind, '#0f6e56', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 62, '大月：1、3、5、7、8、10、12', '#2c3e50', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 84, '小月：4、6、9、11', '#2c3e50', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 106, '二月：平年 28、闰年 29', '#2c3e50', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 138, '全年天数', '#185fa5', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 160, leap ? '365 + 1 = 366 天' : '31×7 + 30×4 + 28 = 365 天', '#2c3e50', '14px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 192, '判断闰年（整百年除外）', '#185fa5', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 214, '年份 ÷ 4 能整除 → 闰年', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 236, '如 2024 ÷ 4 = 506，闰年', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    s0.info.innerHTML = '<span class="viz-meta">七个大月、四个小月，二月看闰年。<b>24 时计时法</b>和年月日一起考：下午 3 时 = 15 时，跨天要加 24。</span>';
  }
  cSlider(s0.ctrl, '月份', mth, 1, 12, 1, function (v) { mth = Math.round(v); p.month = mth; draw(); });
  cSlider(s0.ctrl, '平年 / 闰年', leap, 0, 1, 1, function (v) { leap = Math.round(v); p.leap = leap; draw(); });
  draw();
}

/* 小数的初步认识 */
function epDecLab(el, cfg) {
  var p = Object.assign({ d: 0.7 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var d = Math.max(0, Math.min(2.9, Math.round((p.d || 0) * 10) / 10));
  var FONT = '14px "PingFang SC","Microsoft YaHei",sans-serif';
  function txt(ctx, x, y, t, color, font, align) {
    ctx.fillStyle = color; ctx.font = font || FONT;
    ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(t, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    // 数轴 0~3
    var ax0 = 72, ax1 = w - 76, ay = 168;
    var px = function (v) { return ax0 + v / 3 * (ax1 - ax0); };
    ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ax0, ay); ctx.lineTo(ax1, ay); ctx.stroke();
    // 箭头
    ctx.beginPath(); ctx.moveTo(ax1, ay); ctx.lineTo(ax1 - 10, ay - 5); ctx.lineTo(ax1 - 10, ay + 5);
    ctx.closePath(); ctx.fillStyle = '#2c3e50'; ctx.fill();
    var i, v, x;
    for (i = 0; i <= 30; i++) {
      v = i / 10; x = px(v);
      var big = i % 10 === 0, mid = i % 5 === 0;
      ctx.beginPath(); ctx.moveTo(x, ay); ctx.lineTo(x, ay + (big ? 11 : mid ? 8 : 5));
      ctx.strokeStyle = big ? '#2c3e50' : '#9aa7b4'; ctx.lineWidth = big ? 2 : 1.2; ctx.stroke();
      if (big) txt(ctx, x, ay + 28, String(v), '#2c3e50', 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      else if (mid) txt(ctx, x, ay + 26, v.toFixed(1), '#8a97a4', '12px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    }
    // 当前点
    var dx = px(d);
    ctx.beginPath(); ctx.arc(dx, ay, 7, 0, Math.PI * 2); ctx.fillStyle = '#c0392b'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
    txt(ctx, dx, ay - 34, d.toFixed(1), '#c0392b', 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    // 0~1 放大说明：10 等份
    var zx0 = ax0, zx1 = px(1), zy = 82;
    txt(ctx, zx0, zy - 24, '把 0 到 1 平均分成 10 份，每份是 0.1', '#185fa5',
      'bold 14px "PingFang SC","Microsoft YaHei",sans-serif');
    for (i = 0; i < 10; i++) {
      var seg = (zx1 - zx0) / 10;
      ctx.fillStyle = i < Math.round(d % 1 * 10) && d < 1 ? 'rgba(192,57,43,0.55)' : 'rgba(24,95,165,0.18)';
      if (d >= 1) ctx.fillStyle = 'rgba(24,95,165,0.18)';
      ctx.fillRect(zx0 + i * seg, zy, seg, 30);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.4; ctx.strokeRect(zx0 + i * seg, zy, seg, 30);
    }
    ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.6; ctx.strokeRect(zx0, zy, zx1 - zx0, 30);

    // 元角分
    var ry = 246;
    txt(ctx, ax0, ry, '用在钱上：', '#2c3e50', 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif');
    var yuan = Math.floor(d), jiao = Math.round((d - yuan) * 10);
    txt(ctx, ax0 + 92, ry, d.toFixed(1) + ' 元 = ' + (yuan ? yuan + ' 元 ' : '') + (jiao ? jiao + ' 角' : '0 角'),
      '#c0392b', 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, ax0, ry + 30, '小数点左边是「元」，右边第一位是「角」；1 角 = 0.1 元 = 10 分。',
      '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    // 分数对应
    txt(ctx, ax0, ry + 66, '和分数是一回事：', '#185fa5', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, ax0 + 136, ry + 66, '0.1 = 1/10　0.3 = 3/10　1.2 = 1 又 2/10',
      '#2c3e50', '14px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, ax0, ry + 98, '比大小：先比整数部分，整数部分相同再比小数部分——0.9 < 1.1，别被「9 比 1 大」骗了。',
      '#c0392b', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    s0.info.innerHTML = '<span class="viz-meta">一位小数就是<b>十分之几</b>。比大小先看整数部分：0.9 元比 1.1 元少——整数不同，后面不用比。</span>';
  }
  cSlider(s0.ctrl, '小数（0 ~ 2.9）', d, 0, 2.9, 0.1, function (v) { d = Math.round(v * 10) / 10; p.d = d; draw(); });
  draw();
}

/* 搭配（二）：连线枚举 / 树状图 */
function epMatchLab(el, cfg) {
  var p = Object.assign({ n: 3, m: 2, mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var n = Math.max(2, Math.min(5, Math.round(p.n)));
  var mm = Math.max(2, Math.min(4, Math.round(p.m)));
  var mode = Math.round(p.mode || 0);
  var FONT = '14px "PingFang SC","Microsoft YaHei",sans-serif';
  function txt(ctx, x, y, t, color, font, align) {
    ctx.fillStyle = color; ctx.font = font || FONT;
    ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(t, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    var total = n * mm;
    var i, j;
    if (mode === 0) {
      // 连线枚举
      var lx = 128, rx2 = 336, top = 96, gapL = Math.min(52, 240 / n), gapR = Math.min(52, 240 / mm);
      txt(ctx, lx, 62, '上衣 ' + n + ' 件', '#185fa5', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      txt(ctx, rx2, 62, '下装 ' + mm + ' 件', '#0f6e56', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      var lyOf = function (k) { return top + k * gapL + 18; };
      var ryOf = function (k) { return top + k * gapR + 18; };
      for (i = 0; i < n; i++) {
        ctx.fillStyle = 'rgba(24,95,165,0.12)'; ctx.fillRect(lx - 46, lyOf(i) - 16, 92, 32);
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.4; ctx.strokeRect(lx - 46, lyOf(i) - 16, 92, 32);
        txt(ctx, lx, lyOf(i), '上衣 ' + (i + 1), '#185fa5', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      }
      for (j = 0; j < mm; j++) {
        ctx.fillStyle = 'rgba(15,110,86,0.12)'; ctx.fillRect(rx2 - 46, ryOf(j) - 16, 92, 32);
        ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.4; ctx.strokeRect(rx2 - 46, ryOf(j) - 16, 92, 32);
        txt(ctx, rx2, ryOf(j), '下装 ' + (j + 1), '#0f6e56', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      }
      for (i = 0; i < n; i++) {
        for (j = 0; j < mm; j++) {
          ctx.beginPath();
          ctx.moveTo(lx + 46, lyOf(i));
          ctx.bezierCurveTo(lx + 110, lyOf(i), rx2 - 110, ryOf(j), rx2 - 46, ryOf(j));
          ctx.strokeStyle = 'rgba(192,57,43,' + (0.28 + 0.12 * ((i + j) % 3)) + ')';
          ctx.lineWidth = 1.6; ctx.stroke();
        }
      }
      txt(ctx, lx + 46, h - 76, '每条线 = 一种搭配', '#c0392b', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, lx + 46, h - 52, '共 ' + n + ' × ' + mm + ' = ' + total + ' 条', '#c0392b',
        'bold 16px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">每件上衣都能配全部 ' + mm + ' 件下装 → <b>' + n + ' × ' + mm + ' = ' + total + ' 种</b>。连线的条数就是答案，不用一个个数。</span>';
    } else {
      // 树状图
      var rootX = 96, rootY = h / 2;
      ctx.fillStyle = 'rgba(192,57,43,0.12)'; ctx.fillRect(rootX - 34, rootY - 16, 68, 32);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.6; ctx.strokeRect(rootX - 34, rootY - 16, 68, 32);
      txt(ctx, rootX, rootY, '选一套', '#c0392b', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      var bx = 268, cx3 = 486;
      var span = Math.min(300, 44 * n);
      var byOf = function (k) { return rootY - span / 2 + (n === 1 ? 0 : k * span / (n - 1)); };
      for (i = 0; i < n; i++) {
        ctx.beginPath(); ctx.moveTo(rootX + 34, rootY); ctx.lineTo(bx - 30, byOf(i));
        ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.4; ctx.stroke();
        ctx.fillStyle = 'rgba(24,95,165,0.12)'; ctx.fillRect(bx - 30, byOf(i) - 13, 62, 26);
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.3; ctx.strokeRect(bx - 30, byOf(i) - 13, 62, 26);
        txt(ctx, bx + 1, byOf(i), '衣' + (i + 1), '#185fa5', 'bold 12px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
        var span2 = Math.min(60, 260 / n);
        for (j = 0; j < mm; j++) {
          var ly2 = byOf(i) - (mm - 1) * span2 / 2 + j * span2;
          ctx.beginPath(); ctx.moveTo(bx + 32, byOf(i)); ctx.lineTo(cx3 - 26, ly2);
          ctx.strokeStyle = 'rgba(15,110,86,0.55)'; ctx.lineWidth = 1.2; ctx.stroke();
          var isLast = (i === n - 1 && j === mm - 1);
          ctx.fillStyle = isLast ? 'rgba(192,57,43,0.16)' : 'rgba(15,110,86,0.1)';
          ctx.fillRect(cx3 - 26, ly2 - 11, 74, 22);
          ctx.strokeStyle = isLast ? '#c0392b' : '#0f6e56'; ctx.lineWidth = 1.2;
          ctx.strokeRect(cx3 - 26, ly2 - 11, 74, 22);
          txt(ctx, cx3 + 11, ly2, '衣' + (i + 1) + '裤' + (j + 1), isLast ? '#c0392b' : '#0f6e56',
            '12px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
        }
      }
      txt(ctx, cx3 - 26, h - 44, '叶子节点 ' + total + ' 个 = 搭配数', '#c0392b',
        'bold 13px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">树状图数得更稳：<b>第一层 ' + n + ' 个分支，每个分支再分 ' + mm + ' 个</b>，叶子总数 ' + total + '。乘法就是「分支层数相乘」。</span>';
    }
  }
  cSlider(s0.ctrl, '上衣件数', n, 2, 5, 1, function (v) { n = Math.round(v); p.n = n; draw(); });
  cSlider(s0.ctrl, '下装件数', mm, 2, 4, 1, function (v) { mm = Math.round(v); p.m = mm; draw(); });
  cSlider(s0.ctrl, '模式（0 连线 / 1 树状图）', mode, 0, 1, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); });
  draw();
}
