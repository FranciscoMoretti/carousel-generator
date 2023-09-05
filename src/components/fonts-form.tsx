import { useFormContext } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fontsMap } from "@/lib/fonts-map";
import { DocumentFormReturn } from "@/lib/document-form-types";

export function FontsForm({}: {}) {
  const form: DocumentFormReturn = useFormContext(); // retrieve those props

  return (
    <Form {...form}>
      <form className="space-y-6 w-full">
        <FormField
          control={form.control}
          name="config.fonts.font1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font 1</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary font" />
                  </SelectTrigger>
                </FormControl>
                <FontSelectContent />
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="config.fonts.font2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font 2</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a secondary font" />
                  </SelectTrigger>
                </FormControl>
                <FontSelectContent />
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function FontSelectContent() {
  return (
    <SelectContent>
      {Object.keys(fontsMap).map((fontId) => (
        <SelectItem key={fontId} value={fontId}>
          <p className={fontsMap[fontId].className}>{fontsMap[fontId].name}</p>
        </SelectItem>
      ))}
    </SelectContent>
  );
}
