"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { MultiSlideSchema } from "@/lib/validation/slide-schema";
import {
  useRetrieveFormValues,
  usePersistFormValues,
} from "@/lib/hooks/use-persist-form";
import { SlideType } from "@/lib/validation/slide-schema";

import { DocumentSchema } from "@/lib/validation/document-schema";
import { PagerProvider } from "@/lib/providers/pager-context";
import { usePager } from "@/lib/hooks/use-pager";
import { getDefaultSlideOfType } from "@/lib/default-slides";
import { DEFAULT_IMAGE_INPUT } from "../validation/image-schema";
import { SelectionProvider } from "@/lib/providers/selection-context";
import { useSelection } from "@/lib/hooks/use-selection";
import { DocumentFormReturn } from "@/lib/document-form-types";

const FORM_DATA_KEY = "documentFormKey";

const defaultSlideValues: z.infer<typeof MultiSlideSchema> = [
  getDefaultSlideOfType(SlideType.enum.Intro),
  getDefaultSlideOfType(SlideType.enum.Common),
  getDefaultSlideOfType(SlideType.enum.Content),
  getDefaultSlideOfType(SlideType.enum.Content),
  getDefaultSlideOfType(SlideType.enum.Outro),
];

const defaultValues = {
  slides: defaultSlideValues,
  config: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,

      name: "My name",
      handle: "@name",
    },
    theme: {
      isCustom: false,
      pallette: "pallette-1",
      primary: "#b1e4cc",
      secondary: "#9ac141",
      background: "#202624",
    },
    fonts: {
      font1: "DM_Serif_Display",
      font2: "DM_Sans",
    },
    pageNumber: {
      showNumbers: true,
    },
  },
  filename: "My Carousel File",
};
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
