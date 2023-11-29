import { TextInputFormField } from "@/components/forms/fields/text-input-form-field";
import { TextStyleFormFields } from "@/components/forms/fields/text-style-form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { useSelectionContext } from "@/lib/providers/selection-context";
import { getStyleSibling } from "../lib/field-path";

export function StyleMenu({ form }: { form: DocumentFormReturn }) {
  const { currentSelection } = useSelectionContext();

  console.log(currentSelection);
  return (
    <Popover open={true}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-60"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Style</h4>
            <p className="text-sm text-muted-foreground">
              Set the selected element style.
            </p>
          </div>
          {currentSelection ? (
            <TextStyleFormFields
              key={currentSelection} // Necessary to update the component based on field change
              form={form}
              fieldName={getStyleSibling(currentSelection)}
              className="flex flex-row"
            ></TextStyleFormFields>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
}
