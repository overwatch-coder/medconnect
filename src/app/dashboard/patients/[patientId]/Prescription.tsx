"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoMdArrowDropdown } from "react-icons/io";
import { MEDCONNECT_DASHBOARD_PATIENT_PRESCRIPTIONS as prescriptions } from "@/constants";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddPrescription from "@/app/dashboard/patients/[patientId]/tab-components/AddPrescription";

const Prescription = () => {
  const [openAddPrescription, setOpenAddPrescription] = useState(false);

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-5"
      >
        {prescriptions.map((prescription, index) => (
          <AccordionItem value={prescription.prescriptionID} key={index}>
            <AccordionTrigger className="bg-white group text-secondary-gray hover:bg-white hover:text-secondary-gray px-5 py-3 w-full flex items-center justify-between rounded-none [&[data-state=open]]:bg-white [&[data-state=open]]:text-secondary-gray border-b border-b-secondary-gray">
              <p className="flex items-center gap-2">
                <span className="text-lg font-semibold text-start">
                  {prescription.prescriptionFor}
                </span>
                <span className="w-[1px] h-5 bg-secondary-gray" />
                <span>{prescription.date}</span>
              </p>
              <IoMdArrowDropdown
                size={30}
                className="text-secondary-gray group-[&[data-state=open]]:text-secondary-gray group-hover:text-secondary-gray"
              />
            </AccordionTrigger>

            <AccordionContent className="bg-white/60 shadow text-start text-white px-5 py-4 rounded-b-xl text-lg flex flex-col gap-3">
              <div className="flex flex-col gap-2 mt-4">
                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">
                    Prescription ID
                  </h3>
                  <p className="text-primary-gray/50 font-medium">
                    {prescription.prescriptionID}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">
                    Health Official Name
                  </h3>
                  <p className="text-primary-gray/50 font-medium">
                    {prescription.healthOfficialName}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">
                    Date Issued
                  </h3>
                  <p className="text-primary-gray/50 font-medium">
                    {prescription.date}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <h2 className="text-primary-green font-medium">Medications</h2>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">
                    Medication Name
                  </h3>
                  <p className="text-primary-gray/50 font-medium">
                    {prescription.medications.medicationName}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">Dosage</h3>
                  <p className="text-primary-gray/50 font-medium">
                    {prescription.medications.dosage}
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">Frequency</h3>
                  <p className="text-primary-gray/50 font-medium">
                    {prescription.medications.frequency}{" "}
                    {prescription.medications.frequency === 1
                      ? "time"
                      : "times"}{" "}
                    per day
                  </p>
                </div>

                <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                  <h3 className="text-primary-gray font-semibold">Duration</h3>
                  <p className="text-primary-gray/50 font-medium">
                    {prescription.medications.duration}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <h2 className="text-primary-green font-medium">Notes</h2>

                <div className="text-sm w-full max-w-md text-secondary-gray">
                  <p>{prescription.notes}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex items-center justify-end py-5 w-full">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <Button
            onClick={() => setOpenAddPrescription(true)}
            className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-4 flex items-center justify-center gap-2"
          >
            <Plus className="text-white" size={20} />
            <span className="text-sm">Add New Prescription</span>
          </Button>
        </div>
      </div>

      <AddPrescription
        open={openAddPrescription}
        setOpen={setOpenAddPrescription}
      />
    </div>
  );
};

export default Prescription;
