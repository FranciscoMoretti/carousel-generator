import PDFViewer from "./PDFViewer";
import { SlidePanel } from "./slide-panel";
import SlideMenubar from "./slide-menubar";

interface SlidesEditorProps {
  isntanceUrl: string;
  length: number;
}

export function SlidesEditor({ isntanceUrl, length }: SlidesEditorProps) {
  return (
    <div className="flex flex-col w-full items-center justify-start gap-4 p-4">
      <div className=" flex flex-col p-4 w-full items-center justify-start gap-3 rounded font-mono text-sm border shadow">
        {/* React Slide for debug purposes */}
        {/* <div className="border p-4 rounded shadow flex flex-col items-center ">
        <CarouselSlide
         slide={slidesValues.slides[1]}
         settings={settingsValues}
         theme={themeValues}
        />
        </div> */}
        <SlideMenubar />
        <div className="overflow-clip w-full">
          {/* TODO: Make the width responsive */}
          <PDFViewer pdfUrl={isntanceUrl} />
        </div>
        <SlidePanel />
      </div>
    </div>
  );
}
