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
  const INTRO_PAGE_SHIFT = 1;
  const OUTRO_PAGE_SHIFT = 1;

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "slides", // unique name for your Field Array
    }
  );

  const currentContentSlide = currentPage - INTRO_PAGE_SHIFT;
  return (
    <div className="flex flex-row gap-1">
      <Button
        onClick={() => swap(currentContentSlide, currentContentSlide - 1)}
        variant="outline"
        size="icon"
        disabled={
          currentPage <= 0 + INTRO_PAGE_SHIFT ||
          currentPage > numPages - 1 - OUTRO_PAGE_SHIFT
        }
      >
        <ArrowLeftFromLine className="w-4 h-4" />
      </Button>
      <Button
        onClick={() =>
          insert(currentContentSlide, currentSlidesValues[currentContentSlide])
        }
        disabled={currentPage == 0 || currentPage == numPages - 1}
        variant="outline"
        size="icon"
      >
        <Copy className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => remove(currentPage)}
        disabled={currentPage == 0 || currentPage == numPages - 1}
        variant="outline"
        size="icon"
      >
        <X className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => swap(currentContentSlide, currentContentSlide + 1)}
        variant="outline"
        size="icon"
        disabled={
          currentPage < INTRO_PAGE_SHIFT ||
          currentPage >= numPages - 1 - OUTRO_PAGE_SHIFT
        }
      >
        <ArrowRightFromLine className="w-4 h-4" />
      </Button>
    </div>
  );
}
