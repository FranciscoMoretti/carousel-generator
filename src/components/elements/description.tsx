import React from "react";
import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { DescriptionSchema } from "@/lib/validation/text-schema";
import { TitleSchema } from "@/lib/validation/text-schema";
import { textStyleToClasses } from "@/lib/text-style-to-classes";

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
        textStyleToClasses({
          style: description.style,
          sizes: ["text-xl", "text-lg", "text-base"],
        }),
        fontIdToClassName(config.fonts.font2),
        className
      )}
      style={{
        color: config.theme.secondary,
      }}
    >
      {description.text}
    </p>
  );
}
