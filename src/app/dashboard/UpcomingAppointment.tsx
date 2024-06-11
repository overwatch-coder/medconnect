"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { MEDCONNECT_DASHBOARD_UPCOMING_APPOINTMENTS as appointmentData } from "@/constants";

const UpcomingAppointment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // Calculate the number of pages
  const totalPages = Math.ceil(appointmentData.length / appointmentsPerPage);

  // Get current appointments for the page
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointmentData.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary-gray/40">Patient Name</TableHead>
            <TableHead className="text-primary-gray/40">
              Assigned H.O.
            </TableHead>
            <TableHead className="text-primary-gray/40">
              Appointment Date
            </TableHead>
            <TableHead className="text-primary-gray/40">
              Appointment Time
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentAppointments.map((app) => (
            <TableRow key={app.patientID}>
              <TableCell className="text-secondary-gray font-semibold">
                {app.patientName}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {app.assignedHO}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {app.appointmentDate}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {app.appointmentTime}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UpcomingAppointmentPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

const UpcomingAppointmentPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                onPageChange(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        {pageNumbers.map((number) => (
          <PaginationItem key={number}>
            <PaginationLink
              href="#"
              isActive={number === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(number);
              }}
              className={`${
                number === currentPage
                  ? "bg-secondary-gray text-white hover:bg-secondary-gray hover:text-white"
                  : ""
              }`}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default UpcomingAppointment;
