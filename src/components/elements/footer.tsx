import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { Signature } from "@/components/elements/signature";
import { PageNumber } from "@/components/elements/page-number";
import { cn } from "@/lib/utils";

const Footer = React.forwardRef<
  HTMLDivElement,
  {
    config: z.infer<typeof ConfigSchema>;
    number: number;
    className?: string;
  }
>(function Footer({ config, number, className }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-row justify-between items-center", className)}
    >
      <Signature config={config} />
      {config.pageNumber.showNumbers && (
        <PageNumber config={config} number={number} />
      )}
    </div>
  );
});

export default Footer;
