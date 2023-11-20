import React from "react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { ObjectFitType, ImageSchema } from "@/lib/validation/image-schema";

export function ContentImage({
  image,
}: {
  image: z.infer<typeof ImageSchema>;
}) {
  if (!image.source.src) {
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full h-40">
      {/* // TODO: Extract to component */}
      <img
        alt="slide image"
        src={image.source.src} // TODO: Extract cover/contain into a setting for images
        className={cn(
          // shadow-md or any box shadow not supported by html2canvas
          "rounded-md overflow-hidden",
          image.style.objectFit == ObjectFitType.enum.Cover
            ? "object-cover w-full"
            : image.style.objectFit == ObjectFitType.enum.Contain
            ? "object-contain"
            : ""
        )}
      />
    </div>
  );
}
