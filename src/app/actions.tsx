"use server";
import { messageRateLimit } from "@/lib/rate-limit";
import { generateCarouselSlides } from "@/lib/langchain";
import { extractContentFromUrl } from "@/lib/extract-content";
import { headers } from "next/headers";

async function checkRateLimit(): Promise<boolean> {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const ip = headers().get("x-real-ip") ?? "local";
    const rl = await messageRateLimit.limit(ip);
    return rl.success;
  }
  return true;
}

function getApiKey(): string | null {
  return process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || null;
}

export async function generateCarouselSlidesAction(userPrompt: string) {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const rateLimitOk = await checkRateLimit();
  if (!rateLimitOk) return null;

  const generatedSlides = await generateCarouselSlides(userPrompt, apiKey);
  return generatedSlides;
}

export async function generateFromUrlAction(url: string) {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const rateLimitOk = await checkRateLimit();
  if (!rateLimitOk) return null;

  try {
    const extracted = await extractContentFromUrl(url);

    const prompt = `다음 블로그 글을 카드뉴스로 만들어주세요.

제목: ${extracted.title}

내용:
${extracted.content.slice(0, 4000)}`;

    const generatedSlides = await generateCarouselSlides(prompt, apiKey);
    return generatedSlides;
  } catch (error) {
    console.error("URL 콘텐츠 추출 실패:", error);
    return null;
  }
}
