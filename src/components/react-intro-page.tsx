import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { Footer } from "./react-footer";
import { cn } from "@/lib/utils";
import { fontIdToClassName, fontsMap } from "@/lib/fonts-map";
import { IntroSlideSchema } from "@/lib/validation/slide-schema";
import Image from "next/image";

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
      className={cn("p-10 flex flex-col", className)}
      onClick={handleClick}
      style={{
        backgroundColor: config.theme.background,
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: `${size.width}px`,
        minHeight: `${size.height}px`,
      }}
    >
      <div className={`flex flex-col justify-center grow gap-1 items-center`}>
        <h2
          className={cn(
            `text-4xl mb-3 text-balance font-black text-center`,
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
        <div className="flex flex-col items-center">
          <Image
            alt="bg image"
            src={"/laptop_no_bg.png"}
            width={200}
            height={200}
          />
        </div>
      </div>
      <Footer number={index + 1} config={config} />
    </div>
  );
}
