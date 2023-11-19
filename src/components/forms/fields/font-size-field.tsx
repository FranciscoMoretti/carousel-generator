import { Type } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { FontSizeType } from "@/lib/validation/text-schema";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { FontSizeRadioGroupItem } from "@/components/font-size-radio-group-item";
import { cn } from "@/lib/utils";

export function FontSizeField({
  fieldName,
  form,
  itemClassName = "",
  groupClassName = "",
}: {
  fieldName:
    | `slides.${number}.title.style.fontSize`
    | `slides.${number}.subtitle.style.fontSize`
    | `slides.${number}.description.style.fontSize`;
  form: DocumentFormReturn;
  itemClassName?: string;
  groupClassName?: string;
}) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex flex-row gap-0.5", groupClassName)}
            >
              <FormItem className="flex items-center">
                <FormControl>
                  <FontSizeRadioGroupItem
                    value={FontSizeType.enum.Small}
                    className={cn(
                      "h-6 w-6 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent",
                      itemClassName
                    )}
                  >
                    <Type className="h-2 w-2" />
                  </FontSizeRadioGroupItem>
                </FormControl>
                {/* <FormLabel className="font-normal">Huemint 1</FormLabel> */}
              </FormItem>
              <FormItem className="flex items-center ">
                <FormControl>
                  <FontSizeRadioGroupItem
                    value={FontSizeType.enum.Medium}
                    className={cn(
                      "h-6 w-6 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent",
                      itemClassName
                    )}
                  >
                    <Type className="h-3 w-3" />
                  </FontSizeRadioGroupItem>
                </FormControl>
                {/* <FormLabel className="font-normal">Huemint 1</FormLabel> */}
              </FormItem>
              <FormItem className="flex items-center ">
                <FormControl>
                  <FontSizeRadioGroupItem
                    value={FontSizeType.enum.Large}
                    className={cn(
                      "h-6 w-6 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent",
                      itemClassName
                    )}
                  >
                    <Type className="h-4 w-4" />
                  </FontSizeRadioGroupItem>
                </FormControl>
                {/* <FormLabel className="font-normal">Huemint 1</FormLabel> */}
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
