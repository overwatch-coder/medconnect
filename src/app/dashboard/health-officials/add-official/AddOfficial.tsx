"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddOfficialGeneralInfo from "@/app/dashboard/health-officials/add-official/AddOfficialGeneralInfo";

const AddOfficial = () => {
  const [openAddOfficial, setOpenAddOfficial] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpenAddOfficial(true)}
        className="bg-primary-green hover:bg-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white"
      >
        <Plus className="text-white" size={20} />
        <span className="font-semibold">Add Health Official</span>
      </Button>

      <AddOfficialGeneralInfo
        open={openAddOfficial}
        setOpen={setOpenAddOfficial}
      />
    </>
  );
};

export default AddOfficial;
