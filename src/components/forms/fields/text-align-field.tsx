import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { FontSizeType, TextALignType } from "@/lib/validation/text-schema";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { FontSizeRadioGroupItem } from "@/components/font-size-radio-group-item";
import { cn } from "@/lib/utils";

// TODO: JOin with FontSizeField and parametrize
export function TextAlignField({
  fieldName,
  form,
  itemClassName = "",
  groupClassName = "",
}: {
  fieldName:
    | `slides.${number}.title.style.align`
    | `slides.${number}.subtitle.style.align`
    | `slides.${number}.description.style.align`;
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
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <FontSizeRadioGroupItem
                    value={TextALignType.enum.Left}
                    className={cn(
                      "h-6 w-6 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent",
                      itemClassName
                    )}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </FontSizeRadioGroupItem>
                </FormControl>
                {/* <FormLabel className="font-normal">Huemint 1</FormLabel> */}
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 ">
                <FormControl>
                  <FontSizeRadioGroupItem
                    value={TextALignType.enum.Center}
                    className={cn(
                      "h-6 w-6 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent",
                      itemClassName
                    )}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </FontSizeRadioGroupItem>
                </FormControl>
                {/* <FormLabel className="font-normal">Huemint 1</FormLabel> */}
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <FontSizeRadioGroupItem
                    value={TextALignType.enum.Right}
                    className={cn(
                      "h-6 w-6 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent",
                      itemClassName
                    )}
                  >
                    <AlignRight className="h-4 w-4" />
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
