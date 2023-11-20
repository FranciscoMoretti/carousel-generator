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
  objectFit: ObjectFitType,
});

export enum ImageInputType {
  Url = "URL",
  Upload = "UPLOAD",
  Generated = "GENERATED",
}
const ImageInputTypeSchema = z.nativeEnum(ImageInputType);

export const ImageContentSchema = z.object({
  src: z.union([z.string().url(), ImageDataUrlSchema]),
  type: ImageInputTypeSchema,
});
export const ImageSchema = z.object({
  content: ImageContentSchema,
  style: ImageStyleSchema,
});

export const DEFAULT_IMAGE_INPUT: z.infer<typeof ImageSchema> = {
  content: {
    src: "",
    type: ImageInputType.Url,
  },
  style: {
    objectFit: ObjectFitType.enum.Cover,
  },
};
