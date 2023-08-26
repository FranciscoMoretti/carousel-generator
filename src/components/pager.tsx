import { Button } from "@/components/ui/button";
import { usePagerContext } from "@/lib/providers/pager-context";

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
        First
      </Button>
      <Button
        onClick={onPreviousClick}
        variant="outline"
        size="sm"
        disabled={currentPage == 0}
      >
        Previous
      </Button>
      <Button
        onClick={onNextClick}
        variant="outline"
        size="sm"
        disabled={currentPage == numPages - 1}
      >
        Next
      </Button>
      <Button
        onClick={() => setPage(numPages - 1)}
        variant="outline"
        size="sm"
        disabled={currentPage == numPages - 1}
      >
        Last
      </Button>
    </div>
  );
}
