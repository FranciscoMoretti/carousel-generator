import { useState } from "react";
import PDFViewer from "./PDFViewer";
import { SlidePanel } from "./slide-panel";
import Pager from "./pager";

export function SlidesEditor({
  isntanceUrl,
  length,
}: {
  isntanceUrl: string;
  length: number;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div>
      <div className="z-10 max-w-5xl flex flex-col items-center justify-start gap-8 font-mono text-sm">
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
