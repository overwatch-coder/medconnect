"use client";
import ContentHeader from "@/app/dashboard/patients/[patientId]/ContentHeader";
import EditPatient from "@/app/dashboard/patients/edit-patients/EditPatient";
import EditPatientAdditionalInfo from "@/app/dashboard/patients/edit-patients/EditPatientAdditionalInfo";
import EditPatientEmergencyContact from "@/app/dashboard/patients/edit-patients/EditPatientEmergencyContact";
import EditPatientGeneralInfo from "@/app/dashboard/patients/edit-patients/EditPatientGeneralInfo";
import { PatientsDataType } from "@/app/dashboard/patients/PatientsTable";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type GeneralInformationProps = {
  patient: PatientsDataType;
};

const GeneralInformation = ({ patient }: GeneralInformationProps) => {
  const [
    openEditPatientGeneralInformation,
    setOpenEditPatientGeneralInformation,
  ] = useState(false);
  const [openEditPatientAdditionalInfo, setOpenEditPatientAdditionalInfo] =
    useState(false);
  const [
    openEditPatientEmergencyContactInfo,
    setOpenEditPatientEmergencyContactInfo,
  ] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5">
      {/* Basic Information */}
      <section className="col-span-1 bg-white px-5 py-3 flex flex-col gap-4 w-full h-full">
        <ContentHeader
          handleClick={() => setOpenEditPatientGeneralInformation(true)}
          title="Basic Information"
        >
          <span className="text-sm text-white">Modify</span>
          <Edit className="text-white" size={20} />
        </ContentHeader>

        <div className="flex flex-col gap-2">
          {/* Image and Name */}
          <div className="grid grid-cols-2 place-content-start place-items-start text-sm py-5">
            <Image
              src={patient.image}
              alt={patient.patientName}
              width={100}
              height={100}
              className="rounded-full object-cover"
            />

            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-secondary-gray">
                {patient.patientName}
              </h2>
              <p className="text-sm font-medium text-primary-gray">
                {patient.patientID}
              </p>
              <p className="text-sm font-medium text-primary-gray">
                {patient.gender}
              </p>
              <p className="text-sm font-medium text-primary-gray">
                {patient.phoneNumber}
              </p>
            </div>
          </div>

          {/* Patient Data */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Patient ID</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.patientID}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">First Name</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.patientName.split(" ")[0]}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Last Name</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.patientName.split(" ")[1]}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Date of Birth</h3>
              <p className="text-primary-gray/50 font-medium">
                {`${Math.floor(Math.random() * 100 + 1900)}/${Math.floor(Math.random() * 12)}/${Math.floor(
                  Math.random() * 30
                )}`}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Gender</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.gender}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">National ID</h3>
              <p className="text-primary-gray/50 font-medium">
                {Math.floor(Math.random() * 1000000000)}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Contact Number
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.phoneNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Email Address</h3>
              <p className="text-primary-gray/50 font-medium">
                {`${patient.patientName.toLowerCase().split(" ").join(".")}@medconnect.com`}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Address</h3>
              <p className="text-primary-gray/50 font-medium">
                {"123 Main Street, New York, NY 10010"}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Location</h3>
              <p className="text-primary-gray/50 font-medium">
                {"New York, NY"}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">District</h3>
              <p className="text-primary-gray/50 font-medium">{"New York"}</p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Marital Status
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {
                  ["Single", "Married", "Divorced", "Widowed"][
                    Math.floor(Math.random() * 4)
                  ]
                }
              </p>
            </div>
          </div>
        </div>

        <EditPatientGeneralInfo
          open={openEditPatientGeneralInformation}
          setOpen={setOpenEditPatientGeneralInformation}
          patient={patient}
        />
      </section>

      <section className="col-span-1 flex flex-col gap-5 w-full h-full">
        {/* Additional Information */}
        <div className="flex flex-col gap-3 bg-white px-5 py-3 w-full h-full">
          <ContentHeader
            handleClick={() => setOpenEditPatientAdditionalInfo(true)}
            title="Additional Information"
          >
            <span className="text-sm text-white">Modify</span>
            <Edit className="text-white" size={20} />
          </ContentHeader>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">Allergies</h3>
            <p className="text-primary-gray/50 font-medium">
              {"Peanuts, Milk"}
            </p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">
              Known Conditions
            </h3>
            <p className="text-primary-gray/50 font-medium">{"Asthma"}</p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">
              Primary Care Physician
            </h3>
            <p className="text-primary-gray/50 font-medium">{"Dr. John Doe"}</p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">
              Insurance Provider
            </h3>
            <p className="text-primary-gray/50 font-medium">{"N.H.I.S"}</p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">
              Insurance Policy Number
            </h3>
            <p className="text-primary-gray/50 font-medium">{`HF${Math.floor(Math.random() * 1000000000)}`}</p>
          </div>

          <EditPatientAdditionalInfo
            open={openEditPatientAdditionalInfo}
            setOpen={setOpenEditPatientAdditionalInfo}
          />
        </div>

        {/* Emergency Contact Information */}
        <div className="flex flex-col gap-4 bg-white px-5 py-3 w-full h-full">
          <ContentHeader
            handleClick={() => setOpenEditPatientEmergencyContactInfo(true)}
            title="Emergency Contact Information"
          >
            <span className="text-sm text-white">Modify</span>
            <Edit className="text-white" size={20} />
          </ContentHeader>

          {/* Contact 1 Information */}
          <div className="flex flex-col gap-2">
            <h2 className="text-primary-green font-medium">Contact Person 1</h2>
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
              <h3 className="text-primary-gray font-semibold">
                Contact Relationship
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {
                  [
                    "Father",
                    "Mother",
                    "Brother",
                    "Sister",
                    "Spouse",
                    "Friend",
                    "Other",
                  ][Math.floor(Math.random() * 6)]
                }
              </p>
            </div>
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Contact Number
              </h3>
              <p className="text-primary-gray/50 font-medium">
                + {Math.floor(Math.random() * 1000000000)}
              </p>
            </div>
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Contact Address
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {"New York, NY"}
              </p>
            </div>
          </div>

          {/* Contact 2 Information */}
          <div className="flex flex-col gap-2">
            <h2 className="text-primary-green font-medium">Contact Person 2</h2>
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
              <h3 className="text-primary-gray font-semibold">
                Contact Relationship
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {
                  [
                    "Father",
                    "Mother",
                    "Brother",
                    "Sister",
                    "Spouse",
                    "Friend",
                    "Other",
                  ][Math.floor(Math.random() * 6)]
                }
              </p>
            </div>
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Contact Number
              </h3>
              <p className="text-primary-gray/50 font-medium">
                + {Math.floor(Math.random() * 1000000000)}
              </p>
            </div>
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Contact Address
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {"New York, NY"}
              </p>
            </div>
          </div>

          <EditPatientEmergencyContact
            open={openEditPatientEmergencyContactInfo}
            setOpen={setOpenEditPatientEmergencyContactInfo}
          />
        </div>
      </section>
    </div>
  );
};

export default GeneralInformation;
