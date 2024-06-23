"use client";

import React, { useState } from "react";
import EditPatientGeneralInfo from "@/app/dashboard/patients/edit-patients/EditPatientGeneralInfo";
import { TbEdit } from "react-icons/tb";
import { PatientsDataType } from "@/app/dashboard/patients/PatientsTable";
import { cn } from "@/lib/utils";

type EditPatientProps = {
  patient: PatientsDataType;
  className?: string;
};

const EditPatient = ({ patient, className }: EditPatientProps) => {
  const [openEditPatient, setOpenEditPatient] = useState(false);

  return (
    <>
      <TbEdit
        onClick={() => setOpenEditPatient(true)}
        size={20}
        className={cn("text-red-500 cursor-pointer", className)}
      />

      <EditPatientGeneralInfo
        patient={patient}
        open={openEditPatient}
        setOpen={setOpenEditPatient}
      />
    </>
  );
};

export default EditPatient;
