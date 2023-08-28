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
import { Input } from "@/components/ui/input";

import { DocumentSchema } from "@/lib/validation/document-schema";

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
              <FormControl>
                <Input placeholder="Primary font" className="" {...field} />
              </FormControl>
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
              <FormControl>
                <Input placeholder="Secondary font" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
