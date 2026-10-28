/*
 * 图知学堂 - 静态站构建脚本（零依赖）
 * 数据源：data/chapters/<chapterId>.json（一章一文件：知识点 + 例题 + 题型）
 * 用法：node build.js
 *
 * URL 结构：
 *   /                          课程目录
 *   /<ch>/index.html           章节页（知识点列表）
 *   /<ch>/<point>.html         知识点页
 *   /<ch>/patterns.html        题型库
 *   /<ch>/pattern/<id>.html    题型详情
 *   /<ch>/locate.html          题目定位器
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const DATA_DIR = path.join(ROOT, 'data/chapters');

// 站点配置：上线时把 base 换成真实域名
const SITE = {
  name: '图知学堂',
  tagline: '把知识点画出来',
  base: 'https://teach.toolona.com',
  // 留言接口：部署 Cloudflare Pages Functions + D1 后改为 '/api/comments'
  commentApi: '/api/comments'
};

/* ---------- 载入所有章节 ---------- */
const chapters = fs.readdirSync(DATA_DIR)
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')))
  .sort((a, b) => (a.meta.order || 99) - (b.meta.order || 99));

// 每章的派生数据
chapters.forEach(ch => {
  ch.points = ch.points || [];
  ch.examples = ch.examples || [];
  ch.patternsMeta = ch.patterns || { asks: [], features: [], patterns: [] };
  ch.patterns = ch.patternsMeta.patterns || [];

  ch.byId = Object.fromEntries(ch.points.map(p => [p.id, p]));

  ch.exByPoint = {};
  ch.examples.forEach(e => { (ch.exByPoint[e.point] = ch.exByPoint[e.point] || []).push(e); });

  // 知识点 → 出现在哪些题型（反向索引）
  ch.typesByPoint = {};
  ch.patterns.forEach(t => {
    const seen = {};
    t.chain.forEach((c, i) => {
      if (seen[c.point]) return;
      seen[c.point] = true;
      (ch.typesByPoint[c.point] = ch.typesByPoint[c.point] || []).push({
        id: t.id, no: t.no, title: t.title, kind: t.kind, role: c.role, isStart: i === 0
      });
    });
  });

  // 知识点两两共现
  const pairCount = {};
  ch.patterns.forEach(t => {
    const ids = [...new Set(t.chain.map(c => c.point))].sort();
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const key = ids[i] + '|' + ids[j];
        pairCount[key] = (pairCount[key] || 0) + 1;
      }
    }
  });
  ch.topPairs = Object.entries(pairCount)
    .filter(([, n]) => n >= 2)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([key, n]) => ({ a: key.split('|')[0], b: key.split('|')[1], n }));
});

const chapterById = Object.fromEntries(chapters.map(c => [c.meta.id, c]));
const totalPoints = chapters.reduce((s, c) => s + c.points.length, 0);
const totalExamples = chapters.reduce((s, c) => s + c.examples.length, 0);
const totalPatterns = chapters.reduce((s, c) => s + c.patterns.length, 0);

/* ---------- 工具 ---------- */
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function attrJson(obj) { return esc(JSON.stringify(obj)); }
function kindClass(k) { return k === '组合型' ? 'combo' : (k === '综合型' ? 'full' : ''); }

const CSS = fs.readFileSync(path.join(ROOT, 'assets/style.css'), 'utf8');
const VIZJS = fs.readFileSync(path.join(ROOT, 'assets/viz.js'), 'utf8');
const APPJS = fs.readFileSync(path.join(ROOT, 'assets/app.js'), 'utf8');
const LOCATEJS = fs.readFileSync(path.join(ROOT, 'assets/locate.js'), 'utf8');
const COMMENTSJS = fs.readFileSync(path.join(ROOT, 'assets/comments.js'), 'utf8');

/*
 * root：到站点根的相对前缀（'' / '../' / '../../'）
 * ch：当前章节（首页为 null）
 * cur：当前页类型 points|patterns|locate|home
 */
function head(title, desc, root, ch, cur) {
  let nav;
  if (ch) {
    const base = root + ch.meta.id + '/';
    nav = [
      { k: 'points', label: '知识点', href: base + 'index.html' },
      { k: 'patterns', label: '题型库', href: base + 'patterns.html' },
      { k: 'locate', label: '题目定位器', href: base + 'locate.html' }
    ];
  } else {
    nav = [{ k: 'home', label: '课程目录', href: root + 'index.html' }];
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<style>
${CSS}
</style>
</head>
<body>
<header class="site"><div class="container">
  <a class="site-name" href="${root}index.html">${SITE.name}</a>
  <span class="site-tag">${SITE.tagline}</span>
  <nav class="site-nav">
    ${nav.map(n => `<a href="${n.href}"${n.k === cur ? ' class="on"' : ''}>${n.label}</a>`).join('\n    ')}
  </nav>
</div></header>
<main><div class="container">`;
}

function foot() {
  return `</div></main>
<footer class="site"><div class="container">
  ${SITE.name} · 初中数学可视化学习 · 知识点图谱 + 题型层 + 交互组件
</div></footer>
<script>
${VIZJS}
</script>
<script>
${APPJS}
</script>
<script>
window.SITE_COMMENT_API = ${JSON.stringify(SITE.commentApi || '')};
${COMMENTSJS}
</script>
</body>
</html>`;
}

/* ---------- 讲解流 ---------- */
function renderBlocks(blocks) {
  return blocks.map(b => {
    if (b.t === 'p') return `<p class="lesson-p">${esc(b.text)}</p>`;
    if (b.t === 'viz') return `<div class="viz-wrap"><div class="viz-box"><div data-viz='${attrJson(b.viz)}'></div></div></div>`;
    if (b.t === 'list') {
      const tag = b.ordered === false ? 'ul' : 'ol';
      return `<${tag} class="lesson-list">${b.items.map(i => `<li>${esc(i)}</li>`).join('')}</${tag}>`;
    }
    return '';
  }).join('\n');
}

/* ---------- 首页：课程目录 ---------- */
function renderHome() {
  const cards = chapters.map(ch => {
    const n = ch.points.length;
    return `<a class="chapter-card" href="${ch.meta.id}/index.html">
  <div class="cc-head">
    <span class="cc-order">第 ${ch.meta.order} 章</span>
    <span class="cc-grade">${esc(ch.meta.grade)}</span>
  </div>
  <h3>${esc(ch.meta.title)}</h3>
  <p class="cc-tagline">${esc(ch.meta.tagline || '')}</p>
  <div class="meta">
    <span class="badge blue">${n} 个知识点</span>
    <span class="badge blue">${ch.examples.length} 道例题</span>
    <span class="badge">${ch.patterns.length} 类题型</span>
  </div>
</a>`;
  }).join('\n');

  return `${head(`初中数学可视化学习 - ${SITE.name}`, `初中数学可视化学习：${chapters.length} 章、${totalPoints} 个知识点，每个知识点都有可拖动的交互演示、分步题解、经典题型拆解和现实应用场景。`, '', null, 'home')}
<div class="hero">
  <h1>初中数学 · 可视化学习</h1>
  <p>把知识点画出来、把过程动起来、把题型拆开来看。不是又一份知识点总结，而是让你看见「这个式子是怎么长出来的、这类题是由哪几块拼起来的」。</p>
  <p class="hero-sub">每个知识点都配交互实验、分步题解和现实场景；每类题型都拆解它调用了哪些知识点、从哪一步下手。</p>
  <div class="chips">
    <span class="chip green">${chapters.length} 章</span>
    <span class="chip green">${totalPoints} 个知识点</span>
    <span class="chip green">${totalExamples} 道例题</span>
    <span class="chip green">${totalPatterns} 类题型</span>
  </div>
</div>

<div class="section-head" style="margin-top:0">
  <h2>课程目录</h2>
  <p>按人教版教材顺序排列，九年级上下册优先。</p>
</div>
<div class="chapter-grid">
${cards}
</div>

<div class="section-head">
  <h2>这个站怎么用</h2>
</div>
<div class="guide-grid">
  <div class="guide-item">
    <h3>卡在某个概念</h3>
    <p>进章节页，按顺序看知识点。每个知识点的讲解是「文字 + 图」交替的，图能拖，改参数立刻看到结果变化。</p>
  </div>
  <div class="guide-item">
    <h3>知识点会、题不会做</h3>
    <p>去题型库。每类题型都拆成「题面信号 → 知识点链条 → 固定路线」，看完就知道自己卡在第几环。</p>
  </div>
  <div class="guide-item">
    <h3>拿到题不知道在考什么</h3>
    <p>用题目定位器。回答两三个问题，直接告诉你最可能是哪类题、第一步该做什么。</p>
  </div>
</div>
${foot()}`;
}

/* ---------- 章节页 ---------- */
function renderChapter(ch) {
  const cards = ch.points.map((p, i) => {
    const n = (ch.exByPoint[p.id] || []).length;
    const nt = (ch.typesByPoint[p.id] || []).length;
    return `<a class="card" href="${p.id}.html">
  <span class="num">${String(i + 1).padStart(2, '0')} / ${ch.points.length}</span>
  <h3>${esc(p.title)}</h3>
  <p>${esc(p.summary.slice(0, 42))}…</p>
  <div class="meta">
    <span class="badge blue">${n} 道例题</span>
    <span class="badge blue">${nt} 类题型</span>
    ${p.apply ? '<span class="badge">应用场景</span>' : ''}
  </div>
</a>`;
  }).join('\n');

  return `${head(`${ch.meta.title} - ${ch.meta.grade}数学 - ${SITE.name}`, ch.meta.intro.slice(0, 120), '../', ch, 'points')}
<p class="crumb"><a href="../index.html">课程目录</a> / ${esc(ch.meta.grade)}${esc(ch.meta.title)}</p>
<div class="hero">
  <h1>${esc(ch.meta.grade)} · ${esc(ch.meta.title)}</h1>
  <p>${esc(ch.meta.intro)}</p>
  <div class="chips">
    <span class="chip">${esc(ch.meta.textbook)}</span>
    <span class="chip green">${ch.points.length} 个知识点</span>
    <span class="chip green">${ch.examples.length} 道例题</span>
    <span class="chip green">${ch.patterns.length} 类题型</span>
  </div>
</div>

<div class="grid">
${cards}
</div>

<div class="section-head">
  <h2>两种进入方式</h2>
</div>
<div class="grid">
  <a class="card" href="patterns.html">
    <h3>我学过知识点了，但题目不会做</h3>
    <p>进题型库，看 ${ch.patterns.length} 类经典题型各自调用了哪些知识点、按什么顺序拼起来。</p>
    <div class="meta"><span class="badge">题型库</span></div>
  </a>
  <a class="card" href="locate.html">
    <h3>我面对一道题，不知道它在考什么</h3>
    <p>用定位器，回答两三个问题，它会给出最可能的题型和第一步动作。</p>
    <div class="meta"><span class="badge">定位器</span></div>
  </a>
</div>
${foot()}`;
}

/* ---------- 知识点页 ---------- */
function renderPoint(ch, p, idx) {
  const exs = ch.exByPoint[p.id] || [];
  const prev = ch.points[idx - 1];
  const next = ch.points[idx + 1];

  const blocks = p.blocks || [
    ...(p.summary ? [{ t: 'p', text: p.summary }] : []),
    ...(p.viz && p.viz.type !== 'none' ? [{ t: 'viz', viz: p.viz }] : [])
  ];

  const examplesHtml = exs.map((e, i) => `<details class="ex"${i === 0 ? ' open' : ''}>
  <summary><span class="ex-tag">例 ${i + 1}</span><span>${esc(e.question.slice(0, 38))}${e.question.length > 38 ? '…' : ''}</span></summary>
  <div class="ex-body">
    <div class="ex-q">${esc(e.question)}</div>
    <ol class="steps">
      ${e.steps.map(s => `<li>${esc(s.text)}${s.math ? `<div class="step-math">${esc(s.math)}</div>` : ''}</li>`).join('\n      ')}
    </ol>
    <div class="ex-answer">${esc(e.answer)}</div>
  </div>
</details>`).join('\n');

  const prereqHtml = (p.prerequisites || []).length
    ? `<section class="blk prereq">
  <h2>前置知识</h2>
  ${p.prerequisites.map(id => {
    const q = ch.byId[id];
    return q ? `<a href="${q.id}.html">${esc(q.title)}</a>` : '';
  }).join('')}
</section>`
    : '';

  const applyHtml = p.apply ? `<section class="blk">
    <h2>现实里能做什么</h2>
    <div class="apply-card">
      <p class="apply-head">${esc(p.apply.headline)}</p>
      <p class="apply-text">${esc(p.apply.text)}</p>
    </div>
  </section>` : '';

  const types = ch.typesByPoint[p.id] || [];
  const typesHtml = types.length ? `<section class="blk">
  <h2>这个知识点出现在哪些题型里</h2>
  <div class="type-links">
    ${types.map(t => `<a class="type-link" href="pattern/${t.id}.html">
  <span class="type-no" style="display:inline">${String(t.no).padStart(2, '0')}</span>
  ${esc(t.title)}${t.isStart ? ' <span class="kind" style="background:#e1f5ee;color:#0f6e56">通常是起点</span>' : ''}
  <span class="tx-role">${esc(t.role)}</span>
</a>`).join('\n    ')}
  </div>
</section>` : '';

  return `${head(`${p.title} - ${ch.meta.title} - ${SITE.name}`, p.summary.slice(0, 120), '../', ch, 'points')}
<p class="crumb"><a href="../index.html">课程目录</a> / <a href="index.html">${esc(ch.meta.title)}</a> / ${esc(p.title)}</p>
<article class="point">
  <h1>${esc(p.title)}</h1>
  <p class="point-meta">${esc(ch.meta.grade)} · ${esc(ch.meta.textbook)} · 知识点 ${String(idx + 1).padStart(2, '0')} / ${ch.points.length}</p>

  <section class="blk">
    <h2>讲解</h2>
    ${renderBlocks(blocks)}
  </section>

  ${applyHtml}

  <section class="blk">
    <h2>知识要点</h2>
    <ul class="checklist">
      ${p.keyPoints.map(k => `<li>${esc(k)}</li>`).join('\n      ')}
    </ul>
  </section>

  <section class="blk">
    <h2>典型例题（点击展开题解）</h2>
    ${examplesHtml || '<p>建设中…</p>'}
  </section>

  ${typesHtml}

  ${prereqHtml}

  <nav class="pager">
    ${prev ? `<a href="${prev.id}.html"><span class="dir">← 上一节</span>${esc(prev.title)}</a>` : '<a style="visibility:hidden" aria-hidden="true"></a>'}
    ${next ? `<a href="${next.id}.html" style="text-align:right"><span class="dir">下一节 →</span>${esc(next.title)}</a>` : '<a style="visibility:hidden" aria-hidden="true"></a>'}
  </nav>
  <p class="back-links">
    <a href="index.html">本章知识点</a>·<a href="patterns.html">题型库</a>·<a href="../index.html">课程目录</a>
  </p>
</article>
${foot()}`;
}

/* ---------- 题型库 ---------- */
function renderPatterns(ch) {
  function cardFor(t) {
    const pills = t.chain.map((c, i) => {
      const q = ch.byId[c.point];
      const label = q ? q.title : c.point;
      return `<a class="pt-pill${i === 0 ? ' start' : ''}" href="${c.point}.html">${esc(label)}</a>`;
    }).join('<span class="pt-arrow">›</span>');
    return `<a class="type-card" href="pattern/${t.id}.html">
  <div class="tc-top">
    <span class="type-no">${String(t.no).padStart(2, '0')}</span>
    <span class="type-title">${esc(t.title)}</span>
    <span class="kind ${kindClass(t.kind)}">${esc(t.kind)}</span>
  </div>
  <div class="tc-points">${pills}</div>
  <p class="tc-locate">${esc(t.locate)}</p>
</a>`;
  }

  const groups = ['单一型', '组合型', '综合型'].map(kind => {
    const list = ch.patterns.filter(t => t.kind === kind);
    if (!list.length) return '';
    const desc = {
      单一型: '只考一两个知识点，练的是「会不会用」。做不快就是基础不熟。',
      组合型: '两到四个知识点按固定顺序串起来。做不出来，通常是中间某一环没接上。',
      综合型: '跨知识点 + 实际情境，题干长、没公式。练的是「建模和拆解」。'
    }[kind];
    return `<div class="section-head">
  <h2>${kind} · ${list.length} 类</h2>
  <p>${desc}</p>
</div>
<div class="type-list">
${list.map(cardFor).join('\n')}
</div>`;
  }).join('\n');

  const headCells = ch.points.map(p => `<th title="${esc(p.title)}">${ch.points.indexOf(p) + 1}</th>`).join('');
  const rows = ch.patterns.map(t => {
    const first = t.chain[0].point;
    const set = {};
    t.chain.forEach(c => { set[c.point] = true; });
    const cells = ch.points.map(p => {
      if (!set[p.id]) return '<td class="mx-cell"></td>';
      const cls = p.id === first ? 'mx-dot start' : 'mx-dot';
      return `<td class="mx-cell"><span class="${cls}" title="${esc(p.title)}"></span></td>`;
    }).join('');
    return `<tr><th><a href="pattern/${t.id}.html">${String(t.no).padStart(2, '0')} ${esc(t.title)}</a></th>${cells}</tr>`;
  }).join('\n');

  const matrixHtml = `<div class="matrix-wrap">
<table class="matrix">
  <thead><tr><th></th>${headCells}</tr></thead>
  <tbody>
${rows}
  </tbody>
</table>
<div class="matrix-legend">
  <span><span class="mx-dot start"></span>起点：这类题从这个知识点下手</span>
  <span><span class="mx-dot"></span>参与：中途会用到</span>
</div>
</div>`;

  const pairsHtml = ch.topPairs.length ? `<div class="cooccur">
${ch.topPairs.map(({ a, b, n }) => `<div class="cooccur-item">
  <a class="pt-pill" href="${a}.html">${esc((ch.byId[a] || {}).title || a)}</a>
  <span class="pt-arrow">＋</span>
  <a class="pt-pill" href="${b}.html">${esc((ch.byId[b] || {}).title || b)}</a>
  <span class="cnt">同题出现 ${n} 次</span>
</div>`).join('\n')}
</div>` : '';

  return `${head(`经典题型库 - ${ch.meta.title} - ${SITE.name}`, `${ch.meta.title} ${ch.patterns.length} 类经典题型，每类都拆解它由哪些知识点组合而成，以及解题的固定路线。`, '../', ch, 'patterns')}
<p class="crumb"><a href="../index.html">课程目录</a> / <a href="index.html">${esc(ch.meta.title)}</a> / 经典题型库</p>
<div class="hero">
  <h1>经典题型库</h1>
  <p>知识点是零件，题型是装配图。一道题做不出来，往往不是某个知识点不会，而是<b>没认出它是哪几种零件的哪种拼法</b>。这里把 ${esc(ch.meta.title)} 的 ${ch.patterns.length} 类题型拆开给你看。</p>
  <p class="hero-sub">每类题型都讲三件事：题面出现什么信号该想到它 → 它由哪些知识点按什么顺序拼成 → 卡壳常卡在哪。</p>
  <div class="chips">
    <span class="chip green">${ch.patterns.length} 类题型</span>
    <span class="chip">共 ${ch.patterns.reduce((s, t) => s + t.chain.length, 0)} 个知识点调用</span>
    <span class="chip">${ch.topPairs.length} 组高频组合</span>
  </div>
</div>
${groups}

<div class="section-head">
  <h2>知识点 × 题型 交叉表</h2>
  <p>一眼看出哪个知识点被反复调用，哪些题型是「组合拳」。绿色方块是这类题的起点——拿到题不知道从哪下手时，就看起点在哪。</p>
</div>
${matrixHtml}

<div class="section-head">
  <h2>最常被一起用到的知识点</h2>
  <p>这些组合反复出现在不同题型里，说明它们在大脑里应该被绑成一个整体，而不是两个孤立的知识点。</p>
</div>
${pairsHtml}

<div class="locate-bar" style="margin-top:32px">
  <b>还是不知道一道题属于哪类？</b>把题面特征告诉我，<a href="locate.html">用题目定位器</a>——回答两三个问题，直接给出最可能的题型和第一步动作。
</div>
${foot()}`;
}

/* ---------- 题型详情 ---------- */
function renderPattern(ch, t, idx) {
  const prev = ch.patterns[idx - 1];
  const next = ch.patterns[idx + 1];
  const steps = t.solution || [];
  const firstPoint = t.chain[0].point;

  const chainHtml = t.chain.map((c, i) => {
    const q = ch.byId[c.point];
    const name = q ? q.title : c.point;
    const node = `<div class="chain-node">
  <span class="cn-step">第 ${i + 1} 步${i === 0 ? ' · 从这开始' : ''}</span>
  <a class="cn-name" href="../${c.point}.html">${esc(name)}</a>
  <span class="cn-role">${esc(c.role)}</span>
</div>`;
    return i < t.chain.length - 1 ? node + '\n<div class="chain-arrow">→</div>' : node;
  }).join('\n');

  const routeHtml = t.route.map(r => `<li>${esc(r)}</li>`).join('\n    ');

  const stepsHtml = steps.length ? `<details class="ex" open>
  <summary><span class="ex-tag">完整解答</span><span>${esc(t.stem.slice(0, 40))}${t.stem.length > 40 ? '…' : ''}</span></summary>
  <div class="ex-body">
    <div class="ex-q">${esc(t.stem)}</div>
    <ol class="steps">
      ${steps.map(s => `<li>${esc(s.text)}${s.math ? `<div class="step-math">${esc(s.math)}</div>` : ''}</li>`).join('\n      ')}
    </ol>
    ${t.answer ? `<div class="ex-answer">${esc(t.answer)}</div>` : ''}
  </div>
</details>` : '';

  return `${head(`${t.title} - 经典题型 - ${ch.meta.title} - ${SITE.name}`, t.locate.slice(0, 120), '../../', ch, 'patterns')}
<p class="crumb"><a href="../../index.html">课程目录</a> / <a href="../index.html">${esc(ch.meta.title)}</a> / <a href="../patterns.html">经典题型库</a> / 第 ${t.no} 类</p>
<article class="point">
  <h1>${esc(t.title)}</h1>
  <p class="point-meta">
    <span class="kind ${kindClass(t.kind)}">${esc(t.kind)}</span>
    　题型 ${String(t.no).padStart(2, '0')} / ${ch.patterns.length}
    　调用 ${t.chain.length} 个知识点
  </p>

  <div class="locate-bar">
    <b>什么时候该想到这类题：</b>${esc(t.locate)}
  </div>

  <section class="blk">
    <h2>题面信号</h2>
    <p class="loc-hint" style="margin-bottom:10px">看到这些字眼，先把这类题从脑子里调出来——认题比解题快，才能不慌。</p>
    <div class="signals">
      ${t.signals.map(s => `<span class="signal">${esc(s)}</span>`).join('\n      ')}
    </div>
  </section>

  <section class="blk">
    <h2>逆向解读：这题由哪些知识点拼成</h2>
    <p class="loc-hint" style="margin-bottom:12px">从题目倒着看，它其实只是几个基础动作按顺序拼起来。认清这条链，下次遇到同类题就知道从哪一环切入。</p>
    <div class="chain">
${chainHtml}
    </div>
    <p class="loc-hint" style="margin-top:10px">起点是「${esc((ch.byId[firstPoint] || {}).title || firstPoint)}」——拿到同类题，第一步就去那里想。</p>
  </section>

  <section class="blk">
    <h2>解题路线（固定动作，照做就行）</h2>
    <ol class="route">
    ${routeHtml}
    </ol>
  </section>

  <section class="blk">
    <h2>完整解答</h2>
    ${stepsHtml}
  </section>

  <section class="blk">
    <h2>卡壳常卡在这</h2>
    <div class="trap-box"><b>易错点　</b>${esc(t.trap)}</div>
  </section>

  <nav class="pager">
    ${prev ? `<a href="${prev.id}.html"><span class="dir">← 上一类</span>${esc(prev.title)}</a>` : '<a style="visibility:hidden" aria-hidden="true"></a>'}
    ${next ? `<a href="${next.id}.html" style="text-align:right"><span class="dir">下一类 →</span>${esc(next.title)}</a>` : '<a style="visibility:hidden" aria-hidden="true"></a>'}
  </nav>
  <p class="back-links">
    <a href="../patterns.html">题型库</a>·<a href="../index.html">本章知识点</a>·<a href="../../index.html">课程目录</a>
  </p>
</article>
${foot()}`;
}

/* ---------- 定位器 ---------- */
function renderLocate(ch) {
  const data = {
    asks: ch.patternsMeta.asks,
    features: ch.patternsMeta.features,
    patterns: ch.patterns.map(t => ({
      id: t.id, no: t.no, title: t.title, kind: t.kind,
      asks: t.asks, signals: t.signals, route: t.route
    })),
    patternsUrl: 'patterns.html',
    prefix: ''
  };

  return `${head(`题目定位器 - ${ch.meta.title} - ${SITE.name}`, `回答两三个问题，快速判断一道${ch.meta.title}题属于哪类经典题型，以及第一步该做什么。`, '../', ch, 'locate')}
<p class="crumb"><a href="../index.html">课程目录</a> / <a href="index.html">${esc(ch.meta.title)}</a> / 题目定位器</p>
<div class="hero">
  <h1>题目定位器</h1>
  <p>做题最耗心力的时刻，往往不是算不出来，而是<b>看了三遍还不知道它在考什么</b>。这里只需要你回答两个问题——不要试图答全，有把握的才点。</p>
  <p class="hero-sub">定位准了，焦虑就少一半：你知道该翻哪一页、第一步做什么，剩下的只是执行。</p>
</div>

<div id="locator">
  <div class="loc-step">
    <p class="loc-q">1. 这道题最后要你求出什么？</p>
    <p class="loc-hint">看题目最后的问句。如果有多问，选最主要的那一问。</p>
    <div class="loc-opts" id="loc-asks"></div>
  </div>

  <div class="loc-step">
    <p class="loc-q">2. 题面里出现了哪些字眼？（可多选）</p>
    <p class="loc-hint">照着题目扫一遍，看到就点。不确定的不点，越少越准。</p>
    <div class="loc-opts" id="loc-feats"></div>
  </div>

  <div class="section-head" style="margin-top:8px">
    <h2>匹配结果</h2>
    <p>按匹配度排序，第一条就是最可能的。点标题进入该类题型的完整拆解。</p>
  </div>
  <div class="loc-result" id="loc-result"></div>
  <button class="loc-reset" id="loc-reset">清空重来</button>
</div>

<div class="locate-bar" style="margin-top:36px">
  定位完还是不会做？去<a href="patterns.html">题型库</a>看这类题的「逆向解读」——它由哪几个知识点拼成，缺哪一环一眼就看得出来。
</div>

<script>
window.__LOCATE_DATA__ = ${JSON.stringify(data)};
</script>
<script>
${LOCATEJS}
</script>
${foot()}`;
}

/* ---------- sitemap ---------- */
function renderSitemap() {
  const urls = [{ loc: `${SITE.base}/`, priority: '1.0' }];
  chapters.forEach(ch => {
    const base = `${SITE.base}/${ch.meta.id}`;
    urls.push({ loc: `${base}/index.html`, priority: '0.9' });
    ch.points.forEach(p => urls.push({ loc: `${base}/${p.id}.html`, priority: '0.8' }));
    urls.push({ loc: `${base}/patterns.html`, priority: '0.9' });
    urls.push({ loc: `${base}/locate.html`, priority: '0.8' });
    ch.patterns.forEach(t => urls.push({ loc: `${base}/pattern/${t.id}.html`, priority: '0.7' }));
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;
}

/* ---------- 构建 ---------- */
// 注意：不要 rmSync 清空 dist——本机安全删除机制会拦截批量删除（超时失败）。
// 这里采用增量覆盖：每次构建直接覆盖同名文件。
fs.mkdirSync(DIST, { recursive: true });
fs.cpSync(path.join(ROOT, 'assets'), path.join(DIST, 'assets'), { recursive: true });

fs.writeFileSync(path.join(DIST, 'index.html'), renderHome());

chapters.forEach(ch => {
  const dir = path.join(DIST, ch.meta.id);
  fs.mkdirSync(path.join(dir, 'pattern'), { recursive: true });

  fs.writeFileSync(path.join(dir, 'index.html'), renderChapter(ch));
  fs.writeFileSync(path.join(dir, 'patterns.html'), renderPatterns(ch));
  fs.writeFileSync(path.join(dir, 'locate.html'), renderLocate(ch));

  ch.points.forEach((p, i) => {
    fs.writeFileSync(path.join(dir, `${p.id}.html`), renderPoint(ch, p, i));
  });
  ch.patterns.forEach((t, i) => {
    fs.writeFileSync(path.join(dir, 'pattern', `${t.id}.html`), renderPattern(ch, t, i));
  });
});

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), renderSitemap());

console.log(`构建完成：
  课程目录 1
  ${chapters.length} 章：${chapters.map(c => `${c.meta.title}(${c.points.length}点/${c.examples.length}题/${c.patterns.length}型)`).join('、')}
  知识点页 ${totalPoints}　题型页 ${totalPatterns}　定位器 ${chapters.length}
  sitemap.xml`);
