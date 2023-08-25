import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { ThemeSchema } from "@/lib/validation/theme-schema";

export function ThemeForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof ThemeSchema>, any, undefined>;
}) {
  return (
    <Form {...form}>
      <form className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="primary"
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
          name="secondary"
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
          name="accent"
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
