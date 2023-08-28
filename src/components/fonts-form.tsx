import { UseFormReturn, useFormContext } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DocumentSchema } from "@/lib/validation/document-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontsMap } from "@/lib/fonts-map";

export function FontsForm({}: {}) {
  const form: UseFormReturn<
    z.infer<typeof DocumentSchema>,
    any,
    undefined
  > = useFormContext(); // retrieve those props

  return (
    <Form {...form}>
      <form className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="fonts.font1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font 1</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary font" />
                  </SelectTrigger>
                </FormControl>
                <FontSelectContent />
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fonts.font2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font 2</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a secondary font" />
                  </SelectTrigger>
                </FormControl>
                <FontSelectContent />
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
function FontSelectContent() {
  return (
    <SelectContent>
      {Object.keys(fontsMap).map((familyName) => (
        <SelectItem key={familyName} value={familyName}>
          {familyName}
        </SelectItem>
      ))}
    </SelectContent>
  );
}
