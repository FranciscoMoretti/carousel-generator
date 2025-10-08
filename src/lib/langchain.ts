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
import { parseMarkdownToSlides } from "@/lib/markdown-parser";

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

/**
 * Generate carousel slides from markdown content
 * Uses AI to enhance and optimize the parsed markdown structure
 */
export async function generateCarouselFromMarkdown(
  markdownContent: string,
  apiKey: string
): Promise<z.infer<typeof MultiSlideSchema> | null> {
  // First, parse the markdown into structured slides
  const parsedSlides = parseMarkdownToSlides(markdownContent);

  // Then use AI to enhance and optimize the content
  const model = startModelClient(apiKey);

  const slidesDescription = parsedSlides.slides
    .map((slide, idx) => {
      const parts = [];
      if (slide.title) parts.push(`Title: ${slide.title}`);
      if (slide.subtitle) parts.push(`Subtitle: ${slide.subtitle}`);
      if (slide.description) parts.push(`Description: ${slide.description}`);
      return `Slide ${idx + 1} (${slide.type}):\n${parts.join("\n")}`;
    })
    .join("\n\n");

  const result = await model.invoke([
    new SystemMessage(
      `
      Create a Carousel from the provided markdown-based slides.

      Arguments Schema Instructions:
       - Respect the argument schema and only use the allowed values for element type: 'Title', 'Subtitle', 'Description'.
       - Each slide can have multiple elements of different types.
       - Respect the 'maxLength' value which is the maximum number of characters. Write less than 70% of that number.

      Guidelines:
       - Improve and refine the provided content while keeping the core message.
       - Maintain the slide structure but feel free to reorganize elements for better flow.
       - Add relevant Emojis to make the content engaging.
       - Keep descriptions concise and impactful.
       - Ensure text is well-formatted for visual presentation.
       - Don't add slide numbers.
       - Aim for ${parsedSlides.metadata.totalSlides} slides (but can adjust for better storytelling).
       `
    ),
    new HumanMessage(
      `Convert these markdown-based slides into an optimized carousel:\n\n${slidesDescription}`
    ),
  ]);

  const jsonParsed = JSON.parse(
    result.additional_kwargs.function_call?.arguments || ""
  );

  const unstyledDocumentParseResult =
    UnstyledDocumentSchema.safeParse(jsonParsed);
  if (unstyledDocumentParseResult.success) {
    const generatedSlides = MultiSlideSchema.parse(unstyledDocumentParseResult.data.slides);

    // Add images from parsed markdown to the generated slides
    return generatedSlides.map((slide, idx) => {
      const parsedSlide = parsedSlides.slides[idx];
      if (!parsedSlide) return slide;

      // Add background image if present
      if (parsedSlide.backgroundImage) {
        slide.backgroundImage = {
          type: "Image" as const,
          source: {
            src: parsedSlide.backgroundImage,
            type: "URL" as const,
          },
          style: {
            opacity: 30, // Default background opacity
          },
        };
      }

      // Add content image if present
      if (parsedSlide.contentImage) {
        slide.elements.push({
          type: "ContentImage" as const,
          source: {
            src: parsedSlide.contentImage,
            type: "URL" as const,
          },
          style: {
            opacity: 100,
            objectFit: "Cover" as const,
          },
        });
      }

      return slide;
    });
  } else {
    console.log("Error in markdown carousel generation schema");
    console.error(unstyledDocumentParseResult.error);
    console.log(jsonParsed);
    return null;
  }
}
