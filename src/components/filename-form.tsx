import { useFormContext } from "react-hook-form";

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
import { DocumentFormReturn } from "@/lib/document-form-types";

export function FilenameForm({}: {}) {
  const form: DocumentFormReturn = useFormContext(); // retrieve those props

  return (
    <Form {...form}>
      <form className="">
        <FormField
          control={form.control}
          name="filename"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Untitled Carousel"
                  className="py-0 h-8 border-none text-right text-base font-semibold"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
