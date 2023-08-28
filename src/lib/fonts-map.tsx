type FontVariants = {
  regular: string;
  bold?: string;
};

type FontMap = {
  [fontFamilyName: string]: FontVariants;
};

export const fontsMap: FontMap = {
  DM_Sans: {
    regular: "public/fonts/DM_Sans/DMSans-Regular.ttf",
    bold: "public/fonts/DM_Sans/DMSans-Bold.ttf",
  },
  DM_Serif_Display: {
    regular: "/fonts/DM_Serif_Display/DMSerifDisplay-Regular.ttf",
  },
  PT_Serif: {
    regular: "/fonts/PT_Serif/PTSerif-Regular.ttf",
    bold: "/fonts/PT_Serif/PTSerif-Bold.ttf",
  },
  Roboto: {
    regular: "/fonts/Roboto/Roboto-Regular.ttf",
    bold: "/fonts/Roboto/Roboto-Bold.ttf",
  },
  Roboto_Condensed: {
    regular: "/fonts/Roboto_Condensed/RobotoCondensed-Regular.ttf",
    bold: "/fonts/Roboto_Condensed/RobotoCondensed-Bold.ttf",
  },
  Ultra: {
    regular: "/fonts/Ultra/Ultra-Regular.ttf",
  },
};
