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

Font.register({
  family: "Inter",
  fonts: [
    {
      src: `/fonts/Inter-Regular.ttf`,
    },
    {
      src: `/fonts/Inter-Bold.ttf`,
      fontWeight: "bold",
    },
  ],
});

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: `/fonts/Roboto-Regular.ttf`,
    },
    {
      src: "/fonts/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

export function PdfSlide({
  slides,
  settings,
  theme,
  fonts,
}: {
  slides: z.infer<typeof MultiSlideSchema>;
  settings: z.infer<typeof SettingsSchema>;
  theme: z.infer<typeof ThemeSchema>;
  fonts: z.infer<typeof FontsSchema>;
}) {
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
                fontFamily: fonts.font2,
                color: theme.primary,
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
