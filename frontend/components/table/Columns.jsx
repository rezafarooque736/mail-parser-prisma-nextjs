"use client";

import { Button } from "@/components/ui/button";
import { PiCaretUpDown } from "react-icons/pi";

export const ipColumns = [
  {
    accessorKey: "ip",
    header: "IP",
    cell: ({ row }) => (
      <div className="font-medium text-slate-900">{row.getValue("ip")}</div>
    ),
  },
  {
    accessorKey: "fromEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          From Email
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-slate-800">
        {row.getValue("fromEmail")}
      </div>
    ),
  },

  {
    accessorKey: "toEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          To Email
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-slate-800">{row.getValue("toEmail")}</div>
    ),
  },
  {
    accessorKey: "sent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sent
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedSentTime = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(row.getValue("sent")));

      const formattedSentDate = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(row.getValue("sent")));

      return (
        <div>
          <p className="text-sm text-center text-slate-800 w-max">
            {formattedSentDate}
          </p>
          <p className="w-full text-xs text-center text-slate-600">
            {formattedSentTime}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: () => <div className="text-center">Subject</div>,
    cell: ({ row }) => (
      <div className="ml-4 w-[512px] text-left text-slate-800">
        {row.getValue("subject")}
      </div>
    ),
  },
];

export const hashColumns = [
  {
    accessorKey: "hash",
    header: "HASH",
    cell: ({ row }) => (
      <div className="font-medium break-words text-slate-900 w-72">
        {row.getValue("hash")}
      </div>
    ),
  },
  {
    accessorKey: "hashType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hash Type
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center lowercase text-slate-800">
        {row.getValue("hashType")}
      </div>
    ),
  },
  {
    accessorKey: "fromEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          From Email
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-40 lowercase break-words text-slate-800">
        {row.getValue("fromEmail")}
      </div>
    ),
  },

  {
    accessorKey: "toEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          To Email
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-40 lowercase break-words text-slate-800">
        {row.getValue("toEmail")}
      </div>
    ),
  },
  {
    accessorKey: "sent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sent
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedSentTime = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(row.getValue("sent")));

      const formattedSentDate = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(row.getValue("sent")));

      return (
        <div>
          <p className="text-sm text-center text-slate-800 w-max">
            {formattedSentDate}
          </p>
          <p className="w-full text-xs text-center text-slate-600">
            {formattedSentTime}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: () => <div className="text-center">Subject</div>,
    cell: ({ row }) => (
      <div className="ml-2 text-left w-[430px] text-slate-800">
        {row.getValue("subject")}
      </div>
    ),
  },
];

export const urlColumns = [
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <div className="font-medium break-words text-slate-900 w-80">
        {row.getValue("url")}
      </div>
    ),
  },
  {
    accessorKey: "fromEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          From Email
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-40 lowercase break-words text-slate-800">
        {row.getValue("fromEmail")}
      </div>
    ),
  },

  {
    accessorKey: "toEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          To Email
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-40 lowercase break-words text-slate-800">
        {row.getValue("toEmail")}
      </div>
    ),
  },
  {
    accessorKey: "sent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sent
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedSentTime = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(row.getValue("sent")));

      const formattedSentDate = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(row.getValue("sent")));

      return (
        <div>
          <p className="text-sm text-center text-slate-800 w-max">
            {formattedSentDate}
          </p>
          <p className="w-full text-xs text-center text-slate-600">
            {formattedSentTime}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: () => <div className="text-center">Subject</div>,
    cell: ({ row }) => (
      <div className="ml-2 text-slate-800 w-[512px] text-left">
        {row.getValue("subject")}
      </div>
    ),
  },
];

export const domainColumns = [
  {
    accessorKey: "domain",
    header: "DOMAIN",
    cell: ({ row }) => (
      <div className="font-medium break-words text-slate-900 w-60">
        {row.getValue("domain")}
      </div>
    ),
  },
  {
    accessorKey: "fromEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          From Email
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-48 lowercase break-words text-slate-800">
        {row.getValue("fromEmail")}
      </div>
    ),
  },

  {
    accessorKey: "toEmail",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          To Email
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="w-40 lowercase break-words text-slate-800">
        {row.getValue("toEmail")}
      </div>
    ),
  },
  {
    accessorKey: "sent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sent
          <PiCaretUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const formattedSentTime = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(row.getValue("sent")));

      const formattedSentDate = new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(row.getValue("sent")));

      return (
        <div>
          <p className="text-sm text-center text-slate-800 w-max">
            {formattedSentDate}
          </p>
          <p className="w-full text-xs text-center text-slate-600">
            {formattedSentTime}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: () => <div className="text-center">Subject</div>,
    cell: ({ row }) => (
      <div className="ml-2 text-slate-800 w-[512px] text-left">
        {row.getValue("subject")}
      </div>
    ),
  },
];
