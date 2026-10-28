# 图知学堂 · 初中数学可视化学习

K12 可视化学习工具，当前为初中数学九上全五章样板。核心理念：**知识点是零件，题型是装配图，定位器是「看见题就知道拿哪张装配图」**。

## 当前内容

| 章 | 知识点 | 例题 | 题型 |
|---|---|---|---|
| 一元二次方程（人教九上 21 章） | 10 | 19 | 12 |
| 二次函数（人教九上 22 章） | 10 | 21 | 12 |
| 旋转（人教九上 23 章） | 7 | 12 | 8 |
| 圆（人教九上 24 章） | 8 | 14 | 10 |
| 概率初步（人教九上 25 章） | 7 | 14 | 10 |

## 架构

- **一章一文件**：`data/chapters/<chapterId>.json` 包含该章全部数据（meta / points / examples / patterns）。加一章 = 加一个文件，重跑 `node build.js`，目录、导航、sitemap 全自动更新。
- **语义化 URL**：`/<chapterId>/<pointId>.html`（如 `/quadratic-equation/completing-square.html`），ID 全局语义化（`vertex-form`、`vieta`），不再用 p01/t04 序号——跨章引用不会冲突，SEO 友好。
- **零依赖**：纯 Node 标准库构建，产物为纯静态文件，样式/脚本内联进每个页面，直接托管 Cloudflare Pages。
- **讲解流（blocks）**：每个知识点的 `blocks` 数组支持三种块：`{t:"p"}` 文字、`{t:"viz"}` 可视化、`{t:"list"}` 步骤列表，图文交替。
- **返回导航**：所有页面共享轻量访问栈（sessionStorage），顶部「回到刚才的…」上下文条 + 滚动后左下角浮动返回按钮；回旧页自动截断历史防绕圈，pageshow 处理 bfcache。

## 可视化组件库（assets/viz.js）

- `plot`：静态函数图像（标注、箭头、虚线、区间、自动找零点）
- `parabola-lab`：抛物线实验室（拖 a/h/k 或 a/b/c，实时顶点、对称轴、交点）
- `steps`：分步动画（参数滑块联动，每步图形 + 文字数值实时更新）
- `complete-square`：配方法几何拼图（拖 b，看 x² 补上缺角成为 (x+b/2)²）
- `equation`：判别式与韦达实验台（拖 a/b/c，Δ、两根、和与积实时联动）
- `growth`：增长率柱状图（拖初始值/增长率，三期高度与反推开方演示）
- `rotate`：旋转实验台（拖旋转角/中心位置，原图虚线 → 新图实线，对应点连线与旋转角弧实时标注）
- `coord-rot`：坐标系旋转（拖点与角度，(x,y)→(−y,x) 等三条坐标规律联动演示）
- `pattern`：旋转对称（拖叶片数 n 与当前转角，验证最小旋转角 360°÷n 与重合判定）
- `clock`：钟表夹角（拖时/分，双针旋转、夹角弧与 |30H − 5.5M| 公式实时对照）
- 圆章组件：`anatomy`（圆的解剖：半径/直径/弦/弧标注）、`chord`（垂径实验台：r² = d² + (半弦)² 弦长拱高联动）、`inscribed`（圆周角定理：C 随便拖，恒等于圆心角一半，n=180 时锁死 90°）、`position`（点与圆 d vs r）、`tangent`（直线与圆：相交/相切/相离，d=r 时 OT⊥l）、`sector`（弧长与扇形：比例思想 + S=½lr 核对）
- 概率章组件：`event-scale`（事件可能性标尺：拖 P 看转盘着色，不可能/随机/必然三区）、`bag`（等可能摸球台：球排 + 概率条，P=m/n 数出来）、`sum-table`（列表法 6×6：拖目标点数和高亮对角线，1~6~1 分布）、`tree`（树状图不放回：第二步分母减一，末端概率相乘）、`coin`（频率稳定性实验：10000 次伪随机折线收敛到理论概率，可换种子批次）、`dart`（面积型概率：(r/R)² 平方关系可视化）
- `bridge` / `profit` / `fence` / `fountain` / `shot`：实物场景（拱桥、定价、围栏、喷泉、投篮）

## 题型层

- 每类题型带：题面信号、**逆向解读链**（由哪些知识点按什么顺序拼成，起点高亮）、固定解题路线、完整解答、易错点。
- 题型库首页：知识点 × 题型交叉矩阵 + 知识点共现排行。
- `locate.html` 题目定位器：两问打分匹配 → Top 结果 + 第一步动作。每章有自己的 asks / features 配置。
- 知识点页自动反查「出现在哪些题型里」。

## 留言板（含画面引用自动采集）

- 所有页面右下角「留言」浮动按钮，打开留言抽屉：提交建议 / 求内容 / 指出错。
- **自动附上画面引用**（本站特色，追溯时一眼还原现场）：提交时自动采集当前页面身份（路径 + 标题 + 面包屑）、**视口内正在显示的交互组件**（类型 + 参数状态文字，如「旋转角 θ = 60° 逆时针」）、**画面截图缩略图**（canvas 降采样 JPEG，单张约 2KB）。
- **两种模式**：
  - 预览模式（默认）：留言存访客本机 localStorage（上限 40 条，超配额自动去缩略图）。
  - 正式模式：`build.js` 里 `SITE.commentApi = '/api/comments'`，留言 POST 到 Cloudflare Pages Functions + D1 汇总（`functions/api/comments.js` 已备好，含 `GET ?token=` 管理端拉取）。启用步骤见 `functions/api/comments.js` 头部注释。

## 用法

```bash
node build.js          # 生成 dist/
python -m http.server 8137 --directory dist   # 本地预览
```

## 上线前 checklist

1. `build.js` 顶部 `SITE.base` 换成真实域名
2. GSC 提交 `sitemap.xml`、接 IndexNow（复用工具站脚本）
3. 站名「图知学堂」为工作名，可随时改

## 扩展新章节

复制 `data/chapters/quadratic-equation.json` 为模板，改 meta（id/title/order）和内容。**不要在构建脚本里 rmSync 清空 dist**（本机安全删除机制会拦截），构建是增量覆盖模式。

## 已验证

- 全站 1723 条内链 0 失效（Python 静态检查，剥除 script/style 后）
- 新组件 canvas 均有渲染、滑块联动正常、无 JS 异常（headless Chrome + CDP 实测；浏览器不可用时退化为 `.shots/stub-test.js` Node 桩环境：真实执行全部组件 + 模拟拖滑块）
- 返回导航 8 场景（含 bfcache、无栈进入、跨类型跳转）实测通过
