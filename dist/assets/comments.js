/* ============ 留言板（含画面引用自动采集） ============
 * 预览模式：留言存本机 localStorage。
 * 正式模式：build.js / 页面里设置 window.SITE_COMMENT_API = '/api/comments'
 *          （Cloudflare Pages Functions + D1，见 functions/api/comments.js 与 README）
 */
(function () {
  var API = typeof window.SITE_COMMENT_API === 'string' ? window.SITE_COMMENT_API : '';
  var LS_KEY = 'tuzhi_feedback_v1';
  var NICK_KEY = 'tuzhi_nick';
  var MAX_LOCAL = 40;

  /* ---------- 画面信息采集 ---------- */
  function shrink(cv, w) {
    var off = document.createElement('canvas');
    off.width = w;
    off.height = Math.max(1, Math.round(cv.height * (w / cv.width)));
    var c = off.getContext('2d');
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, off.width, off.height);
    c.drawImage(cv, 0, 0, off.width, off.height);
    return off.toDataURL('image/jpeg', 0.55);
  }

  function collectVizzes() {
    var out = [];
    var boxes = document.querySelectorAll('.viz-box');
    for (var i = 0; i < boxes.length && out.length < 4; i++) {
      var box = boxes[i];
      var r = box.getBoundingClientRect();
      if (r.width === 0 || r.bottom < 0 || r.top > window.innerHeight) continue; // 只抓当前视口内的画面
      var type = '';
      var host = box.querySelector('[data-viz]');
      if (host) {
        try { type = (JSON.parse(host.getAttribute('data-viz')) || {}).type || ''; } catch (e) {}
      }
      var infoEl = box.querySelector('.viz-info');
      var state = infoEl ? infoEl.textContent.replace(/\s+/g, ' ').trim().slice(0, 140) : '';
      var item = { type: type, state: state, thumb: '' };
      var cv = box.querySelector('canvas');
      if (cv && cv.width > 0) {
        try { item.thumb = shrink(cv, 200); } catch (e) {}
      }
      out.push(item);
    }
    return out;
  }

  function collectContext() {
    var h1 = document.querySelector('h1');
    var crumb = document.querySelector('.crumb');
    return {
      page: location.pathname,
      title: h1 ? h1.textContent.trim() : document.title,
      trail: crumb ? crumb.textContent.replace(/\s+/g, ' ').trim().slice(0, 120) : '',
      scroll: Math.round((window.scrollY || 0) + document.documentElement.clientHeight) + '/' + document.documentElement.scrollHeight,
      vizzes: collectVizzes()
    };
  }

  /* ---------- 本地存储 ---------- */
  function loadAll() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch (e) { return []; }
  }
  function saveAll(list) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      // 超出配额：去掉缩略图重试，再不行裁掉最旧的
      var trimmed = list.map(function (m) {
        return m.ctx && m.ctx.vizzes ? Object.assign({}, m, { ctx: Object.assign({}, m.ctx, { vizzes: m.ctx.vizzes.map(function (v) { return { type: v.type, state: v.state, thumb: '' }; }) }) }) : m;
      });
      try { localStorage.setItem(LS_KEY, JSON.stringify(trimmed)); return true; } catch (e2) {}
      try { localStorage.setItem(LS_KEY, JSON.stringify(trimmed.slice(-15))); return true; } catch (e3) { return false; }
    }
  }
  function prune(list) {
    return list.length > MAX_LOCAL ? list.slice(-MAX_LOCAL) : list;
  }

  /* ---------- UI ---------- */
  var fab, panel, listEl, ta, nickInput, ctxBox;

  function timeStr(ts) {
    var d = new Date(ts);
    return (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }

  function statusBadge(s) {
    if (s === 'sent') return '<span class="fb-badge ok">已提交</span>';
    if (s === 'queued') return '<span class="fb-badge warn">待补传</span>';
    return '<span class="fb-badge">本机</span>';
  }

  function renderList() {
    if (!listEl) return;
    var all = loadAll().filter(function (m) { return m.ctx && m.ctx.page === location.pathname; }).reverse();
    if (!all.length) {
      listEl.innerHTML = '<div class="fb-empty">本页还没有留言。</div>';
      return;
    }
    listEl.innerHTML = '';
    all.forEach(function (m) {
      var card = document.createElement('div');
      card.className = 'fb-item';
      var head = document.createElement('div');
      head.className = 'fb-item-head';
      var who = document.createElement('span');
      who.className = 'fb-item-nick';
      who.textContent = (m.nick || '匿名') + ' · ' + timeStr(m.ts);
      head.appendChild(who);
      var right = document.createElement('span');
      right.className = 'fb-item-actions';
      right.innerHTML = statusBadge(m.status) || '';
      var del = document.createElement('button');
      del.className = 'fb-del';
      del.textContent = '删除';
      del.addEventListener('click', function () {
        var list = loadAll().filter(function (x) { return x.id !== m.id; });
        saveAll(list);
        renderList();
      });
      right.appendChild(del);
      head.appendChild(right);
      card.appendChild(head);

      var body = document.createElement('div');
      body.className = 'fb-item-text';
      body.textContent = m.text;
      card.appendChild(body);

      // 画面引用：缩略图 + 组件状态
      var vizzes = (m.ctx && m.ctx.vizzes) || [];
      var withThumb = vizzes.filter(function (v) { return v.thumb; });
      if (withThumb.length) {
        var row = document.createElement('div');
        row.className = 'fb-thumbs';
        withThumb.forEach(function (v) {
          var img = document.createElement('img');
          img.className = 'fb-thumb';
          img.src = v.thumb;
          img.alt = '画面引用';
          img.title = v.state || v.type;
          row.appendChild(img);
        });
        card.appendChild(row);
      }
      var refs = vizzes.filter(function (v) { return v.type || v.state; }).map(function (v) {
        return v.type ? ('[' + v.type + '] ' + (v.state || '')) : v.state;
      });
      if (refs.length) {
        var ref = document.createElement('div');
        ref.className = 'fb-ref';
        ref.textContent = '引用画面：' + refs.join(' ｜ ').slice(0, 160);
        card.appendChild(ref);
      }
      listEl.appendChild(card);
    });
  }

  function refreshCtxPreview() {
    if (!ctxBox) return;
    var ctx = collectContext();
    var n = ctx.vizzes.length;
    var withThumb = ctx.vizzes.filter(function (v) { return v.thumb; }).length;
    ctxBox.innerHTML = '';
    var line = document.createElement('div');
    line.className = 'fb-ctx-line';
    line.textContent = '将自动附上：' + (ctx.title || ctx.page) + ' · 当前画面 ' + n + ' 个' + (withThumb ? '（含截图 ' + withThumb + ' 张）' : '');
    ctxBox.appendChild(line);
    ctx.vizzes.forEach(function (v) {
      if (!v.type && !v.state) return;
      var it = document.createElement('div');
      it.className = 'fb-ctx-item';
      it.textContent = (v.type ? '[' + v.type + '] ' : '') + (v.state || '').slice(0, 90);
      ctxBox.appendChild(it);
    });
  }

  function submit() {
    var text = ta.value.trim();
    if (!text) { ta.focus(); return; }
    var nick = nickInput.value.trim();
    if (nick) { try { localStorage.setItem(NICK_KEY, nick); } catch (e) {} }
    var entry = {
      id: 'fb-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
      ts: Date.now(),
      nick: nick,
      text: text.slice(0, 1000),
      ctx: collectContext(),
      status: API ? 'queued' : 'local'
    };

    function afterSave(ok) {
      if (!ok) { alert('本机存储失败，留言未能保存'); return; }
      ta.value = '';
      renderList();
      var tip = document.createElement('div');
      tip.className = 'fb-tip';
      tip.textContent = API
        ? (entry.status === 'sent' ? '已收到，谢谢！' : '已暂存本机，联网后会自动补传')
        : '已保存在本机浏览器（预览模式）。正式部署接入留言接口后，所有访客留言会汇总到后台。';
      panel.appendChild(tip);
      setTimeout(function () { if (tip.parentNode) tip.parentNode.removeChild(tip); }, 3500);
    }

    if (!API) {
      var list = prune(loadAll());
      list.push(entry);
      afterSave(saveAll(list));
      return;
    }
    // 正式模式：先提交，失败则本地暂存待补传
    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ts: entry.ts, page: entry.ctx.page, title: entry.ctx.title, ctx: entry.ctx, text: entry.text, nick: entry.nick })
    }).then(function (r) {
      entry.status = r.ok ? 'sent' : 'queued';
    }).catch(function () {
      entry.status = 'queued';
    }).finally(function () {
      var list = prune(loadAll());
      list.push(entry);
      afterSave(saveAll(list));
    });
  }

  function buildUI() {
    fab = document.createElement('button');
    fab.id = 'fb-fab';
    fab.setAttribute('aria-label', '留言');
    fab.innerHTML = '<span class="fb-fab-icon">✎</span><span class="fb-fab-text">留言</span>';
    fab.addEventListener('click', function () {
      panel.classList.toggle('open');
      if (panel.classList.contains('open')) {
        nickInput.value = (function () { try { return localStorage.getItem(NICK_KEY) || ''; } catch (e) { return ''; } })();
        refreshCtxPreview();
        renderList();
      }
    });
    document.body.appendChild(fab);

    panel = document.createElement('div');
    panel.id = 'fb-panel';
    panel.innerHTML =
      '<div class="fb-head"><b>留言 / 建议</b><button id="fb-close" aria-label="关闭">×</button></div>' +
      '<div id="fb-ctx" class="fb-ctx"></div>' +
      '<textarea id="fb-text" maxlength="1000" placeholder="想看到什么内容？哪里没看懂？画面哪里不清楚？"></textarea>' +
      '<div class="fb-row"><input id="fb-nick" maxlength="20" placeholder="称呼（可不填）"><button id="fb-send">提交</button></div>' +
      '<div class="fb-sub">留言会自动附上你当前看到的画面和参数，方便我们定位问题。</div>' +
      '<div id="fb-list" class="fb-list"></div>';
    document.body.appendChild(panel);

    ctxBox = panel.querySelector('#fb-ctx');
    ta = panel.querySelector('#fb-text');
    nickInput = panel.querySelector('#fb-nick');
    listEl = panel.querySelector('#fb-list');
    panel.querySelector('#fb-close').addEventListener('click', function () { panel.classList.remove('open'); });
    panel.querySelector('#fb-send').addEventListener('click', submit);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildUI);
  } else {
    buildUI();
  }
})();
