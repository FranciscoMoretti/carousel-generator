"use client";
import { Metadata } from "next";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsPanel } from "@/components/settings-panel";
import { SlidesEditor } from "@/components/slides-editor";
import React from "react";
import { useComponentPrinter } from "@/lib/hooks/use-component-printer";

import { RefProvider } from "@/lib/providers/reference-context";
import { MainNav } from "./main-nav";
import Pager from "./pager";

export default function Editor({}: {}) {
  const { componentRef, handlePrint, isPrinting } = useComponentPrinter();

  return (
    <RefProvider myRef={componentRef}>
      <div className="flex flex-col">
        <MainNav
          className="h-12 border-b px-6"
          handlePrint={handlePrint}
          isPrinting={isPrinting}
        />
        <div className="flex-1 grid grid-cols-1 items-start md:grid md:grid-cols-[320px_minmax(0,1fr)] ">
          <SettingsPanel />
          <SlidesEditor />
        </div>
      </div>
    </RefProvider>
  );
}
