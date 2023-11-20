import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { TitleFormField } from "@/components/forms/fields/title-form-field";
import { SubtitleFormField } from "@/components/forms/fields/subtitle-form-field";
import { DescriptionFormField } from "@/components/forms/fields/description-form-field";
import { ImageFormField } from "@/components/forms/fields/image-form-field";

export const MAX_IMAGE_SIZE_MB = 0.5; // Set your maximum image size limit in megabytes
export const MAX_IMAGE_WIDTH = 800; // Set your maximum image width

export function IntroSlideForm({
  currentSlide,
  form,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
}) {
  // TODO: Validate fields with zod on change (e.g. Max character)
  return (
    <div className="space-y-6 w-full">
      <TitleFormField currentSlide={currentSlide} form={form} />
      <SubtitleFormField currentSlide={currentSlide} form={form} />
      <DescriptionFormField currentSlide={currentSlide} form={form} />
      <ImageFormField
        fieldName={`slides.${currentSlide}.backgroundImage`}
        form={form}
        formType={"backgroundImage"}
      />
    </div>
  );
}
