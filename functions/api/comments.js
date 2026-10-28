// Cloudflare Pages Function：留言接口
// 启用步骤（见 README「留言板」一节）：
//   1. wrangler d1 create tuzhi-feedback  → 得到 database_id
//   2. wrangler d1 execute tuzhi-feedback --file=functions/api/schema.sql（远程加 --remote）
//   3. Pages 项目设置 → Functions → D1 绑定：绑定名 DB
//   4. 环境变量 ADMIN_TOKEN = 自己设的随机串（用于拉取留言）
//   5. build.js 里 SITE.commentApi 改为 '/api/comments'，重新构建部署

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });
}

function sanitizeCtx(ctx) {
  if (!ctx || typeof ctx !== 'object') return {};
  const vizzes = Array.isArray(ctx.vizzes)
    ? ctx.vizzes.slice(0, 4).map(v => ({
        type: String((v && v.type) || '').slice(0, 40),
        state: String((v && v.state) || '').slice(0, 200),
        thumb: String((v && v.thumb) || '').slice(0, 80000) // JPEG dataURL，单张几 KB
      }))
    : [];
  return {
    page: String(ctx.page || '').slice(0, 200),
    title: String(ctx.title || '').slice(0, 200),
    scroll: String(ctx.scroll || '').slice(0, 40),
    vizzes
  };
}

// 提交留言：POST /api/comments
export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ ok: false, error: 'D1 not bound (bind name: DB)' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ ok: false, error: 'bad json' }, 400); }
  const text = String(body.text || '').trim().slice(0, 1000);
  if (!text) return json({ ok: false, error: 'empty text' }, 400);

  const id = crypto.randomUUID();
  await env.DB.prepare(
    'INSERT INTO feedback (id, ts, page, title, trail, ctx, text, nick, ua) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(
    id,
    Number(body.ts) || Date.now(),
    String(body.page || '').slice(0, 200),
    String(body.title || '').slice(0, 200),
    String((body.ctx || {}).trail || '').slice(0, 200),
    JSON.stringify(sanitizeCtx(body.ctx)),
    text,
    String(body.nick || '').slice(0, 40),
    request.headers.get('user-agent') || ''
  ).run();
  return json({ ok: true, id });
}

// 拉取留言（管理用）：GET /api/comments?token=ADMIN_TOKEN
export async function onRequestGet({ request, env }) {
  if (!env.DB) return json({ ok: false, error: 'D1 not bound' }, 500);
  const url = new URL(request.url);
  if (!env.ADMIN_TOKEN || url.searchParams.get('token') !== env.ADMIN_TOKEN) {
    return json({ ok: false, error: 'unauthorized' }, 401);
  }
  const { results } = await env.DB.prepare(
    'SELECT id, ts, page, title, trail, ctx, text, nick, ua FROM feedback ORDER BY ts DESC LIMIT 200'
  ).all();
  return json({ ok: true, items: results });
}
