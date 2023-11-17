import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { Footer } from "../elements/footer";
import { cn } from "@/lib/utils";
import { fontIdToClassName, fontsMap } from "@/lib/fonts-map";
import { IntroSlideSchema } from "@/lib/validation/slide-schema";
import { BackgroundLayer } from "@/components/elements/background-layer";
import { BackgroundImageLayer } from "@/components/elements/background-image-layer";
import { PageLayout } from "@/components/pages/page-layout";
import { Subtitle } from "@/components/elements/subtitle";
import { Title } from "@/components/elements/title";
import { Description } from "@/components/elements/description";

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
          <Title
            config={config}
            title={slide.title}
            className="text-7xl text-center"
          />
          <Subtitle config={config} subtitle={slide.subtitle} />
          <Description
            config={config}
            description={slide.description}
            className="text-center"
          />
        </div>
        <Footer number={index + 1} config={config} />
      </div>
    </PageLayout>
  );
}
