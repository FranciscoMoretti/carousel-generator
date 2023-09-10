import { usePagerContext } from "@/lib/providers/pager-context";
import { SlidesForm } from "./slides-form";
import { Tabs } from "./ui/tabs";
import { SlidesFieldArrayReturn } from "@/lib/document-form-types";
import { SIZE } from "@/lib/pdf-resources";

export function SlidePanel({
  slidesFieldArray,
  scale,
}: {
  slidesFieldArray: SlidesFieldArrayReturn;
  scale: number;
}) {
  return (
    // TODO: Should adapt to slide size
    // TODO Remove tabs
    <Tabs defaultValue="slide" className="flex-1">
      <div
        className="flex flex-col gap-6"
        style={{
          width: `${scale * SIZE.width}px`,
        }}
      >
        <div className="border p-4 rounded  shadow">
          <SlidesForm slidesFieldArray={slidesFieldArray} />
        </div>
      </div>
    </Tabs>
  );
}
