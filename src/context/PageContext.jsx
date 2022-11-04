import React, { createContext, useState } from "react";

export const CurrentPageContext = createContext();

export function CurrentPageProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(() => {
    const localData = localStorage.getItem("currentPage");
    return localData ? localData : "";
  });
  const providerValue = { currentPage, setCurrentPage };

  return (
    <CurrentPageContext.Provider value={providerValue}>
      {children}
    </CurrentPageContext.Provider>
  );
}
