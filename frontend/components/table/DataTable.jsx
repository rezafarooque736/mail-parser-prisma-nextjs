"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import ui components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";

export function DataTable({ columns, data, searchTitle, searchKeyword }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-600">
            {searchTitle} Data Table
          </h1>
        </div>
        <Input
          placeholder={`Filter ${searchTitle}...`}
          value={table.getColumn(searchKeyword)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(searchKeyword)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="h-2" />
      <div className="flex items-center justify-between gap-2 sm:px-4">
        <div className="flex items-center gap-1 text-slate-900">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="flex items-center justify-center p-1 rounded-full w-7 h-7 bg-slate-800 hover:bg-slate-950"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </Button>
          <Button
            className="flex items-center justify-center w-8 h-8 p-1 rounded-full bg-slate-800 hover:bg-slate-900"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="text-xl">{"<"}</span>
          </Button>
          <Button
            className="flex items-center justify-center w-8 h-8 p-1 rounded-full bg-slate-800 hover:bg-slate-900"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="text-xl">{">"}</span>
          </Button>
          <Button
            className="flex items-center justify-center p-1 rounded-full w-7 h-7 bg-slate-800 hover:bg-slate-950"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </Button>
          <span className="flex items-center gap-1">
            | Go to page:
            <Input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="w-12 p-1 border rounded"
            />
          </span>
        </div>
        <select
          className="p-2 border cursor-pointer rounded-xl border-slate-500"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
