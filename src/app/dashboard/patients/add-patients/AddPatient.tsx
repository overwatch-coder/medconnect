"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddPatientGeneralInfo from "@/app/dashboard/patients/add-patients/AddPatientGeneralInfo";

const AddPatient = () => {
  const [openAddPatient, setOpenAddPatient] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpenAddPatient(true)}
        className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white"
      >
        <Plus className="text-white" size={20} />
        <span className="font-semibold">Add Patient</span>
      </Button>

      <AddPatientGeneralInfo
        open={openAddPatient}
        setOpen={setOpenAddPatient}
      />
    </>
  );
};

export default AddPatient;
