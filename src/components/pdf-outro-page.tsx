import * as z from "zod";
import React from "react";
import { Page, Text, View, Image } from "@react-pdf/renderer";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { PAGE_SIZE, tw } from "@/lib/pdf-resources";
import { PdfSignature } from "@/components/pdf-signature";

export function PdfOutroPage({
  index,
  document,
}: {
  index: number;
  document: z.infer<typeof DocumentSchema>;
}) {
  return (
    <Page
      // @ts-ignore array size 2 is hardcoded
      size={PAGE_SIZE}
      style={{
        backgroundColor: document.config.theme.background,
        ...tw("p-8 flex flex-col justify-between"),
      }}
    >
      <View style={tw("flex flex-col justify-center grow")}>
        <Text
          style={{
            color: document.config.theme.primary,
            fontFamily: document.config.fonts.font1,
            fontWeight: "bold",
            ...tw("text-5xl mb-3 leading-none tracking-tight"),
          }}
        >
          {document.slides[index].title}
        </Text>
        <Text
          style={{
            fontFamily: document.config.fonts.font1,
            color: document.config.theme.secondary,
            fontWeight: "bold",
            ...tw("text-base"),
          }}
        >
          {document.slides[index].subtitle}
        </Text>
        <Text
          style={{
            fontFamily: document.config.fonts.font2,
            color: document.config.theme.secondary,
            ...tw("text-sm"),
          }}
        >
          {document.slides[index].description}
        </Text>
      </View>
      <PdfSignature document={document}></PdfSignature>
    </Page>
  );
}
