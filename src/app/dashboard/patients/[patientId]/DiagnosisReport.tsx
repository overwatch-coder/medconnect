"use client";

import ContentHeader from "@/app/dashboard/patients/[patientId]/ContentHeader";
import EditDiagnosisReportForm from "@/app/dashboard/patients/[patientId]/tab-components/EditDiagnosisReport";
import UploadDiagnosisReport from "@/app/dashboard/patients/[patientId]/tab-components/UploadDiagnosisReport";
import { Button } from "@/components/ui/button";
import { Edit, Maximize2, Plus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const DiagnosisReport = () => {
  const [openUploadDiagnosisReport, setOpenUploadDiagnosisReport] =
    useState(false);
  const [openEditDiagnosisReport, setOpenEditDiagnosisReport] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 h-full w-full">
      <section className="flex flex-col w-full">
        <h2 className="text-lg flex items-center gap-3 font-bold text-white bg-secondary-gray p-3">
          <Maximize2 size={20} className="text-white cursor-pointer" />
          <span>Latest Diagnosis Report</span>
        </h2>

        <div className="w-full h-full">
          <Image
            src="/assets/images/diagnosis-report.png"
            alt="Diagnosis Report"
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
            handleClick={() => setOpenEditDiagnosisReport(true)}
            title="Diagnosis Report"
          >
            <span className="text-sm text-white">Modify</span>
            <Edit className="text-white" size={20} />
          </ContentHeader>

          <div className="flex flex-col gap-2 mt-4">
            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Report ID</h3>
              <p className="text-primary-gray/50 font-medium">
                {`DR${Math.floor(Math.random() * 10000)}`}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Doctor Name</h3>
              <p className="text-primary-gray/50 font-medium">
                {
                  [
                    "Dr. John Doe",
                    "Dr. Jane Ashley",
                    "Dr. Mike Smith",
                    "Dr. Sarah Johnson",
                    "Dr. David Lee",
                    "Dr. Emily Brown",
                    "Dr. Michael Johnson",
                    "Dr. Rachel Smith",
                    "Dr. Ashley Johnson",
                    "Dr. Madison Brown",
                  ][Math.floor(Math.random() * 8)]
                }
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Date of Diagnosis
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {`${Math.floor(Math.random() * 100 + 2024)}-${Math.floor(Math.random() * 12)}-${Math.floor(
                  Math.random() * 30
                )}
                `}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">Symptoms</h3>
              <p className="text-primary-gray/50 font-medium">
                {"Fever, Cough, Headache"}
              </p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Recommended Tests
              </h3>
              <p className="text-primary-gray/50 font-medium">{"None"}</p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Medication Name
              </h3>
              <p className="text-primary-gray/50 font-medium">{"Ibuprofen"}</p>
            </div>

            <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
              <h3 className="text-primary-gray font-semibold">
                Follow-up Date
              </h3>
              <p className="text-primary-gray/50 font-medium">
                {`${Math.floor(Math.random() * 100 + 2024)}-${Math.floor(Math.random() * 12)}-${Math.floor(
                  Math.random() * 30
                )}
                `}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-3">
            <h2 className="text-primary-green font-medium">Notes</h2>

            <div className="flex flex-col w-full">
              <p className="text-sm text-secondary-gray">
                {
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra erat vel tellus tristique rutrum. Integer vulputate efficitur nibh. Morbi iaculis orci id eros fermentum vulputate. Curabitur cursus vel ante sed consectetur. Proin ut varius orci. Phasellus interdum ligula tempus, blandit risus sit amet, dapibus sem."
                }
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end py-5 w-full">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <Button
              onClick={() => setOpenUploadDiagnosisReport(true)}
              className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2"
            >
              <Plus className="text-white" size={20} />
              <span className="text-sm">Upload New Report</span>
            </Button>

            <Button className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2">
              <span className="text-sm">View Past Report</span>
            </Button>
          </div>
        </div>

        <UploadDiagnosisReport
          open={openUploadDiagnosisReport}
          setOpen={setOpenUploadDiagnosisReport}
        />

        <EditDiagnosisReportForm
          open={openEditDiagnosisReport}
          setOpen={setOpenEditDiagnosisReport}
        />
      </section>
    </div>
  );
};

export default DiagnosisReport;
