import React, { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { useAsync } from "react-use";

// import PageNavigator from "./PageNavigator";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const PDFViewer = ({ pdfUrl }: { pdfUrl: string }) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [previousRenderValue, setPreviousRenderValue] = useState("");

  // const render = useAsync(async () => {
  //   if (!value) return null;

  //   const blob = await pdf(value).toBlob();
  //   const url = URL.createObjectURL(blob);
  //   return url;
  // }, [value]);

  // useEffect(() => onUrlChange(render.value), [render.value]);

  const onPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onDocumentLoad = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage((prev) => Math.min(prev, numPages));
  };

  const isFirstRendering = !previousRenderValue;

  const isLatestValueRendered = previousRenderValue === pdfUrl;
  const isBusy = !isLatestValueRendered;
  // const isBusy = false;

  const shouldShowTextLoader = isFirstRendering && isBusy;
  const shouldShowPreviousDocument = !isFirstRendering && isBusy;
  // const shouldShowPreviousDocument = false;

  return (
    <div className="flex flex-1 h-full flex-col relative ">
      {shouldShowTextLoader && <div>Rendering PDF...</div>}
      {/* {!render.loading && !value && (
        <div>You are not rendering a valid document</div>
      )} */}

      <div className="flex flex-1 items-center justify-center relative ">
        {!isLatestValueRendered && previousRenderValue ? (
          <Document
            key={previousRenderValue}
            file={previousRenderValue}
            loading={null}
            className="flex flex-row gap-2 "
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                className={shouldShowPreviousDocument ? "opacity-50 " : null}
                width={448}
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            ))}
          </Document>
        ) : null}
        <Document
          key={pdfUrl}
          file={pdfUrl}
          loading={null}
          onLoadSuccess={onDocumentLoad}
          className="flex flex-row gap-2"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              className={
                shouldShowPreviousDocument ? "absolute opacity-0" : null
              }
              pageNumber={index + 1}
              width={448}
              onRenderSuccess={() => setPreviousRenderValue(pdfUrl)}
            />
          ))}
        </Document>
      </div>

      {/* <PageNavigator
        currentPage={currentPage}
        numPages={numPages}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      /> */}
    </div>
  );
};

export default PDFViewer;
