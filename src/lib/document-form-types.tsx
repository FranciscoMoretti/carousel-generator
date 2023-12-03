import {
  FieldPath,
  FieldPathByValue,
  UseFieldArrayReturn,
  UseFormReturn,
  UseFormWatch,
} from "react-hook-form";
import * as z from "zod";
import { DocumentSchema } from "@/lib/validation/document-schema";
import {
  CommonSlideSchema,
  ElementSchema,
} from "@/lib/validation/slide-schema";
import { TextStyleSchema } from "@/lib/validation/text-schema";
import { getPathsByValue } from "@/lib/zod-paths-by-value";
import { CommonPage } from "@/components/pages/common-page";

export type DocumentFormReturn = UseFormReturn<
  z.infer<typeof DocumentSchema>,
  any,
  undefined
>;

export type SlidesFieldArrayReturn = UseFieldArrayReturn<
  z.infer<typeof DocumentSchema>,
  "slides"
>;

export type ElementsFieldArrayReturn = UseFieldArrayReturn<
  z.infer<typeof CommonSlideSchema>,
  `elements` // TODO: This shouldn't be 0, it should be generic
>;

export type SlideFieldPath = `slides.${number}`;

export type TextFieldPath =
  | `slides.${number}.title`
  | `slides.${number}.subtitle`
  | `slides.${number}.description`;

export type TextFieldTextPath =
  | `slides.${number}.title.text`
  | `slides.${number}.subtitle.text`
  | `slides.${number}.description.text`;

export type TextFieldStylePath = FieldPathByValue<
  z.infer<typeof DocumentSchema>,
  z.infer<typeof TextStyleSchema>
>;

export type ElementPath = FieldPathByValue<
  z.infer<typeof DocumentSchema>,
  z.infer<typeof ElementSchema>
>;
