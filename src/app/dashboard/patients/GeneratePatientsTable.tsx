"use client";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "react-toastify";
import DeleteModal from "@/components/DeleteModal";
import EditPatient from "@/app/dashboard/patients/edit-patients/EditPatient";
import Link from "next/link";
import GenerateTablePagination from "@/components/GenerateTablePagination";
import { Patient } from "@/types/backend";
import { deletePatient } from "@/actions/patients.action";
import { useRouter } from "next/navigation";
import dobToAge from "dob-to-age";
import { useMutateData } from "@/hooks/useFetch";

const tableHeaderNames = [
  "Patient Name",
  "Age",
  "Gender",
  "Blood Group",
  "Phone Number",
  "Date Added",
];

type PatientsTableProps = {
  filteredPatientsData: Patient[];
  setFilteredPatientsData: React.Dispatch<React.SetStateAction<Patient[]>>;
};

const GeneratePatientsTable = ({
  filteredPatientsData,
  setFilteredPatientsData,
}: PatientsTableProps) => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient>();
  const [currentTablePage, setCurrentTablePage] = useState(1);
  const dataPerPage = 7;

  // Get current appointments for the page
  const indexOfLastData = currentTablePage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredPatientsData.slice(
    indexOfFirstData,
    indexOfLastData
  );

  // Calculate the number of pages
  const totalPages = dataPerPage
    ? Math.ceil(filteredPatientsData.length / dataPerPage)
    : filteredPatientsData.length;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentTablePage(pageNumber);
  };

  // delete patient mutation

  const { mutateAsync, isPending: pending } = useMutateData({
    mutationFn: async (patientId: string) => deletePatient(patientId),
    config: {
      queryKey: ["patients"],
    },
    notificationData: {
      type: "Patient Deletion",
      title: "Patient has been deleted",
      description: `A patient has been deleted from the system successfully`,
    },
  });

  // Handle delete
  const handleDelete = async (patient: Patient) => {
    const res = await mutateAsync(patient._id);

    toast.success("Patient deleted successfully");
    setFilteredPatientsData(
      filteredPatientsData.filter((p) => p._id !== patient._id)
    );
    setPatientToDelete(undefined);
    setOpenDeleteModal(false);
    router.refresh();
  };

  return (
    <div className="py-2 w-full">
      <Table className="w-full overflow-x-scroll scrollbar-hide">
        <TableHeader>
          <TableRow>
            {tableHeaderNames.map((table, index) => (
              <TableHead key={index} className="text-primary-gray/40">
                <p className="flex flex-row items-center gap-1 md:gap-0 md:justify-between">
                  <span>{table}</span>

                  <span className="text-primary-gray/40 flex-col hidden sm:flex">
                    <IoMdArrowDropup
                      size={15}
                      className="cursor-pointer text-primary-gray"
                      onClick={() => {
                        console.log("Sorting");
                      }}
                    />

                    <IoMdArrowDropdown
                      size={15}
                      className="cursor-pointer text-primary-gray/30"
                      onClick={() => {
                        console.log("Sorting");
                      }}
                    />
                  </span>
                </p>
              </TableHead>
            ))}
            <TableHead className="text-primary-gray/40">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="w-full">
          {currentData
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((patient) => (
              <TableRow key={patient._id}>
                <TableCell className="text-secondary-gray flex items-center gap-2">
                  <div className="flex items-center justify-center gap-2 h-10 w-10 rounded-full p-2 bg-primary-gray/10">
                    <p className="text-primary-green font-bold text-center">
                      {patient.firstName.charAt(0)} {patient.lastName.charAt(0)}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/patients/${patient._id}`}
                    className="hover:underline capitalize"
                  >
                    {patient.firstName} {patient.lastName}
                  </Link>
                </TableCell>
                <TableCell className="text-secondary-gray">
                  {dobToAge(patient.dateOfBirth)}
                </TableCell>
                <TableCell className="text-secondary-gray">
                  {patient.gender}
                </TableCell>
                <TableCell className="text-secondary-gray">
                  {patient.additional?.bloodGroup}
                </TableCell>
                <TableCell className="text-secondary-gray">
                  {patient.contact}
                </TableCell>
                <TableCell className="text-secondary-gray">
                  {patient.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="flex items-center gap-3">
                  <EditPatient patient={patient} />

                  <Trash2
                    size={20}
                    className="text-primary-green cursor-pointer"
                    onClick={() => {
                      setPatientToDelete(patient);
                      setOpenDeleteModal(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        title="Delete Patient"
        description="Are you sure you want to delete this patient from the system?"
        deleteFn={() => handleDelete(patientToDelete!)}
        pending={pending}
      />

      {/* Pagination */}
      {filteredPatientsData.length > 0 && (
        <GenerateTablePagination
          currentPage={currentTablePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GeneratePatientsTable;
