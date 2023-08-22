import useFormPersist from "react-hook-form-persist";

export function usePersistFormWithKey(settingsForm: any, key: string) {
  const { watch: settingsWatch, setValue: settingsSetValue } = settingsForm;

  const localStorage =
    typeof window !== "undefined" ? window.localStorage : undefined;
  useFormPersist(key, {
    watch: settingsWatch,
    setValue: settingsSetValue,
    storage: localStorage,
  });
}
