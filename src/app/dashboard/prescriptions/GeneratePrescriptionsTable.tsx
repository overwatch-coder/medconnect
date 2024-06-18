"use client";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import { PrescriptionsDataType } from "@/app/dashboard/prescriptions/PrescriptionsTable";

const tableHeaderNames = [
  "Time",
  "Date",
  "Patient Name",
  "Age",
  "Phone Number",
  "Assigned HO",
];

const GeneratePrescriptionsTable = ({
  filteredPrescriptionsData,
}: {
  filteredPrescriptionsData: PrescriptionsDataType[];
}) => {
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const dataPerPage = 7;

  // Get current p for the page
  const indexOfLastData = currentTablePage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredPrescriptionsData.slice(
    indexOfFirstData,
    indexOfLastData
  );

  // Calculate the number of pages
  const totalPages = dataPerPage
    ? Math.ceil(filteredPrescriptionsData.length / dataPerPage)
    : filteredPrescriptionsData.length;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentTablePage(pageNumber);
  };

  return (
    <div className="py-2 w-full">
      <Table className="w-full overflow-x-scroll scrollbar-hide">
        <TableHeader>
          <TableRow>
            {tableHeaderNames.map((table, index) => (
              <TableHead key={index} className="text-primary-gray/40">
                <p className="flex flex-row items-center gap-1 md:gap-0 md:justify-between">
                  <span>{table}</span>

                  <span className="text-primary-gray/40 flex-col hidden sm:flex">
                    <IoMdArrowDropup
                      size={15}
                      className="cursor-pointer text-primary-gray"
                      onClick={() => {
                        console.log("Sorting");
                      }}
                    />

                    <IoMdArrowDropdown
                      size={15}
                      className="cursor-pointer text-primary-gray/30"
                      onClick={() => {
                        console.log("Sorting");
                      }}
                    />
                  </span>
                </p>
              </TableHead>
            ))}
            <TableHead className="text-primary-gray/40">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="w-full">
          {currentData.map((prescription, index) => (
            <TableRow key={index}>
              <TableCell className="text-secondary-gray flex items-center gap-2">
                {prescription.time}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {prescription.date}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {prescription.patientName}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {prescription.age}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {prescription.phoneNumber}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {prescription.assignedHO}
              </TableCell>
              <TableCell className="flex items-center gap-3">
                <TbEdit
                  size={20}
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    console.log("Edit clicked");
                  }}
                />

                <Trash2
                  size={20}
                  className="text-primary-green cursor-pointer"
                  onClick={() => {
                    console.log("Delete clicked");
                  }}
                />

                <Image
                  src="/assets/icons/calendar.svg"
                  alt="Calendar"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                  onClick={() => {
                    console.log("Calendar clicked");
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      {filteredPrescriptionsData.length > 0 && (
        <GenerateTablePagination
          currentPage={currentTablePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GeneratePrescriptionsTable;

const GenerateTablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent className="flex flex-row items-center md:justify-end gap-3 w-full">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              isActive={number === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(number);
              }}
              className={`${
                number === currentPage
                  ? "bg-primary-blue text-white hover:bg-primary-blue hover:text-white"
                  : "text-primary-blue"
              }`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
