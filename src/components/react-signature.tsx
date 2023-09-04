import React from "react";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { z } from "zod";
import { cn } from "@/lib/utils";

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
      style={{
        fontFamily: document.config.fonts.font2,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={document.config.brand.avatar}
        alt={document.config.brand.name}
        className={`w-12 h-12 rounded-full `}
      />
      <div className={`flex items-start gap-2 flex-col`}>
        <p
          className="text-sm"
          style={{
            color: document.config.theme.primary,
            // fontFamily: document.config.fonts.font2,
            fontWeight: "bold",
          }}
        >
          {document.config.brand.name}
        </p>
        <p
          className="text-sm"
          style={{
            color: document.config.theme.secondary,
            fontWeight: "normal",
          }}
        >
          {document.config.brand.handle}
        </p>
      </div>
    </div>
  );
}
