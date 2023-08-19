import * as z from "zod";

export const ThemeSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
});
