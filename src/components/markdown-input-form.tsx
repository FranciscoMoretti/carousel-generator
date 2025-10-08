"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { FileText, Sparkles, Upload } from "lucide-react";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { useState, useRef, useEffect } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useKeysContext } from "@/lib/providers/keys-context";
import { useStatusContext } from "@/lib/providers/editor-status-context";
import { generateCarouselFromMarkdownAction, generateCarouselFromMarkdownDirectAction } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { countMarkdownSlides } from "@/lib/markdown-parser";

const FormSchema = z.object({
  markdown: z.string().min(10, {
    message: "Markdown content must be at least 10 characters.",
  }),
});

export function MarkdownInputForm() {
  const { apiKey } = useKeysContext();
  const { setValue }: DocumentFormReturn = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { status, setStatus } = useStatusContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [slideCount, setSlideCount] = useState<number | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      markdown: "",
    },
  });

  const watchMarkdown = form.watch("markdown");

  // Update slide count when markdown changes
  useEffect(() => {
    if (watchMarkdown && watchMarkdown.length > 10) {
      const count = countMarkdownSlides(watchMarkdown);
      setSlideCount(count);
    } else {
      setSlideCount(null);
    }
  }, [watchMarkdown]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setStatus("loading");

    // Always use direct conversion (no API key required)
    const generatedSlides = await generateCarouselFromMarkdownDirectAction(
      data.markdown
    );

    if (generatedSlides && generatedSlides.length > 0) {
      setValue("slides", generatedSlides);
      toast({
        title: "Carousel generated from markdown!",
        description: `Created ${generatedSlides.length} slides`,
      });
    } else {
      toast({
        title: "Failed to generate carousel",
        description: "Please check your markdown format and try again",
        variant: "destructive",
      });
    }
    setStatus("ready");
    setIsLoading(false);
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".md") && !file.name.endsWith(".txt")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .md or .txt file",
      });
      return;
    }

    try {
      const text = await file.text();
      form.setValue("markdown", text);
      toast({
        title: "File loaded",
        description: `Loaded ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Failed to read file",
        description: "Please try again",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-2xl w-full m-auto space-y-4"
      >
        <FormField
          control={form.control}
          name="markdown"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Paste your markdown content
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`# My Awesome Topic

## Introduction
This is the intro slide...

## Key Point 1
- Important detail
- Another detail

## Key Point 2
More content here...

## Conclusion
Final thoughts...`}
                  className="min-h-[200px] font-mono text-sm"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {slideCount !== null && (
                  <span className="text-primary font-medium">
                    📊 Will generate approximately {slideCount} slides
                  </span>
                )}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
          <Button
            type="button"
            variant="outline"
            className="flex-1 w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload .md file
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.txt"
            className="hidden"
            onChange={handleFileUpload}
          />

          <Button
            type="submit"
            className="flex-1 w-full"
            disabled={isLoading || !watchMarkdown || watchMarkdown.length < 10}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <span className="flex flex-row gap-1.5 items-center">
                <Sparkles className="w-4 h-4" /> Generate Carousel
              </span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
