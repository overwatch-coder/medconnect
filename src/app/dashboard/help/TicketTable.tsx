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

type TicketTableProps = {
  filteredTickets: {
    ticketId: string;
    subject: string;
    dateInitiated: string;
    status: string;
    statusColor: string;
    dateCompleted: string;
  }[];
};

const TicketTable = ({ filteredTickets }: TicketTableProps) => {
  return (
    <>
      <Table className="w-full scrollbar-hide">
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

        <TableBody className="scrollbar-hide">
          {filteredTickets.map((ticket, index) => (
            <TableRow key={ticket.ticketId}>
              <TableCell className="text-secondary-gray font-semibold">
                {ticket.ticketId}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {ticket.subject}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {ticket.dateInitiated}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold flex items-center gap-2">
                <FaCircle size={10} color={ticket.statusColor} />
                <span>{ticket.status}</span>
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {ticket.dateCompleted ? ticket.dateCompleted : "Not Completed"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TicketTable;
