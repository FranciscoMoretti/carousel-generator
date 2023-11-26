import { AutoTextarea } from "@/components/ui/auto-text-area";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DocumentFormReturn,
  TextFieldTextPath,
} from "@/lib/document-form-types";

import { CSSProperties } from "react";

export function TextAreaFormField({
  form,
  fieldName,
  label,
  placeholder,
  className = "",
  style = {},
}: {
  form: DocumentFormReturn;
  fieldName: TextFieldTextPath;
  label: string;
  placeholder: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={"space-y-0"}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <AutoTextarea
              placeholder={placeholder}
              className={className}
              style={style}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
