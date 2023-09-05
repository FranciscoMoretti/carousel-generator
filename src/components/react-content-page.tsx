import React from "react";
import * as z from "zod";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { Footer } from "./react-footer";
import { fontIdToClassName } from "@/lib/fonts-map";

export function ContentPage({
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
      <div className="flex flex-col justify-center items-start  grow">
        <h2
          className={cn(
            `text-3xl tracking-tight font-bold`,
            fontIdToClassName(document.config.fonts.font1)
          )}
          style={{
            color: document.config.theme.primary,
          }}
        >
          {document.slides[index].title}
        </h2>

        <p
          className={cn(
            `text-base`,
            fontIdToClassName(document.config.fonts.font2)
          )}
          style={{
            color: document.config.theme.secondary,
          }}
        >
          {document.slides[index].description}
        </p>
      </div>
      <Footer number={index + 1} document={document} />
      {/* TODO: better number calculation */}
    </div>
  );
}
