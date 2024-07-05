"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { MEDCONNECT_DASHBOARD_PATIENTS_HEALTH_OFFICIALS as healthOfficials } from "@/constants";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";
import { HealthOfficialType } from "@/types/index";
import GenerateHealthOfficialsTable from "@/app/dashboard/health-officials/GenerateHealthOfficialsTable";

const HealthOfficialsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] =
    useState<HealthOfficialType[]>(healthOfficials);
  const [filterBy, setFilterBy] = useState("Position");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = healthOfficials.filter(
      (data) =>
        data.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        data.staffID.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  // Handle filter
  const handleFilter = (value: string) => {
    const filterValue = value.split("|")[0];
    const filterName = value.split("|")[1];

    setFilterBy(filterName);

    const filtered = filteredData.sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) {
        return -1;
      }
      if (a[filterValue] > b[filterValue]) {
        return 1;
      }
      return 0;
    });

    setFilteredData(filtered);
    setSearchTerm("");
  };

  const filterOptions: {
    value: keyof HealthOfficialType;
    label: string;
  }[] = [
    {
      value: "firstName",
      label: "First Name",
    },
    {
      value: "lastName",
      label: "Last Name",
    },
    {
      value: "position",
      label: "Position",
    },
    {
      value: "staffID",
      label: "Staff ID",
    },
    {
      value: "email",
      label: "Email",
    },
    {
      value: "contactNumber",
      label: "Contact Number",
    },
    {
      value: "dateStarted",
      label: "Date Started",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 px-5 py-5">
      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-5 w-fit">
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
          filterBy={filterBy}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
        />
      </div>

      <div className="flex flex-col gap-7 px-3 py-5 bg-white h-full w-full">
        <GenerateHealthOfficialsTable
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />

        {filteredData.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-secondary-gray text-lg font-bold text-center">
              No health officials found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthOfficialsTable;
