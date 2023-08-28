import { usePagerContext } from "@/lib/providers/pager-context";
import { IntroSlideForm } from "./intro-slide-form";
import { OutroSlideForm } from "./outro-slide-form";
import { SlidesForm } from "./slides-form";
import { Tabs } from "./ui/tabs";

export function SlidePanel() {
  const { currentPage, numPages } = usePagerContext();
  const INTRO_PAGE_SHIFT = 1;

  return (
    <Tabs defaultValue="slide" className="flex-1">
      <div className="flex flex-col gap-6 w-[448px] h-[440px] ">
        <div className="border p-4 rounded  shadow">
          {currentPage == 0 ? (
            <IntroSlideForm />
          ) : currentPage < numPages - 1 ? (
            <SlidesForm currentSlide={currentPage - INTRO_PAGE_SHIFT} />
          ) : (
            <OutroSlideForm />
          )}
        </div>
      </div>
    </Tabs>
  );
}
