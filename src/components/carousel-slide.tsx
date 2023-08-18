import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SlideSchema } from "@/lib/validation/slide-schema";
import * as z from "zod";

export function CarouselSlide({
  values,
}: {
  values: z.infer<typeof SlideSchema>;
}) {
  return (
    <Card className="w-[448px] h-[560px] aspect-[4/5] p-8 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{values.title}</CardTitle>
        <CardDescription>{values.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="">{values.description}</span>
      </CardContent>
      <CardFooter className="flex justify-start gap-3 ">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://thispersondoesnotexist.com"
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex flex-col">
          <span className="">Your Name</span>
          <span className="">@handle</span>
        </div>
      </CardFooter>
    </Card>
  );
}
