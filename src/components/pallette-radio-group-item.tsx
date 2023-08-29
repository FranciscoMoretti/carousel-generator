"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

import { cn } from "@/lib/utils";

import { Colors } from "@/lib/pallettes";

export function ColorsDisplay({ colors }: { colors: Colors }) {
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

export const ColorsRadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "border-2 p-0.5 text-primary disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:border-muted data-[state=checked]:border-foreground rounded",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        asChild
        className="flex items-center justify-center"
      ></RadioGroupPrimitive.Indicator>
      {children}
    </RadioGroupPrimitive.Item>
  );
});
ColorsRadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
