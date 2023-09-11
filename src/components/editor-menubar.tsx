import Pager from "@/components/pager";
import { useFormContext } from "react-hook-form";

import { Button } from "./ui/button";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { JsonExporter } from "./json-exporter";
import { JsonImporter } from "./json-importer";

export function EditorMenubar({
  handlePrint,
  isPrinting,
}: {
  handlePrint: () => void;
  isPrinting: boolean;
}) {
  const { reset, watch }: DocumentFormReturn = useFormContext(); // retrieve those props

  // TODO: Show filename form in menubar
  // TODO: Move import/export to menubar File menu
  // TODO: Refactor import/export
  return (
    <div className="ml-auto flex w-full gap-2 items-center flex-col-reverse md:flex-row lg:justify-between md:justify-center px-6 flex-wrap">
      {/* <PresetSelector presets={presets} /> */}
      {/* <PresetSave /> */}
      {/* <div className="hidden space-x-2 md:flex">
        <CodeViewer />
        <PresetShare />
      </div> */}
      {/* <PresetActions /> */}
      <Pager />
      <div className="flex flex-row gap-2 ">
        <Button onClick={() => reset()} variant="outline" size="sm">
          Reset
        </Button>
        {/* TODO extract config importerinto components to be able to use them fro content too */}
        <JsonExporter
          values={watch("config")}
          filename={"carousel-config.json"}
        >
          <Button variant="outline" size="sm">
            Export Config
          </Button>
        </JsonExporter>
        <JsonExporter
          values={watch("slides")}
          filename={"carousel-content.json"}
        >
          <Button variant="outline" size="sm">
            Export Content
          </Button>
        </JsonExporter>

        <JsonImporter fields="config" />
        <JsonImporter fields="slides" />

        <Button variant="outline" size="sm" onClick={handlePrint}>
          <div className="flex flex-row gap-1 items-center">
            <span>Download</span>
            {isPrinting && <Loader2Icon className="w-4 h-4 animate-spin" />}
          </div>
        </Button>
      </div>
    </div>
  );
}
