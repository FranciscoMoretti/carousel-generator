import { useState } from "react";
import { SidebarMenu } from "./menu-bar";
import { SlidesForm } from "./slides-form";
import { SettingsForm } from "./settings-form";
import { ThemeForm } from "./theme-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const ALL_FORMS = ["slide", "settings", "theme"];

export function SlidePanel({ currentSlide }: { currentSlide: number }) {
  return (
    <Tabs defaultValue="slide" className="flex-1">
      <div className="flex flex-col gap-6 w-[448px] h-[560px] ">
        <TabsList className="grid grid-cols-3 shadow">
          <TabsTrigger value="slide">
            <span className="sr-only">Slide</span>
            Slide
          </TabsTrigger>
          <TabsTrigger value="settings">
            <span className="sr-only">Settings</span>
            Settings
          </TabsTrigger>
          <TabsTrigger value="theme">
            <span className="sr-only">Theme</span>
            Theme
          </TabsTrigger>
        </TabsList>
        <div className="border p-4 rounded  shadow">
          <TabsContent value="slide" className="mt-0 border-0 p-0 ">
            <SlidesForm currentSlide={currentSlide} />
          </TabsContent>
          <TabsContent value="settings" className="mt-0 border-0 p-0">
            <SettingsForm />
          </TabsContent>
          <TabsContent value="theme" className="mt-0 border-0 p-0">
            <ThemeForm />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
}
