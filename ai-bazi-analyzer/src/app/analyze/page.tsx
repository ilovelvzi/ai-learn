'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HOURS = [
  { value: 0, label: '子时 (23:00-01:00)' },
  { value: 2, label: '丑时 (01:00-03:00)' },
  { value: 4, label: '寅时 (03:00-05:00)' },
  { value: 6, label: '卯时 (05:00-07:00)' },
  { value: 8, label: '辰时 (07:00-09:00)' },
  { value: 10, label: '巳时 (09:00-11:00)' },
  { value: 12, label: '午时 (11:00-13:00)' },
  { value: 14, label: '未时 (13:00-15:00)' },
  { value: 16, label: '申时 (15:00-17:00)' },
  { value: 18, label: '酉时 (17:00-19:00)' },
  { value: 20, label: '戌时 (19:00-21:00)' },
  { value: 22, label: '亥时 (21:00-23:00)' },
];

export default function AnalyzePage() {
  const router = useRouter();
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => 1920 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = () => {
    setIsSubmitting(true);
    const params = new URLSearchParams({
      year: year.toString(),
      month: month.toString(),
      day: day.toString(),
      hour: hour.toString(),
      gender,
    });
    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950/20 to-gray-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="text-gray-400 hover:text-white transition-colors">
            ← 返回首页
          </Link>
          <h1 className="text-2xl font-bold text-white">输入出生信息</h1>
          <div className="w-20" />
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-gray-400">请输入您的出生年月日和时辰</p>
          </div>

          {/* Gender */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">性别</label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-3 rounded-lg border transition-colors ${
                  gender === 'male'
                    ? 'bg-indigo-600 border-indigo-500 text-white'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                👨 男
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-3 rounded-lg border transition-colors ${
                  gender === 'female'
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                👩 女
              </button>
            </div>
          </div>

          {/* Year */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">出生年份</label>
            <select
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
          </div>

          {/* Month & Day */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">月</label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}月</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">日</label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
              >
                {days.map((d) => (
                  <option key={d} value={d}>{d}日</option>
                ))}
              </select>
            </div>
          </div>

          {/* Hour */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">出生时辰</label>
            <select
              value={hour}
              onChange={(e) => setHour(Number(e.target.value))}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-indigo-500 focus:outline-none"
            >
              {HOURS.map((h) => (
                <option key={h.value} value={h.value}>{h.label}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-medium text-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow disabled:opacity-50"
          >
            {isSubmitting ? '计算中...' : '开始八字分析 🔮'}
          </motion.button>

          <p className="text-center text-gray-500 text-xs mt-4">
            提示：出生时辰如不确定，可选择最接近的时辰
          </p>
        </motion.div>
      </div>
    </main>
  );
}
