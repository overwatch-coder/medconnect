"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { MEDCONNECT_DASHBOARD_PATIENTS as patientsData } from "@/constants";
import GeneratePatientsTable from "@/app/dashboard/patients/GeneratePatientsTable";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";
import { Patient } from "@/types/backend";
import { useFetch } from "@/hooks/useFetch";
import { getPatients } from "@/actions/patients.action";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import { ClipLoader } from "react-spinners";

export type PatientsDataType = (typeof patientsData)[number];

const PatientsTable = () => {
  const { data: patientData, ...query } = useFetch<Patient[]>({
    queryKey: ["patients"],
    queryFn: async () => await getPatients(),
  });

  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("Patient Name");

  useEffect(() => {
    if (patientData) {
      setFilteredPatients(patientData);
    }
  }, [patientData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setFilteredPatients(patientData!);
      return;
    }

    const filtered = patientData!.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(term) ||
        patient.lastName.toLowerCase().includes(term)
    );

    setFilteredPatients(filtered);
  };

  const handleFilter = (value: string) => {
    const [filterValue, filterName] = value.split("|");

    setFilterBy(filterName);

    const sorted = [...filteredPatients].sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) return -1;
      if (a[filterValue] > b[filterValue]) return 1;
      return 0;
    });

    setFilteredPatients(sorted);
    setSearchTerm("");
  };

  const filterOptions: { value: keyof Patient; label: string }[] = [
    { value: "firstName", label: "First Name" },
    { value: "location", label: "Location" },
    { value: "gender", label: "Gender" },
    { value: "lastName", label: "Last Name" },
    { value: "contact", label: "Contact" },
    { value: "createdAt", label: "Date Added" },
  ];

  if (query.isLoading) {
    return (
      <RenderEmptyComponent>
        <ClipLoader size={100} color="#2d4763" loading={query.isLoading} />
      </RenderEmptyComponent>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5 px-5 py-5">
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
          filteredPatientsData={filteredPatients}
          setFilteredPatientsData={setFilteredPatients}
        />

        {filteredPatients.length === 0 && (
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
