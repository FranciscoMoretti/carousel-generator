import { EnumRadioGroupField } from "@/components/forms/fields/enum-radio-group-field";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { TextAlignField } from "@/components/forms/fields/text-align-field";
import { cn } from "@/lib/utils";
import React from "react";
import { AlignCenter, AlignLeft, AlignRight, Type } from "lucide-react";
import { FontSizeType, TextALignType } from "@/lib/validation/text-schema";

const fontSizeMap: Record<FontSizeType, React.ReactElement> = {
  [FontSizeType.enum.Small]: <Type className="h-2 w-2" />,
  [FontSizeType.enum.Medium]: <Type className="h-3 w-3" />,
  [FontSizeType.enum.Large]: <Type className="h-4 w-4" />,
};

const textAlignMap: Record<TextALignType, React.ReactElement> = {
  [TextALignType.enum.Left]: <AlignLeft className="h-4 w-4" />,
  [TextALignType.enum.Center]: <AlignCenter className="h-4 w-4" />,
  [TextALignType.enum.Right]: <AlignRight className="h-4 w-4" />,
};

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
        <EnumRadioGroupField
          form={form}
          fieldName={`${fieldName}.fontSize`}
          enumValueElements={fontSizeMap}
          groupClassName="gap-0"
          itemClassName=""
        />
        <EnumRadioGroupField
          form={form}
          fieldName={`${fieldName}.align`}
          enumValueElements={textAlignMap}
          groupClassName="gap-0"
          itemClassName=""
        />
      </div>
      {children}
    </div>
  );
}
