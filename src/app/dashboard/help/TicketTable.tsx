"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCircle } from "react-icons/fa";
import { ITicket } from "@/types/backend";

type TicketTableProps = {
  filteredTickets: ITicket[];
};

const TicketTable = ({ filteredTickets }: TicketTableProps) => {
  return (
    <Table className="w-full min-h-full">
      <TableHeader>
        <TableRow className="bg-white hover:bg-white">
          <TableHead className="text-secondary-gray font-semibold text-lg">
            Ticket ID
          </TableHead>
          <TableHead className="text-secondary-gray font-semibold text-lg">
            Subject
          </TableHead>
          <TableHead className="text-secondary-gray font-semibold text-lg">
            Date Initiated
          </TableHead>
          <TableHead className="text-secondary-gray font-semibold text-lg">
            Status
          </TableHead>
          <TableHead className="text-secondary-gray font-semibold text-lg">
            Date Completed
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="scrollbar-hide overflow-x-scroll h-full">
        {filteredTickets.map((ticket) => (
          <TableRow key={ticket.ticketId}>
            <TableCell className="text-secondary-gray font-semibold">
              {ticket.ticketId}
            </TableCell>
            <TableCell className="text-secondary-gray font-semibold">
              {ticket.subject}
            </TableCell>
            <TableCell className="text-secondary-gray font-semibold">
              {ticket.createdAt.split("T")[0]}
            </TableCell>
            <TableCell className="text-secondary-gray font-semibold flex items-center gap-2">
              <FaCircle
                size={10}
                className={
                  ticket.status === "OPEN"
                    ? "text-yellow-500"
                    : "text-green-700"
                }
              />
              <span>{ticket.status}</span>
            </TableCell>

            <TableCell className="text-secondary-gray font-semibold">
              {ticket.status === "OPEN"
                ? "Not Completed"
                : ticket.updatedAt.split("T")[0]}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TicketTable;
