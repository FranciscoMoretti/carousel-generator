import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { Signature } from "@/components/elements/signature";
import { PageNumber } from "@/components/elements/page-number";

export function Footer({
  config,
  number,
}: {
  config: z.infer<typeof ConfigSchema>;
  number: number;
}) {
  return (
    <div className={"flex flex-row justify-between items-center"}>
      <Signature config={config} />
      {config.pageNumber.showNumbers && (
        <PageNumber config={config} number={number} />
      )}
    </div>
  );
}
