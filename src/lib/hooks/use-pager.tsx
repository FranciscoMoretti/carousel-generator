import { useState } from "react";
import { DocumentFormReturn } from "../document-form-types";

export function usePager(initialPage: number) {
  const [currentPage, _setCurrentPage] = useState(initialPage);

  const onPreviousClick = () => {
    _setCurrentPage(currentPage - 1);
  };

  const onNextClick = () => {
    _setCurrentPage(currentPage + 1);
  };

  const setCurrentPage = (pageNum: number) => {
    _setCurrentPage(pageNum);
  };

  return {
    currentPage,
    onPreviousClick,
    onNextClick,
    setCurrentPage,
  };
}
