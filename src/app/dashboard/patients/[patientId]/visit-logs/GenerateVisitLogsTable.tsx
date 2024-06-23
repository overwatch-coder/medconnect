"use client";
import React from "react";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { VisitLogsDataType } from "@/app/dashboard/patients/[patientId]/visit-logs/VisitLogsTable";

const tableHeaderNames = [
  "Log ID",
  "Date of Visit",
  "Time of Visit",
  "Purpose of Visit",
  "Attending H.O",
  "Notes",
];

const GenerateVisitLogsTable = ({
  filteredVisitLogsData,
}: {
  filteredVisitLogsData: VisitLogsDataType[];
}) => {
  return (
    <div className="py-2 w-full">
      <Table className="w-full overflow-x-scroll h-full scrollbar-hide">
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
          </TableRow>
        </TableHeader>

        <TableBody className="w-full">
          {filteredVisitLogsData.map((log) => (
            <TableRow key={log.logID}>
              <TableCell className="text-secondary-gray flex items-center gap-2">
                {log.logID}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {log.visitDate}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {log.visitTime}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {log.visitPurpose}
              </TableCell>
              <TableCell className="text-secondary-gray">
                {log.attendingHO}
              </TableCell>
              <TableCell className="text-secondary-gray">{log.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GenerateVisitLogsTable;
