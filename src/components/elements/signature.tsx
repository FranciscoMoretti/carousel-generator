import React from "react";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";

export function Signature({
  config,
  className,
}: {
  config: z.infer<typeof ConfigSchema>;
  className?: string;
}) {
  return (
    <div
      className={`flex justify-start flex-row gap-3 items-center ${cn(
        className
      )}`}
    >
      {config.brand.avatar?.source.src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={config.brand.avatar.source.src}
          alt={config.brand.name}
          className={`w-12 h-12 rounded-full`}
          style={{
            opacity: config.brand.avatar.style.opacity / 100,
          }}
        />
      )}
      <div className={`flex items-start flex-col`}>
        <p
          className={cn(`text-base`, fontIdToClassName(config.fonts.font2))}
          style={{
            color: config.theme.primary,
          }}
        >
          {config.brand.name}
        </p>
        <p
          className={cn(
            `text-sm font-normal`,
            fontIdToClassName(config.fonts.font2)
          )}
          style={{
            color: config.theme.secondary,
          }}
        >
          {config.brand.handle}
        </p>
      </div>
    </div>
  );
}
