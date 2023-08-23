import useFormPersist from "react-hook-form-persist";

export function usePersistFormWithKey(settingsForm: any, key: string) {
  const { watch, setValue } = settingsForm;

  const localStorage =
    typeof window !== "undefined" ? window.localStorage : undefined;
  useFormPersist(key, {
    watch,
    setValue,
    storage: localStorage,
  });
}
