import * as z from "zod";

export const FontSizeType = z.enum(["Small", "Medium", "Large"]);
export type FontSizeType = z.infer<typeof FontSizeType>;

export const TextALignType = z.enum(["Left", "Center", "Right"]);
export type TextALignType = z.infer<typeof FontSizeType>;

export const TextStyleSchema = z.object({
  fontSize: FontSizeType,
  align: TextALignType,
});

export const TitleSchema = z.object({
  text: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters.",
    })
    .max(160, {
      message: "Title must not be longer than 30 characters.",
    }),
  style: TextStyleSchema,
});

export const SubtitleSchema = z.object({
  text: z
    .string()
    // .min(10, {
    //   message: "Subtitle must be at least 10 characters.",
    // })
    .max(160, {
      message: "Subtitle must not be longer than 30 characters.",
    }),
  style: TextStyleSchema,
});

export const DescriptionSchema = z.object({
  text: z.string(),
  style: TextStyleSchema,
});
