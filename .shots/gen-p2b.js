/* 人教版二年级下册 · 9 单元 */
const { P, V, L, pt, save } = require('./gen-lib');

/* ========== 第 1 单元 数据收集整理 ========== */
save('p2b-data', {
  meta: {
    id: 'p2b-data', title: '数据收集整理', grade: '二年级下册', bookNo: 1, order: 41,
    unit: true, status: 'done', prereqChapters: ['p1b-sort'],
    tagline: '先调查、再记录、后整理：「正」字 5 画最好数——数据会说话，结论靠数据。',
    textbook: '人教版二年级下册第一单元',
    intro: '统计的完整流程第一次走全：**提出问题 → 收集数据（举手/投票）→ 记录（打勾、画正字）→ 整理成表 → 看表做决定**。「正」字记录法是重点：一笔一个人，一个正字 5 个。结论必须**来自数据**，而不是感觉。',
    examShare: '必考：按记录表填写统计表、比较多少、根据数据做判断。失分点是「正」字笔画数错（一画一人）。',
    emoji: '📊'
  },
  points: [
    pt({
      id: 'p2b-data-collect', title: '收集数据',
      summary: '想知道大家喜欢什么，就举手投票或逐个询问，把结果当场记录下来。',
      keyPoints: [
        '先**明确问题**：想知道什么',
        '**举手**、投票、询问都是收集方式',
        '边问**边记录**，不能事后补',
        '记录要**一一对应**'
      ],
      viz: ['p2b-data', '模式 0：举手与记录', { mode: 0 }],
      apply: '班里选班长、统计口味喜好，都要现场收集。',
      blocks: [
        P('统计第一步：**问什么要想清楚**，然后当场收集。'),
        V('p2b-data', '模式 0：举手表决记录下来', { mode: 0 }),
        P('收集与记录**同时进行**，漏记一人结果就错。'),
        L(['问题先行', '现场收集', '边问边记', '一一对应'])
      ]
    }),
    pt({
      id: 'p2b-data-tally', title: '记录方法：打勾与画正字',
      summary: '简单数据打勾记录；人多时用「正」字：一画一个人，一个正字 5 个，好数不易错。',
      keyPoints: [
        '打勾：一人**一勾**',
        '**正字**：一画一个人，**一个正 = 5**',
        '正字好数：**按 5 个 5 个数**',
        '记录要及时、清晰'
      ],
      prereq: ['p2b-data-collect'],
      viz: ['p2b-data', '模式 1：正字一画一人', { mode: 1 }],
      apply: '运动会票选、班干部唱票都用正字法。',
      blocks: [
        P('「正」字五画，**画满一个就是 5**，不满 5 的看笔画数。'),
        V('p2b-data', '模式 1：两个正字加 3 画', { mode: 1 }),
        P('数正字：**5 × 正字数 + 剩余笔画**。'),
        L(['一画一人', '一个正 5 个', '按 5 数', '剩余看笔画'])
      ]
    }),
    pt({
      id: 'p2b-data-table', title: '整理成统计表',
      summary: '把记录结果按类别填进统计表：类别一行、数量一行，表格让数据一目了然。',
      keyPoints: [
        '记录 → **归类填表**',
        '表内数字要**与记录一致**',
        '从表里**直接比较**多少',
        '表格是最常用的**整理工具**'
      ],
      prereq: ['p2b-data-tally'],
      viz: ['p2b-data', '模式 2：从记录到表格', { mode: 2 }],
      apply: '投票结束后把正字换算成数填表。',
      blocks: [
        P('填表就是**翻译**：正字换成数字。'),
        V('p2b-data', '模式 2：正字变数字', { mode: 2 }),
        P('填完核对一遍**总数**是否等于调查人数。'),
        L(['归类填表', '数字核对', '总数守恒', '直接可比'])
      ]
    }),
    pt({
      id: 'p2b-data-decide', title: '根据数据做判断',
      summary: '结论靠数据说话：表中数字大的就是受欢迎的；数据变了结论跟着变。',
      keyPoints: [
        '**看数字**下结论，不凭感觉',
        '数据不同 → 结论可能不同',
        '比较用**大小**，差距用**减法**',
        '判断要**说出数据依据**'
      ],
      prereq: ['p2b-data-table'],
      viz: ['p2b-data', '模式 3：数据说了算', { mode: 3 }],
      apply: '春游选地点：票数最多的地方胜出——少数服从多数。',
      blocks: [
        P('统计的目的：**帮助做决定**。数字大 = 支持多。'),
        V('p2b-data', '模式 3：谁票多选谁', { mode: 3 }),
        P('答题句式：「因为××有__票，最多，所以选××。」——**带数据说话**。'),
        L(['数据说话', '带依据', '比较看大小', '结论随数据'])
      ]
    })
  ],
  examples: [
    { id: 'p2b-data-e1', point: 'p2b-data-collect', title: '收集方式',
      question: '想知道全班最喜欢的动物，用什么方法收集？',
      steps: [
        { text: '举手或投票。', math: '' },
        { text: '当场记录。', math: '' }
      ],
      answer: '举手（投票）记录' },
    { id: 'p2b-data-e2', point: 'p2b-data-tally', title: '数正字',
      question: '记录里有 2 个完整正字和 3 画。是多少？',
      steps: [
        { text: '2 个正字 = 10。', math: '' },
        { text: '加 3。', math: '13' }
      ],
      answer: '13' },
    { id: 'p2b-data-e3', point: 'p2b-data-tally', title: '正字含义',
      question: '一个「正」字代表几个人？',
      steps: [
        { text: '正字 5 画。', math: '5 人' }
      ],
      answer: '5 人' },
    { id: 'p2b-data-e4', point: 'p2b-data-table', title: '填表',
      question: '正字记录：猫 1 个正字加 2 画，狗 2 个正字。填统计表。',
      steps: [
        { text: '猫：7。', math: '' },
        { text: '狗：10。', math: '' }
      ],
      answer: '猫 7、狗 10' },
    { id: 'p2b-data-e5', point: 'p2b-data-decide', title: '比多少',
      question: '统计表：猫 7、狗 10。喜欢狗的比猫的多几人？',
      steps: [
        { text: '大减小。', math: '10 − 7 = 3（人）' }
      ],
      answer: '3 人' },
    { id: 'p2b-data-e6', point: 'p2b-data-decide', title: '做决定',
      question: '春游投票：山 12、海 15、公园 8。去哪里春游？为什么？',
      steps: [
        { text: '比票数。', math: '15 最大' },
        { text: '选海边。', math: '' }
      ],
      answer: '海边，票数最多' }
  ],
  patterns: {
    asks: [
      { k: '收集', desc: '选择收集数据的方式' },
      { k: '正字', desc: '正字记录与计数' },
      { k: '填表', desc: '整理成统计表' },
      { k: '读表比较', desc: '从表比多少' },
      { k: '做决定', desc: '依据数据下结论' }
    ],
    features: [
      '收集与记录同时',
      '一画一人，正字 5 个',
      '填表后核对总数',
      '结论带数据依据'
    ],
    patterns: [
      { no: '基础 1', id: 'p2b-data-t-tally', title: '数正字', level: '基础', kind: '计算',
        asks: ['正字'], signals: ['正字', '多少'],
        chain: [{ point: 'p2b-data-tally', role: '5 × 正字 + 画' }],
        locate: '整字乘 5，加余画。',
        stem: '3 个正字和 4 画，共多少？',
        solution: [
          { text: '3 × 5 + 4。', math: '19' }
        ],
        trap: '把 4 画当 4 个。' },
      { no: '基础 2', id: 'p2b-data-t-table', title: '填表', level: '基础', kind: '应用',
        asks: ['填表'], signals: ['统计表'],
        chain: [{ point: 'p2b-data-table', role: '记录转数字' }],
        locate: '逐类换算填写。',
        stem: '正字 1 个加 1 画，代表多少？',
        solution: [
          { text: '5 + 1。', math: '6' }
        ],
        trap: '当成 4。' },
      { no: '中档 1', id: 'p2b-data-t-compare', title: '读表比较', level: '中档', kind: '应用',
        asks: ['读表比较'], signals: ['多几', '少几'],
        chain: [{ point: 'p2b-data-table', role: '取数相减' }],
        locate: '从表读数，大减小。',
        stem: '表中：苹果 14、香蕉 9。香蕉比苹果少几？',
        solution: [
          { text: '14 − 9。', math: '5' }
        ],
        trap: '方向弄反。' },
      { no: '中档 2', id: 'p2b-data-t-decide', title: '数据决策', level: '中档', kind: '综合',
        asks: ['做决定'], signals: ['应该', '选择'],
        chain: [{ point: 'p2b-data-decide', role: '数据最大者' }],
        locate: '找表中最大数。',
        stem: '三种水果票数：22、18、25。该买哪种？',
        solution: [
          { text: '25 最大。', math: '' },
          { text: '买第三种。', math: '' }
        ],
        trap: '凭喜好不凭数据。' },
      { no: '提升 1', id: 'p2b-data-t-total', title: '总数核对', level: '提升', kind: '综合',
        asks: ['读表比较'], signals: ['一共', '全班'],
        chain: [{ point: 'p2b-data-table', role: '合计核对' }],
        locate: '各类相加等于总数。',
        stem: '表中三项分别是 13、16、11，调查了多少人？',
        solution: [
          { text: '相加。', math: '40 人' }
        ],
        trap: '漏加一项。' }
    ]
  }
});

/* ========== 第 2 单元 表内除法（一） ========== */
save('p2b-div1', {
  meta: {
    id: 'p2b-div1', title: '表内除法（一）', grade: '二年级下册', bookNo: 2, order: 42,
    unit: true, status: 'done', prereqChapters: ['p2a-mult1'],
    tagline: '平均分是除法的根：12 个苹果每盘放 3 个，放几盘？——除号一落，分与合就通了。',
    textbook: '人教版二年级下册第二单元',
    intro: '除法两种含义：**平均分成几份**（12 ÷ 2：每人分 6 个）和**每几个一份**（12 ÷ 6：分给 2 人）。求商用**乘法口诀**：想「几乘除数等于被除数」。2~6 的口诀求商，平均分是理解一切的钥匙。',
    examShare: '必考：平均分、写除法算式、用 2~6 口诀求商、解决问题。失分点是两种分法混淆（除数与商弄反）。',
    emoji: '🍪'
  },
  points: [
    pt({
      id: 'p2b-div1-even', title: '平均分',
      summary: '每份分得同样多叫平均分：12 颗糖平均分给 3 人，每人 4 颗。',
      keyPoints: [
        '**每份同样多**才叫平均分',
        '一个一个分、两个两个分都行',
        '分完要**一样多**',
        '不平均的分法不是平均分'
      ],
      viz: ['p2b-div1', '模式 0：分得同样多', { mode: 0 }],
      apply: '分蛋糕、分小组，都要平均分。',
      blocks: [
        P('平均分的关键词：**同样多**。'),
        V('p2b-div1', '模式 0：一人一份一样多', { mode: 0 }),
        P('分法不影响结果：一个一个分、每次分 2 个，最后每人都一样。'),
        L(['同样多', '逐个或按组分', '分完相等', '检验是否平均'])
      ]
    }),
    pt({
      id: 'p2b-div1-mean', title: '除法的初步认识',
      summary: '两种分法都写除法：把 12 平均分成 3 份每份 4 个：12 ÷ 3 = 4；12 每 4 个一份分 3 份：12 ÷ 4 = 3。',
      keyPoints: [
        '**÷** 表示平均分',
        '分法一：**总数 ÷ 份数 = 每份**',
        '分法二：**总数 ÷ 每份 = 份数**',
        '读法：12 ÷ 3 = 4 读作「12 除以 3 等于 4」'
      ],
      prereq: ['p2b-div1-even'],
      viz: ['p2b-div1', '模式 1：两种分法一算式', { mode: 1 }],
      apply: '20 元平均买 4 本：20 ÷ 4 = 5 元一本。',
      blocks: [
        P('除号把「平均分」装进算式：**被除数 ÷ 除数 = 商**。'),
        V('p2b-div1', '模式 1：份数与每份互换', { mode: 1 }),
        P('两种分法互为逆问：知道每份求份数、知道份数求每份——**算式不同，分的是同一批东西**。'),
        L(['÷ 即平均分', '总数在除号前', '两种含义', '读除以'])
      ]
    }),
    pt({
      id: 'p2b-div1-quotient', title: '用 2~6 的口诀求商',
      summary: '求商想乘法：12 ÷ 3 = ？想「三（　）十二」——三四十二，商 4。',
      keyPoints: [
        '求商 = **想口诀**：几 × 除数 = 被除数',
        '除数是几就想**几的口诀**',
        '商和除数**交换也能算**另一题',
        '一句口诀求**一乘一除两道**'
      ],
      prereq: ['p2b-div1-mean'],
      viz: ['p2b-div1', '模式 2：对口诀求商', { mode: 2 }],
      apply: '18 元买 6 元一支的笔：18 ÷ 6，想三六十八，买 3 支。',
      blocks: [
        P('除法求商用**乘法口诀**：想「除数 × 几 = 被除数」。'),
        V('p2b-div1', '模式 2：口诀反过来用', { mode: 2 }),
        P('乘除互逆：**三四十二** 管 3 × 4、4 × 3、12 ÷ 3、12 ÷ 4 四道。'),
        L(['口诀求商', '想乘算除', '一诀四式', '脱口而出'])
      ]
    }),
    pt({
      id: 'p2b-div1-solve', title: '解决问题',
      summary: '「平均分」就用除法：总数 ÷ 份数 = 每份数；总数 ÷ 每份数 = 份数。看清求哪个。',
      keyPoints: [
        '问「每份几个」→ **总数 ÷ 份数**',
        '问「能分几份」→ **总数 ÷ 每份**',
        '单位不同：**个 / 盘**',
        '答语要说清分的结果'
      ],
      prereq: ['p2b-div1-quotient'],
      viz: ['p2b-div1', '模式 3：求每份还是求份数', { mode: 3 }],
      apply: '15 个饺子平均放 5 盘：15 ÷ 5 = 3 个每盘。',
      blocks: [
        P('判断求什么：**问每份 → 除以份数；问份数 → 除以每份**。'),
        V('p2b-div1', '模式 3：两种问法', { mode: 3 }),
        P('商的单位跟着问题走：**每人几个 / 能分几盘**。'),
        L(['问啥除啥', '单位对应', '两种问题', '答完整'])
      ]
    })
  ],
  examples: [
    { id: 'p2b-div1-e1', point: 'p2b-div1-even', title: '平均分',
      question: '把 10 颗糖平均分给 2 人，每人几颗？',
      steps: [
        { text: '一人一颗轮流分。', math: '每人 5 颗' }
      ],
      answer: '5 颗' },
    { id: 'p2b-div1-e2', point: 'p2b-div1-mean', title: '写除法算式',
      question: '把 15 个球平均分成 5 份，每份几个？列式。',
      steps: [
        { text: '总数 ÷ 份数。', math: '15 ÷ 5 = 3（个）' }
      ],
      answer: '15 ÷ 5 = 3' },
    { id: 'p2b-div1-e3', point: 'p2b-div1-mean', title: '每几个一份',
      question: '15 个球每 3 个装一袋，能装几袋？',
      steps: [
        { text: '总数 ÷ 每份。', math: '15 ÷ 3 = 5（袋）' }
      ],
      answer: '5 袋' },
    { id: 'p2b-div1-e4', point: 'p2b-div1-quotient', title: '口诀求商',
      question: '计算：20 ÷ 4。',
      steps: [
        { text: '想四五二十。', math: '20 ÷ 4 = 5' }
      ],
      answer: '5' },
    { id: 'p2b-div1-e5', point: 'p2b-div1-quotient', title: '一诀四式',
      question: '用「二六十二」写出一道乘法两道除法。',
      steps: [
        { text: '乘：2 × 6 = 12。', math: '' },
        { text: '除：12 ÷ 2 = 6，12 ÷ 6 = 2。', math: '' }
      ],
      answer: '12 ÷ 2 = 6（或 12 ÷ 6 = 2）' },
    { id: 'p2b-div1-e6', point: 'p2b-div1-solve', title: '解决问题',
      question: '18 块饼干每 6 块装一盒，能装几盒？',
      steps: [
        { text: '总数 ÷ 每份。', math: '18 ÷ 6 = 3（盒）' }
      ],
      answer: '3 盒' }
  ],
  patterns: {
    asks: [
      { k: '平均分', desc: '判断与操作平均分' },
      { k: '写算式', desc: '按图意写除法算式' },
      { k: '求商', desc: '用口诀求商' },
      { k: '求每份', desc: '总数÷份数' },
      { k: '求份数', desc: '总数÷每份' }
    ],
    features: [
      '每份同样多才是平均分',
      '除号前是总数',
      '求商想口诀',
      '看清求每份还是份数'
    ],
    patterns: [
      { no: '基础 1', id: 'p2b-div1-t-even', title: '平均分', level: '基础', kind: '概念',
        asks: ['平均分'], signals: ['平均分', '同样多'],
        chain: [{ point: 'p2b-div1-even', role: '分得相同' }],
        locate: '轮流分，最后相等。',
        stem: '8 个橘子平均分给 4 人，每人几个？',
        solution: [
          { text: '轮流分。', math: '每人 2 个' }
        ],
        trap: '分得不平均。' },
      { no: '基础 2', id: 'p2b-div1-t-write', title: '写算式', level: '基础', kind: '计算',
        asks: ['写算式'], signals: ['列式'],
        chain: [{ point: 'p2b-div1-mean', role: '总数在前' }],
        locate: '分清除数与商。',
        stem: '14 个梨每 2 个一盘，摆几盘？列式。',
        solution: [
          { text: '14 ÷ 2。', math: '= 7（盘）' }
        ],
        trap: '写成 2 ÷ 14。' },
      { no: '中档 1', id: 'p2b-div1-t-q', title: '口诀求商', level: '中档', kind: '计算',
        asks: ['求商'], signals: ['÷'],
        chain: [{ point: 'p2b-div1-quotient', role: '想乘算除' }],
        locate: '想几乘除数 = 被除数。',
        stem: '计算：24 ÷ 6。',
        solution: [
          { text: '想四六二十四。', math: '24 ÷ 6 = 4' }
        ],
        trap: '口诀想反。' },
      { no: '中档 2', id: 'p2b-div1-t-which', title: '两种分法辨析', level: '中档', kind: '概念',
        asks: ['求每份'], signals: ['平均分成', '每几个'],
        chain: [{ point: 'p2b-div1-solve', role: '辨析两种问法' }],
        locate: '问每份除以份数，问份数除以每份。',
        stem: '「12 平均分成 4 份」和「12 每 4 个一份」有什么不同？',
        solution: [
          { text: '前者求每份：12 ÷ 4 = 3。', math: '' },
          { text: '后者求份数：12 ÷ 4 = 3（这里恰好相同，但含义不同）。', math: '' }
        ],
        trap: '两种含义混为一谈。' },
      { no: '提升 1', id: 'p2b-div1-t-app', title: '除法应用', level: '提升', kind: '综合',
        asks: ['求份数'], signals: ['能装几', '能分几'],
        chain: [{ point: 'p2b-div1-solve', role: '总数÷每份' }],
        locate: '看问题要什么。',
        stem: '30 个气球每 5 个扎一束，能扎几束？',
        solution: [
          { text: '30 ÷ 5。', math: '6（束）' }
        ],
        trap: '单位写成「个」。' }
    ]
  }
});

/* ========== 第 3 单元 图形的运动（一） ========== */
save('p2b-motion', {
  meta: {
    id: 'p2b-motion', title: '图形的运动（一）', grade: '二年级下册', bookNo: 3, order: 43,
    unit: true, status: 'done', prereqChapters: ['p1b-shape2'],
    tagline: '对称轴一折两边重合；平移沿着直线滑、旋转绕着点转——三种运动认一认。',
    textbook: '人教版二年级下册第三单元',
    intro: '图形会动：**轴对称**（对折两边完全重合，折痕是对称轴）、**平移**（沿直线滑动，方向大小不变）、**旋转**（绕一个点转圈）。会剪对称图形、会在方格纸上数平移格数、认出生活中的三种运动。',
    examShare: '必考：判断对称图形及对称轴数量、区分平移与旋转、数平移格数。失分点是把旋转当平移、对称轴数量数错。',
    emoji: '🪞'
  },
  points: [
    pt({
      id: 'p2b-motion-sym', title: '轴对称图形',
      summary: '对折后两边完全重合的图形是轴对称图形：蝴蝶、树叶、字母 A 都是对称的。',
      keyPoints: [
        '**对折重合** → 轴对称',
        '折痕就是**对称轴**',
        '对称轴可以**不止一条**（正方形有 4 条）',
        '对称图形**两边一样**'
      ],
      viz: ['p2b-motion', '模式 0：对折重合', { mode: 0 }],
      apply: '剪纸：纸对折剪一刀，展开就是对称图案。',
      blocks: [
        P('判断对称就看**能不能对折重合**。'),
        V('p2b-motion', '模式 0：折一折看一看', { mode: 0 }),
        P('对称轴是**直线**：有的图形多条（圆有无数条）。'),
        L(['对折重合', '折痕即轴', '轴可多条', '两边一致'])
      ]
    }),
    pt({
      id: 'p2b-motion-slide', title: '平移',
      summary: '平移是沿直线滑动：滑梯上的滑块、推拉窗、电梯升降——方向不变、大小不变。',
      keyPoints: [
        '平移**沿直线**移动',
        '**方向、形状、大小都不变**',
        '只改变**位置**',
        '在方格纸上**数格**判断'
      ],
      prereq: ['p2b-motion-sym'],
      viz: ['p2b-motion', '模式 1：左右平移', { mode: 1 }],
      apply: '电梯上上下下是竖直平移，缆车沿索道平移。',
      blocks: [
        P('平移三不变：**方向、形状、大小**；唯一变的是**位置**。'),
        V('p2b-motion', '模式 1：拖滑块平移', { mode: 1 }),
        P('数平移格数：**找图形上的一个点**，数它移动了几格（不是数两个图形间的空格）。'),
        L(['沿直线', '形状不变', '数点数格', '只变位置'])
      ]
    }),
    pt({
      id: 'p2b-motion-spin', title: '旋转',
      summary: '旋转是绕一个点转：风车、摩天轮、钟面指针——大小形状不变，方向在变。',
      keyPoints: [
        '绕**一个点（中心）**转动',
        '形状大小不变，**方向改变**',
        '生活中的旋转：风扇、指针、风车',
        '**转动**不是滑动'
      ],
      prereq: ['p2b-motion-slide'],
      viz: ['p2b-motion', '模式 2：风车转起来', { mode: 2 }],
      apply: '拧水龙头、荡秋千（摆动）都有旋转的影子。',
      blocks: [
        P('旋转找**中心点**：绕着谁转。'),
        V('p2b-motion', '模式 2：绕中心旋转', { mode: 2 }),
        P('平移与旋转的区别：**走直线还是绕圈**。'),
        L(['绕中心', '方向变', '风车轮', '对比平移'])
      ]
    }),
    pt({
      id: 'p2b-motion-life', title: '生活中的三种运动',
      summary: '分类判断：剪纸对称、缆车平移、摩天轮旋转——同一现象要选准关键词。',
      keyPoints: [
        '**对称**：找折痕',
        '**平移**：找直线运动',
        '**旋转**：找绕点转动',
        '组合运动要**分步骤判断**'
      ],
      prereq: ['p2b-motion-spin'],
      viz: ['p2b-motion', '模式 3：对号入座', { mode: 3 }],
      apply: '拉抽屉平移、拧瓶盖旋转、天安门城楼对称。',
      blocks: [
        P('判断三问：**能对折吗？沿直线动吗？绕点转吗？**'),
        V('p2b-motion', '模式 3：贴标签', { mode: 3 }),
        P('有的物体既有平移又有旋转（如直升机的机身平移、螺旋桨旋转）。'),
        L(['三问判断', '关键词定位', '可组合出现', '联系生活'])
      ]
    })
  ],
  examples: [
    { id: 'p2b-motion-e1', point: 'p2b-motion-sym', title: '判断对称',
      question: '字母 A、F、H 中哪些是轴对称图形？',
      steps: [
        { text: 'A 左右对折重合。', math: 'A 是' },
        { text: 'F 不对称；H 左右对称。', math: '' }
      ],
      answer: 'A 和 H' },
    { id: 'p2b-motion-e2', point: 'p2b-motion-sym', title: '对称轴数量',
      question: '正方形有几条对称轴？',
      steps: [
        { text: '横、竖、两条对角线。', math: '4 条' }
      ],
      answer: '4 条' },
    { id: 'p2b-motion-e3', point: 'p2b-motion-slide', title: '数平移格',
      question: '小船向右平移 5 格，怎么数？',
      steps: [
        { text: '盯住船头一点。', math: '' },
        { text: '数它移动的格数。', math: '5 格' }
      ],
      answer: '盯一点数 5 格' },
    { id: 'p2b-motion-e4', point: 'p2b-motion-spin', title: '判断旋转',
      question: '下列哪些是旋转：推门、拉抽屉、转呼啦圈？',
      steps: [
        { text: '推门绕轴转。', math: '旋转' },
        { text: '拉抽屉平移；呼啦圈旋转。', math: '' }
      ],
      answer: '推门、转呼啦圈' },
    { id: 'p2b-motion-e5', point: 'p2b-motion-life', title: '生活分类',
      question: '电梯升降、拧水龙头、剪纸窗花分别属于什么？',
      steps: [
        { text: '电梯：平移。', math: '' },
        { text: '拧瓶盖：旋转；窗花：轴对称。', math: '' }
      ],
      answer: '平移；旋转；轴对称' },
    { id: 'p2b-motion-e6', point: 'p2b-motion-slide', title: '平移性质',
      question: '平移后的图形和原图形相比，什么变了、什么没变？',
      steps: [
        { text: '位置变了。', math: '' },
        { text: '形状大小方向没变。', math: '' }
      ],
      answer: '位置变，其余不变' }
  ],
  patterns: {
    asks: [
      { k: '判断对称', desc: '轴对称图形的判断' },
      { k: '对称轴', desc: '对称轴的数量' },
      { k: '平移', desc: '平移的判断与格数' },
      { k: '旋转', desc: '旋转的判断' },
      { k: '生活分类', desc: '生活现象分类' }
    ],
    features: [
      '对折重合才是对称',
      '数平移盯住一点',
      '旋转找中心',
      '结论要贴标签'
    ],
    patterns: [
      { no: '基础 1', id: 'p2b-motion-t-sym', title: '判断对称', level: '基础', kind: '概念',
        asks: ['判断对称'], signals: ['轴对称'],
        chain: [{ point: 'p2b-motion-sym', role: '对折想象' }],
        locate: '想象对折是否重合。',
        stem: '数字 8 是轴对称图形吗？',
        solution: [
          { text: '上下、左右对折都重合（近似）。', math: '' },
          { text: '是。', math: '' }
        ],
        trap: '把不对称的判成对称。' },
      { no: '基础 2', id: 'p2b-motion-t-axis', title: '对称轴', level: '基础', kind: '概念',
        asks: ['对称轴'], signals: ['几条'],
        chain: [{ point: 'p2b-motion-sym', role: '数折痕' }],
        locate: '想象各种折法。',
        stem: '等腰三角形（两边相等）有几条对称轴？',
        solution: [
          { text: '从顶角到底边的折痕。', math: '1 条' }
        ],
        trap: '答 3 条。' },
      { no: '中档 1', id: 'p2b-motion-t-slide', title: '平移格数', level: '中档', kind: '应用',
        asks: ['平移'], signals: ['平移几格'],
        chain: [{ point: 'p2b-motion-slide', role: '盯点数格' }],
        locate: '选一点数移动距离。',
        stem: '三角形向右平移 4 格，原图与移后图之间隔 3 格空白，对吗？',
        solution: [
          { text: '平移距离按点算。', math: '' },
          { text: '应该数对应点间的格数 = 4。', math: '' }
        ],
        trap: '数成两图间的空白。' },
      { no: '中档 2', id: 'p2b-motion-t-spin', title: '旋转判断', level: '中档', kind: '概念',
        asks: ['旋转'], signals: ['旋转'],
        chain: [{ point: 'p2b-motion-spin', role: '找中心' }],
        locate: '看是否绕点转。',
        stem: '秋千来回摆动是旋转吗？',
        solution: [
          { text: '绕悬挂点摆动，属于旋转现象。', math: '' }
        ],
        trap: '认为只有转整圈才算。' },
      { no: '提升 1', id: 'p2b-motion-t-life', title: '生活分类', level: '提升', kind: '综合',
        asks: ['生活分类'], signals: ['属于什么'],
        chain: [{ point: 'p2b-motion-life', role: '三问判断' }],
        locate: '对称/平移/旋转逐一对号。',
        stem: '国旗升起、风车转动、蝴蝶翅膀，各是什么现象？',
        solution: [
          { text: '升起平移、风车旋转、蝴蝶对称。', math: '' }
        ],
        trap: '现象混淆。' }
    ]
  }
});

/* ========== 第 4 单元 表内除法（二） ========== */
save('p2b-div2', {
  meta: {
    id: 'p2b-div2', title: '表内除法（二）', grade: '二年级下册', bookNo: 4, order: 44,
    unit: true, status: 'done', prereqChapters: ['p2b-div1'],
    tagline: '7、8、9 的口诀求商继续升级：56 ÷ 8，想「七八五十六」——口诀熟，除法快。',
    textbook: '人教版二年级下册第四单元',
    intro: '用 7~9 的口诀求商，方法与上一单元完全一致：**想乘算除**。难点是口诀数变大容易混（六八四十八 vs 六七四十二）。求商能力达标后，解决「平均分」的实际问题就畅通无阻。',
    examShare: '必考：7~9 口诀求商、口诀填空、解决问题（装车、分组）。失分点是口诀记混（六八/六七）。',
    emoji: '🔢'
  },
  points: [
    pt({
      id: 'p2b-div2-q7', title: '用 7 的口诀求商',
      summary: '35 ÷ 7：想「七（　）三十五」——五七三十五，商 5。',
      keyPoints: [
        '除数是 7，想 **7 的口诀**',
        '五七三十五 → 35 ÷ 7 = 5',
        '一诀管四式（两乘两除）',
        '7 的口诀最常考'
      ],
      viz: ['p2b-div2', '模式 0：七的口诀倒着用', { mode: 0 }],
      apply: '一周 7 天，63 天是 9 周：63 ÷ 7 = 9。',
      blocks: [
        P('求商就想「**除数 × 几 = 被除数**」。'),
        V('p2b-div2', '模式 0：对口诀', { mode: 0 }),
        P('练熟后直接报商：**63 ÷ 7 = 9**（七九六十三）。'),
        L(['想乘算除', '口诀对口', '一诀四式', '报商要快'])
      ]
    }),
    pt({
      id: 'p2b-div2-q89', title: '用 8、9 的口诀求商',
      summary: '72 ÷ 8：想八（　）七十二——八九七十二，商 9。数大了更要背熟口诀。',
      keyPoints: [
        '**八八六十四、九九八十一**是底线',
        '72 ÷ 8 = 9、72 ÷ 9 = 8',
        '大口诀易混：**六八四十八 ≠ 六七四十二**',
        '忘口诀用**相邻口诀推**'
      ],
      prereq: ['p2b-div2-q7'],
      viz: ['p2b-div2', '模式 1：大口诀求商', { mode: 1 }],
      apply: '54 人每 9 人一组：54 ÷ 9 = 6 组。',
      blocks: [
        P('8、9 的口诀**必须一字不差**，错一个字商就错。'),
        V('p2b-div2', '模式 1：对口诀', { mode: 1 }),
        P('易混排雷：**六七四十二、六八四十八**——多念几遍。'),
        L(['大口诀熟背', '易混对比', '邻居推算', '检查单位'])
      ]
    }),
    pt({
      id: 'p2b-div2-blank', title: '口诀填空与逆推',
      summary: '（　）× 9 = 45：想五九四十五，填 5——乘除法互逆，正着反着都用一句口诀。',
      keyPoints: [
        '填因数：**想口诀找数**',
        '填被除数：几 × 除数 = ？',
        '口诀是**万能钥匙**',
        '检验：商 × 除数 = 被除数'
      ],
      prereq: ['p2b-div2-q89'],
      viz: ['p2b-div2', '模式 2：逆推填空', { mode: 2 }],
      apply: '（　）× 8 = 48：六八四十八，填 6。',
      blocks: [
        P('乘除互逆：**知道两个数就能求第三个**。'),
        V('p2b-div2', '模式 2：口诀三兄弟', { mode: 2 }),
        P('做完除法**乘回去验算**：商 × 除数应等于被除数。'),
        L(['互逆运算', '逆推填空', '乘回验算', '口诀为钥'])
      ]
    }),
    pt({
      id: 'p2b-div2-solve', title: '解决问题',
      summary: '「每几个一份」与「平均分成几份」都用除法：总数、份数、每份数知二求一。',
      keyPoints: [
        '三个量：**总数、份数、每份数**',
        '知二求一',
        '求份数或每份都用**除法**',
        '答语带单位'
      ],
      prereq: ['p2b-div2-blank'],
      viz: ['p2b-div2', '模式 3：知二求一', { mode: 3 }],
      apply: '45 瓶水每 9 瓶一箱装 5 箱：45 ÷ 9 = 5。',
      blocks: [
        P('除法应用**万能公式**：总数 ÷ 份数 = 每份；总数 ÷ 每份 = 份数。'),
        V('p2b-div2', '模式 3：三个量的关系', { mode: 3 }),
        P('审题先圈三个量：**哪个已知、哪个要求的**。'),
        L(['三量关系', '知二求一', '圈关键词', '单位对应'])
      ]
    })
  ],
  examples: [
    { id: 'p2b-div2-e1', point: 'p2b-div2-q7', title: '7 的口诀求商',
      question: '计算：42 ÷ 7。',
      steps: [
        { text: '想六七四十二。', math: '42 ÷ 7 = 6' }
      ],
      answer: '6' },
    { id: 'p2b-div2-e2', point: 'p2b-div2-q89', title: '8 的口诀求商',
      question: '计算：56 ÷ 8。',
      steps: [
        { text: '想七八五十六。', math: '56 ÷ 8 = 7' }
      ],
      answer: '7' },
    { id: 'p2b-div2-e3', point: 'p2b-div2-q89', title: '9 的口诀求商',
      question: '计算：81 ÷ 9。',
      steps: [
        { text: '想九九八十一。', math: '81 ÷ 9 = 9' }
      ],
      answer: '9' },
    { id: 'p2b-div2-e4', point: 'p2b-div2-blank', title: '填空',
      question: '（　）× 7 = 63。',
      steps: [
        { text: '想七九六十三。', math: '填 9' }
      ],
      answer: '9' },
    { id: 'p2b-div2-e5', point: 'p2b-div2-blank', title: '验算',
      question: '72 ÷ 8 = 9 对吗？验算。',
      steps: [
        { text: '商乘除数。', math: '9 × 8 = 72' },
        { text: '正确。', math: '' }
      ],
      answer: '对' },
    { id: 'p2b-div2-e6', point: 'p2b-div2-solve', title: '解决问题',
      question: '63 个乒乓球每 9 个装一筒，能装几筒？',
      steps: [
        { text: '总数 ÷ 每份。', math: '63 ÷ 9 = 7（筒）' }
      ],
      answer: '7 筒' }
  ],
  patterns: {
    asks: [
      { k: '7口诀商', desc: '7 的口诀求商' },
      { k: '89口诀商', desc: '8、9 的口诀求商' },
      { k: '逆推填空', desc: '口诀填未知数' },
      { k: '验算', desc: '乘回验证' },
      { k: '应用', desc: '平均分应用题' }
    ],
    features: [
      '想乘算除',
      '大口诀防混淆',
      '商 × 除数验算',
      '知二求一'
    ],
    patterns: [
      { no: '基础 1', id: 'p2b-div2-t-q7', title: '7 口诀求商', level: '基础', kind: '计算',
        asks: ['7口诀商'], signals: ['÷ 7'],
        chain: [{ point: 'p2b-div2-q7', role: '对口诀' }],
        locate: '想 7 的口诀。',
        stem: '计算：49 ÷ 7。',
        solution: [
          { text: '七七四十九。', math: '49 ÷ 7 = 7' }
        ],
        trap: '口诀背错。' },
      { no: '基础 2', id: 'p2b-div2-t-q89', title: '8、9 求商', level: '基础', kind: '计算',
        asks: ['89口诀商'], signals: ['÷ 8', '÷ 9'],
        chain: [{ point: 'p2b-div2-q89', role: '对口诀' }],
        locate: '想 8、9 口诀。',
        stem: '计算：64 ÷ 8。',
        solution: [
          { text: '八八六十四。', math: '64 ÷ 8 = 8' }
        ],
        trap: '与 6×8 混。' },
      { no: '中档 1', id: 'p2b-div2-t-blank', title: '逆推填空', level: '中档', kind: '计算',
        asks: ['逆推填空'], signals: ['（　）×'],
        chain: [{ point: 'p2b-div2-blank', role: '想口诀' }],
        locate: '想口诀填因数。',
        stem: '（　）× 9 = 54。',
        solution: [
          { text: '六九五十四。', math: '填 6' }
        ],
        trap: '想成除法。' },
      { no: '中档 2', id: 'p2b-div2-t-check', title: '验算', level: '中档', kind: '综合',
        asks: ['验算'], signals: ['验算'],
        chain: [{ point: 'p2b-div2-blank', role: '乘回' }],
        locate: '商 × 除数 = 被除数。',
        stem: '验算 45 ÷ 9 = 6 是否正确。',
        solution: [
          { text: '6 × 9 = 54 ≠ 45。', math: '' },
          { text: '不对，应为 5。', math: '' }
        ],
        trap: '验算不仔细。' },
      { no: '提升 1', id: 'p2b-div2-t-app', title: '应用题', level: '提升', kind: '综合',
        asks: ['应用'], signals: ['每', '能装'],
        chain: [{ point: 'p2b-div2-solve', role: '知二求一' }],
        locate: '圈三量定算式。',
        stem: '72 本书平均放在 8 个书架上，每个书架放几本？',
        solution: [
          { text: '72 ÷ 8。', math: '9（本）' }
        ],
        trap: '单位写错。' }
    ]
  }
});

/* ========== 第 5 单元 混合运算 ========== */
save('p2b-mixed', {
  meta: {
    id: 'p2b-mixed', title: '混合运算', grade: '二年级下册', bookNo: 5, order: 45,
    unit: true, status: 'done', prereqChapters: ['p2b-div2', 'p2a-mult2'],
    tagline: '运算顺序三条规：先乘除后加减、同级从左到右、有括号先括号——背熟不丢分。',
    textbook: '人教版二年级下册第五单元',
    intro: '混合运算的**运算顺序**是本章全部：① 有括号先算括号；② 没括号时**先乘除、后加减**；③ 同级运算**从左到右**。还会用**综合算式**把分步算式合并成一步（如 3 × 4 + 2），并能解决两步计算的问题。',
    examShare: '必考：判断运算顺序、脱式计算、列综合算式解应用题。失分点是不先算乘法、脱式格式错（丢了第一步）。',
    emoji: '🧮'
  },
  points: [
    pt({
      id: 'p2b-mixed-order', title: '先乘除，后加减',
      summary: '加减乘除混在一起：先算乘除，再算加减。20 − 8 ÷ 2：先 8 ÷ 2 = 4，再 20 − 4 = 16。',
      keyPoints: [
        '**先乘除，后加减**',
        '乘除是「高级运算」优先算',
        '加减在哪边都**后算**',
        '先算的部分用下划线标记'
      ],
      viz: ['p2b-mixed', '模式 0：谁先算', { mode: 0 }],
      apply: '买东西：3 元一件买 4 件再付 5 元车费，总价 3 × 4 + 5。',
      blocks: [
        P('为什么乘除优先？因为**乘除是「几份」的问题**，要先算出总量。'),
        V('p2b-mixed', '模式 0：乘除插队', { mode: 0 }),
        P('脱式计算：**先写整体、再一步步算**，等号对齐。'),
        L(['乘除优先', '加减随后', '脱式规范', '标记先算'])
      ]
    }),
    pt({
      id: 'p2b-mixed-left', title: '同级运算从左到右',
      summary: '只有加减或只有乘除：从左往右依次算。30 − 8 + 5：先 30 − 8 = 22，再 22 + 5 = 27。',
      keyPoints: [
        '同**一级**运算：**从左到右**',
        '只有加减 → 从左算',
        '只有乘除 → 从左算',
        '两边都有乘除也**按顺序**'
      ],
      prereq: ['p2b-mixed-order'],
      viz: ['p2b-mixed', '模式 1：从左往右', { mode: 1 }],
      apply: '排队结账：一张一张算，不跳步。',
      blocks: [
        P('同级运算**没有特权**，谁在左谁先算。'),
        V('p2b-mixed', '模式 1：排队依次算', { mode: 1 }),
        P('常见错误：8 ÷ 2 × 3 先算 2 × 3——错！**从左到右**是 8 ÷ 2 = 4，4 × 3 = 12。'),
        L(['左到右', '同级无特权', '不跳步', '防惯性错误'])
      ]
    }),
    pt({
      id: 'p2b-mixed-paren', title: '有括号先算括号',
      summary: '括号是最高优先级：(30 − 8) + 5 先算 30 − 8；18 ÷ (3 + 3) 先算 3 + 3 = 6。',
      keyPoints: [
        '**括号 > 乘除 > 加减**',
        '括号改变顺序',
        '18 ÷ (3 + 3)：先 6，再 18 ÷ 6 = 3',
        '对比有无括号的**两个结果**'
      ],
      prereq: ['p2b-mixed-order'],
      viz: ['p2b-mixed', '模式 2：括号最优先', { mode: 2 }],
      apply: '全班 30 人分组：男生 8 人一组，剩下的人每组 4 人，(30 − 8) ÷ 4。',
      blocks: [
        P('括号像「**先做完这件事**」的指令。'),
        V('p2b-mixed', '模式 2：墙里先算', { mode: 2 }),
        P('经典对比：18 ÷ 3 + 3 = 9，而 18 ÷ (3 + 3) = 3——**括号威力大**。'),
        L(['括号第一', '改变顺序', '结果不同', '看清括号'])
      ]
    }),
    pt({
      id: 'p2b-mixed-solve', title: '列综合算式解决问题',
      summary: '两步应用题用综合算式：每本 3 元买 4 本、付 20 元找回多少？20 − 3 × 4 = 8（元）。',
      keyPoints: [
        '两步问题**列综合算式**',
        '按运算顺序**自动分步**',
        '必要时**加括号**（如 20 − (5 + 3)）',
        '答语完整带单位'
      ],
      prereq: ['p2b-mixed-paren'],
      viz: ['p2b-mixed', '模式 3：一步列两步算', { mode: 3 }],
      apply: '买东西找零是最常见的两步问题。',
      blocks: [
        P('分步：3 × 4 = 12，20 − 12 = 8。综合：**20 − 3 × 4 = 8**。'),
        V('p2b-mixed', '模式 3：分步合一体', { mode: 3 }),
        P('若第一步是**加减**，必须加括号：20 − (5 + 3)。'),
        L(['综合算式', '顺序自动', '该加括号就加', '答完整'])
      ]
    })
  ],
  examples: [
    { id: 'p2b-mixed-e1', point: 'p2b-mixed-order', title: '先乘除',
      question: '计算：25 − 10 ÷ 5。',
      steps: [
        { text: '先算除法。', math: '10 ÷ 5 = 2' },
        { text: '再算减法。', math: '25 − 2 = 23' }
      ],
      answer: '23' },
    { id: 'p2b-mixed-e2', point: 'p2b-mixed-order', title: '先乘后加',
      question: '计算：6 × 4 + 8。',
      steps: [
        { text: '先乘。', math: '6 × 4 = 24' },
        { text: '再加。', math: '24 + 8 = 32' }
      ],
      answer: '32' },
    { id: 'p2b-mixed-e3', point: 'p2b-mixed-left', title: '同级从左到右',
      question: '计算：8 ÷ 2 × 3。',
      steps: [
        { text: '从左到右。', math: '8 ÷ 2 = 4' },
        { text: '再乘。', math: '4 × 3 = 12' }
      ],
      answer: '12' },
    { id: 'p2b-mixed-e4', point: 'p2b-mixed-paren', title: '括号优先',
      question: '计算：(25 − 13) ÷ 4。',
      steps: [
        { text: '先括号。', math: '25 − 13 = 12' },
        { text: '再除。', math: '12 ÷ 4 = 3' }
      ],
      answer: '3' },
    { id: 'p2b-mixed-e5', point: 'p2b-mixed-paren', title: '括号对比',
      question: '计算 18 ÷ 3 + 3 和 18 ÷ (3 + 3)。',
      steps: [
        { text: '无括号：18 ÷ 3 = 6，6 + 3 = 9。', math: '' },
        { text: '有括号：3 + 3 = 6，18 ÷ 6 = 3。', math: '' }
      ],
      answer: '9；3' },
    { id: 'p2b-mixed-e6', point: 'p2b-mixed-solve', title: '综合算式',
      question: '每支笔 3 元，买 5 支，付 20 元找回多少？列综合算式。',
      steps: [
        { text: '先算花掉的钱。', math: '3 × 5 = 15' },
        { text: '综合算式。', math: '20 − 3 × 5 = 5（元）' }
      ],
      answer: '5 元' }
  ],
  patterns: {
    asks: [
      { k: '运算顺序', desc: '判断先算什么' },
      { k: '脱式', desc: '脱式计算规范' },
      { k: '同级运算', desc: '从左到右' },
      { k: '括号', desc: '含括号的计算' },
      { k: '综合算式', desc: '两步应用题' }
    ],
    features: [
      '先乘除后加减',
      '同级从左到右',
      '括号最优先',
      '应用题列综合算式'
    ],
    patterns: [
      { no: '基础 1', id: 'p2b-mixed-t-order', title: '运算顺序', level: '基础', kind: '计算',
        asks: ['运算顺序'], signals: ['先算什么'],
        chain: [{ point: 'p2b-mixed-order', role: '乘除优先' }],
        locate: '找乘除先算。',
        stem: '16 − 6 × 2 先算什么？',
        solution: [
          { text: '先算 6 × 2 = 12。', math: '' },
          { text: '再 16 − 12 = 4。', math: '' }
        ],
        trap: '从左到右算成 20。' },
      { no: '基础 2', id: 'p2b-mixed-t-left', title: '同级运算', level: '基础', kind: '计算',
        asks: ['同级运算'], signals: ['连加连减'],
        chain: [{ point: 'p2b-mixed-left', role: '左到右' }],
        locate: '依次算。',
        stem: '计算：36 ÷ 6 ÷ 2。',
        solution: [
          { text: '36 ÷ 6 = 6。', math: '' },
          { text: '6 ÷ 2 = 3。', math: '' }
        ],
        trap: '先算 6 × 2。' },
      { no: '中档 1', id: 'p2b-mixed-t-paren', title: '括号计算', level: '中档', kind: '计算',
        asks: ['括号'], signals: ['（　）'],
        chain: [{ point: 'p2b-mixed-paren', role: '括号优先' }],
        locate: '括号内先算。',
        stem: '计算：(9 + 6) ÷ 3。',
        solution: [
          { text: '括号 15。', math: '' },
          { text: '15 ÷ 3 = 5。', math: '' }
        ],
        trap: '先算 6 ÷ 3。' },
      { no: '中档 2', id: 'p2b-mixed-t-contrast', title: '有无括号对比', level: '中档', kind: '概念',
        asks: ['括号'], signals: ['比较'],
        chain: [{ point: 'p2b-mixed-paren', role: '对比结果' }],
        locate: '各算一遍比结果。',
        stem: '30 − 10 − 5 和 30 − (10 − 5) 结果相同吗？',
        solution: [
          { text: '前者 15。', math: '' },
          { text: '后者 25。不同。', math: '' }
        ],
        trap: '以为一样。' },
      { no: '提升 1', id: 'p2b-mixed-t-solve', title: '综合算式应用', level: '提升', kind: '综合',
        asks: ['综合算式'], signals: ['列式', '还剩'],
        chain: [{ point: 'p2b-mixed-solve', role: '两步合一' }],
        locate: '分步想清，综合列出。',
        stem: '妈妈买 4 千克苹果每千克 5 元，付 50 元找回多少？列综合算式。',
        solution: [
          { text: '50 − 5 × 4。', math: '= 30（元）' }
        ],
        trap: '不写综合算式直接分步。' }
    ]
  }
});

/* ========== 第 6 单元 有余数的除法 ========== */
save('p2b-rem', {
  meta: {
    id: 'p2b-rem', title: '有余数的除法', grade: '二年级下册', bookNo: 6, order: 46,
    unit: true, status: 'done', prereqChapters: ['p2b-div1'],
    tagline: '分不完就剩下来：13 ÷ 4 = 3……1——余数一定要比除数小，这是铁律。',
    textbook: '人教版二年级下册第六单元',
    intro: '平均分分不完怎么办？**剩下的就是余数**：13 ÷ 4 = 3……1（读作 3 余 1）。两条铁律：**余数 < 除数**；**被除数 = 商 × 除数 + 余数**（验算用）。应用里最有趣的是「进一法」（坐船要加一条）和「去尾法」（做衣服只能舍去）。',
    examShare: '必考：有余数除法计算、余数与除数大小关系、验算、进一与去尾问题。失分点是余数 ≥ 除数、应用题该进一却去尾。',
    emoji: '🧩'
  },
  points: [
    pt({
      id: 'p2b-rem-mean', title: '有余数除法的意义',
      summary: '平均分后有剩余：13 根小棒每 4 根摆一个正方形，摆 3 个还剩 1 根——13 ÷ 4 = 3……1。',
      keyPoints: [
        '**分不完的剩余 = 余数**',
        '算式：13 ÷ 4 = **3……1**（商 3 余 1）',
        '读法：13 除以 4 **商 3 余 1**',
        '余数单位与总数相同'
      ],
      viz: ['p2b-rem', '模式 0：摆不完的剩下来', { mode: 0 }],
      apply: '11 颗糖平均分给 2 人：每人 5 颗剩 1 颗。',
      blocks: [
        P('分东西分到最后**不够再分一份**，剩下的就是余数。'),
        V('p2b-rem', '模式 0：圈一圈剩一截', { mode: 0 }),
        P('写法：**商……余数**，中间六个点。'),
        L(['不够再分', '余数记尾部', '商在前余在后', '单位跟总数'])
      ]
    }),
    pt({
      id: 'p2b-rem-rule', title: '余数与除数的关系',
      summary: '余数必须比除数小：除数是 4，余数只能是 1、2、3——如果余 4，就还能再分一份。',
      keyPoints: [
        '**余数 < 除数**（铁律）',
        '除数是 5，余数最大 **4**',
        '余数若等于或大于除数，说明**还能再分**',
        '利用关系可求**最大的余数**或**最小的除数**'
      ],
      prereq: ['p2b-rem-mean'],
      viz: ['p2b-rem', '模式 1：余数为什么要小', { mode: 1 }],
      apply: '□ ÷ 6 = 8……□，余数最大是 5。',
      blocks: [
        P('余 4 还能再分——所以**余数永远比除数小**。'),
        V('p2b-rem', '模式 1：再分一份试试', { mode: 1 }),
        P('常考反问：**余数最大是几？除数最小是几？**都由这条铁律倒推。'),
        L(['余 < 除', '最大余数 = 除 − 1', '最小除数 = 余 + 1', '铁律必守'])
      ]
    }),
    pt({
      id: 'p2b-rem-calc', title: '有余数除法的计算与验算',
      summary: '试商想口诀：43 ÷ 7，想六七四十二（七七四十九超了），商 6 余 1。验算：商 × 除数 + 余数 = 被除数。',
      keyPoints: [
        '试商：**口诀里最接近**被除数的',
        '**商 × 除数 + 余数 = 被除数**',
        '验算三步：乘、加、比对',
        '余数不能等于或超过除数'
      ],
      prereq: ['p2b-rem-rule'],
      viz: ['p2b-rem', '模式 2：试商与验算', { mode: 2 }],
      apply: '验算 43 ÷ 7 = 6……1：6 × 7 + 1 = 43 ✓。',
      blocks: [
        P('试商原则：**积最接近被除数且不超过**。'),
        V('p2b-rem', '模式 2：口诀卡位', { mode: 2 }),
        P('验算公式：**被除数 = 商 × 除数 + 余数**。'),
        L(['试商贴着算', '不超被除数', '乘加验算', '余数检查'])
      ]
    }),
    pt({
      id: 'p2b-rem-solve', title: '进一法与去尾法',
      summary: '坐船「至少」要几条：余 1 人也要加 1 条（进一）；做衣服布料不够就舍去（去尾）。',
      keyPoints: [
        '**进一法**：问「至少需要几个」→ 商 + 1',
        '**去尾法**：问「最多能做几个」→ 商',
        '看问题关键词：**至少 / 最多**',
        '答语说明理由'
      ],
      prereq: ['p2b-rem-calc'],
      viz: ['p2b-rem', '模式 3：进一还是去尾', { mode: 3 }],
      apply: '27 人每条船坐 4 人：27 ÷ 4 = 6……3，要 7 条船（进一）。',
      blocks: [
        P('进一还是去尾，看**剩下的有没有用**：人要上船 → 进一；布不够做衣 → 去尾。'),
        V('p2b-rem', '模式 3：加 1 还是不加', { mode: 3 }),
        P('「至少」两个字出现，**基本都要进一**。'),
        L(['至少进一', '最多去尾', '看余数用处', '答要说理'])
      ]
    })
  ],
  examples: [
    { id: 'p2b-rem-e1', point: 'p2b-rem-mean', title: '有余数算式',
      question: '17 ÷ 5 = ？',
      steps: [
        { text: '三五十五，还剩 2。', math: '17 ÷ 5 = 3……2' }
      ],
      answer: '3……2' },
    { id: 'p2b-rem-e2', point: 'p2b-rem-rule', title: '最大余数',
      question: '一道除法算式除数是 8，余数最大是几？',
      steps: [
        { text: '余数 < 除数。', math: '最大 7' }
      ],
      answer: '7' },
    { id: 'p2b-rem-e3', point: 'p2b-rem-rule', title: '最小除数',
      question: '一道有余数除法，余数是 6，除数最小是几？',
      steps: [
        { text: '除数 > 余数。', math: '最小 7' }
      ],
      answer: '7' },
    { id: 'p2b-rem-e4', point: 'p2b-rem-calc', title: '试商与验算',
      question: '计算 50 ÷ 6 并验算。',
      steps: [
        { text: '六八四十八。', math: '50 ÷ 6 = 8……2' },
        { text: '验算。', math: '8 × 6 + 2 = 50 ✓' }
      ],
      answer: '8……2' },
    { id: 'p2b-rem-e5', point: 'p2b-rem-solve', title: '进一法',
      question: '23 人划船，每条船坐 4 人，至少要几条船？',
      steps: [
        { text: '23 ÷ 4 = 5……3。', math: '' },
        { text: '剩 3 人也要上船。', math: '5 + 1 = 6（条）' }
      ],
      answer: '6 条' },
    { id: 'p2b-rem-e6', point: 'p2b-rem-solve', title: '去尾法',
      question: '50 元钱买 8 元一支的钢笔，最多能买几支？',
      steps: [
        { text: '50 ÷ 8 = 6……2。', math: '' },
        { text: '剩 2 元不够再买。', math: '6 支' }
      ],
      answer: '6 支' }
  ],
  patterns: {
    asks: [
      { k: '有余数计算', desc: '商与余数' },
      { k: '余除关系', desc: '余数与除数大小' },
      { k: '验算', desc: '乘加验算' },
      { k: '进一法', desc: '至少需要几个' },
      { k: '去尾法', desc: '最多能做几个' }
    ],
    features: [
      '余数必须小于除数',
      '试商贴着被除数',
      '验算商乘除加余',
      '至少进一、最多去尾'
    ],
    patterns: [
      { no: '基础 1', id: 'p2b-rem-t-calc', title: '有余数计算', level: '基础', kind: '计算',
        asks: ['有余数计算'], signals: ['÷'],
        chain: [{ point: 'p2b-rem-calc', role: '试商' }],
        locate: '口诀卡位，写余数。',
        stem: '计算：29 ÷ 4。',
        solution: [
          { text: '四七二十八。', math: '29 ÷ 4 = 7……1' }
        ],
        trap: '余数 ≥ 除数。' },
      { no: '基础 2', id: 'p2b-rem-t-rule', title: '余除关系', level: '基础', kind: '概念',
        asks: ['余除关系'], signals: ['余数最大', '除数最小'],
        chain: [{ point: 'p2b-rem-rule', role: '铁律倒推' }],
        locate: '余 < 除。',
        stem: '除数是 5，余数最大是几？',
        solution: [
          { text: '5 − 1。', math: '4' }
        ],
        trap: '答 5。' },
      { no: '中档 1', id: 'p2b-rem-t-check', title: '验算', level: '中档', kind: '综合',
        asks: ['验算'], signals: ['验算'],
        chain: [{ point: 'p2b-rem-calc', role: '乘加验算' }],
        locate: '商 × 除数 + 余数。',
        stem: '验算 38 ÷ 5 = 7……3。',
        solution: [
          { text: '7 × 5 + 3 = 38 ✓', math: '' }
        ],
        trap: '忘加余数。' },
      { no: '中档 2', id: 'p2b-rem-t-in', title: '进一法', level: '中档', kind: '应用',
        asks: ['进一法'], signals: ['至少', '都要'],
        chain: [{ point: 'p2b-rem-solve', role: '商 + 1' }],
        locate: '有余数就加 1。',
        stem: '31 名同学租车，每辆车坐 6 人，至少租几辆？',
        solution: [
          { text: '31 ÷ 6 = 5……1。', math: '' },
          { text: '5 + 1 = 6（辆）' }
        ],
        trap: '答 5 辆。' },
      { no: '提升 1', id: 'p2b-rem-t-out', title: '去尾法', level: '提升', kind: '综合',
        asks: ['去尾法'], signals: ['最多', '能做'],
        chain: [{ point: 'p2b-rem-solve', role: '只取商' }],
        locate: '余数不够就用不上。',
        stem: '做一只风筝要 3 米布，20 米布最多做几只？',
        solution: [
          { text: '20 ÷ 3 = 6……2。', math: '6 只' }
        ],
        trap: '进一答 7。' }
    ]
  }
});

/* ========== 第 7 单元 万以内数的认识 ========== */
save('p2b-wan', {
  meta: {
    id: 'p2b-wan', title: '万以内数的认识', grade: '二年级下册', bookNo: 7, order: 47,
    unit: true, status: 'done', prereqChapters: ['p1b-100'],
    tagline: '10 个一百是一千、10 个一千是一万——数位家族添了千位，读写依旧从高位起。',
    textbook: '人教版二年级下册第七单元',
    intro: '数位制再扩张：**千位、万位**登场。会数万以内的数（9999 后面是 10000）、读写（中间有 0 要读「零」、末尾的 0 不读）、组成（几个千几个十几个一）、比大小（先数位数）。近似数（约 3000 人）也首次出现。',
    examShare: '必考：读写万以内数（尤其中间末尾的 0）、组成、比大小、找近似数。失分点是中间的 0 漏读或多读。',
    emoji: '🏔️'
  },
  points: [
    pt({
      id: 'p2b-wan-unit', title: '千与万的认识',
      summary: '10 个一百是一千、10 个一千是一万；千位万位都是新朋友。',
      keyPoints: [
        '**10 个一百 = 1 千**',
        '**10 个一千 = 1 万**',
        '数位顺序：**个、十、百、千、万**',
        '9999 后面是 **10000**'
      ],
      viz: ['p2b-wan', '模式 0：一立方体一千', { mode: 0 }],
      apply: '一座千人礼堂、万人体育场，就在用这些数。',
      blocks: [
        P('计数单位一路升级：个 → 十 → 百 → **千 → 万**，每次都满十进一。'),
        V('p2b-wan', '模式 0：数位家族', { mode: 0 }),
        P('一万个一万是十万——以后还会继续长。'),
        L(['十进制不变', '千与万', '9999 → 10000', '数位顺序'])
      ]
    }),
    pt({
      id: 'p2b-wan-read', title: '万以内数的读写',
      summary: '从高位读写：3040 读作「三千零四十」——中间的 0 要读，末尾的 0 不读。',
      keyPoints: [
        '**从高位读写**',
        '**中间的 0 要读**「零」（一个或连续多个只读一个零）',
        '**末尾的 0 不读**',
        '写数时**空位补 0**'
      ],
      prereq: ['p2b-wan-unit'],
      viz: ['p2b-wan', '模式 1：零读不读', { mode: 1 }],
      apply: '车牌号、电话号里的 0 都在练读写。',
      blocks: [
        P('读写规则两条：**中间 0 读零、末尾 0 不读**。'),
        V('p2b-wan', '模式 1：3040 怎么读', { mode: 1 }),
        P('写数检查：**几位数就写几个数字**，缺位补 0（如四千零六写作 4006）。'),
        L(['高位起', '中间 0 读零', '末尾 0 不读', '补 0 占位'])
      ]
    }),
    pt({
      id: 'p2b-wan-cmp', title: '比大小',
      summary: '先数位数：位数多的数大；位数相同从最高位比起，一位一位往下比。',
      keyPoints: [
        '**位数多 > 位数少**',
        '位数相同，**从最高位比起**',
        '最高位相同，**看下一位**',
        '近似比较可先看**大致数量级**'
      ],
      prereq: ['p2b-wan-read'],
      viz: ['p2b-wan', '模式 2：先位数后逐位', { mode: 2 }],
      apply: '990 和 1000：位数 3 < 4，所以 990 < 1000。',
      blocks: [
        P('比大小第一步：**数位数**。999 < 1000，虽然 9 个 9 很大。'),
        V('p2b-wan', '模式 2：位数决胜', { mode: 2 }),
        P('同位数从最高位逐位比，**分出胜负即停**。'),
        L(['先数位数', '高位比起', '逐位推进', '即停原则'])
      ]
    }),
    pt({
      id: 'p2b-wan-near', title: '近似数',
      summary: '不需要精确时用近似数：学校有 1995 人，可以说「大约 2000 人」。',
      keyPoints: [
        '近似数 = **接近的整十整百整千**',
        '标志词：**大约、约、左右**',
        '接近谁就近似成谁',
        '近似数让**表达更方便**'
      ],
      prereq: ['p2b-wan-cmp'],
      viz: ['p2b-wan', '模式 3：接近哪个整数', { mode: 3 }],
      apply: '体育馆「约 5000 个座位」、人口「约 14 亿」——新闻里全是近似数。',
      blocks: [
        P('近似数不是乱猜：**找最接近的整十/百/千数**。'),
        V('p2b-wan', '模式 3：1995 → 2000', { mode: 3 }),
        P('一个数的近似数**不唯一**：1995 可约 2000，也可约 1990——看需要的精度。'),
        L(['找接近的整数', '大约 = 近似', '不唯一', '表达方便'])
      ]
    })
  ],
  examples: [
    { id: 'p2b-wan-e1', point: 'p2b-wan-unit', title: '计数单位',
      question: '10 个一千是多少？',
      steps: [
        { text: '满十进一。', math: '1 万' }
      ],
      answer: '一万' },
    { id: 'p2b-wan-e2', point: 'p2b-wan-read', title: '读数',
      question: '3040 读作什么？',
      steps: [
        { text: '三千 + 零 + 四十。', math: '三千零四十' }
      ],
      answer: '三千零四十' },
    { id: 'p2b-wan-e3', point: 'p2b-wan-read', title: '写数',
      question: '五千零六写作什么？',
      steps: [
        { text: '千位 5、个位 6，百位十位补 0。', math: '5006' }
      ],
      answer: '5006' },
    { id: 'p2b-wan-e4', point: 'p2b-wan-cmp', title: '比大小',
      question: '比较：998 ○ 1002。',
      steps: [
        { text: '位数 3 < 4。', math: '998 < 1002' }
      ],
      answer: '<' },
    { id: 'p2b-wan-e5', point: 'p2b-wan-cmp', title: '同位数比较',
      question: '比较：4520 ○ 4519。',
      steps: [
        { text: '前两位相同，十位 2 > 1。', math: '4520 > 4519' }
      ],
      answer: '>' },
    { id: 'p2b-wan-e6', point: 'p2b-wan-near', title: '近似数',
      question: '一台电视 1988 元，大约是多少元？',
      steps: [
        { text: '接近 2000。', math: '约 2000 元' }
      ],
      answer: '约 2000 元' }
  ],
  patterns: {
    asks: [
      { k: '计数单位', desc: '千与万' },
      { k: '读数', desc: '万以内读数' },
      { k: '写数', desc: '写数与补 0' },
      { k: '比大小', desc: '万以内比大小' },
      { k: '近似数', desc: '找近似数' }
    ],
    features: [
      '满十进一不变',
      '中间 0 读零、末尾 0 不读',
      '先数位数再逐位比',
      '近似找最接近整数'
    ],
    patterns: [
      { no: '基础 1', id: 'p2b-wan-t-unit', title: '计数单位', level: '基础', kind: '概念',
        asks: ['计数单位'], signals: ['个一千', '个一百'],
        chain: [{ point: 'p2b-wan-unit', role: '满十进一' }],
        locate: '按进率回答。',
        stem: '10 个一万是多少？',
        solution: [
          { text: '十万。', math: '' }
        ],
        trap: '说成一万。' },
      { no: '基础 2', id: 'p2b-wan-t-read', title: '读数', level: '基础', kind: '计算',
        asks: ['读数'], signals: ['读作'],
        chain: [{ point: 'p2b-wan-read', role: '零的规则' }],
        locate: '中间读零末尾不读。',
        stem: '6005 读作什么？',
        solution: [
          { text: '两个 0 只读一个零。', math: '六千零五' }
        ],
        trap: '读两个零。' },
      { no: '中档 1', id: 'p2b-wan-t-write', title: '写数', level: '中档', kind: '计算',
        asks: ['写数'], signals: ['写作'],
        chain: [{ point: 'p2b-wan-read', role: '补 0' }],
        locate: '按数位补 0。',
        stem: '八千零八十写作什么？',
        solution: [
          { text: '千 8、十 8，其余补 0。', math: '8080' }
        ],
        trap: '写成 880。' },
      { no: '中档 2', id: 'p2b-wan-t-cmp', title: '比大小', level: '中档', kind: '概念',
        asks: ['比大小'], signals: ['><='],
        chain: [{ point: 'p2b-wan-cmp', role: '位数与逐位' }],
        locate: '先位数后逐位。',
        stem: '比较：999 ○ 1000。',
        solution: [
          { text: '位数 3 < 4。', math: '999 < 1000' }
        ],
        trap: '以为 999 更大。' },
      { no: '提升 1', id: 'p2b-wan-t-near', title: '近似数', level: '提升', kind: '综合',
        asks: ['近似数'], signals: ['大约', '约'],
        chain: [{ point: 'p2b-wan-near', role: '找接近整数' }],
        locate: '找最近的整百整千。',
        stem: '一本书有 498 页，大约多少页？一辆车 3020 元呢？',
        solution: [
          { text: '约 500 页。', math: '' },
          { text: '约 3000 元。', math: '' }
        ],
        trap: '乱凑整。' }
    ]
  }
});

/* ========== 第 8 单元 克和千克 ========== */
save('p2b-weight', {
  meta: {
    id: 'p2b-weight', title: '克和千克', grade: '二年级下册', bookNo: 8, order: 48,
    unit: true, status: 'done', prereqChapters: ['p1b-100'],
    tagline: '一枚 2 分硬币约重 1 克、两袋盐重 1 千克——轻的用克、重的用千克，1 千克 = 1000 克。',
    textbook: '人教版二年级下册第八单元',
    intro: '质量单位第一次亮相：**克（g）量轻的**（一枚硬币、一颗糖），**千克（kg）量重的**（两袋盐、一袋大米）。**1 千克 = 1000 克**。认识天平、电子秤、盘秤；会估计物品轻重并选择合适的单位。',
    examShare: '必考：填合适的单位、千克克换算、看秤读数、估测。失分点是单位选错（一个苹果重 200 千克）和换算进率记错。',
    emoji: '⚖️'
  },
  points: [
    pt({
      id: 'p2b-weight-g', title: '克的相识',
      summary: '克是较小的质量单位：1 枚 2 分硬币约重 1 克；计量较轻物品用克（g）。',
      keyPoints: [
        '**克（g）**：量较轻物品',
        '1 枚 2 分硬币 ≈ **1 克**',
        '常见的克：糖 5 克、饼干 100 克',
        '用**天平**称很轻的东西'
      ],
      viz: ['p2b-weight', '模式 0：一克有多重', { mode: 0 }],
      apply: '食品包装上的「净含量 250g」就是克。',
      blocks: [
        P('掂一掂硬币：**这就是 1 克的手感**。'),
        V('p2b-weight', '模式 0：克的天平', { mode: 0 }),
        P('估重量用参照物：一颗糖约 5 克、一个鸡蛋约 50 克。'),
        L(['克量轻物', '硬币 1 克', '参照估重', '天平称轻'])
      ]
    }),
    pt({
      id: 'p2b-weight-kg', title: '千克的相识',
      summary: '千克是较大的质量单位：2 袋盐（每袋 500 克）正好 1 千克。',
      keyPoints: [
        '**千克（kg）**：量较重物品',
        '**2 袋 500 克的盐 = 1 千克**',
        '1 千克 = **1000 克**',
        '用**盘秤、电子秤**称'
      ],
      prereq: ['p2b-weight-g'],
      viz: ['p2b-weight', '模式 1：两袋盐一千克', { mode: 1 }],
      apply: '买水果按千克称重——超市电子秤显示 kg。',
      blocks: [
        P('1 千克 = 1000 克，**进率是一千**。'),
        V('p2b-weight', '模式 1：进率 1000', { mode: 1 }),
        P('感受 1 千克：两瓶 500 mL 矿泉水差不多。'),
        L(['千克量重物', '进率 1000', '两瓶水 1 kg', '秤选择'])
      ]
    }),
    pt({
      id: 'p2b-weight-scale', title: '认识秤与读数',
      summary: '常见秤有天平、电子秤、盘秤、弹簧秤；读数看单位和指针（或数字）。',
      keyPoints: [
        '**天平**：比较轻重',
        '**电子秤**：直接显示数字',
        '读数先看**单位**（g 还是 kg）',
        '指针秤看**刻度对齐**'
      ],
      prereq: ['p2b-weight-kg'],
      viz: ['p2b-weight', '模式 2：秤上读数', { mode: 2 }],
      apply: '菜市场的盘秤、快递站的电子秤。',
      blocks: [
        P('读秤两步：**看单位、读数字**。'),
        V('p2b-weight', '模式 2：指针指哪里', { mode: 2 }),
        P('天平平衡说明**两边一样重**——砝码总量就是物体重量。'),
        L(['先看单位', '指针读刻度', '天平比轻重', '电子直读'])
      ]
    }),
    pt({
      id: 'p2b-weight-est', title: '估测与合理单位',
      summary: '填单位靠想象实物：一个苹果约 200 克、一头牛约 300 千克——太大太小都不合理。',
      keyPoints: [
        '想象**实物大小**选单位',
        '常见的参照：鸡蛋 50 g、西瓜 4 kg、人 30 kg',
        '换算后再比较',
        '检查**合理性**'
      ],
      prereq: ['p2b-weight-scale'],
      viz: ['p2b-weight', '模式 3：选对单位', { mode: 3 }],
      apply: '「一只鸡重 2（千克）」合理；「2 克」就像一颗纽扣。',
      blocks: [
        P('单位选错闹笑话：**一个苹果 200 千克**？那是两头猪。'),
        V('p2b-weight', '模式 3：合理检查', { mode: 3 }),
        P('估完再换算验证：2 kg = 2000 g，接近实际。'),
        L(['想象实物', '参照估测', '换算验证', '合理即对'])
      ]
    })
  ],
  examples: [
    { id: 'p2b-weight-e1', point: 'p2b-weight-g', title: '克的认识',
      question: '1 枚 2 分硬币大约重多少？',
      steps: [
        { text: '约 1 克。', math: '' }
      ],
      answer: '1 克' },
    { id: 'p2b-weight-e2', point: 'p2b-weight-kg', title: '进率换算',
      question: '3 千克 = （　）克。',
      steps: [
        { text: '1 千克 = 1000 克。', math: '3000 克' }
      ],
      answer: '3000 克' },
    { id: 'p2b-weight-e3', point: 'p2b-weight-kg', title: '反换算',
      question: '5000 克 = （　）千克。',
      steps: [
        { text: '1000 克 = 1 千克。', math: '5 千克' }
      ],
      answer: '5 千克' },
    { id: 'p2b-weight-e4', point: 'p2b-weight-scale', title: '读秤',
      question: '电子秤显示「1.5 kg」，是多重？',
      steps: [
        { text: '单位 kg。', math: '1 千克 500 克（1500 克）' }
      ],
      answer: '1 千克 500 克' },
    { id: 'p2b-weight-e5', point: 'p2b-weight-est', title: '填单位',
      question: '填单位：一个西瓜约 4（　）；一块橡皮约 10（　）。',
      steps: [
        { text: '想象实物。', math: '' },
        { text: '千克；克。', math: '' }
      ],
      answer: '千克；克' },
    { id: 'p2b-weight-e6', point: 'p2b-weight-est', title: '比轻重',
      question: '1 千克棉花和 1 千克铁哪个重？',
      steps: [
        { text: '质量相等。', math: '' },
        { text: '一样重。', math: '' }
      ],
      answer: '一样重' }
  ],
  patterns: {
    asks: [
      { k: '选单位', desc: '克与千克的选择' },
      { k: '换算', desc: '千克与克互化' },
      { k: '读秤', desc: '从秤上读质量' },
      { k: '估测', desc: '估物品质量' },
      { k: '比较', desc: '比较轻重' }
    ],
    features: [
      '克量轻、千克量重',
      '1 千克 = 1000 克',
      '读秤先看单位',
      '参照物估测'
    ],
    patterns: [
      { no: '基础 1', id: 'p2b-weight-t-unit', title: '选单位', level: '基础', kind: '概念',
        asks: ['选单位'], signals: ['填 g 或 kg'],
        chain: [{ point: 'p2b-weight-est', role: '想象实物' }],
        locate: '轻用克、重用千克。',
        stem: '一个书包约重 2（　）。',
        solution: [
          { text: '书包不轻。', math: '千克' }
        ],
        trap: '填成克。' },
      { no: '基础 2', id: 'p2b-weight-t-conv', title: '换算', level: '基础', kind: '计算',
        asks: ['换算'], signals: ['= g', '= kg'],
        chain: [{ point: 'p2b-weight-kg', role: '进率 1000' }],
        locate: '乘或除 1000。',
        stem: '6 千克 = （　）克。',
        solution: [
          { text: '6 × 1000。', math: '6000 克' }
        ],
        trap: '乘 100。' },
      { no: '中档 1', id: 'p2b-weight-t-scale', title: '读秤', level: '中档', kind: '应用',
        asks: ['读秤'], signals: ['秤上显示'],
        chain: [{ point: 'p2b-weight-scale', role: '单位 + 数字' }],
        locate: '先看单位再读数。',
        stem: '盘秤上放苹果指针指 3（单位 kg），苹果多重？',
        solution: [
          { text: '3 千克。', math: '' }
        ],
        trap: '当成 3 克。' },
      { no: '中档 2', id: 'p2b-weight-t-est', title: '估测', level: '中档', kind: '综合',
        asks: ['估测'], signals: ['大约', '估一估'],
        chain: [{ point: 'p2b-weight-est', role: '参照估重' }],
        locate: '用常见物品做参照。',
        stem: '一个西瓜约 4 千克，两个这样的西瓜约多重？',
        solution: [
          { text: '4 × 2。', math: '8 千克' }
        ],
        trap: '估得太离谱。' },
      { no: '提升 1', id: 'p2b-weight-t-compare', title: '比较轻重', level: '提升', kind: '综合',
        asks: ['比较'], signals: ['哪个重'],
        chain: [{ point: 'p2b-weight-kg', role: '统一单位' }],
        locate: '先统一单位再比。',
        stem: '800 克和 1 千克，哪个重？',
        solution: [
          { text: '1 千克 = 1000 克。', math: '' },
          { text: '1 千克重。', math: '' }
        ],
        trap: '只比数字 800 与 1。' }
    ]
  }
});

/* ========== 第 9 单元 数学广角——推理 ========== */
save('p2b-logic', {
  meta: {
    id: 'p2b-logic', title: '数学广角——推理', grade: '二年级下册', bookNo: 9, order: 49,
    unit: true, status: 'done', prereqChapters: ['p2a-match'],
    tagline: '推理像侦探破案：「不是……就是……」——确定一个，排除一个，答案就浮出水面。',
    textbook: '人教版二年级下册第九单元（数学广角）',
    intro: '简单的推理训练：小红、小丽、小刚三人拿着语文、数学、英语书——「小红拿语文，小丽拿的不是数学」→ 层层排除推出结论。方法：**确定已知的 → 排除不可能 → 得出结论**，并用表格或连线把思考过程**呈现出来**。',
    examShare: '必考：文字推理（不是…就是…）、表格推理、数独雏形。失分点是推理跳跃、不写依据。',
    emoji: '🔍'
  },
  points: [
    pt({
      id: 'p2b-logic-two', title: '两个条件的推理',
      summary: '两个东西两种情况：不是这个，就是那个——「小红拿的不是数学书」+ 只有语文数学 → 拿语文。',
      keyPoints: [
        '只有两种可能：**否定一个即确定另一个**',
        '句式：「**不是……就是……**」',
        '推理要**有依据**',
        '结论要**检验一遍**'
      ],
      viz: ['p2b-logic', '模式 0：不是它就是它', { mode: 0 }],
      apply: '两只手套颜色一红一蓝，左手不是红的，那一定是蓝的。',
      blocks: [
        P('最简单的推理：**排除法**。两种可能去掉一种，剩一种就是答案。'),
        V('p2b-logic', '模式 0：二选一', { mode: 0 }),
        P('说理格式：「因为……不是……，所以……一定是……」。'),
        L(['排除法', '二选一', '说依据', '再检验'])
      ]
    }),
    pt({
      id: 'p2b-logic-three', title: '三个条件的推理',
      summary: '三人三样东西：先确定有线索的人，再用「不是」排除，逐步缩小到唯一答案。',
      keyPoints: [
        '**先确定最有线索的**',
        '逐个**排除**已确定的',
        '推理像**多米诺**：一环扣一环',
        '把结论**带回检验**'
      ],
      prereq: ['p2b-logic-two'],
      viz: ['p2b-logic', '模式 1：一环扣一环', { mode: 1 }],
      apply: '三人三科书：小红语文 → 小丽不是数学 → 小丽英语 → 小刚数学。',
      blocks: [
        P('三物推理从**确定的那个人**开始，像推倒第一块骨牌。'),
        V('p2b-logic', '模式 1：骨牌式推理', { mode: 1 }),
        P('每排除一个就**缩小范围**，最后只剩唯一解。'),
        L(['先找确定项', '连环排除', '缩到唯一', '回查'])
      ]
    }),
    pt({
      id: 'p2b-logic-table', title: '用表格帮助推理',
      summary: '复杂推理画表格：行是人、列是物，确定打 √、排除打 ×，表格会「自动」给出答案。',
      keyPoints: [
        '画**人 × 物表格**',
        '确定画 **√**，排除画 **×**',
        '**一行或一列**只剩一格即为答案',
        '表格让思路**看得见**'
      ],
      prereq: ['p2b-logic-three'],
      viz: ['p2b-logic', '模式 2：表格打勾叉', { mode: 2 }],
      apply: '数独就是高级版表格推理。',
      blocks: [
        P('表格推理：每行每列**只能一个 √**——这就是约束。'),
        V('p2b-logic', '模式 2：√× 齐上阵', { mode: 2 }),
        P('出现一行全 × 或全 √ 时，答案自动浮出。'),
        L(['表格化', '√×标记', '行列约束', '思路可视化'])
      ]
    }),
    pt({
      id: 'p2b-logic-num', title: '数与格子中的推理',
      summary: '在方格中填数：每行每列数字不重复，用排除法确定每个格子的数。',
      keyPoints: [
        '规则：**行列不重复**',
        '从**限制最多**的格子入手',
        '排除已出现的数',
        '数独的**雏形练习**'
      ],
      prereq: ['p2b-logic-table'],
      viz: ['p2b-logic', '模式 3：格子排除填数', { mode: 3 }],
      apply: '三阶数独：每行每列 1、2、3 各出现一次。',
      blocks: [
        P('格子推理：**看哪格选择最少**，先攻它。'),
        V('p2b-logic', '模式 3：候选数排除', { mode: 3 }),
        P('这就是**数独**的基本功。'),
        L(['找限制多', '排除填入', '行列检查', '数独雏形'])
      ]
    })
  ],
  examples: [
    { id: 'p2b-logic-e1', point: 'p2b-logic-two', title: '二选一',
      question: '口袋里有红球和蓝球各一个，摸出的不是红球，是什么球？',
      steps: [
        { text: '不是红球。', math: '' },
        { text: '是蓝球。', math: '' }
      ],
      answer: '蓝球' },
    { id: 'p2b-logic-e2', point: 'p2b-logic-two', title: '说依据',
      question: '为什么能确定是蓝球？',
      steps: [
        { text: '只有两种可能。', math: '' },
        { text: '排除红球剩蓝球。', math: '' }
      ],
      answer: '排除法' },
    { id: 'p2b-logic-e3', point: 'p2b-logic-three', title: '三人推理',
      question: '三人拿语文、数学、英语书。小红拿语文，小丽拿的不是数学。小刚拿什么？',
      steps: [
        { text: '小红已定语文。', math: '' },
        { text: '小丽不是数学 → 英语。', math: '' },
        { text: '小刚：数学。', math: '' }
      ],
      answer: '数学书' },
    { id: 'p2b-logic-e4', point: 'p2b-logic-table', title: '表格推理',
      question: '用表格法表示上题的推理过程。',
      steps: [
        { text: '小红语文 √，其余 ×。', math: '' },
        { text: '小丽数学 × → 英语 √。', math: '' },
        { text: '小刚填数学。', math: '' }
      ],
      answer: '表格 √× 推出' },
    { id: 'p2b-logic-e5', point: 'p2b-logic-num', title: '格子填数',
      question: '3×3 方格每行每列填 1、2、3 不重复，第一行已填 1、2，第一行第三格是几？',
      steps: [
        { text: '行内缺 3。', math: '3' }
      ],
      answer: '3' },
    { id: 'p2b-logic-e6', point: 'p2b-logic-three', title: '综合推理',
      question: '小伟比小明高，小明比小强高。谁最高？',
      steps: [
        { text: '小伟 > 小明。', math: '' },
        { text: '小明 > 小强。', math: '' },
        { text: '小伟最高。', math: '' }
      ],
      answer: '小伟' }
  ],
  patterns: {
    asks: [
      { k: '二选一', desc: '两个条件的推理' },
      { k: '连环推理', desc: '三个及以上条件' },
      { k: '表格法', desc: '用表格整理推理' },
      { k: '格子填数', desc: '行列不重复' },
      { k: '比较推理', desc: '大小高矮排序推理' }
    ],
    features: [
      '不是…就是…',
      '先确定再排除',
      '表格 √× 可视化',
      '结论要有依据'
    ],
    patterns: [
      { no: '基础 1', id: 'p2b-logic-t-two', title: '二选一推理', level: '基础', kind: '应用',
        asks: ['二选一'], signals: ['不是', '就是'],
        chain: [{ point: 'p2b-logic-two', role: '排除确定' }],
        locate: '两种可能去其一。',
        stem: '抽屉里黑白袜子各一双（单只），摸出一只不是黑的，是什么色？',
        solution: [
          { text: '排除黑色。', math: '白色' }
        ],
        trap: '凭感觉猜。' },
      { no: '基础 2', id: 'p2b-logic-t-three', title: '连环推理', level: '基础', kind: '应用',
        asks: ['连环推理'], signals: ['三人', '三样'],
        chain: [{ point: 'p2b-logic-three', role: '先定后排' }],
        locate: '确定项开刀。',
        stem: '甲乙丙分别喜欢唱歌、跳舞、画画。甲不喜欢唱歌，乙喜欢跳舞。丙喜欢什么？',
        solution: [
          { text: '乙定跳舞，甲不是唱歌 → 画画。', math: '' },
          { text: '丙：唱歌。', math: '' }
        ],
        trap: '跳步不写依据。' },
      { no: '中档 1', id: 'p2b-logic-t-table', title: '表格推理', level: '中档', kind: '应用',
        asks: ['表格法'], signals: ['用表格'],
        chain: [{ point: 'p2b-logic-table', role: '√×推理' }],
        locate: '行列只能一个 √。',
        stem: '用表格法解：小红、小刚分别是跑步、跳绳冠军。小红不是跑步冠军。',
        solution: [
          { text: '小红跳绳 √。', math: '' },
          { text: '小刚跑步 √。', math: '' }
        ],
        trap: '行列 √ 重复。' },
      { no: '中档 2', id: 'p2b-logic-t-grid', title: '格子填数', level: '中档', kind: '综合',
        asks: ['格子填数'], signals: ['每行每列'],
        chain: [{ point: 'p2b-logic-num', role: '排除填数' }],
        locate: '行列排除。',
        stem: '2×2 方格填 1、2，每行每列不重复，左上 1、右上 2，其余怎么填？',
        solution: [
          { text: '左下 2、右下 1。', math: '' }
        ],
        trap: '行列重复。' },
      { no: '提升 1', id: 'p2b-logic-t-order', title: '比较推理', level: '提升', kind: '综合',
        asks: ['比较推理'], signals: ['比…高', '比…重'],
        chain: [{ point: 'p2b-logic-three', role: '传递排序' }],
        locate: '列不等式链。',
        stem: 'A 比 B 重，C 比 A 重。谁最重？',
        solution: [
          { text: 'C > A > B。', math: '' },
          { text: 'C 最重。', math: '' }
        ],
        trap: '传递关系搞错。' }
    ]
  }
});
