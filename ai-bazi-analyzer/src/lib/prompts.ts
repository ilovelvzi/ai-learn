/**
 * AI命理分析 Prompt 模板
 * Prompt templates for BaZi AI analysis
 */

import { BaZiResult, formatBaZiText } from './bazi';

/**
 * 系统提示词 - 定义AI的角色和行为
 */
export const SYSTEM_PROMPT = `你是一位精通中国传统命理学的AI分析师，拥有深厚的八字命理知识。你的分析风格：

1. **专业性**：基于传统命理学理论（天干地支、五行生克、十神关系等）进行分析
2. **现代化**：用通俗易懂的语言解释命理概念，结合现代生活场景
3. **全面性**：从性格、事业、感情、健康、财运等多维度进行分析
4. **建设性**：给出积极的建议和指导，避免消极或恐吓性的内容
5. **客观性**：承认命理学的局限性，强调个人努力的重要性

注意事项：
- 不做绝对性的预测，而是分析趋势和倾向
- 在分析中融入五行生克制化的原理解释
- 对于命局中的不利因素，侧重给出化解建议
- 使用结构化的格式输出分析结果
- 回答必须使用中文`;

/**
 * 生成完整的命理分析请求
 */
export function generateAnalysisPrompt(result: BaZiResult, birthDate: string): string {
  const baziText = formatBaZiText(result);

  return `请对以下八字进行全面的命理分析：

出生信息：${birthDate}

${baziText}

请从以下维度进行详细分析：

## 1. 日主分析
分析日主${result.dayMaster}(${result.dayMasterElement})的基本特质，以及在整个命局中的旺衰状态。

## 2. 五行分析
根据五行分布情况，分析五行的平衡与否，指出喜用神和忌神。

## 3. 性格特点
基于命局组合，分析此人的性格特征、思维方式和行为倾向。

## 4. 事业方向
分析适合的职业方向、事业发展特点和建议。

## 5. 感情婚姻
分析感情观、婚姻特点和伴侣类型。

## 6. 财运分析
分析财运特点、理财方式和注意事项。

## 7. 健康建议
基于五行偏颇，提供健康方面的注意事项和建议。

## 8. 综合建议
给出整体的人生建议和发展方向。

请确保分析内容专业、有理有据、积极正面。`;
}

/**
 * 对话追问的系统提示词
 */
export function getChatSystemPrompt(result: BaZiResult, birthDate: string): string {
  const baziText = formatBaZiText(result);

  return `${SYSTEM_PROMPT}

用户的八字信息如下：
出生信息：${birthDate}
${baziText}

用户可能会针对之前的分析进行追问，请基于上述八字信息回答用户的问题。回答要专业、具体，并结合命理学原理进行解释。`;
}

/**
 * 流年运势分析提示词
 */
export function generateYearlyPrompt(result: BaZiResult, targetYear: number): string {
  const baziText = formatBaZiText(result);

  return `请分析以下八字在${targetYear}年的流年运势：

${baziText}

${targetYear}年的天干地支为：请根据当年干支与命局的关系，分析以下方面：

1. **整体运势**：总体运势走向
2. **事业运**：工作、升职、创业等方面
3. **财运**：正财、偏财的变化
4. **感情运**：单身者的桃花运、已婚者的婚姻关系
5. **健康运**：需要注意的健康问题
6. **开运建议**：适合做什么、避免做什么

请给出具体、有建设性的分析和建议。`;
}
