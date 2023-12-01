"use client";
import { Button } from "@/components/ui/button";
import { usePagerContext } from "@/lib/providers/pager-context";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { useFormContext } from "react-hook-form";
import {
  CornerUpRight,
  CornerUpLeft,
  Copy,
  Trash,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  DocumentFormReturn,
  SlidesFieldArrayReturn,
} from "@/lib/document-form-types";
import { useFieldArrayValues } from "@/lib/hooks/use-field-array-values";
import { cn } from "@/lib/utils";
import { useFieldArray } from "react-hook-form";
import { getParent, getElementNumber } from "@/lib/field-path";

export default function ElementMenubar({
  // slidesFieldArray,
  fieldName, //TODO Maybe change with number or expose onclciks
  children,
  className = "",
}: //
{
  // slidesFieldArray: SlidesFieldArrayReturn;
  fieldName: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { numPages: numElements } = useFieldArrayValues(getParent(fieldName));
  const { watch }: DocumentFormReturn = useFormContext(); // retrieve those props
  const { control } = useFormContext();
  const { swap, remove, insert } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: getParent(fieldName), // unique name for your Field Array
  });
  const currentElementNumber = getElementNumber(fieldName);
  const currentElementValue = watch(fieldName);

  // const { remove, swap, insert } = slidesFieldArray;

  return (
    <div className="relative">
      <div
        className={cn("flex flex-row gap-1 absolute -top-7 right-0", className)}
      >
        <Button
          onClick={() => {
            swap(currentElementNumber, currentElementNumber - 1);
            // setCurrentPage(currentElementNumber - 1);
          }}
          variant="outline"
          size="icon"
          className="w-6 h-6"
          disabled={
            currentElementNumber <= 0 || currentElementNumber > numElements - 1
          }
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => {
            // console.log({
            //   currentElementNumber,
            //   pageValue: currentSlidesValues[currentElementNumber],
            // });
            const insertPosition = currentElementNumber;
            const values = JSON.parse(JSON.stringify(currentElementValue));
            insert(insertPosition, values);
            // // TODO A clone sets focus to an input and that resets current page back to `inserposition`
            // setCurrentPage(insertPosition + 1);
          }}
          disabled={currentElementNumber == 0 && numElements == 0}
          variant="outline"
          size="icon"
          className="w-6 h-6"
        >
          <Copy className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => {
            remove(currentElementNumber);
            // if (currentElementNumber > 0) {
            //   // setNumPages(numElements - 1);
            //   setCurrentPage(currentElementNumber - 1);
            // } else if (currentElementNumber == 0 && numElements > 0) {
            //   setCurrentPage(0);
            // } else if (currentElementNumber < 0 || currentElementNumber >= numElements) {
            //   console.error("Current page number not valid: ", currentElementNumber);
            // }
          }}
          disabled={currentElementNumber == 0 && numElements == 0}
          variant="outline"
          size="icon"
          className="w-6 h-6"
        >
          <Trash className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => {
            swap(currentElementNumber, currentElementNumber + 1);
            // setCurrentPage(currentElementNumber + 1);
          }}
          variant="outline"
          size="icon"
          className="w-6 h-6"
          disabled={currentElementNumber >= numElements - 1}
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
      {children}
    </div>
  );
}
