import React from "react";
import * as z from "zod";
import { ConfigSchema, DocumentSchema } from "@/lib/validation/document-schema";
import { Footer } from "./react-footer";
import { cn } from "@/lib/utils";
import { fontIdToClassName } from "@/lib/fonts-map";
import { OutroSlideSchema, SlideType } from "@/lib/validation/slide-schema";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ghost, Plus, X } from "lucide-react";
import { NewSlideDialogContent } from "./new-page-dialog-content";

export function NewPage({
  size,
  className,
  handleAddPage,
}: {
  size: { width: number; height: number };
  className?: string;
  handleAddPage: (pageType: SlideType) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="border-dashed border-2"
          variant={"outline"}
          style={{
            width: `${size.width}px`,
            height: `${size.height}px`,
            minWidth: `${size.width}px`,
            minHeight: `${size.height}px`,
          }}
        >
          <div className={`flex flex-col justify-center items-center`}>
            <Plus />
          </div>
        </Button>
      </DialogTrigger>
      <NewSlideDialogContent handleAddPage={handleAddPage} />
    </Dialog>
  );
}
