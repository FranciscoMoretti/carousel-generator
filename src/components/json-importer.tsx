import { DocumentFormReturn } from "@/lib/document-form-types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { ConfigSchema } from "@/lib/validation/document-schema";
import { MultiSlideSchema } from "@/lib/validation/slide-schema";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      if (fileReader) {
        fileReader.readAsText(e.target.files[0]);
      }
    }
  };

  return (
    <Input
      type="file"
      accept="application/JSON"
      multiple={false}
      onChange={handleFileChange}
    />
  );
}
