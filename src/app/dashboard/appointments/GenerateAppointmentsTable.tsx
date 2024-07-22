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
import EditAppointment from "@/app/dashboard/appointments/EditAppointment";
import RescheduleAppointment from "@/app/dashboard/appointments/RescheduleAppointment";
import DeleteModal from "@/components/DeleteModal";
import { toast } from "react-toastify";
import GenerateTablePagination from "@/components/GenerateTablePagination";
import { IAppointment } from "@/types/backend";
import { deleteAppointment } from "@/actions/single-patient.action";

const tableHeaderNames = [
  "Time",
  "Date",
  "Patient Name",
  "Patient ID",
  "Phone Number",
  "Assigned HO",
];

type AppointmentsCommonTableProps = {
  filteredAppointmentsData: IAppointment[];
  setFilteredAppointmentsData: React.Dispatch<
    React.SetStateAction<IAppointment[]>
  >;
  refetchAppointments: () => void;
};

const GenerateAppointmentsTable = ({
  filteredAppointmentsData,
  setFilteredAppointmentsData,
  refetchAppointments,
}: AppointmentsCommonTableProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openRescheduleModal, setOpenRescheduleModal] = useState(false);

  const [appointmentToDelete, setAppointmentToDelete] =
    useState<IAppointment>();
  const [pending, setPending] = useState(false);

  const [currentTablePage, setCurrentTablePage] = useState(1);
  const dataPerPage = 7;

  // Get current appointments for the page
  const indexOfLastData = currentTablePage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredAppointmentsData.slice(
    indexOfFirstData,
    indexOfLastData
  );

  // Calculate the number of pages
  const totalPages = dataPerPage
    ? Math.ceil(filteredAppointmentsData.length / dataPerPage)
    : filteredAppointmentsData.length;

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentTablePage(pageNumber);
  };

  // Handle delete
  const handleDelete = async (appointment: IAppointment) => {
    setPending(true);
    await deleteAppointment(appointment.patientId, appointment._id);

    setFilteredAppointmentsData(
      filteredAppointmentsData.filter((item) => item._id !== appointment._id)
    );

    refetchAppointments();

    setAppointmentToDelete(undefined);

    setOpenDeleteModal(false);

    setPending(false);

    toast.success("Appointment deleted successfully");
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
          {currentData.map((appointment, index) => (
            <TableRow key={index}>
              <TableCell className="text-secondary-gray flex items-center gap-2">
                {new Date(appointment.date).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {new Date(appointment.date).toISOString().split("T")[0]}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {`${appointment.patient.firstName} ${appointment.patient.lastName}`}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {appointment.patient.patientId}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {appointment.patient.contact}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {appointment.official}
              </TableCell>
              <TableCell className="flex items-center gap-3">
                <EditAppointment
                  appointment={appointment}
                  refetchAppointments={refetchAppointments}
                  open={openEditModal}
                  setOpen={setOpenEditModal}
                />

                <Trash2
                  size={20}
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    setAppointmentToDelete(appointment);
                    setOpenDeleteModal(true);
                  }}
                />

                <RescheduleAppointment
                  appointment={appointment}
                  refetchAppointments={refetchAppointments}
                  open={openRescheduleModal}
                  setOpen={setOpenRescheduleModal}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        title="Delete Appointment"
        description="Are you sure you want to delete this appointment?"
        deleteFn={() => handleDelete(appointmentToDelete!)}
        pending={pending}
      />

      {/* Pagination */}
      {filteredAppointmentsData.length > 0 && (
        <GenerateTablePagination
          currentPage={currentTablePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default GenerateAppointmentsTable;
