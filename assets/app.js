(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-viz]').forEach(function (el) {
      var cfg;
      try { cfg = JSON.parse(el.getAttribute('data-viz')); }
      catch (e) { console.error('viz config error', e); return; }
      if (cfg.type === 'plot') VIZ.renderPlot(el, cfg);
      else if (cfg.type === 'parabola-lab') VIZ.parabolaLab(el, cfg);
      else if (cfg.type === 'steps') VIZ.stepLab(el, cfg);
      else if (cfg.type === 'bridge') VIZ.bridgeLab(el, cfg);
      else if (cfg.type === 'profit') VIZ.profitLab(el, cfg);
      else if (cfg.type === 'fence') VIZ.fenceLab(el, cfg);
      else if (cfg.type === 'fountain') VIZ.fountainLab(el, cfg);
      else if (cfg.type === 'shot') VIZ.shotLab(el, cfg);
      else if (cfg.type === 'complete-square') VIZ.completeSquareLab(el, cfg);
      else if (cfg.type === 'equation') VIZ.equationLab(el, cfg);
      else if (cfg.type === 'growth') VIZ.growthLab(el, cfg);
      else if (cfg.type === 'rotate') VIZ.rotateLab(el, cfg);
      else if (cfg.type === 'coord-rot') VIZ.coordRotLab(el, cfg);
      else if (cfg.type === 'pattern') VIZ.patternLab(el, cfg);
      else if (cfg.type === 'clock') VIZ.clockLab(el, cfg);
      else if (cfg.type === 'anatomy') VIZ.anatomyLab(el, cfg);
      else if (cfg.type === 'chord') VIZ.chordLab(el, cfg);
      else if (cfg.type === 'inscribed') VIZ.inscribedLab(el, cfg);
      else if (cfg.type === 'position') VIZ.positionLab(el, cfg);
      else if (cfg.type === 'tangent') VIZ.tangentLab(el, cfg);
      else if (cfg.type === 'sector') VIZ.sectorLab(el, cfg);
      else if (cfg.type === 'event-scale') VIZ.eventScaleLab(el, cfg);
      else if (cfg.type === 'bag') VIZ.bagLab(el, cfg);
      else if (cfg.type === 'sum-table') VIZ.sumTableLab(el, cfg);
      else if (cfg.type === 'tree') VIZ.treeLab(el, cfg);
      else if (cfg.type === 'coin') VIZ.coinLab(el, cfg);
      else if (cfg.type === 'dart') VIZ.dartLab(el, cfg);
      else if (cfg.type === 'inverse') VIZ.inverseLab(el, cfg);
      else if (cfg.type === 'k-area') VIZ.kAreaLab(el, cfg);
      else if (cfg.type === 'inverse-cross') VIZ.inverseCrossLab(el, cfg);
      else if (cfg.type === 'inverse-use') VIZ.inverseUseLab(el, cfg);
      else if (cfg.type === 'trig-ratio') VIZ.trigRatioLab(el, cfg);
      else if (cfg.type === 'trig-special') VIZ.trigSpecialLab(el, cfg);
      else if (cfg.type === 'trig-solve') VIZ.trigSolveLab(el, cfg);
      else if (cfg.type === 'trig-height') VIZ.trigHeightLab(el, cfg);
      else if (cfg.type === 'trig-slope') VIZ.trigSlopeLab(el, cfg);
      else if (cfg.type === 'trig-altitude') VIZ.trigAltitudeLab(el, cfg);
      else if (cfg.type === 'sim-golden') VIZ.simGoldenLab(el, cfg);
      else if (cfg.type === 'sim-parallel') VIZ.simParallelLab(el, cfg);
      else if (cfg.type === 'sim-judge') VIZ.simJudgeLab(el, cfg);
      else if (cfg.type === 'sim-area') VIZ.simAreaLab(el, cfg);
      else if (cfg.type === 'sim-nested') VIZ.simNestedLab(el, cfg);
      else if (cfg.type === 'sim-homothety') VIZ.simHomothetyLab(el, cfg);
      else if (cfg.type === 'sim-shadow') VIZ.simShadowLab(el, cfg);
      else if (cfg.type === 'proj-shadow') VIZ.projShadowLab(el, cfg);
      else if (cfg.type === 'proj-orth') VIZ.projOrthLab(el, cfg);
      else if (cfg.type === 'view-three') VIZ.viewThreeLab(el, cfg);
      else if (cfg.type === 'view-blocks') VIZ.viewBlocksLab(el, cfg);
      else if (cfg.type === 'view-solid') VIZ.viewSolidLab(el, cfg);
      else if (cfg.type === 'pythag-squares') VIZ.pythagSquaresLab(el, cfg);
      else if (cfg.type === 'pythag-puzzle') VIZ.pythagPuzzleLab(el, cfg);
      else if (cfg.type === 'pythag-solve') VIZ.pythagSolveLab(el, cfg);
      else if (cfg.type === 'pythag-inverse') VIZ.pythagInverseLab(el, cfg);
      else if (cfg.type === 'pythag-ladder') VIZ.pythagLadderLab(el, cfg);
      else if (cfg.type === 'linear') VIZ.linearLab(el, cfg);
      else if (cfg.type === 'linear-quad') VIZ.linearQuadLab(el, cfg);
      else if (cfg.type === 'linear-cross') VIZ.linearCrossLab(el, cfg);
      else if (cfg.type === 'linear-model') VIZ.linearModelLab(el, cfg);
      else if (cfg.type === 'linear-translate') VIZ.linearTranslateLab(el, cfg);
      else if (cfg.type === 'linear-fit') VIZ.linearFitLab(el, cfg);
      else if (cfg.type === 'pg-prop') VIZ.pgPropLab(el, cfg);
      else if (cfg.type === 'pg-diag') VIZ.pgDiagLab(el, cfg);
      else if (cfg.type === 'pg-judge') VIZ.pgJudgeLab(el, cfg);
      else if (cfg.type === 'pg-midline') VIZ.pgMidlineLab(el, cfg);
      else if (cfg.type === 'pg-rect') VIZ.pgRectLab(el, cfg);
      else if (cfg.type === 'pg-rhombus') VIZ.pgRhombusLab(el, cfg);
      else if (cfg.type === 'pg-square') VIZ.pgSquareLab(el, cfg);
      else if (cfg.type === 'pg-area') VIZ.pgAreaLab(el, cfg);
      else if (cfg.type === 'tri-sides') VIZ.triSidesLab(el, cfg);
      else if (cfg.type === 'tri-lines') VIZ.triLinesLab(el, cfg);
      else if (cfg.type === 'tri-angle') VIZ.triAngleLab(el, cfg);
      else if (cfg.type === 'tri-exterior') VIZ.triExteriorLab(el, cfg);
      else if (cfg.type === 'poly-angle') VIZ.polyAngleLab(el, cfg);
      else if (cfg.type === 'cong-map') VIZ.congMapLab(el, cfg);
      else if (cfg.type === 'cong-judge') VIZ.congJudgeLab(el, cfg);
      else if (cfg.type === 'cong-ssa') VIZ.congSsaLab(el, cfg);
      else if (cfg.type === 'bisector') VIZ.bisectorLab(el, cfg);
      else if (cfg.type === 'ax-fold') VIZ.axFoldLab(el, cfg);
      else if (cfg.type === 'ax-bisector') VIZ.axBisectorLab(el, cfg);
      else if (cfg.type === 'ax-coord') VIZ.axCoordLab(el, cfg);
      else if (cfg.type === 'ax-draw') VIZ.axDrawLab(el, cfg);
      else if (cfg.type === 'ax-isosceles') VIZ.axIsoscelesLab(el, cfg);
      else if (cfg.type === 'ax-iso-judge') VIZ.axIsoJudgeLab(el, cfg);
      else if (cfg.type === 'ax-equi') VIZ.axEquiLab(el, cfg);
      else if (cfg.type === 'ax-path') VIZ.axPathLab(el, cfg);
      else if (cfg.type === 'sqrt-def') VIZ.sqrtDefLab(el, cfg);
      else if (cfg.type === 'sqrt-prop') VIZ.sqrtPropLab(el, cfg);
      else if (cfg.type === 'sqrt-mul') VIZ.sqrtMulLab(el, cfg);
      else if (cfg.type === 'sqrt-div') VIZ.sqrtDivLab(el, cfg);
      else if (cfg.type === 'sqrt-add') VIZ.sqrtAddLab(el, cfg);
      else if (cfg.type === 'sqrt-est') VIZ.sqrtEstLab(el, cfg);
      else if (cfg.type === 'stat-mean') VIZ.statMeanLab(el, cfg);
      else if (cfg.type === 'stat-median') VIZ.statMedianLab(el, cfg);
      else if (cfg.type === 'stat-mode') VIZ.statModeLab(el, cfg);
      else if (cfg.type === 'stat-var') VIZ.statVarLab(el, cfg);
      else if (cfg.type === 'stat-choice') VIZ.statChoiceLab(el, cfg);
      else if (cfg.type === 'rat-line') VIZ.ratLineLab(el, cfg);
      else if (cfg.type === 'rat-abs') VIZ.ratAbsLab(el, cfg);
      else if (cfg.type === 'rat-add') VIZ.ratAddLab(el, cfg);
      else if (cfg.type === 'rat-mul') VIZ.ratMulLab(el, cfg);
      else if (cfg.type === 'rat-power') VIZ.ratPowerLab(el, cfg);
      else if (cfg.type === 'eq-balance') VIZ.eqBalanceLab(el, cfg);
      else if (cfg.type === 'eq-steps') VIZ.eqStepsLab(el, cfg);
      else if (cfg.type === 'eq-motion') VIZ.eqMotionLab(el, cfg);
      else if (cfg.type === 'eq-distro') VIZ.eqDistroLab(el, cfg);
      else if (cfg.type === 'eq-pct') VIZ.eqPctLab(el, cfg);
      else if (cfg.type === 'geo-solids') VIZ.geoSolidsLab(el, cfg);
      else if (cfg.type === 'geo-motion') VIZ.geoMotionLab(el, cfg);
      else if (cfg.type === 'geo-view3') VIZ.geoView3Lab(el, cfg);
      else if (cfg.type === 'geo-seg') VIZ.geoSegLab(el, cfg);
      else if (cfg.type === 'geo-mid') VIZ.geoMidLab(el, cfg);
      else if (cfg.type === 'geo-angle') VIZ.geoAngleLab(el, cfg);
      else if (cfg.type === 'geo-comp') VIZ.geoCompLab(el, cfg);
      else if (cfg.type === 'sys-def') VIZ.sysDefLab(el, cfg);
      else if (cfg.type === 'sys-subst') VIZ.sysSubstLab(el, cfg);
      else if (cfg.type === 'sys-elim') VIZ.sysElimLab(el, cfg);
      else if (cfg.type === 'sys-sol') VIZ.sysSolLab(el, cfg);
      else if (cfg.type === 'sys-case') VIZ.sysCaseLab(el, cfg);
      else if (cfg.type === 'sys-farm') VIZ.sysFarmLab(el, cfg);
      else if (cfg.type === 'ineq-def') VIZ.ineqDefLab(el, cfg);
      else if (cfg.type === 'ineq-flip') VIZ.ineqFlipLab(el, cfg);
      else if (cfg.type === 'ineq-solve') VIZ.ineqSolveLab(el, cfg);
      else if (cfg.type === 'ineq-set') VIZ.ineqSetLab(el, cfg);
      else if (cfg.type === 'ineq-apply') VIZ.ineqApplyLab(el, cfg);
      else if (cfg.type === 'ia-term') VIZ.iaTermLab(el, cfg);
      else if (cfg.type === 'ia-like') VIZ.iaLikeLab(el, cfg);
      else if (cfg.type === 'ia-merge') VIZ.iaMergeLab(el, cfg);
      else if (cfg.type === 'ia-paren') VIZ.iaParenLab(el, cfg);
      else if (cfg.type === 'ia-eval') VIZ.iaEvalLab(el, cfg);
    });
  });
})();

/* ============================================================
 * 站内返回导航
 * 站点是网状的（知识点 ↔ 题型 ↔ 知识链），跳两层以上就容易迷路。
 * 这里维护一个轻量访问栈：
 *   - 页面顶部给出「从哪来」的上下文条，一键回原页
 *   - 滚动后左下角浮出「返回上一步」按钮
 * 栈存在 sessionStorage，返回时优先用浏览器历史（最准），
 * 没有站内历史时才按记录的路径跳转。
 * ============================================================ */
(function () {
  'use strict';

  var KEY = 'kz_nav_stack';
  var here = location.pathname + location.search;

  function load() {
    try { return JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
  }
  function save(s) {
    try { sessionStorage.setItem(KEY, JSON.stringify(s.slice(-24))); } catch (e) { /* 隐私模式下忽略 */ }
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  // 页面标题格式为「名字 - 章节 - 站名」，只保留第一段
  function shortTitle(t) {
    return String(t || '').split(' - ')[0].trim();
  }
  function clip(s, n) {
    s = String(s || '');
    return s.length > n ? s.slice(0, n) + '…' : s;
  }
  function whereLabel(u) {
    if (isHome(u)) return '课程目录';
    if (u.indexOf('/pattern/') > -1) return '题型';
    if (/patterns\.html$/.test(u)) return '题型库';
    if (/locate\.html$/.test(u)) return '定位器';
    if (/\/[^/]+\/index\.html$/.test(u)) return '章节';
    return '知识点';
  }
  function isHome(u) {
    return u === '/' || /^\/index\.html$/.test(u) || /^[A-Za-z]:[\\/].*?[\\/]index\.html$/.test(u);
  }

  /* ---------- 1. 维护访问栈 ---------- */
  var stack = load();
  // 回到曾经访问过的页面时，丢弃它之后的历史，避免「返回」绕圈
  for (var i = stack.length - 1; i >= 0; i--) {
    if (stack[i].u === here) { stack = stack.slice(0, i); break; }
  }
  var prev = stack[stack.length - 1] || null;
  var next = stack.concat([{ u: here, t: document.title }]);
  save(next);

  // bfcache（前进/后退恢复）不会重跑脚本，需把栈截断到当前页
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    var s = load();
    for (var j = s.length - 1; j >= 0; j--) {
      if (s[j].u === here) { save(s.slice(0, j + 1)); break; }
    }
  });

  if (!prev) return;

  /* ---------- 2. 顶部「从哪来」上下文条 ---------- */
  if (!isHome(here)) {
    var bar = document.createElement('div');
    bar.className = 'prev-bar';
    bar.innerHTML = '<a class="pb-link" href="' + esc(prev.u) + '"'
      + ' aria-label="回到' + esc(whereLabel(prev.u) + '：' + shortTitle(prev.t)) + '">'
      + '<span class="pb-arrow">←</span>'
      + '<span class="pb-label">回到刚才的' + esc(whereLabel(prev.u)) + '</span>'
      + '<span class="pb-title">' + esc(clip(shortTitle(prev.t), 26)) + '</span>'
      + '</a>';
    var main = document.querySelector('main .container');
    if (main) main.insertBefore(bar, main.firstChild);
  }

  /* ---------- 3. 滚动后浮出的返回按钮 ---------- */
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.id = 'back-float';
  btn.title = '返回：' + shortTitle(prev.t);
  btn.innerHTML = '<span class="bf-arrow">←</span>'
    + '<span class="bf-body">'
    + '<span class="bf-main">返回上一步</span>'
    + '<span class="bf-sub">' + esc(clip(shortTitle(prev.t), 18)) + '</span>'
    + '</span>';
  document.body.appendChild(btn);

  btn.addEventListener('click', function () {
    var ref = document.referrer || '';
    var fromSite = ref && (ref.indexOf(location.origin) === 0 || ref.indexOf(location.host) > -1);
    // 浏览器历史最准确；referrer 被裁掉时退回记录的路径
    if (fromSite && history.length > 1) history.back();
    else location.href = prev.u;
  });

  var shown = false;
  function onScroll() {
    var should = (window.pageYOffset || document.documentElement.scrollTop) > 240;
    if (should !== shown) {
      shown = should;
      btn.classList.toggle('show', should);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
