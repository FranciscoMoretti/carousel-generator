import React from "react";
import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { SubtitleSchema, TitleSchema } from "@/lib/validation/slide-schema";

export function Subtitle({
  config,
  subtitle,
}: {
  config: z.infer<typeof ConfigSchema>;
  subtitle: z.infer<typeof SubtitleSchema>;
}) {
  return (
    <h3
      className={cn(`text-xl font-bold`, fontIdToClassName(config.fonts.font1))}
      style={{
        color: config.theme.secondary,
      }}
    >
      {subtitle}
    </h3>
  );
}
