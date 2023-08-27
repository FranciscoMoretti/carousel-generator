import { Button } from "@/components/ui/button";
import { usePagerContext } from "@/lib/providers/pager-context";

interface Props extends React.HTMLAttributes<HTMLElement> {}

export default function SlideMenubar({}: Props) {
  const { currentPage, numPages } = usePagerContext();

  return (
    <div className="flex flex-row gap-1">
      <Button
        onClick={() => null}
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
        onClick={() => null}
        variant="outline"
        size="sm"
        disabled={currentPage == numPages - 1}
      >
        Reorder
      </Button>
    </div>
  );
}
