import * as z from "zod";

import { DocumentSchema } from "@/lib/validation/document-schema";
import { tw } from "@/lib/pdf-resources";
import { View } from "@react-pdf/renderer";
import { PdfPageNumber } from "./pdf-page-number";
import { PdfSignature } from "./pdf-signature";

export function PdfFooter({
  document,
  number,
}: {
  document: z.infer<typeof DocumentSchema>;
  number: number;
}) {
  return (
    <View style={tw("flex flex-row justify-between items-center")}>
      <PdfSignature document={document} />
      {document.config.pageNumber.showNumbers && (
        <PdfPageNumber document={document} number={number} />
      )}
    </View>
  );
}
