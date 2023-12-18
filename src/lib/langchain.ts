import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  MultiSlideSchema,
  UnstyledMultiSlideSchema,
} from "@/lib/validation/slide-schema"; // TODO: Keep only the slides for some prompt
import { UnstyledDocumentSchema } from "@/lib/validation/document-schema";
import {
  UnstyledTitleSchema,
  UnstyledDescriptionSchema,
  UnstyledSubtitleSchema,
} from "@/lib/validation/text-schema";

const carouselFunctionSchema = {
  name: "carouselCreator",
  description: "Creates a carousel with multiple slides about a topic.",
  parameters: zodToJsonSchema(UnstyledDocumentSchema, {
    definitions: {
      UnstyledTitleSchema,
      UnstyledSubtitleSchema,
      UnstyledDescriptionSchema,
    },
  }),
};

const model = new ChatOpenAI({
  openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  modelName: "gpt-3.5-turbo-1106",
  temperature: 0,
}).bind({
  functions: [carouselFunctionSchema],
  function_call: { name: "carouselCreator" },
});

export async function generateCarouselSlides(
  topicPrompt: string
): Promise<z.infer<typeof MultiSlideSchema> | null> {
  const result = await model.invoke([
    new HumanMessage(`A carousel with about "${topicPrompt}"`),
  ]);
  const jsonParsed = JSON.parse(
    result.additional_kwargs.function_call?.arguments || ""
  );

  const unstyledDocumentParseResult =
    UnstyledDocumentSchema.safeParse(jsonParsed);
  if (unstyledDocumentParseResult.success) {
    return MultiSlideSchema.parse(unstyledDocumentParseResult.data.slides);
  } else {
    console.log("Error in carousel generation schema");
    console.error(unstyledDocumentParseResult.error);
    return null;
  }
}
