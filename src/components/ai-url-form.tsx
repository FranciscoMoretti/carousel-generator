"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
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
import { Link, Sparkles } from "lucide-react";
import { DocumentFormReturn } from "@/lib/document-form-types";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useStatusContext } from "@/lib/providers/editor-status-context";
import { generateFromUrlAction } from "@/app/actions";

const FormSchema = z.object({
  url: z.string().url({
    message: "올바른 URL을 입력해주세요.",
  }),
});

export function AIUrlForm() {
  const { setValue }: DocumentFormReturn = useFormContext();
  const [isLoading, setIsLoading] = useState(false);
  const { setStatus } = useStatusContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setStatus("loading");

    const generatedSlides = await generateFromUrlAction(data.url);

    if (generatedSlides) {
      setValue("slides", generatedSlides);
      toast({
        title: "카드뉴스가 생성되었습니다",
      });
    } else {
      toast({
        title: "카드뉴스 생성에 실패했습니다",
        variant: "destructive",
      });
    }
    setStatus("ready");
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg w-full m-auto"
      >
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <div className="flex flex-row gap-2 items-center w-full">
                  <div className="relative flex-1">
                    <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="블로그 URL을 붙여넣으세요"
                      {...field}
                      className="pl-10"
                    />
                  </div>
                  <Button type="submit" className="flex-0">
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <span className="flex flex-row gap-1.5">
                        <Sparkles className="w-4 h-4" /> 생성
                      </span>
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
