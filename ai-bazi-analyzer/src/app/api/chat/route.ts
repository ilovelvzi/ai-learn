import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { calculateBaZi } from '@/lib/bazi';
import { getChatSystemPrompt } from '@/lib/prompts';

export async function POST(req: Request) {
  const { messages, birthInfo } = await req.json();

  const { year, month, day, hour } = birthInfo;

  // 计算八字
  const baziResult = calculateBaZi(year, month, day, hour);

  // 生成系统提示词
  const birthDate = `${year}年${month}月${day}日 ${hour}时`;
  const systemPrompt = getChatSystemPrompt(baziResult, birthDate);

  // 调用AI进行对话（流式输出）
  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages,
  });

  return result.toTextStreamResponse();
}
