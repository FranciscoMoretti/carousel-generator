import { Button } from "@/components/ui/button";
import { usePagerContext } from "@/lib/providers/pager-context";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { UseFormReturn, useFieldArray, useFormContext } from "react-hook-form";
import * as z from "zod";
import {
  ArrowLeftFromLine,
  ArrowRightFromLineIcon,
  ArrowRightFromLine,
  X,
  Copy,
} from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function SlideMenubar({}: Props) {
  const { currentPage, numPages } = usePagerContext();
  const {
    control,
    watch,
  }: UseFormReturn<
    z.infer<typeof DocumentSchema>,
    any,
    undefined
  > = useFormContext(); // retrieve those props

  const currentSlidesValues = watch("slides");

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "slides", // unique name for your Field Array
    }
  );

  return (
    <div className="flex flex-row gap-1">
      <Button
        onClick={() => swap(currentPage, currentPage - 1)}
        variant="outline"
        size="icon"
        disabled={currentPage == 0}
      >
        <ArrowLeftFromLine className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => insert(currentPage, currentSlidesValues[currentPage])}
        variant="outline"
        size="icon"
      >
        <Copy className="w-4 h-4" />
      </Button>
      <Button onClick={() => remove(currentPage)} variant="outline" size="icon">
        <X className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => swap(currentPage, currentPage + 1)}
        variant="outline"
        size="icon"
        disabled={currentPage == numPages - 1}
      >
        <ArrowRightFromLine className="w-4 h-4" />
      </Button>
    </div>
  );
}
