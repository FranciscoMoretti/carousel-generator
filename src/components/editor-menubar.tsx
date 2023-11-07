import { useFormContext } from "react-hook-form";

import { DocumentFormReturn } from "@/lib/document-form-types";
import { Loader2Icon } from "lucide-react";
import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FileInputForm from "./file-input-form";
import { useFieldsFileImporter } from "@/lib/hooks/use-fields-file-importer";

export function EditorMenubar({}: {}) {
  const { reset, watch }: DocumentFormReturn = useFormContext(); // retrieve those props
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const { handleFileSubmission: handleConfigFileSubmission } =
    useFieldsFileImporter("config");
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);

  const { handleFileSubmission: handleContentFileSubmission } =
    useFieldsFileImporter("slides");

  return (
    // TODO: Add Here FilenameForm, download and help
    <div className="flex items-center flex-row gap-2">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <JsonExporter
              values={watch("config")}
              filename={"carousel-settings.json"}
            >
              <MenubarItem>Export Settings</MenubarItem>
            </JsonExporter>
            <Dialog
              open={isConfigDialogOpen}
              onOpenChange={setIsConfigDialogOpen}
            >
              <DialogTrigger asChild>
                <MenubarItem onSelect={(e) => e.preventDefault()}>
                  Import Settings
                </MenubarItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Load a file with Settings</DialogTitle>
                </DialogHeader>

                <FileInputForm
                  handleSubmit={(files) => {
                    handleConfigFileSubmission(files);
                    setIsConfigDialogOpen(false);
                  }}
                  label={"Settings File"}
                  description="Select a json file to load"
                />
              </DialogContent>
            </Dialog>
            <MenubarSeparator />
            <JsonExporter
              values={watch("slides")}
              filename={"carousel-content.json"}
            >
              <MenubarItem>Export Content</MenubarItem>
            </JsonExporter>
            <Dialog
              open={isContentDialogOpen}
              onOpenChange={setIsContentDialogOpen}
            >
              <DialogTrigger asChild>
                <MenubarItem onSelect={(e) => e.preventDefault()}>
                  Import Content
                </MenubarItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Load a file with content</DialogTitle>
                </DialogHeader>

                <FileInputForm
                  handleSubmit={(files) => {
                    handleContentFileSubmission(files);
                    setIsContentDialogOpen(false);
                  }}
                  label={"Content File"}
                  description="Select a json file to load"
                />
              </DialogContent>
            </Dialog>

            <MenubarSeparator />

            <MenubarItem onClick={() => reset()}>
              {/* TODO: This should have a confirmation alert dialog */}
              Reset to defaults
            </MenubarItem>
            {/* <MenubarSeparator /> */}
            {/* <MenubarItem>Print</MenubarItem> */}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
