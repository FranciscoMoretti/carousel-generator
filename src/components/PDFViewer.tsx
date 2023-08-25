import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PAGE_GAP_PX = 8;
const PAGE_WIDTH_PX = 448;

export const PDFViewer = ({
  pdfUrl,
  currentPage,
}: {
  pdfUrl: string;
  currentPage: number;
}) => {
  const [numPages, setNumPages] = useState<number | null>(null);

  const [previousRenderValue, setPreviousRenderValue] = useState("");

  const onDocumentLoad = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const isFirstRendering = !previousRenderValue;

  const isLatestValueRendered = previousRenderValue === pdfUrl;
  const isBusy = !isLatestValueRendered;
  // const isBusy = false;

  const shouldShowTextLoader = isFirstRendering && isBusy;
  const shouldShowPreviousDocument = !isFirstRendering && isBusy;
  // const shouldShowPreviousDocument = false;

  return (
    <div className="">
      {shouldShowTextLoader && <div>Rendering PDF...</div>}
      {/* {!render.loading && !value && (
        <div>You are not rendering a valid document</div>
      )} */}

      <div
        className={` relative`}
        style={{
          left: `calc(50% - ${
            currentPage * (PAGE_WIDTH_PX + PAGE_GAP_PX)
          }px - ${(PAGE_WIDTH_PX + PAGE_GAP_PX) * 0.5}px)`,
        }}
      >
        {!isLatestValueRendered && previousRenderValue ? (
          <Document
            key={previousRenderValue}
            file={previousRenderValue}
            loading={null}
            className="flex flex-row gap-2 "
            style={{
              gap: `${PAGE_GAP_PX}px`,
            }}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                className={shouldShowPreviousDocument ? "opacity-50 " : null}
                width={PAGE_WIDTH_PX}
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
              width={PAGE_WIDTH_PX}
              onRenderSuccess={() => setPreviousRenderValue(pdfUrl)}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
