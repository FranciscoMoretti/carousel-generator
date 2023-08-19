"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as z from "zod";
import { SidebarMenu } from "@/components/menu-bar";
import { SlideForm } from "@/components/slide-form";
import { SlideSchema } from "@/lib/validation/slide-schema";
import { CarouselSlide } from "@/components/carousel-slide";
import { SettingsSchema } from "@/lib/validation/settings-schema";
import { SettingsForm } from "@/components/settings-form";
import { usePersistFormWithKey } from "@/lib/hooks/use-persist-form-with-key";
import { ThemeSchema } from "@/lib/validation/theme-schema";
import { ThemeForm } from "@/components/theme-form";

const ALL_FORMS = ["slide", "settings", "theme"];

export default function Home() {
  const [selectedForm, setSelectedForm] = useState(ALL_FORMS[0]);
  const slideForm = useForm<z.infer<typeof SlideSchema>>({
    resolver: zodResolver(SlideSchema),
    defaultValues: {
      title: "YOUR TITLE",
      subtitle: "Your awesome subtitle",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, dolorum.",
    },
  });
  usePersistFormWithKey(slideForm, "slideFormKey");
  const slideValues = slideForm.watch();

  const settingsForm = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      avatar: "https://thispersondoesnotexist.com",
      name: "My name",
      handle: "@name",
    },
  });
  usePersistFormWithKey(settingsForm, "settingsFormKey");
  const settingsValues = settingsForm.watch();

  const themeForm = useForm<z.infer<typeof ThemeSchema>>({
    resolver: zodResolver(ThemeSchema),
    defaultValues: {
      primary: "#005B8C",
      secondary: "#FFCC4A",
      accent: "#FDF8EC",
    },
  });
  usePersistFormWithKey(themeForm, "settingsFormKey");
  const themeValues = themeForm.watch();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl grid grid-cols-1 xl:grid-cols-2 gap-8 font-mono text-sm ">
        <div className="col-span-1 border p-4 rounded shadow flex flex-col items-center ">
          <CarouselSlide slide={slideValues} settings={settingsValues} />
        </div>
        <div className="col-span-1 border p-4 flex flex-col gap-6 rounded shadow">
          <SidebarMenu
            items={ALL_FORMS}
            selectedForm={selectedForm}
            setSelectedForm={setSelectedForm}
          />
          {selectedForm == "slide" && <SlideForm form={slideForm} />}
          {selectedForm == "settings" && <SettingsForm form={settingsForm} />}
          {selectedForm == "theme" && <ThemeForm form={themeForm} />}
        </div>
      </div>
    </main>
  );
}
