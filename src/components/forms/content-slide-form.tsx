import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { DocumentFormReturn } from "@/lib/document-form-types";
import { ImageContentFormField } from "./fields/image-content-form-field";
import { TitleFormField } from "./fields/title-form-field";
import { DescriptionFormField } from "@/components/forms/fields/description-form-field";
import { ImageFormField } from "@/components/forms/fields/image-form-field";

export function ContentSlideForm({
  currentSlide,
  form,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
}) {
  return (
    <div className="space-y-6 w-full">
      <TitleFormField currentSlide={currentSlide} form={form}></TitleFormField>
      <DescriptionFormField currentSlide={currentSlide} form={form} />
      <ImageFormField
        fieldName={`slides.${currentSlide}.image`}
        form={form}
        formType="image"
      />
    </div>
  );
}
