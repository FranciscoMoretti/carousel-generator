"use client";
import * as z from "zod";
import React from "react";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { SIZE } from "@/lib/page-size";
import { usePagerContext } from "@/lib/providers/pager-context";
import { cn } from "@/lib/utils";
import { NewPage } from "@/components/pages/new-page";
import {
  SlideFieldPath,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";
import { SlideType } from "@/lib/validation/slide-schema";

import { getDefaultSlideOfType } from "@/lib/default-slides";
import { useFieldArrayValues } from "@/lib/hooks/use-field-array-values";
import { useRefContext } from "@/lib/providers/reference-context";
import { CommonPage } from "@/components/pages/common-page";
import SlideMenubarWrapper from "@/components/slide-menubar-wrapper";

export function ReactDocument({
  document,
  slidesFieldArray,
  scale,
}: {
  document: z.infer<typeof DocumentSchema>;
  slidesFieldArray: SlidesFieldArrayReturn;
  scale: number;
}) {
  const docReference = useRefContext();

  const { currentPage, setCurrentPage } = usePagerContext();
  const { numPages } = useFieldArrayValues("slides");

  const PAGE_GAP_PX = 8;
  const { append } = slidesFieldArray;
  const newPageAsSideButton = numPages > 0;

  const fielName = "slides";

  return (
    <div
      className={`relative transition-all`}
      style={{
        left: `calc(${50 * scale}% - ${
          currentPage * (SIZE.width + PAGE_GAP_PX) * scale
        }px - ${SIZE.width * 0.5 * scale}px)`,
        transform: `scale(${scale})`,
        transformOrigin: "top",
        height: `${SIZE.height * scale}px`,
      }}
    >
      <div className="flex flex-row gap-2">
        <div
          ref={docReference}
          className="flex flex-row gap-2"
          id="element-to-download-as-pdf"
        >
          {document.slides.map((slide, index) => (
            <SlideMenubarWrapper
              slidesFieldArray={slidesFieldArray}
              fieldName={(fielName + "." + index) as SlideFieldPath}
              key={fielName + "." + index}
            >
              <CommonPage
                config={document.config}
                slide={slide}
                index={index}
                size={SIZE}
                fieldName={(fielName + "." + index) as SlideFieldPath}
                className={cn(
                  currentPage != index &&
                    "hover:brightness-90 hover:cursor-pointer"
                )}
              />
            </SlideMenubarWrapper>
          ))}
        </div>
        <NewPage
          size={SIZE}
          handleAddPage={(pageType: SlideType) => {
            // TODO: Should add with index at different locations and set as current page the index
            append(getDefaultSlideOfType(pageType));
          }}
          isSideButton={newPageAsSideButton}
        />
      </div>
    </div>
  );
}
