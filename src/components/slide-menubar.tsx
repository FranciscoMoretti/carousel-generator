"use client";
import { Button } from "@/components/ui/button";
import { usePagerContext } from "@/lib/providers/pager-context";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { useFormContext } from "react-hook-form";
import { CornerUpRight, CornerUpLeft, Copy, Trash } from "lucide-react";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";
import { useFieldArrayValues } from "@/lib/hooks/use-field-array-values";

export default function SlideMenubar({
  slidesFieldArray,
}: {
  slidesFieldArray: SlidesFieldArrayReturn;
}) {
  const { currentPage, setCurrentPage } = usePagerContext();
  const { numPages } = useFieldArrayValues("slides");
  const { watch }: DocumentFormReturn = useFormContext(); // retrieve those props

  const currentSlidesValues = watch("slides");

  const { remove, swap, insert } = slidesFieldArray;

  return (
    <div className="flex flex-row gap-1">
      <Button
        onClick={() => {
          swap(currentPage, currentPage - 1);
          setCurrentPage(currentPage - 1);
        }}
        variant="outline"
        size="icon"
        disabled={currentPage <= 0 || currentPage > numPages - 1}
      >
        <CornerUpLeft className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => {
          insert(currentPage, currentSlidesValues[currentPage]);
          setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage == 0 && numPages == 0}
        variant="outline"
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
        variant="outline"
        size="icon"
      >
        <Trash className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => {
          swap(currentPage, currentPage + 1);
          setCurrentPage(currentPage + 1);
        }}
        variant="outline"
        size="icon"
        disabled={currentPage >= numPages - 1}
      >
        <CornerUpRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
