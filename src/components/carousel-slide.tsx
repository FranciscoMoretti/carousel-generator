import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DocumentSchema } from "@/lib/validation/document-schema";
import * as z from "zod";

export function CarouselSlide({
  document,
  index,
}: {
  document: z.infer<typeof DocumentSchema>;
  index: number;
}) {
  const { slides, settings, theme } = document;
  const slide = slides[index];
  return (
    <Card
      className="w-[448px] h-[560px] aspect-[4/5] p-8 flex flex-col justify-between"
      style={{ backgroundColor: theme.background }}
    >
      <CardHeader>
        <CardTitle style={{ color: theme.primary }}>{slide.title}</CardTitle>
        <CardDescription style={{ color: theme.secondary }}>
          {slide.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="">{slide.description}</span>
      </CardContent>
      <CardFooter
        style={{ color: theme.primary }}
        className="flex justify-start gap-3 "
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={settings.avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="" style={{ color: theme.primary }}>
            {settings.name}
          </span>
          <span className="" style={{ color: theme.secondary }}>
            {settings.handle}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
