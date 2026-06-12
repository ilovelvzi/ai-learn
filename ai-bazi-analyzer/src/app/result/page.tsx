'use client';

import { useSearchParams } from 'next/navigation';
import { useCompletion } from '@ai-sdk/react';
import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { calculateBaZi, BaZiResult } from '@/lib/bazi';
import BaZiChart from '@/components/BaZiChart';
import WuXingChart from '@/components/WuXingChart';

function ResultContent() {
  const searchParams = useSearchParams();
  const [baziResult, setBaziResult] = useState<BaZiResult | null>(null);

  const year = Number(searchParams.get('year') || 1990);
  const month = Number(searchParams.get('month') || 1);
  const day = Number(searchParams.get('day') || 1);
  const hour = Number(searchParams.get('hour') || 12);

  const { completion, isLoading, complete } = useCompletion({
    api: '/api/analyze',
  });

  useEffect(() => {
    // 计算八字
    const result = calculateBaZi(year, month, day, hour);
    setBaziResult(result);

    // 请求AI分析
    complete('', {
      body: {
        birthInfo: { year, month, day, hour, gender: searchParams.get('gender') || 'male' },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!baziResult) {
    return <div className="text-center text-gray-400 py-20">计算中...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950/20 to-gray-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/analyze" className="text-gray-400 hover:text-white transition-colors">
            ← 重新分析
          </Link>
          <h1 className="text-2xl font-bold text-white">分析结果</h1>
          <div className="text-sm text-gray-500">
            {year}年{month}月{day}日 {hour}时
          </div>
        </div>

        {/* Birth Info Summary */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-gray-400">
            生肖：{baziResult.shengXiao} | 日主：{baziResult.dayMaster}({baziResult.dayMasterElement})
          </span>
        </motion.div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <BaZiChart
            yearPillar={baziResult.yearPillar}
            monthPillar={baziResult.monthPillar}
            dayPillar={baziResult.dayPillar}
            hourPillar={baziResult.hourPillar}
          />
          <WuXingChart
            wuXingCount={baziResult.wuXingCount}
            wuXingStrength={baziResult.wuXingStrength}
          />
        </div>

        {/* AI Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            🤖 AI 命理分析
            {isLoading && (
              <span className="text-sm font-normal text-indigo-400 animate-pulse">
                分析中...
              </span>
            )}
          </h3>

          {completion ? (
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                {completion}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              <div className="animate-spin text-3xl mb-3">🔮</div>
              <p>AI正在分析您的八字命局...</p>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/analyze">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              重新分析
            </motion.button>
          </Link>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              返回首页
            </motion.button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">加载中...</div>}>
      <ResultContent />
    </Suspense>
  );
}
