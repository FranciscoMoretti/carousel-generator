import { FontSizeField } from "@/components/forms/fields/font-size-field";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { TextAlignField } from "@/components/forms/fields/text-align-field";
import { cn } from "@/lib/utils";
import React from "react";

export function TextStyleFormFields({
  fieldName,
  form,
  children,
  className = "",
}: {
  fieldName:
    | `slides.${number}.title.style`
    | `slides.${number}.subtitle.style`
    | `slides.${number}.description.style`;
  form: DocumentFormReturn;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col")}>
      <div className="flex flex-row justify-between items-center rounded border">
        <FontSizeField
          form={form}
          fieldName={`${fieldName}.fontSize`}
          groupClassName="gap-0"
          itemClassName=""
        />
        <TextAlignField form={form} fieldName={`${fieldName}.align`} />
      </div>
      {children}
    </div>
  );
}
