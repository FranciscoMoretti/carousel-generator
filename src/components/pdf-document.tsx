import * as z from "zod";
import React from "react";
import { Document, Font } from "@react-pdf/renderer";
import { fontsMap } from "@/lib/fonts-map";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { PdfContentPage } from "./pdf-content-page";
import { PdfIntroPage } from "./pdf-intro-page";
import { PdfOutroPage } from "./pdf-outro-page";

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
      <PdfIntroPage document={document} />
      {document.slides.map((slide, index) => (
        <PdfContentPage key={index} index={index} document={document} />
      ))}
      <PdfOutroPage document={document} />
    </Document>
  );
}
