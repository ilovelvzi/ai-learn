'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950/20 to-gray-950">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-6xl mb-6"
          >
            🔮
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            AI 八字分析
          </h1>

          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            融合千年命理智慧与现代AI技术
            <br />
            为您提供专业、全面、个性化的八字命理分析
          </p>

          <Link href="/analyze">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
            >
              开始分析 →
            </motion.button>
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-24 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-8">技术栈</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>AI 八字分析 — 基于大语言模型的智能命理分析系统</p>
          <p className="mt-2">仅供娱乐参考，不构成任何人生决策建议</p>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    icon: '📊',
    title: '精准排盘',
    description: '基于天文历法精确计算四柱八字，包含天干地支、五行属性、藏干等完整信息。',
  },
  {
    icon: '🤖',
    title: 'AI智能分析',
    description: '运用先进的大语言模型，结合命理学知识库，生成专业的个性化分析报告。',
  },
  {
    icon: '💬',
    title: '互动问答',
    description: '支持针对分析结果进行追问，AI将基于您的八字信息给出专业解答。',
  },
  {
    icon: '📈',
    title: '五行可视化',
    description: '直观的图表展示五行分布、强弱关系，帮助快速理解命局特点。',
  },
  {
    icon: '🔄',
    title: '流年运势',
    description: '分析当年运势走向，提供事业、财运、感情等多维度的趋势预测。',
  },
  {
    icon: '🔒',
    title: '隐私保护',
    description: '不存储个人出生信息，所有计算在本地完成，保护您的隐私安全。',
  },
];

const techStack = [
  'Next.js 14+',
  'TypeScript',
  'TailwindCSS',
  'Framer Motion',
  'Vercel AI SDK',
  'OpenAI / DeepSeek',
  'RAG',
  'Prompt Engineering',
];
