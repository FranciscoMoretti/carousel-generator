"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import * as z from "zod";
import { SidebarMenu } from "@/components/menu-bar";
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
import Pager from "@/components/pager";
import { DocumentSchema } from "@/lib/validation/document-schema";

const ALL_FORMS = ["slide", "settings", "theme"];

function SlidePanel({ currentSlide }: { currentSlide: number }) {
  const [selectedForm, setSelectedForm] = useState(ALL_FORMS[0]);

  return (
    <div className=" border p-4 flex flex-col gap-6 rounded shadow w-[448px] h-[560px]">
      <SidebarMenu
        items={ALL_FORMS}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
      {selectedForm == "slide" && <SlidesForm currentSlide={currentSlide} />}
      {selectedForm == "settings" && <SettingsForm />}
      {selectedForm == "theme" && <ThemeForm />}
    </div>
  );
}

function SlideEditor({
  isntanceUrl,
  length,
}: {
  isntanceUrl: string;
  length: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <div className="z-10 max-w-5xl flex flex-col items-center justify-start gap-8 font-mono text-sm ">
        {/* React Slide for debug purposes */}
        {/* <div className="border p-4 rounded shadow flex flex-col items-center ">
      <CarouselSlide
       slide={slidesValues.slides[1]}
       settings={settingsValues}
       theme={themeValues}
      />
      </div> */}
        <div className=" border p-4 rounded shadow overflow-clip w-[1024px]">
          {/* TODO: Make the width responsive */}
          <PDFViewer pdfUrl={isntanceUrl} currentPage={currentSlide} />
        </div>
        <SlidePanel currentSlide={currentSlide}></SlidePanel>
      </div>
      <Pager
        currentPage={currentSlide}
        numPages={length} // TODO: Replace with num pages state
        onPreviousClick={() => setCurrentSlide(currentSlide - 1)}
        onNextClick={() => setCurrentSlide(currentSlide + 1)}
      />
    </div>
  );
}

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
        avatar: "https://thispersondoesnotexist.com",
        name: "My name",
        handle: "@name",
      },
      theme: {
        primary: "#005B8C",
        secondary: "#FFCC4A",
        accent: "#FDF8EC",
      },
    },
  });
  usePersistFormWithKey(documentForm, "documentKey");
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

  return (
    <FormProvider {...documentForm}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SlideEditor
          length={documentValues.slides.length}
          isntanceUrl={isntanceUrl}
        ></SlideEditor>
        <FooterLink documentUrl={instance.url} />
      </main>
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
