"use client";

import Link from "next/link";
// import { SidebarNavItem } from "types/nav";

import { cn } from "@/lib/utils";
import { SettingsForm } from "@/components/settings-form";
import { SlidesForm } from "@/components/slides-form";
import { ThemeForm } from "@/components/theme-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePagerContext } from "@/lib/providers/pager-context";
import { Separator } from "@/components/ui/separator";
import { FontsForm } from "@/components/fonts-form";
import { PageNumberForm } from "./page-number-form";

export function EditorSidebar() {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="text-xl font-semibold">Settings</h2>
      <Separator />

      {/* return items.length ? ( */}
      {/* {items.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item?.items?.length && (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          )}
        </div>
      ))} */}
      <SidebarFormsPanel />
    </div>
  );
}

const ALL_FORMS = {
  settings: {
    name: "Settings",
    value: "settings",
  },
  theme: {
    name: "Theme",
    value: "theme",
  },
  fonts: {
    name: "Fonts",
    value: "fonts",
  },
  pageNumber: {
    name: "Page Numbers",
    value: "page_number",
  },
};

export function SidebarFormsPanel() {
  return (
    <Tabs defaultValue={ALL_FORMS.settings.value} className="flex-1">
      <div className="flex flex-col p-2 gap-6">
        <TabsList className="grid grid-cols-2 gap-2 shadow h-20">
          <TabsTrigger value={ALL_FORMS.settings.value}>
            <span className="sr-only">{ALL_FORMS.settings.name}</span>
            {ALL_FORMS.settings.name}
          </TabsTrigger>
          <TabsTrigger value={ALL_FORMS.theme.value}>
            <span className="sr-only">{ALL_FORMS.theme.name}</span>
            {ALL_FORMS.theme.name}
          </TabsTrigger>
          <TabsTrigger value={ALL_FORMS.fonts.value}>
            <span className="sr-only">{ALL_FORMS.fonts.name}</span>
            {ALL_FORMS.fonts.name}
          </TabsTrigger>
          <TabsTrigger value={ALL_FORMS.pageNumber.value}>
            <span className="sr-only">{ALL_FORMS.pageNumber.name}</span>
            {ALL_FORMS.pageNumber.name}
          </TabsTrigger>
        </TabsList>
        <Separator />

        <TabsContent
          value={ALL_FORMS.settings.value}
          className="mt-0 border-0 p-0"
        >
          <h4 className="mb-1 rounded-md py-1 text-lg font-semibold">
            {ALL_FORMS.settings.name}
          </h4>

          <SettingsForm />
        </TabsContent>
        <TabsContent
          value={ALL_FORMS.theme.value}
          className="mt-0 border-0 p-0"
        >
          <h4 className="mb-1 rounded-md py-1 text-lg font-semibold">
            {ALL_FORMS.theme.name}
          </h4>

          <ThemeForm />
        </TabsContent>
        <TabsContent
          value={ALL_FORMS.fonts.value}
          className="mt-0 border-0 p-0"
        >
          <h4 className="mb-1 rounded-md py-1 text-lg font-semibold">
            {ALL_FORMS.fonts.name}
          </h4>

          <FontsForm />
        </TabsContent>
        <TabsContent
          value={ALL_FORMS.pageNumber.value}
          className="mt-0 border-0 p-0"
        >
          <h4 className="mb-1 rounded-md py-1 text-lg font-semibold">
            {ALL_FORMS.pageNumber.name}
          </h4>

          <PageNumberForm />
        </TabsContent>
      </div>
    </Tabs>
  );
}
