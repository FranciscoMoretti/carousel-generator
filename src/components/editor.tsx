"use client";
import { Metadata } from "next";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsPanel } from "@/components/settings-panel";
import { SlidesEditor } from "@/components/slides-editor";
import { EditorMenubar } from "@/components/editor-menubar";
import { useFormContext } from "react-hook-form";
import { DocumentFormReturn } from "@/lib/document-form-types";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { SIZE } from "@/lib/pdf-resources";
import { useFieldArrayValues } from "@/lib/hooks/use-field-array-values";

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
};

interface EditorLayoutProps {
  instanceUrl: string;
}

export default function EditorLayout({ instanceUrl }: EditorLayoutProps) {
  return (
    <div className=" flex-1 grid grid-cols-1 items-start md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
      <aside className="top-14 z-30 hidden h-full w-full shrink-0 md:sticky md:block border-r">
        <ScrollArea className="py-6  px-6 lg:py-8">
          <SettingsPanel />
        </ScrollArea>
      </aside>

      {/* Change hidden for below for flex col for mobile screens (below) */}
      <div className="">
        <EditorCanvas instanceUrl={instanceUrl} />
      </div>
      <div className="md:hidden p-4">
        <SettingsPanel />
      </div>
    </div>
  );
}

interface EditorCanvasProps {
  instanceUrl: string;
}

function EditorCanvas({ instanceUrl }: EditorCanvasProps) {
  const { numPages } = useFieldArrayValues("slides");
  const [isPrinting, setIsPrinting] = React.useState(false);
  // TODO: Show animation on loading
  const componentRef = React.useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    const current = componentRef.current;
    if (current && typeof current === "object") {
      // @ts-ignore should type narrow more precisely
      const clone = current.cloneNode(true);
      // Change from horizontal to vertical for printing and remove gap
      clone.className = "flex flex-col";
      return clone;
    }

    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
    onBeforePrint: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
    pageStyle: `@page { size: ${SIZE.width}px ${SIZE.height}px;  margin: 0; } @media print { body { -webkit-print-color-adjust: exact; }}`,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (!document) {
        console.error("iFrame does not have a document content");
        return;
      }

      const html = document.getElementById("element-to-download-as-pdf");
      if (!html) {
        console.error("Couldn't find element to convert to PDF");
        return;
      }
      const options = {
        margin: 0,
        filename: "myfile.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          width: SIZE.width,
          height: SIZE.height * numPages,
        },
        jsPDF: { unit: "px", format: [SIZE.width, SIZE.height] },
      };
      // @ts-ignore
      await import("html2pdf.js")
        .then((html2pdf) => {
          html2pdf
            .default()
            .set(options)
            .from(html)
            .save()
            .catch((error: string) =>
              console.error("Failed to PDF processing: ", error)
            );
        })
        .catch((error) =>
          console.error("Failed to import PDF conversion library: ", error)
        );
    },
  });

  return (
    <>
      <div className="h-full flex-col flex">
        <div className="w-full flex flex-col items-start justify-between py-1 my-4 bg-accent rounded-full">
          <EditorMenubar handlePrint={handlePrint} isPrinting={isPrinting} />
        </div>
        <SlidesEditor instanceUrl={instanceUrl} docReference={componentRef} />
      </div>
    </>
  );
}
