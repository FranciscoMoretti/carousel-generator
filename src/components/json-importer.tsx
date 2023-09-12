import { DocumentFormReturn } from "@/lib/document-form-types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { MultiSlideSchema } from "@/lib/validation/slide-schema";
import FileInputForm from "./file-input-form";

export function JsonImporter({
  fields,
  children,
}: {
  fields: "config" | "slides";
  children?: React.ReactNode;
}) {
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
      if (fields == "config") {
        const parsedValues = ConfigSchema.parse(result);
        if (parsedValues) {
          setValue("config", parsedValues);
        }
      } else if (fields == "slides") {
        const parsedValues = MultiSlideSchema.parse(result);
        if (parsedValues) {
          setValue("slides", parsedValues);
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
  };
  // TODO: Make this component more generic by splitting dependencies of config and slides

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <FileInputForm
        handleSubmit={handleFileSubmission}
        label={"Input File"}
        description="Select a json file to load"
      />
    </div>
  );
}
