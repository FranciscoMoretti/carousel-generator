type FontInfo = {
  name: string;
  className: string;
};

type FontMap = {
  [fontFamilyName: string]: FontInfo;
};

export const fontsMap: FontMap = {
  DM_Sans: {
    className: "font-dm-sans",
    name: "DM Sans",
  },
  DM_Serif_Display: {
    className: "font-dm-serif-display",
    name: "DM Serif Display",
  },
  PT_Serif: {
    className: "font-pt-serif",
    name: "PT Serif",
  },
  Roboto: {
    className: "font-roboto",
    name: "Roboto",
  },
  Roboto_Condensed: {
    className: "font-roboto-condensed",
    name: "Roboto Condensed",
  },
  Ultra: {
    className: "font-ultra",
    name: "Ultra",
  },
};
