import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import dotenv from "dotenv";
import {
  MultiSlideSchema,
  UnstyledMultiSlideSchema,
} from "@/lib/validation/slide-schema"; // TODO: Keep only the slides for some prompt
import { UnstyledDocumentSchema } from "@/lib/validation/document-schema";
import { ElementSchema } from "@/lib/validation/slide-schema";
import { ElementType } from "@/lib/validation/element-type";
import {
  ContentImageSchema,
  DEFAULT_BACKGROUND_IMAGE_INPUT,
  DEFAULT_CONTENT_IMAGE_INPUT,
  ImageSchema,
} from "@/lib/validation/image-schema";
import fs from "fs";

import {
  TitleSchema,
  SubtitleSchema,
  DescriptionSchema,
} from "@/lib/validation/text-schema";

dotenv.config();

const carouselFunctionSchema = {
  name: "carouselCreator",
  description: "Creates a carousel with multiple slides about a topic.",
  parameters: zodToJsonSchema(UnstyledDocumentSchema, {
    definitions: {
      TitleSchema,
      SubtitleSchema,
      DescriptionSchema,
      ImageSchema,
      ContentImageSchema,
    },
  }),
};

const model = new ChatOpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  modelName: "gpt-4-1106-preview",
  temperature: 0,
}).bind({
  functions: [carouselFunctionSchema],
  function_call: { name: "carouselCreator" },
});

export async function generateCarouselSlides(
  topicPrompt: string
): Promise<z.infer<typeof UnstyledMultiSlideSchema> | null> {
  const result = await model.invoke([
    new HumanMessage(`A carousel with about "${topicPrompt}"`),
  ]);
  const jsonParsed = JSON.parse(
    result.additional_kwargs.function_call?.arguments || ""
  );

  const documentContentParseResult =
    UnstyledDocumentSchema.safeParse(jsonParsed);
  if (documentContentParseResult.success) {
    return documentContentParseResult.data.slides;
  } else {
    console.log("Error in carousel generation schema");
    console.error(documentContentParseResult.error);
    return null;
  }
}
