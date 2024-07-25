"use client";

import { getAllOutreachPrograms } from "@/actions/outreach-programs.actions";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import { useFetch } from "@/hooks/useFetch";
import { IOutreachProgram } from "@/types/backend";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const OutreachProgramAnalytics = () => {
  const { data: outreachProgramsData, isLoading } = useFetch<
    IOutreachProgram[]
  >({
    queryFn: async () => await getAllOutreachPrograms(),
    queryKey: ["outreach-programs"],
  });

  const [outreachPrograms, setOutreachPrograms] = useState<IOutreachProgram[]>(
    []
  );

  useEffect(() => {
    if (outreachProgramsData) {
      setOutreachPrograms(
        outreachProgramsData.sort(
          (a, b) =>
            new Date(b?.programDate).getTime() -
            new Date(a?.programDate).getTime()
        )
      );
    }
  }, [outreachProgramsData]);

  if (isLoading) {
    return <RenderEmptyComponent />;
  }

  console.log({ outreachPrograms });

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Programs */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Total Programs
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{outreachPrograms?.length}</span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-10 flex items-center gap-1">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span className="text-red-500">
                {outreachPrograms?.length * 20}%
              </span>{" "}
              <span>from last period</span>
            </span>
          </p>
        </div>

        {/* Upcoming Programs */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Upcoming Programs
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {
                outreachPrograms?.filter(
                  (program) =>
                    new Date(program?.programDate).getTime() >
                    new Date().getTime()
                ).length
              }
            </span>
          </p>

          <p className="flex flex-col gap-1">
            <span className="text-secondary-gray font-bold text-xs">Next</span>
            <span className="text-xs text-primary-gray/50">
              {outreachPrograms[0]?.programDate.includes("T")
                ? outreachPrograms[0]?.programDate.split("T")[0]
                : outreachPrograms[0]?.programDate}
            </span>
          </p>
        </div>

        {/* Participating Compounds */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Participating Compounds
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{outreachPrograms.length}</span>
            <span className="text-xs text-secondary-gray absolute bottom-0 left-10 flex items-center gap-1">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span className="text-red-500">
                {outreachPrograms.length * 15}%
              </span>{" "}
              <span>from last program</span>
            </span>
          </p>
        </div>

        {/* Program Feedback */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Program Feedback
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>4.5</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OutreachProgramAnalytics;
