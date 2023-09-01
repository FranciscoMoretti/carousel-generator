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
