# 图知学堂 · K12 数学可视化学习

**知识点是零件，题型是装配图，定位器是「看见题就知道拿哪张装配图」。**

线上：**https://teach.toolona.com**（Cloudflare Pages，push 自动部署）

## 当前内容（2026-10，内容生产已收官）

| 学段 | 覆盖 | 章节 |
|---|---|---|
| 小学 | 人教版一~六年级全部 12 册 | 93 章 |
| 初中 | 人教版七~九年级全部 6 册 | 27 章 |
| 高中 | 人教 A 版必修一二 + 选必一二三 | 18 章 |
| **合计** | | **138 章 / 641 知识点页 / 864 题型页 / 138 个题目定位器** |

每个知识点 = 一个 SEO 页面，包含：可拖动的交互演示（canvas）、分步例题（支持自测模式）、
调用它的题型反查、现实应用场景。每类题型拆解：题面信号 → 知识点链条（逆向解读）→ 固定解题路线 → 易错点。

## 站点功能

- **三学段目录**：首页按小学 / 初中 / 高中分页签；会记住你上次学到的学段和章节，回来自动定位。
- **站内搜索**：右上角 🔍 或按 `/`，搜知识点 / 题型 / 章节名（静态 JSON 索引 `search-index.json`，打开时才加载）。
- **收藏 & 错题本**：知识点 / 题型页可收藏；例题自测模式里点「不会」自动进错题单。数据全在浏览器 localStorage，`/favorites.html` 查看。
- **题目定位器**：每章一个，两问（求什么 + 题面信号词）打分匹配题型，直接给第一步动作。
- **专项图谱**：`/tracks/`（初中+高中五条主线）、`/tracks/primary/`（小学四条线），SVG 可拖动缩放。
- **导航**：面包屑 + 底部「返回上一级」栏 + 左下角「返回上一步」浮钮（sessionStorage 访问栈）。
- **深浅色**：跟随系统，右上角 🌙 手动切换。
- **留言板**：右下角浮动按钮，自动附画面引用（正在看的组件 + 参数 + 截图缩略图），提交到 Cloudflare Pages Functions + D1。

## 架构

- **一章一文件**：`data/chapters/<chapterId>.json`（meta / points / examples / patterns）。加一章 = 加一个 JSON + 重跑构建，目录、导航、sitemap、搜索索引全自动。
- **零依赖**：纯 Node 标准库，`node build.js` 产出纯静态 `dist/`。样式与脚本按页内联，无构建链、无框架。
- **数据生成走脚手架**：`.shots/gen-lib.js`（P/V/L/pt/save，save 内做 schema 校验），历史生成脚本都在 `.shots/`。
- **语义化 URL**：`/<chapterId>/<pointId>.html`，ID 全局语义化，跨章引用不冲突。

## 常用命令

```bash
node build.js                                # 构建 dist/（约 1-3 分钟）
python -m http.server 8137 --directory dist  # 本地预览
node .shots/stub-test.js                     # 组件桩测试（老组件桩限制误报可忽略）
node .shots/geom-check.js all                # 文字溢出 / 图元越界自检
node indexnow.js                             # push 部署完成后提交搜索引擎
```

**发布流程**：改数据/组件 → `node build.js` → 本地抽查 → commit/push → 等部署（约 1 分钟）→ `node indexnow.js`。

## 数据 schema 要点（改数据前必读）

- `meta.grade` 写「X年级上/下册」；小学章节 `meta.unit: true`、`bookNo` 为教材单元号。
- `patterns.patterns[]`：`no/id/title/kind/asks[]/signals[]/chain[{point,role}]/route[]/solution[{text,math}]/trap/stem/locate`。
- `route` 是知识点 URL 数组（`/章/点`，与 chain 一一对应）；高中的是文字步骤，两种都支持。
- **`chain` / `prerequisites` 只在章内解析**，跨章 id 会静默失效；跨章关系用 `meta.prereqChapters: ["章id"]`。
- `viz.type` 不能带 `-lab` 后缀（桩测试会推导成 xxxLabLab）。
- 消费端契约：改 asks/signals/route 结构时，同步检查 `build.js`（renderLocate/renderPattern）和 `assets/locate.js`。

## 部署与运营

- Cloudflare Pages 直连仓库，push 即上线；`assets/*.js/css` 边缘缓存 max-age=14400，改完部署后几分钟内刷新，验证线上用 `curl -o` 落盘 + `cmp`。
- sitemap 已提交 GSC；IndexNow key 在 `site.json`。
- 留言存 D1，管理端拉取需 `ADMIN_TOKEN`（Pages 环境变量）。
