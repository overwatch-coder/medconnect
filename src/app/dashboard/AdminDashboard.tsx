"use client";

import DoughnutChart from "@/app/dashboard/graphs/DoughnutChart";
import {
  MEDCONNECT_DASHBOARD_RECENT_ACTIVITIES,
  MEDCONNECT_DASHBOARD_REPORTS,
} from "@/constants";
import { useAuth } from "@/hooks";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BsChatText } from "react-icons/bs";
import { GrPowerCycle } from "react-icons/gr";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoCheckboxOutline } from "react-icons/io5";
import { LiaFemaleSolid, LiaMaleSolid } from "react-icons/lia";
import { TableCell, TableRow } from "@/components/ui/table";
import GenerateTable from "@/app/dashboard/GenerateTable";
import { IAppointment, IPrescription, IStaff, Patient } from "@/types/backend";
import { useFetch } from "@/hooks/useFetch";
import { getChpsPatients } from "@/actions/patients.action";
import { getStaffByCompoundId } from "@/actions/staff.action";
import {
  getAllAppointments,
  getAllPrescriptions,
} from "@/actions/single-patient.action";

const AdminDashboard = () => {
  const [user] = useAuth();
  const isUserAdmin = user?.isSuperAdmin;

  // patients data
  const { data: patientData } = useFetch<Patient[]>({
    queryKey: ["patients", user?.staff?.chpsCompoundId!],
    queryFn: async () => await getChpsPatients(user?.staff?.chpsCompoundId!),
  });

  // health officials data
  const { data: healthOfficialsData } = useFetch<IStaff[]>({
    queryKey: ["staff", user?.staff?.chpsCompoundId!],
    queryFn: async () =>
      await getStaffByCompoundId(user?.staff?.chpsCompoundId!),
  });

  // appointments data
  const { data: appointmentsData } = useFetch<IAppointment[]>({
    queryKey: ["appointments"],
    queryFn: async () => await getAllAppointments(),
    enabled: true,
  });

  // prescriptions data
  const { data: prescriptionsData } = useFetch<IPrescription[]>({
    queryKey: ["prescriptions"],
    queryFn: async () => await getAllPrescriptions(),
    enabled: true,
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [healthOfficials, setHealthOfficials] = useState<IStaff[]>([]);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);

  useEffect(() => {
    if (patientData) {
      setPatients(patientData);
    }

    if (healthOfficialsData) {
      setHealthOfficials(healthOfficialsData);
    }

    if (appointmentsData) {
      setAppointments(
        appointmentsData.filter((item) => item.isClosed === false)
      );
    }

    if (prescriptionsData) {
      setPrescriptions(prescriptionsData);
    }
  }, [appointmentsData, healthOfficialsData, patientData, prescriptionsData]);

  const [currentTablePage, setCurrentTablePage] = useState(1);
  const tableDataPerPage = 5;
  const tableData = appointments;

  // Get current appointments for the page
  const indexOfLastData = currentTablePage * tableDataPerPage;
  const indexOfFirstData = indexOfLastData - tableDataPerPage;
  const currentData = tableData.slice(indexOfFirstData, indexOfLastData);

  return (
    <div className={`${isUserAdmin ? "hidden" : ""}`}>
      {/* First Row */}
      <section
        className={`grid grid-cols-1 md:grid-cols-3 w-full gap-5 ${
          isUserAdmin ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col gap-5 w-full col-span-1 md:col-span-2">
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
                    <span>{patients.length}</span>
                    <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
                      <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
                      <span>{Math.floor(Math.random() * 100)}%</span>
                    </span>
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <LiaMaleSolid
                        size={25}
                        className="text-secondary-gray/20"
                      />
                      <p className="flex flex-col gap-1 text-secondary-gray">
                        <span className="font-bold text-sm">
                          {
                            patients.filter(
                              (patient) => patient.gender === "Male"
                            ).length
                          }
                        </span>
                        <span className="font-light text-xs">Male</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <LiaFemaleSolid
                        size={25}
                        className="text-secondary-gray/20"
                      />
                      <p className="flex flex-col gap-1 text-secondary-gray">
                        <span className="font-bold text-sm">
                          {
                            patients.filter(
                              (patient) => patient.gender === "Female"
                            ).length
                          }
                        </span>
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
                      <span className="font-bold text-sm">
                        {Math.floor(Math.random() * patients.length)}
                      </span>
                      <span className="font-light text-xs">Homecare</span>
                    </p>

                    <p className="flex flex-col gap-1 text-secondary-gray">
                      <span className="font-bold text-sm">
                        {Math.floor(Math.random() * patients.length)}
                      </span>
                      <span className="font-light text-xs">Critical</span>
                    </p>

                    <p className="flex flex-col gap-1 text-secondary-gray">
                      <span className="font-bold text-sm">
                        {Math.floor(Math.random() * patients.length)}
                      </span>
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

              <p className="text-3xl text-primary-green font-bold">
                {healthOfficials.length}
              </p>

              <div className="flex items-center gap-2">
                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">
                    {
                      healthOfficials.filter(
                        (staff) => staff.position === "Nurse"
                      ).length
                    }
                  </span>
                  <span className="font-light text-xs">Nurses</span>
                </p>

                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">
                    {
                      healthOfficials.filter(
                        (staff) => staff.position === "Physician Assistant"
                      ).length
                    }
                  </span>
                  <span className="font-light text-xs">
                    Physician Assistants
                  </span>
                </p>
              </div>
            </div>

            {/* Prescriptions */}
            <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-4 w-full">
              <h2 className="font-semibold text-secondary-gray md:text-lg">
                Prescriptions
              </h2>

              <p className="text-3xl text-primary-green font-bold">
                {prescriptions.length}
              </p>

              <div className="flex items-center gap-2">
                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">
                    {
                      prescriptions.filter(
                        (item) => new Date(item.date) === new Date()
                      ).length
                    }
                  </span>
                  <span className="font-light text-xs">Issued Today</span>
                </p>

                <p className="flex flex-col gap-1 text-secondary-gray">
                  <span className="font-bold text-sm">
                    {
                      prescriptions.filter(
                        (item) => new Date(item.date) > new Date()
                      ).length
                    }
                  </span>
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
              <GenerateTable
                tableHeaderNames={[
                  "Patient Name",
                  "Patient ID",
                  "Assigned H.O.",
                  "Appointment Date",
                  "Appointment Time",
                ]}
                data={tableData}
                currentPage={currentTablePage}
                setCurrentPage={setCurrentTablePage}
                dataPerPage={tableDataPerPage}
              >
                {currentData.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell className="text-secondary-gray font-semibold">
                      {`${data.patient.firstName} ${data.patient.lastName}`}
                    </TableCell>
                    <TableCell className="text-secondary-gray font-semibold">
                      {data.patient.patientId}
                    </TableCell>
                    <TableCell className="text-secondary-gray font-semibold">
                      {data.official}
                    </TableCell>
                    <TableCell className="text-secondary-gray font-semibold">
                      {new Date(data.date).toISOString().split("T")[0]}
                    </TableCell>
                    <TableCell className="text-secondary-gray font-semibold">
                      {new Date(data.date).toLocaleTimeString("en-US", {
                        timeStyle: "short",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </GenerateTable>
            </div>
          </div>
        </div>

        {/* Diagnosis Analysis */}
        <aside className="rounded-md shadow bg-white w-full h-full min-h-full col-span-1 relative">
          <h2 className="flex items-center justify-between gap-2 px-3 py-3">
            <span className="text-secondary-gray font-medium">
              Diagnosis Analysis(Patients Satisfaction)
            </span>
            <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          </h2>

          <hr className="w-full bg-secondary-gray h-0.5" />

          <div className="flex flex-col h-full items-center gap-3 px-3 py-5">
            {/* Graph */}
            <div className="flex flex-col items-center pt-5">
              <DoughnutChart
                labels={["Excellent", "Good", "Average", "Poor"]}
                data={Array.from({ length: 4 }, (_, i) =>
                  Math.floor(Math.random() * 300)
                )}
                bgColors={["#FF000080", "#FFFF0080", "#40E0D080", "#2D476380"]}
              />
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4 justify-end w-full">
              <div className="w-full p-3 bg-secondary-gray/10 flex items-center justify-center gap-3 rounded-md">
                <p className="capitalize font-semibold text-secondary-gray">
                  Patient Satisfactory Rate
                </p>
                <span className="text-primary-green">80%</span>
              </div>

              <button className="group flex items-center ml-auto w-auto gap-3 px-5">
                <span className="group-hover:font-semibold">
                  Start a new diagnosis
                </span>
                <BsChatText
                  size={20}
                  className="text-primary-green group-hover:text-secondary-gray"
                />
              </button>
            </div>
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
                data={Array.from({ length: 3 }, (_, i) =>
                  Math.floor(Math.random() * 300)
                )}
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
              <Trash2
                size={20}
                className="text-secondary-gray/50 cursor-pointer"
              />
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
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <IoCheckboxOutline
                        size={30}
                        className="text-secondary-gray"
                      />

                      <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p className="text-sm font-light opacity-50">
                          {activity.description}
                        </p>

                        <p className="sm:hidden text-secondary-gray/50 text-sm font-semibold">
                          {activity.timeAgo}
                        </p>
                      </div>
                    </div>

                    <p className="hidden sm:block text-secondary-gray/50 text-sm font-semibold">
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

export default AdminDashboard;
