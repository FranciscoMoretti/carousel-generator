import * as z from "zod";
import {
  ContentSlideSchema,
  IntroSlideSchema,
  OutroSlideSchema,
  SlideType,
} from "./validation/slide-schema";
import { DEFAULT_IMAGE_INPUT } from "./validation/image-schema";

export const INTRO: z.infer<typeof IntroSlideSchema> = {
  type: SlideType.enum.Intro,
  title: "YOUR TITLE",
  subtitle: "Your awesome subtitle",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorum.",
  backgroundImage: DEFAULT_IMAGE_INPUT,
};

export const CONTENT: z.infer<typeof ContentSlideSchema> = {
  type: SlideType.enum.Content,
  title: "A cool title for this slide",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, recusandae.",
  image: DEFAULT_IMAGE_INPUT,
};
export const OUTRO: z.infer<typeof OutroSlideSchema> = {
  type: SlideType.enum.Outro,
  title: "YOUR TITLE",
  subtitle: "Your awesome subtitle",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorum.",
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
