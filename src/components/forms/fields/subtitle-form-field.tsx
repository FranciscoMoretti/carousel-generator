import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DocumentFormReturn } from "@/lib/document-form-types";

export function SubtitleFormField({
  currentSlide,
  form,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
}) {
  return (
    <FormField
      control={form.control}
      name={`slides.${currentSlide}.subtitle`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Subtitle</FormLabel>
          <FormControl>
            <Input
              placeholder="Subtitle for more clarity"
              className=""
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
