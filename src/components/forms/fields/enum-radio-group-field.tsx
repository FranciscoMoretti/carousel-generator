import { Type } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DocumentFormReturn,
  ImageStyleObjectFitFieldPath,
  TextStyleAlignFieldPath,
  TextStyleFontSizeFieldPath,
} from "@/lib/document-form-types";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { CustomIndicatorRadioGroupItem } from "@/components/custom-indicator-radio-group-item";
import { cn } from "@/lib/utils";
import React from "react";
import { TypographyFieldName } from "@/components/typography";

export function EnumRadioGroupField<T extends string | number | symbol>({
  fieldName,
  form,
  enumValueElements,
  name,
  itemClassName = "",
  groupClassName = "",
}: {
  fieldName:
    | TextStyleFontSizeFieldPath
    | TextStyleAlignFieldPath
    | ImageStyleObjectFitFieldPath;
  form: DocumentFormReturn;
  name: string;
  enumValueElements: Record<T, React.ReactNode>;
  itemClassName?: string;
  groupClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <TypographyFieldName>{name}</TypographyFieldName>
      <FormField
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={form.getValues(fieldName)}
                className={cn("flex flex-row gap-0.5", groupClassName)}
              >
                {Object.entries<React.ReactNode>(
                  enumValueElements
                ).map<React.ReactNode>(([value, icon]) => (
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
    </div>
  );
}
