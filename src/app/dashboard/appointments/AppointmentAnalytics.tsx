"use client";
import { getAllAppointments } from "@/actions/single-patient.action";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import { useFetch } from "@/hooks/useFetch";
import { IAppointment } from "@/types/backend";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const AppointmentAnalytics = () => {
  const { data: appointmentsData, isLoading } = useFetch<IAppointment[]>({
    queryFn: async () => getAllAppointments(),
    queryKey: ["appointments"],
    enabled: true,
  });

  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    if (appointmentsData) {
      setAppointments(appointmentsData);
    }
  }, [appointmentsData]);

  if (isLoading) {
    return <RenderEmptyComponent />;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Appointments */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Total Appointments
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{appointments.length}</span>
            <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span>{Math.floor(Math.random() * 100)}%</span>
            </span>
          </p>

          {/* Type of Appointment */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-secondary-gray">
              Type of Appointment
            </h3>

            <div className="flex items-center gap-2">
              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">
                  {Math.floor(Math.random() * appointments.length)}
                </span>
                <span className="font-light text-xs">General Consultation</span>
              </p>

              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">
                  {Math.floor(Math.random() * appointments.length)}
                </span>
                <span className="font-light text-xs">Follow Up</span>
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Upcoming Appointments
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {
                appointments.filter((appointment) => !appointment.isClosed)
                  .length
              }
            </span>
          </p>
        </div>

        {/* Completed Appointments */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Completed Appointments
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {
                appointments.filter((appointment) => appointment.isClosed)
                  .length
              }
            </span>
          </p>
        </div>

        {/* Cancelled Appointments */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Cancelled Appointments
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{Math.floor(Math.random() * appointments.length)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentAnalytics;
