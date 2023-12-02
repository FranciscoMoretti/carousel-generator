import React, { useState } from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import Footer from "../elements/footer";
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
import ElementMenubarWrapper from "@/components/element-menubar-wrapper";
import { useElementSize } from "usehooks-ts";

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
  const LAYOUT_GAP = 8;
  const FRAME_PADDING = 40;
  const backgroundImageField = fieldName + ".backgroundImage";
  const [elementsHeight, setElementsHeight] = useState<number | null>(null);
  const [footerRef, footerDimensions] = useElementSize();
  const inputRefs = React.useRef([]);

  React.useEffect(
    () => {
      const elementsHeights = inputRefs.current
        .filter((ref) => ref)
        .map((ref) => ref.offsetHeight);
      // Gap between existent elements + 1 for the element to be introduced by add button
      const gapHeights = elementsHeights.length * LAYOUT_GAP;
      setElementsHeight(
        elementsHeights.reduce((acc, el) => acc + el, 0) + gapHeights
      );
    }
    // TODO ADD dependencies
  );
  const remainingHeight = elementsHeight
    ? size.height - FRAME_PADDING * 2 - footerDimensions.height - elementsHeight
    : 0;

  return (
    <PageBase size={size} fieldName={backgroundImageField}>
      <BackgroundLayer background={config.theme.background} className="-z-20" />
      {slide.backgroundImage?.source.src ? (
        <BackgroundImageLayer image={slide.backgroundImage} className="-z-10" />
      ) : null}
      <PageFrame
        fieldName={backgroundImageField}
        className={cn("p-10", className)}
      >
        <PageLayout fieldName={backgroundImageField} className={"gap-2"}>
          {slide.elements.map((element, index) => {
            return element.type == ElementType.enum.Title ? (
              <ElementMenubarWrapper
                fieldName={fieldName + ".elements." + index}
                ref={(el) => (inputRefs.current[index] = el)}
              >
                <Title2
                  fieldName={
                    (fieldName + ".elements." + index) as TextFieldPath
                  }
                />
              </ElementMenubarWrapper>
            ) : element.type == ElementType.enum.Subtitle ? (
              <ElementMenubarWrapper
                fieldName={fieldName + ".elements." + index}
                ref={(el) => (inputRefs.current[index] = el)}
              >
                <Subtitle2
                  fieldName={
                    (fieldName + ".elements." + index) as TextFieldPath
                  }
                />
              </ElementMenubarWrapper>
            ) : element.type == ElementType.enum.Description ? (
              <ElementMenubarWrapper
                fieldName={fieldName + ".elements." + index}
                ref={(el) => (inputRefs.current[index] = el)}
              >
                <Description2
                  fieldName={
                    (fieldName + ".elements." + index) as TextFieldPath
                  }
                />
              </ElementMenubarWrapper>
            ) : element.type == ElementType.enum.ContentImage ? (
              <ElementMenubarWrapper
                fieldName={fieldName + ".elements." + index}
                ref={(el) => (inputRefs.current[index] = el)}
              >
                <ContentImage
                  fieldName={
                    (fieldName + ".elements." + index) as TextFieldPath
                  }
                  className="h-40"
                />
              </ElementMenubarWrapper>
            ) : null;
          })}
          {/* // TODO Replace 50 by the element size of element to introduce or minimum of all elements */}
          {remainingHeight && remainingHeight >= 50 ? (
            <AddElement fieldName={fieldName + ".elements"} />
          ) : null}
        </PageLayout>
        <Footer number={index + 1} config={config} ref={footerRef} />
      </PageFrame>
    </PageBase>
  );
}
