/*
 * 题目定位器：三问 → 匹配经典题型 → 告诉你第一步做什么
 * 数据由构建脚本通过 window.__LOCATE_DATA__ 注入。
 * 数据约定（见 build.js renderLocate）：
 *   asks     : [{k, desc}]                          —— 问题 1 的选项（k = 要什么）
 *   patterns : [{id,no,title,kind,asks,signals,route,chain}]
 *              chain : [{point, role, title}]        —— route[i] 是 /章/点 路径时，第 i 步的动作与去向页
 * 问题 2 的选项直接取自各题型的 signals（题面信号词），选中即给对应题型加分。
 */
(function () {
  var DATA = window.__LOCATE_DATA__;
  if (!DATA) return;
  var patterns = DATA.patterns;
  var asks = DATA.asks;
  var byId = {};
  patterns.forEach(function (p) { byId[p.id] = p; });

  var state = { ask: null, sigs: {} };

  var root = document.getElementById('locator');
  if (!root) return;

  /* ---------- 问题 1：求什么 ---------- */
  var askBox = document.getElementById('loc-asks');
  asks.forEach(function (a) {
    var b = document.createElement('button');
    b.className = 'loc-opt';
    b.textContent = a.k;
    if (a.desc) b.title = a.desc;
    b.setAttribute('data-ask', a.k);
    b.addEventListener('click', function () {
      state.ask = (state.ask === a.k) ? null : a.k;
      syncOptions();
      render();
    });
    askBox.appendChild(b);
  });

  /* ---------- 问题 2：题面信号（来自各题型的 signals，去重） ---------- */
  var featBox = document.getElementById('loc-feats');
  var seen = {};
  patterns.forEach(function (p) {
    (p.signals || []).forEach(function (s) {
      if (seen[s]) return;
      seen[s] = true;
      var b = document.createElement('button');
      b.className = 'loc-opt small';
      b.textContent = s;
      b.setAttribute('data-sig', s);
      b.addEventListener('click', function () {
        if (state.sigs[s]) delete state.sigs[s];
        else state.sigs[s] = true;
        syncOptions();
        render();
      });
      featBox.appendChild(b);
    });
  });

  function syncOptions() {
    [].forEach.call(askBox.children, function (b) {
      b.classList.toggle('on', state.ask === b.getAttribute('data-ask'));
    });
    [].forEach.call(featBox.children, function (b) {
      b.classList.toggle('on', !!state.sigs[b.getAttribute('data-sig')]);
    });
  }

  /* ---------- 匹配打分 ---------- */
  function scorePattern(p) {
    var score = 0;
    var reasons = [];
    if (state.ask && p.asks.indexOf(state.ask) >= 0) {
      score += 10;
      var askLabel = (asks.filter(function (a) { return a.k === state.ask; })[0] || {}).k || state.ask;
      reasons.push('你要找的是「' + askLabel + '」，这类题型正是干这个的');
    }
    (p.signals || []).forEach(function (s) {
      if (state.sigs[s]) {
        score += 3;
        reasons.push('题面出现「' + s + '」，是它的典型信号');
      }
    });
    return { score: score, reasons: reasons };
  }

  /* 第一步：role 是动作，point 页是去向 */
  function firstStep(p) {
    var c = (p.chain && p.chain[0]) || null;
    if (c && c.role) {
      return '<a href="' + c.point + '.html"><b>' + esc(c.role) + '</b></a>'
        + (c.title ? ' —— 去「' + esc(c.title) + '」页' : '');
    }
    if (c) return '<a href="' + c.point + '.html">' + esc(c.title || c.point) + '</a>';
    return esc((p.route && p.route[0]) || '');
  }

  /* ---------- 渲染结果 ---------- */
  function render() {
    var box = document.getElementById('loc-result');
    var anyCond = !!state.ask || Object.keys(state.sigs).length > 0;
    if (!anyCond) {
      box.innerHTML = '<div class="loc-empty">先在上面的问题里点一两下，下面就会出现与之匹配的题型。<br>不用全部回答，选你有把握的就行。</div>';
      return;
    }

    var results = patterns.map(function (p) {
      var s = scorePattern(p);
      return { p: p, score: s.score, reasons: s.reasons };
    }).filter(function (r) { return r.score > 0; });

    results.sort(function (a, b) {
      return b.score - a.score || a.p.no - b.p.no;
    });

    if (!results.length) {
      box.innerHTML = '<div class="loc-empty">这一章还没有完全对应的题型。换个选项试试，或者直接去 <a href="patterns.html">题型库</a> 从头扫一遍。</div>';
      return;
    }

    var top = results[0].p;
    var topNo = /^\d+$/.test(String(top.no)) ? ('第 ' + top.no + ' 类 · ') : (top.no + ' · ');
    var html = '<div class="loc-empty" style="text-align:left;border-style:solid;background:#e6f1fb;color:#123d63;padding:14px 18px">'
      + '最像 <b>' + topNo + esc(top.title) + '</b>。它的第一步是：' + firstStep(top) + '。'
      + '</div>';

    results.slice(0, 6).forEach(function (r) {
      var p = r.p;
      var noTxt = /^\d+$/.test(String(p.no)) ? String(p.no).padStart(2, '0') : '';
      html += '<div class="loc-card">'
        + '<div class="lc-top"><span class="type-no">' + noTxt + '</span>'
        + '<span class="lc-title"><a href="pattern/' + p.id + '.html">' + (noTxt ? '' : esc(p.no) + ' · ') + esc(p.title) + '</a></span>'
        + '<span class="kind ' + kindClass(p.kind) + '">' + esc(p.kind) + '</span>'
        + '<span class="score">匹配度 ' + r.score + '</span></div>'
        + '<div class="lc-why">' + r.reasons.map(esc).join('；') + '</div>'
        + '<div class="lc-first"><b>第一步：</b>' + firstStep(p) + '</div>'
        + '</div>';
    });

    if (results.length > 6) {
      html += '<p class="loc-hint" style="margin-top:10px">还有 ' + (results.length - 6) + ' 类沾边，条件再加细一点会更准。</p>';
    }
    box.innerHTML = html;
  }

  function kindClass(k) {
    return k === '组合型' ? 'combo' : (k === '综合型' ? 'full' : '');
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  var reset = document.getElementById('loc-reset');
  if (reset) reset.addEventListener('click', function () {
    state.ask = null; state.sigs = {};
    syncOptions(); render();
  });

  render();
})();
