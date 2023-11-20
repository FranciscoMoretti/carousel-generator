import { Type } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { CustomIndicatorRadioGroupItem } from "@/components/custom-indicator-radio-group-item";
import { cn } from "@/lib/utils";

export function EnumRadioGroupField<T extends string | number | symbol>({
  fieldName,
  form,
  enumValueElements,
  itemClassName = "",
  groupClassName = "",
}: {
  fieldName: // FontSize
  | `slides.${number}.title.style.fontSize`
    | `slides.${number}.subtitle.style.fontSize`
    | `slides.${number}.description.style.fontSize`
    // Align
    | `slides.${number}.title.style.align`
    | `slides.${number}.subtitle.style.align`
    | `slides.${number}.description.style.align`;
  form: DocumentFormReturn;
  enumValueElements: Record<T, React.ReactNode>;
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
              {Object.entries(enumValueElements).map(([value, icon]) => (
                <FormItem className="flex items-center" key={value}>
                  <FormControl>
                    <CustomIndicatorRadioGroupItem
                      value={value}
                      className={cn(
                        "h-5 w-5 flex flex-col items-center justify-center data-[state=unchecked]:border-transparent border",
                        itemClassName
                      )}
                    >
                      {icon}
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
