"use client";

import React, { useState } from "react";
import { MEDCONNECT_SUPER_ADMIN_DASHBOARD_COMPOUNDS_WITH_ACTIONS as compoundsData } from "@/constants";
import { Edit, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import DeleteCompound from "@/app/dashboard/compounds/DeleteCompound";
import EditCompoundModal from "@/app/dashboard/compounds/EditCompound";
import { useRouter } from "next/navigation";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";

export type CompoundsDataType = {
  compoundName: string;
  compoundId: string;
  location: string;
  region: string;
};

const CompoundsTable = () => {
  const [filterBy, setFilterBy] = useState("Region");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompoundsData, setFilteredCompoundsData] =
    useState<CompoundsDataType[]>(compoundsData);

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = compoundsData.filter((compounds) =>
      compounds.compoundName
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilteredCompoundsData(filtered);
  };

  // Handle filter
  const handleFilter = (value: string) => {
    const filterValue = value.split("|")[0];
    const filterName = value.split("|")[1];

    setFilterBy(filterName);

    const filtered = filteredCompoundsData.sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) {
        return -1;
      }
      if (a[filterValue] > b[filterValue]) {
        return 1;
      }
      return 0;
    });

    setFilteredCompoundsData(filtered);
  };

  const filterOptions: {
    value: keyof CompoundsDataType;
    label: string;
  }[] = [
    {
      value: "compoundName",
      label: "Compound Name",
    },
    {
      value: "compoundId",
      label: "Compound ID",
    },
    {
      value: "location",
      label: "Location",
    },
    {
      value: "region",
      label: "Region",
    },
  ];

  return (
    <section className="flex flex-col rounded w-full">
      <div className="flex items-center gap-5 justify-between bg-secondary-gray/10 py-3 px-2 md:px-5">
        <div className="flex items-center gap-2 relative w-full md:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search compounds"
            className="w-full rounded-md border bg-white border-secondary-gray px-3 py-2 outline-none"
          />
          <Search
            size={15}
            className="text-secondary-gray absolute right-3 top-3"
          />
        </div>

        <CustomFilterDropdown
          filterBy={filterBy}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
          filterName="Sort by"
          className="rounded bg-red-500 hover:bg-red-500 border-0 hover:text-white text-white"
          iconClassName="text-white"
        />
      </div>

      <div className="flex flex-col gap-7 pb-5 bg-white max-h-screen h-full overflow-y-scroll scrollbar-hide">
        <GetCompoundsTable
          setFilteredCompoundsData={setFilteredCompoundsData}
          filteredCompoundsData={filteredCompoundsData}
        />

        {filteredCompoundsData.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-secondary-gray text-lg font-bold text-center">
              No compounds found
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompoundsTable;

// Compounds Table
type CompoundsTableProps = {
  filteredCompoundsData: CompoundsDataType[];
  setFilteredCompoundsData: React.Dispatch<
    React.SetStateAction<CompoundsDataType[]>
  >;
};

const GetCompoundsTable = ({
  filteredCompoundsData,
  setFilteredCompoundsData,
}: CompoundsTableProps) => {
  const router = useRouter();
  const [markedCompoundIds, setMarkedCompoundIds] = useState<string[]>([]);
  const [editCompoundModal, setEditCompoundModal] = useState(false);
  const [editCompoundId, setEditCompoundId] = useState("");

  // handle mark compound
  const handleMarkCompound = (id: string) => {
    if (markedCompoundIds.includes(id)) {
      setMarkedCompoundIds(markedCompoundIds.filter((item) => item !== id));
    } else {
      setMarkedCompoundIds([...markedCompoundIds, id]);
    }
  };

  // handle select all compounds
  const handleSelectAll = () => {
    if (markedCompoundIds.length === filteredCompoundsData.length) {
      setMarkedCompoundIds([]);
    } else {
      setMarkedCompoundIds(
        filteredCompoundsData.map((data) => data.compoundId)
      );
    }
  };

  // handle delete compounds
  const handleDelete = (compoundId: string) => {
    if (filteredCompoundsData.length === 0) {
      return;
    }

    if (filteredCompoundsData.length === markedCompoundIds.length) {
      setFilteredCompoundsData([]);
      return;
    }

    setFilteredCompoundsData(
      filteredCompoundsData.filter((data) => data.compoundId !== compoundId)
    );
    setMarkedCompoundIds([]);
  };

  return (
    <Table className="scrollbar-hide">
      <TableHeader>
        <TableRow className="bg-primary-green hover:bg-primary-green w-full">
          <TableHead
            onClick={handleSelectAll}
            className="text-white flex items-center gap-2"
          >
            {markedCompoundIds.length === filteredCompoundsData.length ? (
              <GrCheckboxSelected
                size={15}
                className="text-white cursor-pointer"
              />
            ) : (
              <GrCheckbox size={15} className="text-white cursor-pointer" />
            )}
            <span>Compound Name</span>
          </TableHead>
          <TableHead className="text-white">Compound ID</TableHead>
          <TableHead className="text-white">Location</TableHead>
          <TableHead className="text-white">Region</TableHead>
          <TableHead className="text-white">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="scrollbar-hide">
        {filteredCompoundsData.map((data, idx) => (
          <TableRow key={idx}>
            <TableCell className="text-secondary-gray font-semibold flex items-center gap-2">
              <span
                onClick={() => handleMarkCompound(data.compoundId)}
                className="cursor-pointer"
              >
                {markedCompoundIds.includes(data.compoundId) ? (
                  <GrCheckboxSelected
                    size={15}
                    className="text-secondary-gray cursor-pointer flex items-center gap-2"
                  />
                ) : (
                  <GrCheckbox
                    size={15}
                    className="text-secondary-gray cursor-pointer flex items-center gap-2"
                  />
                )}
              </span>
              <span
                onClick={() =>
                  router.push(`/dashboard/compounds/${data.compoundId}`)
                }
                className="hover:underline cursor-pointer"
              >
                {data.compoundName}
              </span>
            </TableCell>
            <TableCell className="text-secondary-gray font-semibold">
              {data.compoundId}
            </TableCell>
            <TableCell className="text-secondary-gray font-semibold">
              {data.location}
            </TableCell>
            <TableCell className="text-secondary-gray font-semibold">
              {data.region}
            </TableCell>
            <TableCell className="flex items-center gap-4">
              <Edit
                onClick={() => {
                  setEditCompoundId(data.compoundId);
                  setEditCompoundModal(true);
                }}
                size={15}
                className="text-secondary-gray cursor-pointer"
              />
              <DeleteCompound
                compoundId={data.compoundId}
                handleDelete={handleDelete}
                markedCompoundIds={markedCompoundIds}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <EditCompoundModal
        setShowEditCompoundModal={setEditCompoundModal}
        openModal={editCompoundModal}
        compoundId={editCompoundId}
        setEditCompoundId={setEditCompoundId}
      />
    </Table>
  );
};
