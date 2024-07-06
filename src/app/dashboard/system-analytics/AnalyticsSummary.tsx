import React from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";

const AnalyticsSummary = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Uptime */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Uptime
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>99.9%</span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-20 flex items-center gap-1">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span className="text-red-500">0.1%</span>
            </span>
          </p>
        </div>

        {/* Average Response Time */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Average Response Time
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>200ms</span>
          </p>

          <p className="text-xs text-primary-gray/50">
            <span> -20ms</span>
          </p>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Active Users
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>500</span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-16 flex items-center gap-1">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span className="text-red-500">10%</span>
            </span>
          </p>
        </div>

        {/* Error Rate */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Error Rate
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>0.5%</span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-16 flex items-center gap-1">
              <IoIosArrowRoundDown size={10} className="text-red-500" />{" "}
              <span className="text-red-500">0.1%</span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;
