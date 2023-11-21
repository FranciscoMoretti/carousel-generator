import * as z from "zod";

const ImageDataUrlSchema = z
  .string()
  .refine((dataUrl) => /^data:image\/[a-z]+;base64,/.test(dataUrl), {
    message: "Invalid data URL format. It should start with 'data:image/'.",
  });
// note the 'as const'

export const ObjectFitType = z.enum(["Cover", "Contain"]);
export type ObjectFitType = z.infer<typeof ObjectFitType>;

export const ImageStyleSchema = z.object({
  opacity: z.number().positive().lte(100),
});

export const ContentImageStyleSchema = ImageStyleSchema.extend({
  objectFit: ObjectFitType,
});

export enum ImageInputType {
  Url = "URL",
  Upload = "UPLOAD",
  Generated = "GENERATED",
}
const ImageInputTypeSchema = z.nativeEnum(ImageInputType);

export const ImageSourceSchema = z.object({
  src: z.union([z.string().url(), ImageDataUrlSchema]),
  type: ImageInputTypeSchema,
});

export const ImageSchema = z.object({
  source: ImageSourceSchema,
  style: ImageStyleSchema,
});

export const ContentImageSchema = z.object({
  source: ImageSourceSchema,
  style: ContentImageStyleSchema,
});

const DEFAULT_IMAGE_SOURCE = {
  src: "",
  type: ImageInputType.Url,
};

export const DEFAULT_CONTENT_IMAGE_INPUT: z.infer<typeof ContentImageSchema> = {
  source: DEFAULT_IMAGE_SOURCE,
  style: {
    opacity: 100,
    objectFit: ObjectFitType.enum.Cover,
  },
};

export const DEFAULT_IMAGE_INPUT: z.infer<typeof ImageSchema> = {
  source: DEFAULT_IMAGE_SOURCE,
  style: {
    opacity: 100,
  },
};

export const DEFAULT_BACKGROUND_IMAGE_INPUT: z.infer<typeof ImageSchema> = {
  source: DEFAULT_IMAGE_SOURCE,
  style: {
    opacity: 30,
  },
};
