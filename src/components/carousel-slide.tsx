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
import * as z from "zod";

export function CarouselSlide({
  slide,
  settings,
}: {
  slide: z.infer<typeof SlideSchema>;
  settings: z.infer<typeof SettingsSchema>;
}) {
  return (
    <Card className="w-[448px] h-[560px] aspect-[4/5] p-8 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{slide.title}</CardTitle>
        <CardDescription>{slide.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="">{slide.description}</span>
      </CardContent>
      <CardFooter className="flex justify-start gap-3 ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={settings.avatar}
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="">{settings.name}</span>
          <span className="">{settings.handle}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
