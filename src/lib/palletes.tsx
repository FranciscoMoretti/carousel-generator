import { ColorSchema } from "@/lib/validation/theme-schema";
import * as z from "zod";

type Colors = z.infer<typeof ColorSchema>;

type Pallete = {
  [fontFamilyName: string]: Colors;
};

export const palletes: Pallete = {
  "huemint-1": {
    primary: "#b1e4cc",
    secondary: "#9ac141",
    background: "#202624",
  },
  "huemint-2": {
    primary: "#f2ede4",
    secondary: "#caaa63",
    background: "#1e1e1c",
  },
};
