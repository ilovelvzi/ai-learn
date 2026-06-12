import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { calculateBaZi } from '@/lib/bazi';
import { SYSTEM_PROMPT, generateAnalysisPrompt } from '@/lib/prompts';
import { AnalysisRequest } from '@/lib/types';

export async function POST(req: Request) {
  const { birthInfo }: AnalysisRequest = await req.json();

  const { year, month, day, hour } = birthInfo;

  // 计算八字
  const baziResult = calculateBaZi(year, month, day, hour);

  // 生成分析提示词
  const birthDate = `${year}年${month}月${day}日 ${hour}时`;
  const userPrompt = generateAnalysisPrompt(baziResult, birthDate);

  // 调用AI进行分析（流式输出）
  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: SYSTEM_PROMPT,
    prompt: userPrompt,
  });

  return result.toTextStreamResponse();
}
