/* eslint-disable @next/next/no-img-element */
import React from "react";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { ImageSchema } from "@/lib/validation/image-schema";

export function BackgroundImageLayer({
  image,
  className = "",
}: {
  image: z.infer<typeof ImageSchema>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-full absolute top-0 left-0 right-0 bottom-0",
        className
      )}
    >
      <img
        alt="background image"
        src={image.source.src} // TODO: Extract cover/contain into a setting for images
        className={cn("overflow-hidden object-cover w-full h-full")}
        style={{
          opacity: image.style.opacity / 100,
        }}
      />
    </div>
  );
}
