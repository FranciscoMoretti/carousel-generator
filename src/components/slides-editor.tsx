import { SlidePanel } from "./slide-panel";
import SlideMenubar from "./slide-menubar";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";
import { ReactDocument } from "./react-document";
import React from "react";

interface SlidesEditorProps {
  instanceUrl: string;
  docReference: React.MutableRefObject<null>;
}

export function SlidesEditor({ instanceUrl, docReference }: SlidesEditorProps) {
  const { control, watch }: DocumentFormReturn = useFormContext(); // retrieve those props
  const document = watch();

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
         brand={settingsValues}
         theme={themeValues}
        />
        </div> */}
        <SlideMenubar slidesFieldArray={slidesFieldArray} />
        <div className="overflow-clip w-full">
          <ReactDocument document={document} docReference={docReference} />
        </div>
        <SlidePanel slidesFieldArray={slidesFieldArray} />
      </div>
    </div>
  );
}
