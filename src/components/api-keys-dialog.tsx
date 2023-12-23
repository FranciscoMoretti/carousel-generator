"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useKeys } from "@/lib/hooks/use-keys";
import React, { ReducerAction, useEffect } from "react";
import { useKeysContext } from "@/lib/providers/keys-context";

const FormSchema = z.object({
  key: z.string().min(2, {
    message: "Key must be at least 2 characters.",
  }),
});

export function BringYourKeysDialog({
  triggerButton,
}: {
  triggerButton: React.ReactNode;
}) {
  const { setApiKey } = useKeysContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      key: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setApiKey(data.key);
    toast({
      title: "You've added your API key for this session",
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <DialogHeader>
              <DialogTitle>Add your OpenAI key</DialogTitle>
              <DialogDescription>
                {
                  "The key is never stored for security reasons. It's cleared after refresh."
                }
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API KEY</FormLabel>
                  <FormControl>
                    <Input placeholder="sk-****123" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your OpenAI API Key.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save changes</Button>
              <Button
                type="reset"
                variant={"destructive"}
                onClick={() => {
                  setApiKey("");
                  form.reset();
                }}
              >
                Clear
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
