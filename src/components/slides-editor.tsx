import { useState } from "react";
import PDFViewer from "./PDFViewer";
import { SlidePanel } from "./slide-panel";
import Pager from "./pager";
import { EditorMenubar } from "./menubar";
import { usePager } from "@/lib/hooks/use-pager";
import { usePagerContext } from "@/lib/providers/pager-context";

interface SlidesEditorProps {
  isntanceUrl: string;
  length: number;
}

export function SlidesEditor({ isntanceUrl, length }: SlidesEditorProps) {
  const { currentPage, onPreviousClick, onNextClick } = usePagerContext();

  return (
    <div className="flex flex-col w-full items-center justify-start gap-4 p-4">
      <div className="flex flex-row gap-4">
        <EditorMenubar />
        <Pager
          currentPage={currentPage}
          numPages={length} // TODO: Replace with num pages state
          onPreviousClick={onPreviousClick}
          onNextClick={onNextClick}
        />
      </div>
      <div className=" flex flex-col p-4 w-full items-center justify-start gap-4 rounded font-mono text-sm border shadow">
        {/* React Slide for debug purposes */}
        {/* <div className="border p-4 rounded shadow flex flex-col items-center ">
        <CarouselSlide
         slide={slidesValues.slides[1]}
         settings={settingsValues}
         theme={themeValues}
        />
        </div> */}
        <div className="overflow-clip w-full">
          {/* TODO: Make the width responsive */}
          <PDFViewer pdfUrl={isntanceUrl} currentPage={currentPage} />
        </div>
        <SlidePanel currentSlide={currentPage}></SlidePanel>
      </div>
    </div>
  );
}
