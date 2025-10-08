import * as z from "zod";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { DEFAULT_IMAGE_INPUT } from "@/lib/validation/image-schema";

/**
 * Brand Template - Complete configuration for consistent branding
 */
export type BrandTemplate = z.infer<typeof ConfigSchema>;

/**
 * Predefined brand templates for quick setup
 */
export const BRAND_TEMPLATES: Record<string, BrandTemplate> = {
  professional: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,
      name: "Professional",
      handle: "@professional",
    },
    theme: {
      isCustom: false,
      pallette: "corporate",
      primary: "#1C4E80",
      secondary: "#7C909A",
      background: "#ffffff",
    },
    fonts: {
      font1: "Inter",
      font2: "Inter",
    },
    pageNumber: {
      showNumbers: true,
    },
  },

  creative: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,
      name: "Creative",
      handle: "@creative",
    },
    theme: {
      isCustom: false,
      pallette: "synthwave",
      primary: "#e779c1",
      secondary: "#58c7f3",
      background: "#1a103d",
    },
    fonts: {
      font1: "DM_Serif_Display",
      font2: "DM_Sans",
    },
    pageNumber: {
      showNumbers: true,
    },
  },

  minimal: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,
      name: "Minimal",
      handle: "@minimal",
    },
    theme: {
      isCustom: false,
      pallette: "lofi",
      primary: "#0D0D0D",
      secondary: "#1A1919",
      background: "#ffffff",
    },
    fonts: {
      font1: "Inter",
      font2: "Inter",
    },
    pageNumber: {
      showNumbers: false,
    },
  },

  vibrant: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,
      name: "Vibrant",
      handle: "@vibrant",
    },
    theme: {
      isCustom: false,
      pallette: "cyberpunk",
      primary: "#ff00aa",
      secondary: "#00ffff",
      background: "#fff75e",
    },
    fonts: {
      font1: "DM_Serif_Display",
      font2: "Space_Grotesk",
    },
    pageNumber: {
      showNumbers: true,
    },
  },

  elegant: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,
      name: "Elegant",
      handle: "@elegant",
    },
    theme: {
      isCustom: false,
      pallette: "luxury",
      primary: "#ffffff",
      secondary: "#152747",
      background: "#09090b",
    },
    fonts: {
      font1: "Playfair_Display",
      font2: "Lato",
    },
    pageNumber: {
      showNumbers: true,
    },
  },

  nature: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,
      name: "Nature",
      handle: "@nature",
    },
    theme: {
      isCustom: false,
      pallette: "forest",
      primary: "#1eb854",
      secondary: "#1DB88E",
      background: "#171212",
    },
    fonts: {
      font1: "Merriweather",
      font2: "Open_Sans",
    },
    pageNumber: {
      showNumbers: true,
    },
  },

  tech: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,
      name: "Tech",
      handle: "@tech",
    },
    theme: {
      isCustom: false,
      pallette: "night",
      primary: "#38bdf8",
      secondary: "#818CF8",
      background: "#0F172A",
    },
    fonts: {
      font1: "Space_Mono",
      font2: "Roboto",
    },
    pageNumber: {
      showNumbers: true,
    },
  },

  warm: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,
      name: "Warm",
      handle: "@warm",
    },
    theme: {
      isCustom: false,
      pallette: "sunset",
      primary: "#FF865B",
      secondary: "#FD6F9C",
      background: "#1a1520",
    },
    fonts: {
      font1: "DM_Serif_Display",
      font2: "DM_Sans",
    },
    pageNumber: {
      showNumbers: true,
    },
  },

  aiCursor: {
    brand: {
      avatar: DEFAULT_IMAGE_INPUT,
      name: "AI Cursor",
      handle: "@aicursor",
    },
    theme: {
      isCustom: false,
      pallette: "night",
      primary: "#ffffff",
      secondary: "#94a3b8",
      background: "#0f0f0f",
    },
    fonts: {
      font1: "Inter",
      font2: "Inter",
    },
    pageNumber: {
      showNumbers: true,
    },
  },
};

/**
 * Get list of available template names
 */
export function getBrandTemplateNames(): string[] {
  return Object.keys(BRAND_TEMPLATES);
}

/**
 * Get a brand template by name
 */
export function getBrandTemplate(name: string): BrandTemplate | null {
  return BRAND_TEMPLATES[name] || null;
}

/**
 * Save custom brand template to localStorage
 */
export function saveCustomBrandTemplate(name: string, config: BrandTemplate): void {
  try {
    const customTemplates = getCustomBrandTemplates();
    customTemplates[name] = config;
    localStorage.setItem("custom-brand-templates", JSON.stringify(customTemplates));
  } catch (error) {
    console.error("Failed to save brand template:", error);
  }
}

/**
 * Get all custom brand templates from localStorage
 */
export function getCustomBrandTemplates(): Record<string, BrandTemplate> {
  try {
    const stored = localStorage.getItem("custom-brand-templates");
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load custom brand templates:", error);
  }
  return {};
}

/**
 * Delete a custom brand template
 */
export function deleteCustomBrandTemplate(name: string): void {
  try {
    const customTemplates = getCustomBrandTemplates();
    delete customTemplates[name];
    localStorage.setItem("custom-brand-templates", JSON.stringify(customTemplates));
  } catch (error) {
    console.error("Failed to delete brand template:", error);
  }
}

/**
 * Get all templates (built-in + custom)
 */
export function getAllBrandTemplates(): Record<string, BrandTemplate> {
  return {
    ...BRAND_TEMPLATES,
    ...getCustomBrandTemplates(),
  };
}

/**
 * Export brand template as JSON
 */
export function exportBrandTemplate(config: BrandTemplate): string {
  return JSON.stringify(config, null, 2);
}

/**
 * Import brand template from JSON
 */
export function importBrandTemplate(jsonString: string): BrandTemplate | null {
  try {
    const parsed = JSON.parse(jsonString);
    const result = ConfigSchema.safeParse(parsed);
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.error("Failed to import brand template:", error);
  }
  return null;
}
