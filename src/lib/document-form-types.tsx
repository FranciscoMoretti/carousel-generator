import {
  FieldPath,
  UseFieldArrayReturn,
  UseFormReturn,
  UseFormWatch,
} from "react-hook-form";
import * as z from "zod";
import { DocumentSchema } from "@/lib/validation/document-schema";

export type DocumentFormReturn = UseFormReturn<
  z.infer<typeof DocumentSchema>,
  any,
  undefined
>;

export type SlidesFieldArrayReturn = UseFieldArrayReturn<
  z.infer<typeof DocumentSchema>,
  "slides"
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

export type TextFieldStylePath =
  | `slides.${number}.title.style`
  | `slides.${number}.subtitle.style`
  | `slides.${number}.description.style`;
