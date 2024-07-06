"use client";

import React, { useState } from "react";
import { Edit, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import DeleteCompound from "@/app/dashboard/compounds/DeleteCompound";
import EditCompoundModal from "@/app/dashboard/compounds/EditCompound";
import { useRouter } from "next/navigation";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";
import {
  TicketStatus,
  SuperAdminTicketType as TicketType,
} from "@/types/index";
import { getStatusColor } from "@/lib/utils";

type TicketsTableProps = {
  filteredTickets: TicketType[];
  setFilteredTickets: React.Dispatch<React.SetStateAction<TicketType[]>>;
};

const TicketsTable = ({
  filteredTickets,
  setFilteredTickets,
}: TicketsTableProps) => {
  const [markedTicketId, setMarkedTicketId] = useState<string[]>([]);

  // handle mark compound
  const handleMarkCompound = (id: string) => {
    if (markedTicketId.includes(id)) {
      setMarkedTicketId(markedTicketId.filter((item) => item !== id));
    } else {
      setMarkedTicketId([...markedTicketId, id]);
    }
  };

  // handle select all compounds
  const handleSelectAll = () => {
    if (markedTicketId.length === filteredTickets.length) {
      setMarkedTicketId([]);
    } else {
      setMarkedTicketId(filteredTickets.map((data) => data.ticketID));
    }
  };

  return (
    <Table className="scrollbar-hide">
      <TableHeader>
        <TableRow className="bg-primary-green hover:bg-primary-green w-full">
          <TableHead
            onClick={handleSelectAll}
            className="text-white flex items-center gap-2"
          >
            {markedTicketId.length === filteredTickets.length ? (
              <GrCheckboxSelected
                size={15}
                className="text-white cursor-pointer"
              />
            ) : (
              <GrCheckbox size={15} className="text-white cursor-pointer" />
            )}
            <span>Requested By</span>
          </TableHead>
          <TableHead className="text-white">ID</TableHead>
          <TableHead className="text-white">Subject</TableHead>
          <TableHead className="text-white">Priority</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-white">Created At</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="scrollbar-hide">
        {filteredTickets.map((data) => {
          const statusColor = getStatusColor(data.status as TicketStatus);

          return (
            <TableRow key={data.ticketID}>
              <TableCell className="text-secondary-gray font-semibold flex items-center gap-2">
                <span
                  onClick={() => handleMarkCompound(data.ticketID)}
                  className="cursor-pointer"
                >
                  {markedTicketId.includes(data.ticketID) ? (
                    <GrCheckboxSelected
                      size={15}
                      className="text-secondary-gray cursor-pointer flex items-center gap-2"
                    />
                  ) : (
                    <GrCheckbox
                      size={15}
                      className="text-secondary-gray cursor-pointer flex items-center gap-2"
                    />
                  )}
                </span>
                <span>{data.requestedBy}</span>
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {data.ticketID}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {data.subject}
              </TableCell>
              <TableCell className="text-secondary-gray capitalize font-semibold">
                {data.priority}
              </TableCell>
              <TableCell
                className={`text-primary-gray capitalize bg-['${statusColor}'] p-2 rounded-none font-semibold`}
              >
                {data.status}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {data.createdAt}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TicketsTable;
