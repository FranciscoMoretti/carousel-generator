export type PageSize = {
  width: number;
  height: number;
};

export type PageSizePreset = {
  label: string;
  size: PageSize;
};

export const PAGE_SIZE_PRESETS: PageSizePreset[] = [
  { label: "인스타 정사각 (1:1)", size: { width: 400, height: 400 } },
  { label: "인스타 세로 (4:5)", size: { width: 400, height: 500 } },
  { label: "스토리 (9:16)", size: { width: 400, height: 711 } },
];

export const EXPORT_SCALES: Record<string, number> = {
  "1x": 1,
  "2x": 2,
  "3x (1080p)": 2.7,
};

// Default: Instagram 4:5 (same as original)
export const SIZE: PageSize = PAGE_SIZE_PRESETS[1].size;
