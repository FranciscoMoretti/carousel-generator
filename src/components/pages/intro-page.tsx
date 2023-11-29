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
import { Title2 } from "@/components/elements/title2";
import { Subtitle2 } from "@/components/elements/subtitle2";
import { Description2 } from "@/components/elements/description2";
import { SlideFieldPath, TextFieldPath } from "@/lib/document-form-types";

export function IntroPage({
  index,
  config,
  slide,
  size,
  fieldName,
  className,
  handleClick = undefined,
}: {
  index: number;
  config: z.infer<typeof ConfigSchema>;
  slide: z.infer<typeof IntroSlideSchema>;
  size: { width: number; height: number };
  fieldName: SlideFieldPath;
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <PageLayout handleClick={handleClick} size={size}>
      <BackgroundLayer background={config.theme.background} className="-z-20" />
      {slide.backgroundImage?.source.src ? (
        <BackgroundImageLayer image={slide.backgroundImage} className="-z-10" />
      ) : null}
      <div className={cn("p-10 flex flex-col h-full w-full", className)}>
        <div
          className={`flex flex-col justify-center grow gap-2 items-stretch`}
        >
          <Title2 fieldName={(fieldName + ".title") as TextFieldPath} />
          <Subtitle2 fieldName={(fieldName + ".subtitle") as TextFieldPath} />
          <Description2
            fieldName={(fieldName + ".description") as TextFieldPath}
          />
        </div>
        <Footer number={index + 1} config={config} />
      </div>
    </PageLayout>
  );
}
