"use client";

import { createContext, useContext, useMemo, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [fromDateIP, setFromDateIP] = useState(new Date());
  const [fromDateHASH, setFromDateHASH] = useState(new Date());
  const [fromDateURL, setFromDateURL] = useState(new Date());
  const [fromDateDOMAIN, setFromDateDOMAIN] = useState(new Date());
  const [total, setTotal] = useState({
    ip: 0,
    hash: 0,
    url: 0,
    domain: 0,
  });
  const [toDate, setToDate] = useState(new Date());

  const appContextValue = useMemo(() => {
    return {
      fromDateIP,
      setFromDateIP,
      fromDateHASH,
      setFromDateHASH,
      fromDateURL,
      setFromDateURL,
      fromDateDOMAIN,
      setFromDateDOMAIN,
      toDate,
      setToDate,
      total,
      setTotal,
    };
  }, [
    fromDateIP,
    setFromDateIP,
    fromDateHASH,
    setFromDateHASH,
    fromDateURL,
    setFromDateURL,
    fromDateDOMAIN,
    setFromDateDOMAIN,
    toDate,
    setToDate,
    total,
    setTotal,
  ]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook to use this context
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context == null) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
};
