import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { Footer } from "../elements/footer";
import { fontIdToClassName } from "@/lib/fonts-map";
import { ContentSlideSchema } from "@/lib/validation/slide-schema";
import { BackgroundLayer } from "@/components/elements/background-layer";
import { PageBase } from "./page-base";
import { Title } from "../elements/title";
import { Description } from "@/components/elements/description";
import { ContentImage } from "../elements/content-image";
import { SlideFieldPath, TextFieldPath } from "@/lib/document-form-types";
import { Title2 } from "@/components/elements/title2";
import { Description2 } from "@/components/elements/description2";
import { PageFrame } from "@/components/pages/page-frame";
import { PageLayout } from "@/components/pages/page-layout";
import { BackgroundImageLayer } from "@/components/elements/background-image-layer";

export function ContentPage({
  index,
  config,
  slide,
  size,
  fieldName,
  className,
}: {
  index: number;
  config: z.infer<typeof ConfigSchema>;
  slide: z.infer<typeof ContentSlideSchema>;
  size: { width: number; height: number };
  fieldName: SlideFieldPath;
  className?: string;
}) {
  // TODO: Change source field for parent field
  const backgroundImageField = fieldName + ".backgroundImage.source";
  return (
    <PageBase size={size} fieldName={backgroundImageField}>
      <BackgroundLayer background={config.theme.background} className="-z-20" />
      {slide.backgroundImage?.source.src ? (
        <BackgroundImageLayer image={slide.backgroundImage} className="-z-10" />
      ) : null}
      <PageFrame fieldName={backgroundImageField} className={className}>
        <PageLayout fieldName={backgroundImageField} className={className}>
          <Title2 fieldName={(fieldName + ".title") as TextFieldPath} />
          <Description2
            fieldName={(fieldName + ".description") as TextFieldPath}
          />
          <ContentImage fieldName={fieldName + ".image"} className="h-40" />
        </PageLayout>
        <Footer number={index + 1} config={config} />
      </PageFrame>
    </PageBase>
  );
}
