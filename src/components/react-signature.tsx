import React from "react";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";

export function Signature({
  document,
  className,
}: {
  document: z.infer<typeof DocumentSchema>;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-start flex-row gap-3 items-center ${cn(
        className
      )}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={document.config.brand.avatar}
        alt={document.config.brand.name}
        className={`w-12 h-12 rounded-full `}
      />
      <div className={`flex items-start gap-2 flex-col`}>
        <p
          className={cn(
            `text-sm font-bold`,
            fontIdToClassName(document.config.fonts.font2)
          )}
          style={{
            color: document.config.theme.primary,
          }}
        >
          {document.config.brand.name}
        </p>
        <p
          className={cn(
            `text-sm font-normal`,
            fontIdToClassName(document.config.fonts.font2)
          )}
          style={{
            color: document.config.theme.secondary,
          }}
        >
          {document.config.brand.handle}
        </p>
      </div>
    </div>
  );
}
