import * as z from "zod";

export const ElementType = z.enum([
  "Title",
  "Subtitle",
  "Description",
  "Image",
  "ContentImage",
]);
export type ElementType = z.infer<typeof ElementType>;
