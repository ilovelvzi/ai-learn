/**
 * 八字排盘核心算法
 * BaZi (Four Pillars of Destiny) Calculation Engine
 */

// 天干 (Heavenly Stems)
export const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;

// 地支 (Earthly Branches)
export const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;

// 五行 (Five Elements)
export const WU_XING = ['木', '火', '土', '金', '水'] as const;

// 天干对应五行
export const TIAN_GAN_WU_XING: Record<string, string> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
};

// 地支对应五行
export const DI_ZHI_WU_XING: Record<string, string> = {
  '子': '水', '丑': '土',
  '寅': '木', '卯': '木',
  '辰': '土', '巳': '火',
  '午': '火', '未': '土',
  '申': '金', '酉': '金',
  '戌': '土', '亥': '水',
};

// 地支藏干
export const DI_ZHI_CANG_GAN: Record<string, string[]> = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲'],
};

// 十神关系
export const SHI_SHEN_MAP: Record<string, string> = {
  '同阳同': '比肩',
  '同阴同': '比肩',
  '同阳异': '劫财',
  '同阴异': '劫财',
  '生阳同': '食神',
  '生阴同': '食神',
  '生阳异': '伤官',
  '生阴异': '伤官',
  '克阳同': '偏财',
  '克阴同': '偏财',
  '克阳异': '正财',
  '克阴异': '正财',
  '被克阳同': '七杀',
  '被克阴同': '七杀',
  '被克阳异': '正官',
  '被克阴异': '正官',
  '被生阳同': '偏印',
  '被生阴同': '偏印',
  '被生阳异': '正印',
  '被生阴异': '正印',
};

// 生肖
export const SHENG_XIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'] as const;

// 时辰对应地支
export const HOUR_TO_DI_ZHI: [number, number, string][] = [
  [23, 1, '子'],
  [1, 3, '丑'],
  [3, 5, '寅'],
  [5, 7, '卯'],
  [7, 9, '辰'],
  [9, 11, '巳'],
  [11, 13, '午'],
  [13, 15, '未'],
  [15, 17, '申'],
  [17, 19, '酉'],
  [19, 21, '戌'],
  [21, 23, '亥'],
];

export interface Pillar {
  tianGan: string;
  diZhi: string;
  wuXingTianGan: string;
  wuXingDiZhi: string;
  cangGan: string[];
}

export interface BaZiResult {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar;
  wuXingCount: Record<string, number>;
  wuXingStrength: Record<string, 'strong' | 'normal' | 'weak'>;
  shengXiao: string;
  dayMaster: string;
  dayMasterElement: string;
}

/**
 * 计算年柱
 */
function getYearPillar(year: number): Pillar {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  const tianGan = TIAN_GAN[ganIndex];
  const diZhi = DI_ZHI[zhiIndex];

  return {
    tianGan,
    diZhi,
    wuXingTianGan: TIAN_GAN_WU_XING[tianGan],
    wuXingDiZhi: DI_ZHI_WU_XING[diZhi],
    cangGan: DI_ZHI_CANG_GAN[diZhi],
  };
}

/**
 * 计算月柱
 * 以节气为准确分月界限（简化版本，使用近似算法）
 */
function getMonthPillar(year: number, month: number): Pillar {
  // 月柱地支固定：正月寅，二月卯...
  const zhiIndex = (month + 1) % 12;
  const diZhi = DI_ZHI[zhiIndex];

  // 月柱天干由年干推算：甲己之年丙作首
  const yearGanIndex = (year - 4) % 10;
  const monthGanStartMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0]; // 甲->丙, 乙->戊...
  const ganIndex = (monthGanStartMap[yearGanIndex] + (month - 1)) % 10;
  const tianGan = TIAN_GAN[ganIndex];

  return {
    tianGan,
    diZhi,
    wuXingTianGan: TIAN_GAN_WU_XING[tianGan],
    wuXingDiZhi: DI_ZHI_WU_XING[diZhi],
    cangGan: DI_ZHI_CANG_GAN[diZhi],
  };
}

/**
 * 计算日柱（使用公历日期）
 * 采用简化的蔡勒公式变体
 */
function getDayPillar(year: number, month: number, day: number): Pillar {
  // 以2000年1月1日为基准（庚辰日）-> 天干6(庚), 地支4(辰)
  const baseDate = new Date(2000, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));

  // 2000-01-01 is 庚辰日: ganIndex=6, zhiIndex=4
  const ganIndex = ((diffDays % 10) + 6 + 10) % 10;
  const zhiIndex = ((diffDays % 12) + 4 + 12) % 12;
  const tianGan = TIAN_GAN[ganIndex];
  const diZhi = DI_ZHI[zhiIndex];

  return {
    tianGan,
    diZhi,
    wuXingTianGan: TIAN_GAN_WU_XING[tianGan],
    wuXingDiZhi: DI_ZHI_WU_XING[diZhi],
    cangGan: DI_ZHI_CANG_GAN[diZhi],
  };
}

/**
 * 计算时柱
 */
function getHourPillar(dayTianGan: string, hour: number): Pillar {
  // 确定时辰地支
  let zhiIndex = 0;
  if (hour === 23 || hour === 0) {
    zhiIndex = 0; // 子时
  } else {
    zhiIndex = Math.ceil(hour / 2);
    if (hour >= 23) zhiIndex = 0;
  }
  const diZhi = DI_ZHI[zhiIndex];

  // 时柱天干由日干推算：甲己还加甲
  const dayGanIndex = TIAN_GAN.indexOf(dayTianGan as typeof TIAN_GAN[number]);
  const hourGanStartMap = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8]; // 甲->甲, 乙->丙...
  const ganIndex = (hourGanStartMap[dayGanIndex] + zhiIndex) % 10;
  const tianGan = TIAN_GAN[ganIndex];

  return {
    tianGan,
    diZhi,
    wuXingTianGan: TIAN_GAN_WU_XING[tianGan],
    wuXingDiZhi: DI_ZHI_WU_XING[diZhi],
    cangGan: DI_ZHI_CANG_GAN[diZhi],
  };
}

/**
 * 统计五行分布
 */
function countWuXing(pillars: Pillar[]): Record<string, number> {
  const count: Record<string, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };

  for (const pillar of pillars) {
    count[pillar.wuXingTianGan] += 1;
    count[pillar.wuXingDiZhi] += 1;
    // 藏干也计入（权重较低）
    for (const cg of pillar.cangGan) {
      count[TIAN_GAN_WU_XING[cg]] += 0.5;
    }
  }

  return count;
}

/**
 * 判断五行强弱
 */
function analyzeWuXingStrength(count: Record<string, number>): Record<string, 'strong' | 'normal' | 'weak'> {
  const total = Object.values(count).reduce((a, b) => a + b, 0);
  const avg = total / 5;
  const result: Record<string, 'strong' | 'normal' | 'weak'> = {};

  for (const [element, value] of Object.entries(count)) {
    if (value >= avg * 1.5) {
      result[element] = 'strong';
    } else if (value <= avg * 0.5) {
      result[element] = 'weak';
    } else {
      result[element] = 'normal';
    }
  }

  return result;
}

/**
 * 主入口：计算八字
 */
export function calculateBaZi(
  year: number,
  month: number,
  day: number,
  hour: number
): BaZiResult {
  const yearPillar = getYearPillar(year);
  const monthPillar = getMonthPillar(year, month);
  const dayPillar = getDayPillar(year, month, day);
  const hourPillar = getHourPillar(dayPillar.tianGan, hour);

  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar];
  const wuXingCount = countWuXing(pillars);
  const wuXingStrength = analyzeWuXingStrength(wuXingCount);

  const shengXiaoIndex = (year - 4) % 12;

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    wuXingCount,
    wuXingStrength,
    shengXiao: SHENG_XIAO[shengXiaoIndex],
    dayMaster: dayPillar.tianGan,
    dayMasterElement: dayPillar.wuXingTianGan,
  };
}

/**
 * 格式化八字结果为文本
 */
export function formatBaZiText(result: BaZiResult): string {
  const lines = [
    `八字排盘结果：`,
    ``,
    `年柱：${result.yearPillar.tianGan}${result.yearPillar.diZhi} (${result.yearPillar.wuXingTianGan}${result.yearPillar.wuXingDiZhi})`,
    `月柱：${result.monthPillar.tianGan}${result.monthPillar.diZhi} (${result.monthPillar.wuXingTianGan}${result.monthPillar.wuXingDiZhi})`,
    `日柱：${result.dayPillar.tianGan}${result.dayPillar.diZhi} (${result.dayPillar.wuXingTianGan}${result.dayPillar.wuXingDiZhi}) — 日主`,
    `时柱：${result.hourPillar.tianGan}${result.hourPillar.diZhi} (${result.hourPillar.wuXingTianGan}${result.hourPillar.wuXingDiZhi})`,
    ``,
    `生肖：${result.shengXiao}`,
    `日主：${result.dayMaster} (${result.dayMasterElement})`,
    ``,
    `五行分布：`,
    `  木：${result.wuXingCount['木'].toFixed(1)} (${result.wuXingStrength['木']})`,
    `  火：${result.wuXingCount['火'].toFixed(1)} (${result.wuXingStrength['火']})`,
    `  土：${result.wuXingCount['土'].toFixed(1)} (${result.wuXingStrength['土']})`,
    `  金：${result.wuXingCount['金'].toFixed(1)} (${result.wuXingStrength['金']})`,
    `  水：${result.wuXingCount['水'].toFixed(1)} (${result.wuXingStrength['水']})`,
  ];

  return lines.join('\n');
}
