/* ===== 小学四年级下册：四则运算 / 观察物体 / 运算定律 / 小数意义 / 三角形 / 小数加减 / 图形运动 / 平均数 / 鸡兔同笼 ===== */

/* 四则运算 */
function p4bArithLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 20, b: 30, c: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b), C = Math.round(p.c);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var x0 = 60, y0 = 80, st = 52;
    function line(n, t, color, big) {
      ctx.fillStyle = color || '#2c3e50';
      ctx.font = (big ? 'bold 21' : 'bold 17') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(t, x0, y0 + n * st);
    }
    if (mode === 0) {
      line(0, A + ' − ' + B + ' − ' + C, '#2c3e50', 21);
      line(1, '同级：从左往右', '#6b7a89');
      line(2, '① ' + A + ' − ' + B + ' = ' + (A - B), '#185fa5');
      line(3, '② ' + (A - B) + ' − ' + C + ' = ' + (A - B - C), '#0f6e56');
      line(4, '结果 ' + (A - B - C) + '（先左边的减法）', '#c0392b', 20);
    } else if (mode === 1) {
      line(0, A + ' + ' + B + ' × ' + C, '#2c3e50', 21);
      line(1, '两级：先乘除后加减', '#6b7a89');
      line(2, '① 先算乘：' + B + ' × ' + C + ' = ' + (B * C), '#185fa5');
      line(3, '② 再算加：' + A + ' + ' + (B * C) + ' = ' + (A + B * C), '#0f6e56');
      line(4, '结果 ' + (A + B * C) + '（加法不能插队！）', '#c0392b', 20);
    } else if (mode === 2) {
      line(0, '(' + A + ' + ' + B + ') × ' + C + '　vs　' + A + ' + ' + B + ' × ' + C, '#2c3e50', 20);
      line(1, '有括号：括号里先算', '#6b7a89');
      line(2, '括号版：(' + (A + B) + ') × ' + C + ' = ' + ((A + B) * C), '#185fa5');
      line(3, '无括号：' + A + ' + ' + (B * C) + ' = ' + (A + B * C), '#0f6e56');
      line(4, '括号位置不同，结果不同', '#c0392b', 19);
    } else {
      line(0, '0 的运算规矩', '#2c3e50', 21);
      var rows = [A + ' + 0 = ' + A + '（加 0 不变）', A + ' − 0 = ' + A + '（减 0 不变）', A + ' × 0 = 0（乘 0 必得 0）', '0 ÷ ' + A + ' = 0（0 作被除数）', A + ' ÷ 0 = ？无意义！（0 不能作除数）'];
      var i;
      for (i = 0; i < rows.length; i++) line(i + 1, rows[i], i === 4 ? '#c0392b' : (i === 3 ? '#0f6e56' : '#185fa5'));
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('0 作除数：没有任何数 × 0 能回到 ' + A + '，所以无意义。', x0, y0 + 6 * st);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '同级运算**从左往右**。'
        : mode === 1 ? '两级运算**先乘除后加减**。'
          : mode === 2 ? '**括号**是最高优先级。'
            : '乘 0 得 0；**0 不能作除数**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, 'A', A, 2, 99, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, 'B', B, 2, 99, 1, function (v) { B = v; p.b = v; draw(); });
  cSlider(s0.ctrl, 'C', C, 2, 9, 1, function (v) { C = v; p.c = v; draw(); });
  draw();
}

/* 观察物体（二） */
function p4bViewLab(el, cfg) {
  var p = Object.assign({ mode: 0, dir: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), dir = Math.round(p.dir);
  var info = s0.info;
  var names = ['正面', '左面', '上面'];
  // 世界：前排 x=0..2 高1；右后 (x=2,y=1) 高2
  function heights(dirv) {
    if (dirv === 0) return [1, 1, 2];       // 正面：3 列
    if (dirv === 1) return [1, 2];          // 左面：前、后 2 列
    return null;                             // 上面：俯视格
  }
  function cube(ctx, x, y, sz, top, face, side) {
    var dx = sz * 0.55, dy = sz * 0.36;
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(x + sz, y); ctx.lineTo(x + sz + dx, y - dy); ctx.lineTo(x + dx, y - dy); ctx.closePath();
    ctx.fillStyle = top; ctx.fill(); ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(x, y - sz); ctx.lineTo(x + dx, y - sz - dy); ctx.lineTo(x + dx, y - dy); ctx.closePath();
    ctx.fillStyle = side; ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + dx, y - dy); ctx.lineTo(x + sz + dx, y - dy); ctx.lineTo(x + sz + dx, y - sz - dy); ctx.lineTo(x + dx, y - sz - dy); ctx.closePath();
    ctx.fillStyle = face; ctx.fill(); ctx.stroke();
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    // 左：立体图（斜二测）
    var sz = 40, bx = 90, by = 250;
    var i, j;
    for (j = 1; j >= 0; j--) for (i = 0; i < 3; i++) {
      var lv = (i === 2 && j === 1) ? 2 : 1;
      for (var z = 0; z < lv; z++) {
        var px = bx + i * sz * 1.05 + j * sz * 0.5;
        var py = by - j * sz * 0.32 - z * sz;
        cube(ctx, px, py, sz, '#dceaf7', '#b9d3ea', '#a5c4e0');
      }
    }
    ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('4 个小正方体：前排 3 个，右后摞 2 层', 60, h - 34);
    // 右：所选方向的平面图
    var vx = 400, vy = 120, cs = 52;
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('从' + names[dir] + '看：', vx, 70);
    if (dir === 2) {
      for (j = 0; j < 2; j++) for (i = 0; i < 3; i++) {
        var occ = !(j === 1 && i < 2);
        ctx.fillStyle = occ ? '#b9d3ea' : '#fff';
        ctx.fillRect(vx + i * cs, vy + j * cs, cs - 3, cs - 3);
        ctx.strokeStyle = occ ? '#185fa5' : '#c2cdd8'; ctx.lineWidth = occ ? 2 : 1;
        ctx.strokeRect(vx + i * cs, vy + j * cs, cs - 3, cs - 3);
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('4 个落点格（重叠处只算 1 格）', vx, vy + cs * 2 + 20);
    } else {
      var hs = heights(dir);
      for (i = 0; i < hs.length; i++) {
        for (var z2 = 0; z2 < hs[i]; z2++) {
          ctx.fillStyle = '#b9d3ea';
          ctx.fillRect(vx + i * cs, vy + cs * 2 - (z2 + 1) * cs, cs - 3, cs - 3);
          ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2;
          ctx.strokeRect(vx + i * cs, vy + cs * 2 - (z2 + 1) * cs, cs - 3, cs - 3);
        }
        ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(hs[i]) + '层', vx + i * cs + cs / 2 - 2, vy + cs * 2 + 16);
        ctx.textAlign = 'left';
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(dir === 0 ? '每列取最高，后面被挡住不画' : '从左往右 = 从前到后', vx, vy + cs * 2 + 40);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (dir === 0 ? '正面：**列数 = 左右位置**，每列取最高层。'
        : dir === 1 ? '左面：**列 = 前后排**；右面看则左右反过来。'
          : '上面：**俯视落点图**，高度信息消失。') + '</span>';
  }
  cSlider(s0.ctrl, '观察方向', dir, 0, 2, 1, function (v) { dir = v; p.dir = v; draw(); });
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  draw();
}

/* 运算定律 */
function p4bLawLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 56, b: 78, c: 44 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b), C = Math.round(p.c);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var x0 = 50, y0 = 74, st = 50;
    function line(n, t, color, big) {
      ctx.fillStyle = color || '#2c3e50';
      ctx.font = (big ? 'bold 20' : 'bold 16') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(t, x0, y0 + n * st);
    }
    if (mode === 0) {
      line(0, A + ' + ' + B + ' + ' + C, '#2c3e50', 20);
      line(1, '交换律：把能凑整的排一起；结合律：先算它们', '#6b7a89');
      line(2, '= (' + A + ' + ' + C + ') + ' + B, '#185fa5');
      line(3, '= ' + (A + C) + ' + ' + B + ' = ' + (A + C + B), '#c0392b', 20);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('a + b = b + a；(a+b)+c = a+(b+c)', x0, y0 + 4 * st);
    } else if (mode === 1) {
      var q, unit;
      if (A === 25) { q = 4; unit = 100; }
      else if (A === 125) { q = 8; unit = 1000; }
      else if (A % 10 === 5 && A !== 5) { q = 2; unit = A * 2; }
      else { q = 1; unit = A; }
      var ok = B % q === 0 && q > 1;
      line(0, A + ' × ' + B + '，找搭档：' + A + ' × ' + q + ' = ' + unit, '#2c3e50', 19);
      if (ok) {
        line(1, '= ' + A + ' × ' + q + ' × ' + (B / q), '#185fa5');
        line(2, '= ' + unit + ' × ' + (B / q) + ' = ' + unit * (B / q), '#c0392b', 20);
      } else {
        line(1, '先把 ' + B + ' 拆成含 ' + q + ' 的积再试', '#8a5a00');
        line(2, '（拖 B 为 ' + q + ' 的倍数看完整过程）', '#6b7a89');
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('黄金搭档：25×4=100，125×8=1000', x0, y0 + 4 * st);
    } else if (mode === 2) {
      var sc = Math.min(9, (w - 200) / (A + B), (h - 160) / C);
      var bx = 70, by = 100, cw = (A + B) * sc, ch = C * sc;
      ctx.fillStyle = '#b9d3ea'; ctx.fillRect(bx, by, A * sc, ch);
      ctx.fillStyle = '#f3d9c4'; ctx.fillRect(bx + A * sc, by, B * sc, ch);
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2; ctx.strokeRect(bx, by, cw, ch);
      ctx.beginPath(); ctx.moveTo(bx + A * sc, by); ctx.lineTo(bx + A * sc, by + ch); ctx.stroke();
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('a×c = ' + (A * C), bx + A * sc / 2, by + ch / 2);
      ctx.fillStyle = '#8a5a00';
      ctx.fillText('b×c = ' + (B * C), bx + A * sc + B * sc / 2, by + ch / 2);
      ctx.fillStyle = '#2c3e50';
      ctx.fillText('宽 a+b = ' + (A + B), bx + cw / 2, by - 16);
      ctx.fillStyle = '#0f6e56';
      ctx.fillText('长 c = ' + C, bx + cw + 40, by + ch / 2);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('(a+b)×c = a×c + b×c → ' + (A + B) * C + ' = ' + A * C + ' + ' + B * C, x0, by + ch + 40);
      ctx.fillStyle = '#c0392b'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('括号里每一项都要乘 c！', x0, by + ch + 66);
    } else {
      line(0, '综合简算：88 × 125', '#2c3e50', 20);
      line(1, '拆 88 = 8 × 11，8 正好配 125', '#6b7a89');
      line(2, '= 8 × 125 × 11', '#185fa5');
      line(3, '= 1000 × 11 = 11000', '#c0392b', 20);
      line(4, '减法性质：528 − 65 − 35 = 528 − 100 = 428', '#0f6e56');
      line(5, '除法性质：1000 ÷ 25 ÷ 4 = 1000 ÷ 100 = 10', '#0f6e56');
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '加法：**换位置、换分组**，和不变。'
        : mode === 1 ? '乘法凑整：**25 找 4，125 找 8**。'
          : mode === 2 ? '分配律 = **面积模型**：大长方形 = 两小块。'
            : '简算先找**能凑整的组合**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, 'A', A, 2, 999, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, 'B', B, 2, 99, 1, function (v) { B = v; p.b = v; draw(); });
  cSlider(s0.ctrl, 'C', C, 2, 99, 1, function (v) { C = v; p.c = v; draw(); });
  draw();
}

/* 小数的意义和性质 */
function p4bDec2Lab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n);
  var info = s0.info;
  function fmt(v) {
    var s = (v / 100).toFixed(2);
    return s.replace(/0+$/, '').replace(/\.$/, '');
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    if (mode === 0) {
      var rx0 = 50, rx1 = w - 70, ry = 170, per = (rx1 - rx0) / 10;
      ctx.fillStyle = '#e6f1fb'; ctx.fillRect(rx0, ry, rx1 - rx0, 40);
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2; ctx.strokeRect(rx0, ry, rx1 - rx0, 40);
      var i;
      for (i = 1; i < 10; i++) {
        ctx.beginPath(); ctx.moveTo(rx0 + i * per, ry); ctx.lineTo(rx0 + i * per, ry + 40);
        ctx.strokeStyle = 'rgba(24,95,165,.4)'; ctx.lineWidth = 1; ctx.stroke();
      }
      var px = rx0 + N * (rx1 - rx0) / 100;
      ctx.fillStyle = '#c0392b';
      ctx.fillRect(rx0, ry, px - rx0, 40);
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(N + ' 厘米 = ' + N + '/100 米 = ' + fmt(N) + ' 米', 50, 90);
      ctx.fillStyle = '#6b7a89'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('0 米', rx0, ry + 60);
      ctx.textAlign = 'center';
      ctx.fillText('1 米', rx1, ry + 60);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('分母是 100 的分数 → 两位小数（百分之一）', 50, 120);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('十分位、百分位、千分位：相邻计数单位进率都是 10。', 50, h - 50);
    } else if (mode === 1) {
      var bx = 60, bw = w - 140;
      ctx.fillStyle = '#185fa5'; ctx.fillRect(bx, 100, bw, 42);
      ctx.fillStyle = '#0f6e56'; ctx.fillRect(bx, 170, bw, 42);
      ctx.fillStyle = '#fff'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('0.3 = 3 个 0.1', bx + 16, 121);
      ctx.fillText('0.30 = 30 个 0.01', bx + 16, 191);
      ctx.fillStyle = '#6b7a89'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('两根条一样长 → 0.3 = 0.30（小数的性质）', bx, 250);
      ctx.fillStyle = '#c0392b';
      ctx.fillText('只能动末尾的 0：0.3 ≠ 0.03（中间的 0 是占位符）', bx, 290);
    } else if (mode === 2) {
      var A2 = N / 100, B2 = 0.58;
      var nx0 = 60, nx1 = w - 60, ny = 190;
      var lo = 0, hi = Math.max(1, Math.ceil(Math.max(A2, B2)));
      var map = function (v) { return nx0 + (v - lo) / (hi - lo) * (nx1 - nx0); };
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(nx0, ny); ctx.lineTo(nx1, ny); ctx.stroke();
      var i2;
      for (i2 = 0; i2 <= hi * 10; i2++) {
        var xx = map(i2 / 10);
        ctx.beginPath(); ctx.moveTo(xx, ny); ctx.lineTo(xx, ny - (i2 % 5 === 0 ? 12 : 6));
        ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 1; ctx.stroke();
        if (i2 % 5 === 0) {
          ctx.fillStyle = '#5f5e5a'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
          ctx.textAlign = 'center'; ctx.fillText((i2 / 10).toFixed(1), xx, ny + 18);
        }
      }
      ctx.textAlign = 'left';
      [[A2, '#c0392b', 'A'], [B2, '#185fa5', 'B']].forEach(function (it) {
        ctx.beginPath(); ctx.arc(map(it[0]), ny, 7, 0, Math.PI * 2); ctx.fillStyle = it[1]; ctx.fill();
        ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(it[2] + '=' + it[0], map(it[0]) - 14, ny - 40);
      });
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(A2 > B2 ? A2 + ' > ' + B2 : (A2 < B2 ? A2 + ' < ' + B2 : A2 + ' = ' + B2), 60, 90);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('先比整数部分，再从十分位逐位比——位数多不一定大！', 60, 120);
    } else {
      var v0 = N / 10;
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 20px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('小数点搬家：' + v0, 60, 80);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('右移一位 ×10 → ' + (v0 * 10), 60, 140);
      ctx.fillText('右移两位 ×100 → ' + (v0 * 100), 60, 180);
      ctx.fillStyle = '#0f6e56';
      ctx.fillText('左移一位 ÷10 → ' + (v0 / 10), 60, 220);
      ctx.fillText('左移两位 ÷100 → ' + (v0 / 100), 60, 260);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('每移一位，×10 或 ÷10 一次；不够位用 0 补。', 60, 320);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '小数是**分数的另一种写法**。'
        : mode === 1 ? '末尾添 0 去 0，**大小不变**。'
          : mode === 2 ? '小数比大小**逐位比**。'
            : '小数点移动 = **×10 / ÷10** 的开关。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '数值', N, 1, 999, 1, function (v) { N = v; p.n = v; draw(); });
  draw();
}

/* 三角形 */
function p4bTriLab(el, cfg) {
  var p = Object.assign({ mode: 0, k: 40 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), K = Math.round(p.k);
  var info = s0.info;
  function tri(k) {
    var bx = 120, by = 300, bw = 300, topX = bx + bw * 0.28 + k * 2.4, topY = 120;
    return [{ x: bx, y: by }, { x: bx + bw, y: by }, { x: topX, y: topY }];
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var T = tri(K);
    if (mode === 0) {
      ctx.beginPath(); ctx.moveTo(T[0].x, T[0].y); ctx.lineTo(T[1].x, T[1].y); ctx.lineTo(T[2].x, T[2].y); ctx.closePath();
      ctx.fillStyle = '#e6f1fb'; ctx.fill(); ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.5; ctx.stroke();
      var hx = T[2].x;
      ctx.setLineDash([6, 5]); ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(hx, T[2].y); ctx.lineTo(hx, T[0].y); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(hx, T[0].y - 12); ctx.lineTo(hx + 12, T[0].y - 12); ctx.lineTo(hx + 12, T[0].y); ctx.stroke();
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('高（虚线＋直角符号）', hx + 18, 200);
      ctx.fillStyle = '#185fa5';
      ctx.fillText('底', 250, 322);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('从顶点向对边画垂直线段 = 高；每条边都可以当底，共 3 条高。', 60, 60);
      ctx.fillText('钝角三角形有两条高在形外（垂足在延长线上）。', 60, 84);
    } else if (mode === 1) {
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(70, 160); ctx.lineTo(310, 160); ctx.stroke();
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('2', 182, 142);
      ctx.fillText('3', 348, 142);
      ctx.strokeStyle = '#185fa5';
      ctx.beginPath(); ctx.moveTo(310, 160); ctx.lineTo(310 + 120, 160); ctx.stroke();
      ctx.fillStyle = '#185fa5'; ctx.fillText('6', 430, 142);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('2 + 3 = 5 < 6：两根短的接不到一起 → 围不成！', 70, 230);
      ctx.fillStyle = '#0f6e56';
      ctx.fillText('3 + 4 = 7 > 5 ✓（能围）　3 + 6 = 9 > 4 ✓　4 + 6 = 10 > 3 ✓', 70, 270);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('只查一条：**短 + 短 > 长**。两点之间线段最短——绕两边的路必比直路长。', 70, 320);
    } else if (mode === 2) {
      ctx.beginPath(); ctx.moveTo(T[0].x, T[0].y); ctx.lineTo(T[1].x, T[1].y); ctx.lineTo(T[2].x, T[2].y); ctx.closePath();
      ctx.fillStyle = '#e1f5ee'; ctx.fill(); ctx.strokeStyle = '#0f6e56'; ctx.lineWidth = 2.5; ctx.stroke();
      var A = Math.abs(T[1].x - T[2].x), Bv = Math.abs(T[0].x - T[2].x);
      var angT = Math.round(Math.atan2(T[0].y - T[2].y, T[2].x - T[0].x) * 180 / Math.PI + Math.atan2(T[0].y - T[2].y, T[1].x - T[2].x) * 180 / Math.PI);
      var angL = Math.round(Math.atan2(T[2].y - T[0].y, T[2].x - T[0].x) * 180 / Math.PI);
      var angR = 180 - angT - angL;
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(angL + '°', T[0].x + 34, T[0].y - 14);
      ctx.fillText(angR + '°', T[1].x - 30, T[1].y - 14);
      ctx.fillText(angT + '°', T[2].x, T[2].y - 12);
      ctx.textAlign = 'left';
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(angL + '° + ' + angR + '° + ' + angT + '° = 180°', 60, 64);
      ctx.fillStyle = angT > 90 ? '#8a5a00' : (angT === 90 ? '#c0392b' : '#0f6e56');
      ctx.fillText(angT > 90 ? '钝角三角形' : (angT === 90 ? '直角三角形' : '锐角三角形'), 60, 340);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('拖形状参数，怎么变内角和都是 180°。', 60, 366);
    } else {
      var sz = 70, ty = 110;
      ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 5; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(80, ty + sz); ctx.lineTo(80 + sz, ty + sz); ctx.lineTo(80 + sz / 2, ty); ctx.closePath(); ctx.stroke();
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(300, ty + sz); ctx.lineTo(300 + sz, ty + sz); ctx.lineTo(300 + sz, ty); ctx.lineTo(300, ty); ctx.closePath(); ctx.stroke();
      ctx.strokeStyle = '#9aa7b4'; ctx.lineWidth = 2; ctx.setLineDash([5, 5]);
      ctx.beginPath(); ctx.moveTo(80 + sz * 1.1, ty + sz * 0.55); ctx.lineTo(80 + sz * 1.9, ty + sz * 0.55); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('三角形：推不动（稳定）', 60, ty + sz + 36);
      ctx.fillStyle = '#c0392b';
      ctx.fillText('四边形：一推就歪（不稳定）', 280, ty + sz + 36);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('三边定死，形状就定死 → 铁塔、车架、桁架全是三角框架。', 60, 330);
      ctx.fillText('四边形要稳固：加一根斜杆劈成两个三角形。', 60, 356);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '底和高**成对出现**，共 3 条高。'
        : mode === 1 ? '**短 + 短 > 长** 才能围成。'
          : mode === 2 ? '内角和 **恒为 180°**。'
            : '三角形**稳定**，四边形**易变形**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '形状参数', K, 10, 80, 1, function (v) { K = v; p.k = v; draw(); });
  draw();
}

/* 小数的加法和减法 */
function p4bDecalcLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 36, b: 214, op: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b), op = Math.round(p.op);
  var info = s0.info;
  function fmt(n) {
    var s = (n / 100).toFixed(2);
    return s.replace(/0+$/, '').replace(/\.$/, '') || '0';
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
    var res = op === 0 ? A + B : A - B;
    var sa = fmt(A), sb = fmt(B), sr = fmt(res);
    var dec = 2;
    var cellW = 34;
    var xR = 300, y0 = 110, st = 50;
    // 小数点位置：按 2 位小数右对齐
    function cells(s, y, color) {
      var parts = s.split('.');
      var intP = parts[0], decP = (parts[1] || '');
      while (decP.length < dec) decP += '0';
      var all = intP.split('').concat(['.']).concat(decP.split(''));
      var total = all.length;
      ctx.font = 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif';
      for (var i = 0; i < all.length; i++) {
        var ch = all[i];
        ctx.fillStyle = ch === '.' ? '#c0392b' : (color || '#2c3e50');
        ctx.fillText(ch, xR - (total - 1 - i) * cellW, y);
        if (ch === '.') {
          ctx.fillStyle = 'rgba(192,57,43,.35)';
          ctx.fillRect(xR - (total - 1 - i) * cellW - 2, y - 26, 3, 52);
        }
      }
    }
    cells(sa, y0, '#2c3e50');
    ctx.textAlign = 'right';
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(op === 0 ? '+' : '−', xR - (sa.length + 2) * cellW, y0 + st);
    cells(sb, y0 + st, '#2c3e50');
    ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(xR - 7 * cellW, y0 + st * 1.7); ctx.lineTo(xR, y0 + st * 1.7); ctx.stroke();
    cells(sr, y0 + st * 2.4, op === 0 ? '#0f6e56' : '#185fa5');
    ctx.textAlign = 'left';
    ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('小数点上下一条线 → 相同数位自动对齐', 60, y0 + st * 3.4);
    ctx.fillText('位数不同先补 0（' + (sa.indexOf('.') === -1 ? sa : sa) + ' → 补齐两位）再算', 60, y0 + st * 3.4 + 30);
    ctx.fillText('结果末尾的 0 化简：3.70 → 3.7', 60, y0 + st * 3.4 + 60);
    var title = mode === 2 ? '购物结账' : (op === 0 ? '小数加法' : '小数减法');
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 17px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText(title + '：' + sa + ' ' + (op === 0 ? '+' : '−') + ' ' + sb + ' = ' + sr, 60, 56);
    info.innerHTML = '<span class="viz-meta">竖式金规则：**小数点对齐**（整数减小数先补 0，如 7 → 7.00）。</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 2, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '数 A', A, 1, 999, 1, function (v) { A = v; p.a = v; draw(); });
  cSlider(s0.ctrl, '数 B', B, 1, 999, 1, function (v) { B = v; p.b = v; draw(); });
  cSlider(s0.ctrl, '加减', op, 0, 1, 1, function (v) { op = v; p.op = v; draw(); });
  draw();
}

/* 图形的运动（二） */
function p4bMotionLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n);
  var info = s0.info;
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var cs = 30, gx = 80, gy = 80, cols = 14, rows = 8;
    function grid() {
      var i;
      ctx.strokeStyle = '#e6ebf1'; ctx.lineWidth = 1;
      for (i = 0; i <= cols; i++) { ctx.beginPath(); ctx.moveTo(gx + i * cs, gy); ctx.lineTo(gx + i * cs, gy + rows * cs); ctx.stroke(); }
      for (i = 0; i <= rows; i++) { ctx.beginPath(); ctx.moveTo(gx, gy + i * cs); ctx.lineTo(gx + cols * cs, gy + i * cs); ctx.stroke(); }
    }
    if (mode === 0) {
      var cx = 200, cy = 190, r = 90;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = '#e6f1fb'; ctx.fill(); ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 2.5; ctx.stroke();
      var axes = [[0, -1], [-1, 0], [0.707, -0.707], [-0.707, -0.707]];
      var i2;
      for (i2 = 0; i2 < axes.length; i2++) {
        var on = i2 < (N % 5 === 0 ? 4 : (N % 4 === 0 ? 4 : N % 4));
        var ax = axes[i2];
        ctx.strokeStyle = on ? '#c0392b' : '#c2cdd8'; ctx.lineWidth = on ? 3 : 1.5;
        ctx.setLineDash([7, 4]);
        ctx.beginPath();
        ctx.moveTo(cx - ax[0] * r * 1.25, cy - ax[1] * r * 1.25);
        ctx.lineTo(cx + ax[0] * r * 1.25, cy + ax[1] * r * 1.25);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 16px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('圆：对称轴无数条（这里画 4 条示意）', 60, 330);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('长方形 2 条 · 正方形 4 条 · 等边三角形 3 条 · 平行四边形 0 条（对折不重合）', 60, 360);
    } else if (mode === 1) {
      grid();
      var ax = gx + 7 * cs;
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2; ctx.setLineDash([7, 4]);
      ctx.beginPath(); ctx.moveTo(ax, gy - 10); ctx.lineTo(ax, gy + rows * cs + 10); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#185fa5'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      // 左半：小房子（顶点相对左轴格数 [3,3,2,1,0]）
      var pts = [[-3, 5], [-1, 7], [-2, 5], [-2, 3], [-3, 3]];
      ctx.beginPath();
      for (var i = 0; i < pts.length; i++) {
        var px = ax + pts[i][0] * cs, py = gy + pts[i][1] * cs;
        i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath(); ctx.stroke();
      ctx.fillStyle = 'rgba(24,95,165,.15)'; ctx.fill();
      // 右半：镜像
      ctx.strokeStyle = '#0f6e56';
      ctx.beginPath();
      for (i = 0; i < pts.length; i++) {
        var qx = ax - pts[i][0] * cs, qy = gy + pts[i][1] * cs;
        i ? ctx.lineTo(qx, qy) : ctx.moveTo(qx, qy);
      }
      ctx.closePath(); ctx.stroke();
      ctx.fillStyle = 'rgba(15,110,86,.15)'; ctx.fill();
      ctx.fillStyle = '#2c3e50';
      ctx.fillText('对称轴两侧到轴的距离相等（每个顶点逐点镜像）', gx, gy + rows * cs + 26);
    } else if (mode === 2) {
      grid();
      var sh = [[0, 2], [2, 2], [2, 4], [0, 4]];
      function poly(dx, color, fill) {
        ctx.beginPath();
        for (var i = 0; i < sh.length; i++) {
          var px = gx + (sh[i][0] + dx) * cs, py = gy + sh[i][1] * cs;
          i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.closePath();
        if (fill) { ctx.fillStyle = fill; ctx.fill(); }
        ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.stroke();
      }
      poly(0, '#9aa7b4', 'rgba(154,167,180,.2)');
      var shift = Math.max(1, Math.min(9, N));
      poly(shift, '#185fa5', 'rgba(24,95,165,.2)');
      // 对应点连线
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(gx + sh[0][0] * cs + cs / 2, gy + sh[0][1] * cs + cs / 2);
      ctx.lineTo(gx + (sh[0][0] + shift) * cs + cs / 2, gy + sh[0][1] * cs + cs / 2);
      ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('对应点移动 ' + shift + ' 格 = 整体平移 ' + shift + ' 格', gx, gy + rows * cs + 26);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('数格数要**点对点**，别数两图之间的空隙！', gx, gy + rows * cs + 52);
    } else {
      grid();
      var base = [[0, 3], [1, 1], [2, 3]];
      var k;
      var kmax = Math.min(N, 6);
      for (k = 0; k < kmax; k++) {
        ctx.beginPath();
        for (var j = 0; j < base.length; j++) {
          var px = gx + (base[j][0] + k * 2.5) * cs, py = gy + base[j][1] * cs;
          j ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = k % 2 ? '#f3d9c4' : '#b9d3ea';
        ctx.fill();
        ctx.strokeStyle = '#185fa5'; ctx.lineWidth = 1.8; ctx.stroke();
      }
      ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('基本图形 + 平移 = 连续花边纹样', gx, gy + rows * cs + 26);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('平移、对称都不改变形状大小——割补法算面积靠的就是它。', gx, gy + rows * cs + 52);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '对折重合 = 轴对称，折痕 = **对称轴**。'
        : mode === 1 ? '对称点：**等距、垂直**于轴。'
          : mode === 2 ? '平移 = **方向 + 格数**。'
            : '**基本图形**复制出整条花边。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '参数', N, 1, 9, 1, function (v) { N = v; p.n = v; draw(); });
  draw();
}

/* 平均数与复式条形统计图 */
function p4bAvgLab(el, cfg) {
  var p = Object.assign({ mode: 0, n: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), N = Math.round(p.n);
  var info = s0.info;
  var data = [15, 13, 12, 16];
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var gx0 = 70, gx1 = w - 50, gy1 = h - 70, gy0 = 60;
    function frame(maxV, step) {
      var i;
      for (i = 0; i <= maxV; i += step) {
        var yy = gy1 - (gy1 - gy0) * i / maxV;
        ctx.strokeStyle = '#e6ebf1'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(gx0, yy); ctx.lineTo(gx1, yy); ctx.stroke();
        ctx.fillStyle = '#5f5e5a'; ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'right'; ctx.fillText(String(i), gx0 - 6, yy); ctx.textAlign = 'left';
      }
      ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(gx0, gy0 - 6); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
    }
    var maxV = 20, step = 5;
    if (mode === 0 || mode === 2) {
      frame(maxV, step);
      var avg = 14;
      var colors = ['#185fa5', '#c0392b', '#0f6e56', '#8a5a00'];
      var names = ['一组', '二组', '三组', '四组'];
      var bw = 54;
      for (var i = 0; i < 4; i++) {
        var cx = gx0 + 40 + i * (gx1 - gx0 - 80) / 4;
        var bh = (gy1 - gy0) * data[i] / maxV;
        ctx.fillStyle = mode === 2 ? (data[i] >= avg ? '#0f6e56' : '#c0392b') : colors[i];
        ctx.fillRect(cx, gy1 - bh, bw, bh);
        ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(data[i]), cx + bw / 2, gy1 - bh - 12);
        ctx.fillText(names[i], cx + bw / 2, gy1 + 18);
        ctx.textAlign = 'left';
      }
      var ay = gy1 - (gy1 - gy0) * avg / maxV;
      ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 2; ctx.setLineDash([7, 4]);
      ctx.beginPath(); ctx.moveTo(gx0, ay); ctx.lineTo(gx1, ay); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('平均 14 个（总数 56 ÷ 4 组）', gx1 - 190, ay - 12);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(mode === 2 ? '平均线上下的真实数据：绿=高于平均，红=低于平均。' : '移多补少：多的匀给少的，每组成 14 个。', gx0, gy1 + 40);
    } else if (mode === 1) {
      var total = 15 + 13 + 12 + 16;
      var y = 90, st = 56;
      function row(lab, t, color) {
        ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(lab, 60, y - 14);
        ctx.fillStyle = color; ctx.font = 'bold 22px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText(t, 60, y + 12);
        y += st;
      }
      row('正求：总数 ÷ 份数', '56 ÷ 4 = 14（个）', '#185fa5');
      row('反求：平均数 × 份数', '14 × 4 = 56（个）', '#0f6e56');
      row('人数不同的合并', '(120 + 90) ÷ (3 + 2) = 42', '#c0392b');
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('两组人数不同时，两个平均数不能直接相加除以 2！', 60, y + 10);
    } else {
      var years = ['2018', '2020', '2022', '2024'];
      var city = [30, 50, 70, 90], rural = [80, 65, 45, 30];
      frame(100, 20);
      var bw2 = 26;
      for (var j = 0; j < 4; j++) {
        var cx2 = gx0 + 50 + j * (gx1 - gx0 - 100) / 4;
        var h1 = (gy1 - gy0) * city[j] / 100;
        var h2 = (gy1 - gy0) * rural[j] / 100;
        ctx.fillStyle = '#185fa5'; ctx.fillRect(cx2, gy1 - h1, bw2, h1);
        ctx.fillStyle = '#e8964f'; ctx.fillRect(cx2 + bw2 + 4, gy1 - h2, bw2, h2);
        ctx.fillStyle = '#2c3e50'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(years[j], cx2 + bw2 + 2, gy1 + 16);
        ctx.textAlign = 'left';
      }
      ctx.fillStyle = '#185fa5'; ctx.fillRect(gx0 + 6, gy0 - 22, 14, 10);
      ctx.fillStyle = '#2c3e50'; ctx.font = '12px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('城镇（万人）', gx0 + 26, gy0 - 16);
      ctx.fillStyle = '#e8964f'; ctx.fillRect(gx0 + 130, gy0 - 22, 14, 10);
      ctx.fillText('农村（万人）', gx0 + 150, gy0 - 16);
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('复式条形图：图例区分两组，同一时期并排比较。', gx0, gy1 + 40);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 2 ? '平均数是**整体水平**，不代表每个人。'
        : mode === 1 ? '**总数 ÷ 份数**，反过来平均 × 份数 = 总数。'
          : mode === 3 ? '复式图先看**图例**。'
            : '平均数 = **总数 ÷ 份数**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '参数', N, 1, 8, 1, function (v) { N = v; p.n = v; draw(); });
  draw();
}

/* 鸡兔同笼 */
function p4bCageLab(el, cfg) {
  var p = Object.assign({ mode: 0, h: 8, f: 26 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), H = Math.round(p.h), F = Math.round(p.f);
  var info = s0.info;
  function solve() {
    var diff = F - H * 2;
    if (diff < 0 || diff % 2 !== 0 || diff > H * 2) return null;
    var rab = diff / 2;
    return { rab: rab, chi: H - rab };
  }
  function draw() {
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, w = m.w, h = m.h;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    var sol = solve();
    var x0 = 56, y = 76, st = 42;
    function line(n, t, color, big) {
      ctx.fillStyle = color || '#2c3e50';
      ctx.font = (big ? 'bold 19' : 'bold 15') + 'px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText(t, x0, y + n * st);
    }
    ctx.fillStyle = '#2c3e50'; ctx.font = 'bold 18px "PingFang SC","Microsoft YaHei",sans-serif';
    ctx.fillText('鸡兔同笼：头 ' + H + ' 个，脚 ' + F + ' 只', 56, 44);
    if (mode === 0) {
      line(0, '列表法：每把 1 只鸡换成兔，脚数 +2', '#6b7a89');
      var st2 = 38;
      var endI = sol ? Math.min(H, Math.max(5, sol.rab)) : 5;
      var startI = Math.max(0, endI - 5);
      var shown = 0;
      for (var i = startI; i <= endI; i++) {
        var chi = H - i, rab = i, feet = chi * 2 + rab * 4;
        var hit = sol && rab === sol.rab;
        ctx.fillStyle = hit ? '#c0392b' : (shown % 2 ? '#6b7a89' : '#2c3e50');
        ctx.font = (hit ? 'bold ' : '') + '14px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText('鸡 ' + chi + '，兔 ' + rab + ' → 脚 ' + feet + (hit ? '　✓ 吻合！' : ''), x0, y + (shown + 1) * st2 - 10);
        shown++;
      }
      ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('每换 1 只鸡为兔，脚数 +2 —— 规律就在表里。', x0, y + (shown + 1) * st2 + 8);
    } else if (mode === 1 || mode === 3) {
      if (!sol) {
        line(0, '无解！脚数必须在 ' + H * 2 + '（全鸡）到 ' + H * 4 + '（全兔）之间且为偶数。', '#c0392b');
      } else {
        line(0, '① 假设全是鸡：' + H + ' × 2 = ' + H * 2 + ' 只脚', '#185fa5');
        line(1, '② 比实际少：' + F + ' − ' + H * 2 + ' = ' + (F - H * 2) + ' 只脚', '#185fa5');
        line(2, '③ 每只兔比鸡多 2 只脚 → 兔 = ' + (F - H * 2) + ' ÷ 2 = ' + sol.rab + '（只）', '#0f6e56');
        line(3, '④ 鸡 = ' + H + ' − ' + sol.rab + ' = ' + sol.chi + '（只）', '#2c3e50', 19);
        line(4, '验算：' + sol.chi + '×2 + ' + sol.rab + '×4 = ' + (sol.chi * 2 + sol.rab * 4) + ' ✓', '#c0392b', 17);
        line(5, '反过来假设全是兔也可以：多出的脚 ÷ 2 = 鸡数', '#8a5a00');
        ctx.fillStyle = '#6b7a89'; ctx.font = '13px "PingFang SC","Microsoft YaHei",sans-serif';
        ctx.fillText('假设法 = 制造差额，再用差额反推混合比例。', x0, y + 7 * st);
      }
    } else {
      line(0, '同款模型（两个总量 + 两种单价）', '#6b7a89');
      line(1, '龟鹤同笼：龟 4 脚、鹤 2 脚 → 与鸡兔同款', '#185fa5');
      line(2, '租船：32 人 7 船，大 6 人小 4 人 → 假设全小船', '#185fa5');
      line(3, '　32 − 7×4 = 4，每大船多 2 人 → 大船 2 条', '#0f6e56');
      line(4, '答题：20 题 +5/−2 得 79 → 假设全对 100 分', '#185fa5');
      line(5, '　差 21，每错一题损失 5 + 2 = 7 分 → 错 3 题', '#0f6e56');
      ctx.fillStyle = '#c0392b'; ctx.font = 'bold 14px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.fillText('变式先算「单件差」——别死记 ÷2！', x0, y + 7 * st);
    }
    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '列表慢但**稳**，规律就在行与行之间。'
        : mode === 2 ? '换故事不换**公式**：差额 ÷ 单件差。'
          : '**假设 → 差额 → 调整 → 检验**。') + '</span>';
  }
  cSlider(s0.ctrl, '模式', mode, 0, 3, 1, function (v) { mode = v; p.mode = v; draw(); });
  cSlider(s0.ctrl, '头数', H, 3, 12, 1, function (v) { H = v; p.h = v; draw(); });
  cSlider(s0.ctrl, '脚数', F, H * 2, H * 4, 2, function (v) { F = v; p.f = v; draw(); });
  draw();
}
