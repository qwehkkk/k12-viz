/* ===== 小学三年级上册：时分秒 / 口算 / 测量 / 竖式 / 倍 / 乘法 / 周长 / 分数 ===== */

/* 时钟：时分秒 */
function pmClockLab(el, cfg) {
  var p = Object.assign({ mode: 0, h: 3, m: 15 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), hh = Math.round(p.h), mm = Math.round(p.m);
  var info = s0.info;
  function txt(ctx, x, y, t, color, font) {
    ctx.fillStyle = color; ctx.font = font || '14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(t, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    var cx = Math.min(180, w * 0.29), cy = h * 0.48, R = Math.min(138, h * 0.38);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; ctx.fill(); ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 3; ctx.stroke();
    var i, ang;
    for (i = 0; i < 60; i++) {
      ang = i / 60 * Math.PI * 2 - Math.PI / 2;
      var big = i % 5 === 0;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * (R - (big ? 13 : 7)), cy + Math.sin(ang) * (R - (big ? 13 : 7)));
      ctx.lineTo(cx + Math.cos(ang) * (R - 2), cy + Math.sin(ang) * (R - 2));
      ctx.strokeStyle = big ? '#2c3e50' : '#c2cdd8'; ctx.lineWidth = big ? 2.4 : 1.2; ctx.stroke();
    }
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (i = 1; i <= 12; i++) {
      ang = i / 12 * Math.PI * 2 - Math.PI / 2;
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold ' + Math.round(R * 0.15) + 'px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(String(i), cx + Math.cos(ang) * (R - 26), cy + Math.sin(ang) * (R - 26));
    }
    // 时针
    var hAng = ((hh % 12) + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(hAng) * R * 0.52, cy + Math.sin(hAng) * R * 0.52);
    ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.stroke();
    // 分针
    var mAng = mm / 60 * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(mAng) * R * 0.78, cy + Math.sin(mAng) * R * 0.78);
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 4.5; ctx.stroke();
    // 中心
    ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fillStyle = '#2c3e50'; ctx.fill();
    // 右侧说明
    var x0 = cx + R + 34, y0 = h * 0.2;
    txt(ctx, x0, y0 - 26, '时钟上的两根针', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, x0, y0, '时针：蓝，走 1 大格 = 1 时', '#185fa5');
    txt(ctx, x0, y0 + 26, '分针：红，走 1 小格 = 1 分', '#c0392b');
    txt(ctx, x0, y0 + 58, '写作  ' + hh + ':' + (mm < 10 ? '0' + mm : mm), '#111', 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, x0, y0 + 86, '读作  ' + hh + ' 时 ' + mm + ' 分', '#111', '15px "PingFang SC","Microsoft YaHei",sans-serif');
    var lines = [];
    if (mode === 0) {
      lines = ['1 时 = 60 分，1 分 = 60 秒。', '分针走一圈（60 小格）= 60 分 = 1 时。'];
    } else if (mode === 1) {
      lines = ['时针指在两个数之间时，取小的那个数当时。', '分针从 12 起数大格，每大格 5 分。'];
    } else if (mode === 2) {
      var st = 7 * 60 + 40, ed = hh * 60 + mm;
      var gap = ed - st;
      if (gap < 0) gap += 12 * 60;
      var gh = Math.floor(gap / 60), gm = gap % 60;
      lines = ['开始 7:40 → 结束 ' + (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm),
        '经过 ' + gap + ' 分' + (gh ? '（' + gh + ' 时 ' + gm + ' 分）' : '') + '：先到整点再往后数。'];
    } else {
      lines = ['1 时 30 分 = ' + (hh * 60 + mm) + ' 分 = ' + ((hh * 60 + mm) * 60) + ' 秒',
        '时化分乘 60，分化秒再乘 60。'];
    }
    txt(ctx, x0, y0 + 124, lines[0], '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, x0, y0 + 150, lines[1], '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    info.innerHTML = '<span class="viz-meta">当前 <b>' + hh + ' 时 ' + mm + ' 分</b>。' +
      (mode === 2 ? '经过时间 = 结束时刻 − 开始时刻，跨整点拆成两段。' : '记住：时间单位是 <b>60 进制</b>，不是 10 进制。') + '</span>';
  }
  cSlider(s0.ctrl, '时', hh, 1, 12, 1, function (v) { hh = v; p.h = v; draw(); });
  cSlider(s0.ctrl, '分', mm, 0, 59, 1, function (v) { mm = v; p.m = v; draw(); });
  draw();
}

/* 口算：拆分 / 几百几十 / 估算 */
function pmOralLab(el, cfg) {
  var p = Object.assign({ op: 0, a: 35, b: 28 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var op = Math.round(p.op), A = Math.round(p.a), B = Math.round(p.b);
  var info = s0.info;
  function row(ctx, x, y, label, main, color) {
    ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText(label, x - 14, y);
    ctx.textAlign = 'left';
    ctx.fillStyle = color || '#2c3e50';
    ctx.font = 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(main, x, y);
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    var x0 = Math.min(150, w * 0.24), y = 70, step = 58;
    if (op === 0) {
      var t = Math.floor(B / 10) * 10, o = B % 10;
      var s1 = A + t, res = s1 + o;
      row(ctx, x0, y, '原式', A + ' + ' + B);
      row(ctx, x0, y + step, '① 加整十', A + ' + ' + t + ' = ' + s1, '#185fa5');
      row(ctx, x0, y + step * 2, '② 加个位', s1 + ' + ' + o + ' = ' + res, '#0f6e56');
      row(ctx, x0, y + step * 3, '结果', String(res), '#c0392b');
      // 数轴
      var nx0 = 120, nx1 = w - 60, yy = h - 70;
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(nx0, yy); ctx.lineTo(nx1, yy); ctx.stroke();
      var lo = Math.min(A, res) - 5, hi = Math.max(A, res) + 5;
      var px = function (v) { return nx0 + (v - lo) / (hi - lo) * (nx1 - nx0); };
      [[A, '#2c3e50', 'A'], [s1, '#185fa5', '①' + s1], [res, '#c0392b', String(res)]].forEach(function (it) {
        ctx.beginPath(); ctx.arc(px(it[0]), yy, 5, 0, Math.PI * 2); ctx.fillStyle = it[1]; ctx.fill();
        ctx.fillStyle = it[1]; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText(it[2], px(it[0]), yy + 9);
      });
    } else if (op === 1) {
      var ta = Math.round(A / 10), tb = Math.round(B / 10), tr = ta + tb;
      row(ctx, x0, y, '换成几个十', A + ' = ' + ta + ' 个十，' + B + ' = ' + tb + ' 个十');
      row(ctx, x0, y + step, '按两位数算', ta + ' + ' + tb + ' = ' + tr, '#185fa5');
      row(ctx, x0, y + step * 2, '补回单位', tr + ' 个十 = ' + (tr * 10), '#c0392b');
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText('几百几十的数，只要换成「几个十」，就回到两位数加减法——最后别忘了补 0。', x0, y + step * 3 + 10);
    } else {
      var ra = Math.ceil(A / 10) * 10, rb = Math.ceil(B / 10) * 10;
      var est = ra + rb, act = A + B;
      row(ctx, x0, y, '原式', A + ' + ' + B);
      row(ctx, x0, y + step, '估大', ra + ' + ' + rb + ' = ' + est, '#185fa5');
      row(ctx, x0, y + step * 2, '实际', String(act), '#0f6e56');
      row(ctx, x0, y + step * 3, '误差', Math.abs(est - act) + '（可控范围）', '#8a5a00');
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      ctx.fillText(op === 3 ? '量级不对就是算错了：估算能抓大错，抓不到「差 1」的小错。' : '判断「够不够」时把数往大了估，估大都不够就一定不够。', x0, y + step * 4 + 6);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (op === 0 ? '拆分口算：<b>先加整十、再加个位</b>，比心里竖式稳。'
        : op === 1 ? '几百几十加减，本质是 <b>换单位</b>：380 就是 38 个十。'
          : '估算写 <b>≈</b>；它的作用是判断量级，不是求精确值。') + '</span>';
  }
  cSlider(s0.ctrl, '第一个数', A, 10, 600, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, '第二个数', B, 10, 600, 1, function (v) { B = v; p.b = v; draw(); });
  draw();
}

/* 测量：尺子与单位换算 */
function pmMeasureLab(el, cfg) {
  var p = Object.assign({ unit: 0, mm: 35 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var unit = Math.round(p.unit), L = Math.round(p.mm);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    if (unit === 3 || unit === 4) {
      var km = unit === 3;
      var title = km ? '1 千米 = 1000 米' : '1 吨 = 1000 千克';
      var sub = km ? '米与千米之间是 1000，不是 10' : '克、千克、吨之间都是 1000';
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(title, 60, 70);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(sub, 60, 98);
      var bx = 60, bw = w - 140, by = 150, bh = 46;
      ctx.fillStyle = km ? '#e6f1fb' : '#e1f5ee'; ctx.fillRect(bx, by, bw, bh);
      ctx.strokeStyle = km ? '#185fa5' : '#0f6e56'; ctx.lineWidth = 2; ctx.strokeRect(bx, by, bw, bh);
      ctx.fillStyle = km ? '#185fa5' : '#0f6e56'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.fillText(km ? '1 千米' : '1 吨', bx + bw / 2, by + bh / 2);
      var n = 10, i;
      for (i = 0; i < n; i++) {
        var sx = bx + i * bw / n;
        ctx.beginPath(); ctx.moveTo(sx, by + bh); ctx.lineTo(sx, by + bh + 10);
        ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.fillStyle = '#5f5e5a'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(km ? '每小段 100 米，共 10 段 = 1000 米' : '每小段 100 千克，共 10 段 = 1000 千克', bx + bw / 2, by + bh + 30);
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(L + (km ? ' 米 = ' + (L / 1000) + ' 千米' : ' 千克 = ' + (L / 1000) + ' 吨'), bx + bw / 2, by + bh + 76);
      info.innerHTML = '<span class="viz-meta">' + (km ? '操场一圈 400 米，<b>2 圈半就是 1 千米</b>。' : '三年级同学约 30 千克，<b>30 多人合起来约 1 吨</b>。') + '</span>';
      return;
    }
    // 尺子
    var rx0 = 60, rx1 = w - 60, ry = h * 0.42, perCm = (rx1 - rx0) / 20;
    ctx.fillStyle = '#fdf6e3'; ctx.fillRect(rx0, ry, rx1 - rx0, 54);
    ctx.strokeStyle = '#c9a227'; ctx.lineWidth = 2; ctx.strokeRect(rx0, ry, rx1 - rx0, 54);
    var cm;
    for (cm = 0; cm <= 20; cm++) {
      var x = rx0 + cm * perCm;
      ctx.beginPath(); ctx.moveTo(x, ry); ctx.lineTo(x, ry + (cm % 5 === 0 ? 22 : 14));
      ctx.strokeStyle = '#8a6d1f'; ctx.lineWidth = cm % 5 === 0 ? 2 : 1; ctx.stroke();
      if (cm % 1 === 0) {
        ctx.fillStyle = '#6b5a1f'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'top';
        ctx.fillText(String(cm), x, ry + 26);
      }
    }
    ctx.fillStyle = '#6b5a1f'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    ctx.fillText('厘米', rx1, ry - 12);
    // 物体条
    var bw2 = Math.min(L / 10, 20) * perCm;
    ctx.fillStyle = 'rgba(24,95,165,0.75)';
    ctx.fillRect(rx0, ry - 26, bw2, 20);
    ctx.fillStyle = '#185fa5'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(L + ' 毫米', rx0 + bw2 + 8, ry - 16);
    // 换算
    var cms = Math.floor(L / 10), mms = L % 10;
    var dms = Math.floor(L / 100), cm2 = Math.floor(L / 10) % 10, mm2 = L % 10;
    var s1 = L + ' 毫米 = ' + cms + ' 厘米' + (mms ? ' ' + mms + ' 毫米' : '');
    var s2 = L >= 100 ? L + ' 毫米 = ' + dms + ' 分米 ' + cm2 + ' 厘米 ' + mm2 + ' 毫米' : '1 分米 = 10 厘米 = 100 毫米';
    var s3 = L >= 1000 ? (L / 1000) + ' 米 = ' + L + ' 毫米' : '1 米 = 10 分米 = 100 厘米 = 1000 毫米';
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(s1, 60, h * 0.66);
    ctx.fillStyle = '#5f5e5a'; ctx.font = '14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(s2, 60, h * 0.66 + 32);
    ctx.fillText(s3, 60, h * 0.66 + 60);
    info.innerHTML = '<span class="viz-meta">长度单位是<b>十进制阶梯</b>：毫米 → 厘米 → 分米 → 米；只有 <b>米 → 千米是 1000</b>。</span>';
  }
  cSlider(s0.ctrl, '长度（毫米）', L, 5, 2000, 5, function (v) { L = Math.round(v); draw(); });
  draw();
}

/* 竖式加减：进位与退位 */
function pmVerticalLab(el, cfg) {
  var p = Object.assign({ op: 0, a: 435, b: 287 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var op = Math.round(p.op), A = Math.round(p.a), B = Math.round(p.b);
  var info = s0.info;
  function digits(n) { return String(n).split('').map(Number); }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    var isSub = op === 1 || op === 3;
    if (isSub && A < B) { var t = A; A = B; B = t; }
    var da = digits(A).reverse(), db = digits(B).reverse();
    var len = Math.max(da.length, db.length);
    var res = isSub ? A - B : A + B;
    var dr = digits(res).reverse();
    var cw = 46, gx = 250, y0 = 110, rh = 56;
    var i, x;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    // 列提示
    var names = ['个位', '十位', '百位', '千位'];
    for (i = 0; i < len; i++) {
      ctx.fillStyle = '#9aa7b4'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(names[i] || '', gx + i * cw, y0 - 44);
    }
    function putRow(arr, y, color, size) {
      for (i = 0; i < len; i++) {
        var d = arr[i];
        ctx.fillStyle = color;
        ctx.font = 'bold ' + (size || 26) + 'px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(d == null ? '' : String(d), gx + i * cw, y);
      }
    }
    putRow(da, y0, '#2c3e50');
    // 符号
    ctx.fillStyle = '#c0392b'; ctx.font = 'bold 26px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(isSub ? '−' : '+', gx - cw - 10, y0 + rh);
    putRow(db, y0 + rh, '#2c3e50');
    // 横线
    ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2.4;
    ctx.beginPath(); ctx.moveTo(gx - cw - 30, y0 + rh * 1.5); ctx.lineTo(gx + (len - 0.4) * cw, y0 + rh * 1.5); ctx.stroke();
    var marks = [];
    if (!isSub) {
      var carry = 0;
      var r2 = [];
      for (i = 0; i < len; i++) {
        var s = (da[i] || 0) + (db[i] || 0) + carry;
        r2.push(s % 10);
        if (s >= 10) { marks.push({ i: i, n: Math.floor(s / 10), y: y0 - 22 }); carry = 1; } else carry = 0;
      }
      if (carry) r2.push(carry);
      dr = r2;
      putRow(dr, y0 + rh * 2.1, '#0f6e56', 28);
    } else {
      var bor = 0, r3 = [];
      for (i = 0; i < len; i++) {
        var v = (da[i] || 0) - (db[i] || 0) - bor;
        if (v < 0) { v += 10; bor = 1; marks.push({ i: i, n: '借', y: y0 + rh + 22 }); } else bor = 0;
        r3.push(v);
      }
      dr = r3;
      putRow(dr, y0 + rh * 2.1, '#0f6e56', 28);
    }
    marks.forEach(function (mk) {
      var xx = gx + mk.i * cw - cw * 0.42;
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(String(mk.n), xx, mk.y);
    });
    // 右侧：公式与说明
    var rx = gx + len * cw + 40;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(A + (isSub ? ' − ' : ' + ') + B + ' = ' + res, rx, y0 + 10);
    ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    var tips = isSub
      ? ['不够减时向前一位借 1，', '借来的 1 在这一位算 10；', '借走的位记得减 1。']
      : ['哪一位相加满十，', '就向前一位进 1；', '下一位要加上进上来的数。'];
    tips.forEach(function (t, k) { ctx.fillText(t, rx, y0 + 48 + k * 24); });
    if (op === 2) {
      ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('验算：' + res + (isSub ? ' + ' + B : ' − ' + B) + ' = ' + (isSub ? res + B : res - B), rx, y0 + 140);
      ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(isSub ? '差 + 减数 = 被减数' : '和 − 加数 = 另一个加数', rx, y0 + 164);
    }
    info.innerHTML = '<span class="viz-meta">算 <b>' + A + (isSub ? ' − ' : ' + ') + B + '</b>：红色小字是' +
      (isSub ? '借位' : '进位') + '标记。' +
      (op === 2 ? '验算要<b>换方向</b>算，原式重算一遍抓不到同一个错。' : '竖式三规矩：数位对齐、从个位算起、' + (isSub ? '不够减向前借一。' : '满十进一。')) + '</span>';
  }
  cSlider(s0.ctrl, '第一个数', A, 100, 999, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, '第二个数', B, 10, 999, 1, function (v) { B = v; p.b = v; draw(); });
  draw();
}

/* 倍：两行方块 */
function pmTimesLab(el, cfg) {
  var p = Object.assign({ k: 3, n: 2, mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var k = Math.round(p.k), n = Math.round(p.n), mode = Math.round(p.mode || 0);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    var sz = 24, gap = 6, x0 = 70, y1 = 110, y2 = 190;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#185fa5'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('第一行（标准量 1 倍）：' + n + ' 个', x0, y1 - 30);
    var i, j;
    for (i = 0; i < n; i++) {
      ctx.fillStyle = '#185fa5';
      ctx.fillRect(x0 + i * (sz + gap), y1 - sz / 2, sz, sz);
    }
    ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('第二行：' + k + ' 倍 = ' + (n * k) + ' 个', x0, y2 - 40);
    var perRow = Math.max(n, Math.min(12, Math.floor((w - x0 - 40) / (sz + gap))));
    for (i = 0; i < k; i++) {
      for (j = 0; j < n; j++) {
        var idx = i * n + j;
        var col = Math.floor(idx / perRow), row = idx % perRow;
        var bx = x0 + row * (sz + gap), by = y2 - sz / 2 + col * (sz + gap);
        ctx.fillStyle = 'rgba(15,110,86,0.8)';
        ctx.fillRect(bx, by, sz, sz);
      }
    }
    // 分组括号
    ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 1.6;
    for (i = 0; i < k; i++) {
      var start = i * n;
      var col0 = Math.floor(start / perRow), row0 = start % perRow;
      if (row0 + n > perRow) continue;
      var bx0 = x0 + row0 * (sz + gap), by0 = y2 - sz / 2 + col0 * (sz + gap) + sz + 4;
      ctx.beginPath(); ctx.moveTo(bx0, by0); ctx.lineTo(bx0 + n * (sz + gap) - gap, by0); ctx.stroke();
      ctx.fillStyle = '#8a5a00'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      ctx.fillText((i + 1) + ' 倍', bx0 + (n * (sz + gap) - gap) / 2, by0 + 3);
    }
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var ly = h - 96;
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(n + ' × ' + k + ' = ' + (n * k) + '（' + n + ' 的 ' + k + ' 倍是 ' + (n * k) + '）', 70, ly);
    ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    if (mode === 1) {
      ctx.fillText('对比：' + n + ' 多 ' + k + ' 是 ' + (n + k) + '；' + n + ' 的 ' + k + ' 倍是 ' + (n * k) + '——一个加、一个乘。', 70, ly + 30);
    } else {
      ctx.fillText('求「几倍是多少」用乘法；反求「是几倍」用除法：' + (n * k) + ' ÷ ' + n + ' = ' + k + '。', 70, ly + 30);
    }
    info.innerHTML = '<span class="viz-meta">倍是<b>两个量的关系</b>：第二行有几份第一行，就是几倍；倍<b>不带单位</b>。</span>';
  }
  cSlider(s0.ctrl, '第一行几个', n, 1, 8, 1, function (v) { n = Math.round(v); p.n = n; draw(); });
  cSlider(s0.ctrl, '几倍', k, 1, 6, 1, function (v) { k = Math.round(v); p.k = k; draw(); });
  draw();
}

/* 多位数乘一位数：面积模型 */
function pmMultLab(el, cfg) {
  var p = Object.assign({ a: 23, b: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var A = Math.round(p.a), B = Math.round(p.b);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    var h100 = Math.floor(A / 100), t10 = Math.floor(A / 10) % 10, one = A % 10;
    var parts = [];
    if (h100) parts.push({ w: h100 * 100, label: h100 * 100, color: 'rgba(125,60,152,0.65)' });
    if (t10) parts.push({ w: t10 * 10, label: t10 * 10, color: 'rgba(24,95,165,0.65)' });
    if (one) parts.push({ w: one, label: one, color: 'rgba(15,110,86,0.65)' });
    var boxX = 70, boxY = 90, boxW = w - 200, boxH = Math.min(180, h * 0.45);
    var sc = boxW / A;
    var x = boxX;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    parts.forEach(function (pt2) {
      var bw = pt2.w * sc;
      ctx.fillStyle = pt2.color; ctx.fillRect(x, boxY, bw, boxH);
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(x, boxY, bw, boxH);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      if (bw > 34) ctx.fillText(pt2.label + ' × ' + B, x + bw / 2, boxY + boxH / 2);
      x += bw;
    });
    // 标注
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText(A + '（宽）', boxX + boxW / 2, boxY - 8);
    ctx.save();
    ctx.translate(boxX - 22, boxY + boxH / 2); ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = 'middle';
    ctx.fillText(B + '（高）', 0, 0);
    ctx.restore();
    // 算式
    var terms = parts.map(function (pt2) { return pt2.label + ' × ' + B + ' = ' + (pt2.label * B); });
    var ly = Math.max(boxY + boxH + 46, h - 130);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(A + ' × ' + B + ' = ' + (A * B), 70, ly);
    ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('拆开算：' + terms.join('　＋　'), 70, ly + 28);
    ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('= ' + parts.map(function (q) { return q.label * B; }).join(' + ') + ' = ' + (A * B), 70, ly + 54);
    info.innerHTML = '<span class="viz-meta">面积模型：把 ' + A + ' 拆成整百 + 整十 + 个位，各乘一次再相加；竖式就是它的竖排写法。</span>';
  }
  cSlider(s0.ctrl, '被乘数', A, 2, 300, 1, function (v) { A = Math.round(v); p.a = A; draw(); });
  cSlider(s0.ctrl, '一位数', B, 2, 9, 1, function (v) { B = Math.round(v); p.b = B; draw(); });
  draw();
}

/* 长方形与正方形：周长 */
function pmRectLab(el, cfg) {
  var p = Object.assign({ a: 5, b: 3, mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var A = Math.round(p.a), B = Math.round(p.b), mode = Math.round(p.mode || 0);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    var maxW = w - 260, maxH = h * 0.55;
    var sc = Math.min(maxW / A, maxH / B);
    var bw = A * sc, bh = B * sc;
    var bx = 70, by = (h * 0.5) - bh / 2;
    ctx.fillStyle = 'rgba(24,95,165,0.10)';
    ctx.fillRect(bx, by, bw, bh);
    // 边
    var fence = { top: 1, bottom: 1, left: 1, right: 1 };
    if (mode === 3) fence = { top: 0, bottom: 1, left: 1, right: 1 };
    ctx.lineWidth = mode === 1 || mode === 3 ? 6 : 2.4;
    ctx.strokeStyle = mode === 3 ? '#8a5a00' : '#185fa5';
    if (fence.top) { ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by); ctx.stroke(); }
    if (fence.bottom) { ctx.beginPath(); ctx.moveTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.stroke(); }
    if (fence.left) { ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.stroke(); }
    if (fence.right) { ctx.beginPath(); ctx.moveTo(bx + bw, by); ctx.lineTo(bx + bw, by + bh); ctx.stroke(); }
    if (mode === 3) {
      ctx.setLineDash([8, 6]);
      ctx.lineWidth = 3; ctx.strokeStyle = '#c0392b';
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + bw, by); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#c0392b'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText('墙（不用篱笆）', bx + bw / 2, by - 8);
    }
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'top';
    ctx.fillText('长 ' + A, bx + bw / 2, by + bh + 8);
    ctx.textBaseline = 'bottom';
    ctx.fillText('长 ' + A, bx + bw / 2, by - 6);
    ctx.save();
    ctx.translate(bx - 18, by + bh / 2); ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = 'middle';
    ctx.fillText('宽 ' + B, 0, 0);
    ctx.restore();
    ctx.save();
    ctx.translate(bx + bw + 20, by + bh / 2); ctx.rotate(-Math.PI / 2);
    ctx.textBaseline = 'middle';
    ctx.fillText('宽 ' + B, 0, 0);
    ctx.restore();
    // 右侧公式
    var rx = bx + bw + 56;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var perim = (A + B) * 2;
    var lines = [];
    if (mode === 0) {
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(A === B ? '四边相等 → 正方形' : '对边相等 → 长方形', rx, 130);
      ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      lines = ['四个角都是直角；', '长边两条相等，短边两条相等。', A === B ? '长 = 宽 时，长方形就是正方形。' : '把宽拖到和长一样，就成正方形。'];
    } else if (mode === 1) {
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('周长 = 绕一圈', rx, 130);
      ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      lines = [A + ' + ' + B + ' + ' + A + ' + ' + B + ' = ' + perim, '四条边加起来就是周长，', '它是长度（厘米/米），不是面积。'];
    } else if (mode === 2) {
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('（长 + 宽）× 2', rx, 130);
      ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('(' + A + ' + ' + B + ') × 2 = ' + perim, rx, 162);
      ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      lines = ['长方形周长 = (长 + 宽) × 2', '正方形周长 = 边长 × 4', '反求：周长 ÷ 2 − 长 = 宽'];
    } else {
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('三面篱笆', rx, 130);
      ctx.fillStyle = '#8a5a00'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(A + ' + ' + B + ' + ' + B + ' = ' + (A + 2 * B), rx, 162);
      ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      lines = ['靠墙那一边不算篱笆。', '让最长的边靠墙最省材料。', '完整周长 ' + perim + '，省掉靠墙的 ' + A + '。'];
    }
    lines.forEach(function (t, k) {
      ctx.fillText(t, rx, 200 + k * 26);
    });
    info.innerHTML = '<span class="viz-meta">' + (mode === 3
      ? '靠墙围：<b>先数要算几条边</b>，别把整圈周长直接搬过来。'
      : '周长是<b>绕一圈的长度</b>：长方形 (长 + 宽) × 2，正方形 边长 × 4。') + '</span>';
  }
  cSlider(s0.ctrl, '长', A, 1, 10, 1, function (v) { A = Math.round(v); p.a = A; draw(); });
  cSlider(s0.ctrl, '宽', B, 1, 10, 1, function (v) { B = Math.round(v); p.b = B; draw(); });
  draw();
}

/* 分数的初步认识 */
function pmFracLab(el, cfg) {
  var p = Object.assign({ n: 4, m: 1, mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var n = Math.round(p.n), mm = Math.round(p.m), mode = Math.round(p.mode || 0);
  var info = s0.info;
  function bar(ctx, x, y, bw, bh, parts, filled, color) {
    var i, pw = bw / parts;
    for (i = 0; i < parts; i++) {
      ctx.fillStyle = i < filled ? color : '#fff';
      ctx.fillRect(x + i * pw, y, pw, bh);
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.4;
      ctx.strokeRect(x + i * pw, y, pw, bh);
    }
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    if (mode === 2) {
      var x = 70, bw = w - 220, bh = 52;
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(mm + '/' + n, x, 62);
      bar(ctx, x, 80, bw, bh, n, mm, 'rgba(24,95,165,0.6)');
      ctx.fillStyle = '#0f6e56'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText((mm - 1) + '/' + n, x, 186);
      bar(ctx, x, 204, bw, bh, n, Math.max(0, mm - 1), 'rgba(15,110,86,0.6)');
      var cmp = mm > mm - 1 ? '>' : (mm === mm - 1 ? '=' : '<');
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('同分母：' + mm + '/' + n + ' ' + cmp + ' ' + (mm - 1) + '/' + n, x, 292);
      ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('分母相同，每份一样大，分子大的份数多。同分子则反过来：分母大反而小。', x, 322);
      info.innerHTML = '<span class="viz-meta">比较分数最稳：<b>画两条一样长的条</b>，看谁涂得长。</span>';
      return;
    }
    var bx = 70, bw2 = w - 220, bh2 = 64, by = 96;
    var filled = Math.min(mm, n);
    ctx.fillStyle = '#185fa5'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('平均分成 ' + n + ' 份，涂 ' + filled + ' 份', bx, by - 28);
    bar(ctx, bx, by, bw2, bh2, n, filled, 'rgba(24,95,165,0.6)');
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#c0392b'; ctx.font = 'bold 26px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(filled + '/' + n, bx + bw2 + 70, by + bh2 / 2 + 4);
    ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bx + bw2 + 34, by + bh2 / 2 + 4); ctx.lineTo(bx + bw2 + 106, by + bh2 / 2 + 4); ctx.stroke();
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('分子 ' + filled + '：取的份数', bx + bw2 + 120, by + bh2 / 2 - 14);
    ctx.fillText('分母 ' + n + '：平均分的份数', bx + bw2 + 120, by + bh2 / 2 + 14);
    var ly = by + bh2 + 60;
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
    if (mode === 3) {
      var second = Math.min(n - filled, 3);
      ctx.fillText(filled + '/' + n + ' + ' + second + '/' + n + ' = ' + (filled + second) + '/' + n, bx, ly);
      ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('分母不变（每份大小没变），只有分子相加——绝不是 ' + (filled + second) + '/' + (n * 2) + '。', bx, ly + 30);
      ctx.fillText('1 减去分数时，把 1 写成 ' + n + '/' + n 再减。', bx, ly + 56);
    } else {
      ctx.fillText(filled + '/' + n + ' 表示 ' + filled + ' 个 1/' + n, bx, ly);
      ctx.fillStyle = '#5f5e5a'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('1/' + n + ' 是把整体平均分成 ' + n + ' 份取 1 份；分的份数越多，每份越小。', bx, ly + 30);
      ctx.fillText('前提是<b>平均分</b>：份大小不一样，就不能用分数表示。'.replace(/<[^>]+>/g, ''), bx, ly + 56);
    }
    info.innerHTML = '<span class="viz-meta">分子是<b>取的份数</b>，分母是<b>平均分的份数</b>；分得不平均就不是分数。</span>';
  }
  cSlider(s0.ctrl, '平均分成几份', n, 2, 10, 1, function (v) { n = Math.round(v); if (mm > n) mm = n; p.n = n; draw(); });
  cSlider(s0.ctrl, '涂几份', mm, 1, 10, 1, function (v) { mm = Math.min(Math.round(v), n); p.m = mm; draw(); });
  draw();
}
