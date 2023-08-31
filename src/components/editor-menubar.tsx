import Pager from "@/components/pager";
import { useFormContext } from "react-hook-form";

import { DocumentSchema } from "@/lib/validation/document-schema";
import { Button } from "./ui/button";
import { DocumentFormReturn } from "@/lib/document-form-types";

export function EditorMenubar() {
  const { reset }: DocumentFormReturn = useFormContext(); // retrieve those props

  return (
    <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
      <h2 className="text-lg font-semibold">Canvas</h2>{" "}
      <div className="ml-auto flex w-full space-x-2 sm:justify-end">
        {/* <PresetSelector presets={presets} /> */}
        {/* <PresetSave /> */}
        <div className="hidden space-x-2 md:flex">
          {/* <CodeViewer /> */}
          {/* <PresetShare /> */}
        </div>
        {/* <PresetActions /> */}
        <Pager />
        <Button onClick={() => reset()} variant="outline" size="sm">
          Reset
        </Button>
      </div>
    </div>
  );
}
