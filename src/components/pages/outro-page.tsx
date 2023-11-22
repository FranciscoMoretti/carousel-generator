import React from "react";
import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { Footer } from "@/components/elements/footer";
import { cn } from "@/lib/utils";
import { OutroSlideSchema } from "@/lib/validation/slide-schema";
import { PageLayout } from "@/components/pages/page-layout";
import { BackgroundLayer } from "@/components/elements/background-layer";
import { Subtitle } from "@/components/elements/subtitle";
import { Title } from "@/components/elements/title";
import { Description } from "@/components/elements/description";

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
        <div
          className={`flex flex-col justify-center items-stretch grow gap-1`}
        >
          <Title config={config} title={slide.title} />
          <Subtitle config={config} subtitle={slide.subtitle} />
          <Description config={config} description={slide.description} />
        </div>
        <Footer number={index + 1} config={config} />
      </div>
    </PageLayout>
  );
}
