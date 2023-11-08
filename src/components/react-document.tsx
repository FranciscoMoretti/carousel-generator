"use client";
import * as z from "zod";
import React from "react";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { SlideType } from "@/lib/validation/slide-schema";
import { ContentPage } from "./react-content-page";
import { SIZE } from "@/lib/page-size";
import { usePagerContext } from "@/lib/providers/pager-context";
import { IntroPage } from "./react-intro-page";
import { OutroPage } from "./react-outro-page";
import { cn } from "@/lib/utils";
import { NewPage } from "./react-new-page";
import { SlidesFieldArrayReturn } from "@/lib/document-form-types";
import { getDefaultSlideOfType } from "@/lib/default-slides";
import { useFieldArrayValues } from "@/lib/hooks/use-field-array-values";
import { useRefContext } from "@/lib/providers/reference-context";

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

  return (
    <div
      className={`relative transition-all`}
      style={{
        left: `calc(${50 * scale}% - ${
          currentPage * (SIZE.width + PAGE_GAP_PX) * scale
        }px - ${SIZE.width * 0.5 * scale}px)`,
        transform: `scale(${scale})`,
        transformOrigin: "top",
      }}
    >
      <div className="flex flex-row gap-2">
        <div
          ref={docReference}
          className="flex flex-row gap-2"
          id="element-to-download-as-pdf"
        >
          {document.slides.map((slide, index) =>
            // TODO: Write a wrapper Page class to remove duplication
            slide.type == SlideType.enum.Content ? (
              <ContentPage
                config={document.config}
                slide={slide}
                key={index}
                index={index}
                size={SIZE}
                className={cn(
                  "",
                  currentPage != index &&
                    "hover:brightness-90 hover:cursor-pointer "
                )}
                handleClick={() => setCurrentPage(index)}
              />
            ) : slide.type == SlideType.enum.Intro ? (
              <IntroPage
                config={document.config}
                slide={slide}
                key={index}
                index={index}
                size={SIZE}
                className={cn(
                  currentPage != index &&
                    "hover:brightness-90 hover:cursor-pointer"
                )}
                handleClick={() => setCurrentPage(index)}
              />
            ) : slide.type == SlideType.enum.Outro ? (
              <OutroPage
                config={document.config}
                slide={slide}
                key={index}
                index={index}
                size={SIZE}
                className={cn(
                  currentPage != index &&
                    "hover:brightness-90 hover:cursor-pointer"
                )}
                handleClick={() => setCurrentPage(index)}
              />
            ) : null
          )}
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
