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

export function ImageFormField({
  currentSlide,
  form,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
}) {
  return (
    <>
      <FormField
        control={form.control}
        name={`slides.${currentSlide}.backgroundImage`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL</FormLabel>
            <FormControl>
              <Input
                placeholder="Url to an image"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`slides.${currentSlide}.backgroundImage`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Upload an image</FormLabel>
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
                    const dataUrl = await convertFileToDataUrl(compressedFile);
                    field.onChange(dataUrl ? dataUrl : null);
                  } else {
                    console.error("No valid image file selected.");
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
