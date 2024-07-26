import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
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
  description: "Creates a carousel with multiple slides for a given topic.",
  parameters: zodToJsonSchema(UnstyledDocumentSchema, {
    definitions: {
      UnstyledTitleSchema,
      UnstyledSubtitleSchema,
      UnstyledDescriptionSchema,
    },
  }),
};

export async function generateCarouselSlides(
  topicPrompt: string,
  apiKey: string
): Promise<z.infer<typeof MultiSlideSchema> | null> {
  const model = startModelClient(apiKey);

  const result = await model.invoke([
    new SystemMessage(
      `
      Create a Carousel of slides following these rules

      Arguments Schema Instructions:
       - Respect the argument schema and only use the allowed values for element type, which are 'Title', 'Subtitle' and 'Description'.
       - Each slide can use the multiple elements and they can be of different type or not.
       - Respect the 'maxLength' value which is the maximum number of characters in a given field. Write less than 70% of that number.

      Guidelines:
       - Create 8-15 slides.
       - Each slide has 2-3 different elements. E.g. [Title, Description], or [Title, Subtitle], or [Subtitle, Description].
       - Each slide All the elements in that slide are about that idea.
       - Adapt, reorganize and rephrase the content to fit the slides format.
       - Add Emojis to the text in Title, Subtitle and Description.
       - Don't add slide numbers.
       - Description element text should be short.
       `
    ),
    new HumanMessage(topicPrompt),
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
    console.log(jsonParsed);
    return null;
  }
}

function startModelClient(api_key: string) {
  return new ChatOpenAI({
    openAIApiKey: api_key,
    modelName: "gpt-4o-mini",
    temperature: 0,
  }).bind({
    // TODO Migrate to Tool and force to call the function with tool choice
    functions: [carouselFunctionSchema],
    function_call: { name: "carouselCreator" },
  });
}
