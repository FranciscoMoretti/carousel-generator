"use client";
import { Metadata } from "next";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsPanel } from "@/components/settings-panel";
import { SlidesEditor } from "@/components/slides-editor";
import React from "react";
import { useComponentPrinter } from "@/lib/hooks/use-component-printer";

import { EditorMenubar } from "@/components/editor-menubar";
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
        <div className="flex-1 grid grid-cols-1 items-start md:grid md:grid-cols-[260px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">
          <aside className="top-14 z-30 hidden h-full w-full shrink-0 md:sticky md:block border-r">
            <ScrollArea className="py-6  px-6 lg:py-8">
              <SettingsPanel />
            </ScrollArea>
          </aside>

          {/* Change hidden for below for flex col for mobile screens (below) */}
          <div className="h-full flex-col flex gap-4">
            <SlidesEditor />
          </div>
          <div className="md:hidden p-4">
            <SettingsPanel />
          </div>
        </div>
      </div>
    </RefProvider>
  );
}
