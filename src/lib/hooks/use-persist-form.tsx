import { useCallback, useEffect } from "react";

export function useRetrieveFormValues(
  localStorageKey: string,
  defaultValues: any
) {
  const getSavedData = useCallback(() => {
    const localStorage =
      typeof window !== "undefined" ? window.localStorage : undefined;
    let data = localStorage?.getItem(localStorageKey);
    if (data) {
      // Parse it to a javaScript object
      try {
        data = JSON.parse(data);
      } catch (err) {
        console.log(err);
      }
      return data;
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
