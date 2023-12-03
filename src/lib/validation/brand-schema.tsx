import * as z from "zod";
import { DEFAULT_IMAGE_INPUT, ImageSchema } from "./image-schema";

export const BrandSchema = z.object({
  avatar: ImageSchema.default(DEFAULT_IMAGE_INPUT),
  name: z
    .string()
    .min(2, {
      message: "Name be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  handle: z.string(),
});
