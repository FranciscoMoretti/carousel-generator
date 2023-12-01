import * as z from "zod";
import {
  CommonSlideSchema,
  ContentSlideSchema,
  IntroSlideSchema,
  OutroSlideSchema,
  SlideType,
} from "./validation/slide-schema";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SUBTITLE,
  DEFAULT_TITLE,
} from "./validation/text-schema";

import {
  DEFAULT_BACKGROUND_IMAGE_INPUT,
  DEFAULT_CONTENT_IMAGE_INPUT,
} from "./validation/image-schema";

export const COMMON_PAGE: z.infer<typeof CommonSlideSchema> = {
  elements: [
    DEFAULT_TITLE,
    DEFAULT_SUBTITLE,
    DEFAULT_DESCRIPTION,
    DEFAULT_CONTENT_IMAGE_INPUT,
  ],
  backgroundImage: DEFAULT_BACKGROUND_IMAGE_INPUT,
};

export const COMMON_PAGE_2: z.infer<typeof CommonSlideSchema> = {
  elements: [DEFAULT_CONTENT_IMAGE_INPUT, DEFAULT_TITLE],
  backgroundImage: DEFAULT_BACKGROUND_IMAGE_INPUT,
};

export const INTRO: z.infer<typeof IntroSlideSchema> = {
  type: SlideType.enum.Intro,
  title: DEFAULT_TITLE,
  subtitle: DEFAULT_SUBTITLE,
  description: DEFAULT_DESCRIPTION,
  image: DEFAULT_CONTENT_IMAGE_INPUT,
  backgroundImage: DEFAULT_BACKGROUND_IMAGE_INPUT,
};

export const CONTENT: z.infer<typeof ContentSlideSchema> = {
  type: SlideType.enum.Content,
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  image: DEFAULT_CONTENT_IMAGE_INPUT,
  backgroundImage: DEFAULT_BACKGROUND_IMAGE_INPUT,
};
export const OUTRO: z.infer<typeof OutroSlideSchema> = {
  type: SlideType.enum.Outro,
  title: DEFAULT_TITLE,
  subtitle: DEFAULT_SUBTITLE,
  description: DEFAULT_DESCRIPTION,
  image: DEFAULT_CONTENT_IMAGE_INPUT,
  backgroundImage: DEFAULT_BACKGROUND_IMAGE_INPUT,
};

export function getDefaultSlideOfType(slideType: SlideType) {
  if (slideType == SlideType.enum.Content) {
    return { ...CONTENT };
  } else if (slideType == SlideType.enum.Intro) {
    return { ...INTRO };
  } else if (slideType == SlideType.enum.Outro) {
    return { ...OUTRO };
  } else {
    return { ...COMMON_PAGE };
    // TODO This method should be reused for elements
    throw Error(`Unknown slide type [${slideType}]`);
  }
}
