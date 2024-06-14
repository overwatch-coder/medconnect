import React from "react";
import { Metadata } from "next";
import AddCompoundForm from "@/app/dashboard/compounds/add-new/AddCompoundForm";

export const metadata: Metadata = {
  title: "Add Compound - MedConnect",
  description: "Add your compounds with ease",
};

const AddCompound = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <AddCompoundForm />
    </div>
  );
};

export default AddCompound;
