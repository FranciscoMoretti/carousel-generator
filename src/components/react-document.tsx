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

export function ReactDocument({
  document,
  docReference,
}: {
  document: z.infer<typeof DocumentSchema>;
  docReference: React.MutableRefObject<null>;
}) {
  const { currentPage, setCurrentPage } = usePagerContext();

  const PAGE_GAP_PX = 8;

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
          slide.type == SlideType.enum.Content ? (
            <ContentPage
              document={document}
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
              document={document}
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
              document={document}
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
    </div>
  );
}
