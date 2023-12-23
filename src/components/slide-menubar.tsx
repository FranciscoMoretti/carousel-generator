"use client";
import { Button } from "@/components/ui/button";
import { usePagerContext } from "@/lib/providers/pager-context";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { useFormContext } from "react-hook-form";
import {
  CornerUpRight,
  CornerUpLeft,
  Copy,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";
import { useFieldArrayValues } from "@/lib/hooks/use-field-array-values";
import { cn } from "@/lib/utils";
import { getSlideNumber } from "@/lib/field-path";

export default function SlideMenubar({
  slidesFieldArray,
  fieldName,
  className = "",
}: {
  slidesFieldArray: SlidesFieldArrayReturn;
  fieldName: string;
  className?: string;
}) {
  const { setCurrentPage } = usePagerContext();
  const { numPages } = useFieldArrayValues("slides");
  const { watch }: DocumentFormReturn = useFormContext(); // retrieve those props
  const currentSlidesValues = watch("slides");
  const currentPage = getSlideNumber(fieldName);
  const { remove, swap, insert } = slidesFieldArray;

  return (
    <div
      className={cn(
        "flex flex-row gap-0 bg-background rounded-t-md rounded-br-md rounded-bl-none px-1 border",
        className
      )}
    >
      <Button
        onClick={() => {
          swap(currentPage, currentPage - 1);
          setCurrentPage(currentPage - 1);
        }}
        variant="ghost"
        size="icon"
        className="w-8 h-8"
        disabled={currentPage <= 0 || currentPage > numPages - 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => {
          console.log({
            currentPage,
            pageValue: currentSlidesValues[currentPage],
          });
          const insertPosition = currentPage;
          const values = JSON.parse(
            JSON.stringify(currentSlidesValues[insertPosition])
          );
          insert(insertPosition, values);
          // TODO A clone sets focus to an input and that resets current page back to `inserposition`
          setCurrentPage(insertPosition + 1);
        }}
        disabled={currentPage == 0 && numPages == 0}
        variant="ghost"
        className="w-8 h-8"
        size="icon"
      >
        <Copy className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => {
          remove(currentPage);
          if (currentPage > 0) {
            // setNumPages(numPages - 1);
            setCurrentPage(currentPage - 1);
          } else if (currentPage == 0 && numPages > 0) {
            setCurrentPage(0);
          } else if (currentPage < 0 || currentPage >= numPages) {
            console.error("Current page number not valid: ", currentPage);
          }
        }}
        disabled={currentPage == 0 && numPages == 0}
        variant="ghost"
        className="w-8 h-8"
        size="icon"
      >
        <Trash className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => {
          swap(currentPage, currentPage + 1);
          setCurrentPage(currentPage + 1);
        }}
        variant="ghost"
        className="w-8 h-8"
        size="icon"
        disabled={currentPage >= numPages - 1}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
