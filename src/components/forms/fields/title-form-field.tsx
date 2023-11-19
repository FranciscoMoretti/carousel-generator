import { DocumentFormReturn } from "@/lib/document-form-types";
import { TextStyleFormFields } from "./text-style-form-field";
import { TextInputFormField } from "@/components/forms/fields/text-input-form-field";
import { Label } from "@/components/ui/label";

export function TitleFormField({
  currentSlide,
  form,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Title</Label>
      <TextStyleFormFields
        form={form}
        fieldName={`slides.${currentSlide}.title.style`}
        className="flex flex-row"
      >
        <TextInputFormField
          fieldName={`slides.${currentSlide}.title.text`}
          label=""
          placeholder="Your super cool title"
          form={form}
        />
      </TextStyleFormFields>
    </div>
  );
}
