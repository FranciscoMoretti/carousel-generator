import { EnumRadioGroupField } from "@/components/forms/fields/enum-radio-group-field";
import {
  DocumentFormReturn,
  TextFieldStylePath,
} from "@/lib/document-form-types";
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
  className = "",
}: {
  fieldName: TextFieldStylePath;
  form: DocumentFormReturn;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <EnumRadioGroupField
        form={form}
        fieldName={`${fieldName}.fontSize`}
        enumValueElements={fontSizeMap}
        groupClassName="grid grid-cols-3 items-center gap-1"
        itemClassName="h-10 w-10"
      />
      <EnumRadioGroupField
        form={form}
        fieldName={`${fieldName}.align`}
        enumValueElements={textAlignMap}
        groupClassName="grid grid-cols-3 items-center gap-1"
        itemClassName="h-10 w-10"
      />
    </div>
  );
}
