/* ===== 小学二年级上册（p2a） ===== */

/* 汉字数字（1~99） */
var P_CN = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
function pCn(n) {
  if (n < 10) return P_CN[n];
  if (n < 20) return '十' + (n % 10 ? P_CN[n % 10] : '');
  return P_CN[Math.floor(n / 10)] + '十' + (n % 10 ? P_CN[n % 10] : '');
}

/* 刻度尺：从 x 起，cm 段，每段 px 宽 */
function pRuler(ctx, x, y, cm, per, labelEvery) {
  var i;
  pRect(ctx, x, y, cm * per, 30, '#fdf6e3', '#9aa7b4', 1.6);
  for (i = 0; i <= cm; i++) {
    var tx = x + i * per;
    pLine(ctx, tx, y, tx, y + (i % labelEvery === 0 ? 14 : 8), '#6b7a89', i % labelEvery === 0 ? 1.6 : 1);
    if (i % labelEvery === 0) {
      ctx.fillStyle = '#2c3e50';
      ctx.font = '11px "PingFang SC","Microsoft YaHei",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(String(i), tx, y + 24);
      ctx.textAlign = 'left';
    }
  }
  pLine(ctx, x, y + 30, x + cm * per, y + 30, '#9aa7b4', 1.6);
}

/* 竖式 */
function pVert(ctx, x, y, a, b, op, r) {
  var i, da = String(a).split('').reverse(), db = String(b).split('').reverse(), dr = String(r).split('').reverse();
  ctx.textAlign = 'center';
  ctx.font = 'bold 24px "PingFang SC","Microsoft YaHei",sans-serif';
  function col(ds, yy, color, n) {
    for (i = 0; i < n; i++) {
      ctx.fillStyle = color;
      ctx.fillText(ds[i] || '', x + 70 - i * 28, yy);
    }
  }
  var n = Math.max(da.length, db.length, dr.length);
  col(da, y, '#2c3e50', n);
  col(db, y + 34, '#2c3e50', n);
  ctx.fillStyle = '#c0392b';
  ctx.fillText(op, x - 2, y + 34);
  pLine(ctx, x - 12, y + 48, x + 86, y + 48, '#2c3e50', 2);
  col(dr, y + 78, '#0f6e56', n);
  ctx.textAlign = 'left';
  ctx.font = 'bold 15px "PingFang SC","Microsoft YaHei",sans-serif';
}

/* 立方体（等距，x,y 为前面左上角） */
function pCube3(ctx, x, y, s, fill, stroke) {
  var d = s * 0.36;
  ctx.fillStyle = fill || '#eef4fa'; ctx.strokeStyle = stroke || '#2c3e50'; ctx.lineWidth = 1.8;
  ctx.beginPath(); ctx.rect(x, y, s, s); ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y); ctx.lineTo(x + d, y - d); ctx.lineTo(x + s + d, y - d); ctx.lineTo(x + s, y);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + s, y); ctx.lineTo(x + s + d, y - d); ctx.lineTo(x + s + d, y + s - d); ctx.lineTo(x + s, y + s);
  ctx.closePath(); ctx.fill(); ctx.stroke();
}

/* 长度单位：厘米 / 米 / 线段 / 估测 */
function p2aLenLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 6, t: 0 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), L = Math.round(p.a), T = Math.round(p.t);
  var rows, info = s0.info;
  var OBJ = ['铅笔', '数学书', '课桌', '教室'];
  var VAL = ['18 厘米', '26 厘米', '70 厘米', '8 米'];
  var WHY = ['铅笔用手拿着，十几厘米', '书本比铅笔长一点', '课桌到膝盖那么高，用厘米', '教室很宽，要用米'];

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '厘米（cm）：量短东西用厘米', '#2c3e50', 1);
      var per = 44;
      pRuler(ctx, 100, 110, 10, per, 1);
      // 被测物
      pRect(ctx, 100, 74, L * per, 24, '#fdecea', '#c0392b', 1.6);
      pTxt(ctx, 100 + L * per / 2, 86, '红纸条', '#c0392b', 0, 1);
      pLine(ctx, 100, 66, 100, 150, '#9aa7b4', 1.4, [4, 4]);
      pTxt(ctx, 50, 200, '红纸条长 ' + L + ' 厘米', '#c0392b', 1);
      pTxt(ctx, 50, 236, '量长度时，物体的左端要对准 0 刻度', '#2c3e50');
      pTxt(ctx, 50, 272, '右端指着几，就是几厘米', '#2c3e50');
      pTxt(ctx, 50, 308, '1 厘米大约是一个指甲盖的宽', '#0f6e56');
      pTxt(ctx, 50, 342, '尺子上每一小格是 1 毫米，10 毫米 = 1 厘米', '#6b7a89');
      pTxt(ctx, 50, 374, '注意：尺子断了也能量，用「大数 − 小数」', '#8a5a00');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '米（m）：量长的东西用米', '#2c3e50', 1);
      pRuler(ctx, 100, 82, 10, 44, 1);
      pTxt(ctx, 100, 68, '这段是 10 厘米', '#6b7a89', 0);
      var bars = Math.min(L, 10);
      for (i = 0; i < bars; i++) pRect(ctx, 100 + i * 44, 132, 40, 28, '#eef4fa', '#185fa5', 1.4);
      pTxt(ctx, 100, 176, '1 米 = 100 厘米，要 ' + 100 + ' 个 1 厘米连起来', '#185fa5');
      pTxt(ctx, 50, 226, '1 米 = 100 厘米', '#c0392b', 1);
      pTxt(ctx, 50, 262, '张开双臂大约 1 米多，门高大约 2 米', '#2c3e50');
      pTxt(ctx, 50, 298, '比 1 米长的东西，用米作单位更合适', '#0f6e56');
      pTxt(ctx, 50, 334, '量身高：1 米 30 厘米 = 130 厘米', '#6b7a89');
      pTxt(ctx, 50, 366, '米和厘米之间是 100 倍，不是 10 倍', '#8a5a00');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '线段：直的、有两个端点、可以量出长度', '#2c3e50', 1);
      var x1 = 100, x2 = 100 + L * 44;
      pLine(ctx, x1, 130, x2, 130, '#c0392b', 4);
      pCirc(ctx, x1, 130, 6, '#c0392b');
      pCirc(ctx, x2, 130, 6, '#c0392b');
      pTxt(ctx, x1, 108, 'A', '#c0392b', 0, 1);
      pTxt(ctx, x2, 108, 'B', '#c0392b', 0, 1);
      pRuler(ctx, x1, 160, 10, 44, 1);
      pTxt(ctx, 50, 226, '线段 AB 长 ' + L + ' 厘米', '#c0392b', 1);
      pTxt(ctx, 50, 262, '画线段：先点一个端点，再量出长度点第二个点', '#2c3e50');
      pTxt(ctx, 50, 298, '线段是直的，不能弯；两端都有端点', '#2c3e50');
      pTxt(ctx, 50, 334, '两点之间，线段最短', '#0f6e56');
      pTxt(ctx, 50, 366, '量线段：0 刻度对准 A，B 对着几就是几厘米', '#6b7a89');
    } else {
      pTxt(ctx, 50, 40, '选单位：先想想这东西大概多长', '#2c3e50', 1);
      for (i = 0; i < 4; i++) {
        var bx = 60 + i * 148, on = i === T;
        pRect(ctx, bx, 80, 132, 150, on ? '#fdecea' : '#f7fafd', on ? '#c0392b' : '#e3ebf3', on ? 2.6 : 1.4);
        pTxt(ctx, bx + 66, 104, OBJ[i], on ? '#c0392b' : '#6b7a89', 0, 1);
        pTxt(ctx, bx + 66, 152, VAL[i], on ? '#c0392b' : '#2c3e50', 1, 1);
        pTxt(ctx, bx + 66, 196, i < 3 ? '用厘米' : '用米', '#0f6e56', 0, 1);
      }
      pTxt(ctx, 50, 258, OBJ[T] + ' 长 ' + VAL[T], '#c0392b', 1);
      pTxt(ctx, 50, 294, WHY[T], '#2c3e50');
      pTxt(ctx, 50, 330, '估测方法：拿熟悉的东西比一比', '#6b7a89');
      pTxt(ctx, 50, 362, '单位选大了或选小了，都会闹笑话', '#8a5a00');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '左端对 **0 刻度**，右端指几就是几厘米。'
        : mode === 1 ? '**1 米 = 100 厘米**。'
          : mode === 2 ? '线段：**直、两个端点、可量**。'
            : '选单位：**先估再选**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['几厘米', L, 1, 10, 1, function (v) { L = Math.round(v); draw(); }, [0, 2]],
    ['选一个物体', T, 0, 3, 1, function (v) { T = Math.round(v); draw(); }, [3]]
  ]);
  draw();
}

/* 100 以内加减法（二）：进位加 / 退位减 / 连加连减 / 解决问题 */
function p2aAdd2Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 38, b: 27, c: 15 }, (cfg && cfg.values) || {});
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
      var sum = A + B, carry = (A % 10) + (B % 10) >= 10;
      pTxt(ctx, 50, 40, '进位加法：个位相加满十，向十位进 1', '#2c3e50', 1);
      pVert(ctx, 120, 90, A, B, '+', sum);
      pTxt(ctx, 250, 100, '个位：' + (A % 10) + ' + ' + (B % 10) + ' = ' + ((A % 10) + (B % 10)), '#c0392b', 0);
      pTxt(ctx, 250, 134, carry ? '满十 → 个位写 ' + (((A % 10) + (B % 10)) % 10) + '，进 1' : '不满十 → 个位直接写 ' + ((A % 10) + (B % 10)), carry ? '#c0392b' : '#0f6e56', 0);
      pTxt(ctx, 250, 168, '十位：' + Math.floor(A / 10) + ' + ' + Math.floor(B / 10) + (carry ? ' + 1 = ' + Math.floor(sum / 10) : ' = ' + Math.floor(sum / 10)), '#185fa5', 0);
      pTxt(ctx, 50, 250, A + ' + ' + B + ' = ' + sum, '#0f6e56', 1);
      pTxt(ctx, 50, 288, '竖式要对齐：个位对个位，十位对十位', '#2c3e50');
      pTxt(ctx, 50, 324, '进位的 1 写在十位下面，别忘了加', '#c0392b');
      pTxt(ctx, 50, 358, '算完用估算检查：' + Math.round(A / 10) * 10 + ' + ' + Math.round(B / 10) * 10 + ' ≈ ' + Math.round(sum / 10) * 10, '#8a5a00');
    } else if (mode === 1) {
      var bb = Math.min(B, A), diff = A - bb, borrow = (A % 10) < (bb % 10);
      pTxt(ctx, 50, 40, '退位减法：个位不够减，向十位借 1 当 10', '#2c3e50', 1);
      pVert(ctx, 120, 90, A, bb, '−', diff);
      pTxt(ctx, 250, 100, '个位：' + (A % 10) + ' − ' + (bb % 10) + (borrow ? ' 不够减 → 借 1 当 10' : ' 够减'), borrow ? '#c0392b' : '#0f6e56', 0);
      pTxt(ctx, 250, 134, borrow ? '变成 ' + (A % 10 + 10) + ' − ' + (bb % 10) + ' = ' + (A % 10 + 10 - bb % 10) : '个位写 ' + (A % 10 - bb % 10), '#185fa5', 0);
      pTxt(ctx, 250, 168, '十位：' + Math.floor(A / 10) + (borrow ? ' − 1（借走 1）' : '') + ' − ' + Math.floor(bb / 10) + ' = ' + Math.floor(diff / 10), '#185fa5', 0);
      pTxt(ctx, 50, 250, A + ' − ' + bb + ' = ' + diff, '#0f6e56', 1);
      pTxt(ctx, 50, 288, '借走的 1 个十，要在十位上减 1', '#c0392b');
      pTxt(ctx, 50, 324, '验算：' + diff + ' + ' + bb + ' = ' + A + '，说明算对了', '#2c3e50');
      pTxt(ctx, 50, 358, '不够减才借，够减直接减', '#6b7a89');
    } else if (mode === 2) {
      var r1 = A + B, r2 = r1 - C;
      pTxt(ctx, 50, 40, '连加连减：按顺序一步一步算', '#2c3e50', 1);
      pRect(ctx, 70, 80, 200, 62, '#eef4fa', '#185fa5', 1.8);
      pTxt(ctx, 170, 100, A + ' + ' + B, '#185fa5', 1, 1);
      pTxt(ctx, 170, 126, '= ' + r1, '#185fa5', 1, 1);
      pArrow(ctx, 282, 111, 322, 111, '#8a5a00', 2);
      pRect(ctx, 330, 80, 200, 62, '#e8f5ef', '#0f6e56', 1.8);
      pTxt(ctx, 430, 100, r1 + ' − ' + C, '#0f6e56', 1, 1);
      pTxt(ctx, 430, 126, '= ' + r2, '#0f6e56', 1, 1);
      pTxt(ctx, 50, 180, '综合式：' + A + ' + ' + B + ' − ' + C + ' = ' + r2, '#c0392b', 1);
      pTxt(ctx, 50, 222, '第一步：' + A + ' + ' + B + ' = ' + r1, '#2c3e50');
      pTxt(ctx, 50, 256, '第二步：' + r1 + ' − ' + C + ' = ' + r2, '#2c3e50');
      pTxt(ctx, 50, 296, '同级运算从左往右，第 2 步要用第 1 步的结果', '#0f6e56');
      pTxt(ctx, 50, 330, '别把两步混在一起算，容易出错', '#6b7a89');
      pTxt(ctx, 50, 364, '把中间结果写下来，最清楚', '#6b7a89');
    } else {
      var first = A + B, left = first - C;
      pTxt(ctx, 50, 40, '两步问题：先算什么，再算什么', '#2c3e50', 1);
      pTxt(ctx, 50, 84, '① 上午卖出 ' + A + ' 个，下午又卖出 ' + B + ' 个', '#2c3e50');
      pTxt(ctx, 50, 118, '② 一共卖出多少个？', '#185fa5');
      pTxt(ctx, 50, 152, A + ' + ' + B + ' = ' + first + '（个）', '#185fa5', 1);
      pTxt(ctx, 50, 196, '③ 后来又退回来 ' + C + ' 个，还剩多少个？', '#0f6e56');
      pTxt(ctx, 50, 230, first + ' − ' + C + ' = ' + left + '（个）', '#0f6e56', 1);
      pTxt(ctx, 50, 274, '先求出中间量，再用它算最后答案', '#c0392b');
      pTxt(ctx, 50, 308, '每个算式后面都要写单位', '#6b7a89');
      pTxt(ctx, 50, 342, '答：还剩 ' + left + ' 个。', '#2c3e50');
      pTxt(ctx, 50, 374, '检查：答案比原来少了吗？合理吗？', '#8a5a00');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '个位满十 → **向十位进 1**。'
        : mode === 1 ? '个位不够减 → **借 1 当 10**。'
          : mode === 2 ? '同级运算**从左往右**。'
            : '两步问题：**先求中间量**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['第一个数', A, 21, 89, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第二个数', B, 11, 59, 1, function (v) { B = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第三个数', C, 1, 30, 1, function (v) { C = Math.round(v); draw(); }, [2, 3]]
  ]);
  draw();
}

/* 角：组成 / 直锐钝 / 数角 / 画角 */
function pDrawAngle(ctx, cx, cy, len, deg, color, lw) {
  var r = deg * Math.PI / 180;
  pLine(ctx, cx, cy, cx + len, cy, color, lw);
  pLine(ctx, cx, cy, cx + len * Math.cos(-r), cy + len * Math.sin(-r), color, lw);
  pCirc(ctx, cx, cy, 4, color);
  ctx.strokeStyle = color; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy, 34, 0, -r, true); ctx.stroke();
}

function p2aAngleLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 60, b: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), D = Math.round(p.a), N = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j, k;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '一个角有 1 个顶点、2 条边', '#2c3e50', 1);
      pDrawAngle(ctx, 210, 300, 168, D, '#c0392b', 3);
      pTxt(ctx, 210, 330, '顶点', '#c0392b', 0, 1);
      pTxt(ctx, 320, 288, '边', '#c0392b', 0);
      var mx = 210 + 82 * Math.cos(D * Math.PI / 180 / 2), my = 300 - 82 * Math.sin(D * Math.PI / 180 / 2);
      pTxt(ctx, mx + 12, my, '边', '#c0392b', 0);
      pTxt(ctx, 400, 110, '角的两条边是射线，', '#2c3e50', 0);
      pTxt(ctx, 400, 142, '从同一点出发，可以无限延伸', '#2c3e50', 0);
      pTxt(ctx, 400, 186, '角的大小与边的长短无关，', '#c0392b', 0);
      pTxt(ctx, 400, 218, '只看两条边张开的程度', '#c0392b', 0);
      pTxt(ctx, 50, 372, '这个角是 ' + D + '°：把边再画长，度数不变', '#6b7a89');
    } else if (mode === 1) {
      var kind = D < 90 ? '锐角' : D === 90 ? '直角' : '钝角';
      pTxt(ctx, 50, 40, '和直角比一比，就知道是哪一种角', '#2c3e50', 1);
      pDrawAngle(ctx, 200, 290, 165, D, '#c0392b', 3);
      // 直角参考
      pLine(ctx, 200, 290, 200, 130, '#9aa7b4', 2, [6, 5]);
      pLine(ctx, 200, 290, 365, 290, '#9aa7b4', 2, [6, 5]);
      ctx.setLineDash([]);
      pTxt(ctx, 208, 134, '直角边（参考）', '#9aa7b4', 0);
      pTxt(ctx, 400, 110, '锐角 < 90°', D < 90 ? '#c0392b' : '#8a97a4', 1, 0);
      pTxt(ctx, 400, 152, '直角 = 90°', D === 90 ? '#c0392b' : '#8a97a4', 1, 0);
      pTxt(ctx, 400, 194, '钝角 > 90°', D > 90 ? '#c0392b' : '#8a97a4', 1, 0);
      pTxt(ctx, 400, 240, '当前 ' + D + '° → ' + kind, '#0f6e56');
      pTxt(ctx, 50, 330, '比直角小的是锐角，比直角大的是钝角', '#2c3e50');
      pTxt(ctx, 50, 364, '判断时用三角尺的直角去比，一目了然', '#6b7a89');
    } else if (mode === 2) {
      var rays = N + 1, cnt = rays * (rays - 1) / 2;
      pTxt(ctx, 50, 40, '从一个顶点引出几条射线，数一数有几个角', '#2c3e50', 1);
      var ox = 130, oy = 320, base = 90;
      for (i = 0; i < rays; i++) {
        var ang = base * i / (rays - 1);
        pLine(ctx, ox, oy, ox + 190 * Math.cos(-ang * Math.PI / 180), oy + 190 * Math.sin(-ang * Math.PI / 180),
          i === 0 ? '#c0392b' : '#185fa5', 2.4);
      }
      pCirc(ctx, ox, oy, 5, '#2c3e50');
      pTxt(ctx, ox - 20, oy + 24, '顶点', '#2c3e50', 0);
      pTxt(ctx, 400, 110, '射线 ' + rays + ' 条', '#185fa5', 1, 0);
      pTxt(ctx, 400, 148, '相邻射线组成 ' + (rays - 1) + ' 个角', '#6b7a89', 0);
      pTxt(ctx, 400, 184, '角的总数 = 1 + 2 + … + ' + (rays - 1), '#c0392b', 1, 0);
      pTxt(ctx, 400, 220, '= ' + cnt + ' 个', '#c0392b', 1, 0);
      pTxt(ctx, 50, 372, '有序地数：先数最小的，再数合成的，不重不漏', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">' + rays + ' 条射线 → **' + cnt + ' 个角**（1+2+…+' + (rays - 1) + '）。</span>';
    } else {
      pTxt(ctx, 50, 40, '画角三步：画射线 → 对中心 → 标度数', '#2c3e50', 1);
      pDrawAngle(ctx, 210, 300, 168, D, '#c0392b', 3);
      pTxt(ctx, 300, 316, '① 先画一条射线', '#185fa5', 0, 1);
      pTxt(ctx, 300, 190, '② 量角器中心对准顶点', '#8a5a00', 0);
      pTxt(ctx, 300, 222, '③ 0 刻度线对齐那条边', '#8a5a00', 0);
      pTxt(ctx, 300, 254, '④ 在内圈找到 ' + D + '° 点个点', '#8a5a00', 0);
      pTxt(ctx, 300, 286, '⑤ 连顶点和这个点，标上度数', '#8a5a00', 0);
      pTxt(ctx, 50, 356, '画出的角是 ' + D + '°（' + (D < 90 ? '锐角' : D === 90 ? '直角' : '钝角') + '）', '#c0392b');
      pTxt(ctx, 50, 386, '角的大小与边画多长没有关系', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">画角：**射线 → 对中心 → 找刻度 → 连线标度数**。</span>';
    }

    if (mode !== 2 && mode !== 3) {
      info.innerHTML = '<span class="viz-meta">' +
        (mode === 0 ? '角 = **1 顶点 + 2 条边**，大小只看张开程度。'
          : '与直角比：**小=锐角、等=直角、大=钝角**。') + '</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['角的度数', D, 10, 170, 5, function (v) { D = Math.round(v); draw(); }, [0, 1, 3]],
    ['射线几条', N, 2, 5, 1, function (v) { N = Math.round(v); draw(); }, [2]]
  ]);
  draw();
}

/* 表内乘法（一）：意义 / 5 的口诀 / 2、3、4 的口诀 / 解决问题 */
function p2aMult1Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 4, b: 3 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      var grp = Math.min(B, 5), each = Math.min(A, 6);
      pTxt(ctx, 50, 40, '乘法：求几个相同加数的和', '#2c3e50', 1);
      for (i = 0; i < grp; i++) {
        pRect(ctx, 70 + i * 106, 78, 94, 108, '#f7fafd', '#e3ebf3', 1.4);
        for (j = 0; j < each; j++) pCirc(ctx, 92 + i * 106 + (j % 3) * 26, 102 + Math.floor(j / 3) * 30, 9, '#c0392b');
        pTxt(ctx, 117 + i * 106, 172, '第 ' + (i + 1) + ' 盘', '#6b7a89', 0, 1);
      }
      var add = [];
      for (i = 0; i < grp; i++) add.push(A);
      pTxt(ctx, 50, 216, add.join(' + ') + ' = ' + (A * B), '#8a5a00', 0);
      pTxt(ctx, 50, 254, A + ' × ' + B + ' = ' + (A * B), '#c0392b', 1);
      pTxt(ctx, 50, 290, '每盘 ' + A + ' 个，共 ' + B + ' 盘 → ' + A + ' 个 ' + B + ' 相加', '#2c3e50');
      pTxt(ctx, 50, 326, '求几个相同加数的和，用乘法更简便', '#0f6e56');
      pTxt(ctx, 50, 360, '读作：' + A + ' 乘 ' + B + ' 等于 ' + (A * B), '#6b7a89');
    } else if (mode === 1) {
      var n = Math.min(B, 9);
      pTxt(ctx, 50, 40, '5 的乘法口诀：每次多 5', '#2c3e50', 1);
      for (i = 0; i < n; i++) {
        var bx = 60 + i * 60;
        pRect(ctx, bx, 82, 50, 50, '#fdecea', '#c0392b', 1.6);
        pTxt(ctx, bx + 25, 107, '5', '#c0392b', 1, 1);
        pTxt(ctx, bx + 25, 152, '×' + (i + 1), '#6b7a89', 0, 1);
        pTxt(ctx, bx + 25, 176, String(5 * (i + 1)), '#0f6e56', 0, 1);
      }
      pTxt(ctx, 50, 220, '5 × ' + n + ' = ' + (5 * n), '#c0392b', 1);
      pTxt(ctx, 50, 256, '口诀：' + (n === 5 ? '五五二十五' : '五' + pCn(n) + (5 * n < 10 ? '得' : '') + pCn(5 * n)), '#0f6e56', 1);
      pTxt(ctx, 50, 294, '个位不是 0 就是 5 —— 5 的倍数特征', '#2c3e50');
      pTxt(ctx, 50, 330, '一只手 5 个手指，两只手 10 个，很好记', '#6b7a89');
      pTxt(ctx, 50, 364, '五的口诀有 9 句，从一五得五到五九四十五', '#8a5a00');
    } else if (mode === 2) {
      var a2 = Math.max(2, Math.min(4, A)), b2 = Math.min(B, 9), prod = a2 * b2;
      pTxt(ctx, 50, 40, '2、3、4 的口诀：交换位置用同一句', '#2c3e50', 1);
      for (i = 0; i < b2; i++) {
        for (j = 0; j < a2; j++) pCirc(ctx, 80 + i * 52 + (j % 2) * 20, 90 + Math.floor(j / 2) * 24, 8, '#185fa5');
        pTxt(ctx, 90 + i * 52, 158, (i + 1) + ' 组', '#6b7a89', 0, 1);
      }
      pTxt(ctx, 50, 200, a2 + ' × ' + b2 + ' = ' + prod + '，' + b2 + ' × ' + a2 + ' = ' + prod, '#c0392b', 1);
      pTxt(ctx, 50, 238, '口诀：' + pCn(Math.min(a2, b2)) + pCn(Math.max(a2, b2)) + (prod < 10 ? '得' : '') + pCn(prod), '#0f6e56', 1);
      pTxt(ctx, 50, 276, '一句口诀能算两道乘法：' + a2 + '×' + b2 + ' 和 ' + b2 + '×' + a2, '#2c3e50');
      pTxt(ctx, 50, 312, '每组的个数 × 组数 = 总数', '#6b7a89');
      pTxt(ctx, 50, 346, '记不住就回到「几个几相加」想一遍', '#8a5a00');
      pTxt(ctx, 50, 378, '2 的口诀相邻两句差 2，3 的差 3，4 的差 4', '#8a97a4');
    } else {
      var per = Math.min(A, 9), num = Math.min(B, 9);
      pTxt(ctx, 50, 40, '用乘法解决：先找「每份多少」和「有几份」', '#2c3e50', 1);
      var sp3 = Math.min(82, Math.floor(500 / num));
      for (i = 0; i < num; i++) {
        pRect(ctx, 70 + i * sp3, 80, sp3 - 10, 72, '#eef4fa', '#185fa5', 1.4);
        for (j = 0; j < Math.min(per, 4); j++) pCirc(ctx, 86 + i * sp3 + (j % 2) * 20, 100 + Math.floor(j / 2) * 30, 7, '#185fa5');
      }
      pTxt(ctx, 50, 180, '每盒 ' + per + ' 个，共 ' + num + ' 盒', '#2c3e50', 1);
      pTxt(ctx, 50, 216, per + ' × ' + num + ' = ' + (per * num) + '（个）', '#c0392b', 1);
      pTxt(ctx, 50, 256, '「每份数 × 份数 = 总数」是乘法的基本模型', '#0f6e56');
      pTxt(ctx, 50, 292, '看到「几个几」就想乘法', '#2c3e50');
      pTxt(ctx, 50, 326, '求「一共」也可能是乘法，要和加法分清', '#6b7a89');
      pTxt(ctx, 50, 360, '相同加数用乘法，不同加数用加法', '#8a5a00');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '乘法 = **几个几相加**。'
        : mode === 1 ? '5 的口诀：**每次多 5**。'
          : mode === 2 ? '**一句口诀两道乘法**。'
            : '**每份数 × 份数 = 总数**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['每份几个', A, 1, 9, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['有几份', B, 1, 9, 1, function (v) { B = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}

/* 观察物体：不同方向 / 观察立体 / 积木组合 / 推理 */
function p2aViewLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 0, b: 1 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), V = Math.round(p.a), T = Math.round(p.b);
  var rows, info = s0.info;
  var DIR = ['从前面看', '从上面看', '从左面看', '从右面看'];

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pTxt(ctx, 50, 40, '站的位置不同，看到的形状就不同', '#2c3e50', 1);
      pCube3(ctx, 230, 150, 92, '#eef4fa', '#2c3e50');
      pArrow(ctx, 120, 250, 220, 250, V === 0 ? '#c0392b' : '#c2cdd8', 2.6);
      pArrow(ctx, 398, 82, 352, 122, V === 1 ? '#c0392b' : '#c2cdd8', 2.6);
      pArrow(ctx, 120, 140, 220, 170, V === 2 ? '#c0392b' : '#c2cdd8', 2.6);
      pTxt(ctx, 100, 270, '前面', V === 0 ? '#c0392b' : '#8a97a4', 0, 1);
      pTxt(ctx, 402, 60, '上面', V === 1 ? '#c0392b' : '#8a97a4', 0, 1);
      pTxt(ctx, 96, 122, '左面', V === 2 ? '#c0392b' : '#8a97a4', 0, 1);
      pRect(ctx, 430, 96, 130, 130, V === 0 ? '#fdecea' : '#f7fafd', V === 0 ? '#c0392b' : '#dfe8f1', 2);
      pTxt(ctx, 495, 161, '长方形', V === 0 ? '#c0392b' : '#8a97a4', 1, 1);
      pTxt(ctx, 495, 250, DIR[V], '#0f6e56', 0, 1);
      pTxt(ctx, 50, 320, '一个立体图形，从不同方向看，形状可能不一样', '#2c3e50');
      pTxt(ctx, 50, 354, '观察时要「正对着」看，不能斜着看', '#6b7a89');
      pTxt(ctx, 50, 386, '记住三个方向：前面、上面、侧面', '#8a5a00');
    } else if (mode === 1) {
      pTxt(ctx, 50, 40, '正方体的三个方向看到的都是正方形', '#2c3e50', 1);
      var kind = T % 3;
      if (kind === 0) pCube3(ctx, 200, 130, 100, '#eef4fa', '#2c3e50');
      else if (kind === 1) pSolid(ctx, 2, 260, 160, 96, false);
      else pSolid(ctx, 3, 260, 170, 88, false);
      var seen = kind === 0 ? '正方形' : kind === 1 ? '圆' : '圆';
      pRect(ctx, 420, 90, 140, 140, '#fdecea', '#c0392b', 2);
      if (kind === 0) pRect(ctx, 452, 122, 76, 76, '#fdecea', '#c0392b', 2.4);
      else pCirc(ctx, 490, 160, 44, '#fdecea', '#c0392b', 2.4);
      pTxt(ctx, 490, 252, '看到的：' + seen, '#c0392b', 0, 1);
      pTxt(ctx, 50, 286, kind === 0 ? '正方体 6 个面都是正方形，从哪看都一样' : kind === 1 ? '圆柱从上面看是圆，从前面看是长方形' : '球从任何方向看都是圆', '#2c3e50');
      pTxt(ctx, 50, 322, '一个方向看到的形状，不能确定整个物体', '#6b7a89');
      pTxt(ctx, 50, 356, '要几个方向一起看，才能判断是什么', '#6b7a89');
      pTxt(ctx, 50, 386, '「看到圆」的东西可能是球、圆柱、圆锥', '#8a5a00');
    } else if (mode === 2) {
      var cubes = [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]];
      var cntMap = { 0: 2, 1: 2, 2: 1 };
      pTxt(ctx, 50, 40, '搭积木：从上面看，看到几个正方形？', '#2c3e50', 1);
      for (i = 0; i < cubes.length; i++) {
        var cx = 170 + cubes[i][0] * 66, cy = 230 - cubes[i][1] * 54 - cubes[i][0] * 24;
        pCube3(ctx, cx, cy, 62, i % 2 ? '#e7f0fa' : '#eef4fa', '#2c3e50');
      }
      pRect(ctx, 400, 110, 180, 140, '#f7fafd', '#9aa7b4', 1.8);
      pTxt(ctx, 490, 130, '从上面看到的形状', '#6b7a89', 0, 1);
      var grid = [[1, 1], [1, 1], [1, 0]];
      for (i = 0; i < 3; i++) {
        for (var j = 0; j < 2; j++) {
          pRect(ctx, 430 + j * 54, 152 + i * 34, 52, 32, grid[i][j] ? '#fdecea' : '#ffffff', grid[i][j] ? '#c0392b' : '#e3ebf3', 1.4);
        }
      }
      pTxt(ctx, 50, 300, '从上面看是 2 列 3 行，共看到 5 个正方形', '#c0392b', 1);
      pTxt(ctx, 50, 336, '看不到被压住的那几个，只看「最上层」', '#2c3e50');
      pTxt(ctx, 50, 368, '从上面看＝把积木拍扁，看占地形状', '#0f6e56');
    } else {
      pTxt(ctx, 50, 40, '三个人站在不同位置，各看到什么？', '#2c3e50', 1);
      pCube3(ctx, 210, 140, 86, '#eef4fa', '#2c3e50');
      pCube3(ctx, 300, 140, 86, '#e7f0fa', '#2c3e50');
      pTxt(ctx, 120, 320, '甲（前面）', '#c0392b', 0, 1);
      pTxt(ctx, 400, 90, '乙（上面）', '#185fa5', 0, 1);
      pTxt(ctx, 520, 280, '丙（侧面）', '#0f6e56', 0, 1);
      pArrow(ctx, 120, 296, 190, 250, '#c0392b', 2);
      pArrow(ctx, 400, 110, 340, 150, '#185fa5', 2);
      pArrow(ctx, 500, 262, 400, 210, '#0f6e56', 2);
      pTxt(ctx, 50, 360, '甲看到「横着 2 个正方形」，乙看到「上下 2 个」，丙看到 1 个', '#2c3e50');
      pTxt(ctx, 50, 390, '推理时先把每个人的方向画出来，再想他看到的面', '#8a5a00');
      info.innerHTML = '<span class="viz-meta">推理：**先定方向，再看面**。</span>';
    }

    if (mode < 3) {
      info.innerHTML = '<span class="viz-meta">' +
        (mode === 0 ? '**位置不同，形状不同**。'
          : mode === 1 ? '一个方向**不能**确定立体。'
            : '从上面看 = 看**占地形状**。') + '</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['从哪个方向看', V, 0, 2, 1, function (v) { V = Math.round(v); draw(); }, [0]],
    ['选一个立体', T, 0, 2, 1, function (v) { T = Math.round(v); draw(); }, [1]]
  ]);
  draw();
}

/* 表内乘法（二）：6、7 / 8、9 / 口诀表 / 乘加乘减 */
function p2aMult2Lab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 6, b: 4 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0 || mode === 1) {
      var base = mode === 0 ? (A <= 7 ? A : 6) : (A >= 8 ? A : 8);
      var n = Math.min(B + 2, 9), prod = base * n;
      pTxt(ctx, 50, 40, base + ' 的口诀：每句比前一句多 ' + base, '#2c3e50', 1);
      var row = 0, colN = 0;
      for (i = 1; i <= n; i++) {
        var bx = 60 + ((i - 1) % 3) * 190, by = 80 + Math.floor((i - 1) / 3) * 62;
        pRect(ctx, bx, by, 172, 50, i === n ? '#fdecea' : '#f7fafd', i === n ? '#c0392b' : '#e3ebf3', i === n ? 2.2 : 1.4);
        pTxt(ctx, bx + 12, by + 16, base + ' × ' + i + ' = ' + (base * i), i === n ? '#c0392b' : '#2c3e50', 0);
        pTxt(ctx, bx + 12, by + 36, pCn(Math.min(base, i)) + pCn(Math.max(base, i)) + (base * i < 10 ? '得' : '') + pCn(base * i), '#6b7a89', 0);
      }
      pTxt(ctx, 50, 296, base + ' × ' + n + ' = ' + prod, '#c0392b', 1);
      pTxt(ctx, 50, 332, base + ' 个 ' + n + ' 相加，或用口诀直接得数', '#2c3e50');
      pTxt(ctx, 50, 366, base >= 8 ? '8、9 的口诀最难：' + base + '×' + n + ' 可以想 ' + (10 * n) + ' − ' + ((10 - base) * n) : '6、7 的口诀：拆成「5 的口诀 + 几个」', '#8a5a00');
    } else if (mode === 2) {
      var unknown = Math.min(B, 9);
      pTxt(ctx, 50, 40, '口诀表里填未知数：想「几几得几」', '#2c3e50', 1);
      pRect(ctx, 70, 80, 320, 60, '#fdecea', '#c0392b', 2);
      pTxt(ctx, 90, 110, '（  ）× 7 = ' + (7 * unknown), '#c0392b', 1);
      pTxt(ctx, 430, 110, '想：七几' + pCn(7 * unknown), '#6b7a89', 0);
      pTxt(ctx, 50, 180, '因为 7 × ' + unknown + ' = ' + (7 * unknown) + '，所以括号里填 ' + unknown, '#0f6e56', 1);
      pTxt(ctx, 50, 220, '括号里求的是「几个 7 加起来等于 ' + (7 * unknown) + '」', '#2c3e50');
      pTxt(ctx, 50, 256, '这类题要熟口诀，正着背也要能倒着用', '#6b7a89');
      pTxt(ctx, 50, 292, '同样：7 × （  ）= ' + (7 * unknown) + ' 答案一样', '#6b7a89');
      pTxt(ctx, 50, 328, '检验：把答案代回去乘一遍', '#0f6e56');
      pTxt(ctx, 50, 362, '乘法交换律让一个口诀管两道题', '#8a5a00');
    } else {
      var a3 = Math.min(A, 9), b3 = Math.min(B, 9), c3 = Math.min(6, 9), sum = a3 * b3 + c3;
      pTxt(ctx, 50, 40, '乘加乘减：先算乘法，再算加减', '#2c3e50', 1);
      pRect(ctx, 70, 78, 180, 56, '#eef4fa', '#185fa5', 1.8);
      pTxt(ctx, 160, 106, a3 + ' × ' + b3 + ' = ' + (a3 * b3), '#185fa5', 1, 1);
      pRect(ctx, 270, 78, 180, 56, '#fdf3dd', '#8a5a00', 1.8);
      pTxt(ctx, 360, 106, (a3 * b3) + ' + ' + c3 + ' = ' + sum, '#8a5a00', 1, 1);
      pTxt(ctx, 50, 172, a3 + ' × ' + b3 + ' + ' + c3 + ' = ' + sum, '#c0392b', 1);
      pTxt(ctx, 50, 212, '先算 ' + a3 + ' × ' + b3 + '，再加上 ' + c3, '#2c3e50');
      pTxt(ctx, 50, 248, '乘减：' + a3 + ' × ' + b3 + ' − ' + c3 + ' = ' + (a3 * b3 - c3), '#0f6e56');
      pTxt(ctx, 50, 286, '乘法是「更高级的加法」，所以先算', '#6b7a89');
      pTxt(ctx, 50, 322, '看清符号：乘号不是加号', '#6b7a89');
      pTxt(ctx, 50, 356, '算完再看一遍有没有漏加的', '#8a5a00');
    }

    info.innerHTML = '<span class="viz-meta">' +
      (mode === 0 ? '**每句比前一句多 ' + (A <= 7 ? A : 6) + '**。'
        : mode === 1 ? '8、9 的口诀可以**用 10 减**来记。'
          : mode === 2 ? '口诀要能**倒着用**。'
            : '**先乘除、后加减**。') + '</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['乘数', A, 1, 9, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['另一个数', B, 1, 9, 1, function (v) { B = Math.round(v); draw(); }, [0, 1, 2, 3]]
  ]);
  draw();
}

/* 认识时间：分针与 5 分 / 读写 / 1 时=60 分 / 经过时间 */
function p2aTimeLab(el, cfg) {
  var p = Object.assign({ mode: 0, h: 8, m: 15 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), H = Math.round(p.h), M = Math.round(p.m);
  var rows, info = s0.info;

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      pClock(ctx, 200, 190, 118, H, M, { fiveMin: true });
      pTxt(ctx, 370, 70, '分针走 1 小格 = 1 分', '#2c3e50', 0);
      pTxt(ctx, 370, 104, '分针走 1 大格 = 5 分', '#c0392b', 0);
      pTxt(ctx, 370, 138, '转一圈 = 12 大格 = 60 分', '#0f6e56', 0);
      pTxt(ctx, 370, 186, '现在分针指着 ' + M + ' 分', '#c0392b', 1, 0);
      pTxt(ctx, 370, 220, '也就是第 ' + (M / 5) + ' 大格', '#2c3e50', 0);
      pTxt(ctx, 370, 258, '5、10、15… 一大格一大格地数', '#6b7a89', 0);
      pTxt(ctx, 370, 296, '分针指 3 是 15 分，指 6 是 30 分', '#6b7a89', 0);
      pTxt(ctx, 50, 356, '数分的时候，用「大格 ×5 + 小格」最快', '#8a5a00');
    } else if (mode === 1) {
      pClock(ctx, 200, 190, 118, H, M, {});
      pTxt(ctx, 370, 80, '先看时针过了几，', '#2c3e50', 0);
      pTxt(ctx, 370, 112, '再看分针指到几分', '#2c3e50', 0);
      pBig(ctx, 470, 176, clkMin(H) + ':' + clkMin(M), '#c0392b', 40);
      pTxt(ctx, 370, 216, '读作：' + clkText(H, M), '#c0392b', 1, 0);
      pTxt(ctx, 370, 254, '电子写法要补 0：' + clkMin(H) + ':' + clkMin(M), '#0f6e56', 0);
      pTxt(ctx, 370, 292, '时针指在 ' + H + ' 和 ' + ((H % 12) + 1) + ' 之间，就是 ' + H + ' 时多', '#6b7a89', 0);
      pTxt(ctx, 50, 356, '注意：几时几分不要读成「几点几分」混用', '#8a5a00');
    } else if (mode === 2) {
      pTxt(ctx, 50, 40, '1 时 = 60 分：时针走 1 大格，分针走 1 圈', '#2c3e50', 1);
      pClock(ctx, 160, 180, 100, H, 0, {});
      pTxt(ctx, 160, 306, '刚开始：' + H + ' 时', '#6b7a89', 0, 1);
      pArrow(ctx, 292, 180, 332, 180, '#8a5a00', 2);
      pClock(ctx, 440, 180, 100, H + 1, 0, {});
      pTxt(ctx, 440, 306, '1 小时后：' + (H % 12 + 1) + ' 时', '#c0392b', 0, 1);
      pTxt(ctx, 50, 340, '分针转一圈 60 分，时针才走 1 大格（1 时）', '#0f6e56');
      pTxt(ctx, 50, 372, '半小时 = 30 分，分针走半圈', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">**1 时 = 60 分**，分针 1 圈 = 时针 1 大格。</span>';
    } else {
      var startM = M, endM = M + 25 > 55 ? 55 : M + 25, pass = endM - startM;
      pTxt(ctx, 50, 40, '经过时间：结束时刻 − 开始时刻', '#2c3e50', 1);
      pClock(ctx, 160, 175, 96, H, startM, {});
      pTxt(ctx, 160, 296, '开始 ' + clkMin(H) + ':' + clkMin(startM), '#185fa5', 0, 1);
      pTxt(ctx, 320, 175, '→', '#8a5a00', 1, 1);
      pClock(ctx, 470, 175, 96, H, endM, {});
      pTxt(ctx, 470, 296, '结束 ' + clkMin(H) + ':' + clkMin(endM), '#c0392b', 0, 1);
      pTxt(ctx, 50, 336, '经过了 ' + pass + ' 分', '#c0392b', 1);
      pTxt(ctx, 50, 368, '同一小时内：分针刻度相减就行', '#6b7a89');
      info.innerHTML = '<span class="viz-meta">经过 ' + pass + ' 分（' + clkMin(startM) + ' → ' + clkMin(endM) + '）。</span>';
    }

    if (mode === 0) info.innerHTML = '<span class="viz-meta">分针 **1 大格 = 5 分**，一圈 = 60 分。</span>';
    if (mode === 1) info.innerHTML = '<span class="viz-meta">先读**时**，再读**分**。</span>';
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['几时', H, 1, 12, 1, function (v) { H = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['几分', M, 0, 55, 5, function (v) { M = Math.round(v); draw(); }, [0, 1, 3]]
  ]);
  draw();
}

/* 数学广角——搭配（一） */
function p2aMatchLab(el, cfg) {
  var p = Object.assign({ mode: 0, a: 3, b: 2 }, (cfg && cfg.values) || {});
  var s0 = circleScaffold(el);
  var mode = Math.round(p.mode), A = Math.round(p.a), B = Math.round(p.b);
  var rows, info = s0.info;
  var COLS = ['#c0392b', '#185fa5', '#0f6e56', '#8a5a00', '#7a3f9d'];

  function draw() {
    pVis(rows, mode);
    var m = linMap(s0.cv, { xmin: 0, xmax: 640, ymin: 0, ymax: 400 }, 0);
    var ctx = m.ctx, i, j;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, m.w, m.h);
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';

    if (mode === 0) {
      var tops = Math.min(A, 4), bots = Math.min(B, 4), total = tops * bots;
      pTxt(ctx, 50, 40, '上衣和裤子搭配：每一件都要配到', '#2c3e50', 1);
      for (i = 0; i < tops; i++) {
        pRect(ctx, 60, 84 + i * 58, 90, 46, '#fdecea', '#c0392b', 1.6);
        pTxt(ctx, 105, 107 + i * 58, '上衣' + (i + 1), '#c0392b', 0, 1);
      }
      for (j = 0; j < bots; j++) {
        pRect(ctx, 340, 84 + j * 58, 90, 46, '#eef4fa', '#185fa5', 1.6);
        pTxt(ctx, 385, 107 + j * 58, '裤子' + (j + 1), '#185fa5', 0, 1);
      }
      for (i = 0; i < tops; i++) {
        for (j = 0; j < bots; j++) {
          pLine(ctx, 152, 107 + i * 58, 338, 107 + j * 58, COLS[(i * bots + j) % 5], 1.2, null);
        }
      }
      pTxt(ctx, 50, 322, tops + ' 件上衣 × ' + bots + ' 条裤子 = ' + total + ' 种搭配', '#c0392b', 1);
      pTxt(ctx, 50, 356, '每一条线就是一种搭法：先定上衣，再配裤子', '#2c3e50');
      pTxt(ctx, 50, 386, '有序地想，才不会漏也不会重复', '#0f6e56');
      info.innerHTML = '<span class="viz-meta">' + tops + ' × ' + bots + ' = **' + total + ' 种**。</span>';
    } else if (mode === 1) {
      var ds = Math.min(A, 4), cnt2 = ds * (ds - 1);
      pTxt(ctx, 50, 40, '用数字组两位数：十位和个位不能相同', '#2c3e50', 1);
      for (i = 0; i < ds; i++) {
        pRect(ctx, 70 + i * 70, 78, 58, 50, '#eef4fa', '#185fa5', 1.6);
        pTxt(ctx, 99 + i * 70, 103, String(i + 1), '#185fa5', 1, 1);
      }
      pTxt(ctx, 70, 152, '可选数字：' + (function () { var s = [], q; for (q = 1; q <= ds; q++) s.push(q); return s.join('、'); })(), '#6b7a89', 0);
      var k = 0;
      for (i = 1; i <= ds; i++) {
        for (j = 1; j <= ds; j++) {
          if (i === j) continue;
          var bx = 60 + (k % 5) * 104, by = 186 + Math.floor(k / 5) * 50;
          pRect(ctx, bx, by, 88, 40, '#f7fafd', '#dfe8f1', 1.2);
          pTxt(ctx, bx + 44, by + 20, String(i) + String(j), '#2c3e50', 1, 1);
          k++;
        }
      }
      pTxt(ctx, 50, 330, '共 ' + cnt2 + ' 个两位数：' + ds + ' × ' + (ds - 1) + ' = ' + cnt2, '#c0392b', 1);
      pTxt(ctx, 50, 364, '先定十位，个位再挑剩下的，就有序了', '#0f6e56');
      info.innerHTML = '<span class="viz-meta">' + ds + ' × ' + (ds - 1) + ' = **' + cnt2 + ' 个**。</span>';
    } else if (mode === 2) {
      var people = Math.min(A, 5), hands = people * (people - 1) / 2;
      pTxt(ctx, 50, 40, '握手：每两人握一次，不能重复', '#2c3e50', 1);
      for (i = 0; i < people; i++) {
        var ang = -Math.PI / 2 + i * 2 * Math.PI / people;
        var px = 220 + 120 * Math.cos(ang), py = 200 + 110 * Math.sin(ang);
        pCirc(ctx, px, py, 22, COLS[i], null);
        pTxt(ctx, px, py, pCn(i + 1), '#ffffff', 0, 1);
      }
      for (i = 0; i < people; i++) {
        for (j = i + 1; j < people; j++) {
          var a1 = -Math.PI / 2 + i * 2 * Math.PI / people, a2 = -Math.PI / 2 + j * 2 * Math.PI / people;
          pLine(ctx, 220 + 120 * Math.cos(a1), 200 + 110 * Math.sin(a1), 220 + 120 * Math.cos(a2), 200 + 110 * Math.sin(a2), '#c2cdd8', 1.4);
        }
      }
      pTxt(ctx, 400, 160, people + ' 个人，每人要和 ' + (people - 1) + ' 人握手', '#2c3e50', 0);
      pTxt(ctx, 400, 196, '但每两人之间只算 1 次', '#2c3e50', 0);
      pTxt(ctx, 400, 236, people + '×' + (people - 1) + '÷2 = ' + hands, '#c0392b', 1, 0);
      pTxt(ctx, 50, 340, '共握手 ' + hands + ' 次', '#c0392b', 1);
      pTxt(ctx, 50, 374, '除以 2 是因为甲和乙、乙和甲是同一件事', '#0f6e56');
      info.innerHTML = '<span class="viz-meta">握手 = n(n−1)÷2 = **' + hands + ' 次**。</span>';
    } else {
      var main = Math.min(A, 3), drink = Math.min(B, 2), sweet = 2, tot3 = main * drink * sweet;
      pTxt(ctx, 50, 40, '三类食物各选一种：分步乘起来', '#2c3e50', 1);
      var names = [['米饭', '面条', '饺子'], ['牛奶', '果汁'], ['苹果', '蛋糕']];
      var gx = [60, 250, 420];
      for (i = 0; i < 3; i++) {
        var cnt4 = i === 0 ? main : i === 1 ? drink : sweet;
        pTxt(ctx, gx[i] + 60, 82, ['主食', '饮料', '甜点'][i], '#0f6e56', 0, 1);
        for (j = 0; j < cnt4; j++) {
          pRect(ctx, gx[i], 100 + j * 54, 120, 44, '#f7fafd', COLS[i], 1.4);
          pTxt(ctx, gx[i] + 60, 122 + j * 54, names[i][j], '#2c3e50', 0, 1);
        }
      }
      pTxt(ctx, 50, 292, main + ' 种主食 × ' + drink + ' 种饮料 × ' + sweet + ' 种甜点 = ' + tot3 + ' 种', '#c0392b', 1);
      pTxt(ctx, 50, 328, '先选主食，再选饮料，最后选甜点：一步一步乘', '#2c3e50');
      pTxt(ctx, 50, 362, '搭配问题＝分几步，每步有几种选择', '#0f6e56');
      info.innerHTML = '<span class="viz-meta">' + main + '×' + drink + '×' + sweet + ' = **' + tot3 + ' 种**。</span>';
    }
  }

  rows = pPanel(s0, [
    ['模式', mode, 0, 3, 1, function (v) { mode = Math.round(v); p.mode = mode; draw(); }, null],
    ['第一个数', A, 2, 5, 1, function (v) { A = Math.round(v); draw(); }, [0, 1, 2, 3]],
    ['第二个数', B, 2, 5, 1, function (v) { B = Math.round(v); draw(); }, [0, 3]]
  ]);
  draw();
}
