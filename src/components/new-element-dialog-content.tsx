import { Button } from "@/components/ui/button";
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
import {
  DocumentFormReturn,
  ElementArrayFieldPath,
} from "@/lib/document-form-types";
import { DEFAULT_CONTENT_IMAGE_INPUT } from "@/lib/validation/image-schema";
import {
  DescriptionSchema,
  SubtitleSchema,
  TitleSchema,
} from "@/lib/validation/text-schema";
import { Plus, X } from "lucide-react";
import { useFieldArray } from "react-hook-form";

export function NewElementDialogContent({
  form,
  fieldName,
}: {
  form: DocumentFormReturn;
  fieldName: ElementArrayFieldPath;
}) {
  const { control } = form;
  const { append, fields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: fieldName, // unique name for your Field Array
  });
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>New Element</DialogTitle>
        <DialogDescription>
          {"Select the type of slide to add."}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                append(TitleSchema.parse({}));
              }}
            >
              Title
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                append(SubtitleSchema.parse({}));
              }}
            >
              Subtitle
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                append(DescriptionSchema.parse({}));
              }}
            >
              Description
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                append({ ...DEFAULT_CONTENT_IMAGE_INPUT });
              }}
            >
              Image
            </Button>
          </DialogTrigger>
        </div>
      </div>
    </DialogContent>
  );
}
