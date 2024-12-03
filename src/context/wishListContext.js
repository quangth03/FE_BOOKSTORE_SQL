import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState("");
  return (
    <MyContext.Provider value={{ sharedData, setSharedData }}>
      {children}
    </MyContext.Provider>
  );
};
