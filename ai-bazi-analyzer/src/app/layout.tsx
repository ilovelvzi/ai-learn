import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 八字分析 | AI BaZi Analyzer",
  description: "基于AI大语言模型的智能八字命理分析系统，结合传统命理学知识与现代AI技术",
  keywords: ["八字", "命理", "AI", "人工智能", "BaZi", "Four Pillars"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-gray-950 text-white font-sans">{children}</body>
    </html>
  );
}
