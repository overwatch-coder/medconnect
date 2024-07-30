"use client";
import { getAllTickets } from "@/actions/tickets.action";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import TicketsTable from "@/app/dashboard/tickets/TicketsTable";
import CustomFilterDropdown from "@/components/CustomFilterDropdown";
import { useFetch } from "@/hooks/useFetch";
import { ITicket } from "@/types/backend";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

type FilterOptions = {
  value: keyof ITicket;
  label: string;
};

const filterOptions: FilterOptions[] = [
  {
    value: "ticketId",
    label: "Ticket ID",
  },
  {
    value: "status",
    label: "Status",
  },
  {
    value: "priority",
    label: "Priority",
  },
  {
    value: "subject",
    label: "Subject",
  },
];

const TicketsWithSearch = ({ tickets }: { tickets: ITicket[] }) => {
  const [filterBy, setFilterBy] = useState("Subject");
  const [filteredTickets, setFilteredTickets] = useState<ITicket[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (tickets) {
      setFilteredTickets(tickets);
    }
  }, [tickets]);

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!tickets) return;

    setSearchTerm(event.target.value);

    const filtered = tickets.filter(
      (ticket) =>
        ticket.ticketId
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        ticket.requestedById
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        ticket.status
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        ticket.priority
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setFilteredTickets(filtered);
  };

  // Handle filter
  const handleFilter = (value: string) => {
    const filterValue = value.split("|")[0];
    const filterName = value.split("|")[1];

    setFilterBy(filterName);

    const filtered = filteredTickets.sort((a: any, b: any) => {
      if (a[filterValue] < b[filterValue]) {
        return -1;
      }
      if (a[filterValue] > b[filterValue]) {
        return 1;
      }
      return 0;
    });

    setFilteredTickets(filtered);
  };

  return (
    <>
      <div className="flex items-center gap-5 justify-between bg-secondary-gray/10 py-3 px-2 md:px-5">
        <div className="flex items-center gap-2 relative w-full md:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by program name or upcoming"
            className="w-full rounded-md border bg-white border-secondary-gray px-3 py-2 outline-none"
          />
          <Search
            size={15}
            className="text-secondary-gray absolute right-3 top-3"
          />
        </div>

        <CustomFilterDropdown
          filterBy={filterBy}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
          filterName="Sort by"
          className="bg-red-500 text-white hover:text-white rounded-md hover:bg-red-500 border-0"
          iconClassName="text-white"
        />
      </div>

      {/* Outreach Programs */}
      <div className="flex flex-col gap-5 w-full h-full">
        {filteredTickets.length > 0 ? (
          <TicketsTable
            filteredTickets={filteredTickets}
            setFilteredTickets={setFilteredTickets}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 h-full w-full">
            <p className="text-secondary-gray font-semibold">
              No tickets found.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default TicketsWithSearch;
