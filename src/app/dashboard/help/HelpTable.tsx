"use client";
import { CirclePlus, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import TicketTable from "@/app/dashboard/help/TicketTable";
import AddTicketModal from "@/app/dashboard/help/AddTicketModal";
import { ITicket } from "@/types/backend";
import { useFetch } from "@/hooks/useFetch";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import { getAllTickets } from "@/actions/tickets.action";

const HelpTable = () => {
  const {
    data: tickets,
    isLoading,
    refetch: refetchTickets,
  } = useFetch({
    queryFn: async () => await getAllTickets(),
    queryKey: ["tickets"],
  });
  const [filteredTickets, setFilteredTickets] = useState<ITicket[]>([]);
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [searchTicket, setSearchTicket] = useState("");

  useEffect(() => {
    if (tickets) {
      setFilteredTickets(tickets);
    }
  }, [tickets]);

  // handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!tickets) return;

    setSearchTicket(e.target.value);
    const query = e.target.value;
    if (query) {
      const filtered = tickets.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(query.toLowerCase()) ||
          ticket.ticketId.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTickets(filtered);
    } else {
      setFilteredTickets(tickets);
      setSearchTicket("");
    }
  };

  if (isLoading) {
    return <RenderEmptyComponent />;
  }

  return (
    <section className="flex flex-col rounded w-full h-full">
      <div className="flex items-center justify-between w-full gap-5">
        <div className="md:flex items-center justify-center gap-2 rounded-t-md bg-secondary-gray/20 px-3 md:px-5 py-2 md:py-3 w-fit hidden">
          <p className="text-secondary-gray text-sm md:text-base text-center font-medium">
            My Tickets
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4 px-4 md:px-0 relative w-full md:-mt-3 sm:w-1/2 xl:w-1/3">
          <input
            type="text"
            name="search"
            id="search"
            className="w-full rounded-lg py-2 bg-transparent ps-3 pe-4 border border-secondary-gray/70 focus:border-2 focus:border-secondary-gray outline-none"
            placeholder="find a ticket"
            value={searchTicket}
            onChange={handleSearch}
          />
          <Search
            size={20}
            className="absolute top-3 right-5 md:right-2 text-secondary-gray/50 cursor-pointer"
            onClick={() =>
              handleSearch({ target: { value: searchTicket } } as any)
            }
          />
        </div>
      </div>

      {/* Tickets */}
      <div className="flex flex-col px-3 pt-5 bg-white rounded-md max-h-screen min-h-full w-full pb-10">
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

        {filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <p className="text-secondary-gray text-lg font-bold text-center">
              No tickets available
            </p>
          </div>
        ) : (
          <TicketTable filteredTickets={filteredTickets} />
        )}
      </div>

      <AddTicketModal
        openModal={showAddTicketModal}
        setShowAddTicketModal={setShowAddTicketModal}
        refetchTickets={refetchTickets}
      />
    </section>
  );
};

export default HelpTable;
