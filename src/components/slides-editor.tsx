import { useFieldArray, useFormContext } from "react-hook-form";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";
import { Document } from "./pages/document";
import useWindowDimensions from "@/lib/hooks/use-window-dimensions";
import { SIZE } from "@/lib/page-size";
import { LoadingSpinner } from "./loading-spinner";
import { usePagerContext } from "@/lib/providers/pager-context";
import { useFieldArrayValues } from "@/lib/hooks/use-field-array-values";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelectionContext } from "@/lib/providers/selection-context";
import { AIInputForm } from "@/components/ai-input-form";
import { AITextAreaForm } from "@/components/ai-textarea-form";
import { useKeys } from "@/lib/hooks/use-keys";
import { NoApiKeysText } from "./no-api-keys-text";
import { useKeysContext } from "@/lib/providers/keys-context";
import { AIPanel } from "@/components/ai-panel";
import { useEffect, useState } from "react";
import { useStatusContext } from "@/lib/providers/editor-status-context";
import { DocumentSkeleton } from "@/components/editor-skeleton";

interface SlidesEditorProps {}

export function SlidesEditor({}: SlidesEditorProps) {
  const form: DocumentFormReturn = useFormContext();
  const { control, watch } = form;
  const document = watch();
  const { width } = useWindowDimensions();
  const windowWidth = width || 0;
  const isLoadingWidth = !windowWidth;
  const { currentPage, onPreviousClick, onNextClick, setCurrentPage } =
    usePagerContext();
  const { numPages } = useFieldArrayValues("slides");
  const slidesFieldArray: SlidesFieldArrayReturn = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "slides", // unique name for your Field Array
  });
  const { setCurrentSelection } = useSelectionContext();
  const { status, setStatus } = useStatusContext();

  useEffect(() => {
    setStatus("ready");
  }, [setStatus]);

  // Screen with larger than md side have smaller slides because the sidebar is present
  const mdWindowWidthPx = 770;
  const screenToSlideMinRatio = windowWidth > mdWindowWidthPx ? 2.5 : 1.2;
  const scale = Math.min(1, windowWidth / screenToSlideMinRatio / SIZE.width);

  return (
    <div
      className="flex flex-col w-full items-center justify-start bg-muted/20 flex-1 h-full"
      // TODO: When background gets clicked element gets unselected
      onClick={(event) => {
        // Only clear selection if this element started the event
        setCurrentSelection("", event);
      }}
    >
      <div className=" flex flex-col p-4 w-full h-full items-center justify-start gap-8 font-mono text-sm bg-primary/10">
        <div className="w-full px-4 py-10">
          {isLoadingWidth || status == "loading" ? (
            <DocumentSkeleton />
          ) : (
            <Document
              document={document}
              slidesFieldArray={slidesFieldArray}
              scale={scale}
            />
          )}
          {/* <div className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 ">
            <Button
              onClick={onPreviousClick}
              variant="outline"
              size="icon"
              className="border-2 border-primary"
              disabled={currentPage == 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 py-2 ">
            <Button
              onClick={onNextClick}
              variant="outline"
              size="icon"
              className="border-2 border-primary"
              disabled={currentPage == numPages - 1 || numPages == 0}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div> */}
        </div>
        <AIPanel />
      </div>
    </div>
  );
}
