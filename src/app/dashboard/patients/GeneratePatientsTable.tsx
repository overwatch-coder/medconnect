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
import { PatientsDataType } from "@/app/dashboard/patients/PatientsTable";
import { toast } from "react-toastify";
import DeleteModal from "@/components/DeleteModal";
import EditPatient from "@/app/dashboard/patients/edit-patients/EditPatient";
import Link from "next/link";
import GenerateTablePagination from "@/components/GenerateTablePagination";

const tableHeaderNames = [
  "Patient Name",
  "Age",
  "Gender",
  "Blood Group",
  "Phone Number",
  "Date Added",
];

const GeneratePatientsTable = ({
  filteredPatientsData,
  setFilteredPatientsData,
}: {
  filteredPatientsData: PatientsDataType[];
  setFilteredPatientsData: React.Dispatch<
    React.SetStateAction<PatientsDataType[]>
  >;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<PatientsDataType>();
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

  // Handle delete
  const handleDelete = async (patient: PatientsDataType) => {
    const data = filteredPatientsData.filter(
      (p) => p.patientID !== patient.patientID
    );

    toast.success("Patient deleted successfully");

    setFilteredPatientsData(data);

    setPatientToDelete(undefined);

    setOpenDeleteModal(false);
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
          {currentData.map((patient) => (
            <TableRow key={patient.patientName}>
              <TableCell className="text-secondary-gray flex items-center gap-2">
                <div className="flex items-center justify-center gap-2 h-10 w-10 rounded-full p-2 bg-primary-gray/10">
                  <p className="text-primary-green font-bold text-center">
                    {patient.patientName.split(" ")[0].charAt(0)}{" "}
                    {patient.patientName.split(" ")[1].charAt(0)}
                  </p>
                </div>
                <Link
                  href={`/dashboard/patients/${patient.patientID}`}
                  className="hover:underline"
                >
                  {patient.patientName}
                </Link>
              </TableCell>
              <TableCell className="text-secondary-gray">
                {patient.age}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {patient.gender}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {patient.bloodGroup}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {patient.phoneNumber}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {patient.dateAdded}
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
