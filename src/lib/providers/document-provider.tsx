"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import {
  useRetrieveFormValues,
  usePersistFormValues,
} from "@/lib/hooks/use-persist-form";

import { DocumentSchema } from "@/lib/validation/document-schema";
import { PagerProvider } from "@/lib/providers/pager-context";
import { usePager } from "@/lib/hooks/use-pager";
import { SelectionProvider } from "@/lib/providers/selection-context";
import { useSelection } from "@/lib/hooks/use-selection";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { defaultValues } from "@/lib/default-document";

const FORM_DATA_KEY = "documentFormKey";

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const { getSavedData } = useRetrieveFormValues(FORM_DATA_KEY, defaultValues);
  const documentForm: DocumentFormReturn = useForm<
    z.infer<typeof DocumentSchema>
  >({
    resolver: zodResolver(DocumentSchema),
    defaultValues: getSavedData(),
  });
  usePersistFormValues({
    localStorageKey: FORM_DATA_KEY,
    values: documentForm.getValues(),
  });

  const selection = useSelection();
  const pager = usePager(0);
  return (
    <FormProvider {...documentForm}>
      <SelectionProvider value={selection}>
        <PagerProvider value={pager}>
          <div className="flex-1 flex flex-col">{children}</div>
        </PagerProvider>
      </SelectionProvider>
    </FormProvider>
  );
}
