import * as z from "zod";
import { imageSchema } from "./image-schema";

export const BrandSchema = z.object({
  avatar: imageSchema,
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
