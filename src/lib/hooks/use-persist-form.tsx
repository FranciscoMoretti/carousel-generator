import { useCallback, useEffect } from "react";

export function useRetrieveFormValues<T>(
  localStorageKey: string,
  defaultValues: T
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
        return parsedData;
      } catch (err) {
        console.log(err);
      }
    }
    return defaultValues;
  }, [defaultValues, localStorageKey]);

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
