import {
  DocumentFormReturn,
  ImageFieldPath,
  ImageStyleOpacityFieldPath,
} from "@/lib/document-form-types";
import { ImageSourceFormField } from "@/components/forms/fields/image-source-form-field";
import { ObjectFitType } from "@/lib/validation/image-schema";
import { Maximize2, Minimize2 } from "lucide-react";
import { OpacityFormField } from "@/components/forms/fields/opacity-form-field";

const objectFitMap: Record<ObjectFitType, React.ReactElement> = {
  [ObjectFitType.enum.Contain]: <Minimize2 className="h-4 w-4" />,
  [ObjectFitType.enum.Cover]: <Maximize2 className="h-4 w-4" />,
};

export function ImageFormField({
  fieldName,
  form,
  label,
}: {
  fieldName: ImageFieldPath;
  form: DocumentFormReturn;
  label: string;
}) {
  return (
    <>
      <h3 className="text-base">{label}</h3>
      <ImageSourceFormField fieldName={`${fieldName}.source`} form={form} />
      <OpacityFormField
        fieldName={`${fieldName}.style.opacity` as ImageStyleOpacityFieldPath}
        form={form}
        label={"Opacity"}
        disabled={form.getValues(`${fieldName}.source.src`) == ""}
      />
    </>
  );
}
