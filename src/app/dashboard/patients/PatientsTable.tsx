"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { MEDCONNECT_DASHBOARD_PATIENTS as patientsData } from "@/constants";
import GeneratePatientsTable from "@/app/dashboard/patients/GeneratePatientsTable";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";

export type PatientsDataType = (typeof patientsData)[number];

const PatientsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPatients, setFilterPatients] =
    useState<PatientsDataType[]>(patientsData);
  const [filterBy, setFilterBy] = useState("Patient Name");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = patientsData.filter((patient) =>
      patient.patientName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterPatients(filtered);
  };

  // Handle filter
  const handleFilter = (value: string) => {
    const filterValue = value.split("|")[0];
    const filterName = value.split("|")[1];

    setFilterBy(filterName);

    const filtered = filterPatients.sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) {
        return -1;
      }
      if (a[filterValue] > b[filterValue]) {
        return 1;
      }
      return 0;
    });

    setFilterPatients(filtered);
    setSearchTerm("");
  };

  const filterOptions: {
    value: keyof PatientsDataType;
    label: string;
  }[] = [
    {
      value: "patientName",
      label: "Patient Name",
    },
    {
      value: "age",
      label: "Age",
    },
    {
      value: "gender",
      label: "Gender",
    },
    {
      value: "bloodGroup",
      label: "Blood Group",
    },
    {
      value: "phoneNumber",
      label: "Phone Number",
    },
    {
      value: "dateAdded",
      label: "Date Added",
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
        <GeneratePatientsTable
          filteredPatientsData={filterPatients}
          setFilteredPatientsData={setFilterPatients}
        />

        {filterPatients.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-secondary-gray text-lg font-bold text-center">
              No patients found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsTable;
