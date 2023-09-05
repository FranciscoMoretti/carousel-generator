import { Metadata } from "next";
import Image from "next/image";
// import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EditorSidebar } from "@/components/editor-sidebar";
import { SlidesEditor } from "@/components/slides-editor";
import { EditorMenubar } from "@/components/editor-menubar";
import { useFormContext } from "react-hook-form";
import { DocumentFormReturn } from "@/lib/document-form-types";
import React from "react";
import { useReactToPrint } from "react-to-print";
import { SIZE } from "@/lib/pdf-resources";

export const metadata: Metadata = {
  title: "Playground",
  description: "The OpenAI Playground built using the components.",
};

interface EditorLayoutProps {
  instanceUrl: string;
}

export default function EditorLayout({ instanceUrl }: EditorLayoutProps) {
  return (
    <div className="border-b">
      <div className=" flex-1 flex flex-row items-start md:grid md:grid-cols-[280px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
        <aside className="top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block border-r">
          <ScrollArea className="py-6  px-6 lg:py-8">
            <EditorSidebar />
          </ScrollArea>
        </aside>
        {/* Change hidden for below for flex col for mobile screens (below) */}
        <div className="">
          <EditorCanvas instanceUrl={instanceUrl} />
        </div>
      </div>
    </div>
  );
}

interface EditorCanvasProps {
  instanceUrl: string;
}

function EditorCanvas({ instanceUrl }: EditorCanvasProps) {
  const { control, watch }: DocumentFormReturn = useFormContext(); // retrieve those props

  const document = watch();
  const [isPrinting, setIsPrinting] = React.useState(false);
  // TODO: Show animation on loading
  const componentRef = React.useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    const current = componentRef.current;
    if (current && typeof current === "object") {
      // @ts-ignore should type narrow more precisely
      const clone = current.cloneNode(true);
      // Change from horizontal to vertical for printing
      clone.className = "flex flex-col";
      return clone;
    }

    return componentRef.current;
  }, []);
  // }, [componentRef.current]); // TODO: Remove comment if not needed

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
    onBeforePrint: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
    pageStyle: `@page { size: ${SIZE.width}px ${SIZE.height}px;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; }}`,
    // fonts: CUSTOM_FONTS,
  });

  return (
    <>
      <div className="h-full flex-col flex">
        <Separator />
        <div className="w-full flex flex-col items-start justify-between space-y-2 py-1 my-4 bg-accent rounded-full container">
          <EditorMenubar handlePrint={handlePrint} isPrinting={isPrinting} />
          {/* <div className="ml-auto flex w-full space-x-2 sm:justify-end">
            <PresetSelector presets={presets} />
            <PresetSave />
            <div className="hidden space-x-2 md:flex">
              <CodeViewer />
              <PresetShare />
            </div>
            <PresetActions />
          </div> */}
        </div>
        <SlidesEditor instanceUrl={instanceUrl} docReference={componentRef} />
      </div>
    </>
  );
}
