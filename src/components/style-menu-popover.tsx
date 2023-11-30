import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { StyleMenu } from "@/components/style-menu";

export function StyleMenuPopover({ form }: { form: DocumentFormReturn }) {
  return (
    <Popover open={true}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <StyleMenu form={form}></StyleMenu>
      </PopoverContent>
    </Popover>
  );
}
