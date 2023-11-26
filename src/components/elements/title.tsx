import React from "react";
import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { TitleSchema } from "@/lib/validation/text-schema";
import { textStyleToClasses } from "@/lib/text-style-to-classes";

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
        `font-black text-balance border-box border border-transparent hover:border-muted`,
        textStyleToClasses({
          style: title.style,
          sizes: ["text-7xl", "text-5xl", "text-3xl"],
        }),
        fontIdToClassName(config.fonts.font1),
        className
      )}
      style={{
        color: config.theme.primary,
      }}
    >
      {title.text}
    </h2>
  );
}
