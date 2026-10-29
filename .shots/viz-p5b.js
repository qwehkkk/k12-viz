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
  var data = [12, 15, 14, 18, 20];
  var days = ['一', '二', '三', '四', '五'];
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var i;
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
    var data2 = [data[0], data[1], data[2], data[3], W];
    if (mode === 0) {
      p5bTxt(ctx, 60, 45, '一周气温折线图：描点 → 标数 → 连线', '#2c3e50', 1);
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
      p5bTxt(ctx, 60, 385, '升 3℃（红）比升 2℃（绿）更陡更快', '#c0392b');
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
      drawLine(data2.slice(0, 4), '#185fa5', false, 0);
      drawPts(data2.slice(0, 4), '#185fa5', 0);
      drawLine([data2[3], data2[4]], '#c0392b', true, 0);
      var q5 = pt(4, data2[4]);
      ctx.fillStyle = '#c0392b'; ctx.beginPath(); ctx.arc(q5[0], q5[1], 5, 0, Math.PI * 2); ctx.fill();
      p5bTxt(ctx, 60, 385, '连续缓升 → 周五「可能」' + W + '℃（留余地）', '#c0392b');
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
