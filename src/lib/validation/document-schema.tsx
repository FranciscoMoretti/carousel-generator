import * as z from "zod";
import { MultiSlideSchema, UnstyledMultiSlideSchema } from "./slide-schema";
import { ThemeSchema } from "./theme-schema";
import { BrandSchema } from "./brand-schema";
import { FontsSchema } from "./fonts-schema";
import { PageNumberSchema } from "./page-number-schema";

export const ConfigSchema = z.object({
  brand: BrandSchema,
  theme: ThemeSchema,
  fonts: FontsSchema,
  pageNumber: PageNumberSchema,
});

export const DocumentSchema = z.object({
  slides: MultiSlideSchema,
  config: ConfigSchema,
  filename: z.string(),
});

export const UnstyledDocumentSchema = z.object({
  slides: UnstyledMultiSlideSchema,
});
