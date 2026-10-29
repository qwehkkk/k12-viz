/* 人教版一年级下册 · 7 单元 */
const { P, V, L, pt, save } = require('./gen-lib');

/* ========== 第 1 单元 认识图形（二） ========== */
save('p1b-shape2', {
  meta: {
    id: 'p1b-shape2', title: '认识图形（二）', grade: '一年级下册', bookNo: 1, order: 21,
    unit: true, status: 'done', prereqChapters: ['p1a-shape'],
    tagline: '长方形、正方形、三角形、圆——上一册「摸得着」的立体，这一册「画出来」的平面。',
    textbook: '人教版一年级下册第一单元',
    intro: '从立体走到平面：把长方体按在纸上描一圈是**长方形**，正方体的面是**正方形**。认四种平面图形，还会用七巧板拼图、用图形拼出更大的图形。核心是「**面从体上来**」。',
    examShare: '必考：辨认平面图形、数图形个数、图形拼组（几个小正方形拼大正方形）。失分点是平面与立体混叫（把长方形说成长方体）。',
    emoji: '🔷'
  },
  points: [
    pt({
      id: 'p1b-shape2-name', title: '四种平面图形',
      summary: '长方形对边一样长、正方形四边一样长、三角形三条边、圆是一条封闭曲线。',
      keyPoints: [
        '**长方形**：对边相等，四个角都是直角',
        '**正方形**：四条边一样长',
        '**三角形**：三条边、三个角',
        '**圆**：没有角，边是光滑曲线'
      ],
      viz: ['p1b-shape2', '模式 0：四种图形认一认', { mode: 0 }],
      apply: '课本封面是长方形、魔方的面是正方形、红领巾是三角形、硬币面是圆。',
      blocks: [
        P('平面图形是「印」在纸上的：拿立体图形在纸上**描边**，得到的印子就是平面图形。'),
        V('p1b-shape2', '模式 0：描一描认一认', { mode: 0 }),
        P('长方形和正方形最像，区别在**四条边是否一样长**。'),
        L(['对边相等是长方形', '四边一样是正方形', '三边是三角形', '圆没有角'])
      ]
    }),
    pt({
      id: 'p1b-shape2-relate', title: '面从体上来',
      summary: '平面图形藏在立体图形上：长方体的面是长方形，正方体的面是正方形，圆柱的底面是圆。',
      keyPoints: [
        '**立体图形的面**就是平面图形',
        '长方体至少有**长方形的面**（有的面也可能是正方形）',
        '正方体的 6 个面**都是正方形**',
        '圆柱的**底面是圆**，侧面不是'
      ],
      prereq: ['p1b-shape2-name'],
      viz: ['p1b-shape2', '模式 1：从体上找面', { mode: 1 }],
      apply: '摸一摸魔方：每个面都是正方形；摸一摸罐头：上下底是圆。',
      blocks: [
        P('「面从体上来」：拿立体图形压在纸上描一圈，描出来的就是它某个面的形状。'),
        V('p1b-shape2', '模式 1：描出面来', { mode: 1 }),
        P('特别记：圆柱的侧面是**曲面**，展开是长方形，但圆柱上能「印」出来的是**圆**。'),
        L(['体上有面', '正方体面面正方', '长方体面有长方', '圆柱底面是圆'])
      ]
    }),
    pt({
      id: 'p1b-shape2-compose', title: '图形的拼组',
      summary: '两个一样的三角形能拼成大三角形或长方形；图形拼组要边对边、角对角。',
      keyPoints: [
        '拼组要**边与边完全重合**',
        '两个一样的三角形可拼长方形/大三角形/平行四边形',
        '**2 个正方形**拼长方形，**4 个**拼大正方形',
        '七巧板能拼出上百种图案'
      ],
      prereq: ['p1b-shape2-name'],
      viz: ['p1b-shape2', '模式 2：拼一拼', { mode: 2 }],
      apply: '七巧板拼动物、拼房子——图形可以组合出无穷图案。',
      blocks: [
        P('拼图的关键：**公共边要完全贴合**。两个同样的直角三角形，斜边对斜边拼出长方形。'),
        V('p1b-shape2', '模式 2：三角形拼长方形', { mode: 2 }),
        P('数一数几个小正方形能拼成大正方形：**2 个不行，4 个正好**（两行两列）。'),
        L(['边对齐才拼得上', '2 正方拼长方形', '4 正方拼大正方形', '七巧板百变'])
      ]
    }),
    pt({
      id: 'p1b-shape2-count', title: '数图形',
      summary: '数图中的平面图形：按种类分开数，拼在图案里的要按颜色或位置分块数。',
      keyPoints: [
        '**一种一种数**，做记号',
        '组合图案里**一块一块找**',
        '数过的不再数',
        '数完可以**加起来核对**'
      ],
      prereq: ['p1b-shape2-compose'],
      viz: ['p1b-shape2', '模式 3：图案里数图形', { mode: 3 }],
      apply: '挂毯、地砖的花纹里藏着许多图形，数一数每种有多少。',
      blocks: [
        P('图案里的图形叠在一起，容易数乱——**按颜色或位置分块**，一种一种数。'),
        V('p1b-shape2', '模式 3：分块点数', { mode: 3 }),
        P('数完把各类相加，看看总数对不对，用**加法自检**。'),
        L(['分块数', '做记号', '数过不重复', '加法核对'])
      ]
    })
  ],
  examples: [
    { id: 'p1b-shape2-e1', point: 'p1b-shape2-name', title: '辨认',
      question: '四条边一样长的图形是什么形？',
      steps: [
        { text: '四边一样长。', math: '' },
        { text: '正方形。', math: '' }
      ],
      answer: '正方形' },
    { id: 'p1b-shape2-e2', point: 'p1b-shape2-name', title: '找不同',
      question: '长方形和正方形最大的不同是什么？',
      steps: [
        { text: '看四条边是否一样长。', math: '' },
        { text: '正方形四边一样长，长方形对边一样长。', math: '' }
      ],
      answer: '四边是否一样长' },
    { id: 'p1b-shape2-e3', point: 'p1b-shape2-relate', title: '面从体上来',
      question: '正方体的每个面是什么图形？',
      steps: [
        { text: '六个面完全一样。', math: '' },
        { text: '正方形。', math: '' }
      ],
      answer: '正方形' },
    { id: 'p1b-shape2-e4', point: 'p1b-shape2-compose', title: '拼组',
      question: '用 4 个一样的小正方形，能拼成一个大正方形吗？怎么拼？',
      steps: [
        { text: '两行两列摆放。', math: '' },
        { text: '能，拼成 2×2 的大正方形。', math: '' }
      ],
      answer: '能，2×2 拼法' },
    { id: 'p1b-shape2-e5', point: 'p1b-shape2-compose', title: '三角形拼图',
      question: '两个完全一样的三角形，可以拼成哪些图形？',
      steps: [
        { text: '斜边对斜边。', math: '长方形' },
        { text: '边对边其他拼法。', math: '大三角形、平行四边形' }
      ],
      answer: '长方形、大三角形、平行四边形' },
    { id: 'p1b-shape2-e6', point: 'p1b-shape2-count', title: '数图形',
      question: '图中有 3 个长方形、2 个正方形、4 个三角形、1 个圆，一共有几个图形？',
      steps: [
        { text: '分类相加。', math: '3 + 2 + 4 + 1 = 10（个）' }
      ],
      answer: '10 个' }
  ],
  patterns: {
    asks: [
      { k: '认平面', desc: '辨认平面图形' },
      { k: '面与体', desc: '立体图形的面的形状' },
      { k: '拼组', desc: '图形拼组' },
      { k: '数图形', desc: '分类数平面图形' },
      { k: '七巧板', desc: '用七巧板拼图' }
    ],
    features: [
      '平面图形和立体图形名称要分清',
      '正方形四边等长',
      '拼图边对齐',
      '数图形一种一种数'
    ],
    patterns: [
      { no: '基础 1', id: 'p1b-shape2-t-name', title: '认图形', level: '基础', kind: '概念',
        asks: ['认平面'], signals: ['是什么形'],
        chain: [{ point: 'p1b-shape2-name', role: '看边与角' }],
        locate: '数边、看角、比边长。',
        stem: '三条边的图形是什么形？',
        solution: [
          { text: '三条边三个角。', math: '' },
          { text: '三角形。', math: '' }
        ],
        trap: '和立体图形名混淆。' },
      { no: '基础 2', id: 'p1b-shape2-t-face', title: '面从体上来', level: '基础', kind: '概念',
        asks: ['面与体'], signals: ['面是什么形'],
        chain: [{ point: 'p1b-shape2-relate', role: '描面' }],
        locate: '找立体上的平面。',
        stem: '圆柱的底面是什么图形？',
        solution: [
          { text: '底面是圆。', math: '' }
        ],
        trap: '说成圆柱形——那是立体名。' },
      { no: '中档 1', id: 'p1b-shape2-t-compose', title: '拼组', level: '中档', kind: '应用',
        asks: ['拼组'], signals: ['拼成', '几个拼'],
        chain: [{ point: 'p1b-shape2-compose', role: '边对边' }],
        locate: '想行列或公共边。',
        stem: '用 6 个一样的小正方形拼长方形，可以怎么拼？',
        solution: [
          { text: '一行 6 个。', math: '6×1' },
          { text: '或两行 3 个。', math: '3×2' }
        ],
        trap: '只答一种。' },
      { no: '中档 2', id: 'p1b-shape2-t-count', title: '数图形', level: '中档', kind: '应用',
        asks: ['数图形'], signals: ['数一数', '几种'],
        chain: [{ point: 'p1b-shape2-count', role: '分块数' }],
        locate: '一种一种数并做记号。',
        stem: '一幅拼图里有 4 个三角形、2 个圆、1 个正方形，共几个图形？',
        solution: [
          { text: '相加。', math: '4 + 2 + 1 = 7（个）' }
        ],
        trap: '重数漏数。' },
      { no: '提升 1', id: 'p1b-shape2-t-tangram', title: '七巧板', level: '提升', kind: '应用',
        asks: ['七巧板'], signals: ['七巧板'],
        chain: [{ point: 'p1b-shape2-compose', role: '图形组合' }],
        locate: '认全七块：5 三角、1 正方、1 平行四边形。',
        stem: '一套七巧板里有几个三角形？',
        solution: [
          { text: '5 大 1 中 5 小？不：2 大 1 中 2 小。', math: '' },
          { text: '共 5 个三角形。', math: '' }
        ],
        trap: '记错块数，七巧板是 7 块。' }
    ]
  }
});

/* ========== 第 2 单元 20 以内的退位减法 ========== */
save('p1b-sub20', {
  meta: {
    id: 'p1b-sub20', title: '20 以内的退位减法', grade: '一年级下册', bookNo: 2, order: 22,
    unit: true, status: 'done', prereqChapters: ['p1a-carry'],
    tagline: '个位不够减怎么办？破十法：先从 10 里减，再把剩下的和个位合并——12 − 5，先 10 − 5 = 5，再 5 + 2 = 7。',
    textbook: '人教版一年级下册第二单元',
    intro: '「退位」就是**个位不够减、要向十位借**。两种主流方法：**破十法**（10 − 几，再加剩下的）和**平十法**（连减：先减到 10，再减剩下的）。两种都要会，选顺手的。熟练后直接想「想加算减」更快。',
    examShare: '必考：十几减 9、8、7、6、5…的计算、想加算减、解决问题（还剩多少、相差多少）。失分点是破十后忘了加个位数。',
    emoji: '➖'
  },
  points: [
    pt({
      id: 'p1b-sub20-broken', title: '破十法',
      summary: '个位不够减，就用 10 来减：12 − 5 = 10 − 5 + 2 = 7。先破十，再加回个位。',
      keyPoints: [
        '十几 = **10 + 几**',
        '**10 − 5 = 5**，再 **5 + 2 = 7**',
        '破十法三步：破十、减、加回',
        '适用于所有**个位不够减**的题'
      ],
      viz: ['p1b-sub20', '模式 0：拆开一捆来减', { mode: 0 }],
      apply: '12 块饼干吃 5 块：从整盒 10 块里拿 5 块，还剩 5 + 2 = 7 块。',
      blocks: [
        P('12 里只有 2 个「一」，不够减 5——**把 1 个十拆开**变成 10 个一。'),
        V('p1b-sub20', '模式 0：一捆拆开减', { mode: 0 }),
        P('三步写清楚：10 − 5 = 5，5 + 2 = 7，所以 12 − 5 = 7。'),
        L(['不够减就破十', '10 减几', '再加个位', '三步写清'])
      ]
    }),
    pt({
      id: 'p1b-sub20-flat', title: '平十法（连减）',
      summary: '先减到 10，再减剩下的：13 − 6，先 13 − 3 = 10，再 10 − 3 = 7。',
      keyPoints: [
        '**先把个位减完**：13 − 3 = 10',
        '再减剩下的：10 − 3 = 7',
        '拆减数：6 = 3 + 3',
        '平十法与破十法**结果一样**'
      ],
      prereq: ['p1b-sub20-broken'],
      viz: ['p1b-sub20', '模式 1：先减到 10', { mode: 1 }],
      apply: '13 元花 6 元：先花 3 元剩 10 元，再花 3 元剩 7 元。',
      blocks: [
        P('平十法的思路：**分两次减**，第一次把个位清零。'),
        V('p1b-sub20', '模式 1：两步清零', { mode: 1 }),
        P('两种方法都练，**哪个顺手用哪个**；考试结果相同。'),
        L(['拆减数', '先减到 10', '再减剩下', '异曲同工'])
      ]
    }),
    pt({
      id: 'p1b-sub20-thinkadd', title: '想加算减',
      summary: '减法是加法的逆运算：算 12 − 4，想「4 加几等于 12」——4 + 8 = 12，所以 12 − 4 = 8。',
      keyPoints: [
        '减法想加法：**几 + 差 = 被减数**',
        '凑十法熟了，「想加」更快',
        '一组加法管**两道减法**',
        '9 + 4 = 13 → 13 − 4 = 9、13 − 9 = 4'
      ],
      prereq: ['p1b-sub20-broken'],
      viz: ['p1b-sub20', '模式 2：想加算减', { mode: 2 }],
      apply: '知道 8 + 7 = 15，就能立刻算 15 − 7 和 15 − 8。',
      blocks: [
        P('「想加算减」是熟练后的**最快路径**：看到 13 − 4，脑子里浮现 4 + 9 = 13。'),
        V('p1b-sub20', '模式 2：一道加法管两道减法', { mode: 2 }),
        P('前提是 20 以内进位加法**很熟**——上学期凑十法打的基础现在用上了。'),
        L(['想加算减', '一加管两减', '前提：加法熟', '最终都要脱口而出'])
      ]
    }),
    pt({
      id: 'p1b-sub20-solve', title: '解决问题',
      summary: '「去掉多少」「相差多少」都用减法：总数 − 去掉的 = 剩下的；大数 − 小数 = 相差多少。',
      keyPoints: [
        '**还剩多少** → 减法',
        '**相差多少（多几、少几）** → 大数减小数',
        '算式带单位',
        '答语完整'
      ],
      prereq: ['p1b-sub20-thinkadd'],
      viz: ['p1b-sub20', '模式 3：剩下与相差', { mode: 3 }],
      apply: '15 个同学，9 个男生，女生几人？相差几人？同一道减法算两次问。',
      blocks: [
        P('两类减法问题：**去掉剩多少**（15 − 9）和**比多少**（15 比 9 多几）。算式一样，意义不同。'),
        V('p1b-sub20', '模式 3：剩多少、差多少', { mode: 3 }),
        P('「比多少」的关键句：**大数 − 小数 = 相差数**。谁比谁多几，就用大的减小的。'),
        L(['还剩 → 减', '相差 → 大减小', '带单位', '答完整'])
      ]
    })
  ],
  examples: [
    { id: 'p1b-sub20-e1', point: 'p1b-sub20-broken', title: '破十法',
      question: '计算：14 − 6。',
      steps: [
        { text: '破十：10 − 6 = 4。', math: '' },
        { text: '加回个位。', math: '4 + 4 = 8' }
      ],
      answer: '8' },
    { id: 'p1b-sub20-e2', point: 'p1b-sub20-flat', title: '平十法',
      question: '计算：15 − 8。',
      steps: [
        { text: '8 拆成 5 和 3。', math: '15 − 5 = 10' },
        { text: '再减。', math: '10 − 3 = 7' }
      ],
      answer: '7' },
    { id: 'p1b-sub20-e3', point: 'p1b-sub20-thinkadd', title: '想加算减',
      question: '计算：11 − 9。',
      steps: [
        { text: '想：9 + 几 = 11。', math: '9 + 2 = 11' },
        { text: '所以差是 2。', math: '11 − 9 = 2' }
      ],
      answer: '2' },
    { id: 'p1b-sub20-e4', point: 'p1b-sub20-thinkadd', title: '一组管两道',
      question: '由 7 + 6 = 13 能写出哪两道减法算式？',
      steps: [
        { text: '整体减一部分。', math: '13 − 6 = 7' },
        { text: '另一道。', math: '13 − 7 = 6' }
      ],
      answer: '13 − 6 = 7，13 − 7 = 6' },
    { id: 'p1b-sub20-e5', point: 'p1b-sub20-solve', title: '还剩多少',
      question: '有 16 个气球，飞走 7 个，还剩几个？',
      steps: [
        { text: '去掉用减法。', math: '16 − 7 = 9（个）' }
      ],
      answer: '9 个' },
    { id: 'p1b-sub20-e6', point: 'p1b-sub20-solve', title: '相差多少',
      question: '小明有 13 元，小红有 8 元。小明比小红多几元？',
      steps: [
        { text: '大数减小数。', math: '13 − 8 = 5（元）' }
      ],
      answer: '多 5 元' }
  ],
  patterns: {
    asks: [
      { k: '破十法', desc: '破十计算退位减法' },
      { k: '平十法', desc: '连减到十' },
      { k: '想加算减', desc: '用加法想减法' },
      { k: '还剩', desc: '去掉求剩余' },
      { k: '相差', desc: '比多少问题' }
    ],
    features: [
      '个位不够减才退位',
      '破十：10 − 几再加个位',
      '熟练后想加算减最快',
      '相差多少用大数减小数'
    ],
    patterns: [
      { no: '基础 1', id: 'p1b-sub20-t-broken', title: '破十法', level: '基础', kind: '计算',
        asks: ['破十法'], signals: ['十几减'],
        chain: [{ point: 'p1b-sub20-broken', role: '破十' }],
        locate: '10 − 几，再加个位。',
        stem: '计算：13 − 5。',
        solution: [
          { text: '10 − 5 = 5。', math: '' },
          { text: '5 + 3 = 8。', math: '13 − 5 = 8' }
        ],
        trap: '破十后忘加个位。' },
      { no: '基础 2', id: 'p1b-sub20-t-flat', title: '平十法', level: '基础', kind: '计算',
        asks: ['平十法'], signals: ['连减'],
        chain: [{ point: 'p1b-sub20-flat', role: '先减到 10' }],
        locate: '拆减数，先清个位。',
        stem: '计算：12 − 7。',
        solution: [
          { text: '7 拆 2 和 5。', math: '12 − 2 = 10' },
          { text: '再减。', math: '10 − 5 = 5' }
        ],
        trap: '拆数拆错。' },
      { no: '中档 1', id: 'p1b-sub20-t-thinkadd', title: '想加算减', level: '中档', kind: '计算',
        asks: ['想加算减'], signals: ['想加'],
        chain: [{ point: 'p1b-sub20-thinkadd', role: '逆运算' }],
        locate: '想几加几等于被减数。',
        stem: '用想加算减计算：14 − 8。',
        solution: [
          { text: '想 8 + 几 = 14。', math: '8 + 6 = 14' },
          { text: '差 6。', math: '14 − 8 = 6' }
        ],
        trap: '加法不熟想不起来。' },
      { no: '中档 2', id: 'p1b-sub20-t-left', title: '求剩余', level: '中档', kind: '应用',
        asks: ['还剩'], signals: ['还剩', '飞走', '吃掉'],
        chain: [{ point: 'p1b-sub20-solve', role: '减法' }],
        locate: '总数减去掉的。',
        stem: '17 只鸭子游走 8 只，还剩几只？',
        solution: [
          { text: '减法。', math: '17 − 8 = 9（只）' }
        ],
        trap: '答语漏单位。' },
      { no: '提升 1', id: 'p1b-sub20-t-diff', title: '相差问题', level: '提升', kind: '应用',
        asks: ['相差'], signals: ['多几', '少几', '相差'],
        chain: [{ point: 'p1b-sub20-solve', role: '大数减小数' }],
        locate: '谁大就减谁。',
        stem: '哥哥 15 颗糖，弟弟 9 颗。哥哥比弟弟多几颗？弟弟比哥哥少几颗？',
        solution: [
          { text: '大减小。', math: '15 − 9 = 6（颗）' },
          { text: '两问问的是同一件事。', math: '' }
        ],
        trap: '算两次不同的数。' }
    ]
  }
});

/* ========== 第 3 单元 分类与整理 ========== */
save('p1b-sort', {
  meta: {
    id: 'p1b-sort', title: '分类与整理', grade: '一年级下册', bookNo: 3, order: 23,
    unit: true, status: 'done', prereqChapters: ['p1a-count'],
    tagline: '分类先定标准：按形状分还是按颜色分，标准一变结果就变——同一堆东西可以有多种分法。',
    textbook: '人教版一年级下册第三单元',
    intro: '把乱的东西整理清楚是统计的第一步。分类要**标准统一**：按形状分就只看形状。同一批物品按不同标准分类，会得到不同结果，但**总数不变**。分完还要会**整理成表**——简单的统计表就是从这来的。',
    examShare: '必考：按给定标准分类、自定标准分类、分类结果整理成表。失分点是分类标准混用（形状颜色一起看）。',
    emoji: '🗂️'
  },
  points: [
    pt({
      id: 'p1b-sort-std', title: '按标准分类',
      summary: '分类前先定标准：标准统一，才能把东西分成不重不漏的几堆。',
      keyPoints: [
        '先定**一个标准**（形状/颜色/用途）',
        '每一件物品**只进一堆**',
        '标准不同，分法不同',
        '分类要**不重不漏**'
      ],
      viz: ['p1b-sort', '模式 0：按什么标准分', { mode: 0 }],
      apply: '收拾书包按用途分：课本一堆、文具一堆。',
      blocks: [
        P('分类第一问：**按什么分？**标准定了才能动手。'),
        V('p1b-sort', '模式 0：选标准再分堆', { mode: 0 }),
        P('分完检查：每一堆的标准一致吗？有没有东西分错堆？'),
        L(['先定标准', '只看一个维度', '不重不漏', '分完检查'])
      ]
    }),
    pt({
      id: 'p1b-sort-multi', title: '不同标准，不同结果',
      summary: '同一批东西，按颜色分是一种结果，按形状分是另一种结果——但总数一样。',
      keyPoints: [
        '**换标准**就换结果',
        '无论怎么分，**总数不变**',
        '结果不同不代表有错',
        '比较两种分法能发现**总数守恒**'
      ],
      prereq: ['p1b-sort-std'],
      viz: ['p1b-sort', '模式 1：换标准重新分', { mode: 1 }],
      apply: '一堆积木按颜色分 3 堆、按形状分 4 堆，但都是同一堆积木。',
      blocks: [
        P('同一堆物品分两次：按形状一次、按颜色一次，**结果不同、总数相同**。'),
        V('p1b-sort', '模式 1：两种分法对照', { mode: 1 }),
        P('这就是「守恒」思想的萌芽：**怎么分都不多不少**。'),
        L(['标准变结果变', '总数不变', '都对', '对比着学'])
      ]
    }),
    pt({
      id: 'p1b-sort-table', title: '整理成简单的统计表',
      summary: '分类的结果可以用表格记录：一行写类别，一行写个数，一目了然。',
      keyPoints: [
        '分类结果**填入表格**',
        '表里写**类别 + 数量**',
        '从表中能**直接读出**谁多谁少',
        '表是**整理数据**的工具'
      ],
      prereq: ['p1b-sort-std'],
      viz: ['p1b-sort', '模式 2：分完填表', { mode: 2 }],
      apply: '班级竞选：唱票画「正」字，最后填表——统计的雏形。',
      blocks: [
        P('分堆数好个数，**填进表里**：类别一栏、数量一栏。'),
        V('p1b-sort', '模式 2：表格一眼见多少', { mode: 2 }),
        P('表格比图片更好比较：**看数字就知道**谁最多。'),
        L(['结果入表', '类别与数量', '直接比较', '统计的第一步'])
      ]
    }),
    pt({
      id: 'p1b-sort-group', title: '自己定标准整理',
      summary: '没有给定标准时，自己选一个合适的标准分类，并说明为什么这样分。',
      keyPoints: [
        '自选标准要**说得清理由**',
        '常见标准：形状、颜色、大小、用途',
        '一种分类就**用一个标准**',
        '说清「我是按…分的」'
      ],
      prereq: ['p1b-sort-multi'],
      viz: ['p1b-sort', '模式 3：我的分法我说理', { mode: 3 }],
      apply: '整理玩具箱：按「要不要电池」分，也说得通——标准自己定。',
      blocks: [
        P('开放题：「把图中物品分类」。答案不唯一，**关键是标准合理、表述清楚**。'),
        V('p1b-sort', '模式 3：选个标准说出理由', { mode: 3 }),
        P('答题格式：「按××分类：××一类有…个，××一类有…个。」'),
        L(['自定标准', '理由说清', '一标准到底', '按格式答'])
      ]
    })
  ],
  examples: [
    { id: 'p1b-sort-e1', point: 'p1b-sort-std', title: '按形状分',
      question: '把 △△○□△○ 按形状分类，各几个？',
      steps: [
        { text: '三角形一堆。', math: '3 个' },
        { text: '圆、正方形各。', math: '2 个、1 个' }
      ],
      answer: '△3、○2、□1' },
    { id: 'p1b-sort-e2', point: 'p1b-sort-multi', title: '换标准',
      question: '6 个图形按颜色分是 4 红 2 蓝，按形状分可能是怎样的？',
      steps: [
        { text: '换标准结果会变。', math: '' },
        { text: '总数都是 6。', math: '' }
      ],
      answer: '答案不唯一，总数是 6' },
    { id: 'p1b-sort-e3', point: 'p1b-sort-table', title: '填表',
      question: '苹果 5 个、梨 3 个、橘子 7 个。填成统计表并回答哪种水果最多。',
      steps: [
        { text: '填表：苹果 5、梨 3、橘子 7。', math: '' },
        { text: '比数字。', math: '橘子最多' }
      ],
      answer: '橘子最多' },
    { id: 'p1b-sort-e4', point: 'p1b-sort-table', title: '从表读数',
      question: '统计表里正方形 6 个、圆形 9 个。圆形比正方形多几个？',
      steps: [
        { text: '读表得数。', math: '9 − 6 = 3（个）' }
      ],
      answer: '多 3 个' },
    { id: 'p1b-sort-e5', point: 'p1b-sort-group', title: '自定标准',
      question: '把铅笔、橡皮、尺子、钢笔分类，可以按什么标准分？',
      steps: [
        { text: '按用途：写字的（铅笔、钢笔）和擦改辅助的（橡皮）…', math: '' },
        { text: '也可按材质。', math: '' }
      ],
      answer: '答案不唯一，标准合理即可' },
    { id: 'p1b-sort-e6', point: 'p1b-sort-std', title: '不重不漏',
      question: '分完后发现有两件物品没分进去，说明什么？',
      steps: [
        { text: '分类有遗漏。', math: '' },
        { text: '违反「不漏」，要重新分。', math: '' }
      ],
      answer: '漏了，需重分' }
  ],
  patterns: {
    asks: [
      { k: '按标准分', desc: '给定标准分类' },
      { k: '换标准', desc: '不同标准的不同结果' },
      { k: '填表', desc: '整理成统计表' },
      { k: '读表', desc: '从表中读信息比较' },
      { k: '自定标准', desc: '开放分类并说理' }
    ],
    features: [
      '一次分类只用一个标准',
      '换标准总数不变',
      '表中比大小看数字',
      '自定标准要说理由'
    ],
    patterns: [
      { no: '基础 1', id: 'p1b-sort-t-std', title: '按标准分类', level: '基础', kind: '应用',
        asks: ['按标准分'], signals: ['按…分类'],
        chain: [{ point: 'p1b-sort-std', role: '依标准归堆' }],
        locate: '只看给定标准。',
        stem: '按颜色分类：红花 4 朵、黄花 3 朵、蓝花 5 朵。红花和黄花共几朵？',
        solution: [
          { text: '只取两类相加。', math: '4 + 3 = 7（朵）' }
        ],
        trap: '把蓝花也算进去。' },
      { no: '基础 2', id: 'p1b-sort-t-multi', title: '换标准', level: '基础', kind: '概念',
        asks: ['换标准'], signals: ['还可以怎样分'],
        chain: [{ point: 'p1b-sort-multi', role: '换标准' }],
        locate: '换维度重新分。',
        stem: '按形状分完后，还可以按什么分？',
        solution: [
          { text: '颜色、大小、用途都可以。', math: '' }
        ],
        trap: '认为只有一种分法。' },
      { no: '中档 1', id: 'p1b-sort-t-table', title: '填表', level: '中档', kind: '应用',
        asks: ['填表'], signals: ['统计表', '整理'],
        chain: [{ point: 'p1b-sort-table', role: '结果入表' }],
        locate: '一类一栏填数量。',
        stem: '把「圆形 8 个、三角形 5 个」整理成表，并求总数。',
        solution: [
          { text: '相加。', math: '8 + 5 = 13（个）' }
        ],
        trap: '忘算总数。' },
      { no: '中档 2', id: 'p1b-sort-t-read', title: '读表比较', level: '中档', kind: '应用',
        asks: ['读表'], signals: ['比…多', '最多'],
        chain: [{ point: 'p1b-sort-table', role: '读数比较' }],
        locate: '从表中取数再减。',
        stem: '表中：苹果 12 个、梨 8 个。苹果比梨多几个？',
        solution: [
          { text: '大减小。', math: '12 − 8 = 4（个）' }
        ],
        trap: '用 8 − 12。' },
      { no: '提升 1', id: 'p1b-sort-t-open', title: '开放分类', level: '提升', kind: '综合',
        asks: ['自定标准'], signals: ['你想怎样', '自己分'],
        chain: [{ point: 'p1b-sort-group', role: '定标准 + 说理' }],
        locate: '选一个标准，说清理由与结果。',
        stem: '把班里的同学分类，你的标准是什么？',
        solution: [
          { text: '如按性别、按小组、按是否戴眼镜。', math: '' },
          { text: '说清标准即可。', math: '' }
        ],
        trap: '标准混用（又按性别又按小组）。' }
    ]
  }
});

/* ========== 第 4 单元 100 以内数的认识 ========== */
save('p1b-100', {
  meta: {
    id: 'p1b-100', title: '100 以内数的认识', grade: '一年级下册', bookNo: 4, order: 24,
    unit: true, status: 'done', prereqChapters: ['p1a-1120'],
    tagline: '10 个一是 1 个十，10 个十是 1 个百——数位从两位扩展到三位，读数写数都从最高位起。',
    textbook: '人教版一年级下册第四单元',
    intro: '数位制继续扩展：**10 个十是 1 个百**。会数 100 以内的数（拐弯数是难点：39 后面是 40）、会读写两位数、会说组成（几个十几个一）、会比较大小。数的顺序（百数表）里藏着许多规律。',
    examShare: '必考：数数（拐弯处）、读写数、组成、比大小、百数表规律。失分点是 39 → 40 这类「满十进一」处数错。',
    emoji: '💯'
  },
  points: [
    pt({
      id: 'p1b-100-num', title: '数数与满十进一',
      summary: '一个一个数到拐弯处要「满十进一」：29 后面是 30、79 后面是 80、99 后面是 100。',
      keyPoints: [
        '**10 个一 = 1 个十，10 个十 = 1 个百**',
        '拐弯数：**几十九 → 下一个整十**',
        '可以一个一个数、两个两个数、五个五个数、十个十个数',
        '99 后面是 **100**'
      ],
      viz: ['p1b-100', '模式 0：拐弯的地方', { mode: 0 }],
      apply: '数一盒 100 支的彩笔：十个十个数最快。',
      blocks: [
        P('一个一个数不难，难在**拐弯**：28、29、**30**——9 满 10 进到十位。'),
        V('p1b-100', '模式 0：29 后面是谁', { mode: 0 }),
        P('按群数更快：2 个 2 个、5 个 5 个、10 个 10 个，都是数数的变式。'),
        L(['满十进一', '拐弯处小心', '十进制计数', '按群数更快'])
      ]
    }),
    pt({
      id: 'p1b-100-place', title: '读写数与组成',
      summary: '两位数由几个十和几个一组成；读数写数都从高位起：45 读作「四十五」。',
      keyPoints: [
        '组成：**几个十和几个一**',
        '**读数写数都从高位起**',
        '个位是 0 要写 0 占位（如 40）',
        '100 = 1 个百，写作 1、0、0'
      ],
      prereq: ['p1b-100-num'],
      viz: ['p1b-100', '模式 1：组成与读写', { mode: 1 }],
      apply: '42 元 = 4 张十元 + 2 张一元——组成就是「钱的分法」。',
      blocks: [
        P('读写口诀：**从高位起，一级往下**。45：十位 4 读「四十」，个位 5 读「五」——四十五。'),
        V('p1b-100', '模式 1：拆成几个十几个一', { mode: 1 }),
        P('整十数个位的 0 **必须写**，不写 40 就变成 4 了——占位是数位的命根。'),
        L(['高位起读写', '个位 0 占位', '说组成', '100 三个数位'])
      ]
    }),
    pt({
      id: 'p1b-100-cmp', title: '比大小',
      summary: '先比十位，十位相同比个位；位数多的数大（100 > 99）。',
      keyPoints: [
        '**先比十位**：十位大就大',
        '十位相同**再比个位**',
        '三位数 > 两位数 > 一位数',
        '「多得多、多一些、少一些」描述差距'
      ],
      prereq: ['p1b-100-place'],
      viz: ['p1b-100', '模式 2：先十位再个位', { mode: 2 }],
      apply: '68 和 72 比：十位 6 < 7，所以 68 < 72，不用看个位。',
      blocks: [
        P('两步比法：**十位 → 个位**。位数不同直接位数多的赢。'),
        V('p1b-100', '模式 2：看十位定胜负', { mode: 2 }),
        P('描述差距的词：**多得多、多一些、差不多**——差距大有「得多」，差距小有「一些」。'),
        L(['先十位', '再个位', '位数多者大', '描述差距'])
      ]
    }),
    pt({
      id: 'p1b-100-chart', title: '百数表的规律',
      summary: '百数表里横着看每次多 1、竖着看每次多 10——按规律能填出空格里的数。',
      keyPoints: [
        '**横行**：相邻数差 1',
        '**竖列**：相邻数差 10',
        '斜看也有规律',
        '利用规律**填空缺的数**'
      ],
      prereq: ['p1b-100-num'],
      viz: ['p1b-100', '模式 3：百数表找规律', { mode: 3 }],
      apply: '百数表里 37 的下面是 47（多 10）、右边是 38（多 1）。',
      blocks: [
        P('百数表横竖看：**左右差 1，上下差 10**。'),
        V('p1b-100', '模式 3：空格填数', { mode: 3 }),
        P('填空题先定位已知数，再按「左减 1 右加 1、上减 10 下加 10」推。'),
        L(['横差 1', '竖差 10', '定位再推', '规律填空'])
      ]
    })
  ],
  examples: [
    { id: 'p1b-100-e1', point: 'p1b-100-num', title: '拐弯数数',
      question: '按顺序数：67、68、69、____。',
      steps: [
        { text: '9 满十进一。', math: '' },
        { text: '下一个是 70。', math: '' }
      ],
      answer: '70' },
    { id: 'p1b-100-e2', point: 'p1b-100-num', title: '按群数',
      question: '10 个 10 个数：20、30、40、____。',
      steps: [
        { text: '每次加 10。', math: '' },
        { text: '50。', math: '' }
      ],
      answer: '50' },
    { id: 'p1b-100-e3', point: 'p1b-100-place', title: '组成与写数',
      question: '6 个十和 8 个一合起来是多少？',
      steps: [
        { text: '十位 6、个位 8。', math: '68' }
      ],
      answer: '68' },
    { id: 'p1b-100-e4', point: 'p1b-100-cmp', title: '比大小',
      question: '比较：100 ○ 99。',
      steps: [
        { text: '100 是三位数。', math: '' },
        { text: '100 > 99。', math: '' }
      ],
      answer: '>' },
    { id: 'p1b-100-e5', point: 'p1b-100-cmp', title: '描述差距',
      question: '52 与 55 相差多少？可以说「52 比 55 少一些」吗？',
      steps: [
        { text: '差 3，差距小。', math: '' },
        { text: '可以，说「少一些」。', math: '' }
      ],
      answer: '差 3；可以' },
    { id: 'p1b-100-e6', point: 'p1b-100-chart', title: '百数表填空',
      question: '百数表中 46 的右边一格、下面一格各是几？',
      steps: [
        { text: '右加 1。', math: '47' },
        { text: '下加 10。', math: '56' }
      ],
      answer: '47；56' }
  ],
  patterns: {
    asks: [
      { k: '数数', desc: '拐弯数与按群数' },
      { k: '读写', desc: '读数写数' },
      { k: '组成', desc: '几个十几个一' },
      { k: '比大小', desc: '两位数比大小' },
      { k: '百数表', desc: '按规律填数' }
    ],
    features: [
      '几十九的下一个数是整十',
      '读写从高位起',
      '比大小先十位',
      '百数表横 1 竖 10'
    ],
    patterns: [
      { no: '基础 1', id: 'p1b-100-t-count', title: '拐弯数数', level: '基础', kind: '计算',
        asks: ['数数'], signals: ['接着数', '后面是'],
        chain: [{ point: 'p1b-100-num', role: '满十进一' }],
        locate: '个位满十进一。',
        stem: '接下去数：48、49、____。',
        solution: [
          { text: '满十进一。', math: '' },
          { text: '50。', math: '' }
        ],
        trap: '数成 410。' },
      { no: '基础 2', id: 'p1b-100-t-write', title: '读写数', level: '基础', kind: '计算',
        asks: ['读写'], signals: ['读作', '写作'],
        chain: [{ point: 'p1b-100-place', role: '高位起' }],
        locate: '十位读几十，个位读几。',
        stem: '73 读作什么？',
        solution: [
          { text: '七十三。', math: '' }
        ],
        trap: '读成「七三」。' },
      { no: '中档 1', id: 'p1b-100-t-comp', title: '比大小', level: '中档', kind: '概念',
        asks: ['比大小'], signals: ['><='],
        chain: [{ point: 'p1b-100-cmp', role: '先十位' }],
        locate: '十位定胜负。',
        stem: '比较：89 ○ 91。',
        solution: [
          { text: '十位 8 < 9。', math: '' },
          { text: '89 < 91。', math: '' }
        ],
        trap: '只看 9 比 1 大。' },
      { no: '中档 2', id: 'p1b-100-t-desc', title: '多得多与多一些', level: '中档', kind: '概念',
        asks: ['比大小'], signals: ['多得多', '多一些'],
        chain: [{ point: 'p1b-100-cmp', role: '差距描述' }],
        locate: '差距大「得多」，差距小「一些」。',
        stem: '85 与 15、85 与 82，哪组差距更大？',
        solution: [
          { text: '85 与 15 差 70。', math: '多得多' },
          { text: '85 与 82 差 3。', math: '多一些' }
        ],
        trap: '混淆两种描述。' },
      { no: '提升 1', id: 'p1b-100-t-chart', title: '百数表规律', level: '提升', kind: '应用',
        asks: ['百数表'], signals: ['百数表', '找规律'],
        chain: [{ point: 'p1b-100-chart', role: '横 1 竖 10' }],
        locate: '定位后按差值推。',
        stem: '百数表中 63 的上面一格、左面一格各是几？',
        solution: [
          { text: '上减 10。', math: '53' },
          { text: '左减 1。', math: '62' }
        ],
        trap: '方向弄反。' }
    ]
  }
});

/* ========== 第 5 单元 认识人民币 ========== */
save('p1b-money', {
  meta: {
    id: 'p1b-money', title: '认识人民币', grade: '一年级下册', bookNo: 5, order: 25,
    unit: true, status: 'done', prereqChapters: ['p1b-100'],
    tagline: '1 元 = 10 角，1 角 = 10 分——人民币只有两个进率：十进制，和数的进率一模一样。',
    textbook: '人教版一年级下册第五单元',
    intro: '认识人民币的单位与换算：**元、角、分**，进率都是 10。会认纸币硬币、会换算（1 元 2 角 = 12 角）、会简单的付钱与找零（几元几角买东西）。这一单元把「数的组成」直接用到钱上。',
    examShare: '必考：单位换算、简单计算（几元几角加减）、买东西付钱与找零。失分点是 1 元 2 角写成 1.2 元之前的换算错（要按角统一）。',
    emoji: '💰'
  },
  points: [
    pt({
      id: 'p1b-money-unit', title: '元、角、分',
      summary: '人民币单位是元、角、分：1 元 = 10 角，1 角 = 10 分，1 元 = 100 分。',
      keyPoints: [
        '**1 元 = 10 角**',
        '**1 角 = 10 分**',
        '**1 元 = 100 分**（进率都是 10）',
        '常用单位是**元和角**，分很少用了'
      ],
      viz: ['p1b-money', '模式 0：一元换十个角', { mode: 0 }],
      apply: '1 元能买 10 块 1 角的糖——换算就发生在小卖部。',
      blocks: [
        P('人民币三个单位，**进率全是 10**：元 → 角 → 分。'),
        V('p1b-money', '模式 0：换钱看得见', { mode: 0 }),
        P('记住换算口诀：**一元换十角，一角换十分**。'),
        L(['元角分', '1 元 = 10 角', '1 角 = 10 分', '进率 10'])
      ]
    }),
    pt({
      id: 'p1b-money-change', title: '几元几角与换算',
      summary: '1 元 2 角 = 12 角 = 1.2 元；14 角 = 1 元 4 角——先统一单位再比较计算。',
      keyPoints: [
        '几元几角 → **全化成角**再算',
        '1 元 2 角 = **12 角**',
        '14 角 = **1 元 4 角**（满 10 角进 1 元）',
        '比较钱数要**单位统一**'
      ],
      prereq: ['p1b-money-unit'],
      viz: ['p1b-money', '模式 1：统一成角再算', { mode: 1 }],
      apply: '2 元 5 角 + 3 角：25 角 + 3 角 = 28 角 = 2 元 8 角。',
      blocks: [
        P('带「元」和「角」的两名数计算，**先全化成角**，算完再换回。'),
        V('p1b-money', '模式 1：先化角再回元', { mode: 1 }),
        P('满 10 角要**进位成元**：12 角 = 1 元 2 角。'),
        L(['先统一单位', '化成角算', '满十进元', '再换回几元几角'])
      ]
    }),
    pt({
      id: 'p1b-money-pay', title: '付钱的方法',
      summary: '同样的钱有多种付法：买 8 角的东西，可以 5 角 + 2 角 + 1 角，也可以 2 个 4 角…',
      keyPoints: [
        '付钱 = **凑出价格**',
        '同一价格**多种付法**',
        '优先用**大面额**付更方便',
        '答案不唯一，**钱数对即可**'
      ],
      prereq: ['p1b-money-change'],
      viz: ['p1b-money', '模式 2：怎么凑出 8 角', { mode: 2 }],
      apply: '买 1 元 5 角的贴纸：付 1 元 + 5 角，或付 2 元找 5 角。',
      blocks: [
        P('付钱问题像**数的组成**：把钱数拆成面额的和。'),
        V('p1b-money', '模式 2：多种凑法', { mode: 2 }),
        P('答案不唯一，但要**刚好等于价格**，不能多也不能少（除非用找零）。'),
        L(['凑出价格', '多种付法', '大面额优先', '凑数思想'])
      ]
    }),
    pt({
      id: 'p1b-money-back', title: '找零与简单购物',
      summary: '付出 − 花掉 = 找回：付 2 元买 1 元 5 角的东西，找回 5 角。',
      keyPoints: [
        '**找回 = 付出 − 花掉**',
        '先统一单位再减',
        '2 元 = 20 角，20 角 − 15 角 = 5 角',
        '答语说清「找回几元几角」'
      ],
      prereq: ['p1b-money-pay'],
      viz: ['p1b-money', '模式 3：付钱与找零', { mode: 3 }],
      apply: '付 10 元买 6 元的本子，找回 4 元——最常见的找零。',
      blocks: [
        P('找零三步：**化单位 → 相减 → 换回**。'),
        V('p1b-money', '模式 3：付出减花掉', { mode: 3 }),
        P('买东西前先估算钱够不够：**比较价格和手里的钱**。'),
        L(['找回 = 付出 − 花掉', '先化单位', '再相减', '答完整'])
      ]
    })
  ],
  examples: [
    { id: 'p1b-money-e1', point: 'p1b-money-unit', title: '换算',
      question: '1 元 = （　）角。',
      steps: [
        { text: '进率 10。', math: '1 元 = 10 角' }
      ],
      answer: '10' },
    { id: 'p1b-money-e2', point: 'p1b-money-change', title: '化角',
      question: '1 元 3 角 = （　）角。',
      steps: [
        { text: '1 元 = 10 角。', math: '10 + 3 = 13（角）' }
      ],
      answer: '13 角' },
    { id: 'p1b-money-e3', point: 'p1b-money-change', title: '化回元',
      question: '17 角 = （　）元（　）角。',
      steps: [
        { text: '10 角 = 1 元。', math: '' },
        { text: '1 元 7 角。', math: '' }
      ],
      answer: '1 元 7 角' },
    { id: 'p1b-money-e4', point: 'p1b-money-pay', title: '付钱',
      question: '买 6 角的橡皮，可以怎样付钱？（写两种）',
      steps: [
        { text: '5 角 + 1 角。', math: '' },
        { text: '3 个 2 角。', math: '' }
      ],
      answer: '答案不唯一' },
    { id: 'p1b-money-e5', point: 'p1b-money-back', title: '找零',
      question: '买 8 角的贴纸，付了 1 元，找回多少？',
      steps: [
        { text: '1 元 = 10 角。', math: '10 − 8 = 2（角）' }
      ],
      answer: '2 角' },
    { id: 'p1b-money-e6', point: 'p1b-money-back', title: '够不够',
      question: '文具盒 7 元 5 角，小明有 7 元。够吗？',
      steps: [
        { text: '比较：7 元 < 7 元 5 角。', math: '' },
        { text: '不够，还差 5 角。', math: '' }
      ],
      answer: '不够' }
  ],
  patterns: {
    asks: [
      { k: '单位换算', desc: '元角分互换' },
      { k: '两名数计算', desc: '几元几角的加减' },
      { k: '付钱', desc: '多种付钱方法' },
      { k: '找零', desc: '找回多少钱' },
      { k: '够不够', desc: '比较与判断' }
    ],
    features: [
      '进率全是 10',
      '计算先统一单位（化角）',
      '付钱答案不唯一',
      '找零 = 付出 − 花掉'
    ],
    patterns: [
      { no: '基础 1', id: 'p1b-money-t-unit', title: '单位换算', level: '基础', kind: '计算',
        asks: ['单位换算'], signals: ['= 角', '= 元'],
        chain: [{ point: 'p1b-money-unit', role: '进率 10' }],
        locate: '元 ↔ 角按 10 换。',
        stem: '2 元 = （　）角。',
        solution: [
          { text: '2 个 10 角。', math: '20 角' }
        ],
        trap: '忘乘 10。' },
      { no: '基础 2', id: 'p1b-money-t-change', title: '两名数', level: '基础', kind: '计算',
        asks: ['两名数计算'], signals: ['几元几角'],
        chain: [{ point: 'p1b-money-change', role: '先化角' }],
        locate: '全化成角，算完换回。',
        stem: '1 元 5 角 + 4 角 = 多少？',
        solution: [
          { text: '15 角 + 4 角 = 19 角。', math: '' },
          { text: '1 元 9 角。', math: '' }
        ],
        trap: '把 1 元 5 角当 15 元。' },
      { no: '中档 1', id: 'p1b-money-t-pay', title: '多种付法', level: '中档', kind: '应用',
        asks: ['付钱'], signals: ['怎样付', '可以付'],
        chain: [{ point: 'p1b-money-pay', role: '凑价格' }],
        locate: '把价格拆成面额和。',
        stem: '买 1 元 2 角的邮票，怎样付钱？写两种。',
        solution: [
          { text: '1 元 + 2 角。', math: '' },
          { text: '2 个 5 角 + 2 个 1 角。', math: '' }
        ],
        trap: '付的钱数与价格不符。' },
      { no: '中档 2', id: 'p1b-money-t-back', title: '找零', level: '中档', kind: '应用',
        asks: ['找零'], signals: ['找回', '付了'],
        chain: [{ point: 'p1b-money-back', role: '付出减花掉' }],
        locate: '统一单位后相减。',
        stem: '买 5 元的书包挂件，付了 10 元，找回多少？',
        solution: [
          { text: '10 − 5。', math: '5（元）' }
        ],
        trap: '答成加法。' },
      { no: '提升 1', id: 'p1b-money-t-enough', title: '够不够', level: '提升', kind: '综合',
        asks: ['够不够'], signals: ['够吗', '还差'],
        chain: [{ point: 'p1b-money-change', role: '统一后比较' }],
        locate: '统一单位比较大小。',
        stem: '买 8 元 5 角的笔袋，有 8 元。差多少？',
        solution: [
          { text: '化角。', math: '85 角 − 80 角 = 5 角' },
          { text: '差 5 角。', math: '' }
        ],
        trap: '直接答「不够」不写差多少。' }
    ]
  }
});

/* ========== 第 6 单元 100 以内的加法和减法（一） ========== */
save('p1b-add100', {
  meta: {
    id: 'p1b-add100', title: '100 以内的加法和减法（一）', grade: '一年级下册', bookNo: 6, order: 26,
    unit: true, status: 'done', prereqChapters: ['p1b-100'],
    tagline: '整十数加减整十数，两位数加减一位数和整十数——口算的关键：**相同数位才能直接相加减**。',
    textbook: '人教版一年级下册第六单元',
    intro: '本单元全是口算：**整十数加减整十数**（30 + 40：3 个十加 4 个十）、**两位数加（减）一位数和整十数**。核心规则只有一条：**十位和十位算、个位和个位算**（不进位不退位）。小括号出现，改变了运算顺序：先算括号里的。',
    examShare: '必考：整十数加减、两位数加减一位数/整十数（不进退位）、带小括号的计算。失分点是个位十位相混（如 34 + 3 算成 37 对、34 + 30 算成 37 错）。',
    emoji: '➕'
  },
  points: [
    pt({
      id: 'p1b-add100-ten', title: '整十数加减整十数',
      summary: '30 + 40 就是 3 个十加 4 个十等于 7 个十是 70——按「十」为单位想。',
      keyPoints: [
        '整十数 = **几个十**',
        '30 + 40：**3 个十 + 4 个十 = 7 个十 = 70**',
        '70 − 30：7 个十减 3 个十',
        '十位数相加减，末尾添 0'
      ],
      viz: ['p1b-add100', '模式 0：按十为单位', { mode: 0 }],
      apply: '两捆各 30 根、40 根小棒合起来：3 捆 + 4 捆 = 7 捆 = 70 根。',
      blocks: [
        P('整十数的加减，把「十」当做一个新单位：**3 捆 + 4 捆 = 7 捆**。'),
        V('p1b-add100', '模式 0：捆着算', { mode: 0 }),
        P('口算技巧：遮住末尾的 0，按一位数算，再添回 0。'),
        L(['几个十相加减', '遮 0 算完添 0', '十为单位', '数位意识'])
      ]
    }),
    pt({
      id: 'p1b-add100-digit', title: '两位数加（减）一位数',
      summary: '34 + 3：个位对个位，4 + 3 = 7，得 37——十位不动。',
      keyPoints: [
        '**个位加个位**，十位不变（不进位）',
        '34 + 3 = 37',
        '两位数减一位数同理：38 − 5 = 33',
        '数位**对齐**是铁律'
      ],
      prereq: ['p1b-add100-ten'],
      viz: ['p1b-add100', '模式 1：个位对个位', { mode: 1 }],
      apply: '34 人班又转来 3 人：个位 4 + 3，共 37 人。',
      blocks: [
        P('一位数只占个位——**只和个位算**，十位照抄。'),
        V('p1b-add100', '模式 1：只有个位动', { mode: 1 }),
        P('易错对照：34 + 3 = 37（个位加），34 + 30 = 64（十位加）——**看清加的是几**。'),
        L(['个位对个位', '十位不变', '不进位不退位', '分清一位与整十'])
      ]
    }),
    pt({
      id: 'p1b-add100-ten2', title: '两位数加减整十数',
      summary: '34 + 30：十位对十位，3 + 3 = 6 个十，得 64——个位不变。',
      keyPoints: [
        '整十数加在**十位**上',
        '34 + 30 = 64',
        '64 − 30 = 34',
        '与加一位数**对比记忆**'
      ],
      prereq: ['p1b-add100-ten'],
      viz: ['p1b-add100', '模式 2：十位对十位', { mode: 2 }],
      apply: '原来 34 本书，又买来 30 本：十位 3 + 3，共 64 本。',
      blocks: [
        P('整十数是「几个十」，**加在十位**：34 + 30，3 个十 + 3 个十 = 6 个十。'),
        V('p1b-add100', '模式 2：十位动、个位不动', { mode: 2 }),
        P('记住对照组：**加一位动个位，加整十动十位**——数位意识是灵魂。'),
        L(['十位相加减', '个位照抄', '一位 vs 整十', '数位对齐'])
      ]
    }),
    pt({
      id: 'p1b-add100-paren', title: '带小括号的运算',
      summary: '小括号像一堵墙：**先算括号里的**。13 − (4 + 3)：先 4 + 3 = 7，再 13 − 7 = 6。',
      keyPoints: [
        '有括号，**先算括号里面**',
        '括号改变运算顺序',
        '13 − (4 + 3) ≠ 13 − 4 + 3 的顺序',
        '括号里的结果要**先用**'
      ],
      prereq: ['p1b-add100-digit'],
      viz: ['p1b-add100', '模式 3：括号先算', { mode: 3 }],
      apply: '10 元买东西：先买 3 元的笔再买 4 元的本，花的总钱数 = 3 + 4，剩 10 − (3 + 4)。',
      blocks: [
        P('小括号是「**优先通行证**」：有它先算它。'),
        V('p1b-add100', '模式 3：墙里先算', { mode: 3 }),
        P('对比：13 − 4 + 3 从左到右；13 − (4 + 3) 先括号——**顺序不同结果不同**。'),
        L(['括号优先', '改变顺序', '先算括号内', '对比两种顺序'])
      ]
    })
  ],
  examples: [
    { id: 'p1b-add100-e1', point: 'p1b-add100-ten', title: '整十数加',
      question: '计算：40 + 30。',
      steps: [
        { text: '4 个十 + 3 个十。', math: '= 7 个十 = 70' }
      ],
      answer: '70' },
    { id: 'p1b-add100-e2', point: 'p1b-add100-ten', title: '整十数减',
      question: '计算：80 − 50。',
      steps: [
        { text: '8 个十 − 5 个十。', math: '= 30' }
      ],
      answer: '30' },
    { id: 'p1b-add100-e3', point: 'p1b-add100-digit', title: '加一位数',
      question: '计算：52 + 6。',
      steps: [
        { text: '个位 2 + 6 = 8。', math: '52 + 6 = 58' }
      ],
      answer: '58' },
    { id: 'p1b-add100-e4', point: 'p1b-add100-ten2', title: '加整十数',
      question: '计算：52 + 30。',
      steps: [
        { text: '十位 5 + 3 = 8。', math: '52 + 30 = 82' }
      ],
      answer: '82' },
    { id: 'p1b-add100-e5', point: 'p1b-add100-digit', title: '减一位数',
      question: '计算：47 − 4。',
      steps: [
        { text: '个位 7 − 4 = 3。', math: '47 − 4 = 43' }
      ],
      answer: '43' },
    { id: 'p1b-add100-e6', point: 'p1b-add100-paren', title: '带括号',
      question: '计算：15 − (2 + 5)。',
      steps: [
        { text: '先算括号。', math: '2 + 5 = 7' },
        { text: '再减。', math: '15 − 7 = 8' }
      ],
      answer: '8' }
  ],
  patterns: {
    asks: [
      { k: '整十加减', desc: '整十数加减整十数' },
      { k: '加一位', desc: '两位数加一位数' },
      { k: '加整十', desc: '两位数加减整十数' },
      { k: '括号', desc: '带小括号计算' },
      { k: '应用', desc: '加减法解决问题' }
    ],
    features: [
      '相同数位才能直接加减',
      '加一位动个位、加整十动十位',
      '有括号先算括号',
      '遮 0 法算整十数'
    ],
    patterns: [
      { no: '基础 1', id: 'p1b-add100-t-ten', title: '整十数加减', level: '基础', kind: '计算',
        asks: ['整十加减'], signals: ['整十'],
        chain: [{ point: 'p1b-add100-ten', role: '按十算' }],
        locate: '十位相加减，末尾添 0。',
        stem: '计算：60 + 20。',
        solution: [
          { text: '6 个十 + 2 个十。', math: '= 80' }
        ],
        trap: '算成 620。' },
      { no: '基础 2', id: 'p1b-add100-t-digit', title: '加一位数', level: '基础', kind: '计算',
        asks: ['加一位'], signals: ['+ 一位数'],
        chain: [{ point: 'p1b-add100-digit', role: '个位相加' }],
        locate: '个位对个位。',
        stem: '计算：43 + 5。',
        solution: [
          { text: '3 + 5 = 8。', math: '43 + 5 = 48' }
        ],
        trap: '5 加到十位上。' },
      { no: '中档 1', id: 'p1b-add100-t-ten2', title: '加减整十数', level: '中档', kind: '计算',
        asks: ['加整十'], signals: ['+ 整十数'],
        chain: [{ point: 'p1b-add100-ten2', role: '十位相加减' }],
        locate: '整十动十位。',
        stem: '计算：56 − 20。',
        solution: [
          { text: '5 − 2 = 3 个十。', math: '56 − 20 = 36' }
        ],
        trap: '个位也减 2。' },
      { no: '中档 2', id: 'p1b-add100-t-paren', title: '带括号计算', level: '中档', kind: '计算',
        asks: ['括号'], signals: ['小括号'],
        chain: [{ point: 'p1b-add100-paren', role: '先括号' }],
        locate: '括号内先算。',
        stem: '计算：18 − (3 + 4)。',
        solution: [
          { text: '括号里 7。', math: '' },
          { text: '18 − 7 = 11。', math: '' }
        ],
        trap: '从左到右算成 19。' },
      { no: '提升 1', id: 'p1b-add100-t-app', title: '解决问题', level: '提升', kind: '应用',
        asks: ['应用'], signals: ['一共', '还剩'],
        chain: [{ point: 'p1b-add100-digit', role: '口算应用' }],
        locate: '选加或减，口算作答。',
        stem: '果园里有 45 棵苹果树，摘走 20 棵的果实后还剩多少棵树？（树的棵数不变，改问：又种了 20 棵，现在多少棵？）',
        solution: [
          { text: '又种是加。', math: '45 + 20 = 65（棵）' }
        ],
        trap: '审题不清用减法。' }
    ]
  }
});

/* ========== 第 7 单元 找规律 ========== */
save('p1b-pattern', {
  meta: {
    id: 'p1b-pattern', title: '找规律', grade: '一年级下册', bookNo: 7, order: 27,
    unit: true, status: 'done', prereqChapters: ['p1b-100'],
    tagline: '规律就是「重复出现的节奏」：圈出一组、看它怎么重复，下一个就能推出来。',
    textbook: '人教版一年级下册第七单元',
    intro: '本单元练「发现重复」：图形按颜色循环（红黄红黄…）、数字按规律增加（+2、+5…）、数组循环出现。方法三步：**圈出一组重复的 → 说清规律 → 接着画/填**。规律思维是代数与函数的萌芽。',
    examShare: '必考：找图形排列规律、找数列规律并填下一个、按规律接着画。失分点是没找准「一组」就开始填。',
    emoji: '🔁'
  },
  points: [
    pt({
      id: 'p1b-pattern-shape', title: '图形的排列规律',
      summary: '把重复的一段圈出来：红黄红黄红黄……一组是「红黄」，接着画红黄。',
      keyPoints: [
        '**圈出一组**重复的部分',
        '说清规律：「按红黄一组依次重复」',
        '接着画或判断第几个是什么',
        '一组里可以**不止两种**图形'
      ],
      viz: ['p1b-pattern', '模式 0：圈出重复的一组', { mode: 0 }],
      apply: '彩旗、地砖、围栏的花纹都是循环排列。',
      blocks: [
        P('找规律第一步：**找「一组」**——不断重复的最小单位。'),
        V('p1b-pattern', '模式 0：一组一组圈出来', { mode: 0 }),
        P('圈对了组，后面的判断就像数数一样简单。'),
        L(['找重复单位', '圈一组', '说清规律', '接着排'])
      ]
    }),
    pt({
      id: 'p1b-pattern-num', title: '数的排列规律',
      summary: '数列规律看「相邻两数的差」：2、4、6、8……每次加 2，下一个是 10。',
      keyPoints: [
        '**算差**：后一个 − 前一个',
        '差一样 → 等差规律（+2、+5…）',
        '也可能是**递减**（−3…）',
        '差算准才能填对'
      ],
      prereq: ['p1b-pattern-shape'],
      viz: ['p1b-pattern', '模式 1：差出来的规律', { mode: 1 }],
      apply: '楼房的门牌号 2、4、6…都是双号，每次加 2。',
      blocks: [
        P('数列规律万能起手：**相邻两数相减**，看差是不是一样。'),
        V('p1b-pattern', '模式 1：算差找规律', { mode: 1 }),
        P('差一样就是「每次加（减）几」；差不一样，再看是不是按组循环。'),
        L(['先算差', '差相同 = 等差', '递增递减', '填下一个'])
      ]
    }),
    pt({
      id: 'p1b-pattern-array', title: '数组与组合规律',
      summary: '几个数字一组循环出现：1、2、3、1、2、3……要按「组」判断下一个。',
      keyPoints: [
        '规律单位可能是**一组数**',
        '圈组：1、2、3 为一组',
        '判断第 n 个：**数一数落在组里第几位**',
        '图形数字混合也常见'
      ],
      prereq: ['p1b-pattern-num'],
      viz: ['p1b-pattern', '模式 2：一组数循环', { mode: 2 }],
      apply: '一周 7 天循环：周一到周日，第 9 天是周二。',
      blocks: [
        P('组合规律的「一组」里有多个成员：**整组重复**。'),
        V('p1b-pattern', '模式 2：整组循环', { mode: 2 }),
        P('要问「第 10 个是什么」，就**按组数周期**。'),
        L(['整组重复', '圈出数组', '按组判断', '周期思想'])
      ]
    }),
    pt({
      id: 'p1b-pattern-make', title: '自己创造规律',
      summary: '按规律涂色、画图、写数：自己定一个重复的单位，别人能接着你的往下排。',
      keyPoints: [
        '自创规律：**先定一组**',
        '重复排列 ≥ 3 组才算规律',
        '规律要**让别人看得懂**',
        '开放题答案不唯一'
      ],
      prereq: ['p1b-pattern-array'],
      viz: ['p1b-pattern', '模式 3：设计自己的规律', { mode: 3 }],
      apply: '设计班徽花边：三角形、圆、圆、三角形、圆、圆……',
      blocks: [
        P('创造规律：定好一组（如 △○○），**至少重复三次**，规律才明显。'),
        V('p1b-pattern', '模式 3：我做主设计', { mode: 3 }),
        P('检验自己的规律：让别人接着画，能接上就说明规律清楚。'),
        L(['定一组', '重复三次以上', '可被接着排', '答案开放'])
      ]
    })
  ],
  examples: [
    { id: 'p1b-pattern-e1', point: 'p1b-pattern-shape', title: '接着画',
      question: '●▲●▲●▲……接下来画什么？',
      steps: [
        { text: '一组是「●▲」。', math: '' },
        { text: '下一个是 ●。', math: '' }
      ],
      answer: '●' },
    { id: 'p1b-pattern-e2', point: 'p1b-pattern-num', title: '数列规律',
      question: '找规律填数：3、6、9、12、____。',
      steps: [
        { text: '相邻差都是 3。', math: '' },
        { text: '12 + 3 = 15。', math: '' }
      ],
      answer: '15' },
    { id: 'p1b-pattern-e3', point: 'p1b-pattern-num', title: '递减规律',
      question: '找规律填数：20、17、14、____。',
      steps: [
        { text: '每次减 3。', math: '' },
        { text: '14 − 3 = 11。', math: '' }
      ],
      answer: '11' },
    { id: 'p1b-pattern-e4', point: 'p1b-pattern-array', title: '数组规律',
      question: '1、1、2、1、1、2、1、1、2……第 8 个数是几？',
      steps: [
        { text: '一组是「1、1、2」。', math: '' },
        { text: '第 8 个在第三组的第 2 位。', math: '1' }
      ],
      answer: '1' },
    { id: 'p1b-pattern-e5', point: 'p1b-pattern-shape', title: '判断第几个',
      question: '红黄蓝红黄蓝……第 7 个是什么颜色？',
      steps: [
        { text: '一组 3 个。', math: '7 = 3 + 3 + 1' },
        { text: '第 7 个是一组里的第 1 个。', math: '红' }
      ],
      answer: '红色' },
    { id: 'p1b-pattern-e6', point: 'p1b-pattern-make', title: '设计规律',
      question: '用 △ 和 ○ 设计一个规律，至少重复 3 组。',
      steps: [
        { text: '定一组。', math: '△○○' },
        { text: '重复。', math: '△○○ △○○ △○○' }
      ],
      answer: '答案不唯一' }
  ],
  patterns: {
    asks: [
      { k: '图形规律', desc: '图形排列找规律' },
      { k: '数列规律', desc: '数字增减规律' },
      { k: '数组循环', desc: '一组数的循环' },
      { k: '判断第几个', desc: '周期位置判断' },
      { k: '自创规律', desc: '设计排列规律' }
    ],
    features: [
      '先圈出重复的一组',
      '数列先算差',
      '判断第几个按组数',
      '自创规律要重复三次'
    ],
    patterns: [
      { no: '基础 1', id: 'p1b-pattern-t-shape', title: '图形规律', level: '基础', kind: '应用',
        asks: ['图形规律'], signals: ['接着画'],
        chain: [{ point: 'p1b-pattern-shape', role: '圈一组' }],
        locate: '找最小重复单位。',
        stem: '○△△○△△……接着画一个什么？',
        solution: [
          { text: '一组是「○△△」。', math: '' },
          { text: '接下来是 ○。', math: '' }
        ],
        trap: '一组圈错。' },
      { no: '基础 2', id: 'p1b-pattern-t-num', title: '数列规律', level: '基础', kind: '计算',
        asks: ['数列规律'], signals: ['找规律填数'],
        chain: [{ point: 'p1b-pattern-num', role: '算差' }],
        locate: '后一个减前一个。',
        stem: '找规律填数：5、10、15、____。',
        solution: [
          { text: '每次加 5。', math: '15 + 5 = 20' }
        ],
        trap: '差算错。' },
      { no: '中档 1', id: 'p1b-pattern-t-dec', title: '递减规律', level: '中档', kind: '计算',
        asks: ['数列规律'], signals: ['递减'],
        chain: [{ point: 'p1b-pattern-num', role: '减法规律' }],
        locate: '差为负数，依次减。',
        stem: '找规律填数：25、22、19、____。',
        solution: [
          { text: '每次减 3。', math: '19 − 3 = 16' }
        ],
        trap: '当成加法规律。' },
      { no: '中档 2', id: 'p1b-pattern-t-cyc', title: '判断第几个', level: '中档', kind: '应用',
        asks: ['判断第几个'], signals: ['第几个是什么'],
        chain: [{ point: 'p1b-pattern-array', role: '按组定位' }],
        locate: '除以组内个数看余数。',
        stem: '按「●●○」循环排列，第 11 个是什么？',
        solution: [
          { text: '11 = 3×3 + 2。', math: '' },
          { text: '第 2 个是 ●。', math: '●' }
        ],
        trap: '数错周期。' },
      { no: '提升 1', id: 'p1b-pattern-t-make', title: '自创规律', level: '提升', kind: '综合',
        asks: ['自创规律'], signals: ['设计', '涂色'],
        chain: [{ point: 'p1b-pattern-make', role: '定组重复' }],
        locate: '定一组，重复三次以上。',
        stem: '用三种颜色设计一条有规律的花边。',
        solution: [
          { text: '如红黄蓝、红黄蓝、红黄蓝。', math: '' }
        ],
        trap: '颜色随机没有重复单位。' }
    ]
  }
});
