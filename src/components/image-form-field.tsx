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
import { ImageInputType } from "@/lib/validation/image-schema";

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
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>
              {formType == "backgroundImage" ? "Image Background" : "Image"}
            </FormLabel>
            <FormControl>
              <Tabs
                onValueChange={(tabValue) =>
                  field.onChange({ type: tabValue, src: "" })
                }
                defaultValue={field?.value?.type || ImageInputType.Url}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value={ImageInputType.Url}>URL</TabsTrigger>
                  <TabsTrigger value={ImageInputType.Upload}>
                    Upload
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={ImageInputType.Url}>
                  <Input
                    placeholder="Url to an image"
                    className="resize-none"
                    {...field}
                    onChange={(e) => {
                      field.onChange({
                        type: ImageInputType.Url,
                        src: e.target.value,
                      });
                    }}
                    value={
                      form.getValues(fieldName).type == ImageInputType.Url
                        ? form.getValues(fieldName).src
                        : ""
                    }
                  />
                  <FormMessage />
                </TabsContent>
                <TabsContent value={ImageInputType.Upload}>
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
                          type: ImageInputType.Upload,
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
        );
      }}
    />
  );
}
