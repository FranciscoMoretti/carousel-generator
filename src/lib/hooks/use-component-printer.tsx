import React from "react";
import { useReactToPrint } from "react-to-print";
import { SIZE } from "@/lib/pdf-resources";
import { useFieldArrayValues } from "@/lib/hooks/use-field-array-values";
import { useFormContext } from "react-hook-form";
import { DocumentFormReturn } from "@/lib/document-form-types";

export function useComponentPrinter() {
  const { numPages } = useFieldArrayValues("slides");
  const { watch }: DocumentFormReturn = useFormContext();

  const [isPrinting, setIsPrinting] = React.useState(false);
  // TODO: Show animation on loading
  const componentRef = React.useRef(null);

  // Packages and references
  // react-to-print: https://github.com/gregnb/react-to-print
  // html2pdf.js: https://ekoopmans.github.io/html2pdf.js/
  // html2canvas: https://html2canvas.hertzen.com/configuration
  // jsPDF: https://rawgit.com/MrRio/jsPDF/master/docs/jsPDF.html

  const reactToPrintContent = React.useCallback(() => {
    const current = componentRef.current;
    if (current && typeof current === "object") {
      // @ts-ignore should type narrow more precisely
      const clone = current.cloneNode(true);
      // Change from horizontal to vertical for printing and remove gap
      clone.className = "flex flex-col";
      proxyImgSources(clone);
      return clone;
    }

    return componentRef.current;
  }, []);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    removeAfterPrint: true,
    onBeforePrint: () => setIsPrinting(true),
    onAfterPrint: () => setIsPrinting(false),
    pageStyle: `@page { size: ${SIZE.width}px ${SIZE.height}px;  margin: 0; } @media print { body { -webkit-print-color-adjust: exact; }}`,
    print: async (printIframe) => {
      const document = printIframe.contentDocument;
      if (!document) {
        console.error("iFrame does not have a document content");
        return;
      }

      const html = document.getElementById("element-to-download-as-pdf");
      if (!html) {
        console.error("Couldn't find element to convert to PDF");
        return;
      }
      const SCALE_TO_LINKEDIN_INTRINSIC_SIZE = 1.8;
      const options = {
        margin: 0,
        filename: watch("filename"),
        image: { type: "webp", quality: 0.98 },
        html2canvas: {
          scale: SCALE_TO_LINKEDIN_INTRINSIC_SIZE, // TODO: Consider making sharpness configurable
          width: SIZE.width,
          height: SIZE.height * numPages,
          logging: true,
          imageTimeout: 0,
          useCORS: true,
        },
        jsPDF: { unit: "px", format: [SIZE.width, SIZE.height] },
      };

      // @ts-ignore
      await import("html2pdf.js")
        .then((html2pdf) => {
          html2pdf
            .default()
            .set(options)
            .from(html)
            .save()
            .catch((error: string) =>
              console.error("Failed to PDF processing: ", error)
            );
        })
        .catch((error) =>
          console.error("Failed to import PDF conversion library: ", error)
        );
    },
  });

  return {
    componentRef,
    handlePrint,
    isPrinting,
  };
}

function proxyImgSources(html: HTMLElement) {
  // @ts-ignore
  const images = Array.from(
    html.getElementsByTagName("img")
  ) as HTMLImageElement[];
  const url = process.env.NEXT_PUBLIC_APP_URL;

  images.forEach((image) => {
    const apiRequestURL = new URL(`${url}/api/proxy`);
    apiRequestURL.searchParams.set("url", image.src);
    // TODO: Consider using the cache of fetch
    image.src = apiRequestURL.toString();
  });
}
