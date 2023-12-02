import { ElementType } from "@/lib/validation/element-type";
import * as z from "zod";

const ImageDataUrlSchema = z
  .string()
  .refine((dataUrl) => /^data:image\/[a-z]+;base64,/.test(dataUrl), {
    message: "Invalid data URL format. It should start with 'data:image/'.",
  });

// TODO: Make more granular defaults in all schemas

export const ObjectFitType = z.enum(["Cover", "Contain"]);
export type ObjectFitType = z.infer<typeof ObjectFitType>;

export const ImageStyleSchema = z.object({
  opacity: z.number().positive().lte(100).default(100),
});

export const ContentImageStyleSchema = ImageStyleSchema.extend({
  objectFit: ObjectFitType.default(ObjectFitType.enum.Cover),
});

export enum ImageInputType {
  Url = "URL",
  Upload = "UPLOAD",
  Generated = "GENERATED",
}
const ImageInputTypeSchema = z.nativeEnum(ImageInputType);

const DEFAULT_IMAGE_SOURCE = {
  src: "",
  type: ImageInputType.Url,
};

export const ImageSourceSchema = z.object({
  src: z.union([z.string().url(), ImageDataUrlSchema, z.literal("")]),
  type: ImageInputTypeSchema,
});

export const ImageSchema = z.object({
  type: z.literal(ElementType.enum.Image).default(ElementType.enum.Image),
  source: ImageSourceSchema.default(DEFAULT_IMAGE_SOURCE),
  style: ImageStyleSchema.default({}),
});

export const ContentImageSchema = z.object({
  type: z
    .literal(ElementType.enum.ContentImage)
    .default(ElementType.enum.ContentImage),
  source: ImageSourceSchema.default(DEFAULT_IMAGE_SOURCE),
  style: ContentImageStyleSchema.default({}),
});

export const DEFAULT_CONTENT_IMAGE_INPUT: z.infer<typeof ContentImageSchema> =
  ContentImageSchema.parse({});

export const DEFAULT_IMAGE_INPUT: z.infer<typeof ImageSchema> =
  ImageSchema.parse({});

export const DEFAULT_BACKGROUND_IMAGE_INPUT: z.infer<typeof ImageSchema> =
  ImageSchema.parse({
    style: {
      opacity: 30,
    },
  });
