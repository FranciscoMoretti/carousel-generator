import React from "react";
import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { TitleSchema } from "@/lib/validation/text-schema";
import { textStyleToClasses } from "@/lib/text-style-to-classes";
import { useFormContext } from "react-hook-form";
import {
  DocumentFormReturn,
  TextFieldTextPath,
} from "@/lib/document-form-types";
import { TextAreaFormField } from "@/components/forms/fields/text-area-form-field";

export function Title2({
  fieldName,
  className = "",
}: {
  fieldName: TextFields;
  className?: string;
}) {
  const form = useFormContext();
  const { getValues } = form;
  const config = getValues("config");
  const style = getValues(`${fieldName}.style`);
  const textFieldName = (fieldName + ".text") as TextFieldTextPath;

  return (
    <TextAreaFormField
      fieldName={textFieldName}
      form={form}
      placeholder={"Your title here"}
      className={cn(
        `font-black text-balance`,
        textStyleToClasses({
          style: style,
          sizes: ["text-7xl", "text-5xl", "text-3xl"],
        }),
        fontIdToClassName(config.fonts.font1),
        className
      )}
      style={{
        color: config.theme.primary,
      }}
    />
  );
}
