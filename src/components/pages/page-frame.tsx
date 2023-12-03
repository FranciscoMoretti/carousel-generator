import React from "react";
import { cn } from "@/lib/utils";
import { usePagerContext } from "@/lib/providers/pager-context";
import { getParent, getSlideNumber } from "@/lib/field-path";
import { useSelection } from "@/lib/hooks/use-selection";
import { useSelectionContext } from "@/lib/providers/selection-context";

export function PageFrame({
  children,
  fieldName,
  className,
}: {
  children: React.ReactNode;
  fieldName: string;
  className?: string;
}) {
  const { setCurrentPage } = usePagerContext();
  const { setCurrentSelection } = useSelectionContext();
  const pageNumber = getSlideNumber(fieldName);

  return (
    <div
      className={cn("flex flex-col h-full w-full", className)}
      onClick={(event) => {
        setCurrentPage(pageNumber);
        setCurrentSelection(fieldName, event);
      }}
    >
      {children}
    </div>
  );
}
