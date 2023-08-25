import { useState } from "react";
import { SidebarMenu } from "./menu-bar";
import { SlidesForm } from "./slides-form";
import { SettingsForm } from "./settings-form";
import { ThemeForm } from "./theme-form";

const ALL_FORMS = ["slide", "settings", "theme"];

export function SlidePanel({ currentSlide }: { currentSlide: number }) {
  const [selectedForm, setSelectedForm] = useState(ALL_FORMS[0]);

  return (
    <div className=" border p-4 flex flex-col gap-6 rounded shadow w-[448px] h-[560px]">
      <SidebarMenu
        items={ALL_FORMS}
        selectedForm={selectedForm}
        setSelectedForm={setSelectedForm}
      />
      {selectedForm == "slide" && <SlidesForm currentSlide={currentSlide} />}
      {selectedForm == "settings" && <SettingsForm />}
      {selectedForm == "theme" && <ThemeForm />}
    </div>
  );
}
