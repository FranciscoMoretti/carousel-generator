import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const UnstyledTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        {...props}
        className={cn(
          "flex w-full rounded-md outline outline-transparent hover:outline-input outline-2 bg-transparent text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-visible resize-none",
          className
        )}
        ref={ref}
        rows={1}
      />
    );
  }
);
UnstyledTextarea.displayName = "Textarea";

export { UnstyledTextarea };
