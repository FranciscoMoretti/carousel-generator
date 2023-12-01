export function getStyleSibling(field: string): string {
  return getParent(field) + ".style";
}

export function getSlideNumber(field: string): number {
  if (!field.startsWith("slides")) {
    throw Error("Getting slide number of field without slides");
  }
  return Number(field.split(".").slice(1, 2));
}

export function getElementNumber(field: string): number {
  if (!field.startsWith("slides")) {
    throw Error("Getting slide number of field without slides");
  }
  return Number(field.split(".").slice(3, 4));
}

export function getParent(field: string): string {
  return field.split(".").slice(0, -1).join(".");
}
