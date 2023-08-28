import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { tw } from "@/lib/pdf-values";
import { z } from "zod";

export function PdfSignature({
  document,
}: {
  document: z.infer<typeof DocumentSchema>;
}) {
  return (
    <View style={tw("flex justify-start flex-row gap-3 items-center")}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        src={document.settings.avatar}
        style={tw("w-12 h-12 rounded-full")}
      />
      <View style={tw("flex items-start gap-2 flex-col")}>
        <Text
          style={{
            color: document.theme.primary,
            ...tw("text-xs"),
          }}
        >
          {document.settings.name}
        </Text>
        <Text
          style={{
            color: document.theme.secondary,
            ...tw("text-xs"),
          }}
        >
          {document.settings.handle}
        </Text>
      </View>
    </View>
  );
}
