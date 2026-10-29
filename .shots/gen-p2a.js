/* 人教版二年级上册 · 8 单元 */
const { P, V, L, pt, save } = require('./gen-lib');

/* ========== 第 1 单元 长度单位 ========== */
save('p2a-len', {
  meta: {
    id: 'p2a-len', title: '长度单位', grade: '二年级上册', bookNo: 1, order: 31,
    unit: true, status: 'done', prereqChapters: ['p1b-100'],
    tagline: '厘米量短、米量长：1 厘米是指甲盖的宽，1 米是二年级同学张开手臂的一半——量什么，选什么单位。',
    textbook: '人教版二年级上册第一单元',
    intro: '统一单位才能公平比较——这就是「尺子」的来历。本单元认识**厘米（cm）和米（m）**：1 米 = 100 厘米；会用尺子量线段（**从 0 刻度量起**，端点对齐）；认识线段（两个端点、直直的）；会估测和选择合适的单位（床长约 2 米，橡皮长约 3 厘米）。',
    examShare: '必考：填合适的单位、量线段长度、画指定长度的线段、米与厘米换算。失分点是单位选错（身高 130 厘米说成 130 米）和没从 0 刻度量起。',
    emoji: '📏'
  },
  points: [
    pt({
      id: 'p2a-len-cm', title: '厘米的认识',
      summary: '厘米是量较短物体的单位：1 厘米大约是一个指甲盖的宽度，写作 1 cm。',
      keyPoints: [
        '**厘米（cm）**量较短的物体',
        '1 厘米 ≈ 指甲盖宽',
        '尺子上**每两个相邻数字**之间是 1 厘米',
        '量物体：**一端对准 0 刻度**'
      ],
      viz: ['p2a-len', '模式 0：尺子上看 1 厘米', { mode: 0 }],
      apply: '量铅笔、橡皮、课本的边长都用厘米。',
      blocks: [
        P('每人 1 厘米都一样长——**统一的单位**才能比出一致的答案。'),
        V('p2a-len', '模式 0：认识刻度', { mode: 0 }),
        P('量的时候：**左端对 0**，看右端到几就是几厘米；若没对 0，用**末端刻度 − 起点刻度**。'),
        L(['统一单位', '0 刻度对齐', '相邻数差 1 厘米', '不对 0 就相减'])
      ]
    }),
    pt({
      id: 'p2a-len-m', title: '米的认识',
      summary: '米是量较长物体的单位：1 米 = 100 厘米，约等于二年级同学张开双臂的长度。',
      keyPoints: [
        '**米（m）**量较长的物体',
        '**1 米 = 100 厘米**',
        '量长度用**米尺或卷尺**',
        '选择单位：教室长约 8 米，课桌高约 70 厘米'
      ],
      prereq: ['p2a-len-cm'],
      viz: ['p2a-len', '模式 1：一米有多长', { mode: 1 }],
      apply: '量身高用米和厘米（1 米 25 厘米），量操场用米。',
      blocks: [
        P('量教室的长度用厘米就太麻烦了——需要**大一点的单位：米**。'),
        V('p2a-len', '模式 1：米和厘米的关系', { mode: 1 }),
        P('填单位的小窍门：**想象实物**。床长约 2（米），铅笔长约 18（厘米）。'),
        L(['1 米 = 100 厘米', '米量长、厘米量短', '想象实物选单位', '身高 1 米多'])
      ]
    }),
    pt({
      id: 'p2a-len-seg', title: '线段的认识',
      summary: '线段是直的、有两个端点、可以量出长度；画线段从 0 刻度画到指定刻度。',
      keyPoints: [
        '线段是**直的**，有**两个端点**',
        '线段**可测量**长度',
        '画线段：先点一个端点，从 0 刻度画到指定长度，再点另一个端点',
        '两点之间**只能画一条**线段'
      ],
      prereq: ['p2a-len-cm'],
      viz: ['p2a-len', '模式 2：线段长什么样', { mode: 2 }],
      apply: '课本的边、桌子的边都是线段的样子。',
      blocks: [
        P('线段三特征：**直、两个端点、能量长度**。'),
        V('p2a-len', '模式 2：找端点、量长度', { mode: 2 }),
        P('画 3 厘米的线段：**从 0 画到 3**，两端点个小短竖。'),
        L(['直、两端点', '可量长度', '从 0 画到几', '两端做记号'])
      ]
    }),
    pt({
      id: 'p2a-len-est', title: '估测与合理单位',
      summary: '先用「身体尺」估一估（拃、步、庹），再量一量验证；填单位时想象实物大小。',
      keyPoints: [
        '身体尺：**一拃、一步、一庹**',
        '先估后量，**培养数感**',
        '填单位**想象实物**：门高约 2 米',
        '估测要**合理**：不能差太远'
      ],
      prereq: ['p2a-len-m', 'p2a-len-seg'],
      viz: ['p2a-len', '模式 3：估一估量一量', { mode: 3 }],
      apply: '买窗帘先估窗户的宽，再量准尺寸。',
      blocks: [
        P('估测靠**参照物**：知道一拃约 15 厘米，课桌长约 5 拃，就是约 75 厘米。'),
        V('p2a-len', '模式 3：身体尺帮忙', { mode: 3 }),
        P('填单位题用「**合理性检查**」：身高 1 米 30 厘米合理，130 米就成了 30 层楼。'),
        L(['身体尺参照', '先估后量', '合理检查', '选对单位'])
      ]
    })
  ],
  examples: [
    { id: 'p2a-len-e1', point: 'p2a-len-cm', title: '量长度',
      question: '铅笔一端对 0 刻度，另一端到 12 厘米处，铅笔多长？',
      steps: [
        { text: '从 0 到 12。', math: '12 厘米' }
      ],
      answer: '12 厘米' },
    { id: 'p2a-len-e2', point: 'p2a-len-cm', title: '不对 0 刻度',
      question: '线段从刻度 3 量到刻度 9，线段长多少？',
      steps: [
        { text: '末端减起点。', math: '9 − 3 = 6（厘米）' }
      ],
      answer: '6 厘米' },
    { id: 'p2a-len-e3', point: 'p2a-len-m', title: '米厘米换算',
      question: '1 米 − 40 厘米 = 多少厘米？',
      steps: [
        { text: '1 米 = 100 厘米。', math: '100 − 40 = 60（厘米）' }
      ],
      answer: '60 厘米' },
    { id: 'p2a-len-e4', point: 'p2a-len-seg', title: '画线段',
      question: '画一条 5 厘米长的线段。',
      steps: [
        { text: '点一个端点，从 0 刻度画到 5。', math: '' },
        { text: '点另一个端点。', math: '' }
      ],
      answer: '5 厘米线段' },
    { id: 'p2a-len-e5', point: 'p2a-len-est', title: '填单位',
      question: '在括号里填米或厘米：课桌高约 70（　）；楼房高约 20（　）。',
      steps: [
        { text: '想象实物。', math: '' },
        { text: '课桌 70 厘米，楼房 20 米。', math: '' }
      ],
      answer: '厘米；米' },
    { id: 'p2a-len-e6', point: 'p2a-len-est', title: '估测',
      question: '你的「一拃」约 14 厘米，课桌长约 5 拃。课桌长约多少厘米？',
      steps: [
        { text: '5 个 14 相加。', math: '14 × 5 = 70（厘米）（或 14+14+14+14+14）' }
      ],
      answer: '约 70 厘米' }
  ],
  patterns: {
    asks: [
      { k: '量长度', desc: '正确使用尺子' },
      { k: '选单位', desc: '填合适的长度单位' },
      { k: '换算', desc: '米与厘米的换算' },
      { k: '画线段', desc: '画指定长度线段' },
      { k: '估测', desc: '估一估再验证' }
    ],
    features: [
      '0 刻度对齐再读数',
      '不对 0 就末端减起点',
      '填单位想象实物',
      '线段直且有两个端点'
    ],
    patterns: [
      { no: '基础 1', id: 'p2a-len-t-measure', title: '量长度', level: '基础', kind: '应用',
        asks: ['量长度'], signals: ['量一量', '多长'],
        chain: [{ point: 'p2a-len-cm', role: '对 0 读数' }],
        locate: '端点对 0，看另一端。',
        stem: '一支蜡笔从 0 刻度量到 8 厘米处，蜡笔多长？',
        solution: [
          { text: '从 0 到 8。', math: '8 厘米' }
        ],
        trap: '从 1 开始量也没对齐。' },
      { no: '基础 2', id: 'p2a-len-t-unit', title: '选单位', level: '基础', kind: '概念',
        asks: ['选单位'], signals: ['填', '米', '厘米'],
        chain: [{ point: 'p2a-len-m', role: '想象实物' }],
        locate: '短的厘米、长的米。',
        stem: '在括号里填上合适的单位：教室门高约 2（　）。',
        solution: [
          { text: '门比人高得多。', math: '' },
          { text: '2 米。', math: '' }
        ],
        trap: '填成 2 厘米。' },
      { no: '中档 1', id: 'p2a-len-t-conv', title: '米厘米换算', level: '中档', kind: '计算',
        asks: ['换算'], signals: ['米', '厘米'],
        chain: [{ point: 'p2a-len-m', role: '1 米 = 100 厘米' }],
        locate: '先统一成厘米。',
        stem: '3 米 = （　）厘米。',
        solution: [
          { text: '3 个 100。', math: '300 厘米' }
        ],
        trap: '算成 30 厘米。' },
      { no: '中档 2', id: 'p2a-len-t-draw', title: '画线段', level: '中档', kind: '应用',
        asks: ['画线段'], signals: ['画一条'],
        chain: [{ point: 'p2a-len-seg', role: '从 0 画到几' }],
        locate: '端点、对 0、到几。',
        stem: '画一条比 4 厘米长 2 厘米的线段。',
        solution: [
          { text: '先算长度。', math: '4 + 2 = 6（厘米）' },
          { text: '从 0 画到 6。', math: '' }
        ],
        trap: '画成 4 厘米。' },
      { no: '提升 1', id: 'p2a-len-t-est', title: '估测与验证', level: '提升', kind: '综合',
        asks: ['估测'], signals: ['估一估', '大约'],
        chain: [{ point: 'p2a-len-est', role: '参照物估测' }],
        locate: '身体尺或已知长度推算。',
        stem: '黑板长约 4 米，一张讲台约 1 米。黑板大约有几个讲台长？',
        solution: [
          { text: '4 里有 4 个 1。', math: '4 个' }
        ],
        trap: '估得太离谱。' }
    ]
  }
});

/* ========== 第 2 单元 100 以内的加法和减法（二） ========== */
save('p2a-add2', {
  meta: {
    id: 'p2a-add2', title: '100 以内的加法和减法（二）', grade: '二年级上册', bookNo: 2, order: 32,
    unit: true, status: 'done', prereqChapters: ['p1b-add100'],
    tagline: '进位加、退位减来了：个位满十向十位进 1，个位不够向十位借 1——竖式是把数位排整齐的算账工具。',
    textbook: '人教版二年级上册第二单元',
    intro: '笔算登场：**相同数位对齐，从个位算起**。进位加（36 + 27）个位满十**向十位进 1**；退位减（52 − 38）个位不够**向十位借 1**。还有连加连减和加减混合（从左到右、能口算的口算）。竖式的价值在「进位/退位有地方标」。',
    examShare: '必考：笔算进位加、退位减、连加连减、应用题。失分点是**忘记进位 1 或借位 1**、抄错数。',
    emoji: '🧾'
  },
  points: [
    pt({
      id: 'p2a-add2-carry', title: '进位加法',
      summary: '36 + 27：个位 6 + 7 = 13，写 3 向十位进 1；十位 3 + 2 + 1 = 6，得 63。',
      keyPoints: [
        '**相同数位对齐，从个位算起**',
        '个位满十，**向十位进 1**',
        '十位相加时**别忘加进位 1**',
        '竖式检查：进位点要标'
      ],
      viz: ['p2a-add2', '模式 0：满十进一', { mode: 0 }],
      apply: '超市小票上的合计就是进位加算出来的。',
      blocks: [
        P('竖式规矩：**个位对个位、十位对十位**，从个位算起。'),
        V('p2a-add2', '模式 0：进位的 1 标在哪', { mode: 0 }),
        P('最容易漏的是**十位加进位 1**——算完十位默念一遍「加了 1 没有」。'),
        L(['数位对齐', '个位先算', '满十进一', '十位加进位'])
      ]
    }),
    pt({
      id: 'p2a-add2-borrow', title: '退位减法',
      summary: '52 − 38：个位 2 不够减 8，向十位借 1 当 10，12 − 8 = 4；十位 5 借走 1 剩 4，4 − 3 = 1，得 14。',
      keyPoints: [
        '个位不够减，**向十位借 1 当 10**',
        '借 1 后十位要**减 1**',
        '退位点要标，防止忘减',
        '验算：差 + 减数 = 被减数'
      ],
      prereq: ['p2a-add2-carry'],
      viz: ['p2a-add2', '模式 1：借一当十', { mode: 1 }],
      apply: '带 52 元买 38 元的书包，找回 14 元——找零常用退位减。',
      blocks: [
        P('退位的「借」不是白借：**借 1 当 10**，十位少 1。'),
        V('p2a-add2', '模式 1：借 1 当 10', { mode: 1 }),
        P('标退位点是好习惯：**看到点，十位先减 1**。'),
        L(['借 1 当 10', '十位减 1', '标退位点', '差加减数验算'])
      ]
    }),
    pt({
      id: 'p2a-add2-chain', title: '连加连减与加减混合',
      summary: '从左往右算，前一步的得数接着用：能口算的口算，竖式可以连着写。',
      keyPoints: [
        '**从左到右**依次算',
        '中间得数**写清楚**',
        '能口算的口算，该笔算的笔算',
        '竖式连写省地方'
      ],
      prereq: ['p2a-add2-carry', 'p2a-add2-borrow'],
      viz: ['p2a-add2', '模式 2：一步一步算', { mode: 2 }],
      apply: '三样文具价钱连加：一次竖式解决。',
      blocks: [
        P('连加连减**从左往右**，和一年级一样，只是数更大了。'),
        V('p2a-add2', '模式 2：竖式连写', { mode: 2 }),
        P('混合运算也按**从左到右**（本年级没有乘除）。'),
        L(['左到右', '中间结果清晰', '口笔结合', '竖式连写'])
      ]
    }),
    pt({
      id: 'p2a-add2-solve', title: '解决问题',
      summary: '比多少问题：求比一个数多几的数用加法，少几用减法；「一样多」是中间基准。',
      keyPoints: [
        '「比…多几」的数 = **原数 + 几**',
        '「比…少几」的数 = **原数 − 几**',
        '画图找**同样多的部分**',
        '算完**回读问题**作答'
      ],
      prereq: ['p2a-add2-carry', 'p2a-add2-borrow'],
      viz: ['p2a-add2', '模式 3：多几少几画条看', { mode: 3 }],
      apply: '哥哥 25 颗糖、比弟弟多 8 颗：弟弟 25 − 8 = 17 颗。',
      blocks: [
        P('「比多比少」画**条形图**最直观：两根条对齐，多出的部分一目了然。'),
        V('p2a-add2', '模式 3：对齐条形比多少', { mode: 3 }),
        P('警惕关键词：**「比某某多」说的是谁**——以「比」字后面的为基准。'),
        L(['基准在比字后', '多加少减', '画条形图', '答语完整'])
      ]
    })
  ],
  examples: [
    { id: 'p2a-add2-e1', point: 'p2a-add2-carry', title: '进位加',
      question: '笔算：36 + 27。',
      steps: [
        { text: '个位 6 + 7 = 13，写 3 进 1。', math: '' },
        { text: '十位 3 + 2 + 1 = 6。', math: '36 + 27 = 63' }
      ],
      answer: '63' },
    { id: 'p2a-add2-e2', point: 'p2a-add2-borrow', title: '退位减',
      question: '笔算：52 − 38。',
      steps: [
        { text: '个位 2 不够减，借 1 当 10。', math: '12 − 8 = 4' },
        { text: '十位 4 − 3 = 1。', math: '52 − 38 = 14' }
      ],
      answer: '14' },
    { id: 'p2a-add2-e3', point: 'p2a-add2-borrow', title: '连续退位',
      question: '笔算：100 − 46。',
      steps: [
        { text: '个位 0 不够，向十位借；十位也是 0，向百位借。', math: '' },
        { text: '100 − 46 = 54。', math: '' }
      ],
      answer: '54' },
    { id: 'p2a-add2-e4', point: 'p2a-add2-chain', title: '连加',
      question: '计算：28 + 17 + 25。',
      steps: [
        { text: '先算 28 + 17 = 45。', math: '' },
        { text: '再算 45 + 25 = 70。', math: '' }
      ],
      answer: '70' },
    { id: 'p2a-add2-e5', point: 'p2a-add2-chain', title: '加减混合',
      question: '计算：72 − 35 + 18。',
      steps: [
        { text: '72 − 35 = 37。', math: '' },
        { text: '37 + 18 = 55。', math: '' }
      ],
      answer: '55' },
    { id: 'p2a-add2-e6', point: 'p2a-add2-solve', title: '比多少',
      question: '农场有 46 只鸡，鸭比鸡多 18 只。鸭有多少只？',
      steps: [
        { text: '比鸡多，用加法。', math: '46 + 18 = 64（只）' }
      ],
      answer: '64 只' }
  ],
  patterns: {
    asks: [
      { k: '进位加', desc: '笔算进位加法' },
      { k: '退位减', desc: '笔算退位减法' },
      { k: '连算', desc: '连加连减混合' },
      { k: '比多比少', desc: '求比一个数多/少几' },
      { k: '验算', desc: '用逆运算检查' }
    ],
    features: [
      '数位对齐、个位算起',
      '满十进一、不够借一',
      '进位 1 借位 1 别漏',
      '比字后面是基准'
    ],
    patterns: [
      { no: '基础 1', id: 'p2a-add2-t-carry', title: '进位加', level: '基础', kind: '计算',
        asks: ['进位加'], signals: ['笔算', '+'],
        chain: [{ point: 'p2a-add2-carry', role: '满十进一' }],
        locate: '个位满十进 1，十位多加 1。',
        stem: '笔算：47 + 35。',
        solution: [
          { text: '7 + 5 = 12，写 2 进 1。', math: '' },
          { text: '4 + 3 + 1 = 8。', math: '47 + 35 = 82' }
        ],
        trap: '十位忘加 1。' },
      { no: '基础 2', id: 'p2a-add2-t-borrow', title: '退位减', level: '基础', kind: '计算',
        asks: ['退位减'], signals: ['笔算', '−'],
        chain: [{ point: 'p2a-add2-borrow', role: '借 1 当 10' }],
        locate: '借位后十位减 1。',
        stem: '笔算：63 − 27。',
        solution: [
          { text: '借 1：13 − 7 = 6。', math: '' },
          { text: '5 − 2 = 3。', math: '63 − 27 = 36' }
        ],
        trap: '十位没减借走的 1。' },
      { no: '中档 1', id: 'p2a-add2-t-chain', title: '连加连减', level: '中档', kind: '计算',
        asks: ['连算'], signals: ['连加', '连减'],
        chain: [{ point: 'p2a-add2-chain', role: '从左到右' }],
        locate: '一步一步算，中间结果写清。',
        stem: '计算：35 + 18 + 27。',
        solution: [
          { text: '35 + 18 = 53。', math: '' },
          { text: '53 + 27 = 80。', math: '' }
        ],
        trap: '抄错中间数。' },
      { no: '中档 2', id: 'p2a-add2-t-diff', title: '比多比少', level: '中档', kind: '应用',
        asks: ['比多比少'], signals: ['比…多', '比…少'],
        chain: [{ point: 'p2a-add2-solve', role: '基准在比字后' }],
        locate: '求多的用加，求少的用减。',
        stem: '图书角有 35 本故事书，科技书比故事书少 12 本。科技书多少本？',
        solution: [
          { text: '少一些，用减法。', math: '35 − 12 = 23（本）' }
        ],
        trap: '见「少」就加。' },
      { no: '提升 1', id: 'p2a-add2-t-check', title: '验算', level: '提升', kind: '综合',
        asks: ['验算'], signals: ['验算', '检查'],
        chain: [{ point: 'p2a-add2-borrow', role: '逆运算验算' }],
        locate: '差 + 减数 = 被减数；和 − 加数 = 另一加数。',
        stem: '计算 71 − 43 = 28 对吗？请验算。',
        solution: [
          { text: '28 + 43 = 71。', math: '' },
          { text: '正确。', math: '' }
        ],
        trap: '验算又算错一次。' }
    ]
  }
});

/* ========== 第 3 单元 角的初步认识 ========== */
save('p2a-angle', {
  meta: {
    id: 'p2a-angle', title: '角的初步认识', grade: '二年级上册', bookNo: 3, order: 33,
    unit: true, status: 'done', prereqChapters: ['p2a-len'],
    tagline: '角有一个顶点两条边；三角尺上最大的那个角是直角——比角大小时，角的大小与边的长短无关。',
    textbook: '人教版二年级上册第三单元',
    intro: '第一次认识「角」：**一个顶点、两条边**。直角是标杆（三角尺上的直角），比直角小是锐角、比直角大是钝角。重要的观念：**角的大小看张口，不看边的长短**——把角的边画长一点，角没有变大。',
    examShare: '必考：辨认角与数角、判断直角锐角钝角、画角。失分点是认为边长角就大。',
    emoji: '📐'
  },
  points: [
    pt({
      id: 'p2a-angle-part', title: '角的组成',
      summary: '角有一个顶点和两条边（都是直直的线），角的两边张口越大，角越大。',
      keyPoints: [
        '**一个顶点 + 两条边**',
        '边是**直的**（射线）',
        '角的大小看**张口**',
        '边的**长短不影响**角的大小'
      ],
      viz: ['p2a-angle', '模式 0：顶点与两条边', { mode: 0 }],
      apply: '钟面上时针分针组成角、剪刀张开是角、屋顶斜面相交是角。',
      blocks: [
        P('指角要指出**顶点和两条边**，不是只点尖尖。'),
        V('p2a-angle', '模式 0：张口变大变小', { mode: 0 }),
        P('重要观念：**边画长画短，角都不变**——角的大小只由张口决定。'),
        L(['顶点 + 两边', '边是直的', '张口定大小', '边长无关'])
      ]
    }),
    pt({
      id: 'p2a-angle-right', title: '直角、锐角、钝角',
      summary: '三角尺上最大的角是直角：比直角小是锐角，比直角大是钝角。',
      keyPoints: [
        '**直角**：三角尺上最大的角，标直角符号',
        '**锐角**：比直角小',
        '**钝角**：比直角大',
        '判断用**三角尺的直角去比**'
      ],
      prereq: ['p2a-angle-part'],
      viz: ['p2a-angle', '模式 1：三类角比一比', { mode: 1 }],
      apply: '课本的角是直角、红领巾的角有锐角有钝角、打开的扇子形成钝角。',
      blocks: [
        P('标杆是直角：**拿三角尺的直角**与要判的角比。'),
        V('p2a-angle', '模式 1：拿直角当尺子', { mode: 1 }),
        P('口诀：**比直角小是锐，比直角大是钝**。'),
        L(['直角为标杆', '锐角更小', '钝角更大', '用尺比'])
      ]
    }),
    pt({
      id: 'p2a-angle-count', title: '数角与找角',
      summary: '数图形中的角：每个顶点处都要找，两个边夹一个角；图形边数越多角越多。',
      keyPoints: [
        '角藏在**顶点**处',
        '数角按**顶点顺序**数',
        '三角形有 **3** 个角，长方形有 **4** 个角',
        '组合图形里的角**别漏别重**'
      ],
      prereq: ['p2a-angle-part'],
      viz: ['p2a-angle', '模式 2：图形里数角', { mode: 2 }],
      apply: '五角星里藏着一圈角，数一数有多少个。',
      blocks: [
        P('数角按顶点走：**一个顶点数一个角**（本年级只数内角）。'),
        V('p2a-angle', '模式 2：逐个顶点数', { mode: 2 }),
        P('别忘了「藏着的角」：长方形四个角都是直角，即使没画直角符号。'),
        L(['按顶点数', '三角形 3 角', '四边形 4 角', '藏着的直角'])
      ]
    }),
    pt({
      id: 'p2a-angle-draw', title: '画角',
      summary: '画角先画顶点，再从顶点画两条直直的边；画直角借助三角尺。',
      keyPoints: [
        '**先定顶点**',
        '从顶点出发画**两条直边**',
        '画直角用**三角尺描**',
        '边可以画长也可以画短'
      ],
      prereq: ['p2a-angle-right'],
      viz: ['p2a-angle', '模式 3：动手画角', { mode: 3 }],
      apply: '画一个直角：沿三角尺直角的两条边描一圈。',
      blocks: [
        P('画角三步：**顶点 → 边 1 → 边 2**。'),
        V('p2a-angle', '模式 3：三步画角', { mode: 3 }),
        P('画直角必须用三角尺**贴着描**，不能徒手画。'),
        L(['先顶点', '边要直', '直角靠尺', '边长随意'])
      ]
    })
  ],
  examples: [
    { id: 'p2a-angle-e1', point: 'p2a-angle-part', title: '角的组成',
      question: '角是由哪几部分组成的？',
      steps: [
        { text: '一个顶点和两条边。', math: '' }
      ],
      answer: '一个顶点、两条边' },
    { id: 'p2a-angle-e2', point: 'p2a-angle-part', title: '角的大小',
      question: '把一个角的边画长一些，角的大小变了吗？',
      steps: [
        { text: '角的大小看张口。', math: '' },
        { text: '不变。', math: '' }
      ],
      answer: '不变' },
    { id: 'p2a-angle-e3', point: 'p2a-angle-right', title: '判断角的类型',
      question: '比直角小的角叫什么角？',
      steps: [
        { text: '比直角小。', math: '' },
        { text: '锐角。', math: '' }
      ],
      answer: '锐角' },
    { id: 'p2a-angle-e4', point: 'p2a-angle-right', title: '找直角',
      question: '三角尺上有几个直角？',
      steps: [
        { text: '最大的是直角。', math: '' },
        { text: '只有 1 个。', math: '' }
      ],
      answer: '1 个' },
    { id: 'p2a-angle-e5', point: 'p2a-angle-count', title: '数角',
      question: '三角形和长方形各有多少个角？',
      steps: [
        { text: '按顶点数。', math: '' },
        { text: '三角形 3 个，长方形 4 个。', math: '' }
      ],
      answer: '3 个；4 个' },
    { id: 'p2a-angle-e6', point: 'p2a-angle-draw', title: '画直角',
      question: '画一个直角需要什么工具？怎样画？',
      steps: [
        { text: '用三角尺。', math: '' },
        { text: '沿直角两边描。', math: '' }
      ],
      answer: '用三角尺描直角两边' }
  ],
  patterns: {
    asks: [
      { k: '认角', desc: '角的组成与辨认' },
      { k: '角的大小', desc: '张口与边长' },
      { k: '分类', desc: '直角锐角钝角' },
      { k: '数角', desc: '数图形中的角' },
      { k: '画角', desc: '画角与画直角' }
    ],
    features: [
      '顶点 + 两条直边',
      '角大小看张口',
      '直角是分类标杆',
      '画直角必须用三角尺'
    ],
    patterns: [
      { no: '基础 1', id: 'p2a-angle-t-part', title: '认角', level: '基础', kind: '概念',
        asks: ['认角'], signals: ['是角吗'],
        chain: [{ point: 'p2a-angle-part', role: '顶点 + 两边' }],
        locate: '查顶点与两条直边。',
        stem: '一条弯弯的线和一个顶点两条弯边组成的是角吗？',
        solution: [
          { text: '边必须直。', math: '' },
          { text: '不是角。', math: '' }
        ],
        trap: '把弯边当成边。' },
      { no: '基础 2', id: 'p2a-angle-t-size', title: '角的大小', level: '基础', kind: '概念',
        asks: ['角的大小'], signals: ['变大', '边长'],
        chain: [{ point: 'p2a-angle-part', role: '张口决定' }],
        locate: '只看张口。',
        stem: '两个角，一个边长一个边短，张口一样大。谁大？',
        solution: [
          { text: '一样大。', math: '' }
        ],
        trap: '认为边长的大。' },
      { no: '中档 1', id: 'p2a-angle-t-class', title: '角的分类', level: '中档', kind: '概念',
        asks: ['分类'], signals: ['锐角', '钝角', '直角'],
        chain: [{ point: 'p2a-angle-right', role: '与直角比' }],
        locate: '拿三角尺直角去比。',
        stem: '打开剪刀形成一个比直角大的角，它是什么角？',
        solution: [
          { text: '比直角大。', math: '' },
          { text: '钝角。', math: '' }
        ],
        trap: '不比就乱猜。' },
      { no: '中档 2', id: 'p2a-angle-t-count', title: '数角', level: '中档', kind: '应用',
        asks: ['数角'], signals: ['有几个角'],
        chain: [{ point: 'p2a-angle-count', role: '按顶点数' }],
        locate: '逐个顶点找角。',
        stem: '五边形有几个角？',
        solution: [
          { text: '一个顶点一个角。', math: '5 个' }
        ],
        trap: '数漏。' },
      { no: '提升 1', id: 'p2a-angle-t-draw', title: '画角', level: '提升', kind: '应用',
        asks: ['画角'], signals: ['画一个', '画直角'],
        chain: [{ point: 'p2a-angle-draw', role: '顶点 + 两边' }],
        locate: '顶点起笔，边画直；直角用尺。',
        stem: '画一个钝角，并说说为什么它是钝角。',
        solution: [
          { text: '张口比直角大。', math: '' },
          { text: '用三角尺比过。', math: '' }
        ],
        trap: '画成锐角。' }
    ]
  }
});

/* ========== 第 4 单元 表内乘法（一） ========== */
save('p2a-mult1', {
  meta: {
    id: 'p2a-mult1', title: '表内乘法（一）', grade: '二年级上册', bookNo: 4, order: 34,
    unit: true, status: 'done', prereqChapters: ['p1a-610'],
    tagline: '加法太慢就升级：3 个 5 相加写成 3 × 5——乘号一来，相同加数的连加就变快了。',
    textbook: '人教版二年级上册第四单元',
    intro: '乘法的意义是本单元的灵魂：**求几个相同加数的和**。3 + 3 + 3 + 3 = 3 × 4。接着学 5、2、3、4 的乘法口诀——口诀不要死背，要**看着图编**：一五得五、二五一十……口诀熟了，乘法就是「查表」。',
    examShare: '必考：把加法算式改写成乘法、用口诀求积、看图列乘法算式。失分点是分不清 3 × 4 和 4 × 3 的图意（都是 12）。',
    emoji: '✖️'
  },
  points: [
    pt({
      id: 'p2a-mult1-mean', title: '乘法的初步认识',
      summary: '求几个相同加数的和用乘法：3 个 5 相加，写成 5 × 3 或 3 × 5。',
      keyPoints: [
        '乘法 = **相同加数连加的简便写法**',
        '3 个 5：5 + 5 + 5 = **5 × 3**（或 3 × 5）',
        '**乘号**两边交换，得数一样',
        '读法：5 × 3 读作「5 乘 3」'
      ],
      viz: ['p2a-mult1', '模式 0：连加变乘', { mode: 0 }],
      apply: '每盘 3 个苹果、5 盘：3 × 5 = 15 个。',
      blocks: [
        P('加法算 100 个 3 太累了——**乘法就是为这个发明的**。'),
        V('p2a-mult1', '模式 0：加法升级成乘法', { mode: 0 }),
        P('看清「几个几」：4 个 2 写成 2 × 4，**加数是几就先写几**（或交换）。'),
        L(['相同加数才能乘', '几个几', '乘号交换', '读作乘'])
      ]
    }),
    pt({
      id: 'p2a-mult1-5', title: '5 的乘法口诀',
      summary: '一五得五、二五一十、三五十五、四五二十、五五二十五——5 的口诀从加法排队里来。',
      keyPoints: [
        '口诀由**加法依次加 5**得来',
        '口诀**四字或五字**：得字小数在前',
        '一句口诀算**两道乘法**',
        '5 的倍数个位是 **5 或 0**'
      ],
      prereq: ['p2a-mult1-mean'],
      viz: ['p2a-mult1', '模式 1：5 的口诀排队', { mode: 1 }],
      apply: '钟面 12 个数字，分钟走一大格是 5 分：5、10、15……',
      blocks: [
        P('口诀不是背出来的，是**从加法里长出来的**：5、10、15、20、25。'),
        V('p2a-mult1', '模式 1：加 5 排队', { mode: 1 }),
        P('一句口诀管两道算式：**三五十五** → 3 × 5 = 15、5 × 3 = 15。'),
        L(['加法生口诀', '一图两式', '个位 5 或 0', '脱口而出'])
      ]
    }),
    pt({
      id: 'p2a-mult1-234', title: '2、3、4 的乘法口诀',
      summary: '一二得二、二二得四……口诀按「加数排队」编：几的口诀就每次加几。',
      keyPoints: [
        '2 的口诀：一二得二、二二得四',
        '3 的口诀：一三得三……三三得九',
        '4 的口诀：一四得四……四五二十（含 4×5）',
        '**几的口诀就相邻差几**'
      ],
      prereq: ['p2a-mult1-5'],
      viz: ['p2a-mult1', '模式 2：三种口诀排排坐', { mode: 2 }],
      apply: '自行车 2 个轮子：3 辆车 2 × 3 = 6 个轮子。',
      blocks: [
        P('编口诀通用法：**依次加几**。2 的口诀加 2，3 的口诀加 3。'),
        V('p2a-mult1', '模式 2：每种口诀一串', { mode: 2 }),
        P('注意口诀**顺序**：二四得八（2×4），四二也是八（4×2）。'),
        L(['依次加几', '一图两式', '相邻差几', '顺序不乱'])
      ]
    }),
    pt({
      id: 'p2a-mult1-solve', title: '用乘法解决问题',
      summary: '看到「每份同样多」就想乘法：每盘 4 个、6 盘，4 × 6 = 24 个。',
      keyPoints: [
        '找**每份的数**和**份数**',
        '每份数 × 份数 = 总数',
        '乘法算式**两种写法都对**',
        '答语带单位'
      ],
      prereq: ['p2a-mult1-234'],
      viz: ['p2a-mult1', '模式 3：每份 × 份数', { mode: 3 }],
      apply: '一排 5 张椅子、4 排：5 × 4 = 20 张。',
      blocks: [
        P('应用题关键词：**每、一份、同样多**——都是乘法的信号。'),
        V('p2a-mult1', '模式 3：几乘几', { mode: 3 }),
        P('画图排一排：**行 × 列**，点子图就是乘法的模样。'),
        L(['每份数 × 份数', '点子图', '两式皆可', '答完整'])
      ]
    })
  ],
  examples: [
    { id: 'p2a-mult1-e1', point: 'p2a-mult1-mean', title: '改写成乘法',
      question: '把 4 + 4 + 4 + 4 改写成乘法算式。',
      steps: [
        { text: '4 个 4 相加。', math: '4 × 4 = 16' }
      ],
      answer: '4 × 4 = 16' },
    { id: 'p2a-mult1-e2', point: 'p2a-mult1-mean', title: '几个几',
      question: '2 × 6 表示几个几相加？',
      steps: [
        { text: '2 个 6 或 6 个 2。', math: '' }
      ],
      answer: '2 个 6（或 6 个 2）' },
    { id: 'p2a-mult1-e3', point: 'p2a-mult1-5', title: '用口诀',
      question: '计算：5 × 3。',
      steps: [
        { text: '口诀三五十五。', math: '5 × 3 = 15' }
      ],
      answer: '15' },
    { id: 'p2a-mult1-e4', point: 'p2a-mult1-234', title: '4 的口诀',
      question: '计算：4 × 2。',
      steps: [
        { text: '口诀二四得八。', math: '4 × 2 = 8' }
      ],
      answer: '8' },
    { id: 'p2a-mult1-e5', point: 'p2a-mult1-solve', title: '解决问题',
      question: '每盒装 5 个月饼，4 盒一共装多少个？',
      steps: [
        { text: '每份数 × 份数。', math: '5 × 4 = 20（个）' }
      ],
      answer: '20 个' },
    { id: 'p2a-mult1-e6', point: 'p2a-mult1-5', title: '口诀写两式',
      question: '用「四五二十」写出两道乘法算式。',
      steps: [
        { text: '4 × 5 = 20。', math: '' },
        { text: '5 × 4 = 20。', math: '' }
      ],
      answer: '4 × 5 = 20，5 × 4 = 20' }
  ],
  patterns: {
    asks: [
      { k: '乘法意义', desc: '改写与读法' },
      { k: '口诀求积', desc: '用口诀计算' },
      { k: '一句两式', desc: '由口诀写两道算式' },
      { k: '看图列式', desc: '按图意列乘法' },
      { k: '解决问题', desc: '每份 × 份数' }
    ],
    features: [
      '相同加数才能写成乘法',
      '口诀从加法排队来',
      '一句口诀两道算式',
      '每份数 × 份数 = 总数'
    ],
    patterns: [
      { no: '基础 1', id: 'p2a-mult1-t-mean', title: '改写乘法', level: '基础', kind: '计算',
        asks: ['乘法意义'], signals: ['改写', '几个几'],
        chain: [{ point: 'p2a-mult1-mean', role: '连加变乘' }],
        locate: '数相同加数的个数。',
        stem: '把 3 + 3 + 3 + 3 + 3 改写成乘法算式。',
        solution: [
          { text: '5 个 3。', math: '3 × 5 = 15' }
        ],
        trap: '数错个数。' },
      { no: '基础 2', id: 'p2a-mult1-t-kj', title: '口诀求积', level: '基础', kind: '计算',
        asks: ['口诀求积'], signals: ['计算', '×'],
        chain: [{ point: 'p2a-mult1-5', role: '对口诀' }],
        locate: '背口诀直接查。',
        stem: '计算：5 × 5。',
        solution: [
          { text: '五五二十五。', math: '5 × 5 = 25' }
        ],
        trap: '口诀背串。' },
      { no: '中档 1', id: 'p2a-mult1-t-two', title: '一句两式', level: '中档', kind: '计算',
        asks: ['一句两式'], signals: ['写出两道'],
        chain: [{ point: 'p2a-mult1-234', role: '交换写两式' }],
        locate: '交换乘数写两道。',
        stem: '用「二三得六」写出两道乘法算式。',
        solution: [
          { text: '2 × 3 = 6。', math: '' },
          { text: '3 × 2 = 6。', math: '' }
        ],
        trap: '只写一道。' },
      { no: '中档 2', id: 'p2a-mult1-t-pic', title: '看图列式', level: '中档', kind: '应用',
        asks: ['看图列式'], signals: ['看图'],
        chain: [{ point: 'p2a-mult1-solve', role: '每份 × 份数' }],
        locate: '数每份几个、共几份。',
        stem: '每行 6 个圆点，共 3 行。一列乘法算式并计算。',
        solution: [
          { text: '6 × 3 = 18。', math: '' }
        ],
        trap: '行份数数反但结果相同。' },
      { no: '提升 1', id: 'p2a-mult1-t-app', title: '乘法应用', level: '提升', kind: '综合',
        asks: ['解决问题'], signals: ['每', '一共'],
        chain: [{ point: 'p2a-mult1-solve', role: '每份数 × 份数' }],
        locate: '找每份与份数。',
        stem: '一件衣服钉 5 颗扣子，4 件衣服要多少颗？',
        solution: [
          { text: '5 × 4 = 20（颗）' }
        ],
        trap: '用加法逐个加太慢。' }
    ]
  }
});

/* ========== 第 5 单元 观察物体（一） ========== */
save('p2a-view', {
  meta: {
    id: 'p2a-view', title: '观察物体（一）', grade: '二年级上册', bookNo: 5, order: 35,
    unit: true, status: 'done', prereqChapters: ['p1b-shape2'],
    tagline: '站在哪一面，看到哪一面：从前面、侧面、后面看同一个物体，样子不一样。',
    textbook: '人教版二年级上册第五单元',
    intro: '站在物体的不同方向看，看到的**形状可能不同**。辨认「这是谁看到的」，方法是**站到他的位置想一想**：面对的是哪一面。观察立体小积木组合时，从不同面看到的平面图形也不一样。',
    examShare: '必考：判断观察者看到的样子、从不同面观察简单立体。失分点是左右面搞反（面对物体的左侧是物体的右侧面）。',
    emoji: '👀'
  },
  points: [
    pt({
      id: 'p2a-view-side', title: '从不同方向观察物体',
      summary: '从前面、侧面、后面看同一个物体（如熊猫玩偶），看到的形状不同。',
      keyPoints: [
        '**前面**：正对的脸',
        '**侧面**：从旁边看',
        '**后面**：背对的一面',
        '判断时**站到观察者的位置**'
      ],
      viz: ['p2a-view', '模式 0：转一转看四面', { mode: 0 }],
      apply: '四人分别站在桌子四边看水壶，拍到四张不同照片。',
      blocks: [
        P('同一物体，**方向不同，看到的不同**。'),
        V('p2a-view', '模式 0：谁看到了什么', { mode: 0 }),
        P('判断题画一个小人站在观察者位置，**移情式想象**最可靠。'),
        L(['四面看物体', '前后左右不同', '站到他的位置', '多方向综合'])
      ]
    }),
    pt({
      id: 'p2a-view-cube', title: '观察立体图形',
      summary: '正方体从每个面看都是正方形；圆柱从侧面看是长方形、从上面看是圆。',
      keyPoints: [
        '**正方体**：每个面都是正方形',
        '**圆柱**：侧面看长方形，上面看圆',
        '**球**：从哪看都是圆',
        '观察时正对**一个面**'
      ],
      prereq: ['p2a-view-side'],
      viz: ['p2a-view', '模式 1：三种立体的三面', { mode: 1 }],
      apply: '水杯从上往下看是圆圈，从侧面看是长方形。',
      blocks: [
        P('把立体图形**转到眼前**：正对哪个面，就看到那个面的形状。'),
        V('p2a-view', '模式 1：立体的正面侧面上面', { mode: 1 }),
        P('圆柱最有趣：**一个物体两种脸**——侧面长方形、顶上圆形。'),
        L(['正方体面面方', '圆柱两面性', '球处处圆', '正对才准'])
      ]
    }),
    pt({
      id: 'p2a-view-combo', title: '观察积木组合',
      summary: '几个小正方体拼在一起，从不同面看到不同的平面图：有的面会「藏住」。',
      keyPoints: [
        '**前面看**：列与层数',
        '**上面看**：占地形状',
        '**侧面看**：侧面轮廓',
        '**被挡住的看不到**'
      ],
      prereq: ['p2a-view-cube'],
      viz: ['p2a-view', '模式 2：拼积木的三个视图', { mode: 2 }],
      apply: '乐高搭建后从正面、上面、左面各画一张「照片」。',
      blocks: [
        P('组合体从三面看是三个不同的平面图：**正面、上面、侧面**。'),
        V('p2a-view', '模式 2：一物三视图', { mode: 2 }),
        P('画视图时，**看不见的方块不算**，但被挡的底部方块要按位置数。'),
        L(['三面三图', '前面看层数', '上面看占地', '遮挡要想象'])
      ]
    }),
    pt({
      id: 'p2a-view-judge', title: '推理是谁看到的',
      summary: '给出四张视图，判断各是谁看到的：找特征对号入座，再逐一验证。',
      keyPoints: [
        '**找特征**：每个方向独有的样子',
        '**对号入座**：特征匹配',
        '排除法验证其余',
        '实在不行**实地转一转**'
      ],
      prereq: ['p2a-view-combo'],
      viz: ['p2a-view', '模式 3：对号入座', { mode: 3 }],
      apply: '四人围桌拍茶壶：按壶嘴朝向判断谁拍的正面。',
      blocks: [
        P('每个方向的图都有**独有特征**（如壶嘴朝左），用特征匹配观察者。'),
        V('p2a-view', '模式 3：特征配对', { mode: 3 }),
        P('检查时把**剩下的逐一排除**，确保没有冲突。'),
        L(['抓独有特征', '对号入座', '排除验证', '可实地演示'])
      ]
    })
  ],
  examples: [
    { id: 'p2a-view-e1', point: 'p2a-view-side', title: '辨认方向',
      question: '小明站在玩偶的正对面，他看到的是玩偶的哪一面？',
      steps: [
        { text: '正对即前面。', math: '' },
        { text: '前面。', math: '' }
      ],
      answer: '前面' },
    { id: 'p2a-view-e2', point: 'p2a-view-cube', title: '立体观察',
      question: '从任何方向看都是圆的立体是什么？',
      steps: [
        { text: '处处弯曲。', math: '' },
        { text: '球。', math: '' }
      ],
      answer: '球' },
    { id: 'p2a-view-e3', point: 'p2a-view-cube', title: '圆柱两面',
      question: '圆柱从上面看是什么形状？从侧面看呢？',
      steps: [
        { text: '上面看是圆。', math: '' },
        { text: '侧面看是长方形。', math: '' }
      ],
      answer: '圆；长方形' },
    { id: 'p2a-view-e4', point: 'p2a-view-combo', title: '看组合体',
      question: '2 个正方体横着拼成一排，从上面看是什么形状？',
      steps: [
        { text: '看到一排两格。', math: '' },
        { text: '横着的长方形。', math: '' }
      ],
      answer: '由 2 个正方形组成的图形' },
    { id: 'p2a-view-e5', point: 'p2a-view-judge', title: '对号入座',
      question: '四人对着熊猫四个方向拍照，哪张是后面拍的？',
      steps: [
        { text: '找没有正脸的图。', math: '' },
        { text: '背影那张。', math: '' }
      ],
      answer: '拍到背影的那张' },
    { id: 'p2a-view-e6', point: 'p2a-view-side', title: '多方向综合',
      question: '要全面了解一个物体的样子，应该怎么办？',
      steps: [
        { text: '从不同方向观察。', math: '' },
        { text: '综合各面信息。', math: '' }
      ],
      answer: '从多方向观察' }
  ],
  patterns: {
    asks: [
      { k: '方向判断', desc: '判断谁看到哪面' },
      { k: '立体观察', desc: '立体图形各面形状' },
      { k: '三视图', desc: '组合体从三面看' },
      { k: '对号', desc: '视图与观察者匹配' },
      { k: '综合', desc: '多方向认识物体' }
    ],
    features: [
      '站到观察者的位置想',
      '正方体面面都是方',
      '圆柱一个侧面一个圆',
      '遮挡的看不到'
    ],
    patterns: [
      { no: '基础 1', id: 'p2a-view-t-side', title: '方向判断', level: '基础', kind: '概念',
        asks: ['方向判断'], signals: ['谁看到的'],
        chain: [{ point: 'p2a-view-side', role: '站到他的位置' }],
        locate: '移情想象，看面对哪面。',
        stem: '小丽站在玩偶侧面（左），她看到玩偶的哪面？',
        solution: [
          { text: '她面对的是玩偶的左侧面。', math: '' }
        ],
        trap: '左右搞反。' },
      { no: '基础 2', id: 'p2a-view-t-solid', title: '立体观察', level: '基础', kind: '概念',
        asks: ['立体观察'], signals: ['从上面看', '从侧面看'],
        chain: [{ point: 'p2a-view-cube', role: '正对的面' }],
        locate: '正对哪个面看哪个面。',
        stem: '正方体从前面看是什么形状？',
        solution: [
          { text: '正方形。', math: '' }
        ],
        trap: '说成长方形。' },
      { no: '中档 1', id: 'p2a-view-t-combo', title: '组合体视图', level: '中档', kind: '应用',
        asks: ['三视图'], signals: ['从前面看', '拼成'],
        chain: [{ point: 'p2a-view-combo', role: '三面三图' }],
        locate: '分别想三个方向。',
        stem: '3 个正方体竖着叠成一柱，从侧面看是什么形状？',
        solution: [
          { text: '一列 3 格。', math: '竖长方形' }
        ],
        trap: '只看到 1 个方块。' },
      { no: '中档 2', id: 'p2a-view-t-match', title: '对号入座', level: '中档', kind: '应用',
        asks: ['对号'], signals: ['哪张是…拍的'],
        chain: [{ point: 'p2a-view-judge', role: '特征匹配' }],
        locate: '找独有特征对号。',
        stem: '四人拍茶壶，拍到壶嘴朝右的是站在哪侧的人？',
        solution: [
          { text: '按壶嘴朝向定位。', math: '' }
        ],
        trap: '不找特征乱猜。' },
      { no: '提升 1', id: 'p2a-view-t-all', title: '多方向综合', level: '提升', kind: '综合',
        asks: ['综合'], signals: ['全面了解'],
        chain: [{ point: 'p2a-view-combo', role: '多面综合' }],
        locate: '三面信息拼合想象。',
        stem: '只看一个方向能确定物体的样子吗？为什么？',
        solution: [
          { text: '不能，一个方向信息不全。', math: '' },
          { text: '要多方向观察。', math: '' }
        ],
        trap: '认为看一面就够。' }
    ]
  }
});

/* ========== 第 6 单元 表内乘法（二） ========== */
save('p2a-mult2', {
  meta: {
    id: 'p2a-mult2', title: '表内乘法（二）', grade: '二年级上册', bookNo: 6, order: 36,
    unit: true, status: 'done', prereqChapters: ['p2a-mult1'],
    tagline: '6、7、8、9 的口诀接续登场——9 的口诀最神奇：积的十位加个位都等于 9。',
    textbook: '人教版二年级上册第六单元',
    intro: '口诀表的下半场：**6、7、8、9 的乘法口诀**。方法还是「依次加几」编口诀，难度在于数变大、容易混。9 的口诀有妙规律：积的**两位数字相加都是 9**（18、27、36……），手指上还能演示。最后把整张口诀表连起来，达到「任意一句脱口而出」。',
    examShare: '必考：6~9 口诀求积、填口诀中的未知数（如 4 ×（　）= 28）、乘加乘减。失分点是 7、8 口诀混淆。',
    emoji: '🎯'
  },
  points: [
    pt({
      id: 'p2a-mult2-67', title: '6、7 的乘法口诀',
      summary: '一六得六、二六十二……七七四十九——还是依次加 6、加 7 编出来。',
      keyPoints: [
        '6 的口诀：每次**加 6**（得六到六六）',
        '7 的口诀：每次**加 7**（得七到七七）',
        '口诀从 1 到 6（7）**全齐**',
        '易混句对比记忆：六七四十二 vs 六六三十六'
      ],
      viz: ['p2a-mult2', '模式 0：6 和 7 的队伍', { mode: 0 }],
      apply: '一周 7 天：3 周是 3 × 7 = 21 天。',
      blocks: [
        P('6 的口诀从一六得六开始，**每次加 6**：6、12、18、24、30、36。'),
        V('p2a-mult2', '模式 0：加 6 加 7', { mode: 0 }),
        P('7 的口诀最长也最常用：**一七得七到七七四十九**。'),
        L(['依次加 6/7', '口诀齐全', '易混对比', '常用常背'])
      ]
    }),
    pt({
      id: 'p2a-mult2-89', title: '8、9 的乘法口诀',
      summary: '八八六十四、九九八十一——大口诀用「相邻口诀 ± 几」来推：忘了九九，就用八十九（72）加 9。',
      keyPoints: [
        '8 的口诀：每次**加 8**',
        '9 的口诀：每次**加 9**',
        '**忘口诀用邻居**：上一句 + 几',
        '9 的规律：积**数字和都是 9**（18、27…81）'
      ],
      prereq: ['p2a-mult2-67'],
      viz: ['p2a-mult2', '模式 1：9 的神奇规律', { mode: 1 }],
      apply: '8 人一组 5 组：5 × 8 = 40 人。',
      blocks: [
        P('大数口诀忘了不慌：**用相邻口诀推**——六八四十八，加 8 就是七八五十六。'),
        V('p2a-mult2', '模式 1：邻居口诀 + 8', { mode: 1 }),
        P('9 的口诀藏规律：**1+8=9、2+7=9……**积的数字和恒为 9。'),
        L(['忘则推邻', '9 数字和 9', '手指口诀', '越背越顺'])
      ]
    }),
    pt({
      id: 'p2a-mult2-table', title: '口诀表与未知数',
      summary: '整张口诀表连成一张「乘法表」；知道积填因数：4 ×（　）= 28，想口诀四七二十八。',
      keyPoints: [
        '口诀表是**乘法字典**',
        '求未知因数：**想口诀**',
        '4 ×（　）= 28 → 四七二十八',
        '一句口诀覆盖**多道算式**'
      ],
      prereq: ['p2a-mult2-89'],
      viz: ['p2a-mult2', '模式 2：口诀表查一查', { mode: 2 }],
      apply: '求 3 ×（　）= 21，想「三七二十一」，括号里填 7。',
      blocks: [
        P('把学过的口诀**排成大表**，横竖都能查。'),
        V('p2a-mult2', '模式 2：大表找口诀', { mode: 2 }),
        P('填未知数就是**反向查表**：先背口诀，再填数。'),
        L(['口诀即字典', '反向查表', '想口诀填空', '覆盖多式'])
      ]
    }),
    pt({
      id: 'p2a-mult2-mix', title: '乘加乘减与解决问题',
      summary: '乘加乘减先算乘：3 × 4 + 2 = 12 + 2 = 14；「比几个几多几少几」也用乘法搭桥。',
      keyPoints: [
        '有乘先算乘：**3 × 4 + 2**',
        '乘减同理：5 × 4 − 3',
        '「比 3 个 5 多 2」→ 3 × 5 + 2',
        '应用题看清**几个几**'
      ],
      prereq: ['p2a-mult2-table'],
      viz: ['p2a-mult2', '模式 3：先乘后加减', { mode: 3 }],
      apply: '每排 5 座、4 排再加 2 张：5 × 4 + 2 = 22 座。',
      blocks: [
        P('乘加乘减的顺序：**先乘后加减**。'),
        V('p2a-mult2', '模式 3：点子图看乘加', { mode: 3 }),
        P('应用题里「比 3 个 4 多 2 个」：先算 3 × 4，再加 2。'),
        L(['先乘后加减', '几个几搭桥', '点子图辅助', '顺序不能乱'])
      ]
    })
  ],
  examples: [
    { id: 'p2a-mult2-e1', point: 'p2a-mult2-67', title: '口诀求积',
      question: '计算：6 × 7。',
      steps: [
        { text: '口诀六七四十二。', math: '6 × 7 = 42' }
      ],
      answer: '42' },
    { id: 'p2a-mult2-e2', point: 'p2a-mult2-89', title: '8 的口诀',
      question: '计算：8 × 5。',
      steps: [
        { text: '口诀五八四十。', math: '8 × 5 = 40' }
      ],
      answer: '40' },
    { id: 'p2a-mult2-e3', point: 'p2a-mult2-89', title: '9 的规律',
      question: '计算：9 × 4，并说说积的数字和有什么特点。',
      steps: [
        { text: '口诀四九三十六。', math: '9 × 4 = 36' },
        { text: '3 + 6 = 9。', math: '' }
      ],
      answer: '36；数字和是 9' },
    { id: 'p2a-mult2-e4', point: 'p2a-mult2-table', title: '填未知数',
      question: '（　）× 6 = 30。',
      steps: [
        { text: '想五六三十。', math: '' },
        { text: '括号里填 5。', math: '' }
      ],
      answer: '5' },
    { id: 'p2a-mult2-e5', point: 'p2a-mult2-mix', title: '乘加',
      question: '计算：4 × 6 + 3。',
      steps: [
        { text: '先乘：4 × 6 = 24。', math: '' },
        { text: '再加。', math: '24 + 3 = 27' }
      ],
      answer: '27' },
    { id: 'p2a-mult2-e6', point: 'p2a-mult2-mix', title: '比几个几多几',
      question: '桃子比 3 个 8 多 4 个，桃子有多少个？',
      steps: [
        { text: '先乘。', math: '3 × 8 = 24' },
        { text: '再加。', math: '24 + 4 = 28（个）' }
      ],
      answer: '28 个' }
  ],
  patterns: {
    asks: [
      { k: '67口诀', desc: '6、7 的乘法口诀' },
      { k: '89口诀', desc: '8、9 的乘法口诀' },
      { k: '填因数', desc: '已知积求因数' },
      { k: '乘加乘减', desc: '先乘后加减' },
      { k: '解决问题', desc: '乘法应用题' }
    ],
    features: [
      '依次加几编口诀',
      '忘口诀用邻居推',
      '9 的口诀数字和为 9',
      '先乘后加减'
    ],
    patterns: [
      { no: '基础 1', id: 'p2a-mult2-t-67', title: '6、7 口诀', level: '基础', kind: '计算',
        asks: ['67口诀'], signals: ['×'],
        chain: [{ point: 'p2a-mult2-67', role: '对口诀' }],
        locate: '直接查口诀。',
        stem: '计算：7 × 4。',
        solution: [
          { text: '四七二十八。', math: '7 × 4 = 28' }
        ],
        trap: '与六七混淆。' },
      { no: '基础 2', id: 'p2a-mult2-t-89', title: '8、9 口诀', level: '基础', kind: '计算',
        asks: ['89口诀'], signals: ['×'],
        chain: [{ point: 'p2a-mult2-89', role: '对口诀' }],
        locate: '口诀直接查。',
        stem: '计算：9 × 9。',
        solution: [
          { text: '九九八十一。', math: '81' }
        ],
        trap: '背错成 72。' },
      { no: '中档 1', id: 'p2a-mult2-t-blank', title: '填因数', level: '中档', kind: '计算',
        asks: ['填因数'], signals: ['（　）×'],
        chain: [{ point: 'p2a-mult2-table', role: '反向查表' }],
        locate: '想口诀找因数。',
        stem: '8 ×（　）= 56。',
        solution: [
          { text: '想七八五十六。', math: '括号填 7' }
        ],
        trap: '口诀想错方向。' },
      { no: '中档 2', id: 'p2a-mult2-t-mix', title: '乘加乘减', level: '中档', kind: '计算',
        asks: ['乘加乘减'], signals: ['× +', '× −'],
        chain: [{ point: 'p2a-mult2-mix', role: '先乘' }],
        locate: '先算乘法。',
        stem: '计算：6 × 3 − 5。',
        solution: [
          { text: '6 × 3 = 18。', math: '' },
          { text: '18 − 5 = 13。', math: '' }
        ],
        trap: '先算 3 − 5。' },
      { no: '提升 1', id: 'p2a-mult2-t-app', title: '解决问题', level: '提升', kind: '综合',
        asks: ['解决问题'], signals: ['每', '一共', '多几'],
        chain: [{ point: 'p2a-mult2-mix', role: '乘法搭桥' }],
        locate: '先算几个几，再加减。',
        stem: '一箱装 6 瓶汽水，7 箱一共多少瓶？卖出 9 瓶后剩多少瓶？',
        solution: [
          { text: '6 × 7 = 42（瓶）' },
          { text: '42 − 9 = 33（瓶）' }
        ],
        trap: '两问只答一问。' }
    ]
  }
});

/* ========== 第 7 单元 认识时间 ========== */
save('p2a-time', {
  meta: {
    id: 'p2a-time', title: '认识时间', grade: '二年级上册', bookNo: 7, order: 37,
    unit: true, status: 'done', prereqChapters: ['p1a-clock'],
    tagline: '分针走 1 大格是 5 分、走一圈 1 小时；1 时 = 60 分——几时几分，时针看「过谁没到谁」。',
    textbook: '人教版二年级上册第七单元',
    intro: '从整时半时升级到**几时几分**：分针走一小格是 1 分、一大格是 5 分，读分针要**5 个 5 个数**。时针在 3 和 4 之间，就是 3 时多——过谁读谁。1 时 = 60 分，一刻 = 15 分。会算经过时间（从 3:00 到 3:40 经过了 40 分）。',
    examShare: '必考：读写几时几分、计算经过时间、填「1 时 = 60 分」。失分点是分针读成几（要乘 5）和时针读下一个数。',
    emoji: '🕐'
  },
  points: [
    pt({
      id: 'p2a-time-min', title: '分针与 5 分',
      summary: '分针走 1 小格是 1 分、1 大格是 5 分；读分针从 12 起 5 个 5 个数。',
      keyPoints: [
        '1 小格 = **1 分**，1 大格 = **5 分**',
        '分针指 3 → **15 分**（3 × 5）',
        '分针走一圈 = **60 分 = 1 时**',
        '时针走 1 大格，分针正好一圈'
      ],
      viz: ['p2a-time', '模式 0：分针走大格', { mode: 0 }],
      apply: '课间 10 分钟：分针从 12 走到 2。',
      blocks: [
        P('读分针的秘诀：**数字 × 5**。分针指 7，就是 35 分。'),
        V('p2a-time', '模式 0：大格数 5 分', { mode: 0 }),
        P('时针与分针是**联动的**：分针转一整圈，时针才走 1 大格。'),
        L(['小格 1 分', '大格 5 分', '一圈 60 分', '指几乘 5'])
      ]
    }),
    pt({
      id: 'p2a-time-read', title: '几时几分的读写',
      summary: '时针刚过几就是几时多，分针按 5 分读：3:40 读作 3 时 40 分。',
      keyPoints: [
        '**先看时针**：过 3 不到 4 → 3 时多',
        '**再看分针**：指 8 → 40 分',
        '合起来：**3 时 40 分（3:40）**',
        '时针**快到几**时，读前一个数'
      ],
      prereq: ['p2a-time-min'],
      viz: ['p2a-time', '模式 1：过谁没到谁', { mode: 1 }],
      apply: '8:20 上早读——时针过 8 不到 9，分针指 4。',
      blocks: [
        P('两步读钟：**时针定「几时」，分针定「几分」**。'),
        V('p2a-time', '模式 1：拖滑块读时间', { mode: 1 }),
        P('时针接近下一个数时最容易错：**只要没到，就读前一个数**。'),
        L(['时针定几时', '分针定几分', '过谁读谁', '写法 3:40'])
      ]
    }),
    pt({
      id: 'p2a-time-unit', title: '1 时 = 60 分',
      summary: '时和分的进率是 60：1 时 = 60 分，半时 = 30 分，一刻钟 = 15 分。',
      keyPoints: [
        '**1 时 = 60 分**（不是 10 也不是 100）',
        '**半时 = 30 分**',
        '一刻钟 = **15 分**',
        '换算后才能**比较与计算**'
      ],
      prereq: ['p2a-time-read'],
      viz: ['p2a-time', '模式 2：时分的换算', { mode: 2 }],
      apply: '电影 1 时 30 分 = 90 分钟。',
      blocks: [
        P('时间的进率很特殊：**60 进制**。1 时 = 60 分，别写成 100。'),
        V('p2a-time', '模式 2：60 进制', { mode: 2 }),
        P('「半时」= 30 分、「一刻」= 15 分，生活中常说。'),
        L(['60 进制', '半时 30 分', '一刻 15 分', '先换算再算'])
      ]
    }),
    pt({
      id: 'p2a-time-pass', title: '经过的时间',
      summary: '经过时间 = 结束 − 开始：3:00 上课、3:40 下课，经过 40 分钟。',
      keyPoints: [
        '**结束时刻 − 开始时刻**',
        '同在整分内直接减',
        '跨整时借助钟面**数格子**',
        '答语写「经过多少分钟」'
      ],
      prereq: ['p2a-time-unit'],
      viz: ['p2a-time', '模式 3：起点到终点', { mode: 3 }],
      apply: '8:10 出门、8:45 到校，路上经过 35 分钟。',
      blocks: [
        P('算经过时间像**数路**：从起点走到终点，分针走了几大格。'),
        V('p2a-time', '模式 3：数格子算经过', { mode: 3 }),
        P('跨小时（如 3:50 到 4:10）：先到 4:00 走 10 分，再走 10 分，共 20 分。'),
        L(['结束减开始', '数大格', '跨时拆段', '答带单位'])
      ]
    })
  ],
  examples: [
    { id: 'p2a-time-e1', point: 'p2a-time-min', title: '读分针',
      question: '分针指着 6，是多少分？',
      steps: [
        { text: '6 × 5 = 30。', math: '30 分' }
      ],
      answer: '30 分' },
    { id: 'p2a-time-e2', point: 'p2a-time-read', title: '读写时间',
      question: '时针过 9 不到 10，分针指 5。是什么时间？',
      steps: [
        { text: '时针定 9 时。', math: '' },
        { text: '分针 5 × 5 = 25 分。', math: '9 时 25 分（9:25）' }
      ],
      answer: '9 时 25 分' },
    { id: 'p2a-time-e3', point: 'p2a-time-unit', title: '换算',
      question: '2 时 = （　）分。',
      steps: [
        { text: '1 时 = 60 分。', math: '2 × 60 = 120 分' }
      ],
      answer: '120 分' },
    { id: 'p2a-time-e4', point: 'p2a-time-unit', title: '一刻钟',
      question: '一刻钟是多少分？半时呢？',
      steps: [
        { text: '一刻 = 15 分。', math: '' },
        { text: '半时 = 30 分。', math: '' }
      ],
      answer: '15 分；30 分' },
    { id: 'p2a-time-e5', point: 'p2a-time-pass', title: '经过时间',
      question: '3:20 开始做操，3:50 结束，经过多少分钟？',
      steps: [
        { text: '结束减开始。', math: '3:50 − 3:20 = 30（分钟）' }
      ],
      answer: '30 分钟' },
    { id: 'p2a-time-e6', point: 'p2a-time-pass', title: '跨整时',
      question: '9:50 出发，10:15 到达，路上用了多少分钟？',
      steps: [
        { text: '9:50 → 10:00 走 10 分。', math: '' },
        { text: '10:00 → 10:15 走 15 分。', math: '共 25 分钟' }
      ],
      answer: '25 分钟' }
  ],
  patterns: {
    asks: [
      { k: '读分针', desc: '按 5 分读分针' },
      { k: '读写时间', desc: '几时几分读写' },
      { k: '换算', desc: '时分互化' },
      { k: '经过时间', desc: '算经过多少分' },
      { k: '生活应用', desc: '作息与安排' }
    ],
    features: [
      '分针指几就乘 5',
      '时针过谁读谁',
      '1 时 = 60 分',
      '跨整时拆段算'
    ],
    patterns: [
      { no: '基础 1', id: 'p2a-time-t-min', title: '读分针', level: '基础', kind: '概念',
        asks: ['读分针'], signals: ['分针指'],
        chain: [{ point: 'p2a-time-min', role: '乘 5' }],
        locate: '数字 × 5。',
        stem: '分针指着 9，是多少分？',
        solution: [
          { text: '9 × 5 = 45（分）' }
        ],
        trap: '直接读成 9 分。' },
      { no: '基础 2', id: 'p2a-time-t-read', title: '读几时几分', level: '基础', kind: '概念',
        asks: ['读写时间'], signals: ['是几时'],
        chain: [{ point: 'p2a-time-read', role: '过谁读谁' }],
        locate: '先时针后分针。',
        stem: '时针过 7 不到 8，分针指 2。是几时几分？',
        solution: [
          { text: '7 时 + 10 分。', math: '7 时 10 分' }
        ],
        trap: '读成 8 时。' },
      { no: '中档 1', id: 'p2a-time-t-conv', title: '时分换算', level: '中档', kind: '计算',
        asks: ['换算'], signals: ['= 分', '= 时'],
        chain: [{ point: 'p2a-time-unit', role: '60 进制' }],
        locate: '1 时 = 60 分。',
        stem: '120 分 = （　）时。',
        solution: [
          { text: '120 ÷ 60。', math: '2 时' }
        ],
        trap: '按 100 进制算。' },
      { no: '中档 2', id: 'p2a-time-t-pass', title: '经过时间', level: '中档', kind: '应用',
        asks: ['经过时间'], signals: ['经过', '用了'],
        chain: [{ point: 'p2a-time-pass', role: '结束减开始' }],
        locate: '同段相减。',
        stem: '2:15 开始写作业，2:55 写完，用了多少分钟？',
        solution: [
          { text: '55 − 15。', math: '40（分钟）' }
        ],
        trap: '两个时刻相加。' },
      { no: '提升 1', id: 'p2a-time-t-cross', title: '跨时计算', level: '提升', kind: '综合',
        asks: ['生活应用'], signals: ['几时出发', '几时到'],
        chain: [{ point: 'p2a-time-pass', role: '拆段数格子' }],
        locate: '先到整时，再续算。',
        stem: '4:40 开始晚会，5:30 结束，晚会开了多少分钟？',
        solution: [
          { text: '4:40 → 5:00 是 20 分。', math: '' },
          { text: '5:00 → 5:30 是 30 分。', math: '共 50 分钟' }
        ],
        trap: '两段只算一段。' }
    ]
  }
});

/* ========== 第 8 单元 数学广角——搭配（一） ========== */
save('p2a-match', {
  meta: {
    id: 'p2a-match', title: '数学广角——搭配（一）', grade: '二年级上册', bookNo: 8, order: 38,
    unit: true, status: 'done', prereqChapters: ['p1b-pattern'],
    tagline: '搭配要「有顺序、不重不漏」：固定一个去配另一个，或列表格、连线段，一个都不漏。',
    textbook: '人教版二年级上册第八单元（数学广角）',
    intro: '搭配问题练「有序思考」：2 件上衣 3 条裤子有 2 × 3 = 6 种穿法（算式在二下才学，先列表连线）；1、2、3 三个数字能组成 6 个不同的两位数；三人握手共 3 次（顺序无关）。核心区别：**排列有序、组合无序**。',
    examShare: '必考：穿衣搭配种数、数字组两位数（不重复）、握手与组合。失分点是数重复或遗漏——没有顺序地数。',
    emoji: '👕'
  },
  points: [
    pt({
      id: 'p2a-match-order', title: '有序搭配',
      summary: '搭配讲究顺序：固定第一件上衣，依次配每条裤子；再换第二件，不重不漏。',
      keyPoints: [
        '**固定一个**，依次去配另一个',
        '总数 = 上衣数 × 裤子数（列表得）',
        '连线或列表**不重不漏**',
        '交换两个物品的位置**算同一种**穿法'
      ],
      viz: ['p2a-match', '模式 0：一件配三裤', { mode: 0 }],
      apply: '2 顶帽子 3 条围巾，最多 6 种戴法。',
      blocks: [
        P('搭配的秘诀是**固定一个、扫另一个**：上衣 1 配裤子 1/2/3，上衣 2 配裤子 1/2/3。'),
        V('p2a-match', '模式 0：连线看种数', { mode: 0 }),
        P('发现规律：**2 × 3 = 6 种**——乘法是搭配的浓缩。'),
        L(['固定一个', '依次连', '不重不漏', '种数 = 数量相乘'])
      ]
    }),
    pt({
      id: 'p2a-match-num', title: '数字组成两位数',
      summary: '1、2、3 组成两位数：先定十位（3 种），再定个位（剩 2 种），共 6 个（数字不重复）。',
      keyPoints: [
        '**先定十位，再定个位**',
        '数字**不重复**用：3 × 2 = 6 个',
        '数字**可重复**用：3 × 3 = 9 个',
        '按大小排列**防止遗漏**：12、13、21、23、31、32'
      ],
      prereq: ['p2a-match-order'],
      viz: ['p2a-match', '模式 1：十位个位排一排', { mode: 1 }],
      apply: '用 1、2、3 设两位数密码，有 6 种（不重复）。',
      blocks: [
        P('组数也讲顺序：**十位轮流当，个位配剩下的**。'),
        V('p2a-match', '模式 1：按大小排队', { mode: 1 }),
        P('看清要求：**能不能重复**？能重复就多 3 个（11、22、33）。'),
        L(['先定十位', '再定个位', '不重不漏', '按序排列'])
      ]
    }),
    pt({
      id: 'p2a-match-hand', title: '握手与组合',
      summary: '两人握手只握一次，顺序无关：3 人握手共 3 次——甲乙、甲丙、乙丙。',
      keyPoints: [
        '握手**不分顺序**：甲和乙 = 乙和甲',
        '3 人握手：**3 次**（不是 6 次）',
        '连线图：两点连一线',
        '**顺序有关**是搭配，**顺序无关**是握手'
      ],
      prereq: ['p2a-match-order'],
      viz: ['p2a-match', '模式 2：三人两两握手', { mode: 2 }],
      apply: '4 个球队循环赛（每两队赛一场）共 6 场。',
      blocks: [
        P('握手与组数**恰恰相反**：组数里 12 和 21 是两个数，握手里甲乙和乙甲是同一次。'),
        V('p2a-match', '模式 2：三角形连线', { mode: 2 }),
        P('连线法防重复：**每个点与它后面的点连线**，共 2 + 1 = 3 条。'),
        L(['顺序无关', '两两连线', '3 人 3 次', '和组数对比'])
      ]
    }),
    pt({
      id: 'p2a-match-mix', title: '综合搭配',
      summary: '复杂搭配分步走：先算每一步的种数，再连乘（或列表）；穿衣 = 上衣 × 裤子 × 鞋。',
      keyPoints: [
        '**分步计数**：一步一步定',
        '每步的种数**相乘**',
        '列表格保证不漏',
        '检查：换一种数法**结果一致**'
      ],
      prereq: ['p2a-match-num', 'p2a-match-hand'],
      viz: ['p2a-match', '模式 3：分步走', { mode: 3 }],
      apply: '2 上衣 × 3 裤子 = 6，再 × 2 双鞋 = 12 种全套穿法。',
      blocks: [
        P('多步搭配：**每步固定再扫**，种数连乘。'),
        V('p2a-match', '模式 3：树状图分步', { mode: 3 }),
        P('画**树状图**最直观：一层一层分叉。'),
        L(['分步走', '种数相乘', '树状图', '换法验算'])
      ]
    })
  ],
  examples: [
    { id: 'p2a-match-e1', point: 'p2a-match-order', title: '穿衣搭配',
      question: '2 件上衣、3 条裤子，有几种穿法？',
      steps: [
        { text: '固定上衣配裤子。', math: '2 × 3 = 6（种）' }
      ],
      answer: '6 种' },
    { id: 'p2a-match-e2', point: 'p2a-match-num', title: '组两位数',
      question: '用 1、2、3 组成没有重复数字的两位数，能组几个？',
      steps: [
        { text: '十位 3 种，个位 2 种。', math: '3 × 2 = 6（个）' }
      ],
      answer: '6 个' },
    { id: 'p2a-match-e3', point: 'p2a-match-num', title: '按大小列出',
      question: '把 1、2、3 组成的两位数从小到大写出来。',
      steps: [
        { text: '十位 1 开头：12、13。', math: '' },
        { text: '依次：21、23、31、32。', math: '' }
      ],
      answer: '12、13、21、23、31、32' },
    { id: 'p2a-match-e4', point: 'p2a-match-hand', title: '握手',
      question: '3 个小朋友两两握手，一共握几次？',
      steps: [
        { text: '甲乙、甲丙、乙丙。', math: '3 次' }
      ],
      answer: '3 次' },
    { id: 'p2a-match-e5', point: 'p2a-match-hand', title: '循环赛',
      question: '4 个队每两队赛一场，一共赛几场？',
      steps: [
        { text: '连线：3 + 2 + 1。', math: '6 场' }
      ],
      answer: '6 场' },
    { id: 'p2a-match-e6', point: 'p2a-match-mix', title: '分步搭配',
      question: '2 顶帽子、2 条围巾，一顶帽子配一条围巾，有几种戴法？',
      steps: [
        { text: '分步：先帽 2 种、再围巾 2 种。', math: '2 × 2 = 4（种）' }
      ],
      answer: '4 种' }
  ],
  patterns: {
    asks: [
      { k: '搭配种数', desc: '穿衣等搭配计数' },
      { k: '组数', desc: '数字组成两位数' },
      { k: '排列', desc: '按顺序排列' },
      { k: '握手组合', desc: '顺序无关的计数' },
      { k: '分步乘', desc: '多步搭配' }
    ],
    features: [
      '固定一个依次配',
      '组数先十位后个位',
      '握手顺序无关',
      '分步种数相乘'
    ],
    patterns: [
      { no: '基础 1', id: 'p2a-match-t-pair', title: '搭配种数', level: '基础', kind: '应用',
        asks: ['搭配种数'], signals: ['几种', '搭配'],
        chain: [{ point: 'p2a-match-order', role: '固定扫配' }],
        locate: '连线或相乘。',
        stem: '3 件上衣、2 条裤子，有几种穿法？',
        solution: [
          { text: '3 × 2。', math: '6 种' }
        ],
        trap: '数漏或重数。' },
      { no: '基础 2', id: 'p2a-match-t-num', title: '组两位数', level: '基础', kind: '应用',
        asks: ['组数'], signals: ['组成两位数'],
        chain: [{ point: 'p2a-match-num', role: '十位个位' }],
        locate: '先十位后个位，不重复。',
        stem: '用 2、5、8 组成没有重复数字的两位数，共几个？',
        solution: [
          { text: '3 × 2。', math: '6 个' }
        ],
        trap: '把 25、52 当一个。' },
      { no: '中档 1', id: 'p2a-match-t-rep', title: '可重复组数', level: '中档', kind: '应用',
        asks: ['组数'], signals: ['可以重复'],
        chain: [{ point: 'p2a-match-num', role: '3 × 3' }],
        locate: '十位 3 种，个位也 3 种。',
        stem: '用 1、2、3 组成两位数，数字可以重复，共几个？',
        solution: [
          { text: '3 × 3。', math: '9 个' }
        ],
        trap: '忘记 11、22、33。' },
      { no: '中档 2', id: 'p2a-match-t-hand', title: '握手组合', level: '中档', kind: '应用',
        asks: ['握手组合'], signals: ['握手', '比赛'],
        chain: [{ point: 'p2a-match-hand', role: '顺序无关' }],
        locate: '两两连线，不翻倍。',
        stem: '5 个同学每两人握一次手，共握几次？',
        solution: [
          { text: '4 + 3 + 2 + 1。', math: '10 次' }
        ],
        trap: '算成 5 × 4 = 20。' },
      { no: '提升 1', id: 'p2a-match-t-step', title: '分步搭配', level: '提升', kind: '综合',
        asks: ['分步乘'], signals: ['帽子', '围巾', '鞋'],
        chain: [{ point: 'p2a-match-mix', role: '分步相乘' }],
        locate: '每步种数连乘。',
        stem: '2 顶帽子、3 条围巾、2 双手套，各取一件搭配，共几种？',
        solution: [
          { text: '2 × 3 × 2。', math: '12 种' }
        ],
        trap: '漏一步。' }
    ]
  }
});
