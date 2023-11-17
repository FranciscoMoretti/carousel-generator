import * as z from "zod";

const imageDataUrlSchema = z
  .string()
  .refine((dataUrl) => /^data:image\/[a-z]+;base64,/.test(dataUrl), {
    message: "Invalid data URL format. It should start with 'data:image/'.",
  });
// note the 'as const'

export enum ImageInputType {
  Url = "URL",
  Upload = "UPLOAD",
  Generated = "GENERATED",
}
const ImageInputTypeSchema = z.nativeEnum(ImageInputType);

export const imageSchema = z.object({
  src: z.union([z.string().url(), imageDataUrlSchema]),
  type: ImageInputTypeSchema,
});

export const DEFAULT_IMAGE_INPUT: z.infer<typeof imageSchema> = {
  src: "",
  type: ImageInputType.Url,
};
