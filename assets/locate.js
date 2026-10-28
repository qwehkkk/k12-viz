/*
 * 题目定位器：三问 → 匹配经典题型 → 告诉你第一步做什么
 * 数据由构建脚本通过 window.__LOCATE_DATA__ 注入。
 */
(function () {
  var DATA = window.__LOCATE_DATA__;
  if (!DATA) return;
  var patterns = DATA.patterns;
  var features = DATA.features;
  var asks = DATA.asks;
  var byId = {};
  patterns.forEach(function (p) { byId[p.id] = p; });

  var state = { ask: null, feats: {} };

  var root = document.getElementById('locator');
  if (!root) return;

  /* ---------- 构建选项 ---------- */
  var askBox = document.getElementById('loc-asks');
  asks.forEach(function (a) {
    var b = document.createElement('button');
    b.className = 'loc-opt';
    b.textContent = a.label;
    b.setAttribute('data-ask', a.k);
    b.addEventListener('click', function () {
      state.ask = (state.ask === a.k) ? null : a.k;
      syncOptions();
      render();
    });
    askBox.appendChild(b);
  });

  var featBox = document.getElementById('loc-feats');
  features.forEach(function (f) {
    var b = document.createElement('button');
    b.className = 'loc-opt small';
    b.textContent = f.label;
    b.setAttribute('data-feat', f.k);
    b.addEventListener('click', function () {
      if (state.feats[f.k]) delete state.feats[f.k];
      else state.feats[f.k] = true;
      syncOptions();
      render();
    });
    featBox.appendChild(b);
  });

  function syncOptions() {
    [].forEach.call(askBox.children, function (b) {
      b.classList.toggle('on', state.ask === b.getAttribute('data-ask'));
    });
    [].forEach.call(featBox.children, function (b) {
      b.classList.toggle('on', !!state.feats[b.getAttribute('data-feat')]);
    });
  }

  /* ---------- 匹配打分 ---------- */
  function signalText(p) { return p.signals.join(' '); }

  function scorePattern(p) {
    var score = 0;
    var reasons = [];
    if (state.ask) {
      if (p.asks.indexOf(state.ask) >= 0) {
        score += 10;
        var askLabel = (asks.filter(function (a) { return a.k === state.ask; })[0] || {}).label || '';
        reasons.push('你要找的是「' + askLabel + '」，这类题型正是干这个的');
      }
    }
    var txt = signalText(p);
    features.forEach(function (f) {
      if (!state.feats[f.k]) return;
      var hit = f.words.some(function (w) { return txt.indexOf(w) >= 0; });
      if (hit) {
        score += 3;
        reasons.push('题面出现「' + f.k + '」类字眼，是它的典型特征');
      }
    });
    return { score: score, reasons: reasons };
  }

  /* ---------- 渲染结果 ---------- */
  function render() {
    var box = document.getElementById('loc-result');
    var anyCond = !!state.ask || Object.keys(state.feats).length > 0;
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
    var html = '<div class="loc-empty" style="text-align:left;border-style:solid;background:#e6f1fb;color:#123d63;padding:14px 18px">'
      + '最像 <b>第 ' + top.no + ' 类 · ' + esc(top.title) + '</b>。它的第一步是：<b>' + esc(top.route[0]) + '</b>。'
      + '</div>';

    results.slice(0, 6).forEach(function (r) {
      var p = r.p;
      html += '<div class="loc-card">'
        + '<div class="lc-top"><span class="type-no">' + String(p.no).padStart(2, '0') + '</span>'
        + '<span class="lc-title"><a href="pattern/' + p.id + '.html">' + esc(p.title) + '</a></span>'
        + '<span class="kind ' + kindClass(p.kind) + '">' + esc(p.kind) + '</span>'
        + '<span class="score">匹配度 ' + r.score + '</span></div>'
        + '<div class="lc-why">' + r.reasons.map(esc).join('；') + '</div>'
        + '<div class="lc-first"><b>第一步：</b>' + esc(p.route[0]) + '</div>'
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
    state.ask = null; state.feats = {};
    syncOptions(); render();
  });

  render();
})();
