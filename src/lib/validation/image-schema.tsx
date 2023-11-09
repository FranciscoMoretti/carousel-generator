import * as z from "zod";

const imageDataUrlSchema = z
  .string()
  .refine((dataUrl) => /^data:image\/[a-z]+;base64,/.test(dataUrl), {
    message: "Invalid data URL format. It should start with 'data:image/'.",
  });
// note the 'as const'

export const IMAGE_INPUT_TYPES = ["URL", "UPLOAD", "GENERATED"] as const;
// works great

export const zImageInputTypes = z.enum(IMAGE_INPUT_TYPES);
export const imageSchema = z.object({
  src: z.union([z.optional(z.string().url()), z.optional(imageDataUrlSchema)]),
  type: zImageInputTypes,
});
