import * as React from "react";
import * as z from "zod";
import { useReactToPrint } from "react-to-print";
import { ReactDocument } from "./react-document";
import { SIZE } from "@/lib/pdf-resources";
import { useFormContext } from "react-hook-form";
import { DocumentFormReturn } from "@/lib/document-form-types";

export function PrintableWrapper({}: {}) {
  const componentRef = React.useRef(null);
  const { watch }: DocumentFormReturn = useFormContext(); // retrieve those props
  const document = watch();

  const [loading, setLoading] = React.useState(false);

  const reactToPrintContent = React.useCallback(() => {
    const current = componentRef.current;
    if (current && typeof current === "object") {
      // @ts-ignore should type narrow more precisely
      const clone = current.cloneNode(true);
      // Change from horizontal to vertical for printing
      clone.className = "flex flex-col";
      return clone;
    }

    return componentRef.current;
  }, []);
  // }, [componentRef.current]); // TODO: Remove comment if not needed

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    removeAfterPrint: true,
    onBeforePrint: () => setLoading(true),
    onAfterPrint: () => setLoading(false),
    pageStyle: `@page { size: ${SIZE.width}px ${SIZE.height}px;  margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; }}`,
    // fonts: CUSTOM_FONTS,
  });

  return (
    <div>
      {loading && <p className="indicator">onBeforeGetContent: Loading...</p>}
      <button onClick={handlePrint}>
        Print using a Functional Component with the useReactToPrint hook
      </button>
      <ReactDocument document={document} docReference={componentRef} />
    </div>
  );
}
