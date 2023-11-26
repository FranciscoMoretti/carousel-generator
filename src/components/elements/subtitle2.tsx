import React from "react";
import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { TitleSchema } from "@/lib/validation/text-schema";
import { textStyleToClasses } from "@/lib/text-style-to-classes";
import { useFormContext } from "react-hook-form";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { TextAreaFormField } from "@/components/forms/fields/text-area-form-field";

export function Subtitle2({
  fieldName,
  className = "",
}: {
  fieldName:
    | `slides.${number}.title`
    | `slides.${number}.subtitle`
    | `slides.${number}.description`;
  className?: string;
}) {
  const form = useFormContext();
  const { getValues } = form;
  const config = getValues("config");
  const style = getValues(`${fieldName}.style`);
  const textFieldName = (fieldName + ".text") as
    | `slides.${number}.title.text`
    | `slides.${number}.subtitle.text`
    | `slides.${number}.description.text`;

  return (
    <TextAreaFormField
      fieldName={textFieldName}
      form={form}
      placeholder={"Your title here"}
      className={cn(
        `font-bold`,
        textStyleToClasses({
          style: style,
          sizes: ["text-3xl", "text-2xl", "text-xl"],
        }),
        fontIdToClassName(config.fonts.font1),
        className
      )}
      style={{
        color: config.theme.secondary,
      }}
    />
  );
}
