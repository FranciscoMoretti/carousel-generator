import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { convertFileToDataUrl } from "@/lib/convert-file";
import { DocumentFormReturn } from "@/lib/document-form-types";
import imageCompression from "browser-image-compression";
import { MAX_IMAGE_SIZE_MB, MAX_IMAGE_WIDTH } from "./intro-slide-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { z } from "zod";
import { FieldPath, FieldValues } from "react-hook-form";

type ImageFormType = "backgroundImage" | "image";

export function ImageFormField({
  fieldName,
  form,
  formType,
}: {
  fieldName:
    | `slides.${number}.image`
    | `slides.${number}.backgroundImage`
    | "config.brand.avatar";
  form: DocumentFormReturn;
  formType: ImageFormType;
}) {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {formType == "backgroundImage" ? "Image Background" : "Image"}
          </FormLabel>
          <FormControl>
            <Tabs
              onValueChange={(tabValue) =>
                field.onChange({ type: tabValue, src: "" })
              }
              defaultValue={field?.value?.type || "URL"}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="URL">URL</TabsTrigger>
                <TabsTrigger value="UPLOAD">Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="URL">
                <Input
                  placeholder="Url to an image"
                  className="resize-none"
                  {...field}
                  onChange={(e) => {
                    field.onChange({
                      type: "URL",
                      src: e.target.value,
                    });
                  }}
                  value={field.value?.type == "URL" ? field.value.src : ""}
                />
                <FormMessage />
              </TabsContent>
              <TabsContent value="UPLOAD">
                <Input
                  accept=".jpg, .jpeg, .png, .svg, .webp"
                  type="file"
                  onChange={async (e) => {
                    const file = e.target?.files ? e.target?.files[0] : null;

                    if (file) {
                      // Check image dimensions
                      // const image = new Image();
                      // image.src = URL.createObjectURL(file);
                      // await image.decode(); // Wait for image to load
                      // if (image.width > MAX_IMAGE_WIDTH) {
                      //   console.log(
                      //     `Image width exceeds the maximum limit of ${MAX_IMAGE_WIDTH} pixels.`
                      //   );
                      //   return;
                      // }
                      const compressedFile = await imageCompression(file, {
                        maxSizeMB: MAX_IMAGE_SIZE_MB,
                        maxWidthOrHeight: MAX_IMAGE_WIDTH,
                      });
                      const dataUrl = await convertFileToDataUrl(
                        compressedFile
                      );
                      field.onChange({
                        type: "UPLOAD",
                        src: dataUrl ? dataUrl : "",
                      });
                    } else {
                      console.error("No valid image file selected.");
                    }
                  }}
                />
                <FormMessage />
              </TabsContent>
            </Tabs>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
