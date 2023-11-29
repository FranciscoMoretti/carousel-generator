import React from "react";
import { cn } from "@/lib/utils";
import { usePagerContext } from "@/lib/providers/pager-context";
import { getSlideNumber } from "@/lib/field-path";
import { useSelection } from "@/lib/hooks/use-selection";
import { useSelectionContext } from "@/lib/providers/selection-context";

export function PageBase({
  size,
  children,
  className,
}: {
  size: { width: number; height: number };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("overflow-clip relative", className)}
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        minWidth: `${size.width}px`,
        minHeight: `${size.height}px`,
      }}
    >
      {children}
    </div>
  );
}
