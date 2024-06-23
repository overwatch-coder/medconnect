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
import { MEDCONNECT_DASHBOARD_PATIENT_VISIT_LOGS as visitLogsData } from "@/constants";
import GenerateVisitLogsTable from "@/app/dashboard/patients/[patientId]/visit-logs/GenerateVisitLogsTable";

export type VisitLogsDataType = (typeof visitLogsData)[number];

const VisitLogsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVisitLogs, setFilterVisitLogs] =
    useState<VisitLogsDataType[]>(visitLogsData);
  const [filterBy, setFilterBy] = useState("Date");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = visitLogsData.filter(
      (log) =>
        log.logID.toLowerCase().includes(e.target.value.toLowerCase()) ||
        log.visitPurpose.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterVisitLogs(filtered);
  };

  // Handle filter
  const handleFilter = (value: string) => {
    const filterValue = value.split("|")[0];
    const filterName = value.split("|")[1];

    setFilterBy(filterName);

    const filtered = filterVisitLogs.sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) {
        return -1;
      }
      if (a[filterValue] > b[filterValue]) {
        return 1;
      }
      return 0;
    });

    setFilterVisitLogs(filtered);
    setSearchTerm("");
  };

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

        <FilterMenuDropDown filterBy={filterBy} handleFilter={handleFilter} />
      </div>

      <div className="flex flex-col gap-7 px-3 py-5 bg-white h-[90vh] scrollbar-hide overflow-y-scroll w-full">
        <GenerateVisitLogsTable filteredVisitLogsData={filterVisitLogs} />

        {filterVisitLogs.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-secondary-gray text-lg font-bold text-center">
              No visit logs found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitLogsTable;

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
          className="flex items-center gap-2 bg-white rounded-2xl sm:px-5 border border-secondary-gray py-2 text-secondary-gray hover:bg-white hover:text-secondary-gray outline-none focus:outline-none ring-0 focus:ring-0 w-full sm:w-fit"
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
          <DropdownMenuRadioItem value="logID|Log ID">
            Log ID
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="visitDate|Date Of Visit">
            Date Of Visit
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="visitTime|Time of Visit">
            Time of Visit
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="visitPurpose|Purpose of Visit">
            Purpose of Visit
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="attendingHO|Attending H.O">
            Attending H.O
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="notes|Notes">
            Notes
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
