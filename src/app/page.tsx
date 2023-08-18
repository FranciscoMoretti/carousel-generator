"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFormPersist from "react-hook-form-persist";
import { SidebarMenu } from "@/components/ui/menu-bar";
import { SlideForm } from "@/components/slide-form";

const FormSchema = z.object({
  title: z
    .string()
    .min(10, {
      message: "Title must be at least 10 characters.",
    })
    .max(160, {
      message: "Title must not be longer than 30 characters.",
    }),
  subtitle: z
    .string()
    .min(10, {
      message: "Subtitle must be at least 10 characters.",
    })
    .max(160, {
      message: "Subtitle must not be longer than 30 characters.",
    }),
  description: z.string(),
});

const ALL_FORMS = ["slide", "settings"];

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "YOUR TITLE",
      subtitle: "Your awesome subtitle",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorum.",
    },
  });
  const [selectedForm, setSelectedForm] = useState(ALL_FORMS[0]);

  const { watch, setValue } = form;

  useFormPersist("storageKey", {
    watch,
    setValue,
    storage: window.localStorage, // default window.sessionStorage
  });

  const values = form.watch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl grid grid-cols-1 xl:grid-cols-2 gap-8 font-mono text-sm ">
        <div className="col-span-1 border p-4 rounded shadow flex flex-col items-center ">
          <Carousel values={values} />
        </div>
        <div className="col-span-1 border p-4 flex flex-col gap-6 rounded shadow">
          <SidebarMenu
            items={ALL_FORMS}
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
          />
          {selectedForm == "slide" && <SlideForm form={form} />}
        </div>
      </div>
    </main>
  );
}

export function Carousel({ values }: { values: z.infer<typeof FormSchema> }) {
  return (
    <Card className="w-[448px] h-[560px] aspect-[4/5] p-8 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{values.title}</CardTitle>
        <CardDescription>{values.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="">{values.description}</span>
      </CardContent>
      <CardFooter className="flex justify-start gap-3 ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://thispersondoesnotexist.com"
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="">Your Name</span>
          <span className="">@handle</span>
        </div>
      </CardFooter>
    </Card>
  );
}
