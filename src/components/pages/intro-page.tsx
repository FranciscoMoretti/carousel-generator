import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { Footer } from "../elements/footer";
import { cn } from "@/lib/utils";
import { fontIdToClassName, fontsMap } from "@/lib/fonts-map";
import { IntroSlideSchema } from "@/lib/validation/slide-schema";
import { BackgroundLayer } from "./background-layer";
import { BackgroundImageLayer } from "./background-image-layer";
import { PageLayout } from "@/components/pages/page-layout";

export function IntroPage({
  index,
  config,
  slide,
  size,
  className,
  handleClick = undefined,
}: {
  index: number;
  config: z.infer<typeof ConfigSchema>;
  slide: z.infer<typeof IntroSlideSchema>;
  size: { width: number; height: number };
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <PageLayout handleClick={handleClick} size={size}>
      <BackgroundLayer background={config.theme.background} className="-z-20" />
      {slide.backgroundImage?.src ? (
        <BackgroundImageLayer
          backgroundImageSrc={slide.backgroundImage?.src}
          className="opacity-20 -z-10"
        />
      ) : null}
      <div className={cn("p-10 flex flex-col h-full w-full", className)}>
        <div className={`flex flex-col justify-center grow gap-1 items-center`}>
          {/* // TODO Extract title into a Title component and correlate with a title form */}
          <h2
            className={cn(
              `text-7xl mb-3 text-balance font-black text-center`,
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
            className={cn(
              `text-base text-center`,
              fontIdToClassName(config.fonts.font2)
            )}
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
