"use client";

import OutreachProgramCard from "@/app/dashboard/outreach-programs/OutreachProgramCard";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";
import DeleteModal from "@/components/DeleteModal";
import { OutreachProgramType } from "@/types/index";
import { Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

type OutreachProgramsWithSearchProps = {
  outreachPrograms: OutreachProgramType[];
  isAdmin: boolean;
};

type FilterOptions = {
  value: keyof OutreachProgramType | "category";
  label: string;
};

const filterOptions: FilterOptions[] = [
  {
    value: "category",
    label: "Category",
  },
  {
    value: "title",
    label: "Program Name",
  },
  {
    value: "location",
    label: "Location",
  },
  {
    value: "programDate",
    label: "Program Date",
  },
  {
    value: "targetGroup",
    label: "Target Group",
  },
];

const OutreachProgramsWithSearch = ({
  outreachPrograms,
  isAdmin,
}: OutreachProgramsWithSearchProps) => {
  const [filterBy, setFilterBy] = useState("Category");
  const [filteredPrograms, setFilteredPrograms] = useState(outreachPrograms);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<OutreachProgramType>();

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    const filtered = outreachPrograms.filter((program) =>
      program.title.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredPrograms(filtered);
  };

  // Handle filter
  const handleFilter = (value: string) => {
    const filterValue = value.split("|")[0];
    const filterName = value.split("|")[1];

    setFilterBy(filterName);

    const filtered = filteredPrograms.sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) {
        return -1;
      }
      if (a[filterValue] > b[filterValue]) {
        return 1;
      }
      return 0;
    });

    setFilteredPrograms(filtered);
  };

  // Handle delete
  const handleDelete = async (item: OutreachProgramType) => {
    const data = filteredPrograms.filter((p) => p.id !== item.id);

    toast.success("Program deleted successfully");

    setFilteredPrograms(data);

    setDataToDelete(undefined);

    setOpenDeleteModal(false);
  };

  return (
    <>
      {isAdmin && (
        <div className="flex items-center gap-5 justify-between bg-secondary-gray/10 py-3 px-2 md:px-5">
          <div className="flex items-center gap-2 relative w-full md:w-1/2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by program name or upcoming"
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
            className="bg-red-500 text-white rounded-md hover:bg-red-500 border-0"
            iconClassName="text-white"
          />
        </div>
      )}

      {/* Outreach Programs */}
      <div className="flex flex-col gap-5 w-full h-full">
        {filteredPrograms.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 h-full w-full">
            <p className="text-secondary-gray font-semibold">
              No programs found.
            </p>
          </div>
        ) : (
          filteredPrograms.map((program) => (
            <OutreachProgramCard program={program} key={program.id}>
              <Trash2
                onClick={() => {
                  setDataToDelete(program);
                  setOpenDeleteModal(true);
                }}
                size={20}
                className="text-red-500 cursor-pointer"
              />
            </OutreachProgramCard>
          ))
        )}
      </div>

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        title="Delete Program"
        description="Are you sure you want to delete this program?"
        deleteFn={() => handleDelete(dataToDelete!)}
      />
    </>
  );
};

export default OutreachProgramsWithSearch;
