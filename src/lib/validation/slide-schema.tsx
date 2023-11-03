import * as z from "zod";

export const SlideType = z.enum(["Intro", "Content", "Outro"]);
export type SlideType = z.infer<typeof SlideType>;

export const ContentSlideSchema = z.object({
  type: z.literal(SlideType.enum.Content),
  title: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters.",
    })
    .max(160, {
      message: "Title must not be longer than 30 characters.",
    }),
  description: z.string(),
  image: z.string().url(),
});

export const IntroSlideSchema = z.object({
  type: z.literal(SlideType.enum.Intro),
  title: z
    .string()
    // .min(10, {
    //   message: "Title must be at least 10 characters.",
    // })
    .max(160, {
      message: "Title must not be longer than 30 characters.",
    }),
  subtitle: z
    .string()
    // .min(10, {
    //   message: "Subtitle must be at least 10 characters.",
    // })
    .max(160, {
      message: "Subtitle must not be longer than 30 characters.",
    }),
  description: z.string(),
  backgroundImage: z.string().url(),
});

export const OutroSlideSchema = z.object({
  type: z.literal(SlideType.enum.Outro),
  title: z
    .string()
    // .min(10, {
    //   message: "Title must be at least 10 characters.",
    // })
    .max(160, {
      message: "Title must not be longer than 30 characters.",
    }),
  subtitle: z
    .string()
    // .min(10, {
    //   message: "Subtitle must be at least 10 characters.",
    // })
    .max(160, {
      message: "Subtitle must not be longer than 30 characters.",
    }),
  description: z.string(),
});

export const SlideSchema = z.discriminatedUnion("type", [
  ContentSlideSchema,
  IntroSlideSchema,
  OutroSlideSchema,
]);

export const MultiSlideSchema = z.array(SlideSchema);
