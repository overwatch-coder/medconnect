"use client";

import { getDiagnosisReports } from "@/actions/single-patient.action";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import ContentHeader from "@/app/dashboard/patients/[patientId]/ContentHeader";
import EditDiagnosisReportForm from "@/app/dashboard/patients/[patientId]/tab-components/EditDiagnosisReport";
import PastDiagnosisReports from "@/app/dashboard/patients/[patientId]/tab-components/PastDiagnosisReports";
import UploadDiagnosisReport from "@/app/dashboard/patients/[patientId]/tab-components/UploadDiagnosisReport";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import { IDiagnosisReport, Patient } from "@/types/backend";
import { Edit, Maximize2, Plus } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const DiagnosisReport = ({ patient }: { patient: Patient }) => {
  const [openUploadDiagnosisReport, setOpenUploadDiagnosisReport] =
    useState(false);
  const [openEditDiagnosisReport, setOpenEditDiagnosisReport] = useState(false);
  const [diagnosisReports, setDiagnosisReports] = useState<IDiagnosisReport[]>(
    []
  );
  const [diagnosisReport, setDiagnosisReport] =
    useState<IDiagnosisReport | null>(null);

  const {
    data: diagnosisReportData,
    isLoading,
    refetch: refetchDiagnosisReports,
  } = useFetch<IDiagnosisReport[]>({
    queryFn: async () => getDiagnosisReports(patient._id),
    queryKey: ["patients", "diagnosis-reports", patient._id],
  });

  useEffect(() => {
    if (diagnosisReportData) {
      setDiagnosisReports(diagnosisReportData);
      setDiagnosisReport(null);
    }
  }, [diagnosisReportData]);

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
          Latest Diagnosis Report Details
        </h2>

        {diagnosisReports.length > 0 ? (
          <div className="w-full h-full bg-white flex flex-col gap-3 p-3">
            <ContentHeader
              handleClick={() => {
                setDiagnosisReport(
                  diagnosisReports[diagnosisReports.length - 1]
                );
                setOpenEditDiagnosisReport(true);
              }}
              title="Diagnosis Report"
            >
              <span className="text-sm text-white">Modify</span>
              <Edit className="text-white" size={20} />
            </ContentHeader>

            <div className="flex flex-col gap-2 mt-4">
              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">Report ID</h3>
                <p className="text-primary-gray/50 font-medium">
                  {
                    diagnosisReports[diagnosisReports.length - 1]
                      .diagnosisReportId
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">Doctor Name</h3>
                <p className="text-primary-gray/50 font-medium">
                  {diagnosisReports[diagnosisReports.length - 1].doctorName}
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Date of Diagnosis
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {
                    diagnosisReports[diagnosisReports.length - 1].date.split(
                      "T"
                    )[0]
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">Symptoms</h3>
                <p className="text-primary-gray/50 font-medium">
                  {diagnosisReports[diagnosisReports.length - 1].symptoms}
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Recommended Tests
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {
                    diagnosisReports[diagnosisReports.length - 1]
                      .recommendedTest
                  }
                </p>
              </div>

              <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                <h3 className="text-primary-gray font-semibold">
                  Follow-up Date
                </h3>
                <p className="text-primary-gray/50 font-medium">
                  {
                    diagnosisReports[
                      diagnosisReports.length - 1
                    ].followUpDate.split("T")[0]
                  }
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-3">
              <h2 className="text-primary-green font-medium">Notes</h2>

              <div className="flex flex-col w-full">
                <p className="text-sm text-secondary-gray">
                  {diagnosisReports[diagnosisReports.length - 1].notes}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center py-5 text-secondary-gray">
            No diagnosis reports available for this patient yet!
          </p>
        )}

        <div className="flex items-center justify-end py-5 w-full">
          <div className="flex flex-col gap-2 w-full md:w-1/2">
            <Button
              onClick={() => setOpenUploadDiagnosisReport(true)}
              className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2"
            >
              <Plus className="text-white" size={20} />
              <span className="text-sm">Upload New Report</span>
            </Button>

            {diagnosisReports.length > 1 && (
              <PastDiagnosisReports
                diagnosisReports={diagnosisReports}
                setDiagnosisReport={setDiagnosisReport}
                setOpenEditDiagnosisReport={setOpenEditDiagnosisReport}
              />
            )}
          </div>
        </div>

        <UploadDiagnosisReport
          open={openUploadDiagnosisReport}
          setOpen={setOpenUploadDiagnosisReport}
          patientId={patient._id}
          refetchDiagnosisReports={refetchDiagnosisReports}
        />

        <EditDiagnosisReportForm
          open={openEditDiagnosisReport}
          setOpen={setOpenEditDiagnosisReport}
          patientId={patient._id}
          refetchDiagnosisReports={refetchDiagnosisReports}
          diagnosisReport={diagnosisReport!}
          setDiagnosisReport={setDiagnosisReport}
        />
      </section>
    </div>
  );
};

export default DiagnosisReport;
