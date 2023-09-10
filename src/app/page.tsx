"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import {
  MultiSlideSchema,
  SlideSchema,
  SlideType,
} from "@/lib/validation/slide-schema";
import { usePersistFormWithKey } from "@/lib/hooks/use-persist-form-with-key";

import { DocumentSchema } from "@/lib/validation/document-schema";
import { PagerProvider } from "@/lib/providers/pager-context";
import { usePager } from "@/lib/hooks/use-pager";
import EditorLayout from "@/components/editor";
import { INTRO, getDefaultSlideOfType } from "@/lib/default-slides";

const defaultSlideValues: z.infer<typeof MultiSlideSchema> = [
  getDefaultSlideOfType(SlideType.enum.Intro),
  getDefaultSlideOfType(SlideType.enum.Content),
  getDefaultSlideOfType(SlideType.enum.Content),
  getDefaultSlideOfType(SlideType.enum.Content),
  getDefaultSlideOfType(SlideType.enum.Content),
  getDefaultSlideOfType(SlideType.enum.Outro),
];

export default function Home() {
  const documentForm = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      slides: defaultSlideValues,
      config: {
        brand: {
          avatar: "https://github.com/FranciscoMoretti.png",
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
    },
  });
  usePersistFormWithKey(documentForm, "documentFormKey");

  const pager = usePager(0); // num

  return (
    <FormProvider {...documentForm}>
      <PagerProvider value={pager}>
        <main className="flex min-h-screen flex-col w-full items-stretch justify-between my-4">
          <EditorLayout instanceUrl={""} />
        </main>
      </PagerProvider>
    </FormProvider>
  );
}
