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
import { SlideFieldPath, TextFieldPath } from "@/lib/document-form-types";
import { Title2 } from "@/components/elements/title2";
import { Subtitle2 } from "@/components/elements/subtitle2";
import { Description2 } from "@/components/elements/description2";

export function OutroPage({
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
  slide: z.infer<typeof OutroSlideSchema>;
  size: { width: number; height: number };
  fieldName: SlideFieldPath;
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
