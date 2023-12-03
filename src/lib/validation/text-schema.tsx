import { ElementType } from "@/lib/validation/element-type";
import * as z from "zod";

export const FontSizeType = z.enum(["Small", "Medium", "Large"]);
export type FontSizeType = z.infer<typeof FontSizeType>;

export const TextALignType = z.enum(["Left", "Center", "Right"]);
export type TextALignType = z.infer<typeof TextALignType>;

export const TextStyleSchema = z.object({
  fontSize: FontSizeType.default(FontSizeType.enum.Medium),
  align: TextALignType.default(TextALignType.enum.Left),
});

export const TitleSchema = z.object({
  type: z.literal(ElementType.enum.Title).default(ElementType.enum.Title),
  text: z
    .string()
    .max(160, {
      message: "Title must not be longer than 160 characters.",
    })
    .default(""),
  style: TextStyleSchema.default({}),
});

export const SubtitleSchema = z.object({
  type: z.literal(ElementType.enum.Subtitle).default(ElementType.enum.Subtitle),
  text: z
    .string()
    // .min(10, {
    //   message: "Subtitle must be at least 10 characters.",
    // })
    .max(160, {
      message: "Subtitle must not be longer than 30 characters.",
    })
    .default(""),
  style: TextStyleSchema.default({}),
});

export const DescriptionSchema = z.object({
  type: z
    .literal(ElementType.enum.Description)
    .default(ElementType.enum.Description),
  text: z.string().default(""),
  style: TextStyleSchema.default({}),
});

export const DEFAULT_TITLE: z.infer<typeof TitleSchema> = TitleSchema.parse({
  text: "YOUR TITLE",
});

export const DEFAULT_SUBTITLE: z.infer<typeof SubtitleSchema> =
  SubtitleSchema.parse({
    text: "Your awesome subtitle",
  });

export const DEFAULT_DESCRIPTION: z.infer<typeof DescriptionSchema> =
  DescriptionSchema.parse({
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorum. awesome subtitle",
  });
