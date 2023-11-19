import React from "react";
import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { SubtitleSchema, TitleSchema } from "@/lib/validation/text-schema";
import { textStyleToClasses } from "@/lib/text-style-to-classes";

export function Subtitle({
  config,
  subtitle,
}: {
  config: z.infer<typeof ConfigSchema>;
  subtitle: z.infer<typeof SubtitleSchema>;
}) {
  return (
    <h3
      className={cn(
        `font-bold`,
        textStyleToClasses({
          style: subtitle.style,
          sizes: ["text-3xl", "text-2xl", "text-xl"],
        }),
        fontIdToClassName(config.fonts.font1)
      )}
      style={{
        color: config.theme.secondary,
      }}
    >
      {subtitle.text}
    </h3>
  );
}
