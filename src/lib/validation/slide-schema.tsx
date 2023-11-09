import * as z from "zod";

export const SlideType = z.enum(["Intro", "Content", "Outro"]);
export type SlideType = z.infer<typeof SlideType>;

const imageDataUrlSchema = z
  .string()
  .refine((dataUrl) => /^data:image\/[a-z]+;base64,/.test(dataUrl), {
    message: "Invalid data URL format. It should start with 'data:image/'.",
  });

// note the 'as const'
export const IMAGE_INPUT_TYPES = ["URL", "UPLOAD", "GENERATED"] as const;

// works great
export const zImageInputTypes = z.enum(IMAGE_INPUT_TYPES);

const imageSchema = z.object({
  src: z.union([z.optional(z.string().url()), z.optional(imageDataUrlSchema)]),
  type: zImageInputTypes,
});

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
  // TODO Fix optional usage of images
  image: imageSchema,
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
  backgroundImage: imageSchema,
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
