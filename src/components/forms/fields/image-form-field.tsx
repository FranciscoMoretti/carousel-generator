import { DocumentFormReturn } from "@/lib/document-form-types";
import {
  ImageContentFormField,
  ImageFormType,
} from "@/components/forms/fields/image-content-form-field";

export function ImageFormField({
  fieldName,
  form,
  formType,
}: {
  fieldName:
    | `slides.${number}.image.content`
    | `slides.${number}.backgroundImage.content`
    | "config.brand.avatar.content";
  form: DocumentFormReturn;
  formType: ImageFormType;
}) {
  return (
    <ImageContentFormField
      fieldName={fieldName}
      form={form}
      formType={formType}
    />
  );
}
