"use client";

import Link from "next/link";
// import { SidebarNavItem } from "types/nav";

import { cn } from "@/lib/utils";
import { SettingsForm } from "@/components/brand-form";
import { SlidesForm } from "@/components/slides-form";
import { ThemeForm } from "@/components/theme-form";
import {
  VerticalTabs,
  VerticalTabsContent,
  VerticalTabsList,
  VerticalTabsTrigger,
} from "@/components/ui/vertical-tabs";
import { usePagerContext } from "@/lib/providers/pager-context";
import { Separator } from "@/components/ui/separator";
import { FontsForm } from "@/components/fonts-form";
import { PageNumberForm } from "./page-number-form";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Briefcase, FileDigit, LucideIcon, Palette, Type } from "lucide-react";

export function SettingsPanel({ className }: { className?: string }) {
  return <SidebarFormsPanel />;
}

type TabInfo = {
  name: string;
  value: string;
  icon: LucideIcon;
};

const ALL_FORMS: Record<string, TabInfo> = {
  brand: {
    name: "Brand",
    value: "brand",
    icon: Briefcase,
  },
  theme: {
    name: "Theme",
    value: "theme",
    icon: Palette,
  },
  fonts: {
    name: "Fonts",
    value: "fonts",
    icon: Type,
  },
  pageNumber: {
    name: "Numbers",
    value: "number",
    icon: FileDigit,
  },
};

function TabTriggerButton({ tabInfo }: { tabInfo: TabInfo }) {
  return (
    <VerticalTabsTrigger
      value={tabInfo.value}
      className="h-16 flex flex-col gap-2 items-center py-2 justify-center"
    >
      <tabInfo.icon className="h-4 w-4" />
      <span className="sr-only ">{tabInfo.name}</span>
      <p className="text-xs">{tabInfo.name}</p>
    </VerticalTabsTrigger>
  );
}

export function SidebarFormsPanel() {
  return (
    <VerticalTabs
      defaultValue={ALL_FORMS.brand.value}
      className="flex-1 min-h-[600px] h-full p-0"
    >
      <div className="flex flex-row h-full ">
        <ScrollArea className=" border-r h-full bg-muted">
          <VerticalTabsList className="grid grid-cols-1 gap-2 w-20 rounded-none">
            <TabTriggerButton tabInfo={ALL_FORMS.brand}></TabTriggerButton>
            <TabTriggerButton tabInfo={ALL_FORMS.theme}></TabTriggerButton>
            <TabTriggerButton tabInfo={ALL_FORMS.fonts}></TabTriggerButton>
            <TabTriggerButton tabInfo={ALL_FORMS.pageNumber}></TabTriggerButton>
          </VerticalTabsList>
        </ScrollArea>
        <div className="p-2 flex flex-col items-center">
          <VerticalTabsContent
            value={ALL_FORMS.brand.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <SettingsForm />
          </VerticalTabsContent>
          <VerticalTabsContent
            value={ALL_FORMS.theme.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <ThemeForm />
          </VerticalTabsContent>
          <VerticalTabsContent
            value={ALL_FORMS.fonts.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <FontsForm />
          </VerticalTabsContent>
          <VerticalTabsContent
            value={ALL_FORMS.pageNumber.value}
            className="mt-0 border-0 p-0 m-4"
          >
            <PageNumberForm />
          </VerticalTabsContent>
        </div>
      </div>
    </VerticalTabs>
  );
}
