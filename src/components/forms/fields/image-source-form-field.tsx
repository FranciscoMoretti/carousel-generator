import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { convertFileToDataUrl } from "@/lib/convert-file";
import {
  DocumentFormReturn,
  ImageSourceFieldPath,
} from "@/lib/document-form-types";
import imageCompression from "browser-image-compression";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ImageInputType } from "@/lib/validation/image-schema";
import { useEffect, useState } from "react";

export const MAX_IMAGE_SIZE_MB = 0.5; // Set your maximum image size limit in megabytes
export const MAX_IMAGE_WIDTH = 800; // Set your maximum image width

export function ImageSourceFormField({
  fieldName,
  form,
}: {
  fieldName: ImageSourceFieldPath;
  form: DocumentFormReturn;
}) {
  const [tabValue, setTabValue] = useState("");

  const imageType = form.getValues(`${fieldName}.type`);
  useEffect(() => {
    // Use effect is needed to have consistent rendering of same defaults state on server and client. Then the client sets its tab selection
    setTabValue(imageType);
  }, [imageType]);

  return (
    <Tabs
      onValueChange={(tabValue) => {
        form.setValue(fieldName, { type: tabValue as ImageInputType, src: "" });
        setTabValue(tabValue);
      }}
      value={tabValue}
      defaultValue={tabValue}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={ImageInputType.Url}>URL</TabsTrigger>
        <TabsTrigger value={ImageInputType.Upload}>Upload</TabsTrigger>
      </TabsList>
      <TabsContent value={ImageInputType.Url}>
        <FormField
          control={form.control}
          name={`${fieldName}.src`}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{""}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Url to an image"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </TabsContent>
      <TabsContent value={ImageInputType.Upload}>
        <FormField
          control={form.control}
          name={`${fieldName}.src`}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>{""}</FormLabel>
                <FormControl>
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
                        field.onChange(dataUrl ? dataUrl : "");
                      } else {
                        console.error("No valid image file selected.");
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </TabsContent>
    </Tabs>
  );
}
