import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SettingsSchema } from "@/lib/validation/settings-schema";
import { SlideSchema } from "@/lib/validation/slide-schema";
import { ThemeSchema } from "@/lib/validation/theme-schema";
import * as z from "zod";

export function CarouselSlide({
  slide,
  settings,
  theme,
}: {
  slide: z.infer<typeof SlideSchema>;
  settings: z.infer<typeof SettingsSchema>;
  theme: z.infer<typeof ThemeSchema>;
}) {
  return (
    <Card
      className="w-[448px] h-[560px] aspect-[4/5] p-8 flex flex-col justify-between"
      style={{ backgroundColor: theme.background }}
    >
      <CardHeader>
        <CardTitle style={{ color: theme.primary }}>{slide.title}</CardTitle>
        <CardDescription style={{ color: theme.secondary }}>
          {slide.subtitle}
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
