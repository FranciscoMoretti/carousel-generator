import { ColorSchema } from "@/lib/validation/theme-schema";
import * as z from "zod";

export type Colors = z.infer<typeof ColorSchema>;

type Pallette = {
  [fontFamilyName: string]: Colors;
};

export const pallettes: Pallette = {
  "pallette-1": {
    primary: "#b1e4cc",
    secondary: "#9ac141",
    background: "#202624",
  },
  "pallette-2": {
    primary: "#f2ede4",
    secondary: "#caaa63",
    background: "#1e1e1c",
  },
  "pallette-3": {
    primary: "#040200",
    secondary: "#2d3555",
    background: "#a85322",
  },
  "pallette-4": {
    primary: "#fbfffe",
    secondary: "#f6990d",
    background: "#871a1d",
  },
  "pallette-5": {
    primary: "#3bec47",
    secondary: "#dcd6dd",
    background: "#373754",
  },
  "pallette-6": {
    primary: "#b21826",
    secondary: "#2b2827",
    background: "#fefffe",
  },
};
