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

/* 年级学期顺序（人教版目录分组用） */
const GRADE_TERMS = ['一年级上册', '一年级下册', '二年级上册', '二年级下册', '三年级上册', '三年级下册', '四年级上册', '四年级下册', '五年级上册', '五年级下册', '六年级上册', '六年级下册', '七年级上册', '七年级下册', '八年级上册', '八年级下册', '九年级上册', '九年级下册', '高一上册', '高一下册', '高二上册', '高二下册', '高三上册', '高三下册'];
const STAGE_GROUPS = [
  { name: '小学', cls: 'stage-primary', grades: GRADE_TERMS.slice(0, 12) },
  { name: '初中', cls: 'stage-junior', grades: GRADE_TERMS.slice(12, 18) },
  { name: '高中', cls: 'stage-senior', grades: GRADE_TERMS.slice(18) }
];
const unitWord = ch => (ch.meta.unit ? '单元' : '章');

/* ---------- 载入所有章节 ---------- */
const chapters = fs.readdirSync(DATA_DIR)
  .filter(f => f.endsWith('.json'))
  .map(f => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')))
  .sort((a, b) => GRADE_TERMS.indexOf(a.meta.grade) - GRADE_TERMS.indexOf(b.meta.grade)
    || (a.meta.bookNo || 99) - (b.meta.bookNo || 99));

/* 专项知识线：按年级学是一条路，按专项走是另一条路，两套目录指向同一批章节 */
const STRANDS = [
  { id: 'num', name: '数与式', color: '#c0392b',
    desc: '从有理数到实数、从整式到二次根式——一切计算的地基。数感不通，后面全堵。',
    chapters: ['rational', 'poly-arith', 'realnum', 'polymul', 'fraction', 'radical', 'complex-num'],
    ghosts: [] },
  { id: 'eq', name: '方程与不等式', color: '#185fa5',
    desc: '把「求多少」翻译成式子，再一步步解出来。从一元一次方程一路走到集合语言与二次不等式——高中用它重新说一遍。',
    chapters: ['linear-eq', 'eq-system', 'inequality', 'quadratic-equation', 'sets', 'quad-ineq'],
    ghosts: [] },
  { id: 'fn', name: '函数', color: '#7d3c98',
    desc: '变量之间的关系：一次是直线、二次是抛物线、反比例是双曲线；高中再往上走一步——指数是翻倍、对数问翻了几次、三角函数是圆上的转动。',
    chapters: ['linear-function', 'quadratic-function', 'inverse-function', 'function-concept', 'exp-log', 'trig-fn', 'sequence', 'derivative'],
    ghosts: [] },
  { id: 'geo', name: '图形与几何', color: '#0f6e56',
    desc: '从线段和角出发，经三角形、全等、四边形，一路走到圆、相似与三角函数。初中几何的主干线。',
    chapters: ['geo-intro', 'triangle', 'congruence', 'axis-symmetry', 'pythagorean', 'parallelogram', 'rotate', 'circle', 'similarity', 'trigonometry', 'projection', 'vectors', 'solid-geo', 'space-vector', 'line-circle', 'conic'],
    ghosts: [] },
  { id: 'stat', name: '统计与概率', color: '#8a5a00',
    desc: '用数据说话，用概率算「运气」。中考里分值不大，但最容易拿满。',
    chapters: ['datacollect', 'statistics', 'probability', 'stat-hs', 'prob-hs', 'counting', 'randvar', 'pairstat'],
    ghosts: [] }
];

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

// 章节级知识链：meta.prereqChapters 声明「先学哪几章」，反向自动算出「学完本章可以去哪」
chapters.forEach(ch => {
  ch.prereqCh = (ch.meta.prereqChapters || []).map(id => chapterById[id]).filter(Boolean);
});
chapters.forEach(ch => {
  ch.nextCh = chapters.filter(c => (c.meta.prereqChapters || []).includes(ch.meta.id));
});
const totalPoints = chapters.reduce((s, c) => s + c.points.length, 0);
const totalExamples = chapters.reduce((s, c) => s + c.examples.length, 0);
const totalPatterns = chapters.reduce((s, c) => s + c.patterns.length, 0);

/* ---------- 工具 ---------- */
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
/* 行内强调：先转义再处理 **加粗** 与 `代码`，避免正文里出现字面星号 */
function rich(s) {
  return esc(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
}
/* 纯文本化：去掉 ** 与 ` 标记，用于摘要截断和 meta description */
function plain(s) {
  return String(s == null ? '' : s).replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1');
}
function attrJson(obj) { return esc(JSON.stringify(obj)); }
function kindClass(k) { return kindGroup(k) === '组合型' ? 'combo' : (kindGroup(k) === '综合型' ? 'full' : ''); }
/* 题型归类：数据里的 kind 写法很杂（计算/证明/应用型/综合…），
   统一归到三档，避免有题型因为 kind 写法不在白名单里而从列表消失 */
function kindGroup(k) {
  const s = String(k || '');
  if (s.indexOf('综合') > -1 || s.indexOf('应用') > -1) return '综合型';
  if (s.indexOf('组合') > -1 || s.indexOf('复合') > -1) return '组合型';
  return '单一型';
}

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
      { k: 'locate', label: '题目定位器', href: base + 'locate.html' },
      { k: 'tracks', label: '专项图谱', href: root + (ch.meta.unit ? 'tracks/primary/' : 'tracks/') }
    ];
  } else {
    nav = [
      { k: 'home', label: '课程目录', href: root + 'index.html' },
      { k: 'tracks', label: '专项图谱', href: root + 'tracks/' }
    ];
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
  ${SITE.name} · 初中·高中数学可视化学习 · 知识点图谱 + 题型层 + 交互组件
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
    if (b.t === 'p') return `<p class="lesson-p">${rich(b.text)}</p>`;
    if (b.t === 'viz') return `<div class="viz-wrap"><div class="viz-box"><div data-viz='${attrJson(b.viz)}'></div></div></div>`;
    if (b.t === 'list') {
      const tag = b.ordered === false ? 'ul' : 'ol';
      return `<${tag} class="lesson-list">${b.items.map(i => `<li>${rich(i)}</li>`).join('')}</${tag}>`;
    }
    return '';
  }).join('\n');
}

/* ---------- 首页：课程目录（按年级分组） ---------- */
function chapterCard(ch) {
  const n = ch.points.length;
  return `<a class="chapter-card" href="${ch.meta.id}/index.html">
  <div class="cc-head">
    <span class="cc-order">第 ${ch.meta.bookNo || ch.meta.order} ${unitWord(ch)}</span>
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
}

function renderHome() {
  const groups = GRADE_TERMS
    .map(g => ({ g, list: chapters.filter(c => c.meta.grade === g) }))
    .filter(x => x.list.length);
  const gradeBlock = g => {
    const list = chapters.filter(c => c.meta.grade === g);
    const trackHref = GRADE_TERMS.indexOf(g) < 12 ? 'tracks/primary/' : 'tracks/';
    if (!list.length) {
      return `<div class="grade-block">
  <div class="grade-head"><h3>${g}</h3><span class="grade-soon">即将上线</span></div>
  <p class="grade-empty">这一册的章节正在路上。可以先在 <a href="${trackHref}">专项图谱</a> 里看它属于哪条知识线。</p>
</div>`;
    }
    return `<div class="grade-block">
  <div class="grade-head"><h3>${g}</h3><span class="grade-count">${list.length} ${list[0].meta.unit ? '单元' : '章'}</span></div>
  <div class="chapter-grid">
${list.map(chapterCard).join('\n')}
  </div>
</div>`;
  };

  // 三大组做成分页签：默认只展开一组，页面不再是一条长目录
  const tabs = STAGE_GROUPS.map((sg, i) => {
    const live = sg.grades.filter(g => chapters.some(c => c.meta.grade === g));
    const chs = chapters.filter(c => sg.grades.indexOf(c.meta.grade) >= 0);
    const word = sg.grades[0] === GRADE_TERMS[0] || i === 0 ? '单元' : '章';
    return { sg, i, live, chs, meta: `${live.length} 册 · ${chs.length} ${word}` };
  });
  const gradeHtml = `<div class="stage-tabs">
${tabs.map(t => `<input type="radio" name="stage-tab" id="tab-${t.sg.cls.replace('stage-', '')}"${t.i === 1 ? ' checked' : ''}>`).join('\n')}
  <div class="tab-bar">
${tabs.map(t => `<label class="tab-btn ${t.sg.cls}" for="tab-${t.sg.cls.replace('stage-', '')}">
    <span class="tb-name">${t.sg.name}</span>
    <span class="tb-meta">${t.meta}</span>
  </label>`).join('\n')}
  </div>
  <div class="tab-panels">
${tabs.map(t => `<div class="stage-panel ${t.sg.cls}">
  <p class="stage-lead">${t.i === 0
    ? '人教版小学数学，按册次与单元编号排列。'
    : t.i === 1
      ? '人教版初中数学，章节编号与教材目录一致。'
      : '人教 A 版高中数学，必修与选择性必修分册排列。'}</p>
${t.sg.grades.map(gradeBlock).join('\n')}
</div>`).join('\n')}
  </div>
</div>`;

  const strandHtml = STRANDS.map(st => {
    const n = st.chapters.length;
    return `<a class="strand-card" href="tracks/#track-${st.id}" style="--sc:${st.color}">
  <span class="sc-dot"></span>
  <h3>${st.name}</h3>
  <p>${st.chapters.map(id => chapterById[id].meta.title).join(' · ')}</p>
  <span class="sc-count">${n} 章已上线</span>
</a>`;
  }).join('\n');

  return `${head(`初中高中数学可视化学习 - ${SITE.name}`, `初中高中数学可视化学习：${chapters.length} 章、${totalPoints} 个知识点，每个知识点都有可拖动的交互演示、分步题解、经典题型拆解和现实应用场景。`, '', null, 'home')}
<div class="hero">
  <h1>数学 · 可视化学习</h1>
  <p>把知识点画出来、把过程动起来、把题型拆开来看。不是又一份知识点总结，而是让你看见「这个式子是怎么长出来的、这类题是由哪几块拼起来的」。</p>
  <p class="hero-sub">每个知识点都配交互实验、分步题解和现实场景；每类题型都拆解它调用了哪些知识点、从哪一步下手。目录按<b>小学</b>、<b>初中</b>、<b>高中</b>分成三组，各取所需。</p>
  <div class="chips">
    <span class="chip green">${chapters.length} 章</span>
    <span class="chip green">${totalPoints} 个知识点</span>
    <span class="chip green">${totalExamples} 道例题</span>
    <span class="chip green">${totalPatterns} 类题型</span>
  </div>
</div>

<div class="section-head" style="margin-top:0">
  <h2>课程目录 · 按年级</h2>
  <p><b>先选学段，再看册次</b>：跟人教版教材目录一致（如「九年级上册 · 第 21 章」「三年级上册 · 第 8 单元」）。</p>
</div>
${gradeHtml}

<div class="section-head">
  <h2>按专项学习</h2>
  <p>同一批章节的另一条走法：按知识主线串起来学，前后的因果关系看得更清楚。</p>
</div>
<div class="strand-grid">
${strandHtml}
</div>
<p class="strand-more">五条主线之间的关系图（谁是谁的前置）在 <a href="tracks/">专项图谱</a> 页。小学的「数与运算 / 量与测量 / 图形与几何 / 统计与综合」四条线，单独放在 <a href="tracks/primary/">小学数学专项图谱</a>。</p>

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
  <p>${esc(plain(p.summary).slice(0, 42))}…</p>
  <div class="meta">
    <span class="badge blue">${n} 道例题</span>
    <span class="badge blue">${nt} 类题型</span>
    ${p.apply ? '<span class="badge">应用场景</span>' : ''}
  </div>
</a>`;
  }).join('\n');

  // 章节在知识链上的位置
  const pathHtml = (ch.prereqCh.length || ch.nextCh.length) ? `<div class="path-row">
  ${ch.prereqCh.length ? `<div class="path-block"><span class="path-label">先学</span>${ch.prereqCh.map(c => `<a class="path-link" href="../${c.meta.id}/index.html">${esc(c.meta.title)}</a>`).join('<span class="path-arrow">+</span>')}</div><span class="path-arrow">→</span>` : ''}
  <div class="path-block"><span class="path-label now">本章</span><span class="path-link cur">${esc(ch.meta.title)}</span></div>
  ${ch.nextCh.length ? `<span class="path-arrow">→</span><div class="path-block"><span class="path-label">继续</span>${ch.nextCh.map(c => `<a class="path-link" href="../${c.meta.id}/index.html">${esc(c.meta.title)}</a>`).join('<span class="path-arrow">/</span>')}</div>` : ''}
</div>` : '';

  // 本章所有可交互实验台，集中成一块（按知识点顺序）
  const labs = ch.points
    .map((p, i) => ({ p, i, n: (p.blocks || []).filter(b => b.t === 'viz').length + (p.viz && p.viz.type !== 'none' ? 1 : 0) }))
    .filter(x => x.n > 0);
  const labHtml = labs.length ? `<div class="section-head">
  <h2>本章 ${labs.length} 个实验台 · 动手拖一拖</h2>
  <p>所有可交互的演示都集中在这里，按知识顺序排好了——先看哪个、后看哪个，跟着编号走就不会脱节。</p>
</div>
<div class="grid">
${labs.map(x => `<a class="card lab-card" href="${x.p.id}.html">
  <span class="num">实验台 ${String(x.i + 1).padStart(2, '0')}</span>
  <h3>${esc(x.p.title)}</h3>
  <p>${esc(plain(x.p.summary).slice(0, 40))}…</p>
  <div class="meta"><span class="badge">${x.n} 个可拖演示</span></div>
</a>`).join('\n')}
</div>` : '';

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
${pathHtml}

<div class="section-head">
  <h2>知识地图 · ${ch.points.length} 个知识点</h2>
  <p>按编号顺序学最省力：每个知识点都标了前置关系和练习量。</p>
</div>
<div class="grid">
${cards}
</div>
${labHtml}

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
    <div class="ex-q">${rich(e.question)}</div>
    <ol class="steps">
      ${e.steps.map(s => `<li>${rich(s.text)}${s.math ? `<div class="step-math">${esc(s.math)}</div>` : ''}</li>`).join('\n      ')}
    </ol>
    <div class="ex-answer">${rich(e.answer)}</div>
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

  const applyHtml = p.apply ? (() => {
    const ap = typeof p.apply === 'string' ? { text: p.apply } : p.apply;
    return `<section class="blk">
    <h2>现实里能做什么</h2>
    <div class="apply-card">
      ${ap.headline ? `<p class="apply-head">${esc(ap.headline)}</p>` : ''}
      <p class="apply-text">${esc(ap.text)}</p>
    </div>
  </section>`;
  })() : '';

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

  return `${head(`${p.title} - ${ch.meta.title} - ${SITE.name}`, plain(p.summary).slice(0, 120), '../', ch, 'points')}
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
      ${p.keyPoints.map(k => `<li>${rich(k)}</li>`).join('\n      ')}
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
    const list = ch.patterns.filter(t => kindGroup(t.kind) === kind);
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
    <div class="ex-q">${rich(t.stem)}</div>
    <ol class="steps">
      ${steps.map(s => `<li>${rich(s.text)}${s.math ? `<div class="step-math">${esc(s.math)}</div>` : ''}</li>`).join('\n      ')}
    </ol>
    ${t.answer ? `<div class="ex-answer">${rich(t.answer)}</div>` : ''}
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

/* ---------- 专项图谱页 ---------- */
const TRACK_GRADES = GRADE_TERMS.filter(g => STRANDS.some(st =>
  st.chapters.some(cid => chapterById[cid].meta.grade === g) ||
  st.ghosts.some(x => x.split('|')[1] === g)));

/* 小学专项线：三上、三下已上线，其余册次用 ghost 占位 */
const PRIMARY_STRANDS = [
  { id: 'pnum', name: '数与运算', color: '#c0392b',
    desc: '小学六年的主干：从万以内加减到分数、小数、百分数。同一种能力在六年里反复加码，一条线走完计算才不会断层。',
    chapters: ['p3a-add1', 'p3a-add2', 'p3a-times', 'p3a-mult', 'p3a-frac', 'p3b-div', 'p3b-mul2', 'p3b-dec'],
    ghosts: ['四则运算与运算定律|四年级下册', '小数乘法与除法|五年级上册', '分数加减法|五年级下册'] },
  { id: 'pmeasure', name: '量与测量', color: '#8a5a00',
    desc: '时间、长度、质量、面积——全是「用单位去量」。单位之间为什么有的进 10、有的进 60、有的进 100，答案都在这条线上。',
    chapters: ['p3a-time', 'p3a-measure', 'p3b-cal'],
    ghosts: ['公顷与平方千米|四年级上册'] },
  { id: 'pgeo', name: '图形与几何', color: '#0f6e56',
    desc: '认方向、辨图形、量长度和面积；到高年级的面积体积公式，都是这条线往上走的结果。',
    chapters: ['p3b-dir', 'p3a-rect', 'p3b-area'],
    ghosts: ['角的度量|四年级上册', '三角形|四年级下册'] },
  { id: 'pstat', name: '统计与综合', color: '#185fa5',
    desc: '统计表、统计图、搭配与推理——既学「用数据说话」，也练「想全不漏」的思维。数学广角都在这条线上。',
    chapters: ['p3b-table', 'p3b-match'],
    ghosts: ['条形统计图|四年级上册'] }
];
const PRIMARY_GRADES = GRADE_TERMS.filter(g => PRIMARY_STRANDS.some(st =>
  st.chapters.some(cid => chapterById[cid] && chapterById[cid].meta.grade === g) ||
  st.ghosts.some(x => x.split('|')[1] === g)));

function renderTracks(opt) {
  opt = opt || {};
  const S = opt.strands || STRANDS;
  const G = opt.grades || TRACK_GRADES;
  const UP = opt.up || '../';
  const PG = opt.page || {};

  // ---- 布局参数 ----
  const COLW = 158, NW = 138, NH = 34, STACK = 44;
  const PADL = 118, PADT = 58, PADR = 26, ROWGAP = 30;

  // 每个（专项行 × 年级列）格子里的节点，算堆叠
  const cells = {};   // 'si-ci' -> [{kind:'ch'|'ghost', ...}]
  S.forEach((st, si) => {
    st.chapters.forEach(cid => {
      const ch = chapterById[cid];
      const ci = G.indexOf(ch.meta.grade);
      const key = si + '-' + ci;
      (cells[key] = cells[key] || []).push({ kind: 'ch', cid, title: ch.meta.title });
    });
    st.ghosts.forEach(g => {
      const [title, grade] = g.split('|');
      const ci = G.indexOf(grade);
      const key = si + '-' + ci;
      (cells[key] = cells[key] || []).push({ kind: 'ghost', title });
    });
  });

  // 行高与节点坐标
  const nodePos = {};  // cid -> {x, y}
  const ghostPos = [];
  let y = PADT;
  const rowBands = [];
  S.forEach((st, si) => {
    const bandY = y;
    let maxStack = 1;
    for (let ci = 0; ci < G.length; ci++) {
      const cell = cells[si + '-' + ci] || [];
      cell.forEach((item, k) => {
        const x = PADL + ci * COLW + 8;
        const ny = bandY + k * STACK;
        if (item.kind === 'ch') nodePos[item.cid] = { x, y: ny };
        else ghostPos.push({ x, y: ny, title: item.title, si });
      });
      if (cell.length > maxStack) maxStack = cell.length;
    }
    rowBands.push({ y: bandY, h: maxStack * STACK + 6 });
    y += maxStack * STACK + ROWGAP;
  });
  const svgW = PADL + G.length * COLW + PADR;
  const svgH = y;

  // ---- 连线（前置 → 本章）----
  const edgesByBand = S.map(() => []);
  S.forEach((st, si) => st.chapters.forEach(cid => {
    const ch = chapterById[cid];
    (ch.prereqCh || []).forEach(pc => {
      if (!nodePos[pc.meta.id] || !nodePos[cid]) return;
      const a = nodePos[pc.meta.id], b = nodePos[cid];
      let x1, y1, x2, y2;
      const aci = G.indexOf(pc.meta.grade), bci = G.indexOf(ch.meta.grade);
      if (bci > aci) { x1 = a.x + NW; y1 = a.y + NH / 2; x2 = b.x; y2 = b.y + NH / 2; }
      else { x1 = a.x + NW / 2; y1 = a.y + NH; x2 = b.x + NW / 2; y2 = b.y; }
      const dx = Math.max(30, (x2 - x1) * 0.45);
      edgesByBand[si].push(`M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`);
    });
  }));

  // ---- SVG ----
  const colHeaders = G.map((g, ci) =>
    `<text x="${PADL + ci * COLW + 8 + NW / 2}" y="34" text-anchor="middle" class="tg-col">${g}</text>`).join('\n');
  const colRules = G.map((g, ci) =>
    `<line x1="${PADL + (ci + 1) * COLW}" y1="20" x2="${PADL + (ci + 1) * COLW}" y2="${svgH - 14}" class="tg-rule"/>`).join('\n');

  // 每条专项包成一个 band：聚焦某条线时可以单独淡化其余、单独定位
  const bandHtml = S.map((st, si) => {
    const b = rowBands[si];
    const nodes = st.chapters.map(cid => {
      const n = nodePos[cid], ch = chapterById[cid];
      return `<a href="${UP}${cid}/index.html">
<rect x="${n.x}" y="${n.y}" width="${NW}" height="${NH}" rx="8" class="tg-node" style="stroke:${st.color}"/>
<rect x="${n.x}" y="${n.y}" width="5" height="${NH}" rx="2.5" fill="${st.color}"/>
<text x="${n.x + NW / 2 + 2}" y="${n.y + NH / 2 + 4}" text-anchor="middle" class="tg-text">${esc(ch.meta.title)}</text>
</a>`;
    }).join('\n');
    const ghosts = ghostPos.filter(g => g.si === si).map(g =>
      `<g class="tg-ghost"><rect x="${g.x}" y="${g.y}" width="${NW}" height="${NH}" rx="8"/><text x="${g.x + NW / 2}" y="${g.y + NH / 2 + 4}" text-anchor="middle">${esc(g.title)}</text></g>`).join('\n');
    return `<g class="tg-band" data-band="${si}" data-y="${b.y}" data-h="${b.h}">
<rect x="6" y="${b.y + 8}" width="${PADL - 30}" height="${b.h - 26}" rx="7" fill="${st.color}" opacity="0.09"/>
<line x1="${PADL - 14}" y1="${b.y + 14}" x2="${PADL - 14}" y2="${b.y + b.h - 22}" stroke="${st.color}" stroke-width="3"/>
<text x="${(PADL - 30) / 2 + 6}" y="${b.y + b.h / 2 - 4}" text-anchor="middle" class="tg-row" fill="${st.color}">${st.name}</text>
${edgesByBand[si].map(d => `<path d="${d}" class="tg-edge"/>`).join('\n')}
${nodes}
${ghosts}
</g>`;
  }).join('\n');

  const graphSvg = `<svg viewBox="0 0 ${svgW} ${svgH}" width="${svgW}" height="${svgH}" class="tg-svg" role="img" aria-label="数学专项知识图谱：${S.map(x => x.name).join('、')}，每条横线是一条专项，竖列是年级学期，箭头表示先学谁">
<defs><marker id="tg-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9aa7b5"/></marker></defs>
<g class="tg-head">
${colHeaders}
${colRules}
</g>
${bandHtml}
</svg>`;

  // 图谱交互层：聚焦按钮 + 可拖动缩放画布（无 JS 时退化为横向滚动）
  const focusBar = `<div class="tg-focus" data-tg-focus>
  <button type="button" class="is-on" data-band="all">全部</button>
${S.map((st, si) => `  <button type="button" data-band="${si}" style="--c:${st.color}"><span class="tf-dot"></span>${st.name}</button>`).join('\n')}
</div>`;
  const graphBox = `${focusBar}
<div class="tg-pz" data-pz>
  <div class="tg-stage">${graphSvg}</div>
  <div class="tg-tools">
    <button type="button" data-pz-act="out" aria-label="缩小">−</button>
    <button type="button" data-pz-act="in" aria-label="放大">+</button>
    <button type="button" data-pz-act="fit">适配</button>
    <button type="button" data-pz-act="full">全屏</button>
  </div>
  <div class="tg-hint">拖动查看 · 双指 / 滚轮缩放</div>
</div>`;

  // ---- 每条专项的章节卡 ----
  const strandSections = S.map(st => {
    const cards = st.chapters.map(cid => {
      const ch = chapterById[cid];
      const links = (ch.prereqCh || []).map(pc => esc(pc.meta.title)).join('、') || '无（这条线的起点）';
      return `<a class="card strand-ch-card" href="${UP}${cid}/index.html" style="--sc:${st.color}">
  <span class="num">${esc(ch.meta.grade)} · 第 ${ch.meta.bookNo} ${unitWord(ch)}</span>
  <h3>${esc(ch.meta.title)}</h3>
  <p>${esc(ch.meta.tagline || '')}</p>
  <div class="meta"><span class="badge blue">${ch.points.length} 知识点</span><span class="badge">先学：${links}</span></div>
</a>`;
    }).join('\n');
    const ghosts = st.ghosts.length
      ? `<p class="strand-ghosts">这条线还没上线的章节：${st.ghosts.map(g => esc(g.split('|')[0])).join('、')}（做完会接到图里）</p>` : '';
    return `<div class="strand-section" id="track-${st.id}" style="--sc:${st.color}">
  <div class="strand-head"><span class="sc-dot big"></span><h2>${st.name}</h2></div>
  <p class="strand-desc">${st.desc}</p>
  <div class="grid">
${cards}
  </div>
  ${ghosts}
</div>`;
  }).join('\n');

  const learnPaths = (PG.paths || [
    { who: '跟着学校进度学', how: `回<a href="${UP}index.html">课程目录</a>，按年级册次找当前章——编号和教材一致。` },
    { who: '某一块一直学不透', how: '在上面的图里找到那条专项线，从最左边的章开始补，箭头指哪就先学哪。' },
    { who: '初三总复习', how: '图形与几何一条线有 11 章，从头过一遍比刷卷子更能看出题和题之间的联系。' }
  ]).map(x => `<div class="guide-item"><h3>${x.who}</h3><p>${x.how}</p></div>`).join('\n');

  return `${head(PG.title || `专项知识图谱 - ${SITE.name}`, PG.desc || '初中高中数学五条专项知识主线（数与式 / 方程与不等式 / 函数 / 图形与几何 / 统计与概率）的关系图谱：箭头指向先学的章节，既可按年级走，也可按专项走。', UP, null, 'tracks')}
<div class="hero">
  <h1>${PG.h1 || '专项知识图谱'}</h1>
  <p>${PG.p || '初中加高中，数学其实还是那五条主线。课程目录按年级排，适合跟着学校走；这张图按专项排，适合补短板和总复习。'}</p>
  <p class="hero-sub">${PG.sub || '横线是专项，竖列是年级学期；<b>箭头从「先学的章」指向「后用的章」</b>。虚线框是还没上线的章节。'}</p>
  ${PG.cross || ''}
</div>

<div class="section-head" style="margin-top:0">
  <h2>${PG.section1 || '一图看懂：谁是谁的前置'}</h2>
  <p>${PG.section1desc || '看不懂的地方顺着箭头往回找，通常卡住的原因在几册书之前。图可以直接拖动、放大，也可以只看一条线。'}</p>
</div>
${graphBox}

<div class="section-head">
  <h2>${PG.section2 || '五条专项线'}</h2>
</div>
${strandSections}

<div class="section-head">
  <h2>${PG.section3 || '三种用法'}</h2>
</div>
<div class="guide-grid">
${learnPaths}
</div>
${foot()}`;
}

/* ---------- sitemap ---------- */
function renderSitemap() {
  const urls = [{ loc: `${SITE.base}/`, priority: '1.0' }, { loc: `${SITE.base}/tracks/`, priority: '0.9' },
    { loc: `${SITE.base}/tracks/primary/`, priority: '0.8' }];
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

// robots.txt 与 IndexNow key 文件（site.json 的 indexNowKey）必须随构建进 dist
if (fs.existsSync(path.join(ROOT, 'robots.txt'))) {
  fs.copyFileSync(path.join(ROOT, 'robots.txt'), path.join(DIST, 'robots.txt'));
}
try {
  const siteCfg = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.json'), 'utf8'));
  if (siteCfg.indexNowKey) {
    fs.writeFileSync(path.join(DIST, siteCfg.indexNowKey + '.txt'), siteCfg.indexNowKey + '\n');
  }
} catch (e) { /* site.json 不存在时跳过 */ }

fs.writeFileSync(path.join(DIST, 'index.html'), renderHome());

fs.mkdirSync(path.join(DIST, 'tracks'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'tracks', 'index.html'), renderTracks({
  page: { cross: '<p class="tg-cross-row"><a class="tg-cross" href="primary/index.html">看小学专项图谱 →</a></p>' }
}));

/* 小学专项图谱（独立一页，避免 24 个学期挤在一张图里） */
fs.mkdirSync(path.join(DIST, 'tracks', 'primary'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'tracks', 'primary', 'index.html'), renderTracks({
  strands: PRIMARY_STRANDS,
  grades: PRIMARY_GRADES,
  up: '../../',
  page: {
    title: `小学数学专项图谱 - ${SITE.name}`,
    desc: '小学数学四类知识主线（数与运算 / 量与测量 / 图形与几何 / 统计与综合）的关系图谱：三年级上下册已上线，虚线框是后续册次，按专项看能提前知道每块内容后面长成什么样。',
    h1: '小学数学专项图谱',
    p: '小学六年看着是几十个单元，其实只有四类事：算数、量东西、认图形、看数据。按年级学是跟着课堂走，按专项看能发现——同一个能力在六年里反复加码。',
    sub: '横线是专项，竖列是册次；<b>箭头从「先学的单元」指向「后用的单元」</b>。虚线框是还没上线的单元。',
    section1: '一图看懂：小学六年的四条主线',
    section1desc: '按册次学适合跟着课堂走；按专项看，才知道这一块后面还会长成什么样。',
    section2: '四条专项线',
    section3: '三种用法',
    cross: '<p class="tg-cross-row"><a class="tg-cross" href="../index.html">看初中 · 高中专项图谱 →</a></p>',
    paths: [
      { who: '跟着课堂学', how: '回<a href="../../index.html">课程目录</a>，按册次找当前单元——单元编号和教材一致。' },
      { who: '想把一块补牢', how: '在图上找到那条线，从最左边的单元开始往回捋，箭头指哪就先学哪。' },
      { who: '家长想看清全局', how: '比如「数与运算」从万以内加减一路走到分数、小数——这是同一个能力的六年加码，不是六个独立科目。' }
    ]
  }
}));

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
