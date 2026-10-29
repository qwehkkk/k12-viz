/* ===== 小学三年级下册：位置与方向 / 除法 / 复式统计 / 两位数乘两位数 ===== */

/* 位置与方向（一）：八方位 */
function epDirLab(el, cfg) {
  var p = Object.assign({ dir: 1, mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var D = [['北', 0], ['东北', 45], ['东', 90], ['东南', 135], ['南', 180], ['西南', 225], ['西', 270], ['西北', 315]];
  var dir = Math.max(0, Math.min(7, Math.round(p.dir)));
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
    var cx = 178, cy = h / 2 + 6, R = 128;
    // 底盘
    ctx.beginPath(); ctx.arc(cx, cy, R + 16, 0, Math.PI * 2);
    ctx.fillStyle = '#f5f8fb'; ctx.fill();
    ctx.strokeStyle = '#dde5ee'; ctx.lineWidth = 1.4; ctx.stroke();
    // 八条射线
    var i, ang, ex, ey, main;
    for (i = 0; i < 8; i++) {
      ang = (D[i][1] - 90) * Math.PI / 180;
      main = i % 2 === 0;
      var on = (mode === 0 && i === dir) || (mode === 1 && (i === dir || i === (dir + 4) % 8));
      ex = cx + Math.cos(ang) * R; ey = cy + Math.sin(ang) * R;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(ex, ey);
      ctx.strokeStyle = on ? '#c0392b' : (main ? '#9aa7b4' : '#d7e0e9');
      ctx.lineWidth = on ? 3.4 : (main ? 2 : 1.4);
      if (!main) ctx.setLineDash([5, 5]); else ctx.setLineDash([]);
      ctx.stroke(); ctx.setLineDash([]);
      // 端点标签
      var lx = cx + Math.cos(ang) * (R + 26), ly = cy + Math.sin(ang) * (R + 26);
      txt(ctx, lx, ly, D[i][0], on ? '#c0392b' : (main ? '#2c3e50' : '#8a97a4'),
        (on ? 'bold ' : '') + (main ? '16px' : '13px') + ' "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    }
    // 箭头
    ang = (D[dir][1] - 90) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * R, cy + Math.sin(ang) * R);
    ctx.lineTo(cx + Math.cos(ang) * (R - 14) - Math.sin(ang) * 7, cy + Math.sin(ang) * (R - 14) + Math.cos(ang) * 7);
    ctx.lineTo(cx + Math.cos(ang) * (R - 14) + Math.sin(ang) * 7, cy + Math.sin(ang) * (R - 14) - Math.cos(ang) * 7);
    ctx.closePath(); ctx.fillStyle = '#c0392b'; ctx.fill();
    // 中心
    ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fillStyle = '#2c3e50'; ctx.fill();
    txt(ctx, cx, cy + 24, '学校', '#2c3e50', '12px "PingFang SC","Microsoft YaHei",sans-serif', 'center');

    // 右侧说明
    var x0 = cx + R + 66, y0 = 74;
    if (mode === 0) {
      txt(ctx, x0, y0, '现在是「' + D[dir][0] + '」', '#c0392b', 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 32, '与正北方向夹角 ' + D[dir][1] + '°', '#2c3e50', '15px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 62, '口诀：上北、下南、左西、右东', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 88, '东南西北之间再平分，就是东北、东南、', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 110, '西南、西北——一共八个方向。', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 148, '说方向要先定「观测点」', '#185fa5', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 172, '「学校在公园的东北面」和', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 194, '「公园在学校的西南面」是同一件事。', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 216, '观测点换了，方向就要反过来。', '#c0392b', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">八个方向：东、南、西、北 + 东南、西南、东北、西北。<b>方向是相对的</b>——换个观测点就反过来。</span>';
    } else {
      txt(ctx, x0, y0, '相对的两个方向', '#c0392b', 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 34, D[dir][0] + '  ↔  ' + D[(dir + 4) % 8][0], '#2c3e50', 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 68, '两队正好差 180°。', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 96, '北 ↔ 南　东 ↔ 西', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 118, '东北 ↔ 西南　东南 ↔ 西北', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 156, '路线题常见问法', '#185fa5', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 180, '从 A 向' + D[dir][0] + '走 300 米到 B，', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 202, '那么从 B 向' + D[(dir + 4) % 8][0] + '走 300 米回 A。', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, y0 + 224, '距离不变，方向正好相反。', '#c0392b', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">往返路线：<b>方向相反、距离相同</b>。题目爱考「返回时往哪个方向走」。</span>';
    }
  }
  cSlider(s0.ctrl, '方向', dir, 0, 7, 1, function (v) { dir = Math.round(v); p.dir = dir; draw(); });
  cSlider(s0.ctrl, '模式（0 认方向 / 1 相对方向）', mode, 0, 1, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); });
  draw();
}

/* 除数是一位数的除法：逐位表 */
function epDivLab(el, cfg) {
  var p = Object.assign({ a: 96, b: 3, step: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var a = Math.max(10, Math.min(999, Math.round(p.a)));
  var b = Math.max(2, Math.min(9, Math.round(p.b)));
  var FONT = '14px "PingFang SC","Microsoft YaHei",sans-serif';
  function txt(ctx, x, y, t, color, font, align) {
    ctx.fillStyle = color; ctx.font = font || FONT;
    ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
    ctx.fillText(t, x, y);
  }
  function digits(n) { return String(n).split('').map(function (c) { return +c; }); }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    var ds = digits(a), nd = ds.length;
    var names = nd === 3 ? ['百位', '十位', '个位'] : nd === 2 ? ['十位', '个位'] : ['个位'];
    var qs = [], rems = [], rem = 0, i;
    for (i = 0; i < nd; i++) {
      var cur = rem * 10 + ds[i];
      qs.push(Math.floor(cur / b));
      rem = cur % b;
      rems.push(rem);
    }
    var step = Math.max(0, Math.min(nd, Math.round(p.step)));

    // 表格：列宽
    var x0 = 118, cw = Math.min(94, (w - 300) / nd), y0 = 92, rh = 52;
    var cols = [''];
    for (i = 0; i < nd; i++) cols.push(names[i]);
    // 表头
    for (i = 0; i < nd; i++) {
      txt(ctx, x0 + i * cw + cw / 2, y0 - 24, names[i], '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    }
    // 行：被除数位
    txt(ctx, x0 - 24, y0 + rh * 0.5, '被除数', '#2c3e50', '13px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
    for (i = 0; i < nd; i++) {
      var onA = (i === step - 1) || (step >= nd && i === nd - 1);
      ctx.strokeStyle = '#dde5ee'; ctx.lineWidth = 1;
      ctx.strokeRect(x0 + i * cw, y0, cw, rh);
      if (onA && step > 0) { ctx.fillStyle = 'rgba(24,95,165,0.08)'; ctx.fillRect(x0 + i * cw, y0, cw, rh); }
      txt(ctx, x0 + i * cw + cw / 2, y0 + rh / 2, String(ds[i]), '#2c3e50',
        'bold 24px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    }
    // 行：商
    var y1 = y0 + rh + 14;
    txt(ctx, x0 - 24, y1 + rh * 0.5, '商', '#c0392b', '13px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
    for (i = 0; i < nd; i++) {
      ctx.strokeStyle = '#dde5ee'; ctx.lineWidth = 1;
      ctx.strokeRect(x0 + i * cw, y1, cw, rh);
      if (i < step) {
        txt(ctx, x0 + i * cw + cw / 2, y1 + rh / 2, String(qs[i]), '#c0392b',
          'bold 24px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      } else {
        txt(ctx, x0 + i * cw + cw / 2, y1 + rh / 2, '?', '#c2cdd8',
          'bold 22px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      }
    }
    // 行：余数
    var y2 = y1 + rh + 14;
    txt(ctx, x0 - 24, y2 + rh * 0.5, '余数', '#0f6e56', '13px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
    for (i = 0; i < nd; i++) {
      ctx.strokeStyle = '#dde5ee'; ctx.lineWidth = 1;
      ctx.strokeRect(x0 + i * cw, y2, cw, rh);
      if (i < step) {
        txt(ctx, x0 + i * cw + cw / 2, y2 + rh / 2, String(rems[i]), '#0f6e56',
          'bold 20px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      }
    }

    // 右侧：当前步文字
    var rx = x0 + nd * cw + 46, ry = 88;
    var q = qs.slice(0, step).join('') || '—';
    var lastR = step > 0 ? rems[step - 1] : 0;
    txt(ctx, rx, ry, a + ' ÷ ' + b, '#2c3e50', 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif');
    if (step === 0) {
      txt(ctx, rx, ry + 34, '从最高位开始除', '#5f5e5a', '14px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 58, '每一位「先看够不够除」', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 80, '不够就把这一位和下一位合起来。', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    } else {
      var curD = step === 1 ? ds[0] : rems[step - 2] * 10 + ds[step - 1];
      txt(ctx, rx, ry + 34, '第 ' + step + ' 步：' + curD + ' ÷ ' + b + ' = ' + qs[step - 1] + ' … ' + rems[step - 1],
        '#185fa5', 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 62, '上一步余 ' + (step === 1 ? 0 : rems[step - 2]) + '，落下来一位组成 ' + curD,
        '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 84, '余数 ' + rems[step - 1] + ' 必须比除数 ' + b + ' 小', '#0f6e56', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    }
    var done = step >= nd;
    txt(ctx, rx, ry + 124, done ? (a + ' ÷ ' + b + ' = ' + q + (lastR ? ' … ' + lastR : '')) : '结果：' + q + '…',
      '#c0392b', 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 158, '验算：' + b + ' × ' + (q === '—' ? '?' : q) + (done && lastR ? ' + ' + lastR : '') + ' = ' + a,
      '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 196, '高位除起、逐位下落', '#185fa5', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 218, '商写在上、积减在下', '#185fa5', '13px "PingFang SC","Microsoft YaHei",sans-serif');
    txt(ctx, rx, ry + 240, '余数永远小于除数', '#0f6e56', '13px "PingFang SC","Microsoft YaHei",sans-serif');

    s0.info.innerHTML = '<span class="viz-meta">' + (lastR
      ? '余数 <b>' + lastR + '</b> 不能再分了——它比除数 ' + b + ' 小。答案写成「' + q + ' 余 ' + lastR + '」。'
      : '正好除尽，余数 0。验算用 <b>商 × 除数 = 被除数</b>。')
      + ' 有 0 的地方要小心：中间某位不够除，商就写 <b>0 占位</b>，不能空着。</span>';
  }
  cSlider(s0.ctrl, '被除数', a, 10, 999, 1, function (v) { a = Math.round(v); p.a = a; p.step = String(a).length; draw(); });
  cSlider(s0.ctrl, '除数', b, 2, 9, 1, function (v) { b = Math.round(v); p.b = b; draw(); });
  cSlider(s0.ctrl, '演示到第几位', p.step, 0, 3, 1, function (v) { p.step = Math.round(v); draw(); });
  draw();
}

/* 复式统计表 */
function epTableLab(el, cfg) {
  var p = Object.assign({ mode: 0, hi: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode || 0);
  var hi = Math.round(p.hi || 0);
  var ITEMS = ['跳绳', '踢毽', '乒乓球', '跳皮筋'];
  var BOY = [8, 6, 10, 4], GIRL = [10, 8, 4, 8];
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
    var x0 = 132, y0 = 86, cw = 92, rh = 46;
    var rows = mode === 0 ? [['男生', BOY]] : [['男生', BOY], ['女生', GIRL]];
    // 标题
    txt(ctx, x0, 52, '三（1）班同学最喜欢的课外活动（人）', '#2c3e50',
      'bold 16px "PingFang SC","Microsoft YaHei",sans-serif');
    // 表头
    ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.2;
    ctx.strokeRect(x0, y0, cw, rh);
    txt(ctx, x0 + cw / 2, y0 + rh / 2, mode === 0 ? '男生' : '性别 \\ 项目', '#5f5e5a',
      'bold 13px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    var i, j;
    for (j = 0; j < ITEMS.length; j++) {
      ctx.strokeRect(x0 + cw * (j + 1), y0, cw, rh);
      ctx.fillStyle = '#eef4fa'; ctx.fillRect(x0 + cw * (j + 1), y0, cw, rh);
      ctx.strokeRect(x0 + cw * (j + 1), y0, cw, rh);
      txt(ctx, x0 + cw * (j + 1) + cw / 2, y0 + rh / 2, ITEMS[j], '#185fa5',
        'bold 14px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
    }
    // 数据行
    for (i = 0; i < rows.length; i++) {
      var yy = y0 + rh * (i + 1);
      ctx.strokeRect(x0, yy, cw, rh);
      txt(ctx, x0 + cw / 2, yy + rh / 2, rows[i][0], '#2c3e50',
        'bold 14px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      for (j = 0; j < ITEMS.length; j++) {
        ctx.strokeRect(x0 + cw * (j + 1), yy, cw, rh);
        var on = (j === hi);
        if (on) { ctx.fillStyle = 'rgba(192,57,43,0.1)'; ctx.fillRect(x0 + cw * (j + 1), yy, cw, rh); }
        txt(ctx, x0 + cw * (j + 1) + cw / 2, yy + rh / 2, String(rows[i][1][j]),
          on ? '#c0392b' : '#2c3e50', 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      }
    }
    // 对比区
    var by = y0 + rh * (rows.length + 1) + 34;
    if (mode === 0) {
      txt(ctx, x0, by, '单式统计表：只装一组数据。', '#5f5e5a', '14px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, by + 28, '想看「男生和女生喜欢的一样吗」——得再列一张表，', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, by + 50, '两张表放一起才好比。切到模式 1 试试复式表。', '#c0392b', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">单式统计表一次只放一组数据。要比较两组，就得<b>合并成一张复式统计表</b>——项目共用一列，性别各占一行。</span>';
    } else {
      // 横向对比条
      var cx0 = x0 + cw, bwMax = cw * ITEMS.length - 16;
      txt(ctx, x0, by - 12, '两组差多少（红=男 蓝=女）', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      for (j = 0; j < ITEMS.length; j++) {
        var bh = 12, yy2 = by + 12 + j * 26, bx = x0 + 8;
        var wb = BOY[j] / 12 * (bwMax * 0.62), wg = GIRL[j] / 12 * (bwMax * 0.62);
        ctx.fillStyle = 'rgba(192,57,43,0.7)'; ctx.fillRect(bx, yy2, wb, bh);
        ctx.fillStyle = 'rgba(24,95,165,0.7)'; ctx.fillRect(bx, yy2 + bh + 2, wg, bh);
        txt(ctx, bx + Math.max(wb, wg) + 8, yy2 + bh, ITEMS[j] + ' ' + (BOY[j] - GIRL[j] > 0 ? '男多 ' + (BOY[j] - GIRL[j]) : (BOY[j] - GIRL[j] < 0 ? '女多 ' + (GIRL[j] - BOY[j]) : '一样多')),
          '#5f5e5a', '12px "PingFang SC","Microsoft YaHei",sans-serif');
      }
      txt(ctx, x0, by + 132, '复式统计表：项目列共用，性别加一行。', '#0f6e56',
        'bold 13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, x0, by + 154, '合计行不是必填，但加了能算总数、算平均。', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">复式统计表的规矩：<b>表头要同时说清「按什么分」和「分几类」</b>（这里是「性别 \\ 项目」）。同一列上下可直接比。</span>';
    }
  }
  cSlider(s0.ctrl, '模式（0 单式 / 1 复式）', mode, 0, 1, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); });
  cSlider(s0.ctrl, '高亮项目', hi, 0, 3, 1, function (v) { hi = Math.round(v); p.hi = hi; draw(); });
  draw();
}

/* 两位数乘两位数：面积模型 + 竖式两步 */
function epMulLab(el, cfg) {
  var p = Object.assign({ a: 14, b: 12, mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var a = Math.max(11, Math.min(99, Math.round(p.a)));
  var b = Math.max(11, Math.min(99, Math.round(p.b)));
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
    var a1 = Math.floor(a / 10), a0 = a % 10, b1 = Math.floor(b / 10), b0 = b % 10;
    var c1 = a1 * b1 * 100, c2 = a1 * b0 * 10, c3 = a0 * b1 * 10, c4 = a0 * b0;
    var total = a * b;
    if (mode === 0) {
      // 面积模型
      var PX = 300 / a, PY = 230 / b;
      var bx = 96, by = 96 + 230;
      function rect4(cx, cy, ww, hh, col, lab, val) {
        ctx.fillStyle = col; ctx.fillRect(cx, cy, ww, hh);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.strokeRect(cx, cy, ww, hh);
        if (ww > 42 && hh > 26) {
          txt(ctx, cx + ww / 2, cy + hh / 2 - 8, lab, '#fff', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
          txt(ctx, cx + ww / 2, cy + hh / 2 + 12, String(val), '#fff', 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
        }
      }
      // 左上 (十位×十位)
      rect4(bx, by - b0 * PY - b1 * 10 * PY, a1 * 10 * PX, b1 * 10 * PY, 'rgba(24,95,165,0.75)', a1 * 10 + '×' + b1 * 10, c1);
      // 左下 (十位×个位)
      rect4(bx, by - b0 * PY, a1 * 10 * PX, b0 * PY, 'rgba(15,110,86,0.7)', a1 * 10 + '×' + b0, c2);
      // 右上 (个位×十位)
      rect4(bx + a1 * 10 * PX, by - b0 * PY - b1 * 10 * PY, a0 * PX, b1 * 10 * PY, 'rgba(138,90,0,0.7)', a0 + '×' + b1 * 10, c3);
      // 右下 (个位×个位)
      rect4(bx + a1 * 10 * PX, by - b0 * PY, a0 * PX, b0 * PY, 'rgba(192,57,43,0.7)', a0 + '×' + b0, c4);
      // 尺寸标注
      txt(ctx, bx + a1 * 10 * PX / 2, by + 18, a1 * 10, '#185fa5', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      txt(ctx, bx + a1 * 10 * PX + a0 * PX / 2, by + 18, String(a0), '#c0392b', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif', 'center');
      txt(ctx, bx - 16, by - b0 * PY / 2, String(b0), '#c0392b', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
      txt(ctx, bx - 16, by - b0 * PY - b1 * 10 * PY / 2, String(b1 * 10), '#185fa5', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
      txt(ctx, bx - 16, by + 2, '宽 ' + a, '#5f5e5a', '12px "PingFang SC","Microsoft YaHei",sans-serif', 'right');

      // 右侧算式
      var rx = bx + a * PX + 46, ry = 96;
      txt(ctx, rx, ry, a + ' × ' + b + ' = ' + total, '#c0392b', 'bold 19px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 34, '拆成四块，再相加：', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 60, c1 + ' + ' + c2, '#2c3e50', '14px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 82, '+ ' + c3 + ' + ' + c4 + ' = ' + total, '#2c3e50', '14px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 116, '竖式其实就是这张图：', '#185fa5', 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 140, '第二行左移一位，', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, rx, ry + 162, '是因为那一行算的是「几个十」。', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">两位数乘两位数 = <b>四个小矩形拼成一个大矩形</b>。竖式里第二行要左移一位，就是因为它在算「多少乘多少个十」。</span>';
    } else {
      // 竖式两步
      var mx = w * 0.5 - 40, my = 66;
      txt(ctx, mx, my, String(a), '#2c3e50', 'bold 26px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
      txt(ctx, mx + 52, my, '× ' + b, '#2c3e50', 'bold 26px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(mx - 96, my + 22); ctx.lineTo(mx + 58, my + 22); ctx.stroke();
      txt(ctx, mx + 52, my + 54, String(a * b0) + (b0 ? '' : ''), '#0f6e56', 'bold 24px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
      txt(ctx, mx + 52, my + 88, String(a * b1) + '0', '#185fa5', 'bold 24px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
      ctx.beginPath(); ctx.moveTo(mx - 96, my + 112); ctx.lineTo(mx + 58, my + 112); ctx.stroke();
      txt(ctx, mx + 52, my + 144, String(total), '#c0392b', 'bold 26px "PingFang SC","Microsoft YaHei",sans-serif', 'right');
      // 旁注
      txt(ctx, mx + 92, my + 54, '① ' + a + '×' + b0 + '（个位）', '#0f6e56', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, mx + 92, my + 88, '② ' + a + '×' + b1 + '0（十位，末尾补 0）', '#185fa5', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, mx + 92, my + 144, '③ 两行相加', '#c0392b', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      // 常见错误
      var ey = 268;
      txt(ctx, 84, ey, '最常见的两个错', '#c0392b', 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, 84, ey + 26, '① 第二行不补 0 就相加 → 结果少了 10 倍', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, 84, ey + 50, '② 进位忘了加 → 差个十几', '#5f5e5a', '13px "PingFang SC","Microsoft YaHei",sans-serif');
      txt(ctx, 84, ey + 82, '估算兜底：' + a + '×' + b + ' ≈ ' + a1 * 10 + '×' + b1 * 10 + ' = ' + (a1 * 10 * b1 * 10) + '，答案应在这个量级',
        '#185fa5', '12px "PingFang SC","Microsoft YaHei",sans-serif');
      s0.info.innerHTML = '<span class="viz-meta">竖式两步：先乘个位、再乘十位（<b>末尾补 0 或左移一位</b>），最后相加。算完用估算看量级对不对。</span>';
    }
  }
  cSlider(s0.ctrl, '第一个数', a, 11, 99, 1, function (v) { a = Math.round(v); p.a = a; draw(); });
  cSlider(s0.ctrl, '第二个数', b, 11, 99, 1, function (v) { b = Math.round(v); p.b = b; draw(); });
  cSlider(s0.ctrl, '模式（0 面积模型 / 1 竖式）', mode, 0, 1, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); });
  draw();
}
