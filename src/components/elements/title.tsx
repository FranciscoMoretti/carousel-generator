import React from "react";
import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { TitleSchema } from "@/lib/validation/slide-schema";

export function Title({
  config,
  title,
  className = "",
}: {
  config: z.infer<typeof ConfigSchema>;
  title: z.infer<typeof TitleSchema>;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        `text-3xl font-black text-balance`,
        fontIdToClassName(config.fonts.font1),
        className
      )}
      style={{
        color: config.theme.primary,
      }}
    >
      {title}
    </h2>
  );
}
