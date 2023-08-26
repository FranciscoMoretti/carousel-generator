import { useState } from "react";
import PDFViewer from "./PDFViewer";
import { SlidePanel } from "./slide-panel";
import Pager from "./pager";

interface SlidesEditorProps {
  isntanceUrl: string;
  length: number;
}

export function SlidesEditor({ isntanceUrl, length }: SlidesEditorProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <div className="z-10 flex flex-col items-center justify-start rounded gap-8 font-mono text-sm border p-4 m-4 shadow">
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
