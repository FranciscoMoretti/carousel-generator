import { DocumentSchema } from "@/lib/validation/document-schema";
import { useCallback, useEffect } from "react";
import { ZodType, z } from "zod";

export function useRetrieveFormValues<T, DocumentSchema>(
  localStorageKey: string,
  defaultValues: T,
  schema: typeof DocumentSchema
) {
  const getSavedData: () => T | undefined = useCallback(() => {
    const localStorage =
      typeof window !== "undefined" ? window.localStorage : undefined;
    if (!localStorage) {
      return undefined;
    }
    let data = localStorage?.getItem(localStorageKey);
    if (data) {
      // Parse it to a javaScript object
      try {
        const parsedData = JSON.parse(data) as T;
        if (!schema) {
          return parsedData;
        }
        const safeParseResult = schema.safeParse(parsedData);
        if (safeParseResult.success) {
          return safeParseResult.data as T;
        } else {
          console.error(safeParseResult.error);
          localStorage.clear();
          return defaultValues;
        }
      } catch (err) {
        console.log(err);
      }
    }
    return defaultValues;
  }, [defaultValues, localStorageKey, schema]);

  return { getSavedData };
}

export const usePersistFormValues = ({
  localStorageKey,
  values,
}: {
  localStorageKey: string;
  values: any;
}) => {
  useEffect(() => {
    const localStorage =
      typeof window !== "undefined" ? window.localStorage : undefined;
    localStorage?.setItem(localStorageKey, JSON.stringify(values));
  }, [values, localStorageKey]);

  return;
};
