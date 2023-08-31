import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { DocumentSchema } from "@/lib/validation/document-schema";

export type DocumentFormReturn = UseFormReturn<
  z.infer<typeof DocumentSchema>,
  any,
  undefined
>;
