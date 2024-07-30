"use client";

import { getMedicalHistory } from "@/actions/single-patient.action";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import ContentHeader from "@/app/dashboard/patients/[patientId]/ContentHeader";
import EditMedicalHistoryForm from "@/app/dashboard/patients/[patientId]/tab-components/EditMedicalHistoryForm";
import PastMedicalHistoryReports from "@/app/dashboard/patients/[patientId]/tab-components/PastMedicalHistoryReports";
import UploadMedicalHistory from "@/app/dashboard/patients/[patientId]/tab-components/UploadMedicalHistory";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { IMedicalHistory, Patient } from "@/types/backend";
import { Edit, Maximize2, Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const MedicalHistory = ({ patient }: { patient: Patient }) => {
  const [openUploadMedicalHistory, setOpenUploadMedicalHistory] =
    useState(false);
  const [openEditMedicalHistory, setOpenEditMedicalHistory] = useState(false);

  const [medicalHistoryReports, setMedicalHistoryReports] = useState<
    IMedicalHistory[]
  >([]);
  const [medicalHistoryReport, setMedicalHistoryReport] =
    useState<IMedicalHistory | null>(null);

  const {
    data: medicalHistoryData,
    isLoading,
    refetch: refetchMedicalHistory,
  } = useFetch<IMedicalHistory[]>({
    queryFn: async () => getMedicalHistory(patient._id),
    queryKey: ["patients", "medical-history", patient._id],
  });

  useEffect(() => {
    if (medicalHistoryData) {
      setMedicalHistoryReports(medicalHistoryData);
      setMedicalHistoryReport(null);
    }
  }, [medicalHistoryData]);

  if (isLoading) {
    return (
      <RenderEmptyComponent>
        <ClipLoader color="#2d4763" loading={isLoading} size={25} />
      </RenderEmptyComponent>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 h-full w-full">
      <section className="flex flex-col w-full">
        <h2 className="text-lg flex items-center gap-3 font-bold text-white bg-secondary-gray p-3">
          <Maximize2 size={20} className="text-white cursor-pointer" />
          <span>Latest Medical History</span>
        </h2>

        <div className="w-full h-full">
          <Image
            src={
              medicalHistoryReports[medicalHistoryReports.length - 1]
                ?.formUrl || "/assets/images/medical-history.png"
            }
            alt="Medical History"
            width={800}
            height={500}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/assets/images/medical-history.png";
            }}
          />
        </div>
      </section>

      <section className="flex flex-col w-full">
        <h2 className="text-lg flex items-center gap-3 font-bold text-white bg-secondary-gray p-3">
          Latest Medical History Details
        </h2>

        {medicalHistoryReports.length > 0 ? (
          <div className="w-full h-full bg-white flex flex-col gap-3 p-3">
            <ContentHeader
              handleClick={() => {
                setMedicalHistoryReport(
                  medicalHistoryReports[medicalHistoryReports.length - 1]
                );
                setOpenEditMedicalHistory(true);
              }}
              title="Medical History"
            >
              <span className="text-sm text-white">Modify</span>
              <Edit className="text-white" size={20} />
            </ContentHeader>

            <div className="flex flex-col gap-2 mt-4">
              <h2 className="text-primary-green font-medium">
                Problem Details
              </h2>
              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Problem Start Date
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {
                    new Date(
                      medicalHistoryReports[
                        medicalHistoryReports.length - 1
                      ].date
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Problem Description
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {
                    medicalHistoryReports[medicalHistoryReports.length - 1]
                      .description
                  }
                </p>
              </div>
              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Cause of Current Problem
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {
                    medicalHistoryReports[medicalHistoryReports.length - 1]
                      .cause
                  }
                </p>
              </div>
              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Surgery Requirement
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {medicalHistoryReports[medicalHistoryReports.length - 1]
                    .wasSurgeryRequired
                    ? "Yes"
                    : "No"}
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
                  {medicalHistoryReports[medicalHistoryReports.length - 1]
                    .hasBreathingProblem
                    ? "True"
                    : "False"}
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Current Wound/Skin Problems
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {medicalHistoryReports[medicalHistoryReports.length - 1]
                    .hasSkinProblem
                    ? "True"
                    : "False"}
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
                  {
                    new Date(
                      medicalHistoryReports[
                        medicalHistoryReports.length - 1
                      ].hospitalizationDate
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Complications
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {medicalHistoryReports[medicalHistoryReports.length - 1]
                    .hadSurgeryComplication
                    ? "True"
                    : "False"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center py-5 text-secondary-gray">
            No medical history available for this patient yet!
          </p>
        )}

        <div className="flex items-center justify-end py-5 w-full">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <Button
              onClick={() => setOpenUploadMedicalHistory(true)}
              className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2"
            >
              <Plus className="text-white" size={20} />
              <span className="text-sm">Upload New History</span>
            </Button>

            {medicalHistoryReports.length > 1 && (
              <PastMedicalHistoryReports
                medicalHistoryReports={medicalHistoryReports}
                setMedicalHistoryReport={setMedicalHistoryReport}
                setOpenEditMedicalHistory={setOpenEditMedicalHistory}
              />
            )}
          </div>
        </div>

        <UploadMedicalHistory
          open={openUploadMedicalHistory}
          setOpen={setOpenUploadMedicalHistory}
          patientId={patient._id}
          refetchMedicalHistory={refetchMedicalHistory}
        />

        <EditMedicalHistoryForm
          open={openEditMedicalHistory}
          setOpen={setOpenEditMedicalHistory}
          patientId={patient._id}
          refetchMedicalHistory={refetchMedicalHistory}
          medicalHistoryReport={medicalHistoryReport!}
          setMedicalHistoryReport={setMedicalHistoryReport}
        />
      </section>
    </div>
  );
};

export default MedicalHistory;
