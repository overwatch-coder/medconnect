"use client";

import ContentHeader from "@/app/dashboard/patients/[patientId]/ContentHeader";
import EditMedicalHistoryForm from "@/app/dashboard/patients/[patientId]/tab-components/EditMedicalHistoryForm";
import UploadMedicalHistory from "@/app/dashboard/patients/[patientId]/tab-components/UploadMedicalHistory";
import { Button } from "@/components/ui/button";
import { Edit, Maximize2, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const MedicalHistory = () => {
  const [openUploadMedicalHistory, setOpenUploadMedicalHistory] =
    useState(false);
  const [openEditMedicalHistory, setOpenEditMedicalHistory] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 h-full w-full">
      <section className="flex flex-col w-full">
        <h2 className="text-lg flex items-center gap-3 font-bold text-white bg-secondary-gray p-3">
          <Maximize2 size={20} className="text-white cursor-pointer" />
          <span>Latest Medical History</span>
        </h2>

        <div className="w-full h-full">
          <Image
            src="/assets/images/medical-history.png"
            alt="Medical History"
            width={800}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col w-full">
        <h2 className="text-lg flex items-center gap-3 font-bold text-white bg-secondary-gray p-3">
          Details
        </h2>

        <div className="w-full h-full bg-white flex flex-col gap-3 p-3">
          <ContentHeader
            handleClick={() => setOpenEditMedicalHistory(true)}
            title="Medical History"
          >
            <span className="text-sm text-white">Modify</span>
            <Edit className="text-white" size={20} />
          </ContentHeader>

          <div className="flex flex-col gap-2 mt-4">
            <h2 className="text-primary-green font-medium">Problem Details</h2>
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Problem Start Date
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {`${Math.floor(Math.random() * 100 + 1900)}/${Math.floor(Math.random() * 12)}/${Math.floor(
                  Math.random() * 30
                )}`}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Problem Description
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {"Problem with the heart"}
              </p>
            </div>
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Cause of Current Problem
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {"Heart attack"}
              </p>
            </div>
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Surgery Requirement
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {["Yes", "No"][Math.floor(Math.random() * 2)]}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h2 className="text-primary-green font-medium">
              Past Medical History
            </h2>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Breathing Problems
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {["True", "False"][Math.floor(Math.random() * 2)]}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Current Wound/Skin Problems
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {["True", "False"][Math.floor(Math.random() * 2)]}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <h2 className="text-primary-green font-medium">
              Surgeries and Hospitalizations
            </h2>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Year</h3>
              <p className="text-primary-gray/50 font-medium">
                {Math.floor(Math.random() * 100 + 1900)}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Complications</h3>
              <p className="text-primary-gray/50 font-medium">
                {["True", "False"][Math.floor(Math.random() * 2)]}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end py-5 w-full">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <Button
              onClick={() => setOpenUploadMedicalHistory(true)}
              className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2"
            >
              <Plus className="text-white" size={20} />
              <span className="text-sm">Upload New History</span>
            </Button>

            <Button className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2">
              <span className="text-sm">View Past History</span>
            </Button>
          </div>
        </div>

        <UploadMedicalHistory
          open={openUploadMedicalHistory}
          setOpen={setOpenUploadMedicalHistory}
        />

        <EditMedicalHistoryForm
          open={openEditMedicalHistory}
          setOpen={setOpenEditMedicalHistory}
        />
      </section>
    </div>
  );
};

export default MedicalHistory;
