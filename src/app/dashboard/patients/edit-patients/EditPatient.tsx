"use client";

import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { Patient } from "@/types/backend";
import EditPatientInfo from "@/app/dashboard/patients/edit-patients/EditPatientInfo";

type EditPatientProps = {
  patient: Patient;
  className?: string;
};

const EditPatient = ({ patient, className }: EditPatientProps) => {
  const [openEditPatient, setOpenEditPatient] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <>
      <TbEdit
        onClick={() => setOpenEditPatient(true)}
        size={20}
        className={cn("text-red-500 cursor-pointer", className)}
      />

      <EditPatientInfo
        open={openEditPatient}
        setOpen={setOpenEditPatient}
        step={step}
        setStep={setStep}
        patient={patient}
      />
    </>
  );
};

export default EditPatient;
