"use client";

import React, { useState } from "react";
import EditPatientGeneralInfo from "@/app/dashboard/patients/edit-patients/EditPatientGeneralInfo";
import { TbEdit } from "react-icons/tb";
import { PatientsDataType } from "@/app/dashboard/patients/PatientsTable";

const EditPatient = ({ patient }: { patient: PatientsDataType }) => {
  const [openEditPatient, setOpenEditPatient] = useState(false);

  return (
    <>
      <TbEdit
        onClick={() => setOpenEditPatient(true)}
        size={20}
        className="text-red-500 cursor-pointer"
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
