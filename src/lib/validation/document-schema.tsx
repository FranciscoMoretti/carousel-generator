import * as z from "zod";
import { MultiSlideSchema } from "./slide-schema";
import { ThemeSchema } from "./theme-schema";
import { SettingsSchema } from "./settings-schema";
import { FontsSchema } from "./fonts-schema";

export const ConfigSchema = z.object({
  settings: SettingsSchema,
  theme: ThemeSchema,
  fonts: FontsSchema,
});
export const DocumentSchema = z.object({
  slides: MultiSlideSchema,
  config: ConfigSchema,
});
