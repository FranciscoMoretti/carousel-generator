import Pager from "@/components/pager";
import { useFormContext } from "react-hook-form";

import { Button } from "./ui/button";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { Loader2Icon } from "lucide-react";
import React from "react";
import { JsonExporter } from "./json-exporter";
import { JsonImporter } from "./json-importer";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

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
      <div className="flex flex-row gap-2 ">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <JsonExporter
                values={watch("config")}
                filename={"carousel-config.json"}
              >
                <MenubarItem>Export Config</MenubarItem>
              </JsonExporter>
              <JsonExporter
                values={watch("slides")}
                filename={"carousel-content.json"}
              >
                <MenubarItem>Export Content</MenubarItem>
              </JsonExporter>
              <MenubarSeparator />
              <MenubarItem onClick={() => reset()}>
                {/* TODO: This should have a confirmation alert dialog */}
                Reset
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        <Button variant="outline" onClick={handlePrint}>
          <div className="flex flex-row gap-1 items-center">
            <span>Download</span>
            {isPrinting && <Loader2Icon className="w-4 h-4 animate-spin" />}
          </div>
        </Button>
        {/* TODO extract config importer into components to be able to use them fro content too */}

        <JsonImporter fields="config" />
        <JsonImporter fields="slides" />
      </div>
      <Pager />
    </div>
  );
}
