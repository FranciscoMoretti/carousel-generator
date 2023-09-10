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

function imagesSrcToProxy(html: HTMLElement) {
  // @ts-ignore
  const images = Array.from(
    html.getElementsByTagName("img")
  ) as HTMLImageElement[];
  const url = process.env.NEXT_PUBLIC_APP_URL;

  images.map((image) => {
    const apiRequestURL = new URL(`${url}/api/proxy`);
    apiRequestURL.searchParams.set("url", image.src);
    // TODO: Consider using the cache
    image.src = apiRequestURL.toString();
  });
}

async function fetchAndConvertImages(html: HTMLElement) {
  // @ts-ignore
  const images = Array.from(
    html.getElementsByTagName("img")
  ) as HTMLImageElement[];

  const base64Promises = images.map(async (image) => {
    const src = image.src;
    const blobUrl = await getImageFromProxy(src)
      .then((blob) => URL.createObjectURL(blob))
      .catch((error) => console.error(error))
      .then((blobUrl) => {
        return blobUrl;
      })
      .catch((error) => console.error(error));

    // const blobUrl = await fetch("https://github.com/FranciscoMoretti.png", {
    //   method: "GET",
    //   redirect: "follow",
    //   mode: "no-cors",
    // })
    //   .then((result) => {
    //     console.log(result);
    //     return result.blob();
    //   })
    //   .catch((error) => console.log("error", error))
    //   .then((blob) => URL.createObjectURL(blob))
    //   .catch((error) => console.error(error))
    //   .then((blobUrl) => {
    //     return blobUrl;
    //   })
    //   .catch((error) => console.error(error));

    if (!blobUrl) {
      console.error("blob url not created");
      return;
    }
    image.src = blobUrl;
  });

  await Promise.all(base64Promises);
}
const url = process.env.NEXT_PUBLIC_APP_URL;

async function getImageFromProxy(imageUrl: string): Promise<any> {
  if (!imageUrl) {
    console.error("Please enter a valid image URL.");
    return "";
  }

  const apiRequestURL = new URL(`${url}/api/proxy`);
  apiRequestURL.searchParams.set("url", imageUrl);
  // TODO: Consider using the cache
  return fetch(apiRequestURL.toString()) // TODO: Maybe disable
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.blob();
    })
    .catch((error) => {
      console.error("Error fetching image:", error);
    });
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
      imagesSrcToProxy(clone);
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
          logging: true,
          imageTimeout: 0,
          useCORS: true,
        },
        jsPDF: { unit: "px", format: [SIZE.width, SIZE.height] },
      };
      // await fetchAndConvertImages(html);
      console.log(html);

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
