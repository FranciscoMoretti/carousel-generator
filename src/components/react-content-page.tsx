import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { Footer } from "./react-footer";
import { fontIdToClassName } from "@/lib/fonts-map";
import { ContentSlideSchema } from "@/lib/validation/slide-schema";
import Image from "next/image";

export function ContentPage({
  index,
  config,
  slide,
  size,
  className,
  handleClick = undefined,
}: {
  index: number;
  config: z.infer<typeof ConfigSchema>;
  slide: z.infer<typeof ContentSlideSchema>;
  size: { width: number; height: number };
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <div
      className={cn("p-10 flex flex-col", className)}
      onClick={handleClick}
      style={{
        backgroundColor: config.theme.background,
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: `${size.width}px`,
        minHeight: `${size.height}px`,
      }}
    >
      <div className="flex flex-col justify-center items-start grow gap-4">
        <h2
          className={cn(
            `text-3xl tracking-tight font-bold text-balance`,
            fontIdToClassName(config.fonts.font1)
          )}
          style={{
            color: config.theme.primary,
          }}
        >
          {slide.title}
        </h2>

        <p
          className={cn(
            `text-lg font-medium`,
            fontIdToClassName(config.fonts.font2)
          )}
          style={{
            color: config.theme.secondary,
          }}
        >
          {slide.description}
        </p>
        {slide.image ? (
          <div className="flex flex-col items-center w-full h-40">
            <img
              alt="slide image"
              src={slide.image}
              // TODO: Extract cover/contain into a setting for images
              className={cn(
                "rounded-md shadow-md overflow-hidden",
                true ? "object-cover w-full h-full" : "object-contain"
              )}
            />
          </div>
        ) : null}
      </div>
      <Footer number={index + 1} config={config} />
      {/* TODO: better number calculation */}
    </div>
  );
}
