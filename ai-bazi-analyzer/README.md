# AI 八字分析 (AI BaZi Analyzer) 🔮

基于大语言模型的智能八字命理分析系统，融合传统命理学知识与现代AI技术。

## ✨ 功能特色

- 🎯 **精准排盘** — 基于天文历法计算四柱八字（年柱、月柱、日柱、时柱）
- 🤖 **AI智能分析** — 利用LLM生成专业、全面的命理分析报告
- 📊 **五行可视化** — 直观展示五行分布、强弱关系
- 💬 **互动问答** — 针对分析结果进行追问
- 🌊 **流式输出** — AI分析实时流式展示
- 📱 **响应式设计** — 完美适配各种设备

## 🛠️ 技术栈

| 层级 | 技术选型 |
|------|---------|
| 前端框架 | Next.js 14+ (App Router) |
| 语言 | TypeScript |
| 样式 | TailwindCSS |
| 动画 | Framer Motion |
| AI集成 | Vercel AI SDK |
| LLM | OpenAI GPT-4o / DeepSeek |
| 排盘算法 | 自研天干地支计算引擎 |

## 🚀 快速开始

### 前置条件

- Node.js 18+
- npm 或 yarn
- OpenAI API Key（或 DeepSeek API Key）

### 安装与运行

```bash
# 进入项目目录
cd ai-bazi-analyzer

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的 API Key

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000 即可使用。

### 使用 DeepSeek（推荐国内用户）

在 `.env.local` 中配置：

```
OPENAI_BASE_URL=https://api.deepseek.com/v1
OPENAI_API_KEY=your_deepseek_api_key
```

## 📁 项目结构

```
ai-bazi-analyzer/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── page.tsx           # 首页
│   │   ├── analyze/page.tsx   # 出生信息输入页
│   │   ├── result/page.tsx    # 分析结果页
│   │   └── api/               # API 路由
│   │       ├── analyze/       # 八字分析 API
│   │       └── chat/          # 对话追问 API
│   ├── lib/                   # 核心库
│   │   ├── bazi.ts           # 八字排盘计算引擎
│   │   ├── prompts.ts        # AI Prompt 模板
│   │   └── types.ts          # 类型定义
│   └── components/            # React 组件
│       ├── BaZiChart.tsx     # 八字排盘展示组件
│       └── WuXingChart.tsx   # 五行分布图表组件
├── .env.example               # 环境变量示例
└── README.md
```

## 🔑 核心算法

### 八字排盘引擎

项目实现了完整的八字排盘算法，包括：

1. **年柱计算** — 基于年份推算天干地支
2. **月柱计算** — 根据年干和月份推算
3. **日柱计算** — 使用日期差值法精确计算
4. **时柱计算** — 根据日干和时辰推算
5. **五行统计** — 计算五行分布和强弱
6. **藏干分析** — 地支藏干的五行影响

### AI Prompt 工程

采用精心设计的 Prompt 模板：

- **系统提示词** — 定义AI命理师角色和行为准则
- **分析模板** — 多维度分析（性格、事业、感情、健康、财运）
- **对话模板** — 支持基于八字信息的追问交互

## 📚 学习路径

如果你也想成为AI应用开发者，以下是推荐的学习路径：

### 第一阶段：AI基础（2-4周）
- LLM原理（Transformer、Attention）
- Prompt Engineering
- RAG 架构
- 向量数据库基础

### 第二阶段：工具链（1-2周）
- Vercel AI SDK
- LangChain / LlamaIndex
- OpenAI / DeepSeek API

### 第三阶段：实战项目（4-6周）
- 本项目即为最佳实战案例
- 覆盖：全栈开发、AI集成、算法实现、UI设计

## 🎯 项目亮点（简历用）

- ✅ 完整的 AI 应用开发经验（从0到1）
- ✅ LLM 集成与 Prompt Engineering 实践
- ✅ 流式输出与实时交互体验
- ✅ 领域知识 + AI 的结合（八字命理学）
- ✅ 精美的前端交互与可视化
- ✅ TypeScript 全栈开发
- ✅ 响应式设计与暗色主题

## 📄 License

MIT

## 🙏 致谢

- [Vercel AI SDK](https://sdk.vercel.ai/) — AI集成框架
- [Next.js](https://nextjs.org/) — React全栈框架
- [Framer Motion](https://www.framer.com/motion/) — 动画库
- [TailwindCSS](https://tailwindcss.com/) — CSS框架
