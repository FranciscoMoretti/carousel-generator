import * as z from "zod";
import {
  ContentImageSchema,
  DEFAULT_BACKGROUND_IMAGE_INPUT,
  DEFAULT_CONTENT_IMAGE_INPUT,
  ImageSchema,
} from "./image-schema";
import { TitleSchema, SubtitleSchema, DescriptionSchema } from "./text-schema";

export const SlideType = z.enum(["Intro", "Content", "Outro", "Common"]);
export type SlideType = z.infer<typeof SlideType>;

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

export const MultiSlideSchema = z.array(CommonSlideSchema);
