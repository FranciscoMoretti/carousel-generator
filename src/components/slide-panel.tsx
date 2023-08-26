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
  const { currentPage: currentSlide } = usePagerContext();

  return (
    <Tabs defaultValue="slide" className="flex-1">
      <div className="flex flex-col gap-6 w-[448px] h-[440px] ">
        <TabsList className="grid grid-cols-3 shadow">
          <TabsTrigger value={ALL_FORMS.slide.value}>
            <span className="sr-only">{ALL_FORMS.slide.name}</span>
            {ALL_FORMS.slide.name}
          </TabsTrigger>
          <TabsTrigger value={ALL_FORMS.settings.value}>
            <span className="sr-only">{ALL_FORMS.settings.name}</span>
            {ALL_FORMS.settings.name}
          </TabsTrigger>
          <TabsTrigger value={ALL_FORMS.theme.value}>
            <span className="sr-only">{ALL_FORMS.theme.name}</span>
            {ALL_FORMS.theme.name}
          </TabsTrigger>
        </TabsList>
        <div className="border p-4 rounded  shadow">
          <TabsContent
            value={ALL_FORMS.slide.value}
            className="mt-0 border-0 p-0 "
          >
            <SlidesForm currentSlide={currentSlide} />
          </TabsContent>
          <TabsContent
            value={ALL_FORMS.settings.value}
            className="mt-0 border-0 p-0"
          >
            <SettingsForm />
          </TabsContent>
          <TabsContent
            value={ALL_FORMS.theme.value}
            className="mt-0 border-0 p-0"
          >
            <ThemeForm />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
