import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { Footer } from "../elements/footer";
import { cn } from "@/lib/utils";
import { fontIdToClassName, fontsMap } from "@/lib/fonts-map";
import {
  CommonSlideSchema,
  IntroSlideSchema,
} from "@/lib/validation/slide-schema";
import { BackgroundLayer } from "@/components/elements/background-layer";
import { BackgroundImageLayer } from "@/components/elements/background-image-layer";
import { PageBase } from "@/components/pages/page-base";
import { Subtitle } from "@/components/elements/subtitle";
import { Title } from "@/components/elements/title";
import { Description } from "@/components/elements/description";
import { Title2 } from "@/components/elements/title2";
import { Subtitle2 } from "@/components/elements/subtitle2";
import { Description2 } from "@/components/elements/description2";
import { SlideFieldPath, TextFieldPath } from "@/lib/document-form-types";
import { PageFrame } from "@/components/pages/page-frame";
import { PageLayout } from "@/components/pages/page-layout";
import { AddElement } from "@/components/pages/add-element";
import { ElementType } from "@/lib/validation/element-type";
import { ContentImage } from "@/components/elements/content-image";

export function CommonPage({
  index,
  config,
  slide,
  size,
  fieldName,
  className,
}: {
  index: number;
  config: z.infer<typeof ConfigSchema>;
  slide: z.infer<typeof CommonSlideSchema>;
  size: { width: number; height: number };
  fieldName: SlideFieldPath;
  className?: string;
}) {
  const backgroundImageField = fieldName + ".backgroundImage.source";

  return (
    <PageBase size={size} fieldName={backgroundImageField}>
      <BackgroundLayer background={config.theme.background} className="-z-20" />
      {slide.backgroundImage?.source.src ? (
        <BackgroundImageLayer image={slide.backgroundImage} className="-z-10" />
      ) : null}
      <PageFrame fieldName={backgroundImageField} className={className}>
        <PageLayout fieldName={backgroundImageField} className={className}>
          {slide.elements.map((element, index) => {
            return element.type == ElementType.enum.Title ? (
              <Title2
                fieldName={(fieldName + ".elements." + index) as TextFieldPath}
              />
            ) : element.type == ElementType.enum.Subtitle ? (
              <Subtitle2
                fieldName={(fieldName + ".elements." + index) as TextFieldPath}
              />
            ) : element.type == ElementType.enum.Description ? (
              <Description2
                fieldName={(fieldName + ".elements." + index) as TextFieldPath}
              />
            ) : element.type == ElementType.enum.Image ? (
              <ContentImage
                fieldName={(fieldName + ".elements." + index) as TextFieldPath}
                className="h-40"
              />
            ) : null;
          })}
          <AddElement fieldName={fieldName + ".elements"} />
        </PageLayout>
        <Footer number={index + 1} config={config} />
      </PageFrame>
    </PageBase>
  );
}
