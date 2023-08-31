import * as z from "zod";
import {
  IntroSlideSchema,
  MultiSlideSchema,
  OutroSlideSchema,
  SlideSchema,
} from "./slide-schema";
import { ThemeSchema } from "./theme-schema";
import { SettingsSchema } from "./settings-schema";
import { FontsSchema } from "./fonts-schema";

export const DocumentSchema = z.object({
  slides: MultiSlideSchema,
  settings: SettingsSchema,
  theme: ThemeSchema,
  fonts: FontsSchema,
});
