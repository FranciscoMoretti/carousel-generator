"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import useFormPersist from "react-hook-form-persist";
import { SidebarMenu } from "@/components/menu-bar";
import { SlideForm } from "@/components/slide-form";
import { SlideSchema } from "@/lib/validation/slide-schema";
import { CarouselSlide } from "@/components/carousel-slide";

const ALL_FORMS = ["slide", "settings"];

export default function Home() {
  const form = useForm<z.infer<typeof SlideSchema>>({
    resolver: zodResolver(SlideSchema),
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
          <CarouselSlide values={values} />
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
