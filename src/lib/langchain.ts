import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import {
  MultiSlideSchema,
} from "@/lib/validation/slide-schema";
import { UnstyledDocumentSchema } from "@/lib/validation/document-schema";

function createModel(apiKey: string) {
  if (process.env.ANTHROPIC_API_KEY) {
    const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    return anthropic("claude-sonnet-4-20250514");
  }
  const openai = createOpenAI({ apiKey });
  return openai("gpt-4o-mini");
}

const SYSTEM_PROMPT = `당신은 블로그 글을 한국어 카드뉴스로 변환하는 전문가입니다.

다음 규칙을 따라 카드뉴스 슬라이드를 만들어주세요:

스키마 규칙:
- 요소 타입은 'Title', 'Subtitle', 'Description'만 사용하세요.
- 각 슬라이드는 2~3개의 요소를 포함합니다.
- 'maxLength' 값의 70% 이하로 작성하세요.

카드뉴스 작성 가이드:
- 총 6~10장의 슬라이드를 만드세요.
- 1장: 제목 슬라이드 (핵심 주제를 한 문장으로)
- 2~N-1장: 본문 슬라이드 (핵심 내용을 카드별로 나눠서)
- 마지막 장: 마무리/요약 슬라이드
- 한 슬라이드에 한 가지 핵심 메시지만 담으세요.
- 짧고 임팩트 있는 문장을 사용하세요.
- 슬라이드 번호를 넣지 마세요.
- 적절한 이모지를 활용하세요.
- 모든 텍스트는 한국어로 작성하세요.`;

export async function generateCarouselSlides(
  topicPrompt: string,
  apiKey: string
): Promise<z.infer<typeof MultiSlideSchema> | null> {
  try {
    const model = createModel(apiKey);

    const { object } = await generateObject({
      model,
      schema: UnstyledDocumentSchema,
      system: SYSTEM_PROMPT,
      prompt: topicPrompt,
    });

    const parseResult = UnstyledDocumentSchema.safeParse(object);
    if (parseResult.success) {
      return MultiSlideSchema.parse(parseResult.data.slides);
    }

    console.error("Error in carousel generation schema", parseResult.error);
    return null;
  } catch (error) {
    console.error("Error generating carousel:", error);
    return null;
  }
}
