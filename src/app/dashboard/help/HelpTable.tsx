"use client";
import { CirclePlus, Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TicketTable from "@/app/dashboard/help/TicketTable";
import AddTicketModal from "@/app/dashboard/help/AddTicketModal";

type HelpTableProps = {
  tickets: {
    ticketId: string;
    subject: string;
    dateInitiated: string;
    status: string;
    statusColor: string;
    dateCompleted: string;
  }[];
};

const HelpTable = ({ tickets }: HelpTableProps) => {
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [searchTicket, setSearchTicket] = useState("");

  // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTicket(e.target.value);
    const query = e.target.value;
    if (query) {
      const filtered = tickets.filter((ticket) =>
        ticket.subject.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(tickets);
      setSearchTicket("");
    }
  };

  return (
    <section className="flex flex-col rounded w-full scrollbar-hide">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center justify-center gap-2 rounded-t-md bg-secondary-gray/20 px-5 py-3 w-fit">
          <p className="text-secondary-gray text-center font-medium">
            My Tickets
          </p>
        </div>

        <div className="flex items-center gap-2 relative w-fit -mt-3 sm:w-1/2 xl:w-1/3">
          <input
            type="text"
            name="search"
            id="search"
            className="w-full rounded-lg py-2 ps-3 pe-4 border border-secondary-gray/70 focus:border-2 focus:border-secondary-gray outline-none"
            placeholder="find a ticket"
            value={searchTicket}
            onChange={handleSearch}
          />
          <Search
            size={20}
            className="absolute top-3 right-2 text-secondary-gray/50 cursor-pointer"
            onClick={() =>
              handleSearch({ target: { value: searchTicket } } as any)
            }
          />
        </div>
      </div>

      {/* Tickets */}
      <div className="flex flex-col gap-7 px-3 pt-5 pb-10 bg-white rounded-md max-h-screen scrollbar-hide h-full">
        <div className="flex flex-col items-end w-full p-2">
          <Button
            variant="default"
            className="flex items-center gap-2 justify-center"
            onClick={() => setShowAddTicketModal(true)}
          >
            <CirclePlus className="text-white" size={20} />
            <span className="text-white font-bold">Add New Ticket</span>
          </Button>
        </div>

        <TicketTable filteredTickets={filteredTickets} />

        {filteredTickets.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-secondary-gray text-lg font-bold text-center">
              No tickets available
            </p>
          </div>
        )}
      </div>

      <AddTicketModal
        openModal={showAddTicketModal}
        setShowAddTicketModal={setShowAddTicketModal}
      />
    </section>
  );
};

export default HelpTable;
