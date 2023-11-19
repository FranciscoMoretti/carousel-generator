import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DocumentFormReturn } from "@/lib/document-form-types";

export function TextInputFormField({
  fieldName,
  form,
  label,
  placeholder,
  className = "",
}: {
  fieldName:
    | `slides.${number}.title.text`
    | `slides.${number}.subtitle.text`
    | `slides.${number}.description.text`;
  form: DocumentFormReturn;
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} className="" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
