"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import * as XLSX from "xlsx";

export default function DownloadInExcel({ data, typeName }) {
  const {
    fromDateIP,
    fromDateHASH,
    fromDateURL,
    fromDateDOMAIN,
    toDate,
    setTotal,
  } = useAppContext();

  // Filter the data based on the date range
  const filteredData = data.filter((item) => {
    if (typeName === "ip") {
      const sentDate = new Date(item.sent);
      return sentDate >= fromDateIP && sentDate < toDate;
    } else if (typeName === "hash") {
      const sentDate = new Date(item.sent);
      return sentDate >= fromDateHASH && sentDate < toDate;
    } else if (typeName === "url") {
      const sentDate = new Date(item.sent);
      return sentDate >= fromDateURL && sentDate < toDate;
    } else {
      const sentDate = new Date(item.sent);
      return sentDate >= fromDateDOMAIN && sentDate < toDate;
    }
  });

  useEffect(() => {
    if (typeName === "ip") {
      setTotal((prev) => ({
        ...prev,
        ip: filteredData.length,
      }));
    } else if (typeName === "hash") {
      setTotal((prev) => ({
        ...prev,
        hash: filteredData.length,
      }));
    } else if (typeName === "url") {
      setTotal((prev) => ({
        ...prev,
        url: filteredData.length,
      }));
    } else {
      setTotal((prev) => ({
        ...prev,
        domain: filteredData.length,
      }));
    }
  }, [fromDateIP, fromDateHASH, fromDateURL, fromDateDOMAIN]);

  const formatTime = (timeString) => {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(timeString));
  };

  function downloadExcel() {
    const formattedData = filteredData.map(({ _id, __v, ...item }) => ({
      ...item,
      sent: formatTime(item.sent),
      createdAt: formatTime(item.createdAt),
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(formattedData);

    // Create a workbook with a single worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, typeName);

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, `${typeName}.xlsx`);
  }

  return (
    <Button onClick={downloadExcel} className="w-full hover:bg-primary-hover">
      Download
    </Button>
  );
}
