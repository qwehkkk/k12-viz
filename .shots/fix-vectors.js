const fs = require('fs');
const p = 'data/chapters/vectors.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));

// 1. 补齐 pv-sine 的 list 项
const pvSine = d.points.find(x => x.id === 'pv-sine');
const li = pvSine.blocks.find(b => b.t === 'list');
li.items = li.items.map(t => t.startsWith('SSA 判定解个数')
  ? 'SSA 判定解个数：比较已知边 a 与「高」h = b·sinA —— a < h 无解、a = h 一解、h < a < b 两解'
  : t);

// 2. 应用题型换成干净数字（50、80、60° → 70）
const pat = d.patterns.patterns.find(x => x.id === 'pv-a-app');
pat.stem = 'A、B 两点隔湖。在 C 处测得 CA = 50 m，CB = 80 m，∠ACB = 60°，求 AB 的长。';
pat.solution = [
  { text: '已知两边及其夹角，直接用余弦定理。', math: 'AB² = CA² + CB² − 2·CA·CB·cos60°' },
  { text: '代入：AB² = 2500 + 6400 − 2×50×80×0.5 = 8900 − 4000。', math: 'AB² = 4900' },
  { text: 'AB = 70（米）。', math: 'AB = 70' }
];

fs.writeFileSync(p, JSON.stringify(d, null, 1));
console.log('OK, points:', d.points.length, 'examples:', d.examples.length, 'patterns:', d.patterns.patterns.length);
