import { Button } from "@/components/ui/button";
import { usePagerContext } from "@/lib/providers/pager-context";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function Pager({}: Props) {
  const { currentPage, onPreviousClick, onNextClick, numPages, setPage } =
    usePagerContext();

  return (
    <div className="flex flex-row gap-1">
      <Button
        onClick={() => setPage(0)}
        variant="outline"
        size="sm"
        disabled={currentPage == 0}
      >
        <ChevronFirst className="w-4 h-4" />
      </Button>
      <Button
        onClick={onPreviousClick}
        variant="outline"
        size="sm"
        disabled={currentPage == 0}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        onClick={onNextClick}
        variant="outline"
        size="sm"
        disabled={currentPage == numPages - 1}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      <Button
        onClick={() => setPage(numPages - 1)}
        variant="outline"
        size="sm"
        disabled={currentPage == numPages - 1}
      >
        <ChevronLast className="w-4 h-4" />
      </Button>
    </div>
  );
}
