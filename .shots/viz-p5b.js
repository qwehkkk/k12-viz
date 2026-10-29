/* ===== 小学五年级下册（p5b） ===== */
/* 人教版五年级下册 8 个 viz 组件 */
function p5bGcd(a, b) { while (b) { var t = a % b; a = b; b = t; } return a; }
function p5bCube(ctx, x, y, sz, top, face, side) {
  var dx = sz * 0.5, dy = sz * 0.32;
  ctx.beginPath();
  ctx.moveTo(x, y); ctx.lineTo(x + sz, y); ctx.lineTo(x + sz + dx, y - dy); ctx.lineTo(x + dx, y - dy); ctx.closePath();
  ctx.fillStyle = top; ctx.fill(); ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y); ctx.lineTo(x, y - sz); ctx.lineTo(x + dx, y - sz - dy); ctx.lineTo(x + dx, y - dy); ctx.closePath();
  ctx.fillStyle = side; ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + dx, y - dy); ctx.lineTo(x + sz + dx, y - dy); ctx.lineTo(x + sz + dx, y - sz - dy); ctx.lineTo(x + dx, y - sz - dy); ctx.closePath();
  ctx.fillStyle = face; ctx.fill(); ctx.stroke();
}
function p5bTxt(ctx, x, y, t, color, big, center) {
  ctx.fillStyle = color || '#2c3e50';
  ctx.font = (big ? 'bold 20' : 'bold 16') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign = center ? 'center' : 'left';
  ctx.fillText(t, x, y);
  ctx.textAlign = 'left';
}

/* 观察物体（三） */
function p5bView3Lab(el, cfg) {
  var p = Object.assign({ mode: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, j;
    // 立体：前排 3 块（0,0),(1,0),(2,0)；右后 (2,1) 叠 2 层；再藏 1 块后排中 (1,1)
    function cellH(x, z) { if (x === 2 && z === 1) return 2; return 1; }
    if (mode === 0 || mode === 1 || mode === 3) {
      var sz = 34, bx = 80, by = 290;
      for (j = 1; j >= 0; j--) for (i = 0; i < 3; i++) {
        for (var z = 0; z < cellH(i, j); z++) {
          p5bCube(ctx, bx + i * sz * 1.08 + j * sz * 0.55, by - j * sz * 0.35 - z * sz, sz, '#dceaf7', '#b9d3ea', '#a5c4e0');
        }
      }
      p5bTxt(ctx, 60, 330, '5 块：前排 3 + 右后摞 2 层', '#6b7a89', 0);
    }
    if (mode === 0) {
      p5bTxt(ctx, 400, 60, '从正面看（取每列最高）', '#2c3e50', 1);
      var cs = 40, vx = 430, vy = 230;
      var hs = [1, 1, 2];
      for (i = 0; i < 3; i++) for (var z2 = 0; z2 < hs[i]; z2++) {
        ctx.fillStyle = '#b9d3ea'; ctx.fillRect(vx + i * cs, vy - (z2 + 1) * cs, cs - 3, cs - 3);
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2; ctx.strokeRect(vx + i * cs, vy - (z2 + 1) * cs, cs - 3, cs - 3);
      }
      p5bTxt(ctx, vx - 6, 280, '1 列  2 列  3 列', '#6b7a89', 0);
      p5bTxt(ctx, 400, 320, '前排挡住后排的部分', '#e67e22');
      p5bTxt(ctx, 400, 352, '投影只取每列最高层', '#0f6e56');
    } else if (mode === 1) {
      p5bTxt(ctx, 400, 60, '三步还原法', '#2c3e50', 1);
      p5bTxt(ctx, 400, 100, '① 上面图 → 摆落点（地盘）', '#185fa5');
      p5bTxt(ctx, 400, 132, '② 正面图 → 每列加高', '#185fa5');
      p5bTxt(ctx, 400, 164, '③ 左面图 → 校验每排最高', '#185fa5');
      p5bTxt(ctx, 400, 210, '上层必须踩在下层上', '#0f6e56');
      p5bTxt(ctx, 400, 242, '搭完三个方向各验一次', '#0f6e56');
      p5bTxt(ctx, 400, 288, '满足三视图的搭法', '#c0392b');
      p5bTxt(ctx, 400, 320, '可能不止一种！', '#c0392b');
    } else if (mode === 2) {
      p5bTxt(ctx, 60, 60, '分层数块：', '#2c3e50', 1);
      var rows = [['底层（1 层）：', 3], ['第二层：', 2], ['第三层：', 0]];
      p5bTxt(ctx, 100, 110, '底层：前排 3 块 + 右后 1 块 = 4 块', '#185fa5');
      p5bTxt(ctx, 100, 148, '第二层：右后再摞 1 块', '#185fa5');
      p5bTxt(ctx, 100, 186, '合计 4 + 1 = 5 块', '#c0392b', 1);
      p5bTxt(ctx, 60, 240, '数「存在的」，不是数「看到的」', '#e67e22');
      p5bTxt(ctx, 60, 272, '上层下方一定有块撑着', '#0f6e56');
      p5bTxt(ctx, 60, 304, '分层数完用三视图复核', '#0f6e56');
    } else {
      p5bTxt(ctx, 400, 60, '加 1 块谁变谁不变', '#2c3e50', 1);
      p5bTxt(ctx, 400, 100, '加在正后方 → 正面不变', '#185fa5');
      p5bTxt(ctx, 400, 132, '（被前排挡住）', '#6b7a89');
      p5bTxt(ctx, 400, 168, '加在顶上 → 正面、左面都变', '#0f6e56');
      p5bTxt(ctx, 400, 204, '加在盲区 → 三个视图全不变', '#e67e22');
      p5bTxt(ctx, 400, 240, '判断：新块在该方向投影里', '#6b7a89');
      p5bTxt(ctx, 400, 272, '是否被完全挡住', '#6b7a89');
      p5bTxt(ctx, 400, 316, '所以三视图相同 ≠ 块数相同', '#c0392b');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '正面图定**列数和每列最高层**。'
        : mode === 1 ? '**地盘看上面、高度看正面、前后看左面**。'
          : mode === 2 ? '数块要数**存在的**，遮挡也要算。'
            : '新块**被挡住**则该方向视图不变。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  draw();
}

/* 因数与倍数 */
function p5bFactorLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 36 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, facts, digits, dsum;
    if (mode === 0) {
      facts = [];
      for (i = 1; i * i <= N; i++) if (N % i === 0) { facts.push(i); if (i !== N / i) facts.push(N / i); }
      facts.sort(function (a, b) { return a - b; });
      p5bTxt(ctx, 60, 55, N + ' 的因数（成对找）', '#2c3e50', 1);
      var pairs = [];
      for (i = 0; i < facts.length / 2; i++) pairs.push(facts[i] + '×' + facts[facts.length - 1 - i]);
      p5bTxt(ctx, 60, 100, pairs.join('　'), '#185fa5', 1);
      p5bTxt(ctx, 60, 150, '共 ' + facts.length + ' 个：' + facts.join('、'), '#0f6e56');
      p5bTxt(ctx, 60, 200, '最小因数 1，最大因数是它本身', '#6b7a89');
      p5bTxt(ctx, 60, 240, '倍数：' + N + '、' + (N * 2) + '、' + (N * 3) + '……（无限个）', '#6b7a89');
      p5bTxt(ctx, 60, 285, '试到两因数碰头就停，不重不漏', '#c0392b');
    } else if (mode === 1) {
      digits = String(N).split('');
      dsum = 0; for (i = 0; i < digits.length; i++) dsum += +digits[i];
      var last = N % 10;
      p5bTxt(ctx, 60, 55, '判断 ' + N + '：', '#2c3e50', 1);
      p5bTxt(ctx, 60, 105, '个位 ' + last + ' → 2 的倍数？' + (last % 2 === 0 ? '✓ 是（偶数）' : '✗ 不是'), last % 2 === 0 ? '#0f6e56' : '#c0392b');
      p5bTxt(ctx, 60, 145, '个位 ' + last + ' → 5 的倍数？' + (last === 0 || last === 5 ? '✓ 是' : '✗ 不是'), last === 0 || last === 5 ? '#0f6e56' : '#c0392b');
      p5bTxt(ctx, 60, 185, '数字和 ' + digits.join('+') + ' = ' + dsum + ' → 3 的倍数？' + (dsum % 3 === 0 ? '✓ 是' : '✗ 不是'), dsum % 3 === 0 ? '#0f6e56' : '#c0392b');
      p5bTxt(ctx, 60, 240, '2 和 5 看个位，3 看数字和', '#6b7a89');
      p5bTxt(ctx, 60, 280, '既是 2 又是 5 的倍数：个位必须 0', '#c0392b');
      p5bTxt(ctx, 60, 320, '9 的倍数：数字和是 9 的倍数', '#0f6e56');
    } else if (mode === 2) {
      facts = [];
      for (i = 1; i <= N; i++) if (N % i === 0) facts.push(i);
      var cls = N === 1 ? '既不是质数也不是合数' : facts.length === 2 ? '质数' : '合数';
      p5bTxt(ctx, 60, 55, N + ' 的因数（' + facts.length + ' 个）', '#2c3e50', 1);
      p5bTxt(ctx, 60, 100, facts.join('、'), '#185fa5');
      p5bTxt(ctx, 60, 150, '结论：' + N + ' 是' + cls, '#c0392b', 1);
      p5bTxt(ctx, 60, 200, '质数 2 因数 / 合数 ≥3 因数 / 1 特殊', '#6b7a89');
      p5bTxt(ctx, 60, 240, '2 是唯一的偶质数；91 = 7×13 是合数', '#e67e22');
      p5bTxt(ctx, 60, 280, '试除 2、3、5、7、11 就够判断 100 内', '#0f6e56');
    } else {
      var isE = N % 2 === 0;
      p5bTxt(ctx, 60, 55, '奇偶运算表（n = ' + N + (isE ? '，偶数' : '，奇数') + '）', '#2c3e50', 1);
      var rows2 = [
        [N + ' + 1 = ' + (N + 1) + ' → ' + ((N + 1) % 2 === 0 ? '偶' : '奇'), '异得奇'],
        [N + ' + 2 = ' + (N + 2) + ' → ' + ((N + 2) % 2 === 0 ? '偶' : '奇'), '偶加偶=偶'],
        [N + ' × 3 = ' + (N * 3) + ' → ' + ((N * 3) % 2 === 0 ? '偶' : '奇'), '奇×奇=奇'],
        [N + ' × 4 = ' + (N * 4) + ' → ' + ((N * 4) % 2 === 0 ? '偶' : '奇'), '有偶必偶']
      ];
      for (i = 0; i < rows2.length; i++) {
        p5bTxt(ctx, 60, 105 + i * 40, rows2[i][0] + '　（' + rows2[i][1] + '）', '#185fa5');
      }
      p5bTxt(ctx, 60, 290, '加法：同奇偶得偶，异得奇', '#c0392b');
      p5bTxt(ctx, 60, 325, '乘法：只要有一个偶数，积必偶', '#c0392b');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '找因数**成对试除**不重不漏。'
        : mode === 1 ? '2/5 看**个位**，3 看**数字和**。'
          : mode === 2 ? '按**因数个数**分类；1 特殊。'
            : '加法**同得偶异得奇**，乘法**有偶必偶**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, 'n', N, mode === 1 ? 100 : 2, mode === 1 ? 999 : 100, 1, function (v) { N = v; p.n = v; draw(); });
  draw();
}

/* 长方体和正方体 */
function p5bBoxLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 4, b: 3, h: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b), H = Math.round(p.h);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, j;
    var sc = 22, bx = 90, by = 300;
    function bl(u, v) { return [bx + u * sc, by - v * sc]; }
    if (mode === 0) {
      // 1-4-1 展开图
      var cw = A * sc, ch = B * sc, x0 = 80, y0 = 90;
      var layout = [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [1, -1]];
      var cols = ['#dceaf7', '#f7cfae', '#dceaf7', '#f7cfae', '#e2f2ea', '#f2dede'];
      for (i = 0; i < 6; i++) {
        var cx = x0 + layout[i][0] * cw, cy = y0 + layout[i][1] * ch;
        ctx.fillStyle = cols[i]; ctx.fillRect(cx, cy, cw - 2, ch - 2);
        ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.6; ctx.strokeRect(cx, cy, cw - 2, ch - 2);
      }
      p5bTxt(ctx, 60, 55, '1-4-1 展开图（长 ' + A + ' × 宽 ' + B + ' × 高 ' + H + '）', '#2c3e50', 1);
      p5bTxt(ctx, 400, 140, '同色 = 相对面', '#185fa5');
      p5bTxt(ctx, 400, 175, '隔一个面才相对', '#6b7a89');
      p5bTxt(ctx, 400, 215, '「田」字形折不成盒', '#c0392b');
      p5bTxt(ctx, 400, 255, '正方体展开 11 种排法', '#0f6e56');
      p5bTxt(ctx, 400, 295, '折回去：哪些边会粘住？', '#6b7a89');
    } else if (mode === 1) {
      for (j = 0; j < H; j++) for (i = 0; i < A; i++) {
        p5bCube(ctx, bx + i * sc * 1.1 + 0 * sc * 0.55, by - j * sc, sc, '#dceaf7', '#b9d3ea', '#a5c4e0');
      }
      var s = (A * B + A * H + B * H) * 2;
      p5bTxt(ctx, 400, 70, '长 ' + A + ' 宽 ' + B + ' 高 ' + H, '#2c3e50', 1);
      p5bTxt(ctx, 400, 115, '上下 2 个 ' + A + '×' + B + ' = ' + (2 * A * B), '#185fa5');
      p5bTxt(ctx, 400, 150, '前后 2 个 ' + A + '×' + H + ' = ' + (2 * A * H), '#185fa5');
      p5bTxt(ctx, 400, 185, '左右 2 个 ' + B + '×' + H + ' = ' + (2 * B * H), '#185fa5');
      p5bTxt(ctx, 400, 235, 'S = (' + (A * B) + ' + ' + (A * H) + ' + ' + (B * H) + ') × 2 = ' + s, '#c0392b', 1);
      p5bTxt(ctx, 400, 280, '无盖少一个顶面', '#6b7a89');
      p5bTxt(ctx, 400, 315, '通风管只算 4 个侧面', '#6b7a89');
    } else if (mode === 2) {
      for (var k = 0; k < H; k++) {
        for (i = 0; i < A; i++) for (j = 0; j < B; j++) {
          var px = bx + i * sc * 0.9 + j * sc * 0.45, py = by - k * sc * 0.55 - j * sc * 0.3;
          ctx.fillStyle = k === H - 1 ? '#f7cfae' : '#dceaf7';
          ctx.fillRect(px, py, sc * 0.82, sc * 0.82);
          ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1; ctx.strokeRect(px, py, sc * 0.82, sc * 0.82);
        }
      }
      p5bTxt(ctx, 400, 80, '每层铺 ' + A + ' × ' + B + ' = ' + (A * B) + ' 块', '#185fa5');
      p5bTxt(ctx, 400, 120, '叠 ' + H + ' 层', '#185fa5');
      p5bTxt(ctx, 400, 170, 'V = ' + A + ' × ' + B + ' × ' + H + ' = ' + (A * B * H), '#c0392b', 1);
      p5bTxt(ctx, 400, 215, 'V = 底面积 × 高', '#0f6e56');
      p5bTxt(ctx, 400, 255, '正方体 V = 棱长³', '#0f6e56');
      p5bTxt(ctx, 400, 300, '棱长 ×2：S ×4，V ×8', '#e67e22');
    } else {
      p5bTxt(ctx, 60, 60, '体积单位天梯（进率 1000）', '#2c3e50', 1);
      var lad = [['1 m³', '= 1000 dm³ = 1000 L'], ['1 dm³', '= 1000 cm³ = 1 L'], ['1 cm³', '= 1 mL']];
      for (i = 0; i < 3; i++) {
        p5bTxt(ctx, 90, 115 + i * 55, lad[i][0] + '　' + lad[i][1], i === 1 ? '#c0392b' : '#185fa5', i === 1);
      }
      p5bTxt(ctx, 90, 280, '为什么进率 1000？10 × 10 × 10', '#0f6e56');
      p5bTxt(ctx, 90, 315, '1 dm³ 的方块每条棱摆 10 个 cm³', '#6b7a89');
      p5bTxt(ctx, 90, 348, '大变小 ×1000，小变大 ÷1000', '#c0392b');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '展开图里**隔一个面相对**。'
        : mode === 1 ? 'S = (ab + ah + bh) × **2**。'
          : mode === 2 ? 'V = 长 × 宽 × 高（**一层层铺**）。'
            : '体积进率是 **1000**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '长 a', A, 2, 8, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, '宽 b', B, 2, 6, 1, function (v) { B = v; p.b = v; draw(); });
  cSlider(s0.ctrl, '高 h', H, 1, 5, 1, function (v) { H = v; p.h = v; draw(); });
  draw();
}

/* 分数的意义和性质 */
function p5bFracLab(el, cfg) {
  var p = Object.assign({ mode: 0, num: 3, den: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), NU = Math.round(p.num), DE = Math.round(p.den);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, j;
    if (mode === 0) {
      var bx = 70, bw = 480, by = 200, seg = bw / DE;
      for (i = 0; i < DE; i++) {
        ctx.fillStyle = i < NU ? '#f0a05a' : '#fff';
        ctx.fillRect(bx + i * seg, by, seg - 2, 56);
        ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.6; ctx.strokeRect(bx + i * seg, by, seg - 2, 56);
      }
      p5bTxt(ctx, 60, 70, '平均分成 ' + DE + ' 份，取 ' + NU + ' 份 → ' + NU + '/' + DE, '#2c3e50', 1);
      p5bTxt(ctx, 60, 300, '分数单位：1/' + DE + '（分母定单位）', '#185fa5');
      p5bTxt(ctx, 60, 335, NU + '/' + DE + ' 里有 ' + NU + ' 个 1/' + DE, '#0f6e56');
      p5bTxt(ctx, 60, 130, '单位「1」：这一整条', '#6b7a89');
    } else if (mode === 1) {
      var walls = [1, 2, 3, 4, 5, 6];
      var gx = 150, gw = 380, gy0 = 340, rh = 38;
      for (j = 0; j < walls.length; j++) {
        var dn2 = walls[j], seg2 = gw / dn2;
        for (i = 0; i < dn2; i++) {
          var hit = (dn2 === DE && i === 0);
          ctx.fillStyle = hit ? '#f0a05a' : (i % 2 ? '#eef2f6' : '#fff');
          ctx.fillRect(gx + i * seg2, gy0 - (j + 1) * rh, seg2 - 1.5, rh - 2);
          ctx.strokeStyle = hit ? '#c0392b' : '#c2cdd8'; ctx.lineWidth = hit ? 2.4 : 1;
          ctx.strokeRect(gx + i * seg2, gy0 - (j + 1) * rh, seg2 - 1.5, rh - 2);
        }
        p5bTxt(ctx, 92, gy0 - (j + 1) * rh + rh / 2, '1/' + dn2 + ' 行', dn2 === DE ? '#c0392b' : '#6b7a89', 0);
      }
      p5bTxt(ctx, 60, 60, '分数墙：同一高度比长短', '#2c3e50', 1);
      p5bTxt(ctx, 60, 385, '越往下分母越大，每份越小', '#6b7a89');
    } else if (mode === 2) {
      var g = p5bGcd(NU, DE), red2 = g > 1;
      p5bTxt(ctx, 60, 60, NU + '/' + DE + ' 约分', '#2c3e50', 1);
      p5bTxt(ctx, 60, 110, '最大公因数 (' + NU + ', ' + DE + ') = ' + g, '#185fa5');
      if (red2) {
        p5bTxt(ctx, 60, 155, '同 ÷ ' + g + ' → ' + (NU / g) + '/' + (DE / g), '#0f6e56', 1);
        p5bTxt(ctx, 60, 200, (NU / g) + ' 与 ' + (DE / g) + (p5bGcd(NU / g, DE / g) === 1 ? ' 互质 ✓ 已最简' : ' 还能再约'), '#6b7a89');
      } else {
        p5bTxt(ctx, 60, 155, '分子分母互质 → 已是最简分数 ✓', '#0f6e56', 1);
      }
      p5bTxt(ctx, 60, 255, '依据：分数基本性质（同除不变）', '#6b7a89');
      p5bTxt(ctx, 60, 295, '大小没变，只是写法变简了', '#c0392b');
      p5bTxt(ctx, 60, 335, '验证：涂色部分一样长', '#6b7a89');
    } else {
      var dd = DE, dd2 = 6, g2 = p5bGcd(dd, dd2), lcm = dd * dd2 / g2;
      p5bTxt(ctx, 60, 60, '通分：' + NU + '/' + DE + ' 和 5/6', '#2c3e50', 1);
      p5bTxt(ctx, 60, 110, '公分母 = 最小公倍数(' + dd + ', ' + dd2 + ') = ' + lcm, '#185fa5');
      var m1 = lcm / dd, m2 = lcm / dd2;
      p5bTxt(ctx, 60, 155, NU + '/' + DE + ' = ' + (NU * m1) + '/' + lcm + '　（同 ×' + m1 + '）', '#0f6e56');
      p5bTxt(ctx, 60, 195, '5/6 = ' + (5 * m2) + '/' + lcm + '　（同 ×' + m2 + '）', '#0f6e56');
      p5bTxt(ctx, 60, 250, '分子别忘了同步乘！', '#c0392b', 1);
      p5bTxt(ctx, 60, 290, '通分往「同」走，约分往「简」走', '#6b7a89');
      p5bTxt(ctx, 60, 330, '真分数 < 1；假分数 ≥ 1', '#6b7a89');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**分数单位 = 1/分母**。'
        : mode === 1 ? '分数墙上**对齐比长短**。'
          : mode === 2 ? '约分：**同除最大公因数**。'
            : '通分：**最小公倍数**作公分母。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '分子', NU, 1, 11, 1, function (v) { NU = v; p.num = v; draw(); });
  cSlider(s0.ctrl, '分母', DE, 2, 12, 1, function (v) { DE = v; p.den = v; if (NU > DE) { NU = DE; p.num = NU; } draw(); });
  draw();
}

/* 图形的运动（三） */
function p5bRotLab(el, cfg) {
  var p = Object.assign({ mode: 0, ang: 90 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), ANG = Math.round(p.ang);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, j;
    var rad = ANG * Math.PI / 180;
    if (mode === 0) {
      var cx = 190, cy = 215, r = 125;
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
      for (i = 0; i < 12; i++) {
        var a12 = i * Math.PI / 6;
        ctx.beginPath();
        ctx.moveTo(cx + Math.sin(a12) * (r - 10), cy - Math.cos(a12) * (r - 10));
        ctx.lineTo(cx + Math.sin(a12) * r, cy - Math.cos(a12) * r);
        ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 2; ctx.stroke();
      }
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy - r * 0.75); ctx.stroke();
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.sin(rad) * r * 0.75, cy - Math.cos(rad) * r * 0.75); ctx.stroke();
      ctx.fillStyle = '#2c3e50'; ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
      p5bTxt(ctx, 370, 80, '绕轴心（中心）', '#2c3e50', 1);
      p5bTxt(ctx, 370, 120, '顺时针 ' + ANG + '°', '#c0392b', 1);
      p5bTxt(ctx, 370, 170, '与钟表同向 = 顺时针', '#6b7a89');
      p5bTxt(ctx, 370, 210, '反向 = 逆时针', '#6b7a89');
      p5bTxt(ctx, 370, 255, '三要素：中心、方向、角度', '#0f6e56');
      p5bTxt(ctx, 370, 295, '缺一个都说不清旋转', '#e67e22');
    } else if (mode === 1) {
      var ox = 170, oy = 250, d = 115;
      var a1 = -Math.PI / 3, a2 = a1 + rad;
      var P1 = [ox + Math.cos(a1) * d, oy + Math.sin(a1) * d];
      var P2 = [ox + Math.cos(a2) * d, oy + Math.sin(a2) * d];
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6; ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.arc(ox, oy, d, a1, a2); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(P1[0], P1[1]); ctx.stroke();
      ctx.strokeStyle = '#c0392b';
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(P2[0], P2[1]); ctx.stroke();
      ctx.fillStyle = '#185fa5'; ctx.beginPath(); ctx.arc(P1[0], P1[1], 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(P2[0], P2[1], 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#2c3e50'; ctx.beginPath(); ctx.arc(ox, oy, 6, 0, Math.PI * 2); ctx.fill();
      p5bTxt(ctx, ox - 20, oy + 22, 'O', '#2c3e50');
      p5bTxt(ctx, P1[0] + 10, P1[1], 'P', '#185fa5');
      p5bTxt(ctx, P2[0] + 10, P2[1], "P'", '#c0392b');
      p5bTxt(ctx, 400, 80, 'OP = OP\'（等距）', '#2c3e50', 1);
      p5bTxt(ctx, 400, 125, '对应点到旋转中心', '#185fa5');
      p5bTxt(ctx, 400, 158, '距离相等，都转 ' + ANG + '°', '#185fa5');
      p5bTxt(ctx, 400, 210, '中心是唯一不动的点', '#0f6e56');
      p5bTxt(ctx, 400, 250, '形状、大小都不变', '#0f6e56');
      p5bTxt(ctx, 400, 300, '离中心越远，转出的弧越长', '#6b7a89');
    } else if (mode === 2) {
      var cs = 42, gx = 90, gy = 330;
      var steps = Math.round(ANG / 90) % 4;
      function rotPt(x, y, k, cw) {
        for (var q = 0; q < k; q++) { var t = cw ? [y, -x] : [-y, x]; x = t[0]; y = t[1]; }
        return [x, y];
      }
      var cells = [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2]];
      for (i = 0; i < 6; i++) for (j = 0; j < 6; j++) {
        ctx.fillStyle = (i + j) % 2 ? '#f6f8fa' : '#fff';
        ctx.fillRect(gx + i * cs, gy - (j + 1) * cs, cs, cs);
      }
      function drawCells(list, fill, off) {
        for (var c = 0; c < list.length; c++) {
          ctx.fillStyle = fill;
          ctx.fillRect(gx + list[c][0] * cs + 3 + off, gy - (list[c][1] + 1) * cs + 3 - off * 0, cs - 6, cs - 6);
          ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.5;
          ctx.strokeRect(gx + list[c][0] * cs + 3 + off, gy - (list[c][1] + 1) * cs + 3, cs - 6, cs - 6);
        }
      }
      drawCells(cells, '#dceaf7', 0);
      var rot = cells.map(function (c) { return rotPt(c[0], c[1], steps, true); });
      drawCells(rot, '#f7cfae', 250);
      p5bTxt(ctx, gx + 5, gy + 22, '原 L 形', '#185fa5');
      p5bTxt(ctx, gx + 250 + 5, gy + 22, '顺时针 ' + ANG + '° 后', '#c0392b');
      p5bTxt(ctx, 60, 45, '横变竖、竖变横，格数不变', '#2c3e50', 1);
      p5bTxt(ctx, 60, 382, '180° 时顺逆结果相同，90° 不同', '#e67e22');
    } else {
      var n = Math.round(360 / ANG);
      var ok = n * ANG === 360;
      var cx2 = 210, cy2 = 210, rr = 115;
      function rrot(px, py, a) { return [cx2 + px * Math.cos(a) - py * Math.sin(a), cy2 + px * Math.sin(a) + py * Math.cos(a)]; }
      for (i = 0; i < n; i++) {
        var aa = i * rad;
        var k1 = rrot(rr * 0.5, -rr * 0.3, aa), k2 = rrot(rr, 0, aa), k3 = rrot(rr * 0.5, rr * 0.26, aa), k0 = rrot(0, 0, aa);
        ctx.beginPath();
        ctx.moveTo(k0[0], k0[1]);
        ctx.quadraticCurveTo(k1[0], k1[1], k2[0], k2[1]);
        ctx.quadraticCurveTo(k3[0], k3[1], k0[0], k0[1]);
        ctx.closePath();
        ctx.fillStyle = i % 2 ? '#f0a05a' : '#dceaf7';
        ctx.fill(); ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.5; ctx.stroke();
      }
      p5bTxt(ctx, 400, 80, '每次转 ' + ANG + '°，共 ' + n + ' 瓣', '#2c3e50', 1);
      p5bTxt(ctx, 400, 125, ok ? n + ' × ' + ANG + '° = 360° ✓ 正好闭合' : n + ' × ' + ANG + '° ≠ 360°，有缺口！', ok ? '#0f6e56' : '#c0392b');
      p5bTxt(ctx, 400, 175, '基本图形 + 连续旋转 = 图案', '#6b7a89');
      p5bTxt(ctx, 400, 215, '转角 = 360° ÷ 瓣数', '#0f6e56');
      p5bTxt(ctx, 400, 260, '90°×4 风车；60°×6 雪花', '#6b7a89');
      p5bTxt(ctx, 400, 305, '旋转不改变形状大小', '#e67e22');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '三要素：**中心、方向、角度**。'
        : mode === 1 ? '对应点到中心**距离相等**。'
          : mode === 2 ? '90° 旋转：**横竖互换**。'
            : '转角 = 360° ÷ **瓣数**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '角度', ANG, mode === 2 ? 0 : 30, mode === 2 ? 180 : 180, mode === 2 ? 90 : 15, function (v) { ANG = v; p.ang = v; draw(); });
  draw();
}

/* 分数的加法和减法 */
function p5bFaddLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 3, b: 1, d: 8 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b), D = Math.round(p.d);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    function bar(y, den, fill1, fill2, lab) {
      var bx = 70, bw = 460, seg = bw / den;
      for (i = 0; i < den; i++) {
        ctx.fillStyle = i < fill1 ? '#f0a05a' : i < fill1 + fill2 ? '#7db3e8' : '#fff';
        ctx.fillRect(bx + i * seg, y, seg - 2, 44);
        ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.5; ctx.strokeRect(bx + i * seg, y, seg - 2, 44);
      }
      p5bTxt(ctx, 545, y + 22, lab, '#6b7a89');
    }
    if (mode === 0) {
      var s = A + B, full = s >= D, red2 = p5bGcd(s, D);
      bar(130, D, A, B, '');
      p5bTxt(ctx, 60, 60, A + '/' + D + ' + ' + B + '/' + D + '：单位相同直接数', '#2c3e50', 1);
      p5bTxt(ctx, 60, 220, '分母不变，分子相加：' + A + ' + ' + B + ' = ' + s, '#185fa5');
      p5bTxt(ctx, 60, 258, '= ' + s + '/' + D + (full ? ' = 1' : red2 > 1 ? ' = ' + (s / red2) + '/' + (D / red2) : ''), '#c0392b', 1);
      p5bTxt(ctx, 60, 310, '分母千万别相加（4/8 ≠ 4/16）', '#e67e22');
      p5bTxt(ctx, 60, 348, '结果要化成最简分数', '#0f6e56');
    } else if (mode === 1) {
      var d2 = Math.max(2, B), g = p5bGcd(D, d2), lcm = D * d2 / g;
      var m1 = lcm / D, m2 = lcm / d2, s2 = A * m1 + 1 * m2;
      p5bTxt(ctx, 60, 60, A + '/' + D + ' + 1/' + d2 + '：先统一「货币」', '#2c3e50', 1);
      p5bTxt(ctx, 60, 110, '公分母 = 最小公倍数(' + D + ', ' + d2 + ') = ' + lcm, '#185fa5');
      p5bTxt(ctx, 60, 150, A + '/' + D + ' = ' + (A * m1) + '/' + lcm + '，1/' + d2 + ' = ' + m2 + '/' + lcm, '#0f6e56');
      p5bTxt(ctx, 60, 195, '相加：' + (A * m1) + ' + ' + m2 + ' = ' + s2, '#185fa5');
      p5bTxt(ctx, 60, 235, '= ' + s2 + '/' + lcm + (p5bGcd(s2, lcm) > 1 ? ' = ' + (s2 / p5bGcd(s2, lcm)) + '/' + (lcm / p5bGcd(s2, lcm)) : ''), '#c0392b', 1);
      p5bTxt(ctx, 60, 290, '通分时分子同步乘！', '#e67e22');
      p5bTxt(ctx, 60, 328, '1 − 2/5 = 5/5 − 2/5 = 3/5', '#6b7a89');
    } else if (mode === 2) {
      p5bTxt(ctx, 60, 60, '巧算：同分母先抱团', '#2c3e50', 1);
      p5bTxt(ctx, 60, 110, '2/8 + 3/8 + 5/8 + 1/4', '#185fa5', 1);
      p5bTxt(ctx, 60, 155, '先凑同分母：2/8 + 3/8 + 5/8 = 10/8', '#0f6e56');
      p5bTxt(ctx, 60, 195, '10/8 = 5/4，再通分加 1/4 = 2/8', '#0f6e56');
      p5bTxt(ctx, 60, 235, '5/4 + 2/8 = 10/8 + 2/8 = 12/8 = 3/2', '#c0392b', 1);
      p5bTxt(ctx, 60, 290, '交换律、结合律对分数同样成立', '#6b7a89');
      p5bTxt(ctx, 60, 328, '凑 1 优先：3/8 + 5/8 = 1 一眼看出', '#e67e22');
    } else {
      bar(150, D, A, D - A, '');
      p5bTxt(ctx, 60, 60, '一瓶水喝了 ' + A + '/' + D + '，还剩多少？', '#2c3e50', 1);
      p5bTxt(ctx, 60, 240, '总量看作单位 1 = ' + D + '/' + D, '#185fa5');
      p5bTxt(ctx, 60, 280, '剩 1 − ' + A + '/' + D + ' = ' + D + '/' + D + ' − ' + A + '/' + D + ' = ' + (D - A) + '/' + D, '#c0392b', 1);
      p5bTxt(ctx, 60, 330, '「剩下的」= 1 − 用去的总和', '#0f6e56');
      p5bTxt(ctx, 60, 368, '读题先圈出单位「1」是谁', '#6b7a89');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '同分母：**分母不动分子加减**。'
        : mode === 1 ? '异分母：**先通分再算**。'
          : mode === 2 ? '**凑 1、凑同分母**优先。'
            : '总量 = 单位 **1**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, 'a（分子）', A, 1, 11, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, 'b / 第二分母', B, 1, 11, 1, function (v) { B = v; p.b = v; draw(); });
  cSlider(s0.ctrl, '分母', D, 2, 12, 1, function (v) { D = v; p.d = v; draw(); });
  draw();
}

/* 折线统计图 */
function p5bLineLab(el, cfg) {
  var p = Object.assign({ mode: 0, w: 15 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), W = Math.round(p.w);
  var info = s0.info;
  var days = ['一', '二', '三', '四', '五'];
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    // 周五气温由滑块控制，四个模式共用同一份数据
    var data = [12, 15, 14, 18, W];
    var gx = 90, gy = 330, gw = 420, gh = 250, ymax2 = 30;
    function pt(i2, val, off) { return [gx + gw * i2 / 4, gy - gh * val / ymax2 - (off || 0)]; }
    // 轴
    ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(gx, gy); ctx.lineTo(gx + gw + 20, gy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx, gy + 6); ctx.lineTo(gx, gy - gh - 10); ctx.stroke();
    ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    for (i = 0; i <= 3; i++) {
      var vv = i * 10;
      ctx.fillText(String(vv), gx - 18, gy - gh * vv / ymax2);
      ctx.strokeStyle = '#eef2f6';
      ctx.beginPath(); ctx.moveTo(gx, gy - gh * vv / ymax2); ctx.lineTo(gx + gw, gy - gh * vv / ymax2); ctx.stroke();
    }
    for (i = 0; i < 5; i++) ctx.fillText('周' + days[i], gx + gw * i / 4 - 10, gy + 18);
    ctx.fillText('气温/℃', gx - 78, gy - gh / 2);
    function drawLine(vals, color, dashed, off) {
      ctx.strokeStyle = color; ctx.lineWidth = 3;
      ctx.setLineDash(dashed ? [6, 5] : []);
      ctx.beginPath();
      for (i = 0; i < vals.length; i++) {
        var q = pt(i, vals[i], off || 0);
        if (i === 0) ctx.moveTo(q[0], q[1]); else ctx.lineTo(q[0], q[1]);
      }
      ctx.stroke(); ctx.setLineDash([]);
    }
    function drawPts(vals, color, off) {
      for (i = 0; i < vals.length; i++) {
        var q = pt(i, vals[i], off || 0);
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(q[0], q[1], 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 12px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(String(vals[i]), q[0] + 7, q[1] - 12);
      }
    }
    if (mode === 0) {
      p5bTxt(ctx, 60, 45, '一周气温折线图：描点 → 标数 → 连线', '#2c3e50', 1);
      p5bTxt(ctx, 560, 45, '拖滑块改周五', '#6b7a89', 0, 1);
      drawLine(data, '#185fa5', false, 0);
      drawPts(data, '#185fa5', 0);
    } else if (mode === 1) {
      p5bTxt(ctx, 60, 45, '哪段升得快？看陡缓', '#2c3e50', 1);
      drawLine(data, '#c2cdd8', false, 0);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 4;
      var q1 = pt(0, data[0]), q2 = pt(1, data[1]);
      ctx.beginPath(); ctx.moveTo(q1[0], q1[1]); ctx.lineTo(q2[0], q2[1]); ctx.stroke();
      ctx.strokeStyle = '#0f6e56';
      var q3 = pt(3, data[3]), q4 = pt(4, data[4]);
      ctx.beginPath(); ctx.moveTo(q3[0], q3[1]); ctx.lineTo(q4[0], q4[1]); ctx.stroke();
      drawPts(data, '#6b7a89', 0);
      var d01 = data[1] - data[0], d34 = data[4] - data[3];
      var seg34 = d34 > 0 ? '升 ' + d34 + '℃' : d34 < 0 ? '降 ' + (-d34) + '℃' : '持平';
      var steeper = Math.abs(d34) > Math.abs(d01) ? '绿段更陡、变化更快'
        : Math.abs(d34) < Math.abs(d01) ? '红段更陡、变化更快' : '两段一样陡';
      p5bTxt(ctx, 60, 385, '红：升 ' + d01 + '℃，绿：' + seg34 + ' → ' + steeper, '#c0392b');
    } else if (mode === 2) {
      p5bTxt(ctx, 60, 45, '复式：两地气温对比', '#2c3e50', 1);
      drawLine(data, '#185fa5', false, 0);
      drawPts(data, '#185fa5', 0);
      drawLine([18, 17, 19, 18, 19], '#c0392b', false, 0);
      drawPts([18, 17, 19, 18, 19], '#c0392b', 0);
      ctx.fillStyle = '#185fa5'; ctx.fillRect(540, 60, 14, 4); ctx.fillText('甲地', 560, 63);
      ctx.fillStyle = '#c0392b'; ctx.fillRect(540, 82, 14, 4); ctx.fillText('乙地', 560, 85);
      p5bTxt(ctx, 60, 385, '两线靠近 = 温差缩小，张开 = 拉大', '#6b7a89');
    } else {
      p5bTxt(ctx, 60, 45, '顺着趋势预测（虚线外推）', '#2c3e50', 1);
      drawLine(data.slice(0, 4), '#185fa5', false, 0);
      drawPts(data.slice(0, 4), '#185fa5', 0);
      // 两元素数组会按索引 0、1 落到周一/周二，必须显式用 3、4 两个横坐标
      var qa = pt(3, data[3]), qb = pt(4, data[4]);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 3; ctx.setLineDash([6, 5]);
      ctx.beginPath(); ctx.moveTo(qa[0], qa[1]); ctx.lineTo(qb[0], qb[1]); ctx.stroke(); ctx.setLineDash([]);
      var q5 = pt(4, data[4]);
      ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(q5[0], q5[1], 5, 0, Math.PI * 2); ctx.fill();
      var tri = W > data[3] ? '仍在升' : W < data[3] ? '转为回落' : '与周四持平';
      p5bTxt(ctx, 60, 385, '顺着前 4 天走势 → 周五「可能」' + W + '℃（' + tri + '，用「可能」留余地）', '#c0392b');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**描点、标数、顺次连线**。'
        : mode === 1 ? '线越陡，**变化越快**。'
          : mode === 2 ? '复式图先认**图例**。'
            : '预测用「**可能**」，顺着趋势说。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '周五气温', W, 15, 28, 1, function (v) { W = v; p.w = v; draw(); });
  draw();
}

/* 找次品 */
function p5bFindLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    function scale(cx, cy, tilt, labL, labR) {
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + 80); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 55, cy + 82); ctx.lineTo(cx + 55, cy + 82); ctx.stroke();
      ctx.lineWidth = 5;
      var dy = tilt * 14;
      ctx.beginPath(); ctx.moveTo(cx - 110, cy - dy); ctx.lineTo(cx + 110, cy + dy); ctx.stroke();
      ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(cx - 110, cy - dy); ctx.lineTo(cx - 110, cy - dy + 30); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 110, cy + dy); ctx.lineTo(cx + 110, cy + dy + 30); ctx.stroke();
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(cx - 145, cy - dy + 30); ctx.lineTo(cx - 75, cy - dy + 30); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + 75, cy + dy + 30); ctx.lineTo(cx + 145, cy + dy + 30); ctx.stroke();
      p5bTxt(ctx, cx - 110, cy - dy + 52, labL, '#185fa5', 0, 1);
      p5bTxt(ctx, cx + 110, cy + dy + 52, labR, '#c0392b', 0, 1);
      ctx.fillStyle = '#2c3e50'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
    }
    function balls(x, y, count, color, gap) {
      for (var b = 0; b < count; b++) {
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x + b * (gap || 26), y, 10, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.2; ctx.stroke();
      }
    }
    if (mode === 0) {
      scale(230, 150, 0, '①', '②');
      balls(120, 118, 1, '#f0a05a'); balls(340, 118, 1, '#7db3e8');
      balls(230, 330, 1, '#8a5a00', 0);
      p5bTxt(ctx, 400, 60, '3 个里找次品（偏轻）', '#2c3e50', 1);
      p5bTxt(ctx, 400, 105, '结果 1 平衡 → 盘外那个是', '#0f6e56');
      p5bTxt(ctx, 400, 145, '结果 2/3 倾斜 → 轻的一端是', '#c0392b');
      p5bTxt(ctx, 400, 195, '天平一次只有 3 种结果', '#6b7a89');
      p5bTxt(ctx, 400, 240, '左沉 / 右沉 / 平衡', '#6b7a89');
      p5bTxt(ctx, 400, 290, '3 个分 (1,1,1) → 1 次', '#185fa5', 1);
    } else if (mode === 1) {
      p5bTxt(ctx, 60, 55, N + ' 个：尽量平均分成 3 份', '#2c3e50', 1);
      var a = Math.floor(N / 3), c = N - 2 * a;
      p5bTxt(ctx, 60, 105, '(' + a + ', ' + a + ', ' + c + ')：先称前两份', '#185fa5');
      p5bTxt(ctx, 60, 150, '平衡 → 次品在剩下 ' + c + ' 个里', '#0f6e56');
      p5bTxt(ctx, 60, 190, '倾斜 → 在轻的 ' + a + ' 个里', '#c0392b');
      p5bTxt(ctx, 60, 240, '每次都能排除约 2/3', '#6b7a89');
      p5bTxt(ctx, 60, 280, '分成 2 份浪费「平衡」信息', '#e67e22');
      p5bTxt(ctx, 60, 320, '8 个 → (3,3,2) → 保证 2 次', '#185fa5', 1);
    } else if (mode === 2) {
      p5bTxt(ctx, 60, 50, '3ⁿ 天梯：k 次最多 3ᵏ 个', '#2c3e50', 1);
      var lad2 = [[1, 3], [2, 9], [3, 27], [4, 81]];
      for (i = 0; i < 4; i++) {
        var y2 = 300 - i * 62;
        ctx.fillStyle = '#dceaf7'; ctx.fillRect(120, y2, 190, 44);
        ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.5; ctx.strokeRect(120, y2, 190, 44);
        p5bTxt(ctx, 140, y2 + 22, lad2[i][0] + ' 次 → 最多 ' + lad2[i][1] + ' 个', '#185fa5');
      }
      p5bTxt(ctx, 400, 130, '3 × 3 × 3 = 27', '#6b7a89');
      p5bTxt(ctx, 400, 175, '问法反过来也常见：', '#6b7a89');
      p5bTxt(ctx, 400, 210, '「称 3 次最多保证几个？」', '#6b7a89');
      p5bTxt(ctx, 400, 255, '答：3³ = 27 个', '#c0392b', 1);
      p5bTxt(ctx, 400, 305, '树杈图：每层 3 分支', '#0f6e56');
    } else {
      var k = 0, t3 = 1;
      while (t3 < N) { t3 *= 3; k++; }
      p5bTxt(ctx, 60, 55, N + ' 个找次品：最不利分析', '#2c3e50', 1);
      var seq = '', t4 = N, kk;
      seq = '每称一次缩到 ≤ ⌈n/3⌉：';
      p5bTxt(ctx, 60, 105, seq + N + ' → ' + Math.ceil(N / 3) + ' → ' + Math.ceil(Math.ceil(N / 3) / 3) + ' → …', '#185fa5');
      p5bTxt(ctx, 60, 155, '3 的幂：9 < ' + N + ' ≤ 27 时是 3 次（类比）', '#6b7a89');
      p5bTxt(ctx, 60, 205, '结论：' + N + ' 个最少保证 ' + k + ' 次', '#c0392b', 1);
      p5bTxt(ctx, 60, 255, '「保证」= 按最倒霉情况算', '#0f6e56');
      p5bTxt(ctx, 60, 295, '运气好可能更少，但计划看最坏', '#6b7a89');
      p5bTxt(ctx, 60, 335, '10 个 → (3,3,4) → 3 次', '#185fa5');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '天平一次**3 种结果**。'
        : mode === 1 ? '尽量**平均分成 3 份**。'
          : mode === 2 ? 'k 次 → 最多 **3ᵏ 个**。'
            : '「保证」按**最不利**算。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '物品数', N, 3, 80, 1, function (v) { N = v; p.n = v; draw(); });
  draw();
}



/* ===== 小学六年级上册（p6a） ===== */
/* ===== 小学六年级上册（p6a） ===== */
/* 人教版六年级上册 8 个 viz 组件 */
function p6aGcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function p6aTxt(ctx, x, y, t, color, big, center) {
  ctx.fillStyle = color || '#2c3e50';
  ctx.font = (big ? 'bold 20' : 'bold 16') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign = center ? 'center' : 'left';
  ctx.fillText(t, x, y);
  ctx.textAlign = 'left';
}
function p6aFrac(ctx, x, y, n, d, color, size) {
  var s = size || 22;
  ctx.fillStyle = color || '#2c3e50';
  ctx.font = 'bold ' + s + 'px "PingFang SC","Microsoft YaHei",sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(String(n), x, y - s * 0.66);
  ctx.fillText(String(d), x, y + s * 0.66);
  ctx.strokeStyle = color || '#2c3e50'; ctx.lineWidth = 1.8;
  var w = Math.max(String(n).length, String(d).length) * s * 0.44 + 7;
  ctx.beginPath(); ctx.moveTo(x - w, y); ctx.lineTo(x + w, y); ctx.stroke();
  ctx.textAlign = 'left';
}

/* 分数乘法 */
function p6aFmulLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 3, a: 3, b: 4, t: 120 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n), A = Math.round(p.a), B = Math.round(p.b), T = Math.round(p.t);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, j;
    if (mode === 0) {
      var bw = 26, x0 = 96;
      p6aTxt(ctx, 60, 52, N + ' 个 3/10 相加', '#2c3e50', 1);
      for (i = 0; i < N; i++) {
        var y = 108 + i * 50;
        for (j = 0; j < 10; j++) {
          ctx.fillStyle = j < 3 ? '#b9d3ea' : '#fff';
          ctx.fillRect(x0 + j * bw, y, bw, 34);
          ctx.strokeStyle = j < 3 ? '#185fa5' : '#c2cdd8'; ctx.lineWidth = j < 3 ? 1.4 : 1;
          ctx.strokeRect(x0 + j * bw, y, bw, 34);
        }
        p6aTxt(ctx, x0 - 12, y + 17, '第 ' + (i + 1) + ' 个', '#6b7a89', 0, 1);
      }
      var num = 3 * N, g = p6aGcd(num, 10), n2 = num / g, d2 = 10 / g;
      var res = d2 === 1 ? String(n2) : n2 + '/' + d2;
      p6aTxt(ctx, 420, 110, '分子：3 × ' + N + ' = ' + num, '#185fa5');
      p6aTxt(ctx, 420, 150, '分母：10 不变', '#185fa5');
      p6aTxt(ctx, 420, 200, '结果 = ' + num + '/10', '#2c3e50', 1);
      if (d2 !== 10) p6aTxt(ctx, 420, 240, '化成最简 = ' + res, '#c0392b', 1);
      p6aTxt(ctx, 420, 300, '每加一个，分子就多 3', '#6b7a89');
      p6aTxt(ctx, 420, 334, '分母自始至终没变', '#0f6e56');
      p6aTxt(ctx, 60, 372, '意义：' + N + ' 个 3/10 = 3/10 × ' + N, '#6b7a89');
    } else if (mode === 1) {
      var cs = 22, gx = 70, gy = 330;
      p6aTxt(ctx, 60, 48, A + '/10 × ' + B + '/10：重叠占几格', '#2c3e50', 1);
      for (i = 0; i < 10; i++) for (j = 0; j < 10; j++) {
        var blue = i < A, yel = j < B, both = blue && yel;
        ctx.fillStyle = both ? '#0f6e56' : blue ? '#dceaf7' : yel ? '#fdf0d5' : '#fff';
        ctx.fillRect(gx + i * cs, gy - (j + 1) * cs, cs - 2, cs - 2);
        ctx.strokeStyle = both ? '#0f6e56' : '#c2cdd8'; ctx.lineWidth = both ? 1.6 : 1;
        ctx.strokeRect(gx + i * cs, gy - (j + 1) * cs, cs - 2, cs - 2);
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('整块 = 1 米²，共 100 格，每格 0.01 米²', gx, gy + 26);
      var num2 = A * B, g2 = p6aGcd(num2, 100);
      p6aTxt(ctx, 330, 110, '横向取 ' + A + ' 列（' + A + '/10）', '#185fa5');
      p6aTxt(ctx, 330, 148, '纵向取 ' + B + ' 行（' + B + '/10）', '#8a5a00');
      p6aTxt(ctx, 330, 196, '重叠 ' + A + '×' + B + ' = ' + num2 + ' 格', '#0f6e56', 1);
      p6aTxt(ctx, 330, 236, '所以积 = ' + num2 + '/100', '#2c3e50', 1);
      p6aTxt(ctx, 330, 276, '最简 = ' + (num2 / g2) + '/' + (100 / g2), '#c0392b', 1);
      p6aTxt(ctx, 330, 326, '分子乘积 = 分子', '#6b7a89');
      p6aTxt(ctx, 330, 356, '分母乘积 = 分母', '#6b7a89');
      p6aTxt(ctx, 330, 386, '这就是面积模型', '#185fa5');
    } else if (mode === 2) {
      var pre = [[1, 2], [3, 4], [2, 3], [5, 8]];
      var f = pre[Math.round(p.n) % 4], fn = f[0], fd = f[1];
      var val = 0.8 * fn / fd;
      p6aTxt(ctx, 60, 50, '0.8 × ' + fn + '/' + fd + '：两条路都通', '#2c3e50', 1);
      ctx.fillStyle = '#f4f8fc'; ctx.fillRect(56, 76, 250, 168);
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4; ctx.strokeRect(56, 76, 250, 168);
      p6aTxt(ctx, 72, 100, '路线①：小数化分数', '#185fa5');
      p6aTxt(ctx, 72, 134, '0.8 = 4/5', '#2c3e50');
      p6aTxt(ctx, 72, 168, '4/5 × ' + fn + '/' + fd, '#2c3e50');
      var gn = p6aGcd(4 * fn, 5 * fd);
      p6aTxt(ctx, 72, 202, '= ' + (4 * fn / gn) + '/' + (5 * fd / gn), '#0f6e56');
      p6aTxt(ctx, 72, 230, '= ' + (Math.round(val * 1000) / 1000), '#c0392b', 1);
      ctx.fillStyle = '#fdf7ee'; ctx.fillRect(330, 76, 250, 168);
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4; ctx.strokeRect(330, 76, 250, 168);
      p6aTxt(ctx, 346, 100, '路线②：先约分再乘', '#8a5a00');
      p6aTxt(ctx, 346, 134, '0.8 ÷ ' + fd + ' = ' + (Math.round(0.8 / fd * 1000) / 1000), '#2c3e50');
      p6aTxt(ctx, 346, 168, '再乘 ' + fn, '#2c3e50');
      p6aTxt(ctx, 346, 202, '= ' + (Math.round(val * 1000) / 1000), '#0f6e56');
      p6aTxt(ctx, 346, 230, '（分母能整除 8 时最快）', '#6b7a89');
      var ax0 = 80, ax1 = 560, ay = 330;
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(ax0, ay); ctx.lineTo(ax1, ay); ctx.stroke();
      for (i = 0; i <= 10; i++) {
        ctx.beginPath(); ctx.moveTo(ax0 + i * (ax1 - ax0) / 10, ay - 4); ctx.lineTo(ax0 + i * (ax1 - ax0) / 10, ay + 4); ctx.stroke();
      }
      p6aTxt(ctx, ax0, ay + 22, '0', '#6b7a89', 0, 1);
      p6aTxt(ctx, ax1, ay + 22, '1', '#6b7a89', 0, 1);
      var px = ax0 + val * (ax1 - ax0);
      ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(px, ay, 7, 0, Math.PI * 2); ctx.fill();
      p6aTxt(ctx, px, ay - 22, String(Math.round(val * 1000) / 1000), '#c0392b', 1, 1);
      p6aTxt(ctx, 300, 380, '两种算法答案一样，选顺手的', '#6b7a89');
    } else {
      var d1 = 4, first = T / d1, rest = T - first, second = rest / 3;
      p6aTxt(ctx, 60, 48, '总量 ' + T + ' 页：第一次 1/4，第二次剩下 1/3', '#2c3e50', 1);
      var bx = 90, bw2 = 460;
      ctx.fillStyle = '#eef2f6'; ctx.fillRect(bx, 92, bw2, 46);
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4; ctx.strokeRect(bx, 92, bw2, 46);
      ctx.fillStyle = '#b9d3ea'; ctx.fillRect(bx, 92, bw2 / d1, 46);
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.6; ctx.strokeRect(bx, 92, bw2 / d1, 46);
      p6aTxt(ctx, bx + bw2 / d1 / 2, 115, '第一次 ' + first, '#185fa5', 0, 1);
      p6aTxt(ctx, bx + bw2 / 2 + bw2 / d1 / 2, 115, '剩下 ' + rest + ' 页 ← 新的单位 1', '#6b7a89', 0, 1);
      p6aTxt(ctx, bx - 10, 115, '全书', '#6b7a89', 0, 1);
      var bx2 = 90 + bw2 / d1;
      ctx.fillStyle = '#f7f9fb'; ctx.fillRect(bx2, 182, bw2 - bw2 / d1, 46);
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4; ctx.strokeRect(bx2, 182, bw2 - bw2 / d1, 46);
      ctx.fillStyle = '#f0a05a'; ctx.fillRect(bx2, 182, (bw2 - bw2 / d1) / 3, 46);
      ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 1.6; ctx.strokeRect(bx2, 182, (bw2 - bw2 / d1) / 3, 46);
      p6aTxt(ctx, bx2 + (bw2 - bw2 / d1) / 6, 205, '第二次 ' + second, '#8a5a00', 0, 1);
      p6aTxt(ctx, bx2 + (bw2 - bw2 / d1) / 2, 250, '这一条只代表「剩下」的 ' + rest + ' 页', '#6b7a89', 0, 1);
      p6aTxt(ctx, 90, 300, '第一步：' + T + ' × 1/4 = ' + first + '（页）', '#185fa5');
      p6aTxt(ctx, 90, 334, '第二步：' + T + ' − ' + first + ' = ' + rest + '（页）', '#0f6e56');
      p6aTxt(ctx, 90, 368, '第三步：' + rest + ' × 1/3 = ' + second + '（页）', '#c0392b');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '分数乘整数：**分子乘整数，分母不变**。'
        : mode === 1 ? '分数乘分数：**分子乘分子、分母乘分母**。'
          : mode === 2 ? '小数乘分数：**化分数**或**先约分**。'
            : '连续求：**单位 1 换了一次**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) cSlider(s0.ctrl, '个数', N, 1, 5, 1, function (v) { N = v; p.n = v; draw(); });
  if (mode === 1) {
    cSlider(s0.ctrl, '横向分子', A, 1, 9, 1, function (v) { A = v; p.a = v; draw(); });
    cSlider(s0.ctrl, '纵向分子', B, 1, 9, 1, function (v) { B = v; p.b = v; draw(); });
  }
  if (mode === 3) cSlider(s0.ctrl, '总量', T, 60, 240, 60, function (v) { T = v; p.t = v; draw(); });
  draw();
}

/* 位置与方向（二） */
function p6aPos2Lab(el, cfg) {
  var p = Object.assign({ mode: 0, deg: 30, step: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), DEG = p.deg, STEP = Math.round(p.step);
  var info = s0.info;
  var RAD = Math.PI / 180;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    function cross(cx, cy, r) {
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();
    }
    if (mode === 0) {
      var cx = 210, cy = 222, R = 106, d = DEG * RAD;
      cross(cx, cy, R + 20);
      p6aTxt(ctx, cx + R + 26, cy, '东', '#c0392b');
      p6aTxt(ctx, cx - R - 34, cy, '西', '#6b7a89');
      p6aTxt(ctx, cx, cy - R - 24, '北', '#185fa5', 0, 1);
      p6aTxt(ctx, cx, cy + R + 24, '南', '#6b7a89', 0, 1);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(d), cy - R * Math.sin(d)); ctx.stroke();
      ctx.fillStyle = '#c0392b';
      ctx.beginPath(); ctx.arc(cx + R * Math.cos(d), cy - R * Math.sin(d), 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2.2;
      ctx.beginPath(); ctx.arc(cx, cy, 62, -d, 0); ctx.stroke();
      p6aTxt(ctx, cx + 88 * Math.cos(d / 2), cy - 88 * Math.sin(d / 2), DEG + '°', '#0f6e56', 1, 1);
      p6aTxt(ctx, 60, 48, '东偏北 ' + DEG + '°：从正东边往北转', '#2c3e50', 1);
      p6aTxt(ctx, 420, 120, '读法拆开看', '#6b7a89');
      p6aTxt(ctx, 420, 156, '「东」= 基准边（0° 刻度）', '#c0392b');
      p6aTxt(ctx, 420, 192, '「偏北」= 往北边转', '#185fa5');
      p6aTxt(ctx, 420, 228, '「' + DEG + '°」= 转过的角度', '#0f6e56');
      p6aTxt(ctx, 420, 286, '同一条射线还可以读作', '#6b7a89');
      p6aTxt(ctx, 420, 322, '北偏东 ' + (90 - DEG) + '°', '#2c3e50', 1);
      p6aTxt(ctx, 420, 356, '两个角加起来正好 90°', '#6b7a89');
      p6aTxt(ctx, 60, 372, '角度小于 45°：把小的方向放前面', '#6b7a89');
    } else if (mode === 1) {
      var ox = 140, oy = 320, ang = 30 * RAD, unit = 55;
      p6aTxt(ctx, 60, 48, '方向只定射线，距离才定点', '#2c3e50', 1);
      cross(ox, oy, 30);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ox + 300 * Math.cos(ang), oy - 300 * Math.sin(ang)); ctx.stroke();
      var ds = [100, 200, 300];
      for (i = 0; i < 3; i++) {
        var L = ds[i] / 100 * unit;
        var px = ox + L * Math.cos(ang), py = oy - L * Math.sin(ang);
        ctx.fillStyle = ['#185fa5', '#0f6e56', '#8a5a00'][i];
        ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill();
        p6aTxt(ctx, px + 14, py - 12, ds[i] + ' m', ['#185fa5', '#0f6e56', '#8a5a00'][i]);
      }
      p6aTxt(ctx, ox - 20, oy + 20, '观测点', '#c0392b', 0, 1);
      p6aTxt(ctx, 380, 300, '同一个方向的三个点', '#6b7a89');
      p6aTxt(ctx, 380, 336, '方向一样，位置不同', '#6b7a89');
      p6aTxt(ctx, 380, 372, '所以必须「方向 + 距离」', '#c0392b', 1);
      p6aTxt(ctx, 380, 110, '比例尺：图上 1 cm = 实际 100 m', '#185fa5');
    } else if (mode === 2) {
      var ccx = 210, ccy = 240, RR = 110, dd = 50 * RAD;
      p6aTxt(ctx, 60, 44, '标点四步（当前第 ' + STEP + ' 步）', '#2c3e50', 1);
      if (STEP >= 1) cross(ccx, ccy, RR + 16);
      if (STEP >= 2) {
        ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.6;
        ctx.beginPath(); ctx.moveTo(ccx, ccy); ctx.lineTo(ccx + RR * Math.cos(dd), ccy - RR * Math.sin(dd)); ctx.stroke();
        ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.8;
        ctx.beginPath(); ctx.arc(ccx, ccy, 48, -dd, 0); ctx.stroke();
        p6aTxt(ctx, ccx + 70 * Math.cos(dd / 2), ccy - 70 * Math.sin(dd / 2), '50°', '#0f6e56', 0, 1);
      }
      if (STEP >= 3) {
        var qx = ccx + 0.72 * RR * Math.cos(dd), qy = ccy - 0.72 * RR * Math.sin(dd);
        ctx.fillStyle = '#185fa5';
        ctx.beginPath(); ctx.arc(qx, qy, 9, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.moveTo(ccx, ccy); ctx.lineTo(qx, qy); ctx.stroke();
      }
      if (STEP >= 4) {
        p6aTxt(ctx, qx + 16, qy - 16, '公园', '#c0392b', 1);
        p6aTxt(ctx, qx + 16, qy + 8, '南偏东 50° 400 m', '#6b7a89');
      }
      p6aTxt(ctx, ccx, ccy + 22, '学校', '#2c3e50', 0, 1);
      var steps = ['① 以观测点画十字方向标', '② 从基准边量出角度画射线', '③ 按图上距离截取点', '④ 标名称与方向距离'];
      for (i = 0; i < 4; i++) {
        var on = (i + 1) <= STEP;
        p6aTxt(ctx, 380, 110 + i * 42, steps[i], on ? '#0f6e56' : '#b6c1cc', on ? 1 : 0);
      }
      p6aTxt(ctx, 380, 300, '顺序不能颠倒', '#6b7a89');
      p6aTxt(ctx, 380, 334, '先方向、后距离', '#c0392b', 1);
    } else {
      var ax = 110, ay = 320;
      p6aTxt(ctx, 60, 46, '路线：一段一段说，观测点每段都换', '#2c3e50', 1);
      var b1x = ax + 120, b1y = ay;
      var ang2 = 60 * RAD, c1x = b1x + 160 * Math.cos(ang2), c1y = b1y - 160 * Math.sin(ang2);
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(b1x, b1y); ctx.stroke();
      ctx.strokeStyle = '#0f6e56';
      ctx.beginPath(); ctx.moveTo(b1x, b1y); ctx.lineTo(c1x, c1y); ctx.stroke();
      [[ax, ay, '家', '#2c3e50'], [b1x, b1y, '少年宫', '#185fa5'], [c1x, c1y, '图书馆', '#0f6e56']].forEach(function (q) {
        ctx.fillStyle = q[3]; ctx.beginPath(); ctx.arc(q[0], q[1], 8, 0, Math.PI * 2); ctx.fill();
        p6aTxt(ctx, q[0], q[1] + 24, q[2], q[3], 0, 1);
      });
      p6aTxt(ctx, ax + 60, ay - 20, '正东 300 m', '#185fa5', 0, 1);
      p6aTxt(ctx, b1x + 24, b1y - 70, '北偏东 60°', '#0f6e56');
      p6aTxt(ctx, b1x + 24, b1y - 44, '400 m', '#0f6e56');
      p6aTxt(ctx, 400, 300, '第二段的方向以少年宫为准', '#6b7a89');
      p6aTxt(ctx, 400, 334, '回到起点：方向全相反', '#c0392b');
      p6aTxt(ctx, 400, 368, '西偏南 60° → 正西', '#c0392b');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '角度从**第一个方向字**那条边量起。'
        : mode === 1 ? '方向定射线，**距离**才定点。'
          : mode === 2 ? '四步：**方向标 → 量角 → 截距 → 标注**。'
            : '每段都写「方向 + 距离」。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) cSlider(s0.ctrl, '角度', DEG, 5, 85, 5, function (v) { DEG = v; p.deg = v; draw(); });
  if (mode === 2) cSlider(s0.ctrl, '步骤', STEP, 1, 4, 1, function (v) { STEP = v; p.step = v; draw(); });
  draw();
}

/* 分数除法 */
function p6aFdivLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 3, b: 5, k: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), Bd = Math.round(p.b), K = Math.round(p.k);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    if (mode === 0) {
      p6aTxt(ctx, 60, 48, '分子分母交换位置，乘积正好是 1', '#2c3e50', 1);
      ctx.fillStyle = '#f4f8fc'; ctx.fillRect(90, 96, 150, 120);
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.6; ctx.strokeRect(90, 96, 150, 120);
      p6aFrac(ctx, 165, 156, A, Bd, '#185fa5', 30);
      p6aTxt(ctx, 268, 156, '×', '#2c3e50', 1, 1);
      ctx.fillStyle = '#fdf7ee'; ctx.fillRect(300, 96, 150, 120);
      ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 1.6; ctx.strokeRect(300, 96, 150, 120);
      p6aFrac(ctx, 375, 156, Bd, A, '#8a5a00', 30);
      p6aTxt(ctx, 486, 156, '=', '#2c3e50', 1, 1);
      ctx.fillStyle = '#e2f2ea'; ctx.fillRect(510, 106, 90, 100);
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.6; ctx.strokeRect(510, 106, 90, 100);
      p6aTxt(ctx, 555, 156, '1', '#0f6e56', 1, 1);
      p6aTxt(ctx, 90, 254, '验证：(' + A + ' × ' + Bd + ') ÷ (' + Bd + ' × ' + A + ') = 1', '#0f6e56');
      p6aTxt(ctx, 90, 292, A + '/' + Bd + ' 的倒数是 ' + Bd + '/' + A, '#2c3e50', 1);
      p6aTxt(ctx, 90, 330, '整数 ' + Bd + ' 写成 ' + Bd + '/1，倒数是 1/' + Bd, '#6b7a89');
      p6aTxt(ctx, 90, 364, '1 的倒数是 1；0 没有倒数', '#c0392b');
    } else if (mode === 1) {
      var pre = [[3, 8], [1, 2], [2, 3], [4, 5]];
      var f = pre[Math.round(p.k) % 4], dn = f[0], dd = f[1];
      p6aTxt(ctx, 60, 48, '3/4 ÷ ' + dn + '/' + dd + '：三步变成乘法', '#2c3e50', 1);
      var y1 = 132;
      p6aFrac(ctx, 150, y1, 3, 4, '#185fa5', 30);
      p6aTxt(ctx, 200, y1, '÷', '#c0392b', 1, 1);
      p6aFrac(ctx, 250, y1, dn, dd, '#c0392b', 30);
      p6aTxt(ctx, 330, y1 - 16, '① 被除数不变', '#185fa5');
      p6aTxt(ctx, 330, y1 + 12, '② 除号变乘号', '#c0392b');
      p6aTxt(ctx, 330, y1 + 40, '③ 除数取倒数', '#0f6e56');
      p6aTxt(ctx, 250, y1 + 62, '↓ 全部照做', '#6b7a89', 0, 1);
      p6aFrac(ctx, 150, 244, 3, 4, '#185fa5', 30);
      p6aTxt(ctx, 200, 244, '×', '#2c3e50', 1, 1);
      p6aFrac(ctx, 250, 244, dd, dn, '#0f6e56', 30);
      var rn = 3 * dd, rd = 4 * dn, g = p6aGcd(rn, rd);
      p6aTxt(ctx, 330, 244, '= ' + (rn / g) + '/' + (rd / g), '#c0392b', 1);
      p6aTxt(ctx, 60, 320, '原式结果：' + (rn / g) + '/' + (rd / g) + (rd / g === 1 ? '' : ' = ' + (Math.round(rn / rd * 1000) / 1000)), '#2c3e50', 1);
      p6aTxt(ctx, 60, 360, '只倒除数，被除数绝不能倒', '#c0392b');
    } else if (mode === 2) {
      p6aTxt(ctx, 60, 44, '同一个式子，两种做法只对一个', '#2c3e50', 1);
      ctx.fillStyle = '#eef8f2'; ctx.fillRect(56, 70, 528, 122);
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.6; ctx.strokeRect(56, 70, 528, 122);
      p6aTxt(ctx, 74, 96, '✓ 连除从左往右（或全变乘倒数）', '#0f6e56', 1);
      p6aTxt(ctx, 74, 130, '2/3 ÷ 4/9 × 3/8', '#2c3e50');
      p6aTxt(ctx, 74, 162, '= 2/3 × 9/4 × 3/8 = 9/16', '#2c3e50', 1);
      ctx.fillStyle = '#fdf0ef'; ctx.fillRect(56, 206, 528, 122);
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.6; ctx.strokeRect(56, 206, 528, 122);
      p6aTxt(ctx, 74, 232, '✗ 先算后面的乘法', '#c0392b', 1);
      p6aTxt(ctx, 74, 266, '2/3 ÷ (4/9 × 3/8) = 2/3 ÷ 1/6', '#2c3e50');
      p6aTxt(ctx, 74, 298, '= 4（错，乘法除法同级要按顺序）', '#c0392b', 1);
      p6aTxt(ctx, 60, 356, '同级的运算，从左往右；除法没有分配律', '#8a5a00');
    } else {
      var tot = 5, paint = K;
      p6aTxt(ctx, 60, 46, '已知 ' + paint + '/' + tot + ' 是 24，求整体', '#2c3e50', 1);
      var bx = 90, bw = 380, cw = bw / tot, by = 110, bh = 56;
      for (i = 0; i < tot; i++) {
        ctx.fillStyle = i < paint ? '#b9d3ea' : '#eef2f6';
        ctx.fillRect(bx + i * cw, by, cw - 2, bh);
        ctx.strokeStyle = i < paint ? '#185fa5' : '#c2cdd8'; ctx.lineWidth = i < paint ? 1.8 : 1.2;
        ctx.strokeRect(bx + i * cw, by, cw - 2, bh);
      }
      p6aTxt(ctx, bx + paint * cw / 2, by + bh / 2, '24', '#185fa5', 1, 1);
      p6aTxt(ctx, bx + bw - (tot - paint) * cw / 2, by + bh / 2, '?', '#6b7a89', 1, 1);
      p6aTxt(ctx, bx + bw / 2, by + bh + 26, '整体 = 单位 1（未知）', '#6b7a89', 0, 1);
      var each = 24 / paint;
      p6aTxt(ctx, 90, 226, '① 每份：24 ÷ ' + paint + ' = ' + (Math.round(each * 100) / 100), '#0f6e56');
      p6aTxt(ctx, 90, 262, '② 整体：' + (Math.round(each * 100) / 100) + ' × ' + tot + ' = ' + (Math.round(each * tot * 100) / 100), '#185fa5');
      p6aTxt(ctx, 90, 298, '一步到位：24 ÷ ' + paint + '/' + tot + ' = ' + (Math.round(each * tot * 100) / 100), '#c0392b', 1);
      p6aTxt(ctx, 90, 342, '对应量 ÷ 对应分率 = 单位 1', '#2c3e50', 1);
      p6aTxt(ctx, 90, 378, '验算：' + (Math.round(each * tot * 100) / 100) + ' × ' + paint + '/' + tot + ' = 24 ✓', '#6b7a89');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '倒数：**分子分母交换**，乘积为 1。'
        : mode === 1 ? '一不变、二变号、**三取倒**。'
          : mode === 2 ? '同级运算**从左往右**，除法无分配律。'
            : '对应量 ÷ 对应分率 = **单位 1**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) {
    cSlider(s0.ctrl, '分子', A, 1, 8, 1, function (v) { A = v; p.a = v; draw(); });
    cSlider(s0.ctrl, '分母', Bd, 2, 9, 1, function (v) { Bd = v; p.b = v; draw(); });
  }
  if (mode === 1) cSlider(s0.ctrl, '换一组除数', K, 0, 3, 1, function (v) { K = v; p.k = v; draw(); });
  if (mode === 3) cSlider(s0.ctrl, '涂色份数', K, 1, 4, 1, function (v) { K = v; p.k = v; draw(); });
  draw();
}

/* 比 */
function p6aRatioLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 3, b: 2, total: 60 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b), TT = Math.round(p.total);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    function box(x, y, ww, hh, fill, stroke, t1, t2, c) {
      ctx.fillStyle = fill; ctx.fillRect(x, y, ww, hh);
      ctx.strokeStyle = stroke; ctx.lineWidth = 1.6; ctx.strokeRect(x, y, ww, hh);
      p6aTxt(ctx, x + ww / 2, y + hh / 2 - 12, t1, c, 1, 1);
      if (t2) p6aTxt(ctx, x + ww / 2, y + hh / 2 + 14, t2, '#6b7a89', 0, 1);
    }
    if (mode === 0) {
      p6aTxt(ctx, 60, 48, '同一件事的三种写法', '#2c3e50', 1);
      box(60, 92, 160, 84, '#f4f8fc', '#185fa5', A + ' : ' + B, '比', '#185fa5');
      box(240, 92, 160, 84, '#fdf7ee', '#8a5a00', A + ' ÷ ' + B, '除法', '#8a5a00');
      box(420, 92, 160, 84, '#eef8f2', '#0f6e56', A + '/' + B, '分数', '#0f6e56');
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6;
      [[220, 134, 240, 134], [400, 134, 420, 134]].forEach(function (q) {
        ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(q[2], q[3]); ctx.stroke();
      });
      p6aTxt(ctx, 60, 210, '前项 = 被除数 = 分子：' + A, '#185fa5');
      p6aTxt(ctx, 60, 244, '后项 = 除数 = 分母：' + B, '#8a5a00');
      p6aTxt(ctx, 60, 278, '比值 = 商 = 分数值：' + (Math.round(A / B * 100) / 100), '#0f6e56');
      p6aTxt(ctx, 60, 322, '比表示「关系」，不是一个具体的数量', '#6b7a89');
      p6aTxt(ctx, 60, 358, '后项不能是 0（除数不能为 0）', '#c0392b');
      var g = p6aGcd(A, B);
      p6aTxt(ctx, 400, 210, '这个比可化简为', '#6b7a89');
      p6aTxt(ctx, 400, 248, A / g + ' : ' + B / g, '#c0392b', 1, 1);
      p6aTxt(ctx, 400, 290, '比值本身不变', '#6b7a89', 0, 1);
    } else if (mode === 1) {
      p6aTxt(ctx, 60, 46, '化简比：一路做到互质', '#2c3e50', 1);
      var chain = ['0.6 : 0.15', '× 100', '60 : 15', '÷ 15', '4 : 1'];
      var cols = ['#185fa5', '#6b7a89', '#185fa5', '#6b7a89', '#0f6e56'];
      for (i = 0; i < 5; i++) {
        var x = 60 + i * 112;
        box(x, 96, 96, 62, i % 2 ? '#f7f9fb' : '#f4f8fc', i % 2 ? '#c2cdd8' : '#185fa5', chain[i], null, cols[i]);
      }
      p6aTxt(ctx, 60, 200, '小数比：前后项同乘 10 或 100', '#185fa5');
      p6aTxt(ctx, 60, 234, '整数比：前后项同除最大公因数', '#0f6e56');
      p6aTxt(ctx, 60, 268, '分数比：前后项同乘分母的最小公倍数', '#8a5a00');
      box(60, 300, 240, 68, '#eef8f2', '#0f6e56', '化简比 → 4 : 1', '结果是一个「比」', '#0f6e56');
      box(330, 300, 240, 68, '#fdf0ef', '#c0392b', '求比值 → 4', '结果是一个「数」', '#c0392b');
    } else if (mode === 2) {
      var tot = A + B, each = TT / tot, bw = 440, bx = 80, cw = bw / tot;
      p6aTxt(ctx, 60, 46, '把 ' + TT + ' 按 ' + A + ' : ' + B + ' 分', '#2c3e50', 1);
      for (i = 0; i < tot; i++) {
        var isA = i < A;
        ctx.fillStyle = isA ? '#b9d3ea' : '#f9dcbc';
        ctx.fillRect(bx + i * cw, 100, cw - 2, 54);
        ctx.strokeStyle = isA ? '#185fa5' : '#8a5a00'; ctx.lineWidth = 1.6;
        ctx.strokeRect(bx + i * cw, 100, cw - 2, 54);
      }
      p6aTxt(ctx, bx + A * cw / 2, 176, '甲 ' + A + ' 份', '#185fa5', 0, 1);
      p6aTxt(ctx, bx + bw - B * cw / 2, 176, '乙 ' + B + ' 份', '#8a5a00', 0, 1);
      p6aTxt(ctx, 80, 226, '① 总份数 = ' + A + ' + ' + B + ' = ' + tot, '#6b7a89');
      p6aTxt(ctx, 80, 262, '② 每份 = ' + TT + ' ÷ ' + tot + ' = ' + (Math.round(each * 100) / 100), '#0f6e56');
      p6aTxt(ctx, 80, 298, '③ 甲 = ' + (Math.round(each * A * 100) / 100) + '，乙 = ' + (Math.round(each * B * 100) / 100), '#185fa5');
      p6aTxt(ctx, 80, 336, '检验：' + (Math.round(each * A * 100) / 100) + ' + ' + (Math.round(each * B * 100) / 100) + ' = ' + TT + ' ✓', '#c0392b');
      p6aTxt(ctx, 80, 374, '也可以：甲 = 总量 × ' + A + '/' + tot + '（同一个答案）', '#6b7a89');
    } else {
      var tot2 = 9, bw2 = 405, bx2 = 90, cw2 = bw2 / tot2;
      p6aTxt(ctx, 60, 46, '男生 : 女生 = 5 : 4，男生 25 人', '#2c3e50', 1);
      for (i = 0; i < tot2; i++) {
        var male = i < 5;
        ctx.fillStyle = male ? '#b9d3ea' : '#f9dcbc';
        ctx.fillRect(bx2 + i * cw2, 100, cw2 - 3, 60);
        ctx.strokeStyle = male ? '#185fa5' : '#8a5a00'; ctx.lineWidth = 1.6;
        ctx.strokeRect(bx2 + i * cw2, 100, cw2 - 3, 60);
        p6aTxt(ctx, bx2 + i * cw2 + cw2 / 2 - 1, 130, male ? '5' : '5', '#6b7a89', 0, 1);
      }
      p6aTxt(ctx, bx2 + 5 * cw2 / 2, 186, '25 人（5 份）', '#185fa5', 1, 1);
      p6aTxt(ctx, bx2 + bw2 - 4 * cw2 / 2, 186, '4 份 = ?', '#8a5a00', 1, 1);
      p6aTxt(ctx, bx2 + bw2 / 2, 216, '总份数 5 + 4 = 9', '#6b7a89', 0, 1);
      var each2 = 5;
      p6aTxt(ctx, 90, 258, '① 每份 = 25 ÷ 5 = ' + each2 + '（人）', '#0f6e56');
      p6aTxt(ctx, 90, 294, '② 女生 = ' + each2 + ' × 4 = ' + (each2 * 4) + '（人）', '#8a5a00');
      p6aTxt(ctx, 90, 330, '③ 全班 = ' + each2 + ' × 9 = ' + (each2 * 9) + '（人）', '#c0392b', 1);
      p6aTxt(ctx, 90, 368, '先求一份，其余全靠它推', '#6b7a89');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '比 = 除法 = 分数，**写法不同意思一样**。'
        : mode === 1 ? '化简比靠**基本性质**：同乘同除不变。'
          : mode === 2 ? '按比分配：**总份 → 每份 → 各部分**。'
            : '已知部分先求**每份**，再推全部。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) {
    cSlider(s0.ctrl, '前项', A, 1, 9, 1, function (v) { A = v; p.a = v; draw(); });
    cSlider(s0.ctrl, '后项', B, 1, 9, 1, function (v) { B = v; p.b = v; draw(); });
  }
  if (mode === 2) {
    cSlider(s0.ctrl, '甲的份数', A, 1, 6, 1, function (v) { A = v; p.a = v; draw(); });
    cSlider(s0.ctrl, '乙的份数', B, 1, 6, 1, function (v) { B = v; p.b = v; draw(); });
    cSlider(s0.ctrl, '总量', TT, 30, 120, 30, function (v) { TT = v; p.total = v; draw(); });
  }
  draw();
}

/* 圆 */
function p6aCircleLab(el, cfg) {
  var p = Object.assign({ mode: 0, r: 80, rr: 40 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), R = Math.round(p.r), IN = Math.round(p.rr);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    var PI = 3.14;
    if (mode === 0) {
      var cx = 200, cy = 210;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = '#f4f8fc'; ctx.fill();
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.4; ctx.stroke();
      for (i = 0; i < 12; i++) {
        var a = i * Math.PI / 6;
        ctx.strokeStyle = '#9dc0dd'; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a)); ctx.stroke();
      }
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.moveTo(cx - R, cy); ctx.lineTo(cx + R, cy); ctx.stroke();
      ctx.fillStyle = '#2c3e50'; ctx.beginPath(); ctx.arc(cx, cy, 5, 0, Math.PI * 2); ctx.fill();
      p6aTxt(ctx, cx, cy - 16, 'O', '#2c3e50', 1, 1);
      p6aTxt(ctx, cx + R / 2, cy - 16, 'r = ' + R, '#c0392b', 0, 1);
      p6aTxt(ctx, cx, cy + 18, 'd = ' + 2 * R, '#0f6e56', 0, 1);
      p6aTxt(ctx, 380, 96, '圆心 O 位置，半径 r 大小', '#2c3e50');
      p6aTxt(ctx, 380, 132, '12 条半径都一样长', '#185fa5');
      p6aTxt(ctx, 380, 168, 'd = 2r = ' + 2 * R, '#0f6e56');
      p6aTxt(ctx, 380, 204, 'r = d ÷ 2 = ' + (2 * R / 2), '#0f6e56');
      p6aTxt(ctx, 380, 250, '对称轴：无数条', '#8a5a00');
      p6aTxt(ctx, 380, 286, '（每条直径所在直线）', '#6b7a89');
      p6aTxt(ctx, 380, 330, '周长 C = 2πr = ' + (Math.round(2 * PI * R * 100) / 100), '#185fa5');
      p6aTxt(ctx, 380, 366, '面积 S = πr² = ' + (Math.round(PI * R * R * 100) / 100), '#c0392b');
    } else if (mode === 1) {
      var r2 = 46, d2 = 2 * r2, c2 = PI * d2;
      p6aTxt(ctx, 60, 48, '把圆在地上滚一圈，正好是 πd', '#2c3e50', 1);
      var cxx = 110, cyy = 210;
      ctx.beginPath(); ctx.arc(cxx, cyy, r2, 0, Math.PI * 2);
      ctx.fillStyle = '#dceaf7'; ctx.fill();
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.2; ctx.stroke();
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cxx, cyy); ctx.lineTo(cxx + r2, cyy); ctx.stroke();
      ctx.fillStyle = '#185fa5'; ctx.beginPath(); ctx.arc(cxx, cyy, 4, 0, Math.PI * 2); ctx.fill();
      p6aTxt(ctx, cxx, cyy + r2 + 18, 'd = ' + d2, '#6b7a89', 0, 1);
      var lx0 = 110, lx1 = lx0 + c2, ly = 300;
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2.4;
      ctx.beginPath(); ctx.moveTo(lx0, ly); ctx.lineTo(lx1, ly); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(lx1, ly); ctx.lineTo(lx1 - 10, ly - 5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(lx1, ly); ctx.lineTo(lx1 - 10, ly + 5); ctx.stroke();
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(lx0, ly - 12); ctx.lineTo(lx0, ly + 12); ctx.stroke();
      p6aTxt(ctx, lx0, ly + 26, '起点', '#6b7a89', 0, 1);
      p6aTxt(ctx, lx0 + c2 / 2, ly - 22, '滚过的长度 = 周长 C', '#c0392b', 0, 1);
      p6aTxt(ctx, 60, 360, 'C = πd = 3.14 × ' + d2 + ' = ' + (Math.round(c2 * 100) / 100), '#c0392b', 1);
      p6aTxt(ctx, 400, 200, '不管圆多大多小', '#6b7a89');
      p6aTxt(ctx, 400, 236, '周长 ÷ 直径总是 3.14…', '#185fa5');
      p6aTxt(ctx, 400, 272, '这个数叫圆周率 π', '#c0392b', 1);
    } else if (mode === 2) {
      var r3 = 62, cx3 = 150, cy3 = 200;
      p6aTxt(ctx, 60, 46, '切成小扇形，一正一反拼起来', '#2c3e50', 1);
      for (i = 0; i < 12; i++) {
        var a0 = i * Math.PI / 6, a1 = a0 + Math.PI / 6;
        ctx.beginPath(); ctx.moveTo(cx3, cy3);
        ctx.arc(cx3, cy3, r3, a0, a1); ctx.closePath();
        ctx.fillStyle = i % 2 ? '#dceaf7' : '#b9d3ea'; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.2; ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(cx3, cy3, r3, 0, Math.PI * 2);
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2; ctx.stroke();
      p6aTxt(ctx, cx3, cy3 + r3 + 22, '平均分成 12 份', '#6b7a89', 0, 1);
      var rx = 300, ry = 130, rw = Math.PI * r3 * 0.86, rh = r3 * 0.9;
      var cols = ['#b9d3ea', '#dceaf7'];
      for (i = 0; i < 12; i++) {
        var cwid = rw / 12;
        ctx.fillStyle = cols[i % 2];
        if (i % 2) {
          ctx.beginPath();
          ctx.moveTo(rx + i * cwid, ry + rh);
          ctx.lineTo(rx + i * cwid, ry);
          ctx.lineTo(rx + (i + 1) * cwid, ry + 0); 
          ctx.lineTo(rx + (i + 1) * cwid, ry + rh);
          ctx.closePath(); ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(rx + i * cwid, ry);
          ctx.lineTo(rx + i * cwid, ry + rh);
          ctx.lineTo(rx + (i + 1) * cwid, ry + rh);
          ctx.lineTo(rx + (i + 1) * cwid, ry);
          ctx.closePath(); ctx.fill();
        }
        ctx.strokeStyle = '#9dc0dd'; ctx.lineWidth = 0.8; ctx.stroke();
      }
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2;
      ctx.strokeRect(rx, ry, rw, rh);
      p6aTxt(ctx, rx + rw / 2, ry - 20, '长 ≈ πr', '#0f6e56', 1, 1);
      p6aTxt(ctx, rx - 16, ry + rh / 2, 'r', '#c0392b', 1, 1);
      p6aTxt(ctx, 60, 300, '长方形面积 = 长 × 宽 = πr × r = πr²', '#c0392b', 1);
      p6aTxt(ctx, 60, 338, '分得越多越接近长方形', '#6b7a89');
      p6aTxt(ctx, 60, 372, '所以圆面积 S = πr²', '#0f6e56', 1);
    } else {
      var cx4 = 170, cy4 = 200, Ro = R, Ri = Math.min(IN, R - 10);
      ctx.beginPath(); ctx.arc(cx4, cy4, Ro, 0, Math.PI * 2);
      ctx.fillStyle = '#dceaf7'; ctx.fill();
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.2; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx4, cy4, Ri, 0, Math.PI * 2);
      ctx.fillStyle = '#fff'; ctx.fill();
      ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(cx4, cy4); ctx.lineTo(cx4 + Ro, cy4); ctx.stroke();
      ctx.strokeStyle = '#8a5a00';
      ctx.beginPath(); ctx.moveTo(cx4, cy4); ctx.lineTo(cx4, cy4 - Ri); ctx.stroke();
      p6aTxt(ctx, cx4 + Ro / 2, cy4 + 16, 'R = ' + Ro, '#c0392b', 0, 1);
      p6aTxt(ctx, cx4 + 8, cy4 - Ri / 2, 'r = ' + Ri, '#8a5a00');
      var ringA = PI * (Ro * Ro - Ri * Ri);
      p6aTxt(ctx, 380, 96, '圆环 = 大圆 − 小圆', '#2c3e50', 1);
      p6aTxt(ctx, 380, 134, 'πR² − πr² = π(R² − r²)', '#185fa5');
      p6aTxt(ctx, 380, 172, '= 3.14 × (' + Ro + '² − ' + Ri + '²)', '#185fa5');
      p6aTxt(ctx, 380, 210, '= ' + (Math.round(ringA * 100) / 100), '#c0392b', 1);
      p6aTxt(ctx, 380, 258, '扇形：圆心角 90° 占整圆 1/4', '#0f6e56');
      ctx.beginPath(); ctx.moveTo(380, 340); ctx.arc(380, 340, 44, -Math.PI / 2, 0); ctx.closePath();
      ctx.fillStyle = '#f9dcbc'; ctx.fill();
      ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 1.6; ctx.stroke();
      p6aTxt(ctx, 440, 340, '90° → 1/4 面积', '#8a5a00');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**d = 2r**，同圆半径全相等。'
        : mode === 1 ? '**C = πd = 2πr**。'
          : mode === 2 ? '割补成长方形 → **S = πr²**。'
            : '圆环 **π(R²−r²)**；扇形按角度占比。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) cSlider(s0.ctrl, '半径', R, 50, 120, 5, function (v) { R = v; p.r = v; draw(); });
  if (mode === 3) {
    cSlider(s0.ctrl, '外半径 R', R, 60, 120, 5, function (v) { R = v; p.r = v; draw(); });
    cSlider(s0.ctrl, '内半径 r', IN, 20, 100, 5, function (v) { IN = v; p.rr = v; draw(); });
  }
  draw();
}

/* 百分数（一） */
function p6aPctLab(el, cfg) {
  var p = Object.assign({ mode: 0, pct: 45, ok: 196, a: 4, b: 5 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), PC = Math.round(p.pct), OK = Math.round(p.ok), AV = Math.round(p.a), BV = Math.round(p.b);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, j;
    if (mode === 0) {
      var cs = 20, gx = 70, gy = 320;
      p6aTxt(ctx, 60, 44, PC + '% 就是把 100 格里涂 ' + PC + ' 格', '#2c3e50', 1);
      var filled = 0;
      for (j = 0; j < 10; j++) for (i = 0; i < 10; i++) {
        var on = filled < PC; filled++;
        ctx.fillStyle = on ? '#b9d3ea' : '#fff';
        ctx.fillRect(gx + i * cs, gy - (j + 1) * cs, cs - 2, cs - 2);
        ctx.strokeStyle = on ? '#185fa5' : '#c2cdd8'; ctx.lineWidth = on ? 1.4 : 1;
        ctx.strokeRect(gx + i * cs, gy - (j + 1) * cs, cs - 2, cs - 2);
      }
      p6aTxt(ctx, gx, gy + 24, '整块 = 100%', '#6b7a89');
      p6aTxt(ctx, 330, 100, '读作：百分之' + PC, '#2c3e50', 1);
      p6aTxt(ctx, 330, 140, '写成分数：' + PC + '/100', '#185fa5');
      p6aTxt(ctx, 330, 180, '写成小数：' + (PC / 100), '#0f6e56');
      var g = p6aGcd(PC, 100);
      p6aTxt(ctx, 330, 220, '约分后：' + (PC / g) + '/' + (100 / g), '#8a5a00');
      p6aTxt(ctx, 330, 276, '百分数表示「谁是谁的百分之几」', '#6b7a89');
      p6aTxt(ctx, 330, 312, '所以后面不能带单位', '#c0392b', 1);
      p6aTxt(ctx, 330, 348, '45% ≠ 45/100 米', '#c0392b');
    } else if (mode === 1) {
      var pre = [[0.45, '9/20', '45%'], [0.375, '3/8', '37.5%'], [1.2, '6/5', '120%']];
      var ex = pre[Math.round(p.ok) % 3];
      p6aTxt(ctx, 60, 44, '三者互化：沿着箭头走一圈', '#2c3e50', 1);
      function node(x, y, t1, t2, c, fill) {
        ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, 52, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = c; ctx.lineWidth = 2.2; ctx.stroke();
        p6aTxt(ctx, x, y - 12, t1, c, 1, 1);
        p6aTxt(ctx, x, y + 14, t2, '#6b7a89', 0, 1);
      }
      node(140, 130, String(ex[0]), '小数', '#185fa5', '#f4f8fc');
      node(470, 130, ex[1], '分数', '#8a5a00', '#fdf7ee');
      node(305, 300, ex[2], '百分数', '#0f6e56', '#eef8f2');
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(196, 118); ctx.lineTo(414, 118); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(430, 176); ctx.lineTo(348, 252); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(180, 172); ctx.lineTo(262, 250); ctx.stroke();
      p6aTxt(ctx, 305, 104, '化成分数（看小数位）', '#6b7a89', 0, 1);
      p6aTxt(ctx, 418, 214, '分子÷分母', '#6b7a89');
      p6aTxt(ctx, 168, 218, '× 100%', '#6b7a89');
      p6aTxt(ctx, 60, 356, '互化只改写法，大小不变', '#6b7a89');
      p6aTxt(ctx, 60, 384, '百分数 → 小数：去 % 左移两位', '#c0392b');
    } else if (mode === 2) {
      var total = 200, good = Math.min(OK, total), rate = good / total;
      p6aTxt(ctx, 60, 44, '合格率 = 合格数 ÷ 总数', '#2c3e50', 1);
      var bx = 70, bw = 500, by = 120, bh = 56;
      ctx.fillStyle = '#eef2f6'; ctx.fillRect(bx, by, bw, bh);
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.4; ctx.strokeRect(bx, by, bw, bh);
      ctx.fillStyle = '#a8d5c2'; ctx.fillRect(bx, by, bw * rate, bh);
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.8; ctx.strokeRect(bx, by, bw * rate, bh);
      p6aTxt(ctx, bx, by + bh + 26, '合格 ' + good + ' 个', '#0f6e56', 1);
      p6aTxt(ctx, bx + bw, by + bh + 26, '总数 ' + total + ' 个', '#6b7a89', 1, 1);
      p6aTxt(ctx, 70, 246, '合格率 = ' + good + ' ÷ ' + total + ' = ' + (Math.round(rate * 1000) / 1000), '#2c3e50', 1);
      p6aTxt(ctx, 70, 288, '化成百分数 = ' + (Math.round(rate * 1000) / 10) + '%', '#c0392b', 1);
      p6aTxt(ctx, 70, 330, '常见百分率都是「部分 ÷ 总数」', '#6b7a89');
      p6aTxt(ctx, 70, 366, '合格率、出勤率、成活率、命中率…', '#6b7a89');
    } else {
      var big = Math.max(AV, BV), small = Math.min(AV, BV), diff = big - small;
      p6aTxt(ctx, 60, 44, '差一样，分母不同，答案就不同', '#2c3e50', 1);
      var bx2 = 90, uw = 56;
      [['A', AV, '#b9d3ea', '#185fa5', 110], ['B', BV, '#f9dcbc', '#8a5a00', 210]].forEach(function (q) {
        for (i = 0; i < q[1]; i++) {
          ctx.fillStyle = q[2]; ctx.fillRect(bx2 + i * uw, q[4], uw - 6, 56);
          ctx.strokeStyle = q[3]; ctx.lineWidth = 1.5; ctx.strokeRect(bx2 + i * uw, q[4], uw - 6, 56);
        }
        p6aTxt(ctx, bx2 - 24, q[4] + 28, q[0], q[3], 1, 1);
        p6aTxt(ctx, bx2 + q[1] * uw + 8, q[4] + 28, q[1], q[3], 1);
      });
      p6aTxt(ctx, 90, 300, 'A 比 B 少：' + diff + ' ÷ ' + BV + ' = ' + (Math.round(diff / BV * 1000) / 10) + '%', '#185fa5', 1);
      p6aTxt(ctx, 90, 340, 'B 比 A 多：' + diff + ' ÷ ' + AV + ' = ' + (Math.round(diff / AV * 1000) / 10) + '%', '#8a5a00', 1);
      p6aTxt(ctx, 90, 378, '分母 = 「比」字后面那个量', '#c0392b');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '百分数 = **分母 100 的分数**，不带单位。'
        : mode === 1 ? '互化只**搬小数点**，大小不变。'
          : mode === 2 ? '百分率 = **部分 ÷ 总数**。'
            : '多（少）百分之几，分母是**基准量**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) cSlider(s0.ctrl, '百分比', PC, 0, 100, 5, function (v) { PC = v; p.pct = v; draw(); });
  if (mode === 1) cSlider(s0.ctrl, '换例子', OK, 0, 2, 1, function (v) { OK = v; p.ok = v; draw(); });
  if (mode === 2) cSlider(s0.ctrl, '合格数', OK, 0, 200, 4, function (v) { OK = v; p.ok = v; draw(); });
  if (mode === 3) {
    cSlider(s0.ctrl, 'A', AV, 1, 9, 1, function (v) { AV = v; p.a = v; draw(); });
    cSlider(s0.ctrl, 'B', BV, 1, 9, 1, function (v) { BV = v; p.b = v; draw(); });
  }
  draw();
}

/* 扇形统计图 */
function p6aPieLab(el, cfg) {
  var p = Object.assign({ mode: 0, pct: 30, total: 200 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), PC = Math.round(p.pct), TT = Math.round(p.total);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
    var COL = ['#b9d3ea', '#f9dcbc', '#a8d5c2', '#e3c7dd'];
    var EDGE = ['#185fa5', '#8a5a00', '#0f6e56', '#8a3b6b'];
    function pie(cx, cy, r, parts, labels, startDeg) {
      var acc = startDeg !== undefined ? startDeg : -90;
      for (i = 0; i < parts.length; i++) {
        var sweep = parts[i] / 100 * 360;
        var a0 = acc * Math.PI / 180, a1 = (acc + sweep) * Math.PI / 180;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a0, a1); ctx.closePath();
        ctx.fillStyle = COL[i % 4]; ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
        if (sweep > 24) {
          var am = (acc + sweep / 2) * Math.PI / 180;
          p6aTxt(ctx, cx + r * 0.62 * Math.cos(am), cy + r * 0.62 * Math.sin(am), parts[i] + '%', EDGE[i % 4], 0, 1);
        }
        acc += sweep;
      }
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2; ctx.stroke();
    }
    if (mode === 0 || mode === 1) {
      var parts = [30, 25, 20, 25];
      var names = ['篮球', '足球', '跳绳', '其他'];
      pie(180, 200, 120, parts);
      p6aTxt(ctx, 60, 44, '整个圆 = 100%，四块之和 = 30+25+20+25 = 100%', '#2c3e50', 1);
      for (i = 0; i < 4; i++) {
        var ly = 110 + i * 46;
        ctx.fillStyle = COL[i]; ctx.fillRect(360, ly - 10, 22, 22);
        ctx.strokeStyle = EDGE[i]; ctx.lineWidth = 1.4; ctx.strokeRect(360, ly - 10, 22, 22);
        p6aTxt(ctx, 394, ly, names[i] + ' ' + parts[i] + '%', EDGE[i], 1);
        if (mode === 1) p6aTxt(ctx, 500, ly, '= ' + (TT * parts[i] / 100) + ' 人', '#6b7a89');
      }
      if (mode === 0) {
        p6aTxt(ctx, 360, 320, '扇形只表示「占比」', '#6b7a89');
        p6aTxt(ctx, 360, 354, '不加总量就不知道具体人数', '#c0392b');
      } else {
        p6aTxt(ctx, 360, 306, '总量 ' + TT + ' 人', '#2c3e50', 1);
        p6aTxt(ctx, 360, 342, '部分量 = 总量 × 百分比', '#185fa5');
        p6aTxt(ctx, 360, 376, '总量 = 部分量 ÷ 百分比', '#0f6e56');
      }
    } else if (mode === 2) {
      p6aTxt(ctx, 60, 44, '圆心角 = 百分比 × 360°', '#2c3e50', 1);
      var cx2 = 180, cy2 = 210, r2 = 118;
      var sweep2 = PC / 100 * 360;
      ctx.beginPath(); ctx.moveTo(cx2, cy2);
      ctx.arc(cx2, cy2, r2, -Math.PI / 2, (-90 + sweep2) * Math.PI / 180);
      ctx.closePath();
      ctx.fillStyle = '#b9d3ea'; ctx.fill();
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx2, cy2, r2, 0, Math.PI * 2);
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1.6; ctx.stroke();
      var am2 = (-90 + sweep2 / 2) * Math.PI / 180;
      p6aTxt(ctx, cx2 + r2 * 0.6 * Math.cos(am2), cy2 + r2 * 0.6 * Math.sin(am2), PC + '%', '#185fa5', 1, 1);
      p6aTxt(ctx, 360, 120, PC + '% × 360° = ' + (Math.round(sweep2 * 10) / 10) + '°', '#c0392b', 1);
      p6aTxt(ctx, 360, 162, '反过来：角度 ÷ 360° = 百分比', '#6b7a89');
      p6aTxt(ctx, 360, 208, '常用换算', '#2c3e50', 1);
      p6aTxt(ctx, 360, 244, '10% → 36°　20% → 72°', '#185fa5');
      p6aTxt(ctx, 360, 280, '25% → 90°　30% → 108°', '#185fa5');
      p6aTxt(ctx, 360, 316, '50% → 180°（半圆）', '#0f6e56');
      p6aTxt(ctx, 360, 358, '所有圆心角相加 = 360°', '#8a5a00');
    } else {
      p6aTxt(ctx, 60, 44, '同一批数据，三种画法各管一件事', '#2c3e50', 1);
      var bx = 60, by = 92, bw = 150, bh = 130;
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.2; ctx.strokeRect(bx, by, bw, bh);
      var bars = [40, 65, 50, 80];
      for (i = 0; i < 4; i++) {
        ctx.fillStyle = '#b9d3ea';
        ctx.fillRect(bx + 14 + i * 32, by + bh - 14 - bars[i], 22, bars[i]);
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.2;
        ctx.strokeRect(bx + 14 + i * 32, by + bh - 14 - bars[i], 22, bars[i]);
      }
      p6aTxt(ctx, bx + bw / 2, by + bh + 22, '条形：比多少', '#185fa5', 0, 1);
      var lx = 250, lyy = 92, lw = 150, lh = 130;
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.2; ctx.strokeRect(lx, lyy, lw, lh);
      ctx.strokeStyle = '#8a5a00'; ctx.lineWidth = 2;
      ctx.beginPath();
      [[0, 90], [1, 60], [2, 75], [3, 40], [4, 55]].forEach(function (q, id) {
        var px = lx + 14 + q[0] * 30, py = lyy + lh - 14 - q[1];
        if (id === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      [[0, 90], [1, 60], [2, 75], [3, 40], [4, 55]].forEach(function (q) {
        ctx.fillStyle = '#8a5a00';
        ctx.beginPath(); ctx.arc(lx + 14 + q[0] * 30, lyy + lh - 14 - q[1], 4, 0, Math.PI * 2); ctx.fill();
      });
      p6aTxt(ctx, lx + lw / 2, lyy + lh + 22, '折线：看趋势', '#8a5a00', 0, 1);
      var px2 = 480, py2 = 160;
      pie(px2 + 30, py2, 52, [40, 30, 30]);
      p6aTxt(ctx, px2 + 30, by + bh + 22, '扇形：看占比', '#0f6e56', 0, 1);
      p6aTxt(ctx, 60, 300, '选图先问：这张图要回答什么问题？', '#c0392b', 1);
      p6aTxt(ctx, 60, 338, '问「多少」→ 条形；问「怎么变」→ 折线', '#6b7a89');
      p6aTxt(ctx, 60, 372, '问「占几成」→ 扇形（但给不出数量）', '#6b7a89');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '整圆 = 100%，各部分**之和必为 100%**。'
        : mode === 1 ? '部分 = 总量 × 百分比；总量 = 部分 ÷ 百分比。'
          : mode === 2 ? '圆心角 = **百分比 × 360°**。'
            : '比多少看条形，看趋势看折线，看占比看扇形。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 1) cSlider(s0.ctrl, '总量', TT, 100, 400, 50, function (v) { TT = v; p.total = v; draw(); });
  if (mode === 2) cSlider(s0.ctrl, '百分比', PC, 5, 100, 5, function (v) { PC = v; p.pct = v; draw(); });
  draw();
}

/* 数学广角——数与形 */
function p6aNumshapeLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i, j;
    var COLs = ['#c0392b', '#185fa5', '#0f6e56', '#8a5a00', '#8a3b6b', '#6b7a89'];
    if (mode === 0) {
      var gap = N <= 4 ? 30 : 24, ox = 100, oy = 340;
      p6aTxt(ctx, 60, 44, '每加一个奇数，正方形就多一层拐角', '#2c3e50', 1);
      for (i = 0; i < N; i++) for (j = 0; j < N; j++) {
        var lv = Math.max(i, j);
        ctx.fillStyle = COLs[lv % 6];
        ctx.beginPath(); ctx.arc(ox + i * gap, oy - j * gap, gap * 0.26, 0, Math.PI * 2); ctx.fill();
      }
      ctx.strokeStyle = '#b6c1cc'; ctx.lineWidth = 1;
      ctx.strokeRect(ox - gap * 0.5, oy - (N - 0.5) * gap, N * gap, N * gap);
      p6aTxt(ctx, ox + N * gap / 2, oy + 34, N + ' × ' + N + ' = ' + (N * N) + ' 个点', '#2c3e50', 1, 1);
      var seq = [], sum = 0;
      for (i = 1; i <= N; i++) { var odd = 2 * i - 1; seq.push(odd); sum += odd; }
      p6aTxt(ctx, 380, 100, '每层新增的点数', '#6b7a89');
      p6aTxt(ctx, 380, 136, seq.join(' + '), '#185fa5', 1);
      p6aTxt(ctx, 380, 176, '= ' + sum, '#c0392b', 1);
      p6aTxt(ctx, 380, 216, '= ' + N + '²', '#0f6e56', 1);
      p6aTxt(ctx, 380, 262, '第 k 层加 2k − 1 个', '#6b7a89');
      p6aTxt(ctx, 380, 300, '加 n 层边长为 n', '#6b7a89');
      p6aTxt(ctx, 380, 340, '和 = 项数的平方', '#c0392b', 1);
    } else if (mode === 1) {
      var s = 54, hgt = s * 0.866, x0 = 90, yb = 300;
      p6aTxt(ctx, 60, 44, N + ' 个三角形连摆：共用一条边', '#2c3e50', 1);
      for (i = 0; i < N; i++) {
        var ax = x0 + i * s / 2, topx = ax + s / 2, topy = yb - hgt;
        ctx.beginPath(); ctx.moveTo(ax, yb); ctx.lineTo(ax + s, yb); ctx.lineTo(topx, topy); ctx.closePath();
        ctx.fillStyle = i % 2 ? '#dceaf7' : '#eef8f2'; ctx.fill();
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.8; ctx.stroke();
      }
      for (i = 1; i < N; i++) {
        var sx2 = x0 + i * s / 2, sy2 = yb;
        ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(sx2, sy2); ctx.lineTo(sx2 + s / 2, sy2 - hgt); ctx.stroke();
      }
      p6aTxt(ctx, x0, yb + 24, '红边是第二次起共用的边', '#c0392b');
      p6aTxt(ctx, 380, 110, '根数：3、5、7 …', '#6b7a89');
      p6aTxt(ctx, 380, 148, '每多一个只多 2 根', '#185fa5');
      p6aTxt(ctx, 380, 188, '通式：2n + 1', '#c0392b', 1);
      p6aTxt(ctx, 380, 228, N + ' 个 → 2 × ' + N + ' + 1 = ' + (2 * N + 1) + ' 根', '#0f6e56', 1);
      p6aTxt(ctx, 380, 274, '正方形连摆：3n + 1', '#8a5a00');
      p6aTxt(ctx, 380, 312, '差值 = 边数 − 1', '#6b7a89');
      p6aTxt(ctx, 380, 350, 'n = 1 必须验算通过', '#c0392b');
    } else if (mode === 2) {
      var S = 210, gx = 90, gy = 100;
      p6aTxt(ctx, 60, 44, '每切一次，剩下的空白就小一半', '#2c3e50', 1);
      ctx.fillStyle = '#fff'; ctx.fillRect(gx, gy, S, S);
      var rx = gx, ry = gy, rw = S, rh = S;
      for (i = 0; i < N; i++) {
        var half = rw / 2;
        ctx.fillStyle = i % 2 ? '#a8d5c2' : '#b9d3ea';
        ctx.fillRect(rx + half, ry, half, rh);
        ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1;
        ctx.strokeRect(rx + half, ry, half, rh);
        rx = rx; rw = half;
      }
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.strokeRect(gx, gy, S, S);
      p6aTxt(ctx, gx + S / 2, gy + S + 24, '每次把剩下的部分对半切', '#6b7a89', 0, 1);
      var resN = Math.pow(2, N) - 1, resD = Math.pow(2, N);
      p6aTxt(ctx, 340, 120, '已涂面积 = 1 − 1/' + resD, '#c0392b', 1);
      p6aTxt(ctx, 340, 160, '= ' + resN + '/' + resD, '#2c3e50', 1);
      p6aTxt(ctx, 340, 204, '1/2 + 1/4 + 1/8 + …', '#185fa5');
      p6aTxt(ctx, 340, 244, '剩余 = 1/' + resD, '#0f6e56');
      p6aTxt(ctx, 340, 288, '切得越多，剩余越小', '#6b7a89');
      p6aTxt(ctx, 340, 326, '但永远到不了 1', '#c0392b', 1);
      p6aTxt(ctx, 340, 366, '这就是「无限接近」', '#185fa5');
    } else {
      p6aTxt(ctx, 60, 44, '三类题，三种画法', '#2c3e50', 1);
      var cxs = [70, 265, 460];
      ctx.strokeStyle = '#c2cdd8'; ctx.lineWidth = 1.2;
      cxs.forEach(function (cx) { ctx.strokeRect(cx, 90, 170, 150); });
      for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) {
        ctx.fillStyle = '#c0392b';
        ctx.beginPath(); ctx.arc(cxs[0] + 40 + i * 30, 200 - j * 30, 6, 0, Math.PI * 2); ctx.fill();
      }
      p6aTxt(ctx, cxs[0] + 85, 262, '规律题：点阵', '#c0392b', 0, 1);
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(cxs[1] + 26, 190); ctx.lineTo(cxs[1] + 144, 190); ctx.stroke();
      [26, 65, 105, 144].forEach(function (qx) {
        ctx.beginPath(); ctx.moveTo(cxs[1] + qx, 182); ctx.lineTo(cxs[1] + qx, 198); ctx.stroke();
      });
      ctx.fillStyle = '#185fa5'; ctx.fillRect(cxs[1] + 65, 178, 40, 12);
      p6aTxt(ctx, cxs[1] + 85, 262, '应用题：线段图', '#185fa5', 0, 1);
      ctx.fillStyle = '#a8d5c2'; ctx.fillRect(cxs[2] + 40, 110, 90, 100);
      ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 1.6; ctx.strokeRect(cxs[2] + 40, 110, 90, 100);
      p6aTxt(ctx, cxs[2] + 85, 262, '分数题：切块', '#0f6e56', 0, 1);
      p6aTxt(ctx, 60, 300, '数给形精确，形给数直觉', '#c0392b', 1);
      p6aTxt(ctx, 60, 338, '图用来「发现」规律，式用来「证明」规律', '#6b7a89');
      p6aTxt(ctx, 60, 372, '画图不是低年级的方法，是通用工具', '#6b7a89');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '从 1 开始连续奇数之和 = **项数的平方**。'
        : mode === 1 ? '连摆图形：**差值定系数，n = 1 定常数**。'
          : mode === 2 ? '前 n 项和 = **1 − 1/2ⁿ**。'
            : '数形结合：**图找思路，式出答案**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  if (mode === 0) cSlider(s0.ctrl, '层数', N, 1, 6, 1, function (v) { N = v; p.n = v; draw(); });
  if (mode === 1) cSlider(s0.ctrl, '三角形个数', N, 1, 7, 1, function (v) { N = v; p.n = v; draw(); });
  if (mode === 2) cSlider(s0.ctrl, '切的次数', N, 1, 6, 1, function (v) { N = v; p.n = v; draw(); });
  draw();
}
