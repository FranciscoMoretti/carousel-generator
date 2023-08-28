import * as z from "zod";
import {
  IntroSlideSchema,
  OutroSlideSchema,
  SlideSchema,
} from "./slide-schema";
import { ThemeSchema } from "./theme-schema";
import { SettingsSchema } from "./settings-schema";
import { FontsSchema } from "./fonts-schema";

export const DocumentSchema = z.object({
  intro: IntroSlideSchema,
  slides: z.array(SlideSchema),
  outro: OutroSlideSchema,
  settings: SettingsSchema,
  theme: ThemeSchema,
  fonts: FontsSchema,
});
