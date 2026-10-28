const fs = require('fs');
const path = require('path');
const DIR = path.join(__dirname, '..', 'data', 'chapters');

function P(text) { return { t: 'p', text: text }; }
function V(type, title, values) { return { t: 'viz', viz: { type: type, title: title, values: values } }; }
function L(items) { return { t: 'list', items: items }; }

function pt(o) {
  return {
    id: o.id, title: o.title, summary: o.summary,
    keyPoints: o.keyPoints,
    prerequisites: o.prereq || [],
    viz: { type: o.viz[0], title: o.viz[1], values: o.viz[2] },
    apply: o.apply,
    blocks: o.blocks
  };
}

function save(id, data) {
  const pts = data.points.map(function (p) { return p.id; });
  const errs = [];
  const require = data.points.filter(function (p) { return p.viz && p.viz.type === 'none'; });
  if (require.length) errs.push('viz none: ' + require.length);
  data.points.forEach(function (p) {
    (p.prerequisites || []).forEach(function (q) { if (pts.indexOf(q) < 0) errs.push(p.id + ' prereq ' + q); });
    (p.blocks || []).forEach(function (b, i) {
      if (b.t === 'viz' && (!b.viz || !b.viz.type || !b.viz.values)) errs.push(p.id + ' block' + i + ' viz malformed');
    });
  });
  data.examples.forEach(function (e) {
    if (pts.indexOf(e.point) < 0) errs.push(e.id + ' ex-point ' + e.point);
    if (!e.steps || !e.steps.length) errs.push(e.id + ' no steps');
  });
  const asks = data.patterns.asks.map(function (a) { return a.k; });
  const prefix = '/' + data.meta.id + '/';
  data.patterns.patterns.forEach(function (t) {
    if (t.route.length !== t.chain.length) errs.push(t.id + ' route!=chain');
    t.chain.forEach(function (c) { if (pts.indexOf(c.point) < 0) errs.push(t.id + ' chain ' + c.point); });
    t.asks.forEach(function (a) { if (asks.indexOf(a) < 0) errs.push(t.id + ' ask ' + a); });
    t.route.forEach(function (r) {
      if (r.indexOf(prefix) !== 0 || pts.indexOf(r.slice(prefix.length)) < 0) errs.push(t.id + ' route ' + r);
    });
  });
  if (errs.length) { console.error('X', id, errs); process.exit(1); }
  fs.writeFileSync(path.join(DIR, id + '.json'), JSON.stringify(data, null, 1));
  console.log('OK', id, data.points.length + 'pt / ' + data.examples.length + 'ex / ' + data.patterns.patterns.length + 'pat');
}

module.exports = { P: P, V: V, L: L, pt: pt, save: save, fs: fs, path: path, DIR: DIR };
