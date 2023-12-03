import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { getSlideNumber } from "@/lib/field-path";
import { useFormContext } from "react-hook-form";
import { NewElementDialogContent } from "@/components/new-element-dialog-content";
import {
  DocumentFormReturn,
  ElementArrayFieldPath,
} from "@/lib/document-form-types";

export function AddElement({
  className,
  fieldName,
}: {
  className?: string;
  fieldName: ElementArrayFieldPath;
}) {
  const pageNumber = getSlideNumber(fieldName);
  const form: DocumentFormReturn = useFormContext();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          id={"add-element-" + pageNumber}
          className="border-dashed border-2 w-full bg-transparent h-10"
          variant={"outline"}
        >
          <div className={`flex flex-col justify-center items-center`}>
            <Plus className="w-6 h-6" />
          </div>
        </Button>
      </DialogTrigger>
      <NewElementDialogContent form={form} fieldName={fieldName} />
    </Dialog>
  );
}
