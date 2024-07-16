"use client";
import { getChpsPatients, getPatients } from "@/actions/patients.action";
import { usePatients } from "@/hooks";
import { useFetch } from "@/hooks/useFetch";
import { Patient } from "@/types/backend";
import React, { useEffect, useState } from "react";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { LiaFemaleSolid, LiaMaleSolid } from "react-icons/lia";

const PatientDataOverview = () => {
  const { data: patientData } = useFetch<Patient[]>({
    queryKey: ["patients"],
    queryFn: async () => await getPatients(),
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [_, setChpsPatients] = usePatients();

  useEffect(() => {
    if (patientData) {
      setPatients(patientData);
      setChpsPatients(patientData);
    }
  }, [patientData, setChpsPatients]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Patients */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Total Patients
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{patients.length}</span>
            <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
              {Math.floor(Math.random() * 10) > 5 ? (
                <IoIosArrowRoundUp size={10} className="text-green-500" />
              ) : (
                <IoIosArrowRoundDown size={10} className="text-red-500" />
              )}{" "}
              <span>{Math.floor(Math.random() * 100)}%</span>
            </span>
          </p>

          {/* Patient Status */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-secondary-gray">
              Patient Status
            </h3>

            <div className="flex items-center gap-2">
              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">
                  {Math.floor(Math.random() * 500)}
                </span>
                <span className="font-light text-xs">Homecare</span>
              </p>

              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">
                  {Math.floor(Math.random() * 100)}
                </span>
                <span className="font-light text-xs">Critical</span>
              </p>

              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">
                  {Math.floor(Math.random() * 700)}
                </span>
                <span className="font-light text-xs">Referrals</span>
              </p>
            </div>
          </div>
        </div>

        {/* New Patients in a Month */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            New Patients This Month
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{Math.floor(Math.random() * 300)}</span>
          </p>
        </div>

        {/* Gender */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Gender
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{patients.length}</span>
          </p>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <LiaMaleSolid size={25} className="text-secondary-gray/20" />
              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">
                  {
                    patients.filter((patient) => patient.gender === "Male")
                      .length
                  }
                </span>
                <span className="font-light text-xs">Male</span>
              </p>
            </div>

            <div className="flex items-center gap-1">
              <LiaFemaleSolid size={25} className="text-secondary-gray/20" />
              <p className="flex flex-col gap-1 text-secondary-gray">
                <span className="font-bold text-sm">
                  {
                    patients.filter((patient) => patient.gender === "Female")
                      .length
                  }
                </span>
                <span className="font-light text-xs">Female</span>
              </p>
            </div>
          </div>
        </div>

        {/* Patients with Chronic Conditions */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-4  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Patients with Chronic Conditions
          </h2>

          <p className="text-3xl text-primary-green font-bold">
            {Math.floor(Math.random() * 250)}
          </p>

          <div className="flex items-center gap-4">
            <p className="flex flex-col gap-1 text-secondary-gray">
              {Math.floor(Math.random() * 300)}
              <span className="font-light text-xs">Diabetes</span>
            </p>

            <p className="flex flex-col gap-1 text-secondary-gray">
              <span className="font-bold text-sm">
                {Math.floor(Math.random() * 150)}
              </span>
              <span className="font-light text-xs">Chronic Pains</span>
            </p>

            <p className="flex flex-col gap-1 text-secondary-gray">
              <span className="font-bold text-sm">
                {Math.floor(Math.random() * 80)}
              </span>
              <span className="font-light text-xs">Asthma</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDataOverview;
