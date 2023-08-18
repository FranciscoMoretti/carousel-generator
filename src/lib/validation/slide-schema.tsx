import * as z from "zod";

export const SlideSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters.",
    })
    .max(160, {
      message: "Title must not be longer than 30 characters.",
    }),
  subtitle: z
    .string()
    .min(10, {
      message: "Subtitle must be at least 10 characters.",
    })
    .max(160, {
      message: "Subtitle must not be longer than 30 characters.",
    }),
  description: z.string(),
});
