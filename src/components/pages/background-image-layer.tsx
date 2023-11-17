import React from "react";
import { cn } from "@/lib/utils";

export function BackgroundImageLayer({
  backgroundImageSrc,
  className = "",
}: {
  backgroundImageSrc: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-full absolute top-0 left-0 right-0 bottom-0 opacity-50",
        className
      )}
    >
      <img
        className="w-full h-full object-cover "
        src={backgroundImageSrc}
        alt="Background"
      />
    </div>
  );
}
