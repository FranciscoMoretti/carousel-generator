import { useFieldArray, useFormContext } from "react-hook-form";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";
import { ReactDocument } from "./pages/document";
import useWindowDimensions from "@/lib/hooks/use-window-dimensions";
import { SIZE } from "@/lib/page-size";
import { LoadingSpinner } from "./loading-spinner";
import { usePagerContext } from "@/lib/providers/pager-context";
import { useFieldArrayValues } from "@/lib/hooks/use-field-array-values";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelectionContext } from "@/lib/providers/selection-context";

interface SlidesEditorProps {}

export function SlidesEditor({}: SlidesEditorProps) {
  const form: DocumentFormReturn = useFormContext();
  const { control, watch } = form;
  const document = watch();
  const { width: windowWidth } = useWindowDimensions();
  const isLoadingWidth = !windowWidth;
  const { currentPage, onPreviousClick, onNextClick, setCurrentPage } =
    usePagerContext();
  const { numPages } = useFieldArrayValues("slides");
  const slidesFieldArray: SlidesFieldArrayReturn = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "slides", // unique name for your Field Array
  });
  const { setCurrentSelection } = useSelectionContext();

  // TODO: Replace with better loading indicator (sized skeleton from shadcn/ui)
  if (isLoadingWidth) {
    return (
      <div className="w-full flex items-center justify-center h-full bg-muted/20">
        <LoadingSpinner />
      </div>
    );
  }

  // Screen with larger than md side have smaller slides because the sidebar is present
  const mdWindowWidthPx = 770;
  const screenToSlideMinRatio = windowWidth > mdWindowWidthPx ? 2.5 : 1.4;
  const SCALE = Math.min(1, windowWidth / screenToSlideMinRatio / SIZE.width);

  return (
    <div
      className="flex flex-col w-full items-center justify-start bg-muted/20 flex-1 h-full"
      // TODO: When background gets clicked element gets unselected
      onClick={(event) => {
        // Only clear selection if this element started the event
        setCurrentSelection("", event);
      }}
    >
      <div className=" flex flex-col p-4 w-full items-center justify-start gap-3 font-mono text-sm">
        <div className="relative w-full px-4 py-10 overflow-clip">
          <ReactDocument
            document={document}
            slidesFieldArray={slidesFieldArray}
            scale={SCALE}
          />
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 py-2 ">
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
          </div>
        </div>
      </div>
    </div>
  );
}
