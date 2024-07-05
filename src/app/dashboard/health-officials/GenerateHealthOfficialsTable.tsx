"use client";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import DeleteModal from "@/components/DeleteModal";
import Link from "next/link";
import GenerateTablePagination from "@/components/GenerateTablePagination";
import { HealthOfficialType } from "@/types/index";
import EditOfficial from "@/app/dashboard/health-officials/edit-official/EditOfficial";

const tableHeaderNames = [
  "Name",
  "Position",
  "Staff ID",
  "Email Address",
  "Contact Number",
  "Date Started",
];

const GenerateHealthOfficialsTable = ({
  filteredData,
  setFilteredData,
}: {
  filteredData: HealthOfficialType[];
  setFilteredData: React.Dispatch<React.SetStateAction<HealthOfficialType[]>>;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<HealthOfficialType>();
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const dataPerPage = 7;

  // Get current appointments for the page
  const indexOfLastData = currentTablePage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  // Calculate the number of pages
  const totalPages = dataPerPage
    ? Math.ceil(filteredData.length / dataPerPage)
    : filteredData.length;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentTablePage(pageNumber);
  };

  // Handle delete
  const handleDelete = async (item: HealthOfficialType) => {
    const data = filteredData.filter((p) => p.staffID !== item.staffID);

    toast.success("Health Official deleted successfully");

    setFilteredData(data);

    setDataToDelete(undefined);

    setOpenDeleteModal(false);
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
          {currentData.map((data) => (
            <TableRow key={data.staffID}>
              <TableCell className="text-secondary-gray flex items-center gap-2">
                <div className="flex items-center justify-center gap-2 h-10 w-10 rounded-full p-2 bg-primary-gray/10">
                  <p className="text-primary-green flex items-center gap-1 font-bold text-center">
                    <span>{data.firstName.charAt(0)}</span>
                    <span>{data.lastName.charAt(0)}</span>
                  </p>
                </div>
                <Link
                  href={`/dashboard/health-officials/${data.staffID.toLowerCase()}`}
                  className="hover:underline flex items-center gap-1"
                >
                  <span>{data.firstName}</span>
                  <span>{data.lastName}</span>
                </Link>
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.position}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.staffID}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.email}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.contactNumber}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.dateStarted}
              </TableCell>
              <TableCell className="flex items-center gap-3">
                <EditOfficial healthOfficial={data} />

                <Trash2
                  size={20}
                  className="text-primary-green cursor-pointer"
                  onClick={() => {
                    setDataToDelete(data);
                    setOpenDeleteModal(true);
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        title="Delete Staff"
        description="Are you sure you want to delete this health official information?"
        deleteFn={() => handleDelete(dataToDelete!)}
      />

      {/* Pagination */}
      {filteredData.length > 0 && (
        <GenerateTablePagination
          currentPage={currentTablePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GenerateHealthOfficialsTable;
