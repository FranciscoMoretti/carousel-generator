import Pager from "@/components/pager";
import { useFormContext } from "react-hook-form";

import { DocumentSchema } from "@/lib/validation/document-schema";
import { Button } from "./ui/button";
import { DocumentFormReturn } from "@/lib/document-form-types";

export function EditorMenubar({ handlePrint }: { handlePrint: () => void }) {
  const { reset }: DocumentFormReturn = useFormContext(); // retrieve those props

  return (
    <div className="ml-auto flex w-full gap-2 sm:justify-between">
      {/* <PresetSelector presets={presets} /> */}
      {/* <PresetSave /> */}
      {/* <div className="hidden space-x-2 md:flex">
        <CodeViewer />
        <PresetShare />
      </div> */}
      {/* <PresetActions /> */}
      <Pager />
      <div className="flex flex-row gap-2">
        <Button onClick={() => reset()} variant="outline" size="sm">
          Reset
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrint}>
          Download
        </Button>
      </div>
    </div>
  );
}
