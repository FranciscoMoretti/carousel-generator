import React from "react";
import * as z from "zod";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { Signature } from "./react-signature";
import { PageNumber } from "./react-page-number";

export function Footer({
  document,
  number,
}: {
  document: z.infer<typeof DocumentSchema>;
  number: number;
}) {
  return (
    <div className={"flex flex-row justify-between items-center"}>
      <Signature document={document} />
      {document.config.pageNumber.showNumbers && (
        <PageNumber document={document} number={number} />
      )}
    </div>
  );
}
