import { usePagerContext } from "@/lib/providers/pager-context";
import { SlidesForm } from "./slides-form";
import { Tabs } from "./ui/tabs";
import { SlidesFieldArrayReturn } from "@/lib/document-form-types";

export function SlidePanel({
  slidesFieldArray,
}: {
  slidesFieldArray: SlidesFieldArrayReturn;
}) {
  return (
    // TODO Remove tabs
    <Tabs defaultValue="slide" className="flex-1">
      <div className="flex flex-col gap-6 w-[448px] h-[440px] ">
        <div className="border p-4 rounded  shadow">
          <SlidesForm slidesFieldArray={slidesFieldArray} />
        </div>
      </div>
    </Tabs>
  );
}
