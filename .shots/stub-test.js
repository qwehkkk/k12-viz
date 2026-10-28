// Node 桩环境：真实执行 viz.js 全部组件，抓运行时错误 + 验证滑块联动
const fs = require('fs');
const code = fs.readFileSync('assets/viz.js', 'utf8');

let drawOps = 0;
function fakeCtx() {
  const t = new Proxy({}, {
    get(target, prop) {
      if (prop === 'canvas') return null;
      return function () { drawOps++; };
    },
    set() { return true; }
  });
  return t;
}
// Proxy get 需要允许属性赋值（fillStyle 等）与函数调用
function makeCtx() {
  return new Proxy({}, {
    get(t, p) {
      if (!(p in t)) t[p] = (...a) => { drawOps++; };
      return t[p];
    },
    set(t, p, v) { t[p] = (typeof v === 'function') ? v : v; return true; }
  });
}

function makeEl(tag) {
  const el = {
    tagName: tag,
    children: [],
    className: '',
    innerHTML: '',
    textContent: '',
    value: '',
    type: '',
    min: 0, max: 100, step: 1,
    disabled: false,
    listeners: {},
    appendChild(c) { el.children.push(c); c.parentNode = el; return c; },
    addEventListener(ev, fn) { (el.listeners[ev] = el.listeners[ev] || []).push(fn); },
    dispatch(ev) { (el.listeners[ev] || []).forEach(f => f({ target: el })); },
    getBoundingClientRect() { return { left: 0, top: 0, width: 640, height: 400 }; },
    getContext() { if (!el._ctx) el._ctx = makeCtx(); return el._ctx; },
    clientWidth: 640, clientHeight: 400,
    querySelector() { return null; },
    querySelectorAll() { return []; },
    style: {}
  };
  return el;
}

global.window = { devicePixelRatio: 1, addEventListener() {} };
global.document = {
  createElement(tag) { return makeEl(tag); },
  addEventListener() {}
};
global.navigator = { userAgent: 'node' };

// 执行 viz.js
eval(code);
const VIZ = global.window.VIZ;
const names = Object.keys(VIZ);
console.log('导出组件数:', names.length);

// 数据里的组件配置
const glob = require('path');
const dataDir = 'data/chapters';
const vizConfigs = [];
for (const f of fs.readdirSync(dataDir)) {
  if (!f.endsWith('.json')) continue;
  const d = JSON.parse(fs.readFileSync(glob.join(dataDir, f), 'utf8'));
  for (const p of d.points) for (const b of p.blocks) if (b.t === 'viz') vizConfigs.push([f.split('.')[0], p.id, b.viz.type, b.viz]);
}

// 全部组件实例化
let fail = 0, ok = 0;
const usedTypes = new Set();
for (const [ch, pid, type, cfg] of vizConfigs) {
  usedTypes.add(type);
  drawOps = 0;
  try {
    const el = makeEl('div');
    VIZ[type.replace(/-/g, '')] ? null : null;
    // app.js 路由：去掉连字符映射到 Lab
    const fnKey = type.split('-').map((s, i) => i === 0 ? s : s[0].toUpperCase() + s.slice(1)).join('') + 'Lab';
    const fn = VIZ[fnKey];
    if (!fn) throw new Error('组件函数不存在: ' + fnKey);
    fn(el, cfg);
    // 模拟拖动每个滑块：触发所有 range input 的 input 事件
    let sliderFired = 0;
    (function walk(n) { (n.children || []).forEach(c => { if (c.listeners && c.listeners.input) { c.value = c.max; sliderFired++; c.dispatch('input'); } walk(c); }); })(el);
    if (drawOps < 10) throw new Error('绘制调用过少: ' + drawOps);
    if (sliderFired === 0) throw new Error('没找到滑块');
    console.log(`✓ ${pid} [${type}] 绘制=${drawOps} 滑块联动=${sliderFired} info=${el.children.find(x=>x.className.includes('viz-info')) ? '有' : '无'}`);
    ok++;
  } catch (e) {
    console.log(`✗ ${pid} [${type}]: ${e.message}`);
    fail++;
  }
}
console.log(`\n共 ${vizConfigs.length} 个实例化点: ✓${ok} ✗${fail}`);
console.log('页面用到的组件类型:', [...usedTypes].join(', '));
process.exit(fail ? 1 : 0);
