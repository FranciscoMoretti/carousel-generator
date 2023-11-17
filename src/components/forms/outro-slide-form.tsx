import { useFormContext } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";

import { DocumentFormReturn } from "@/lib/document-form-types";
import { TitleFormField } from "@/components/forms/fields/title-form-field";
import { SubtitleFormField } from "./fields/subtitle-form-field";
import { DescriptionFormField } from "./fields/description-form-field";

export function OutroSlideForm({
  currentSlide,
  form,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
}) {
  return (
    <div className="space-y-6 w-full">
      <TitleFormField currentSlide={currentSlide} form={form} />
      <SubtitleFormField currentSlide={currentSlide} form={form} />
      <DescriptionFormField currentSlide={currentSlide} form={form} />
    </div>
  );
}
