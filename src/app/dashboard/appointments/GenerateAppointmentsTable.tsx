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
import { MEDCONNECT_DASHBOARD_APPOINTEMENTS as appointmentsData } from "@/constants";
import { AppointmentsDataType } from "@/app/dashboard/appointments/AppointmentsTable";
import EditAppointment from "@/app/dashboard/appointments/EditAppointment";
import RescheduleAppointment from "@/app/dashboard/appointments/RescheduleAppointment";
import DeleteModal from "@/components/DeleteModal";
import { toast } from "react-toastify";
import GenerateTablePagination from "@/components/GenerateTablePagination";

const tableHeaderNames = [
  "Time",
  "Date",
  "Patient Name",
  "Age",
  "Phone Number",
  "Assigned HO",
];

const GenerateAppointmentsTable = ({
  filteredAppointmentsData,
  setFilteredAppointmentsData,
}: {
  filteredAppointmentsData: AppointmentsDataType[];
  setFilteredAppointmentsData: React.Dispatch<
    React.SetStateAction<AppointmentsDataType[]>
  >;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<AppointmentsDataType>();

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
  const handleDelete = async (appointment: AppointmentsDataType) => {
    const data = filteredAppointmentsData.filter(
      (p) => p.patientID !== appointment.patientID
    );

    const dataByStatus = appointmentsData.filter(
      (p) => p.status !== appointment.status
    );

    setFilteredAppointmentsData([...data, ...dataByStatus]);

    setAppointmentToDelete(undefined);

    setOpenDeleteModal(false);

    toast.success("Patient deleted successfully");
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
                {appointment.time}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {appointment.date}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {appointment.patientName}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {appointment.age}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {appointment.phoneNumber}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {appointment.assignedHO}
              </TableCell>
              <TableCell className="flex items-center gap-3">
                <EditAppointment appointment={appointment} />

                <Trash2
                  size={20}
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    setAppointmentToDelete(appointment);
                    setOpenDeleteModal(true);
                  }}
                />

                <RescheduleAppointment appointment={appointment} />
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
