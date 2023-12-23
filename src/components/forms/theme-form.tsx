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
import { Input } from "@/components/ui/input";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { pallettes } from "@/lib/pallettes";
import { CustomIndicatorRadioGroupItem } from "../custom-indicator-radio-group-item";
import { ColorThemeDisplay } from "../color-theme-display";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { Checkbox } from "../ui/checkbox";

function PalletteSelector({ form }: { form: DocumentFormReturn }) {
  const { control, setValue } = form;

  return (
    <FormField
      control={control}
      name="config.theme.pallette"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Select a pallette</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                const colors = pallettes[value];
                setValue("config.theme.primary", colors.primary);
                setValue("config.theme.secondary", colors.secondary);
                setValue("config.theme.background", colors.background);
                setValue("config.theme.pallette", value);
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
                    <CustomIndicatorRadioGroupItem value={palletteName}>
                      <ColorThemeDisplay colors={colors} />
                    </CustomIndicatorRadioGroupItem>
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

function CustomColors({ form }: { form: DocumentFormReturn }) {
  // TODO: popover with picker from github.com/casesandberg/react-color or github.com/omgovich/react-colorful
  return (
    <>
      <FormField
        control={form.control}
        name="config.theme.primary"
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
        name="config.theme.secondary"
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
        name="config.theme.background"
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
  const form: DocumentFormReturn = useFormContext(); // retrieve those props
  const { watch } = form;
  const isCustom = watch("config.theme.isCustom");
  return (
    // TODO: check on custom color to enable/disable pallette custom colors
    <Form {...form}>
      <form className="space-y-6 w-full py-4">
        <FormField
          control={form.control}
          name="config.theme.isCustom"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none text-base">
                <FormLabel>Use custom colors</FormLabel>
              </div>
            </FormItem>
          )}
        />
        {isCustom ? (
          <CustomColors form={form} />
        ) : (
          <PalletteSelector form={form} />
        )}
      </form>
    </Form>
  );
}
