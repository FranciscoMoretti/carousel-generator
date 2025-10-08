"use server";
import { messageRateLimit } from "@/lib/rate-limit";

import { generateCarouselSlides, generateCarouselFromMarkdown } from "@/lib/langchain";
import { convertMarkdownToCarouselSlides } from "@/lib/markdown-parser";
import { headers } from "next/headers";

export async function generateCarouselSlidesAction(userPrompt: string) {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const ip = headers().get("x-real-ip") ?? "local";
    const rl = await messageRateLimit.limit(ip);

    if (!rl.success) {
      // TODO: Handle returning errors
      return null;
    }
  }

  const generatedSlides = await generateCarouselSlides(
    userPrompt,
    process.env.OPENAI_API_KEY
  );
  return generatedSlides;
}

/**
 * Generate carousel from markdown with AI enhancement (requires API key)
 */
export async function generateCarouselFromMarkdownAction(markdownContent: string) {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const ip = headers().get("x-real-ip") ?? "local";
    const rl = await messageRateLimit.limit(ip);

    if (!rl.success) {
      // TODO: Handle returning errors
      return null;
    }
  }

  const generatedSlides = await generateCarouselFromMarkdown(
    markdownContent,
    process.env.OPENAI_API_KEY
  );
  return generatedSlides;
}

/**
 * Generate carousel from markdown directly (no API key required)
 * This is a client-side fallback that works without OpenAI
 */
export async function generateCarouselFromMarkdownDirectAction(markdownContent: string) {
  // No API key required - pure markdown parsing
  const generatedSlides = convertMarkdownToCarouselSlides(markdownContent);
  return generatedSlides;
}
