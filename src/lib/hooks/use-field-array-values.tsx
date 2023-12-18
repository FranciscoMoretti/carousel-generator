import { UseFormWatch, useFormContext } from "react-hook-form";
import { DocumentFormReturn } from "../document-form-types";

export function useFieldArrayValues(fieldArrayName: string) {
  const { watch }: DocumentFormReturn = useFormContext(); // retrieve those props

  // @ts-ignore should be only the available fields.
  // TODO: construct argument type
  const currentSlidesValues = watch(fieldArrayName);
  const numPages: number | undefined = currentSlidesValues?.length;
  return { numPages };
}
