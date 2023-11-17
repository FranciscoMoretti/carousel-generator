import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { Footer } from "./react-footer";
import { cn } from "@/lib/utils";
import { fontIdToClassName, fontsMap } from "@/lib/fonts-map";
import { IntroSlideSchema } from "@/lib/validation/slide-schema";

function BackgroundLayer({
  background,
  className = "",
}: {
  background: string;
  className?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: background,
      }}
      className={cn(
        "w-full h-full absolute top-0 left-0 right-0 bottom-0",
        className
      )}
    ></div>
  );
}

function BackgroundImageLayer({
  backgroundImageSrc,
  className = "",
}: {
  backgroundImageSrc: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-full absolute top-0 left-0 right-0 bottom-0 opacity-50",
        className
      )}
    >
      <img
        className="w-full h-full object-cover "
        src={backgroundImageSrc}
        alt="Background"
      />
    </div>
  );
}

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
    <div
      onClick={handleClick}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: `${size.width}px`,
        minHeight: `${size.height}px`,
      }}
      className="overflow-clip relative"
    >
      <BackgroundLayer background={config.theme.background} className="-z-20" />
      {slide.backgroundImage?.src ? (
        <BackgroundImageLayer
          backgroundImageSrc={slide.backgroundImage?.src}
          className="opacity-20 -z-10"
        />
      ) : null}
      <div className={cn("p-10 flex flex-col h-full w-full z-20", className)}>
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
    </div>
  );
}
