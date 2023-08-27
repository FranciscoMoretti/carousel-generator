"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { SlidesForm } from "@/components/slides-form";
import { MultiSlideSchema, SlideSchema } from "@/lib/validation/slide-schema";
import { CarouselSlide } from "@/components/carousel-slide";
import { SettingsSchema } from "@/lib/validation/settings-schema";
import { SettingsForm } from "@/components/settings-form";
import { usePersistFormWithKey } from "@/lib/hooks/use-persist-form-with-key";
import { ThemeSchema } from "@/lib/validation/theme-schema";
import { ThemeForm } from "@/components/theme-form";
import { PdfSlide } from "@/components/pdf-slide";
import { PDFViewer } from "@/components/PDFViewer";
import {
  BlobProvider,
  PDFDownloadLink,
  usePDF,
  // @ts-ignore: Library import from inner module to avoid thinking we are on node
} from "@react-pdf/renderer/lib/react-pdf.browser.es";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { SlidesEditor } from "@/components/slides-editor";
import EditorLayout from "./editor";
import { usePager } from "@/lib/hooks/use-pager";
import { PagerProvider } from "@/lib/providers/pager-context";

export default function Home() {
  const documentForm = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      slides: Array.from({ length: 5 }).fill({
        title: "YOUR TITLE",
        subtitle: "Your awesome subtitle",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorum.",
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
    },
  });
  usePersistFormWithKey(documentForm, "documentFormKey");
  const documentValues = documentForm.watch();

  const pdfDocument = useMemo(
    () => (
      <PdfSlide
        slides={documentValues.slides}
        settings={documentValues.settings}
        theme={documentValues.theme}
      />
    ),
    [documentValues]
  );
  const [instance, updateInstance] = usePDF({ document: pdfDocument });
  const { loading: instanceLoading, url: isntanceUrl } = instance;

  useEffect(() => {
    updateInstance(pdfDocument);
  }, [pdfDocument, updateInstance]);

  const pager = usePager(0, documentValues.slides.length); // Provide the initial page and numPages

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
