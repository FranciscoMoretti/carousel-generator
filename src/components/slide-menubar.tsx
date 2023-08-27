import { Button } from "@/components/ui/button";
import { usePagerContext } from "@/lib/providers/pager-context";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { UseFormReturn, useFieldArray, useFormContext } from "react-hook-form";
import * as z from "zod";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function SlideMenubar({}: Props) {
  const { currentPage, numPages } = usePagerContext();
  const {
    control,
  }: UseFormReturn<
    z.infer<typeof DocumentSchema>,
    any,
    undefined
  > = useFormContext(); // retrieve those props
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
        size="sm"
        disabled={currentPage == 0}
      >
        Reorder
      </Button>
      <Button onClick={() => null} variant="outline" size="sm">
        Duplicate
      </Button>
      <Button onClick={() => null} variant="outline" size="sm">
        Delete
      </Button>
      <Button
        onClick={() => swap(currentPage, currentPage + 1)}
        variant="outline"
        size="sm"
        disabled={currentPage == numPages - 1}
      >
        Reorder
      </Button>
    </div>
  );
}
