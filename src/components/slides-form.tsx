import { useFieldArray, useFormContext } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { DocumentFormReturn } from "@/lib/document-form-types";
import { SlideType } from "@/lib/validation/slide-schema";
import { ContentSlideForm } from "./content-slide-form";
import { OutroSlideForm } from "./outro-slide-form";
import { IntroSlideForm } from "./intro-slide-form";

export function SlidesForm({ currentSlide }: { currentSlide: number }) {
  const form: DocumentFormReturn = useFormContext(); // retrieve those props

  const { control } = form;
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "slides", // unique name for your Field Array
    }
  );

  const currentFields = fields[currentSlide];

  return (
    <Form {...form}>
      <form>
        {currentFields.type == SlideType.enum.Content ? (
          <ContentSlideForm
            key={currentFields.id}
            currentSlide={currentSlide}
            form={form}
          ></ContentSlideForm>
        ) : currentFields.type == SlideType.enum.Intro ? (
          <IntroSlideForm
            key={currentFields.id}
            currentSlide={currentSlide}
            form={form}
          />
        ) : currentFields.type == SlideType.enum.Outro ? (
          <OutroSlideForm
            key={currentFields.id}
            currentSlide={currentSlide}
            form={form}
          />
        ) : null}
      </form>
    </Form>
  );
}
