import { ITicket } from "@/types/backend";
import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const TicketsAnalyticsSummary = ({ tickets }: { tickets: ITicket[] }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Tickets */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Total Tickets
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{tickets.length}</span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-10 flex items-center gap-1">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span className="text-red-500">
                {Math.floor(Math.random() * 100)}%
              </span>
            </span>
          </p>
        </div>

        {/* Open Tickets */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Open Tickets
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {tickets.filter((ticket) => ticket.status === "OPEN").length}
            </span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-10 flex items-center gap-1">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span className="text-red-500">5%</span>
              <span>New</span>
            </span>
          </p>
        </div>

        {/* Closed Tickets */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Closed Tickets
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {tickets.filter((ticket) => ticket.status === "CLOSED").length}
            </span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-10 flex items-center gap-1">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span className="text-red-500">10%</span>
            </span>
          </p>
        </div>

        {/* Average Response Time */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Average Response Time
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{Math.floor(Math.random() * 10)} hours</span>
          </p>

          <p className="text-xs text-primary-gray/50">
            <span> - {Math.floor(Math.random() * 10)} minutes</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketsAnalyticsSummary;
