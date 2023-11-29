export function getStyleSibling(field: string): string {
  return field.split(".").slice(0, -1).join(".") + ".style";
}

export function getSlideNumber(field: string): number {
  if (!field.startsWith("slides")) {
    throw Error("Getting slide number of field without slides");
  }
  return Number(field.split(".").slice(1, 2));
}
