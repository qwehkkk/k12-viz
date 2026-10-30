/*
 * extras.js —— 站内搜索 / 收藏与错题本 / 例题自测 / 深浅色主题 / 章目录定位
 * 全部功能只依赖 localStorage，无后端。
 * 页面身份由 build.js 注入 window.__PAGE_CTX__ = {type, ch, chTitle, point?}
 *   type: home | points(章目录) | point | patterns | pattern | locate | fav | tracks
 */
(function () {
  'use strict';
  var CTX = window.__PAGE_CTX__ || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };

  /* ================= 本地存储 ================= */
  function load(k) { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch (e) { return []; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 隐私模式忽略 */ } }
  function pageTitle() { return String(document.title || '').split(' - ')[0].trim(); }
  function here() { return location.pathname; }

  var FAV = 'k12v-fav', WRONG = 'k12v-wrong';
  function favList() { return load(FAV); }
  function wrongList() { return load(WRONG); }
  function isFaved(u) { return favList().some(function (x) { return x.u === u; }); }
  function toggleFav() {
    var u = here(), l = favList();
    if (l.some(function (x) { return x.u === u; })) {
      l = l.filter(function (x) { return x.u !== u; });
      save(FAV, l); return false;
    }
    l.push({ u: u, t: pageTitle(), c: CTX.chTitle || '', ts: Date.now() });
    save(FAV, l); return true;
  }
  function addWrong() {
    var u = here(), l = wrongList();
    if (l.some(function (x) { return x.u === u; })) return;
    l.push({ u: u, t: pageTitle(), c: CTX.chTitle || '', ts: Date.now() });
    save(WRONG, l);
  }
  function removeWrong(u) {
    save(WRONG, wrongList().filter(function (x) { return x.u !== u; }));
  }

  /* ================= 深浅色主题 ================= */
  var themeBtn = $('#nav-theme');
  if (themeBtn) {
    function syncThemeIcon() {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeBtn.textContent = dark ? '☀️' : '🌙';
    }
    syncThemeIcon();
    themeBtn.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = dark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('k12v-theme', next); } catch (e) {}
      syncThemeIcon();
    });
  }

  /* ================= 站内搜索 ================= */
  var searchBtn = $('#nav-search');
  var ov = null, sovIn = null, sovRes = null;
  var INDEX = null, sel = -1, shown = [];

  function buildOv() {
    ov = document.createElement('div');
    ov.id = 'search-ov';
    ov.hidden = true;
    ov.innerHTML = '<div class="sov-box">'
      + '<input id="sov-in" type="text" placeholder="搜知识点 / 题型 / 章节，回车打开第一条" autocomplete="off">'
      + '<div id="sov-res"></div>'
      + '<div class="sov-foot">↑↓ 选择 · 回车打开 · Esc 关闭</div>'
      + '</div>';
    document.body.appendChild(ov);
    sovIn = $('#sov-in', ov);
    sovRes = $('#sov-res', ov);
    ov.addEventListener('mousedown', function (e) { if (e.target === ov) closeOv(); });
    sovIn.addEventListener('input', doSearch);
    sovIn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); if (shown[sel]) location.href = shown[sel].u; }
    });
  }
  function openOv() {
    if (!ov) buildOv();
    ov.hidden = false;
    sovIn.value = '';
    doSearch();
    sovIn.focus();
    if (!INDEX) {
      fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (j) {
        INDEX = j;
        doSearch();
      }).catch(function () { INDEX = []; });
    }
  }
  function closeOv() { if (ov) { ov.hidden = true; sel = -1; } }
  function move(d) {
    if (!shown.length) return;
    sel = (sel + d + shown.length) % shown.length;
    paintSel();
  }
  function paintSel() {
    var nodes = sovRes.querySelectorAll('.sov-item');
    for (var i = 0; i < nodes.length; i++) nodes[i].classList.toggle('sel', i === sel);
    if (nodes[sel] && nodes[sel].scrollIntoView) nodes[sel].scrollIntoView({ block: 'nearest' });
  }
  function doSearch() {
    var q = (sovIn.value || '').trim().toLowerCase();
    var pool = INDEX || [];
    if (!q) {
      shown = pool.filter(function (x) { return x.k === '章节'; }).slice(0, 8);
      renderRes(q ? '' : '输入关键词，比如「配方法」「因数」「双曲线」。也可以先看看各册章节：');
      return;
    }
    var scored = [];
    pool.forEach(function (x) {
      var t = (x.t || '').toLowerCase(), d = (x.d || '').toLowerCase(), c = (x.c || '').toLowerCase();
      var s = 0;
      if (t.indexOf(q) === 0) s = 30;
      else if (t.indexOf(q) > -1) s = 20;
      else if (c.indexOf(q) > -1) s = 8;
      else if (d.indexOf(q) > -1) s = 4;
      if (s) scored.push({ x: x, s: s });
    });
    scored.sort(function (a, b) { return b.s - a.s; });
    shown = scored.slice(0, 20).map(function (y) { return y.x; });
    renderRes(shown.length ? '' : '没有匹配的内容，换个词试试（如「配方法」「相似」「因数」）。');
  }
  function renderRes(empty) {
    if (empty) { sovRes.innerHTML = '<p class="sov-empty">' + empty + '</p>'; return; }
    sovRes.innerHTML = shown.map(function (x, i) {
      return '<a class="sov-item" href="' + x.u + '" data-i="' + i + '">'
        + '<span class="sov-k sov-k-' + x.k + '">' + x.k + '</span>'
        + '<span class="sov-t">' + esc(x.t) + '</span>'
        + '<span class="sov-d">' + esc(x.c ? x.c + ' · ' : '') + esc(x.d || '') + '</span>'
        + '</a>';
    }).join('');
    [].forEach.call(sovRes.querySelectorAll('.sov-item'), function (a) {
      a.addEventListener('click', function () { closeOv(); });
    });
    sel = shown.length ? 0 : -1;
    paintSel();
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  if (searchBtn) {
    searchBtn.addEventListener('click', openOv);
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (e.key === 'Escape') { closeOv(); return; }
      if (e.key === '/' && tag !== 'input' && tag !== 'textarea' && (ov ? ov.hidden : true)) {
        e.preventDefault(); openOv();
      }
    });
  }

  /* ================= 收藏星标（知识点页 / 题型页） ================= */
  var isPointPage = CTX.type === 'points' && !!CTX.point;
  var isPatternPage = CTX.type === 'pattern';
  if (isPointPage || isPatternPage) {
    var meta = $('.point-meta');
    if (meta) {
      var star = document.createElement('button');
      star.type = 'button';
      star.className = 'fav-star';
      function paintStar() {
        var on = isFaved(here());
        star.textContent = on ? '★ 已收藏' : '☆ 收藏';
        star.classList.toggle('on', on);
      }
      paintStar();
      star.addEventListener('click', function () { toggleFav(); paintStar(); });
      meta.appendChild(star);
    }
  }

  /* ================= 例题自测（知识点页） ================= */
  if (isPointPage) {
    // 章目录记住「看到第几个知识点」
    try { localStorage.setItem('k12v-point', JSON.stringify({ c: CTX.ch, p: CTX.point })); } catch (e) {}

    var exSec = null;
    [].forEach.call(document.querySelectorAll('section.blk'), function (s) {
      var h = s.querySelector('h2');
      if (h && h.textContent.indexOf('典型例题') === 0 && !exSec) exSec = s;
    });
    if (exSec && exSec.querySelectorAll('details.ex').length) {
      var exs = exSec.querySelectorAll('details.ex');
      var bar = document.createElement('div');
      bar.className = 'st-bar';
      bar.innerHTML = '<button type="button" class="st-toggle">🎯 进入自测模式</button>'
        + '<span class="st-hint">先自己想，再对答案；点了「不会」的会进收藏页的错题单。</span>';
      exSec.insertBefore(bar, exSec.firstChild);
      var on = false;
      var rows = [];
      exs.forEach ? exs.forEach(init) : [].forEach.call(exs, init);
      function init(ex, i) {
        var row = document.createElement('div');
        row.className = 'st-row';
        row.innerHTML = '<button type="button" class="st-see">看解答</button>'
          + '<button type="button" class="st-ok">✅ 会了</button>'
          + '<button type="button" class="st-no">❌ 不会</button>';
        ex.appendChild(row);
        rows.push(row);
        row.querySelector('.st-see').addEventListener('click', function () {
          ex.classList.toggle('st-reveal');
        });
        row.querySelector('.st-ok').addEventListener('click', function () {
          removeWrong(here());
          mark(row, 'ok', '已记「会了」，不会出现在错题单');
        });
        row.querySelector('.st-no').addEventListener('click', function () {
          addWrong();
          mark(row, 'no', '已记入错题单，去收藏页可以复习');
        });
      }
      function mark(row, cls, txt) {
        row.classList.remove('st-done-ok', 'st-done-no');
        row.classList.add('st-done-' + cls);
        row.querySelector('.st-see').textContent = '看解答';
        var tip = row.querySelector('.st-tip');
        if (!tip) { tip = document.createElement('span'); tip.className = 'st-tip'; row.appendChild(tip); }
        tip.textContent = txt;
      }
      bar.querySelector('.st-toggle').addEventListener('click', function () {
        on = !on;
        exSec.classList.toggle('st-on', on);
        this.textContent = on ? '📖 退出自测' : '🎯 进入自测模式';
        if (!on) {
          [].forEach.call(rows, function (r) { r.parentNode.classList.remove('st-reveal'); });
        }
      });
    }
  }

  /* ================= 章目录：定位到上次看到的知识点 ================= */
  if (CTX.type === 'points' && !CTX.point && /\/index\.html$/.test(here())) {
    var last = null;
    try { last = JSON.parse(localStorage.getItem('k12v-point') || 'null'); } catch (e) {}
    if (last && last.c === CTX.ch && last.p) {
      var card = document.querySelector('.card[href="' + last.p + '.html"]');
      if (card) {
        card.classList.add('last-pt-card');
        var meta2 = card.querySelector('.meta');
        if (meta2) {
          var b = document.createElement('span');
          b.className = 'badge last-badge';
          b.textContent = '上次看到';
          meta2.appendChild(b);
        }
        setTimeout(function () { card.scrollIntoView({ block: 'center' }); }, 60);
      }
    }
  }

  /* ================= 收藏 / 错题本页面 ================= */
  if (CTX.type === 'fav') {
    var root = $('#fav-root');
    var tab = 'fav';
    function itemRow(x, kind) {
      var row = document.createElement('div');
      row.className = 'fav-item';
      var d = new Date(x.ts || Date.now());
      row.innerHTML = '<a class="fi-link" href="' + x.u + '"><b>' + esc(x.t) + '</b>'
        + '<span class="fi-meta">' + esc(x.c || '') + (x.c ? ' · ' : '') + d.toLocaleDateString() + '</span></a>'
        + '<button type="button" class="fi-del">' + (kind === 'fav' ? '取消收藏' : '移出错题单') + '</button>';
      row.querySelector('.fi-del').addEventListener('click', function () {
        if (kind === 'fav') {
          save(FAV, favList().filter(function (y) { return y.u !== x.u; }));
        } else {
          removeWrong(x.u);
        }
        paint();
      });
      return row;
    }
    function paint() {
      var favs = favList(), wrongs = wrongList();
      root.innerHTML = '<div class="fav-tabs">'
        + '<button type="button" class="fv-tab' + (tab === 'fav' ? ' on' : '') + '" data-t="fav">★ 收藏（' + favs.length + '）</button>'
        + '<button type="button" class="fv-tab' + (tab === 'wrong' ? ' on' : '') + '" data-t="wrong">❌ 错题（' + wrongs.length + '）</button>'
        + '</div>';
      var list = tab === 'fav' ? favs : wrongs;
      if (!list.length) {
        root.innerHTML += '<div class="loc-empty" style="margin-top:16px">'
          + (tab === 'fav'
            ? '还没有收藏。在知识点页或题型页点标题旁的「☆ 收藏」，就会出现在这里。'
            : '错题单是空的。在知识点页进入「🎯 自测模式」，点了「不会」的例题会自动收进来。')
          + '</div>';
      } else {
        var wrap = document.createElement('div');
        wrap.className = 'fav-list';
        list.forEach(function (x) { wrap.appendChild(itemRow(x, tab)); });
        root.appendChild(wrap);
        if (tab === 'wrong') {
          var tip = document.createElement('p');
          tip.className = 'loc-hint';
          tip.style.marginTop = '14px';
          tip.innerHTML = '重做后已掌握？回到该知识点页的自测模式点「✅ 会了」，或直接点右侧按钮移出。';
          root.appendChild(tip);
        }
      }
      [].forEach.call(root.querySelectorAll('.fv-tab'), function (b) {
        b.addEventListener('click', function () { tab = b.getAttribute('data-t'); paint(); });
      });
    }
    paint();
  }
})();
