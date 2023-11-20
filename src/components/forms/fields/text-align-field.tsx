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
import { CustomIndicatorRadioGroupItem } from "@/components/custom-indicator-radio-group-item";
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
                  <CustomIndicatorRadioGroupItem
                    value={TextALignType.enum.Left}
                    className={cn(
                      "h-5 w-5 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent border",
                      itemClassName
                    )}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </CustomIndicatorRadioGroupItem>
                </FormControl>
                {/* <FormLabel className="font-normal">Huemint 1</FormLabel> */}
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 ">
                <FormControl>
                  <CustomIndicatorRadioGroupItem
                    value={TextALignType.enum.Center}
                    className={cn(
                      "h-5 w-5 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent border",
                      itemClassName
                    )}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </CustomIndicatorRadioGroupItem>
                </FormControl>
                {/* <FormLabel className="font-normal">Huemint 1</FormLabel> */}
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <CustomIndicatorRadioGroupItem
                    value={TextALignType.enum.Right}
                    className={cn(
                      "h-5 w-5 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent border",
                      itemClassName
                    )}
                  >
                    <AlignRight className="h-4 w-4" />
                  </CustomIndicatorRadioGroupItem>
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
