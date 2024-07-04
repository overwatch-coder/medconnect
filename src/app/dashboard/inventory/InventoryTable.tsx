"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import { MEDCONNECT_DASHBOARD_PATIENTS_INVENTORY as inventoryData } from "@/constants";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";
import GenerateInventoryTable from "@/app/dashboard/inventory/GenerateInventoryTable";

export type InventoryDataType = (typeof inventoryData)[number];

const InventoryTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [filteredInventory, setFilteredInventory] =
    useState<InventoryDataType[]>(inventoryData);
  const [filterBy, setFilterBy] = useState({
    1: "Expiry Date",
    2: "Product Type",
    3: "In Stock",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = inventoryData.filter(
      (data) =>
        data.productName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.productType.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.manufacturer.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredInventory(filtered);
  };

  // Handle filter
  const handleFilter = (value: string, index?: number) => {
    const filterValue = value.split("|")[0];
    const filterName = value.split("|")[1];

    setFilterBy((prev) => ({ ...prev, [index!]: filterName }));

    const filtered = filteredInventory.sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) {
        return -1;
      }
      if (a[filterValue] > b[filterValue]) {
        return 1;
      }
      return 0;
    });

    setFilteredInventory(filtered);
    setSearchTerm("");
  };

  return (
    <div className="w-full flex flex-col gap-5 px-5 py-5">
      <InventoryCommonTable
        filteredInventory={filteredInventory}
        searchTerm={searchTerm}
        filterBy={filterBy}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        setFilteredInventory={setFilteredInventory}
      />
    </div>
  );
};

export default InventoryTable;

const filterOptions: {
  value: keyof InventoryDataType;
  label: string;
}[] = [
  {
    value: "expiryDate",
    label: "Expiry Date",
  },
  {
    value: "productType",
    label: "Product Type",
  },
  {
    value: "inStock",
    label: "In Stock",
  },
  {
    value: "productName",
    label: "Product Name",
  },
  {
    value: "manufacturer",
    label: "Manufacturer",
  },
  {
    value: "receivedDate",
    label: "Received Date",
  },
];

type InventoryCommonTableProps = {
  filteredInventory: InventoryDataType[];
  searchTerm: string;
  filterBy: { 1: string; 2: string; 3: string };
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilter: (value: string, index?: number) => void;
  setFilteredInventory: React.Dispatch<
    React.SetStateAction<InventoryDataType[]>
  >;
};

const InventoryCommonTable = ({
  filteredInventory,
  searchTerm,
  filterBy,
  handleSearch,
  handleFilter,
  setFilteredInventory,
}: InventoryCommonTableProps) => {
  return (
    <>
      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center gap-5 w-fit pt-5">
        <div className="flex items-center gap-3 relative rounded-full bg-primary-green/10 px-5 py-2 text-primary-gray">
          <Search
            className="text-secondary-gray absolute top-3 left-5"
            size={20}
          />

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            className="w-full px-7 text-sm py-1 bg-transparent rounded-md outline-none border-0"
            onChange={handleSearch}
          />
        </div>

        <CustomFilterDropdown
          filterBy={filterBy[1]}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
          index={1}
        />

        <CustomFilterDropdown
          filterBy={filterBy[2]}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
          index={2}
        />

        <CustomFilterDropdown
          filterBy={filterBy[3]}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
          index={3}
        />
      </div>

      <div className="flex flex-col gap-7 px-3 py-5 bg-white h-full w-full">
        <GenerateInventoryTable
          filteredData={filteredInventory}
          setFilteredData={setFilteredInventory}
        />

        {filteredInventory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-secondary-gray text-lg font-bold text-center">
              No inventory found
            </p>
          </div>
        )}
      </div>
    </>
  );
};
