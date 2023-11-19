import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { TextStyleFormFields } from "@/components/forms/fields/text-style-form-field";
import { Label } from "@/components/ui/label";

export function DescriptionFormField({
  currentSlide,
  form,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label>Description</Label>
      <TextStyleFormFields
        form={form}
        fieldName={`slides.${currentSlide}.description.style`}
        className="flex flex-row"
      >
        <FormField
          control={form.control}
          name={`slides.${currentSlide}.description.text`}
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TextStyleFormFields>
    </div>
  );
}
