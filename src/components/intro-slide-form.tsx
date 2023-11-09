import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { ImageFormField } from "./image-form-field";

export const MAX_IMAGE_SIZE_MB = 0.5; // Set your maximum image size limit in megabytes
export const MAX_IMAGE_WIDTH = 800; // Set your maximum image width

export function IntroSlideForm({
  currentSlide,
  form,
}: {
  currentSlide: number;
  form: DocumentFormReturn;
}) {
  // TODO: Validate fields with zod on change (e.g. Max character)
  return (
    <div className="space-y-6 w-full">
      <FormField
        control={form.control}
        name={`slides.${currentSlide}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder="Your super cool title"
                className=""
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`slides.${currentSlide}.subtitle`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtitle</FormLabel>
            <FormControl>
              <Input
                placeholder="Subtitle for more clarity"
                className=""
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`slides.${currentSlide}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us a little bit about yourself"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <ImageFormField currentSlide={currentSlide} form={form}></ImageFormField>
    </div>
  );
}
