"use client";
import { getStaffByCompoundId } from "@/actions/staff.action";
import { useAuth } from "@/hooks";
import { useFetch } from "@/hooks/useFetch";
import { IStaff } from "@/types/backend";
import React, { useEffect } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const HealthOfficialDataAnalytics = () => {
  const [user] = useAuth();
  const { data: staff } = useFetch({
    queryKey: ["staff", user?.staff?.chpsCompoundId!],
    queryFn: async () => getStaffByCompoundId(user?.staff?.chpsCompoundId!),
    enabled: true,
  });
  const [staffData, setStaffData] = React.useState<IStaff[]>([]);

  useEffect(() => {
    if (staff) {
      setStaffData(staff);
    }
  }, [staff]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Number of Health Workers */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Total Number of Health Workers
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{staffData.length}</span>
            <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span>10%</span>
            </span>
          </p>
        </div>

        {/* Nurses */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Nurses
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {staffData.filter((s) => s.position === "Nurse").length}
            </span>
          </p>
        </div>

        {/* Physician Assistants */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Physician Assistants
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {
                staffData.filter((s) => s.position === "Physician Assistant")
                  .length
              }
            </span>
          </p>
        </div>

        {/* Community Health Workers */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Community Health Workers
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {
                staffData.filter(
                  (s) => s.position === "Community Health Worker"
                ).length
              }
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthOfficialDataAnalytics;
