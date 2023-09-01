import PDFViewer from "./pdf-viewer";
import { SlidePanel } from "./slide-panel";
import SlideMenubar from "./slide-menubar";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";

interface SlidesEditorProps {
  instanceUrl: string;
}

export function SlidesEditor({ instanceUrl }: SlidesEditorProps) {
  const { control }: DocumentFormReturn = useFormContext(); // retrieve those props

  const slidesFieldArray: SlidesFieldArrayReturn = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "slides", // unique name for your Field Array
  });

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
        <SlideMenubar slidesFieldArray={slidesFieldArray} />
        <div className="overflow-clip w-full">
          {/* TODO: Make the width responsive */}
          <PDFViewer pdfUrl={instanceUrl} />
        </div>
        <SlidePanel slidesFieldArray={slidesFieldArray} />
      </div>
    </div>
  );
}
