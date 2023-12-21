import * as z from "zod";
import {
  ContentImageSchema,
  DEFAULT_BACKGROUND_IMAGE_INPUT,
  DEFAULT_CONTENT_IMAGE_INPUT,
  ImageSchema,
} from "./image-schema";
import {
  TitleSchema,
  SubtitleSchema,
  DescriptionSchema,
  UnstyledTitleSchema,
  UnstyledSubtitleSchema,
  UnstyledDescriptionSchema,
} from "./text-schema";

export const SlideType = z.enum(["Intro", "Content", "Outro", "Common"]);
export type SlideType = z.infer<typeof SlideType>;

export const UnstyledElementSchema = z.discriminatedUnion("type", [
  UnstyledTitleSchema,
  UnstyledSubtitleSchema,
  UnstyledDescriptionSchema,
]);

export const ElementSchema = z.discriminatedUnion("type", [
  TitleSchema,
  SubtitleSchema,
  DescriptionSchema,
  ContentImageSchema,
  ImageSchema,
]);

export const UnstyledSlideSchema = z.object({
  elements: z.array(UnstyledElementSchema).max(3),
});

// TODO: Convert into: elements prop with an array of discriminated union of types
export const CommonSlideSchema = z.object({
  elements: z.array(ElementSchema).default([]),
  backgroundImage: ImageSchema.default(DEFAULT_BACKGROUND_IMAGE_INPUT),
});

export const UnstyledMultiSlideSchema = z.array(UnstyledSlideSchema);

export const MultiSlideSchema = z.array(CommonSlideSchema);
