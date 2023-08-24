import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SettingsSchema } from "@/lib/validation/settings-schema";
import { SlideSchema } from "@/lib/validation/slide-schema";
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
} from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

// The 'theme' object is your Tailwind theme config
const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

export function PdfSlide({
  slide,
  settings,
  theme,
}: {
  slide: z.infer<typeof SlideSchema>;
  settings: z.infer<typeof SettingsSchema>;
  theme: z.infer<typeof ThemeSchema>;
}) {
  return (
    <Document>
      <Page
        size={[300, 375]}
        style={{
          backgroundColor: theme.accent,
          ...tw("p-8 flex flex-col justify-between"),
        }}
      >
        <View style={tw("flex flex-col")}>
          <Text
            style={{
              color: theme.primary,
              ...tw("text-2xl font-semibold mb-3 leading-none tracking-tight"),
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
          <Image
            src={
              "https://fastly.picsum.photos/id/760/536/354.jpg?hmac=k8_iypkz8Qgdy6OnLw4KUKduMcWi01nc2sgJBAKWSq8"
            }
            style={tw("w-12 h-12 rounded-full")}
          />
          <View style={tw("flex items-start gap-2 flex-col")}>
            <Text
              style={{
                color: theme.primary,
                ...tw("text-xs "),
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
    </Document>
  );
}
