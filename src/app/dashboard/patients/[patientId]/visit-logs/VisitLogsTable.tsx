"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MEDCONNECT_DASHBOARD_PATIENT_VISIT_LOGS as visitLogsData } from "@/constants";
import GenerateVisitLogsTable from "@/app/dashboard/patients/[patientId]/visit-logs/GenerateVisitLogsTable";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";
import { IVisitLogs, Patient } from "@/types/backend";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import { ClipLoader } from "react-spinners";

export type VisitLogsDataType = (typeof visitLogsData)[number];

type VisitLogsTableProps = {
  isLoading: boolean;
  visitLogs: IVisitLogs[] | undefined;
};

const VisitLogsTable = ({ visitLogs, isLoading }: VisitLogsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVisitLogs, setFilterVisitLogs] = useState<IVisitLogs[]>([]);
  const [filterBy, setFilterBy] = useState("Date");

  useEffect(() => {
    if (visitLogs) {
      setFilterVisitLogs(visitLogs);
    }
  }, [visitLogs]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!visitLogs) return;

    setSearchTerm(e.target.value);
    const filtered = visitLogs.filter(
      (log) =>
        log.visitLogId.toLowerCase().includes(e.target.value.toLowerCase()) ||
        log.purpose.toLowerCase().includes(e.target.value.toLowerCase())
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

  const filterOptions: {
    value: keyof IVisitLogs;
    label: string;
  }[] = [
    {
      value: "visitLogId",
      label: "Log ID",
    },
    {
      value: "date",
      label: "Date Of Visit",
    },
    {
      value: "date",
      label: "Time of Visit",
    },
    {
      value: "purpose",
      label: "Purpose of Visit",
    },
    {
      value: "official",
      label: "Attending H.O",
    },
    {
      value: "notes",
      label: "Notes",
    },
  ];

  if (isLoading) {
    return (
      <RenderEmptyComponent>
        <ClipLoader color="#2d4763" loading={isLoading} size={25} />
      </RenderEmptyComponent>
    );
  }

  if (!visitLogs) {
    return (
      <RenderEmptyComponent>
        <p>No visit logs found. Please try again later.</p>
      </RenderEmptyComponent>
    );
  }

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
