"use client";

import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { IStaff } from "@/types/backend";
import EditHealthOfficialInfo from "@/app/dashboard/health-officials/edit-official/EditHealthOfficialInfo";

type EditOfficialProps = {
  className?: string;
  healthOfficial: IStaff;
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

      <EditHealthOfficialInfo
        open={openEditOfficial}
        setOpen={setOpenEditOfficial}
        healthOfficial={healthOfficial}
      />
    </>
  );
};

export default EditOfficial;
