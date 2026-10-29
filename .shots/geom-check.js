// 几何自检 v2：默认值 + 每个滑块拉到 min/max，检查越界 / NaN / 文字溢出
const fs = require('fs');
const code = fs.readFileSync('assets/viz.js', 'utf8');

const W = 700, H = 400;

function makeRec() {
  const r = { minX: 1e9, maxX: -1e9, minY: 1e9, maxY: -1e9, nan: 0, texts: [] };
  r.pt = (x, y) => {
    if (!isFinite(x) || !isFinite(y)) { r.nan++; return; }
    r.minX = Math.min(r.minX, x); r.maxX = Math.max(r.maxX, x);
    r.minY = Math.min(r.minY, y); r.maxY = Math.max(r.maxY, y);
  };
  r.box = (x, y, w, h) => { r.pt(x, y); r.pt(x + w, y + h); };
  r.text = (t, x, y, align, rotated) => {
    if (!isFinite(x) || !isFinite(y)) { r.nan++; return; }
    let w = 0;
    for (const ch of String(t)) w += ch.charCodeAt(0) > 255 ? 12 : 7;
    r.texts.push({ t, x, y, w, align: align || 'start', rotated: !!rotated });
  };
  r.reset = () => { r.minX = 1e9; r.maxX = -1e9; r.minY = 1e9; r.maxY = -1e9; r.nan = 0; r.texts = []; };
  return r;
}

function makeCtx(rec) {
  const noop = () => {};
  const st = { align: 'start', rot: 0 };
  const stack = [];
  return {
    canvas: null,
    save: () => { stack.push({ align: st.align, rot: st.rot }); },
    restore: () => { const s = stack.pop(); if (s) { st.align = s.align; st.rot = s.rot; } },
    setTransform: noop, setLineDash: noop,
    translate: noop, rotate: () => { st.rot++; }, scale: noop, drawImage: noop, createLinearGradient: () => ({ addColorStop: noop }),
    get textAlign() { return st.align; },
    set textAlign(v) { st.align = v; },
    beginPath: noop, closePath: noop, stroke: noop, fill: noop, clip: noop,
    moveTo: (x, y) => rec.pt(x, y),
    lineTo: (x, y) => rec.pt(x, y),
    bezierCurveTo: (a, b, c, d, x, y) => { rec.pt(a, b); rec.pt(c, d); rec.pt(x, y); },
    quadraticCurveTo: (a, b, x, y) => { rec.pt(a, b); rec.pt(x, y); },
    arc: (x, y, r) => { rec.pt(x - r, y - r); rec.pt(x + r, y + r); },
    ellipse: (x, y, rx, ry) => { rec.pt(x - rx, y - ry); rec.pt(x + rx, y + ry); },
    rect: (x, y, w, h) => rec.box(x, y, w, h),
    fillRect: (x, y, w, h) => rec.box(x, y, w, h),
    strokeRect: (x, y, w, h) => rec.box(x, y, w, h),
    fillText: (t, x, y) => rec.text(t, x, y, st.align, st.rot > 0),
    measureText: (t) => ({ width: t.length * 10 })
  };
}

function makeEl() {
  const el = {
    tagName: 'div', children: [], className: '', innerHTML: '', textContent: '',
    value: '', type: '', min: 0, max: 100, step: 1, listeners: {},
    appendChild(c) { el.children.push(c); return c; },
    addEventListener(ev, fn) { (el.listeners[ev] = el.listeners[ev] || []).push(fn); },
    dispatch(ev) { (el.listeners[ev] || []).forEach(f => f({ target: el })); },
    getBoundingClientRect() { return { left: 0, top: 0, width: W, height: H }; },
    getContext() { return el._ctx || (el._ctx = makeCtx(el._rec || global.CURRENT_REC)); },
    clientWidth: W, clientHeight: H,
    querySelector() { return null; }, querySelectorAll() { return []; },
    style: {}
  };
  return el;
}

global.window = { devicePixelRatio: 1, addEventListener() {} };
global.document = { createElement() { return makeEl(); }, addEventListener() {} };
global.navigator = { userAgent: 'node' };
eval(code);
const VIZ = global.window.VIZ;

const targets = process.argv[2] && process.argv[2] !== 'all' ? process.argv[2].split(',') : null;
const cases = [];
for (const f of fs.readdirSync('data/chapters')) {
  if (!f.endsWith('.json')) continue;
  const d = JSON.parse(fs.readFileSync('data/chapters/' + f, 'utf8'));
  for (const p of d.points) for (const b of p.blocks) {
    if (b.t === 'viz' && (!targets || targets.includes(b.viz.type))) cases.push([p.id, b.viz.type, b.viz]);
  }
}

function audit(rec, label) {
  const out = [];
  if (rec.nan) out.push('NaN×' + rec.nan);
  if (rec.minX < 1e8) {
    if (rec.minX < -2 || rec.maxX > W + 2 || rec.minY < -2 || rec.maxY > H + 2) {
      out.push('图元越界 bbox=[' + rec.minX.toFixed(0) + ',' + rec.minY.toFixed(0) + ' ~ ' + rec.maxX.toFixed(0) + ',' + rec.maxY.toFixed(0) + ']');
    }
  }
  const over = rec.texts.filter(t => {
    if (t.rotated) return t.y < -4 || t.y > H + 4;   // 旋转文字只查纵向
    const x0 = t.align === 'center' ? t.x - t.w / 2 : t.align === 'right' || t.align === 'end' ? t.x - t.w : t.x;
    return x0 < -4 || x0 + t.w > W + 4 || t.y < 0 || t.y > H;
  });
  if (over.length) out.push('文字溢出(' + label + '): ' + over.map(t => t.t).join(' / '));
  return out;
}

let bad = 0;
for (const [pid, type, cfg] of cases) {
  const fnKey = type.split('-').map((s, i) => i === 0 ? s : s[0].toUpperCase() + s.slice(1)).join('') + 'Lab';
  const fn = VIZ[fnKey];
  const el = makeEl();
  el._rec = makeRec();
  global.CURRENT_REC = el._rec;
  const rec = el._rec;
  const issues = [];
  try { fn(el, cfg); } catch (e) { console.log('· ' + pid + ' [' + type + '] 跳过：' + e.message); continue; }
  issues.push(...audit(rec, '默认'));
  // 逐个滑块拉 min / max（每个状态重置 bbox）
  const sliders = [];
  (function walk(n) { (n.children || []).forEach(c => { if (c.type === 'range') sliders.push(c); walk(c); }); })(el);
  sliders.forEach((s, i) => {
    [s.min, s.max].forEach(v => {
      rec.reset();
      s.value = v;
      s.dispatch('input');
      issues.push(...audit(rec, '滑块' + (i + 1) + '=' + v));
    });
  });
  console.log((issues.length ? '✗ ' : '✓ ') + pid + ' [' + type + '] 滑块' + sliders.length + (issues.length ? '  ' + issues.join(' | ') : ''));
  if (issues.length) bad++;
}
console.log('\n共 ' + cases.length + ' 例，问题 ' + bad + ' 例');
process.exit(bad ? 1 : 0);
