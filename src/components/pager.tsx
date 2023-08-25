import { Button } from "@/components/ui/button";

interface Props extends React.HTMLAttributes<HTMLElement> {
  currentPage: number;
  numPages: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

export default function Pager({
  currentPage,
  numPages,
  onPreviousClick,
  onNextClick,
}: Props) {
  return (
    <>
      <div className="space-x-2">
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
      </div>
    </>
  );
}
