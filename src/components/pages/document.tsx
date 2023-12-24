"use client";
import * as z from "zod";
import React, { useEffect } from "react";
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

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Document({
  document,
  slidesFieldArray,
  scale,
}: {
  document: z.infer<typeof DocumentSchema>;
  slidesFieldArray: SlidesFieldArrayReturn;
  scale: number;
}) {
  const docReference = useRefContext();
  const [api, setApi] = React.useState<CarouselApi>();

  const { currentPage } = usePagerContext();
  const { numPages } = useFieldArrayValues("slides");

  const PAGE_GAP_PX = 8;
  const PADDING_TOP = 48;
  const PADDING_BOTTOM = 48;
  const SLIDE_PADDING_X = 8;

  const { append, prepend } = slidesFieldArray;
  const newPageAsSideButton = numPages > 0;

  const fieldName = "slides";

  useEffect(() => {
    if (api) {
      const NEW_PAGE_BUTTON_OFFSET = 1;
      api.scrollTo(currentPage + NEW_PAGE_BUTTON_OFFSET);
    }
  }, [currentPage, api]);

  return (
    <div className=" flex flex-row justify-center w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
        }}
        className="w-full sm:w-4/5 min-w-[400px]"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top",
          minWidth: `${400 + SLIDE_PADDING_X * 2}px`,
          height: scale * (SIZE.height + PADDING_TOP + PADDING_BOTTOM),
        }}
      >
        <CarouselContent
          ref={docReference}
          id="element-to-download-as-pdf"
          className="-ml-2 md:-ml-4 flex-1"
          style={{
            paddingTop: PADDING_TOP,
            paddingBottom: PADDING_BOTTOM,
          }}
        >
          <CarouselItem
            className="pl-2 md:pl-4 "
            id={"add-slide-1"}
            style={{
              flex: `0 0 ${SIZE.width / 4 + PAGE_GAP_PX}px`,
            }}
          >
            <NewPage
              size={SIZE}
              className="px-2"
              handleAddPage={(pageType: SlideType) => {
                // TODO: Should add with index at different locations and set as current page the index
                prepend(getDefaultSlideOfType(pageType));
              }}
              isSideButton={newPageAsSideButton}
            />
          </CarouselItem>
          {document.slides.map((slide, index) => (
            <CarouselItem
              key={fieldName + "." + index}
              className="pl-2 md:pl-4"
              id={`carousel-item-${index}`}
              style={{
                flex: `0 0 ${SIZE.width + PAGE_GAP_PX}px`,
              }}
            >
              <SlideMenubarWrapper
                className="w-fit"
                slidesFieldArray={slidesFieldArray}
                fieldName={(fieldName + "." + index) as SlideFieldPath}
              >
                <CommonPage
                  config={document.config}
                  slide={slide}
                  index={index}
                  size={SIZE}
                  fieldName={(fieldName + "." + index) as SlideFieldPath}
                  className={cn(
                    currentPage != index &&
                      "hover:brightness-90 hover:cursor-pointer"
                  )}
                />
              </SlideMenubarWrapper>
            </CarouselItem>
          ))}
          <CarouselItem
            className="pl-2 md:pl-4 "
            id={"add-slide-2"}
            style={{
              flex: `0 0 ${SIZE.width / 4 + PAGE_GAP_PX}px`,
            }}
          >
            <NewPage
              size={SIZE}
              className="px-2"
              handleAddPage={(pageType: SlideType) => {
                // TODO: Should add with index at different locations and set as current page the index
                append(getDefaultSlideOfType(pageType));
              }}
              isSideButton={newPageAsSideButton}
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious
          className="sm:-left-12 -left-4"
          style={{
            transform: `scale(${1 / scale})`,
          }}
        />
        <CarouselNext
          className="sm:-right-12 -right-4"
          style={{
            transform: `scale(${1 / scale})`,
          }}
        />
      </Carousel>
    </div>
  );
}
