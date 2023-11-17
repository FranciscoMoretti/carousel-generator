import React from "react";
import { cn } from "@/lib/utils";

export function PageLayout({
  size,
  handleClick,
  children,
  className,
}: {
  size: { width: number; height: number };
  handleClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("overflow-clip relative", className)}
      onClick={handleClick}
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
