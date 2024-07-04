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
import DeleteModal from "@/components/DeleteModal";
import { toast } from "react-toastify";
import EditInventory from "@/app/dashboard/inventory/EditInventory";
import { InventoryDataType } from "@/app/dashboard/inventory/InventoryTable";
import GenerateTablePagination from "@/components/GenerateTablePagination";

const tableHeaderNames = [
  "Product Name",
  "Type",
  "In Stock",
  "Received Date",
  "Expiry Date",
  "Manufacturer",
];

const GenerateInventoryTable = ({
  filteredData,
  setFilteredData,
}: {
  filteredData: InventoryDataType[];
  setFilteredData: React.Dispatch<React.SetStateAction<InventoryDataType[]>>;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<InventoryDataType>();

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
  const handleDelete = async (item: InventoryDataType) => {
    const data = filteredData.filter((p) => p.id !== item.id);

    setFilteredData(data);

    setDataToDelete(undefined);

    setOpenDeleteModal(false);

    toast.success("Product deleted successfully");
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
          {currentData.map((data, index) => (
            <TableRow key={index}>
              <TableCell className="text-secondary-gray flex items-center gap-2">
                {data.productName}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.productType}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.inStock}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.receivedDate}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.expiryDate}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {data.manufacturer}
              </TableCell>
              <TableCell className="flex items-center gap-3">
                <EditInventory inventory={data} />

                <Trash2
                  size={20}
                  className="text-red-500 cursor-pointer"
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
        title="Delete Product"
        description="Are you sure you want to delete this product from the inventory?"
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

export default GenerateInventoryTable;
