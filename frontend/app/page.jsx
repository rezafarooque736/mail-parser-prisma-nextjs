"use client";

import TotalValue from "@/components/helpers/TotalValue";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// custom import
import { getAllData } from "@/services";
import { DatePickerFrom, DatePickerTo } from "@/components/helpers/DatePicker";
import DownloadInExcel from "@/components/helpers/DownloadInExcel";

export default async function Home() {
  const data = await getAllData();

  return (
    <section className="h-[86vh] grid place-content-center">
      <div className="grid grid-cols-2 gap-6">
        {data?.map((item, index) => (
          <Card
            className="w-[19rem] bg-white hover:border-slate-400 hover:shadow-sm"
            key={Object.keys(item?.at(0))[1]}
          >
            <CardHeader className="p-4 pb-0">
              <CardTitle className="p-1 text-lg text-center uppercase text-slate-800">
                {Object.keys(item?.at(0))[1]}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-1 p-4">
              <div className="font-medium">
                Total : <TotalValue typeName={Object.keys(item?.at(0))[1]} />
              </div>
              <div className="font-medium ">
                Last update :{" "}
                {/* <span className="text-sm font-normal">{item?.at(0).sent}</span> */}
                <span className="text-sm font-normal">
                  {new Intl.DateTimeFormat("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(item?.at(0).sent))}
                </span>
              </div>
              <div className="flex">
                <span className="font-medium w-11">From</span>
                <span className="pl-1 py-[2px] text-sm border rounded-md border-slate-300">
                  <DatePickerFrom
                    typeName={Object.keys(item?.at(0))[1]}
                    dateFrom={new Date(item?.at(-1).sent)}
                  />
                </span>
              </div>
              <div className="flex">
                <span className="font-medium w-11">To</span>
                <span className="pl-1 py-[2px] text-sm border rounded-md border-slate-300">
                  <DatePickerTo />
                </span>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <DownloadInExcel
                data={item}
                typeName={Object.keys(item?.at(0))[1]}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
