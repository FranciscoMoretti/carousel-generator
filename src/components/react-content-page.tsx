import React from "react";
import * as z from "zod";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { PdfFooter } from "./pdf-footer";
import { cn } from "@/lib/utils";
import { Footer } from "./react-footer";

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
      className={cn("p-8 flex flex-col justify-between", className)}
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
          className={`text-3xl tracking-tight font-dmsans font-bold`}
          style={{
            color: document.config.theme.primary,
            // fontFamily: document.config.fonts.font1,
            // fontWeight: "bold",
          }}
        >
          {document.slides[index].title}
        </h2>

        <p
          className={`text-base font-dmsans`}
          style={{
            color: document.config.theme.secondary,
            // fontFamily: document.config.fonts.font2,
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
