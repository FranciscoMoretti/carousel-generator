import * as z from "zod";
import { CommonSlideSchema } from "./validation/slide-schema";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SUBTITLE,
  DEFAULT_TITLE,
} from "./validation/text-schema";

import {
  DEFAULT_BACKGROUND_IMAGE_INPUT,
  DEFAULT_CONTENT_IMAGE_INPUT,
} from "./validation/image-schema";
import { SlideType } from "@/lib/validation/slide-schema";

export const COMMON_PAGE: z.infer<typeof CommonSlideSchema> = {
  elements: [DEFAULT_TITLE, DEFAULT_SUBTITLE, DEFAULT_CONTENT_IMAGE_INPUT],
  backgroundImage: DEFAULT_BACKGROUND_IMAGE_INPUT,
};

export const INTRO: z.infer<typeof CommonSlideSchema> = {
  elements: [DEFAULT_TITLE, DEFAULT_CONTENT_IMAGE_INPUT],
  backgroundImage: DEFAULT_BACKGROUND_IMAGE_INPUT,
};

export const CONTENT: z.infer<typeof CommonSlideSchema> = {
  elements: [DEFAULT_TITLE, DEFAULT_DESCRIPTION],
  backgroundImage: DEFAULT_BACKGROUND_IMAGE_INPUT,
};

export const OUTRO: z.infer<typeof CommonSlideSchema> = {
  elements: [DEFAULT_TITLE, DEFAULT_SUBTITLE, DEFAULT_DESCRIPTION],
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
