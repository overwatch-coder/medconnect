"use client";

import {
  deleteOutreachProgram,
  getAllOutreachPrograms,
} from "@/actions/outreach-programs.actions";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import OutreachProgramCard from "@/app/dashboard/outreach-programs/OutreachProgramCard";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";
import DeleteModal from "@/components/DeleteModal";
import { useFetch } from "@/hooks/useFetch";
import { IOutreachProgram } from "@/types/backend";
import { Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type OutreachProgramsWithSearchProps = {
  isAdmin: boolean;
};

type FilterOptions = {
  value: keyof IOutreachProgram;
  label: string;
};

const filterOptions: FilterOptions[] = [
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
  {
    value: "organization",
    label: "Organization",
  },
];

const OutreachProgramsWithSearch = ({
  isAdmin,
}: OutreachProgramsWithSearchProps) => {
  const {
    data: outreachPrograms,
    isLoading,
    refetch: refetchOutreachPrograms,
  } = useFetch<IOutreachProgram[]>({
    queryFn: async () => await getAllOutreachPrograms(),
    queryKey: ["outreach-programs"],
  });

  const [filterBy, setFilterBy] = useState("Program Name");
  const [filteredPrograms, setFilteredPrograms] = useState<IOutreachProgram[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [dataToDelete, setDataToDelete] = useState<IOutreachProgram>();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (outreachPrograms) {
      setFilteredPrograms(
        outreachPrograms.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    }
  }, [outreachPrograms]);

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!outreachPrograms) return;

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
  const handleDelete = async (item: IOutreachProgram) => {
    setPending(true);
    try {
      await deleteOutreachProgram(item._id);

      refetchOutreachPrograms();
      toast.success("Program deleted successfully");

      const data = filteredPrograms.filter((p) => p._id !== item._id);

      setFilteredPrograms(data);

      setDataToDelete(undefined);

      setOpenDeleteModal(false);
    } catch (error) {
      toast.error("Error deleting program");
    } finally {
      setPending(false);
    }
  };

  if (isLoading) {
    return <RenderEmptyComponent />;
  }

  return (
    <section className="bg-white rounded-md shadow w-full flex flex-col gap-5 p-5">
      <h2 className="text-secondary-gray text-xl font-medium">
        {isAdmin ? "All Programs" : "Upcoming"}
      </h2>

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
            className="bg-red-500 text-white hover:text-white rounded-md hover:bg-red-500 border-0"
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
            <OutreachProgramCard
              program={program}
              key={program._id}
              setPrograms={setFilteredPrograms}
            >
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
        pending={pending}
      />
    </section>
  );
};

export default OutreachProgramsWithSearch;
