import React from "react";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { z } from "zod";
import { cn } from "@/lib/utils";

export function PageNumber({
  document,
  number,
  className,
}: {
  document: z.infer<typeof DocumentSchema>;
  number: number;
  className?: string;
}) {
  // TODO: Use the view to optionally add a circle around it
  return (
    <div
      className={`flex flex-row gap-3 items-center ${cn(className)}`}
      style={{
        fontFamily: document.config.fonts.font2,
      }}
    >
      <p
        className="text-lg"
        style={{
          color: document.config.theme.primary,
          // fontFamily: document.config.fonts.font2,
        }}
      >
        {number}
      </p>
    </div>
  );
}
