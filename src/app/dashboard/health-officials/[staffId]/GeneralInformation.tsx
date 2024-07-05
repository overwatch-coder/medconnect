"use client";

import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import EditOfficialAdditionalInfo from "@/app/dashboard/health-officials/edit-official/EditOfficialAdditionalInfo";
import EditOfficialEmergencyContact from "@/app/dashboard/health-officials/edit-official/EditOfficialEmergencyContact";
import EditOfficialGeneralInfo from "@/app/dashboard/health-officials/edit-official/EditOfficialGeneralInfo";
import ContentHeader from "@/app/dashboard/patients/[patientId]/ContentHeader";
import { HealthOfficialType } from "@/types/index";

type GeneralInformationProps = {
  healthOfficial: HealthOfficialType;
};

const GeneralInformation = ({ healthOfficial }: GeneralInformationProps) => {
  const [openEditGeneralInfo, setOpenEditGeneralInfo] = useState(false);
  const [openEditAdditionalInfo, setOpenEditAdditionalInfo] = useState(false);
  useState(false);
  const [openEditEmergencyContactInfo, setOpenEditEmergencyContactInfo] =
    useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 2xl:gap-5">
      {/* Basic Information */}
      <section className="col-span-1 bg-white px-5 py-3 flex flex-col gap-4 w-full h-full">
        <ContentHeader
          handleClick={() => setOpenEditGeneralInfo(true)}
          title="Basic Information"
        >
          <span className="text-sm text-white">Modify</span>
          <Edit className="text-white" size={20} />
        </ContentHeader>

        <div className="flex flex-col gap-2">
          {/* Image and Name */}
          <div className="grid grid-cols-2 place-content-start place-items-start text-sm py-5">
            <div className="flex items-center justify-center gap-2 h-20 w-20 rounded-full p-2 bg-primary-gray/10">
              <p className="text-primary-green font-bold text-2xl md:text-4xl text-center">
                {healthOfficial.firstName.charAt(0)}{" "}
                {healthOfficial.lastName.charAt(0)}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-secondary-gray">
                {healthOfficial.firstName} {healthOfficial.lastName}
              </h2>
              <p className="text-sm font-medium text-primary-gray">
                {healthOfficial.staffID}
              </p>
              <p className="text-sm font-medium text-primary-gray">
                {healthOfficial.position}
              </p>
              <p className="text-sm font-medium text-primary-gray">
                {healthOfficial.gender}
              </p>
              <p className="text-sm font-medium text-primary-gray">
                {healthOfficial.contactNumber}
              </p>
            </div>
          </div>
          {/* Health Official Data */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Staff ID</h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.staffID}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">First Name</h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.firstName}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Last Name</h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.lastName}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Date of Birth</h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.dob}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Gender</h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.gender}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Contact Number
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.contactNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Email Address</h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.email}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Position</h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.position}
              </p>
            </div>
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Location</h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.location}
              </p>
            </div>
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Date Started</h3>
              <p className="text-primary-gray/50 font-medium">
                {healthOfficial.dateStarted}
              </p>
            </div>
          </div>
        </div>

        <EditOfficialGeneralInfo
          open={openEditGeneralInfo}
          setOpen={setOpenEditGeneralInfo}
          healthOfficial={healthOfficial}
        />
      </section>

      <section className="col-span-1 flex flex-col gap-5 w-full h-full">
        {/* Additional Information */}
        <div className="flex flex-col gap-3 bg-white px-5 py-3 w-full h-full">
          <ContentHeader
            handleClick={() => setOpenEditAdditionalInfo(true)}
            title="Additional Information"
          >
            <span className="text-sm text-white">Modify</span>
            <Edit className="text-white" size={20} />
          </ContentHeader>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">Medical History</h3>
            <p className="text-primary-gray/50 font-medium">
              {"Asthma, Diabetes, Hypertension"}
            </p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">Work Station</h3>
            <p className="text-primary-gray/50 font-medium">
              {"Main Building"}
            </p>
          </div>

          <EditOfficialAdditionalInfo
            open={openEditAdditionalInfo}
            setOpen={setOpenEditAdditionalInfo}
          />
        </div>

        {/* Emergency Contact Information */}
        <div className="flex flex-col gap-4 bg-white px-5 py-3 w-full h-full">
          <ContentHeader
            handleClick={() => setOpenEditEmergencyContactInfo(true)}
            title="Emergency Contact Information"
          >
            <span className="text-sm text-white">Modify</span>
            <Edit className="text-white" size={20} />
          </ContentHeader>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">Contact Name</h3>
            <p className="text-primary-gray/50 font-medium">
              {
                [
                  "John Doe",
                  "Jane Ashley",
                  "Mike Smith",
                  "Sarah Johnson",
                  "David Lee",
                  "Emily Brown",
                  "Michael Johnson",
                  "Rachel Smith",
                  "Ashley Johnson",
                  "Madison Brown",
                ][Math.floor(Math.random() * 8)]
              }
            </p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">Contact Number</h3>
            <p className="text-primary-gray/50 font-medium">
              + {Math.floor(Math.random() * 1000000000)}
            </p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">Location</h3>
            <p className="text-primary-gray/50 font-medium">{"New York, NY"}</p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">Email Address</h3>
            <p className="text-primary-gray/50 font-medium">
              {
                [
                  "johndoe@gmail.com",
                  "janeashley@gmail.com",
                  "mikesmith@gmail.com",
                ][Math.floor(Math.random() * 3)]
              }
            </p>
          </div>

          <EditOfficialEmergencyContact
            open={openEditEmergencyContactInfo}
            setOpen={setOpenEditEmergencyContactInfo}
          />
        </div>
      </section>
    </div>
  );
};

export default GeneralInformation;
