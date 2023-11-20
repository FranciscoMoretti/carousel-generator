import { DocumentFormReturn } from "@/lib/document-form-types";
import { TextInputFormField } from "./text-input-form-field";
import { TextStyleFormFields } from "@/components/forms/fields/text-style-form-field";
import { Label } from "@/components/ui/label";

export function SubtitleFormField({
  currentSlide,
  form,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-base">Subtitle</Label>
      <TextStyleFormFields
        form={form}
        fieldName={`slides.${currentSlide}.subtitle.style`}
        className="flex flex-row"
      >
        <TextInputFormField
          fieldName={`slides.${currentSlide}.subtitle.text`}
          label=""
          placeholder="Your super cool subtitle"
          form={form}
        />
      </TextStyleFormFields>
    </div>
  );
}
