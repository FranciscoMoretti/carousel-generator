import { useSelectionContext } from "@/lib/providers/selection-context";
import { getStyleSibling } from "../lib/field-path";
import { EnumRadioGroupField } from "@/components/forms/fields/enum-radio-group-field";
import {
  DocumentFormReturn,
  ElementFieldPath,
  ImageSourceFieldPath,
  ImageSourceSrcFieldPath,
  ImageStyleObjectFitFieldPath,
  ImageStyleOpacityFieldPath,
  StyleFieldPath,
  TextStyleAlignFieldPath,
  TextStyleFontSizeFieldPath,
} from "@/lib/document-form-types";
import { cn } from "@/lib/utils";
import React from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Maximize2,
  Minimize2,
  Type,
} from "lucide-react";
import { FontSizeType, TextALignType } from "@/lib/validation/text-schema";
import { OpacityFormField } from "@/components/forms/fields/opacity-form-field";
import { ImageSourceFormField } from "@/components/forms/fields/image-source-form-field";
import { ObjectFitType } from "@/lib/validation/image-schema";
import { ElementType } from "@/lib/validation/element-type";

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

const objectFitMap: Record<ObjectFitType, React.ReactElement> = {
  [ObjectFitType.enum.Contain]: <Minimize2 className="h-4 w-4" />,
  [ObjectFitType.enum.Cover]: <Maximize2 className="h-4 w-4" />,
};

export function StyleMenu({
  form,
  className = "",
}: {
  form: DocumentFormReturn;
  className?: string;
}) {
  const { currentSelection: elementPath } = useSelectionContext();
  const stylePath = elementPath ? elementPath + ".style" : "";
  if (!stylePath) {
    return <></>;
  }
  const values = form.getValues(elementPath as ElementFieldPath);
  const style = values.style;
  const type = values.type;
  return (
    <div
      className={cn("grid gap-4", className)}
      onClick={
        // Don't propagate click to background
        (event) => event.stopPropagation()
      }
      key={elementPath}
    >
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Style</h4>
        <p className="text-sm text-muted-foreground">
          Set the selected element style.
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        {style && Object.hasOwn(style, "fontsize") ? (
          <EnumRadioGroupField
            form={form}
            fieldName={`${stylePath}.fontSize` as TextStyleFontSizeFieldPath}
            enumValueElements={fontSizeMap}
            groupClassName="grid grid-cols-3 items-center gap-1"
            itemClassName="h-10 w-10"
          />
        ) : null}
        {style && Object.hasOwn(style, "align") ? (
          <EnumRadioGroupField
            form={form}
            fieldName={`${stylePath}.align` as TextStyleAlignFieldPath}
            enumValueElements={textAlignMap}
            groupClassName="grid grid-cols-3 items-center gap-1"
            itemClassName="h-10 w-10"
          />
        ) : null}
        {style && Object.hasOwn(style, "objectFit") ? (
          <EnumRadioGroupField
            form={form}
            fieldName={`${stylePath}.objectFit` as ImageStyleObjectFitFieldPath}
            enumValueElements={objectFitMap}
            groupClassName="grid grid-cols-3 items-center gap-1"
            itemClassName="h-10 w-10"
          />
        ) : null}
        {style && Object.hasOwn(style, "opacity") ? (
          <OpacityFormField
            fieldName={`${stylePath}.opacity` as ImageStyleOpacityFieldPath}
            form={form}
            label={"Opacity"}
            className="w-full"
            disabled={
              form.getValues(
                `${elementPath}.source.src` as ImageSourceSrcFieldPath
              ) == ""
            }
          />
        ) : null}
        {type == ElementType.enum.Image ||
        type == ElementType.enum.ContentImage ? (
          <div className="w-full flex flex-col gap-1">
            <h4 className="text-base font-semibold">Image</h4>
            <ImageSourceFormField
              fieldName={`${elementPath}.source` as ImageSourceFieldPath}
              form={form}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
