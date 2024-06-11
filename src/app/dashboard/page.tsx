import React from "react";
import { GrPowerCycle } from "react-icons/gr";
import { BsChatText } from "react-icons/bs";
import DoughnutChart from "@/app/dashboard/graphs/DoughnutChart";
import { IoIosArrowRoundUp } from "react-icons/io";
import { LiaMaleSolid, LiaFemaleSolid } from "react-icons/lia";
import UpcomingAppointment from "@/app/dashboard/UpcomingAppointment";
import { IoCheckboxOutline } from "react-icons/io5";
import { Trash2 } from "lucide-react";
import {
  MEDCONNECT_DASHBOARD_RECENT_ACTIVITIES,
  MEDCONNECT_DASHBOARD_REPORTS,
} from "@/constants";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <section className="flex items-center justify-between py-3">
        <h2 className="text-secondary-gray text-xl font-semibold">Dashboard</h2>
        <p className="text-secondary-gray font-light italic">
          {new Date().toLocaleDateString("en", {
            dateStyle: "long",
          })}
        </p>
      </section>

      {/* First Row */}
      <section className="flex flex-col md:flex-row w-full gap-5">
        <div className="flex flex-col gap-5 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
            {/* Total Patients */}
            <div className="bg-white rounded-md p-4 col-span-1 md:col-span-2 flex flex-col gap-3  w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Total Patients
              </h2>

              {/* Gender */}
              <div className="flex flex-col gap-4 md:flex-row justify-between">
                <div className="flex flex-col gap-4 relative">
                  <p className="font-bold text-2xl relative text-primary-green">
                    <span>200</span>
                    <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
                      <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
                      <span>10%</span>
                    </span>
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <LiaMaleSolid
                        size={25}
                        className="text-secondary-gray/20"
                      />
                      <p className="flex flex-col gap-1 text-secondary-gray">
                        <span className="font-bold text-sm">55</span>
                        <span className="font-light text-xs">Male</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <LiaFemaleSolid
                        size={25}
                        className="text-secondary-gray/20"
                      />
                      <p className="flex flex-col gap-1 text-secondary-gray">
                        <span className="font-bold text-sm">145</span>
                        <span className="font-light text-xs">Female</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full min-h-[1px] md:w-[1px] md:min-h-full bg-secondary-gray/30" />

                {/* Patient Status */}
                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-secondary-gray md:text-lg">
                    Patient Status
                  </h2>

                  <div className="flex items-center gap-2">
                    <p className="flex flex-col gap-1 text-secondary-gray">
                      <span className="font-bold text-sm">145</span>
                      <span className="font-light text-xs">Homecare</span>
                    </p>

                    <p className="flex flex-col gap-1 text-secondary-gray">
                      <span className="font-bold text-sm">145</span>
                      <span className="font-light text-xs">Critical</span>
                    </p>

                    <p className="flex flex-col gap-1 text-secondary-gray">
                      <span className="font-bold text-sm">145</span>
                      <span className="font-light text-xs">Referrals</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Officials */}
            <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-4  w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Health Officials
              </h2>

              <p className="text-3xl text-primary-green font-bold">10</p>

              <div className="flex items-center gap-2">
                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">7</span>
                  <span className="font-light text-xs">Nurses</span>
                </p>

                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">3</span>
                  <span className="font-light text-xs">
                    Physician Assistant
                  </span>
                </p>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-4 w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Prescriptions
              </h2>

              <p className="text-3xl text-primary-green font-bold">300</p>

              <div className="flex items-center gap-2">
                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">20</span>
                  <span className="font-light text-xs">Issued Today</span>
                </p>

                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">9</span>
                  <span className="font-light text-xs">Pending</span>
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="rounded-md shadow bg-white col-span-1 w-full">
            <h2 className="flex items-center justify-between gap-2 px-3 py-3">
              <span className="text-secondary-gray font-medium">
                Upcoming Appointments
              </span>
              <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
            </h2>

            <hr className="w-full bg-secondary-gray h-0.5" />

            <div className="w-full py-2">
              <UpcomingAppointment />
            </div>
          </div>
        </div>

        {/* Diagnosis Analysis */}
        <aside className="rounded-md shadow bg-white w-full md:w-1/2 h-full md:h-fit">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              Diagnosis Analysis(Patients Satisfaction)
            </span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col items-center gap-3 px-3 py-5">
            {/* Graph Goes Here */}
            <div className="flex flex-col items-center">
              <DoughnutChart
                labels={["Excellent", "Good", "Average", "Poor"]}
                data={[40, 20, 80, 10]}
                bgColors={["#FF000080", "#FFFF0080", "#40E0D080", "#2D476380"]}
              />
            </div>

            <div className="w-full p-3 bg-secondary-gray/10 flex items-center justify-center gap-3 rounded-md">
              <p className="capitalize font-semibold text-secondary-gray">
                Patient Satisfactory Rate
              </p>
              <span className="text-primary-green">80%</span>
            </div>

            <button className="group flex items-center justify-end w-full gap-3">
              <span className="group-hover:font-semibold">
                Start a new diagnosis
              </span>
              <BsChatText
                size={20}
                className="text-primary-green group-hover:text-secondary-gray"
              />
            </button>
          </div>
        </aside>
      </section>

      {/* 2nd Row */}
      <section className="grid grid-cols-1 lg:grid-cols-3 w-full gap-5 py-5">
        {/* Disease Outbreak Analysis */}
        <div className="rounded-md shadow bg-white w-full h-full">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              Disease Outbreak Analysis (
              {
                new Date()
                  .toLocaleDateString("en", {
                    dateStyle: "long",
                  })
                  .split(" ")[0]
              }
              )
            </span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col items-center gap-3 px-3 py-5">
            {/* Graph Goes Here */}
            <div className="flex flex-col items-center">
              <DoughnutChart
                labels={[
                  "Malaria",
                  "Respiratory Infections",
                  "Gastrointestinal Diseases",
                ]}
                data={[145, 10, 50]}
                bgColors={["#FF0000", "#FFFF00", "#40E0D0"]}
              />
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="rounded-md shadow bg-white w-full h-full">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              Recent Activities
            </span>
            <p className="flex items-center gap-2">
              <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
              <Trash2 className="text-secondary-gray/50 cursor-pointer" />
            </p>
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col gap-3 px-3 py-5">
            {MEDCONNECT_DASHBOARD_RECENT_ACTIVITIES.slice(0, 5).map(
              (activity, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-3 text-secondary-gray"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IoCheckboxOutline
                        size={30}
                        className="text-secondary-gray"
                      />

                      <div>
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p className="text-sm font-light opacity-50">
                          {activity.description}
                        </p>
                      </div>
                    </div>

                    <p className="text-secondary-gray/50 text-sm font-semibold">
                      {activity.timeAgo}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Report */}
        <div className="rounded-md shadow bg-white w-full h-full">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">Report</span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col gap-3 px-3 py-5">
            {MEDCONNECT_DASHBOARD_REPORTS.slice(0, 5).map((report, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 text-secondary-gray"
              >
                <h3 className="font-semibold">{report.title}</h3>
                <p className="text-sm font-light opacity-50">
                  {report.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
