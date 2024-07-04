"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GenerateTablePagination from "@/components/GenerateTablePagination";

type GenerateTableProps = {
  children: React.ReactNode;
  data: any[];
  tableHeaderNames: string[];
  currentPage?: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  dataPerPage?: number;
  showPagination?: boolean;
};

const GenerateTable = ({
  data,
  tableHeaderNames,
  currentPage,
  setCurrentPage,
  dataPerPage,
  children,
  showPagination = true,
}: GenerateTableProps) => {
  // Calculate the number of pages
  const totalPages = dataPerPage
    ? Math.ceil(data.length / dataPerPage)
    : data.length;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (setCurrentPage && currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {tableHeaderNames.map((table, index) => (
              <TableHead key={index} className="text-primary-gray/40">
                {table}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>{children}</TableBody>
      </Table>

      {/* Pagination */}
      {showPagination && (
        <GenerateTablePagination
          currentPage={currentPage || 0}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default GenerateTable;
