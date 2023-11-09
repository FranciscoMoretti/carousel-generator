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

type ImageFormType = "backgroundImage" | "image";

export function ImageFormField({
  currentSlide,
  form,
  type,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
  type: ImageFormType;
}) {
  return (
    <FormField
      control={form.control}
      name={`slides.${currentSlide}.${type}`}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {type == "backgroundImage" ? "Image Background" : "Image"}
          </FormLabel>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">URL</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="url">
              <FormControl>
                <Input
                  placeholder="Url to an image"
                  className="resize-none"
                  {...field}
                  // TODO: COnsider a more robust way of finding if it's an URL
                  value={field.value?.startsWith("http") ? field.value : ""}
                />
              </FormControl>
              <FormMessage />
            </TabsContent>
            <TabsContent value="upload">
              <FormControl>
                <Input
                  accept=".jpg, .jpeg, .png, .svg, .webp"
                  type="file"
                  onChange={async (e) => {
                    console.log(e);
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
                      field.onChange(dataUrl ? dataUrl : null);
                    } else {
                      console.error("No valid image file selected.");
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </TabsContent>
          </Tabs>{" "}
        </FormItem>
      )}
    />
  );
}
