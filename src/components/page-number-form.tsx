import { useFormContext } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { DocumentFormReturn } from "@/lib/document-form-types";
import { Checkbox } from "@/components/ui/checkbox";

export function PageNumberForm({}: {}) {
  const form: DocumentFormReturn = useFormContext(); // retrieve those props

  return (
    <Form {...form}>
      <form className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="config.pageNumber.showNumbers"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none text-base">
                <FormLabel>Show page numbers</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
