import React from "react";
import * as z from "zod";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { Footer } from "./react-footer"; // Replace with your non-PDF footer component
import { cn } from "@/lib/utils";
import { fontsMap } from "@/lib/fonts-map";

export function IntroPage({
  index,
  document,
  size,
  className,
  handleClick = undefined,
}: {
  index: number;
  document: z.infer<typeof DocumentSchema>;
  size: { width: number; height: number };
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <div
      className={cn("p-8 flex flex-col", className)}
      onClick={handleClick}
      style={{
        backgroundColor: document.config.theme.background,
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: `${size.width}px`,
        minHeight: `${size.height}px`,
      }}
    >
      <div className={`flex flex-col justify-center grow`}>
        <h2
          className={cn(
            `text-5xl mb-3 leading-none tracking-tight`,
            fontsMap[document.config.fonts.font1].className
          )}
          style={{
            color: document.config.theme.primary,
            // fontFamily: document.config.fonts.font1,
            fontWeight: "bold",
          }}
        >
          {document.slides[index].title}
        </h2>
        <h3
          className={`text-lg font-dm-sans`}
          style={{
            // fontFamily: document.config.fonts.font1,
            color: document.config.theme.secondary,
            fontWeight: "bold",
          }}
        >
          {document.slides[index].subtitle}
        </h3>
        <p
          className={`text-base font-dm-sans`}
          style={{
            // fontFamily: document.config.fonts.font2,
            color: document.config.theme.secondary,
          }}
        >
          {document.slides[index].description}
        </p>
      </div>
      <Footer number={index + 1} document={document} />
    </div>
  );
}