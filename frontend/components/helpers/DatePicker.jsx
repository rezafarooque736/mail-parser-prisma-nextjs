"use client";

import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function DatePickerFrom({ typeName, dateFrom }) {
  const {
    fromDateIP,
    setFromDateIP,
    fromDateHASH,
    setFromDateHASH,
    fromDateURL,
    setFromDateURL,
    fromDateDOMAIN,
    setFromDateDOMAIN,
  } = useAppContext();

  useEffect(() => {
    if (typeName === "ip") {
      setFromDateIP(dateFrom);
    } else if (typeName === "hash") {
      setFromDateHASH(dateFrom);
    } else if (typeName === "url") {
      setFromDateURL(dateFrom);
    } else {
      setFromDateDOMAIN(dateFrom);
    }
  }, []);

  if (typeName === "ip") {
    return (
      <DatePicker
        selected={fromDateIP}
        onChange={(date) => setFromDateIP(date)}
      />
    );
  } else if (typeName === "hash") {
    return (
      <DatePicker
        selected={fromDateHASH}
        onChange={(date) => setFromDateHASH(date)}
      />
    );
  } else if (typeName === "url") {
    return (
      <DatePicker
        selected={fromDateURL}
        onChange={(date) => setFromDateURL(date)}
      />
    );
  } else {
    return (
      <DatePicker
        selected={fromDateDOMAIN}
        onChange={(date) => setFromDateDOMAIN(date)}
      />
    );
  }
}

export function DatePickerTo() {
  const { toDate, setToDate } = useAppContext();

  return <DatePicker selected={toDate} onChange={(date) => setToDate(date)} />;
}
