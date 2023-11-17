import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { Footer } from "@/components/elements/footer";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { OutroSlideSchema } from "@/lib/validation/slide-schema";
import { BackgroundLayer } from "@/components/pages/background-layer";
import { PageLayout } from "@/components/pages/page-layout";

export function OutroPage({
  index,
  config,
  slide,
  size,
  className,
  handleClick = undefined,
}: {
  index: number;
  config: z.infer<typeof ConfigSchema>;
  slide: z.infer<typeof OutroSlideSchema>;
  size: { width: number; height: number };
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <PageLayout handleClick={handleClick} size={size}>
      <BackgroundLayer background={config.theme.background} className="-z-20" />
      <div className={cn("p-10 flex flex-col h-full w-full", className)}>
        <div className={`flex flex-col justify-center grow gap-1`}>
          <h2
            className={cn(
              `text-5xl mb-3 leading-none tracking-tight font-bold `,
              fontIdToClassName(config.fonts.font1)
            )}
            style={{
              color: config.theme.primary,
            }}
          >
            {slide.title}
          </h2>
          <h3
            className={cn(
              `text-xl font-bold`,
              fontIdToClassName(config.fonts.font1)
            )}
            style={{
              color: config.theme.secondary,
            }}
          >
            {slide.subtitle}
          </h3>
          <p
            className={cn(`text-base`, fontIdToClassName(config.fonts.font2))}
            style={{
              color: config.theme.secondary,
            }}
          >
            {slide.description}
          </p>
        </div>
        <Footer number={index + 1} config={config} />
      </div>
    </PageLayout>
  );
}
