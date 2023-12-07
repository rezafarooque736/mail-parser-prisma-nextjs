"use client";

import { useAppContext } from "@/context/AppContext";

export default function TotalValue({ typeName }) {
  const { total } = useAppContext();

  if (typeName === "ip") {
    return <span className="text-sm font-normal">{total.ip}</span>;
  } else if (typeName === "hash") {
    return <span className="text-sm font-normal">{total.hash}</span>;
  } else if (typeName === "url") {
    return <span className="text-sm font-normal">{total.url}</span>;
  } else {
    return <span className="text-sm font-normal">{total.domain}</span>;
  }
}
