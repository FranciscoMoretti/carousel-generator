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
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
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
        size="A6"
        style={{
          backgroundColor: theme.accent,
          ...tw("  p-8 flex flex-col justify-between"),
        }}
      >
        <View style={tw("flex flex-col  p-6")}>
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
              ...tw("text-sm text-muted-foreground"),
            }}
          >
            {slide.subtitle}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export function CarouselSlide({
  slide,
  settings,
  theme,
}: {
  slide: z.infer<typeof SlideSchema>;
  settings: z.infer<typeof SettingsSchema>;
  theme: z.infer<typeof ThemeSchema>;
}) {
  return (
    <Card
      className="w-[448px] h-[560px] aspect-[4/5] p-8 flex flex-col justify-between"
      style={{ backgroundColor: theme.accent }}
    >
      <CardHeader>
        <CardTitle style={{ color: theme.primary }}>{slide.title}</CardTitle>
        <CardDescription style={{ color: theme.secondary }}>
          {slide.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="">{slide.description}</span>
      </CardContent>
      <CardFooter
        style={{ color: theme.primary }}
        className="flex justify-start gap-3 "
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={settings.avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="" style={{ color: theme.primary }}>
            {settings.name}
          </span>
          <span className="" style={{ color: theme.secondary }}>
            {settings.handle}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
