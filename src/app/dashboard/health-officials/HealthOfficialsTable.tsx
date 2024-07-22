"use client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";
import GenerateHealthOfficialsTable from "@/app/dashboard/health-officials/GenerateHealthOfficialsTable";
import { useFetch } from "@/hooks/useFetch";
import { getStaffByCompoundId } from "@/actions/staff.action";
import { useAuth } from "@/hooks";
import { IStaff } from "@/types/backend";
import { ClipLoader } from "react-spinners";

const HealthOfficialsTable = () => {
  const [user] = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("Position");
  const [filteredData, setFilteredData] = useState<IStaff[]>([]);

  const { data: healthOfficials, isLoading } = useFetch({
    queryFn: async () =>
      getStaffByCompoundId(user?.staff?.chpsCompoundId as string),
    queryKey: ["staff", user?.staff?.chpsCompoundId!],
  });

  useEffect(() => {
    if (healthOfficials) {
      setFilteredData(healthOfficials);
    }
  }, [healthOfficials]);

  if (isLoading) {
    return (
      <RenderEmptyComponent>
        <ClipLoader size={100} color="#2d4763" loading={isLoading} />
      </RenderEmptyComponent>
    );
  }

  if (!healthOfficials) {
    return (
      <RenderEmptyComponent>
        <p className="text-secondary-gray text-xl font-bold text-center">
          No health officials found
        </p>
      </RenderEmptyComponent>
    );
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = healthOfficials.filter(
      (data) =>
        data.fullName.toLowerCase().includes(term) ||
        data.position.toLowerCase().includes(term) ||
        data.staffId.toLowerCase().includes(term)
    );

    setFilteredData(filtered);
  };

  const handleFilter = (value: string) => {
    const [filterValue, filterName] = value.split("|");

    setFilterBy(filterName);

    const sorted = [...filteredData].sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) return -1;
      if (a[filterValue] > b[filterValue]) return 1;
      return 0;
    });

    setFilteredData(sorted);
    setSearchTerm("");
  };

  const filterOptions: { value: keyof IStaff; label: string }[] = [
    { value: "fullName", label: "Full Name" },
    { value: "position", label: "Position" },
    { value: "staffId", label: "Staff ID" },
    { value: "email", label: "Email" },
    { value: "contact", label: "Contact Number" },
    { value: "dateOfHire", label: "Date Started" },
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
        <GenerateHealthOfficialsTable filteredData={filteredData} />

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

export const RenderEmptyComponent = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col py-10 items-center justify-center h-full w-full mx-auto">
      {children ? (
        children
      ) : (
        <ClipLoader color="#2d4763" loading={true} size={25} />
      )}
    </div>
  );
};
