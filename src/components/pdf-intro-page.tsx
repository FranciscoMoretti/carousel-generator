import * as z from "zod";
import React from "react";
import { Page, Text, View, Image } from "@react-pdf/renderer";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { PAGE_SIZE, tw } from "@/lib/pdf-values";
import { PdfSignature } from "@/components/pdf-signature";

export function PdfIntroPage({
  document,
}: {
  document: z.infer<typeof DocumentSchema>;
}) {
  return (
    <Page
      // @ts-ignore array size 2 is hardcoded
      size={PAGE_SIZE}
      style={{
        backgroundColor: document.theme.background,
        ...tw("p-8 flex flex-col"),
      }}
    >
      {/* TODO: Make justify-start a config for this slide, and text-center / text-start a global config*/}
      <View style={tw("flex flex-col justify-center object-center grow")}>
        <Text
          style={{
            color: document.theme.primary,
            fontFamily: document.fonts.font1,
            fontWeight: "bold",
            ...tw("text-5xl mb-3 leading-none tracking-tight"),
          }}
        >
          {document.intro.title}
        </Text>

        <Text
          style={{
            color: document.theme.secondary,
            ...tw("text-sm"),
          }}
        >
          {document.intro.subtitle}
        </Text>
        <Text
          style={{
            // color: document.theme.secondary,
            ...tw("text-sm"),
          }}
        >
          {document.intro.description}
        </Text>
      </View>
      <PdfSignature document={document}></PdfSignature>
    </Page>
  );
}
