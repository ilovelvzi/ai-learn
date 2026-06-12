'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { WU_XING } from '@/lib/bazi';

const WU_XING_COLORS: Record<string, string> = {
  '木': '#4ade80',
  '火': '#f87171',
  '土': '#fbbf24',
  '金': '#e2e8f0',
  '水': '#60a5fa',
};

const WU_XING_ICONS: Record<string, string> = {
  '木': '🌳',
  '火': '🔥',
  '土': '⛰️',
  '金': '🪙',
  '水': '💧',
};

interface WuXingChartProps {
  wuXingCount: Record<string, number>;
  wuXingStrength: Record<string, string>;
}

export default function WuXingChart({ wuXingCount, wuXingStrength }: WuXingChartProps) {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const maxValue = Math.max(...Object.values(wuXingCount));

  return (
    <div className="bg-gray-900/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 text-center">五行分布</h3>

      {/* Bar Chart */}
      <div className="space-y-4">
        {WU_XING.map((element, index) => {
          const value = wuXingCount[element] || 0;
          const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
          const strength = wuXingStrength[element];

          return (
            <motion.div
              key={element}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredElement(element)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl w-8">{WU_XING_ICONS[element]}</span>
                <span className="text-white font-medium w-8">{element}</span>
                <div className="flex-1 h-8 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.15 }}
                    className="h-full rounded-full flex items-center justify-end pr-3"
                    style={{ backgroundColor: WU_XING_COLORS[element] }}
                  >
                    <span className="text-xs font-bold text-gray-900">
                      {value.toFixed(1)}
                    </span>
                  </motion.div>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  strength === 'strong' ? 'bg-green-900/50 text-green-400' :
                  strength === 'weak' ? 'bg-red-900/50 text-red-400' :
                  'bg-gray-800 text-gray-400'
                }`}>
                  {strength === 'strong' ? '旺' : strength === 'weak' ? '弱' : '平'}
                </span>
              </div>

              {hoveredElement === element && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-1 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg z-10 shadow-lg"
                >
                  {element}的力量值: {value.toFixed(2)} | 状态: {
                    strength === 'strong' ? '偏旺' : strength === 'weak' ? '偏弱' : '中和'
                  }
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Five Elements Cycle */}
      <div className="mt-8 flex justify-center">
        <div className="relative w-48 h-48">
          {WU_XING.map((element, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180);
            const x = 50 + 35 * Math.cos(angle);
            const y = 50 + 35 * Math.sin(angle);

            return (
              <motion.div
                key={element}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="absolute w-12 h-12 flex items-center justify-center rounded-full border-2 text-lg font-bold"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                  borderColor: WU_XING_COLORS[element],
                  color: WU_XING_COLORS[element],
                  backgroundColor: `${WU_XING_COLORS[element]}20`,
                }}
              >
                {element}
              </motion.div>
            );
          })}
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
            相生相克
          </div>
        </div>
      </div>
    </div>
  );
}
