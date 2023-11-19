import * as z from "zod";
import {
  ContentSlideSchema,
  IntroSlideSchema,
  OutroSlideSchema,
  SlideType,
} from "./validation/slide-schema";
import { DescriptionSchema, TitleSchema } from "./validation/text-schema";
import { DEFAULT_IMAGE_INPUT } from "./validation/image-schema";

const DEFAULT_TITLE: z.infer<typeof TitleSchema> = {
  text: "YOUR TITLE",
  style: {
    fontSize: "Medium",
    align: "Left",
  },
};

const DEFAULT_SUBTITLE: z.infer<typeof TitleSchema> = {
  text: "Your awesome subtitle",
  style: {
    fontSize: "Medium",
    align: "Left",
  },
};

const DEFAULT_DESCRIPTION: z.infer<typeof DescriptionSchema> = {
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorum. awesome subtitle",
  style: {
    fontSize: "Medium",
    align: "Left",
  },
};

export const INTRO: z.infer<typeof IntroSlideSchema> = {
  type: SlideType.enum.Intro,
  title: DEFAULT_TITLE,
  subtitle: DEFAULT_SUBTITLE,
  description: DEFAULT_DESCRIPTION,
  backgroundImage: DEFAULT_IMAGE_INPUT,
};

export const CONTENT: z.infer<typeof ContentSlideSchema> = {
  type: SlideType.enum.Content,
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  image: DEFAULT_IMAGE_INPUT,
};
export const OUTRO: z.infer<typeof OutroSlideSchema> = {
  type: SlideType.enum.Outro,
  title: DEFAULT_TITLE,
  subtitle: DEFAULT_SUBTITLE,
  description: DEFAULT_DESCRIPTION,
};

export function getDefaultSlideOfType(slideType: SlideType) {
  if (slideType == SlideType.enum.Content) {
    return { ...CONTENT };
  } else if (slideType == SlideType.enum.Intro) {
    return { ...INTRO };
  } else if (slideType == SlideType.enum.Outro) {
    return { ...OUTRO };
  } else {
    throw Error(`Unknown slide type [${slideType}]`);
  }
}
