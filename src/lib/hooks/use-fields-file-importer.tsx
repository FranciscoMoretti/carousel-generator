import { DocumentFormReturn } from "@/lib/document-form-types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { MultiSlideSchema } from "@/lib/validation/slide-schema";
import merge from "deepmerge";
import { getDefaultSlideOfType } from "@/lib/default-slides";

export function useFieldsFileImporter(field: "config" | "slides") {
  const { setValue }: DocumentFormReturn = useFormContext(); // retrieve those props
  const [fileReader, setFileReader] = useState<FileReader | null>(null);
  const [fileReaderIsConfigured, setFileReaderIsConfigured] = useState(false);

  useEffect(() => {
    setFileReader(new FileReader());
  }, []);

  if (fileReader && !fileReaderIsConfigured) {
    setFileReaderIsConfigured(true);
    fileReader.onload = function (e: ProgressEvent) {
      if (!e.target) {
        console.error("Failed to load file input");
        return;
      }

      // @ts-ignore file has result
      const result = JSON.parse(e.target.result);
      // Validate input and add to form
      if (field == "config") {
        const parsedValues = ConfigSchema.parse(result);
        if (parsedValues) {
          setValue(field, parsedValues);
        }
      } else if (field == "slides") {
        const parsedValues = MultiSlideSchema.parse(result);

        if (parsedValues) {
          console.log({ parsedValues });
          setValue(field, parsedValues);
        }
      } else {
        console.error("field provided is incorrect");
      }
    };
  }

  const handleFileSubmission = (files: FileList) => {
    if (files && files.length > 0) {
      if (fileReader) {
        fileReader.readAsText(files[0]);
      }
    }

    // setOpen(false);
  };
  return { handleFileSubmission };
}
