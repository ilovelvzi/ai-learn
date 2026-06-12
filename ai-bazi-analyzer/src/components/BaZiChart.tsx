'use client';

import { motion } from 'framer-motion';
import { Pillar } from '@/lib/bazi';

interface BaZiPillar {
  name: string;
  pillar: Pillar;
}

interface BaZiChartProps {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
}

const ELEMENT_COLORS: Record<string, string> = {
  '木': 'from-green-500 to-green-700',
  '火': 'from-red-500 to-red-700',
  '土': 'from-yellow-500 to-yellow-700',
  '金': 'from-gray-300 to-gray-500',
  '水': 'from-blue-500 to-blue-700',
};

export default function BaZiChart({ yearPillar, monthPillar, dayPillar, hourPillar }: BaZiChartProps) {
  const pillars: BaZiPillar[] = [
    { name: '年柱', pillar: yearPillar },
    { name: '月柱', pillar: monthPillar },
    { name: '日柱', pillar: dayPillar },
    { name: '时柱', pillar: hourPillar },
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 text-center">八字排盘</h3>

      <div className="grid grid-cols-4 gap-4">
        {pillars.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            className="text-center"
          >
            <div className="text-gray-400 text-sm mb-2">{item.name}</div>

            {/* 天干 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-b ${ELEMENT_COLORS[item.pillar.wuXingTianGan]} rounded-lg p-3 mb-2 shadow-lg`}
            >
              <div className="text-white text-2xl font-bold">{item.pillar.tianGan}</div>
              <div className="text-white/70 text-xs mt-1">{item.pillar.wuXingTianGan}</div>
            </motion.div>

            {/* 地支 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-b ${ELEMENT_COLORS[item.pillar.wuXingDiZhi]} rounded-lg p-3 shadow-lg`}
            >
              <div className="text-white text-2xl font-bold">{item.pillar.diZhi}</div>
              <div className="text-white/70 text-xs mt-1">{item.pillar.wuXingDiZhi}</div>
              <div className="text-white/50 text-[10px] mt-1">
                藏: {item.pillar.cangGan.join(' ')}
              </div>
            </motion.div>

            {/* 日主标记 */}
            {item.name === '日柱' && (
              <div className="mt-2 text-xs text-amber-400 font-medium">★ 日主</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
