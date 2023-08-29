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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { palletes } from "@/lib/palletes";

export function ThemeForm({}: {}) {
  const form: UseFormReturn<
    z.infer<typeof DocumentSchema>,
    any,
    undefined
  > = useFormContext(); // retrieve those props

  const { setValue } = form;

  return (
    // TODO: popover with picker from github.com/casesandberg/react-color or github.com/omgovich/react-colorful
    <Form {...form}>
      <FormField
        control={form.control}
        name="theme.pallette"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Notify me about...</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => {
                  const colors = palletes[value];
                  setValue("theme.primary", colors.primary);
                  setValue("theme.secondary", colors.secondary);
                  setValue("theme.background", colors.background);
                }}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="huemint-1" />
                  </FormControl>
                  <FormLabel className="font-normal">Huemint 1</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="huemint-2" />
                  </FormControl>
                  <FormLabel className="font-normal">Huemint 2</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
          name="theme.background"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background</FormLabel>
              <FormControl>
                <Input placeholder="Background color" className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
