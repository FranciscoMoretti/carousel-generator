/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
  ObjectFitType,
  ImageSchema,
  ContentImageSchema,
} from "@/lib/validation/image-schema";

export function ContentImage({
  image,
  className,
}: {
  image: z.infer<typeof ContentImageSchema>;
  className?: string;
}) {
  if (!image.source.src) {
    return null;
  }

  return (
    <div className={cn("flex flex-col h-full w-full", className)}>
      {/* // TODO: Extract to component */}
      <img
        alt="slide image"
        src={image.source.src} // TODO: Extract cover/contain into a setting for images
        className={cn(
          // shadow-md or any box shadow not supported by html2canvas
          "rounded-md overflow-hidden",
          image.style.objectFit == ObjectFitType.enum.Cover
            ? "object-cover w-full h-full"
            : image.style.objectFit == ObjectFitType.enum.Contain
            ? "object-contain w-fit h-fit"
            : ""
        )}
        style={{
          opacity: image.style.opacity / 100,
        }}
      />
    </div>
  );
}
