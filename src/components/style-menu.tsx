import { useSelectionContext } from "@/lib/providers/selection-context";
import { getStyleSibling } from "../lib/field-path";
import { EnumRadioGroupField } from "@/components/forms/fields/enum-radio-group-field";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { cn } from "@/lib/utils";
import React from "react";
import { AlignCenter, AlignLeft, AlignRight, Type } from "lucide-react";
import { FontSizeType, TextALignType } from "@/lib/validation/text-schema";
import { OpacityFormField } from "@/components/forms/fields/opacity-form-field";
import { ImageSourceFormField } from "@/components/forms/fields/image-source-form-field";

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

export function StyleMenu({ form }: { form: DocumentFormReturn }) {
  const { currentSelection: srcPath } = useSelectionContext();
  const stylePath = srcPath ? getStyleSibling(srcPath) : "";
  const values = stylePath ? form.getValues(stylePath) : {};
  console.log(stylePath);
  console.log(values);
  return (
    <div
      className="grid gap-4"
      onClick={
        // Don't propagate click to background
        (event) => event.stopPropagation()
      }
    >
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Style</h4>
        <p className="text-sm text-muted-foreground">
          Set the selected element style.
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        {values.fontSize != undefined ? (
          <EnumRadioGroupField
            form={form}
            fieldName={`${stylePath}.fontSize`}
            enumValueElements={fontSizeMap}
            groupClassName="grid grid-cols-3 items-center gap-1"
            itemClassName="h-10 w-10"
          />
        ) : null}
        {values.align != undefined ? (
          <EnumRadioGroupField
            form={form}
            fieldName={`${stylePath}.align`}
            enumValueElements={textAlignMap}
            groupClassName="grid grid-cols-3 items-center gap-1"
            itemClassName="h-10 w-10"
          />
        ) : null}
        {values.opacity != undefined ? (
          <OpacityFormField
            fieldName={`${stylePath}.opacity`}
            form={form}
            label={"Opacity"}
            className="w-full"
            disabled={form.getValues(`${srcPath}.src`) == ""}
          />
        ) : null}
        {srcPath?.endsWith(".source") ? (
          <ImageSourceFormField fieldName={`${srcPath}`} form={form} />
        ) : null}
        {/* {currentSelection ? (
        <TextStyleFormFields
          key={currentSelection} // Necessary to update the component based on field change
          form={form}
          fieldName={stylePath}
          className="flex flex-row"
        ></TextStyleFormFields>
      ) : null} */}
      </div>
    </div>
  );
}
