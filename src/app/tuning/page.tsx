"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import {
  MultiSlideSchema,
  SlideSchema,
  SlideType,
} from "@/lib/validation/slide-schema";

import { DocumentSchema } from "@/lib/validation/document-schema";
import { PagerProvider } from "@/lib/providers/pager-context";
import { usePager } from "@/lib/hooks/use-pager";

import { PrintableWrapper } from "@/components/printable-wrapper";
import { SIZE } from "@/lib/pdf-resources";

const defaultSlideValues: z.infer<typeof MultiSlideSchema> = [
  {
    type: SlideType.enum.Content,
    title: "A cool title for this slide",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, recusandae.",
  },
  {
    type: SlideType.enum.Content,
    title: "A cool title 2 for this slide",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, recusandae.",
  },
  {
    type: SlideType.enum.Content,
    title: "A cool title 3 for this slide",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, recusandae.",
  },
];

export default function Home() {
  const documentForm = useForm<z.infer<typeof DocumentSchema>>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      slides: defaultSlideValues,
      config: {
        brand: {
          avatar: "https://www.franciscomoretti.com/profile_picture.jpg",
          name: "My name",
          handle: "@name",
        },
        theme: {
          isCustom: false,
          pallette: "pallette-1",
          primary: "#b1e4cc",
          secondary: "#9ac141",
          background: "#202624",
        },
        fonts: {
          font1: "DM_Sans",
          font2: "DM_Sans",
        },
        pageNumber: {
          showNumbers: true,
        },
      },
    },
  });

  const pager = usePager(0); // num
  const size = SIZE;

  return (
    <FormProvider {...documentForm}>
      <PagerProvider value={pager}>
        <main className="flex min-h-screen flex-col w-full gap-2 items-stretch ">
          <PrintableWrapper />
        </main>
      </PagerProvider>
    </FormProvider>
  );
}
