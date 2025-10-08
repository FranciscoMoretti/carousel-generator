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
  GeistSans: {
    className: "font-geist-sans",
    name: "Geist Sans",
  },
  Montserrat: {
    className: "font-montserrat",
    name: "Montserrat",
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
  Inter: {
    className: "font-inter",
    name: "Inter",
  },
  Syne: {
    className: "font-syne",
    name: "Syne",
  },
  ArchivoBlack: {
    className: "font-archivo-black",
    name: "Archivo Black",
  },
  Space_Grotesk: {
    className: "font-space-grotesk",
    name: "Space Grotesk",
  },
  Playfair_Display: {
    className: "font-playfair-display",
    name: "Playfair Display",
  },
  Lato: {
    className: "font-lato",
    name: "Lato",
  },
  Merriweather: {
    className: "font-merriweather",
    name: "Merriweather",
  },
  Open_Sans: {
    className: "font-open-sans",
    name: "Open Sans",
  },
  Space_Mono: {
    className: "font-space-mono",
    name: "Space Mono",
  },
  Poppins: {
    className: "font-poppins",
    name: "Poppins",
  },
  Manrope: {
    className: "font-manrope",
    name: "Manrope",
  },
  Bebas_Neue: {
    className: "font-bebas-neue",
    name: "Bebas Neue",
  },
};

export function fontIdToClassName(fontId: string) {
  // Safety check: return default if font not found
  if (!fontsMap[fontId]) {
    console.warn(`Font "${fontId}" not found in fontsMap, using DM_Sans as fallback`);
    return fontsMap.DM_Sans.className;
  }
  return fontsMap[fontId].className;
}
