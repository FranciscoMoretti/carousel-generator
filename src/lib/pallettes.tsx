import { generateForegroundColorFrom } from "@/lib/theme-utils";
import themes, { Theme } from "@/lib/themes";
import { ColorSchema } from "@/lib/validation/theme-schema";
import { formatHex, parse } from "culori";
import * as z from "zod";

export type Colors = z.infer<typeof ColorSchema>;

type Pallette = {
  [colorName: string]: Colors;
};
export const pallettes: Pallette = Object.entries(themes).reduce<
  Record<string, Colors>
>((acc, [themeName, theme]) => {
  acc[themeName] = ThemeToColors(theme);
  return acc;
}, {});

function ThemeToColors(theme: Theme): {
  primary: string;
  secondary: string;
  background: string;
} {
  return {
    // Simplification of Daisy UI color scheme
    primary:
      (theme["primary"] && formatHex(parse(theme["primary"]))) ||
      generateForegroundColorFrom(theme.primary),
    secondary: generateForegroundColorFrom(theme["base-100"]),
    background: formatHex(parse(theme["base-100"])) || theme["base-100"],
  };
}
