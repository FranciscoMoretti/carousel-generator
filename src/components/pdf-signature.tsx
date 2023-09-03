import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { tw } from "@/lib/pdf-resources";
import { z } from "zod";
import { cn } from "@/lib/utils";

export function PdfSignature({
  document,
  className,
}: {
  document: z.infer<typeof DocumentSchema>;
  className?: string;
}) {
  return (
    <View
      style={tw(
        cn("flex justify-start flex-row gap-3 items-center", className)
      )}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        src={document.config.brand.avatar}
        style={tw("w-12 h-12 rounded-full")}
      />
      <View style={tw("flex items-start gap-2 flex-col")}>
        <Text
          style={{
            color: document.config.theme.primary,
            fontFamily: document.config.fonts.font2,
            ...tw("text-xs"),
          }}
        >
          {document.config.brand.name}
        </Text>
        <Text
          style={{
            color: document.config.theme.secondary,
            fontFamily: document.config.fonts.font2,
            fontWeight: "normal",
            ...tw("text-xs"),
          }}
        >
          {document.config.brand.handle}
        </Text>
      </View>
    </View>
  );
}
