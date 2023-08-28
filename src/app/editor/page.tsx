"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import * as z from "zod";
import { SlideSchema, SlideType } from "@/lib/validation/slide-schema";
import { usePersistFormWithKey } from "@/lib/hooks/use-persist-form-with-key";
import { PdfDocument } from "@/components/pdf-document";
import {
  usePDF,
  // @ts-ignore: Library import from inner module to avoid thinking we are on node
} from "@react-pdf/renderer/lib/react-pdf.browser.es";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { PagerProvider } from "@/lib/providers/pager-context";
import { usePager } from "@/lib/hooks/use-pager";
import EditorLayout from "./editor";

export default function Home() {
  const documentForm = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      intro: {
        type: SlideType.enum.Intro,
        title: "YOUR TITLE",
        subtitle: "Your awesome subtitle",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorum.",
      },
      outro: {
        type: SlideType.enum.Outro,
        title: "YOUR TITLE",
        subtitle: "Your awesome subtitle",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorum.",
      },
      slides: Array.from({ length: 5 }).fill({
        type: SlideType.enum.Content,
        title: "YOUR TITLE",
        subtitle: "Your awesome subtitle",
      }) as (typeof SlideSchema)[],
      settings: {
        avatar: "https://www.franciscomoretti.com/profile_picture.jpg",
        name: "My name",
        handle: "@name",
      },
      theme: {
        primary: "#005B8C",
        secondary: "#FFCC4A",
        background: "#FAFAFA",
      },
      fonts: {
        font1: "DM_Sans",
        font2: "DM_Serif_Display",
      },
    },
  });
  usePersistFormWithKey(documentForm, "documentFormKey");
  const documentValues = documentForm.watch();

  const pdfDocument = useMemo(
    () => <PdfDocument document={documentValues} />,
    [documentValues]
  );
  const [instance, updateInstance] = usePDF({ document: pdfDocument });
  const { loading: instanceLoading, url: isntanceUrl } = instance;

  useEffect(() => {
    updateInstance(pdfDocument);
  }, [pdfDocument, updateInstance]);

  const INTRO_OUTRO_PAGES_COUNT = 2;
  const pager = usePager(
    0,
    documentValues.slides.length + INTRO_OUTRO_PAGES_COUNT
  ); // num

  return (
    <FormProvider {...documentForm}>
      <PagerProvider value={pager}>
        <main className="flex min-h-screen flex-col w-full items-stretch justify-between">
          <EditorLayout
            length={documentValues.slides.length}
            isntanceUrl={isntanceUrl}
          />
          <FooterLink documentUrl={instance.url} />
        </main>
      </PagerProvider>
    </FormProvider>
  );
}

function FooterLink({ documentUrl }: { documentUrl: string | null }) {
  return (
    <a href={documentUrl || ""} download="document.pdf">
      <button>Download</button>
    </a>
  );
}
