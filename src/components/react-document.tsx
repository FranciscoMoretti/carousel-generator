import * as z from "zod";
import React from "react";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { SlideType } from "@/lib/validation/slide-schema";
import { ContentPage } from "./react-content-page";
import { SIZE } from "@/lib/pdf-resources";
import { usePagerContext } from "@/lib/providers/pager-context";
import { IntroPage } from "./react-intro-page";
import { OutroPage } from "./react-outro-page";
import { cn } from "@/lib/utils";
import { NewPage } from "./react-new-page";
import { SlidesFieldArrayReturn } from "@/lib/document-form-types";
import { getDefaultSlideOfType } from "@/lib/default-slides";

export function ReactDocument({
  document,
  docReference,
  slidesFieldArray,
}: {
  document: z.infer<typeof DocumentSchema>;
  docReference: React.MutableRefObject<null>;
  slidesFieldArray: SlidesFieldArrayReturn;
}) {
  const { currentPage, setCurrentPage } = usePagerContext();

  const PAGE_GAP_PX = 8;
  const { append } = slidesFieldArray;

  return (
    <div
      className={`relative transition-all`}
      style={{
        left: `calc(50% - ${currentPage * (SIZE.width + PAGE_GAP_PX)}px - ${
          SIZE.width * 0.5
        }px)`,
      }}
    >
      <div ref={docReference} className="flex flex-row gap-2">
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
                currentPage != index &&
                  "hover:brightness-90 hover:cursor-pointer"
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
        <NewPage
          size={SIZE}
          handleAddPage={(pageType: SlideType) => {
            // TODO: Should add with index at different locations and set as current page the index
            append(getDefaultSlideOfType(pageType));
          }}
        />
      </div>
    </div>
  );
}
