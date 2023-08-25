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

export function ThemeForm({}: {}) {
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
          name="theme.primary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary</FormLabel>
              <FormControl>
                <Input placeholder="Primary color" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme.secondary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secondary</FormLabel>
              <FormControl>
                <Input placeholder="Secondary color" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme.accent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Accent</FormLabel>
              <FormControl>
                <Input placeholder="Accent color" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
