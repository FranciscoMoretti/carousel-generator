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

export const PDFViewer = ({ value, onUrlChange }) => {
  const [numPages, setNumPages] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const [previousRenderValue, setPreviousRenderValue] = useState(null);

  const render = useAsync(async () => {
    if (!value) return null;

    const blob = await pdf(value).toBlob();
    const url = URL.createObjectURL(blob);
    return url;
  }, [value]);

  useEffect(() => onUrlChange(render.value), [render.value]);

  const onPreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const onNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onDocumentLoad = (d) => {
    setNumPages(d.numPages);
    setCurrentPage((prev) => Math.min(prev, d.numPages));
  };

  const isFirstRendering = !previousRenderValue;

  const isLatestValueRendered = previousRenderValue === render.value;
  const isBusy = render.loading || !isLatestValueRendered;

  const shouldShowTextLoader = isFirstRendering && isBusy;
  const shouldShowPreviousDocument = !isFirstRendering && isBusy;

  return (
    <div className="flex flex-1 h-full flex-col relative">
      {shouldShowTextLoader && <div>Rendering PDF...</div>}
      {!render.loading && !value && (
        <div>You are not rendering a valid document</div>
      )}

      <div className="flex flex-1 p-4 items-center justify-center relative z-50">
        {shouldShowPreviousDocument && previousRenderValue ? (
          <Document
            key={previousRenderValue}
            file={previousRenderValue}
            loading={null}
          >
            <Page
              className={shouldShowPreviousDocument ? "opacity-50 " : null}
              key={currentPage}
              pageNumber={currentPage}
            />
          </Document>
        ) : null}
        <Document
          key={render.value}
          className={shouldShowPreviousDocument ? "absolute " : null}
          file={render.value}
          loading={null}
          onLoadSuccess={onDocumentLoad}
        >
          <Page
            key={currentPage}
            pageNumber={currentPage}
            onRenderSuccess={() => setPreviousRenderValue(render.value)}
          />
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
