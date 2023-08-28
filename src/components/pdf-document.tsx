import { SettingsSchema } from "@/lib/validation/settings-schema";
import { MultiSlideSchema, SlideSchema } from "@/lib/validation/slide-schema";
import { ThemeSchema } from "@/lib/validation/theme-schema";
import * as z from "zod";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import { FontsSchema } from "@/lib/validation/fonts-schema";
import { fontsMap } from "@/lib/fonts-map";
import { DocumentSchema } from "@/lib/validation/document-schema";

// The 'theme' object is your Tailwind theme config
const tw = createTw({
  theme: {
    extend: {
      colors: {
        custom: "#bada55", // TODO: Use this class to style components with tailwind (primary, secondary, etc)
      },
    },
  },
});

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
  const { slides, settings, theme, fonts, intro, outro } = document;

  return (
    <Document>
      {slides.map((slide, index) => (
        <Page
          key={index}
          size={[300, 375]}
          style={{
            backgroundColor: theme.background,
            ...tw("p-8 flex flex-col justify-between"),
          }}
        >
          <View style={tw("flex flex-col")}>
            <Text
              style={{
                color: theme.primary,
                fontFamily: fonts.font1,
                fontWeight: "bold",
                ...tw("text-5xl mb-3 leading-none tracking-tight"),
              }}
            >
              {slide.title}
            </Text>

            <Text
              style={{
                color: theme.secondary,
                ...tw("text-sm"),
              }}
            >
              {slide.subtitle}
            </Text>
          </View>
          <View style={tw("py-6 pt-0")}>
            <Text
              style={{
                color: "black",
                ...tw("text-sm"),
              }}
            >
              {slide.description}
            </Text>
          </View>
          <View style={tw("flex justify-start flex-row gap-3 items-center")}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image src={settings.avatar} style={tw("w-12 h-12 rounded-full")} />
            <View style={tw("flex items-start gap-2 flex-col")}>
              <Text
                style={{
                  color: theme.primary,
                  ...tw("text-xs"),
                }}
              >
                {settings.name}
              </Text>
              <Text
                style={{
                  color: theme.secondary,
                  ...tw("text-xs"),
                }}
              >
                {settings.handle}
              </Text>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );
}
