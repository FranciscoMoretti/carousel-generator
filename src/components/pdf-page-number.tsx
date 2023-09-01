import { Document, Page, Text, View, Image, Font } from "@react-pdf/renderer";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { tw } from "@/lib/pdf-resources";
import { z } from "zod";
import { cn } from "@/lib/utils";

export function PdfPageNumber({
  document,
  number,
  className,
}: {
  document: z.infer<typeof DocumentSchema>;
  number: number;
  className?: string;
}) {
  return (
    // TODO: Use the view to optionally add a circle around it
    <View style={tw(cn("flex flex-row gap-3 items-center", className))}>
      <Text
        style={{
          color: document.config.theme.primary,
          fontFamily: document.config.fonts.font2,
          ...tw("text-base"),
        }}
      >
        {number}
      </Text>
    </View>
  );
}
