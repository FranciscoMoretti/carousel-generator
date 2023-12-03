import * as z from "zod";
import {
  ContentImageSchema,
  DEFAULT_BACKGROUND_IMAGE_INPUT,
  DEFAULT_CONTENT_IMAGE_INPUT,
  ImageSchema,
} from "./image-schema";
import { TitleSchema, SubtitleSchema, DescriptionSchema } from "./text-schema";

export const ElementSchema = z.discriminatedUnion("type", [
  TitleSchema,
  SubtitleSchema,
  DescriptionSchema,
  ContentImageSchema,
  ImageSchema,
]);

// TODO: Convert into: elements prop with an array of discriminated union of types
export const CommonSlideSchema = z.object({
  elements: z.array(ElementSchema).default([]),
  backgroundImage: ImageSchema.default(DEFAULT_BACKGROUND_IMAGE_INPUT),
});

export const SlideType = z.enum(["Intro", "Content", "Outro"]);
export type SlideType = z.infer<typeof SlideType>;

export const ContentSlideSchema = z.object({
  type: z.literal(SlideType.enum.Content),
  title: TitleSchema.default({}),
  description: DescriptionSchema.default({}),
  // TODO Fix optional usage of images
  image: ContentImageSchema.default(DEFAULT_CONTENT_IMAGE_INPUT),
  backgroundImage: ImageSchema.default(DEFAULT_BACKGROUND_IMAGE_INPUT),
});

export const IntroSlideSchema = z.object({
  type: z.literal(SlideType.enum.Intro),
  title: TitleSchema.default({}),
  subtitle: SubtitleSchema.default({}),
  description: DescriptionSchema.default({}),
  image: ContentImageSchema.default(DEFAULT_CONTENT_IMAGE_INPUT),
  backgroundImage: ImageSchema.default(DEFAULT_BACKGROUND_IMAGE_INPUT),
});

export const OutroSlideSchema = z.object({
  type: z.literal(SlideType.enum.Outro),
  title: TitleSchema.default({}),
  subtitle: SubtitleSchema.default({}),
  description: DescriptionSchema.default({}),
  image: ContentImageSchema.default(DEFAULT_CONTENT_IMAGE_INPUT),
  backgroundImage: ImageSchema.default(DEFAULT_BACKGROUND_IMAGE_INPUT),
});

export const SlideSchema = z.discriminatedUnion("type", [
  ContentSlideSchema,
  IntroSlideSchema,
  OutroSlideSchema,
]);

export const MultiSlideSchema = z.array(CommonSlideSchema);
