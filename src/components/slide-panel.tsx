import { SlidesForm } from "./slides-form";
import { SettingsForm } from "./settings-form";
import { ThemeForm } from "./theme-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { usePagerContext } from "@/lib/providers/pager-context";

const ALL_FORMS = {
  slide: {
    name: "Slide",
    value: "slide",
  },
  settings: {
    name: "Settings",
    value: "settings",
  },
  theme: {
    name: "Theme",
    value: "theme",
  },
};

export function SlidePanel() {
  return (
    <Tabs defaultValue="slide" className="flex-1">
      <div className="flex flex-col gap-6 w-[448px] h-[440px] ">
        <div className="border p-4 rounded  shadow">
          <SlidesForm />
        </div>
      </div>
    </Tabs>
  );
}
