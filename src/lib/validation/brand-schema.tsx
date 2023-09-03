import * as z from "zod";

export const BrandSchema = z.object({
  avatar: z.string(),
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
