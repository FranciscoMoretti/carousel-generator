import { useFieldArray, useFormContext } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { Textarea } from "@/components/ui/textarea";
import { MultiSlideSchema, SlideSchema } from "@/lib/validation/slide-schema";
import { DocumentSchema } from "@/lib/validation/document-schema";
import { usePagerContext } from "@/lib/providers/pager-context";
import { DocumentFormReturn } from "@/lib/document-form-types";

export function SlidesForm({ currentSlide }: { currentSlide: number }) {
  const form: DocumentFormReturn = useFormContext(); // retrieve those props

  const { control } = form;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "slides", // unique name for your Field Array
    }
  );

  const field = fields[currentSlide];

  return (
    <Form {...form}>
      <form>
        <div className="space-y-6 w-full" key={field.id}>
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
            name={`slides.${currentSlide}.description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Description for this slide"
                    className=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
