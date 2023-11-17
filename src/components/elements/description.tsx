import React from "react";
import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { DescriptionSchema, TitleSchema } from "@/lib/validation/slide-schema";

export function Description({
  config,
  description,
  className = "",
}: {
  config: z.infer<typeof ConfigSchema>;
  description: z.infer<typeof DescriptionSchema>;
  className?: string;
}) {
  return (
    <p
      className={cn(
        `text-lg font-medium`,
        fontIdToClassName(config.fonts.font2),
        className
      )}
      style={{
        color: config.theme.secondary,
      }}
    >
      {description}
    </p>
  );
}
