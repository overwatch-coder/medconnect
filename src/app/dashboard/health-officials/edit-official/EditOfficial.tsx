"use client";

import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { cn } from "@/lib/utils";
import EditOfficialGeneralInfo from "@/app/dashboard/health-officials/edit-official/EditOfficialGeneralInfo";
import { HealthOfficialType } from "@/types/index";

type EditOfficialProps = {
  className?: string;
  healthOfficial: HealthOfficialType;
};

const EditOfficial = ({ className, healthOfficial }: EditOfficialProps) => {
  const [openEditOfficial, setOpenEditOfficial] = useState(false);

  return (
    <>
      <TbEdit
        onClick={() => setOpenEditOfficial(true)}
        size={20}
        className={cn("text-red-500 cursor-pointer", className)}
      />

      <EditOfficialGeneralInfo
        open={openEditOfficial}
        setOpen={setOpenEditOfficial}
        healthOfficial={healthOfficial}
      />
    </>
  );
};

export default EditOfficial;
