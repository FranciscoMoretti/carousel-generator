"use client";
import { SidebarPanel } from "@/components/settings-panel";
import { SlidesEditor } from "@/components/slides-editor";
import React from "react";
import { useComponentPrinter } from "@/lib/hooks/use-component-printer";

import { RefProvider } from "@/lib/providers/reference-context";
import { MainNav } from "./main-nav";
import { useFormContext } from "react-hook-form";
import { DocumentFormReturn } from "@/lib/document-form-types";

export default function Editor({}: {}) {
  const { componentRef, handlePrint, isPrinting } = useComponentPrinter();
  const form: DocumentFormReturn = useFormContext();

  return (
    <RefProvider myRef={componentRef}>
      <div className="flex-1 flex flex-col">
        <MainNav
          className="h-12 border-b px-6 "
          handlePrint={handlePrint}
          isPrinting={isPrinting}
        />
        <div className="flex-1 flex flex-start  md:grid md:grid-cols-[320px_minmax(0,1fr)] ">
          <SidebarPanel />
          <SlidesEditor />
        </div>
      </div>
    </RefProvider>
  );
}
