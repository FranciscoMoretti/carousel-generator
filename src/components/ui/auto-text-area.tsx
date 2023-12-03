"use client";

import TextareaAutosize from "react-textarea-autosize";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
type InputTitleProps = {
  title?: string;
  placeholder?: string;
};

const AutoTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* @ts-ignore Style works ok */}
        <TextareaAutosize
          // TODO: Auto text area includes some kind of margin or letter spacing, specially on the bottom
          className={cn(
            "w-full rounded-md outline outline-transparent hover:outline-input outline-2 bg-transparent text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden resize-none p-0",
            className
          )}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

AutoTextarea.displayName = "Textarea";

export { AutoTextarea };
