import * as z from "zod";

export const FontsSchema = z.object({
  font1: z.string(),
  font2: z.string(),
});
