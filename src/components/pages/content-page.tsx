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

export function ContentPage({
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
  slide: z.infer<typeof ContentSlideSchema>;
  size: { width: number; height: number };
  fieldName: SlideFieldPath;
  className?: string;
  handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}) {
  return (
    <PageBase size={size}>
      <BackgroundLayer background={config.theme.background} className="-z-20" />
      <PageFrame fieldName={fieldName} className={className}>
        <PageLayout fieldName={fieldName} className={className}>
          <Title2 fieldName={(fieldName + ".title") as TextFieldPath} />
          <Description2
            fieldName={(fieldName + ".description") as TextFieldPath}
          />
          {slide.image && <ContentImage image={slide.image} className="h-40" />}
        </PageLayout>
        <Footer number={index + 1} config={config} />
      </PageFrame>
    </PageBase>
  );
}
