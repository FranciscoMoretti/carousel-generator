import * as z from "zod";
import React from "react";
import { Document, Font } from "@react-pdf/renderer";
import { fontsMap } from "@/lib/fonts-map";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { PdfContentPage } from "./pdf-content-page";
import { PdfIntroPage } from "./pdf-intro-page";
import { PdfOutroPage } from "./pdf-outro-page";
import { SlideType } from "@/lib/validation/slide-schema";

Font.registerHyphenationCallback((word) => {
  // Return entire word as unique part
  return [word];
});

Object.entries(fontsMap).forEach(([fontFamilyName, variants]) => {
  Font.register({
    family: fontFamilyName,
    fonts: [
      {
        src: variants.regular,
      },
      ...(variants?.bold
        ? [
            {
              src: variants.bold,
              fontWeight: 700, // bold
            },
          ]
        : []),
    ],
  });
});

export function PdfDocument({
  document,
}: {
  document: z.infer<typeof DocumentSchema>;
}) {
  return (
    <Document>
      {document.slides.map((slide, index) =>
        slide.type == SlideType.enum.Content ? (
          <PdfContentPage key={index} index={index} document={document} />
        ) : slide.type == SlideType.enum.Intro ? (
          <PdfIntroPage key={index} index={index} document={document} />
        ) : slide.type == SlideType.enum.Outro ? (
          <PdfOutroPage key={index} index={index} document={document} />
        ) : null
      )}
    </Document>
  );
}
