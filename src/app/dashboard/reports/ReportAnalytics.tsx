import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const ReportAnalytics = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Reports Generated */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Total Reports Generated
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>1500</span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-14 flex items-center gap-1">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span className="text-red-500">20%</span>
            </span>
          </p>
        </div>

        {/* Reports Downloaded */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Reports Downloaded
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>750</span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-10 flex items-center gap-1">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span className="text-red-500">5%</span>
            </span>
          </p>
        </div>

        {/* Popular Report Type */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Popular Report Type
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>35%</span>
          </p>

          <p className="flex flex-col gap-1">
            <span className="text-secondary-gray font-bold text-xs">Type</span>
            <span className="text-xs text-primary-gray/50">
              Compound&apos;s Activity
            </span>
          </p>
        </div>

        {/* Average Generation Time */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Average Generation Time
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>2 minutes</span>
          </p>

          <p className="text-xs text-primary-gray/50">
            <span> -15 seconds</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalytics;
