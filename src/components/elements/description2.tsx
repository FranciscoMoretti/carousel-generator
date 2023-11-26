import React from "react";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { textStyleToClasses } from "@/lib/text-style-to-classes";
import { useFormContext } from "react-hook-form";
import { TextAreaFormField } from "@/components/forms/fields/text-area-form-field";

export function Description2({
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
        `font-medium`,
        textStyleToClasses({
          style: style,
          sizes: ["text-xl", "text-lg", "text-base"],
        }),
        fontIdToClassName(config.fonts.font2),
        className
      )}
      style={{
        color: config.theme.secondary,
      }}
    />
  );
}
