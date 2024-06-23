"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddVisitLogForm from "@/app/dashboard/patients/[patientId]/visit-logs/AddVisitLogForm";

const AddVisitLog = () => {
  const [openAddVisitLogForm, setOpenAddVisitLogForm] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpenAddVisitLogForm(true)}
        className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white"
      >
        <Plus className="text-white" size={20} />
        <span className="font-semibold">Add Visit Log</span>
      </Button>

      <AddVisitLogForm
        open={openAddVisitLogForm}
        setOpen={setOpenAddVisitLogForm}
      />
    </>
  );
};

export default AddVisitLog;
