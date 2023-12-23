"use client";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";
import { cn } from "@/lib/utils";

import { useSelectionContext } from "@/lib/providers/selection-context";
import SlideMenubar from "@/components/slide-menubar";

export default function SlideMenubarWrapper({
  // slidesFieldArray,
  fieldName, //TODO Maybe change with number or expose onclciks
  slidesFieldArray,
  children,
  className = "",
}: //
{
  // slidesFieldArray: SlidesFieldArrayReturn;
  fieldName: string;
  slidesFieldArray: SlidesFieldArrayReturn;
  children: React.ReactNode;
  className?: string;
}) {
  const { currentSelection } = useSelectionContext();

  // const { remove, swap, insert } = slidesFieldArray;
  return (
    <div className="relative w-fit">
      <div
        id={`slide-menubar-${fieldName}`}
        className={cn(
          "absolute -top-10 right-0 ",
          // currentSelection != fieldName && "hidden",
          className
        )}
      >
        <SlideMenubar
          slidesFieldArray={slidesFieldArray}
          fieldName={fieldName}
        />
      </div>
      {children}
    </div>
  );
}
