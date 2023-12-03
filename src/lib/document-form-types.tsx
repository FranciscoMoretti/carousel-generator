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
import {
  DescriptionSchema,
  TextStyleSchema,
} from "@/lib/validation/text-schema";
import { CommonPage } from "@/components/pages/common-page";
import { ContentImageSchema } from "@/lib/validation/image-schema";

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

export type TextFieldTextPath = `slides.${number}.elements.${number}.text`;
export type TextFieldStylePath = `slides.${number}.elements.${number}.style`;
export type TextFieldStyle = z.infer<typeof TextStyleSchema>;

export type ElementPath = FieldPathByValue<
  z.infer<typeof DocumentSchema>,
  z.infer<typeof ElementSchema>
>;
export type ElementArrayPath = `slides.${number}.elements`;

export type DescriptionPath = FieldPathByValue<
  z.infer<typeof DocumentSchema>,
  z.infer<typeof DescriptionSchema>
>;

export type ImagePath =
  | `slides.${number}.elements.${number}`
  | `slides.${number}.backgroundImage`
  | "config.brand.avatar";

export type ImageSourcePath =
  | `slides.${number}.elements.${number}.source`
  | `slides.${number}.backgroundImage.source`
  | "config.brand.avatar.source";
