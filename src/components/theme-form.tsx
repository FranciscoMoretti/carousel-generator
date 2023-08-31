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
import { pallettes } from "@/lib/pallettes";
import {
  ColorsDisplay,
  ColorsRadioGroupItem,
} from "./pallette-radio-group-item";

function PalletteSelector({
  form,
}: {
  form: UseFormReturn<z.infer<typeof DocumentSchema>, any, undefined>;
}) {
  const { control, setValue } = form;

  return (
    <FormField
      control={control}
      name="theme.pallette"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Select a pallette</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                const colors = pallettes[value];
                setValue("theme.primary", colors.primary);
                setValue("theme.secondary", colors.secondary);
                setValue("theme.background", colors.background);
              }}
              defaultValue={field.value}
              className="grid grid-cols-3 space-y-1"
            >
              {Object.entries(pallettes).map(([palletteName, colors]) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={palletteName}
                >
                  <FormControl>
                    <ColorsRadioGroupItem value={palletteName}>
                      <ColorsDisplay colors={colors} />
                    </ColorsRadioGroupItem>
                  </FormControl>
                  {/* <FormLabel className="font-normal">Huemint 1</FormLabel> */}
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function CustomColors({
  form,
}: {
  form: UseFormReturn<z.infer<typeof DocumentSchema>, any, undefined>;
}) {
  // TODO: popover with picker from github.com/casesandberg/react-color or github.com/omgovich/react-colorful
  return (
    <>
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
    </>
  );
}

export function ThemeForm({}: {}) {
  const form: UseFormReturn<
    z.infer<typeof DocumentSchema>,
    any,
    undefined
  > = useFormContext(); // retrieve those props

  return (
    // TODO: check on custom color to enable/disable pallette custom colors
    <Form {...form}>
      <form className="space-y-6 w-full">
        <PalletteSelector form={form} />
        <CustomColors form={form} />
      </form>
    </Form>
  );
}
