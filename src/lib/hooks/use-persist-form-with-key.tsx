import useFormPersist from "react-hook-form-persist";

export function usePersistFormWithKey(settingsForm: any, key: string) {
  const { watch: settingsWatch, setValue: settingsSetValue } = settingsForm;

  useFormPersist(key, {
    watch: settingsWatch,
    setValue: settingsSetValue,
    storage: window.localStorage,
  });
}
