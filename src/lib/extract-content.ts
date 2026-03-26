import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export interface ExtractedContent {
  title: string;
  content: string;
  excerpt: string;
  siteName: string;
}

export async function extractContentFromUrl(
  url: string
): Promise<ExtractedContent> {
  const normalizedUrl = normalizeNaverBlogUrl(url);
  const html = await fetchHtml(normalizedUrl);
  const doc = new JSDOM(html, { url: normalizedUrl });

  const reader = new Readability(doc.window.document);
  const article = reader.parse();

  if (!article || !article.textContent?.trim()) {
    throw new Error("콘텐츠를 추출할 수 없습니다. URL을 확인해주세요.");
  }

  return {
    title: article.title || "",
    content: article.textContent.trim(),
    excerpt: article.excerpt || "",
    siteName: article.siteName || "",
  };
}

function normalizeNaverBlogUrl(url: string): string {
  const naverBlogPattern = /^https?:\/\/blog\.naver\.com\/([^/]+)\/(\d+)/;
  const match = url.match(naverBlogPattern);
  if (match) {
    return `https://m.blog.naver.com/${match[1]}/${match[2]}`;
  }
  return url;
}

async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`페이지를 가져올 수 없습니다 (${response.status})`);
  }

  return response.text();
}
