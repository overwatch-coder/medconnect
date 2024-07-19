"use client";
import ContentHeader from "@/app/dashboard/patients/[patientId]/ContentHeader";
import EditPatientInfo from "@/app/dashboard/patients/edit-patients/EditPatientInfo";
import { Patient } from "@/types/backend";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type GeneralInformationProps = {
  patient: Patient;
};

const GeneralInformation = ({ patient }: GeneralInformationProps) => {
  const [step, setStep] = useState(1);
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-3 2xl:gap-5">
      {/* Basic Information */}
      <section className="col-span-1 bg-white px-5 py-3 flex flex-col gap-4 w-full h-full">
        <ContentHeader
          handleClick={() => {
            setStep(1);
            setOpenEdit(true);
          }}
          title="Basic Information"
        >
          <span className="text-sm text-white">Modify</span>
          <Edit className="text-white" size={20} />
        </ContentHeader>

        <div className="flex flex-col gap-2">
          {/* Image and Name */}
          <div className="grid grid-cols-2 place-content-start place-items-start text-sm py-5">
            {patient.profilePictureUrl ? (
              <Image
                src={patient.profilePictureUrl}
                alt={patient.firstName + " " + patient.lastName}
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-primary-green/10 rounded-full flex items-center justify-center">
                <p className="text-primary-gray text-xl font-bold">
                  {patient.firstName.charAt(0)}
                  {patient.lastName.charAt(0)}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-secondary-gray">
                {patient.firstName} {patient.lastName}
              </h2>
              <p className="text-sm font-medium text-primary-gray">
                {patient.patientId}
              </p>
              <p className="text-sm font-medium text-primary-gray">
                {patient.gender}
              </p>
              <p className="text-sm font-medium text-primary-gray">
                {patient.contact}
              </p>
            </div>
          </div>

          {/* Patient Data */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Patient ID</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.patientId}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">First Name</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.firstName}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Last Name</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.lastName}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Date of Birth</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.dateOfBirth}
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
                {patient.nationalId}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Contact Number
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.contact}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Email Address</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.email}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Location</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.location}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">District</h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.district}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Marital Status
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {patient.maritalStatus}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="col-span-1 flex flex-col gap-5 w-full h-full">
        {/* Additional Information */}
        <div className="flex flex-col gap-3 bg-white px-5 py-3 w-full h-full">
          <ContentHeader
            handleClick={() => {
              setStep(2);
              setOpenEdit(true);
            }}
            title="Additional Information"
          >
            <span className="text-sm text-white">Modify</span>
            <Edit className="text-white" size={20} />
          </ContentHeader>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">Blood Group</h3>
            <p className="text-primary-gray/50 font-medium">
              {patient.additional?.bloodGroup}
            </p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">Allergies</h3>
            <p className="text-primary-gray/50 font-medium">
              {patient.additional && patient.additional.allergies
                ? patient.additional.allergies.length > 0
                  ? patient.additional.allergies.join(", ")
                  : "No Allergies"
                : "No Allergies"}
            </p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">
              Known Conditions
            </h3>
            <p className="text-primary-gray/50 font-medium">
              {patient.additional && patient.additional.knownCondition
                ? patient.additional.knownCondition
                : "No known Conditions"}
            </p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">
              Primary Care Physician
            </h3>
            <p className="text-primary-gray/50 font-medium">
              {patient.additional && patient.additional.primaryPhysician
                ? patient.additional.primaryPhysician
                : "N/a"}
            </p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">
              Insurance Provider
            </h3>
            <p className="text-primary-gray/50 font-medium">
              {patient.additional && patient.additional.insuranceProvider
                ? patient.additional.insuranceProvider
                : "N/a"}
            </p>
          </div>

          <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
            <h3 className="text-primary-gray font-semibold">
              Insurance Policy Number
            </h3>
            <p className="text-primary-gray/50 font-medium">
              {patient.additional && patient.additional.insurancePolicyNumber
                ? patient.additional.insurancePolicyNumber
                : "N/a"}
            </p>
          </div>
        </div>

        {/* Emergency Contact Information */}
        <div className="flex flex-col gap-4 bg-white px-5 py-3 w-full h-full">
          <ContentHeader
            handleClick={() => {
              setStep(3);
              setOpenEdit(true);
            }}
            title="Emergency Contact Information"
          >
            <span className="text-sm text-white">Modify</span>
            <Edit className="text-white" size={20} />
          </ContentHeader>

          {/* Contact Information */}
          {patient.emergencyContacts.map((contact, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <h2 className="text-primary-green font-medium">
                Contact Person {index + 1}
              </h2>
              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Contact Name
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {contact.name}
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Contact Relationship
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {contact.relationship}
                </p>
              </div>
              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Contact Number
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {contact.contact}
                </p>
              </div>
              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Contact Address
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {contact.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EditPatientInfo
        open={openEdit}
        setOpen={setOpenEdit}
        step={step}
        setStep={setStep}
        patient={patient}
      />
    </div>
  );
};

export default GeneralInformation;
