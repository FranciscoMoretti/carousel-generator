"use client";
import * as React from "react";
import { Colors } from "@/lib/pallettes";

export function ColorThemeDisplay({ colors }: { colors: Colors }) {
  return (
    <div className="flex flew-row rounded border border-muted overflow-clip">
      <span
        className="h-4 w-4"
        style={{
          backgroundColor: colors.primary,
        }}
      ></span>
      <span
        className="h-4 w-4"
        style={{
          backgroundColor: colors.secondary,
        }}
      ></span>
      <span
        className="h-4 w-4"
        style={{
          backgroundColor: colors.background,
        }}
      ></span>
    </div>
  );
}
