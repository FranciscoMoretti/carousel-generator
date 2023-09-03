import * as z from "zod";

export const PageNumberSchema = z.object({
  showNumbers: z.boolean(),
});
