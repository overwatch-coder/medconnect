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
import { TicketStatus } from "@/types/index";
import { getStatusColor } from "@/lib/utils";
import { ITicket } from "@/types/backend";
import {
  getAllChpsCompounds,
  getChpsById,
  getChpsCompound,
} from "@/actions/chps-compound.action";
import { useFetch } from "@/hooks/useFetch";

type TicketsTableProps = {
  filteredTickets: ITicket[];
  setFilteredTickets: React.Dispatch<React.SetStateAction<ITicket[]>>;
};

const TicketsTable = ({
  filteredTickets,
  setFilteredTickets,
}: TicketsTableProps) => {
  const [markedTicketId, setMarkedTicketId] = useState<string[]>([]);
  const { data: chpsCompound } = useFetch({
    queryKey: ["chps-compound"],
    queryFn: async () => await getAllChpsCompounds(),
  });

  const getChpsCompound = (id: string) => {
    if (!chpsCompound) return;

    const cmpd = chpsCompound.find((cmpd) => cmpd._id === id);
    return cmpd;
  };

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
      setMarkedTicketId(filteredTickets.map((data) => data._id));
    }
  };

  return (
    <Table className="scrollbar-hide">
      <TableHeader>
        <TableRow className="bg-primary-green hover:bg-primary-green w-full">
          <TableHead
            onClick={handleSelectAll}
            className="flex items-center gap-2 text-white"
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
          const statusColor = getStatusColor(
            data.status.toLowerCase() as TicketStatus
          );

          return (
            <TableRow key={data._id}>
              <TableCell className="text-secondary-gray flex items-center gap-2 font-semibold">
                <span
                  onClick={() => handleMarkCompound(data._id)}
                  className="cursor-pointer"
                >
                  {markedTicketId.includes(data._id) ? (
                    <GrCheckboxSelected
                      size={15}
                      className="text-secondary-gray flex items-center gap-2 cursor-pointer"
                    />
                  ) : (
                    <GrCheckbox
                      size={15}
                      className="text-secondary-gray flex items-center gap-2 cursor-pointer"
                    />
                  )}
                </span>
                <span className="capitalize">
                  {getChpsCompound(data.requestedById)?.name}
                </span>
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {data.ticketId}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {data.subject}
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold capitalize">
                {data.priority}
              </TableCell>
              <TableCell
                className={`text-primary-gray capitalize text-center font-semibold`}
              >
                <span
                  className="p-2 rounded text-sm"
                  style={{
                    backgroundColor: statusColor,
                    color: "white",
                  }}
                >
                  {data.status}
                </span>
              </TableCell>
              <TableCell className="text-secondary-gray font-semibold">
                {data.createdAt.split("T")[0]}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TicketsTable;
