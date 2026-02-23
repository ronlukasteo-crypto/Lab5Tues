import React, { createContext, useState } from "react";

export const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const [headerText, setHeaderText] = useState("unknown");

  return (
    <HeaderContext.Provider value={{ headerText, setHeaderText }}>
      {children}
    </HeaderContext.Provider>
  );
};