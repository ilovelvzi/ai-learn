/**
 * 共享类型定义
 */

export interface BirthInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: 'male' | 'female';
}

export interface AnalysisRequest {
  birthInfo: BirthInfo;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
