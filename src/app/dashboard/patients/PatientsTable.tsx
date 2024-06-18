"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import { MEDCONNECT_DASHBOARD_PATIENTS as patientsData } from "@/constants";
import GeneratePatientsTable from "@/app/dashboard/patients/GeneratePatientsTable";

export type PatientsDataType = {
  patientName: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phoneNumber: string;
  dateAdded: string;
  image: string;
};

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

  return (
    <div className="w-full flex flex-col gap-5 px-5 py-5">
      {/* Filter and Search */}
      <div className="flex items-center gap-5">
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

        <FilterMenuDropDown filterBy={filterBy} handleFilter={handleFilter} />
      </div>

      <div className="flex flex-col gap-7 px-3 py-5 bg-white h-full">
        <GeneratePatientsTable filteredPatientsData={filterPatients} />

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

// Filter Component
type FilterMenuDropDownProps = {
  filterBy: string;
  handleFilter: (value: string) => void;
};

const FilterMenuDropDown = ({
  filterBy,
  handleFilter,
}: FilterMenuDropDownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpenDropdown(!openDropdown)}
          className="flex items-center gap-2 bg-white rounded-2xl px-5 border border-secondary-gray py-2 text-secondary-gray hover:bg-white hover:text-secondary-gray outline-none focus:outline-none ring-0 focus:ring-0"
        >
          <span>Filter by {filterBy}</span>
          {openDropdown ? (
            <BiUpArrow size={15} className="text-secondary-gray" />
          ) : (
            <BiDownArrow size={15} className="text-secondary-gray" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-full">
        <DropdownMenuRadioGroup value={filterBy} onValueChange={handleFilter}>
          <DropdownMenuRadioItem value="patientName|Patient Name">
            Patient Name
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="age|Age">Age</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="gender|Gender">
            Gender
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bloodGroup|Blood Group">
            Blood Group
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="phoneNumber|Phone Number">
            Phone Number
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dateAdded|Date Added">
            Date Added
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
