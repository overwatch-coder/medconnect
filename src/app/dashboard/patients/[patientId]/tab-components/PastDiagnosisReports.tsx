"use client";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IDiagnosisReport } from "@/types/backend";
import ContentHeader from "@/app/dashboard/health-officials/[staffId]/ContentHeader";
import { Edit, X } from "lucide-react";

type PastDiagnosisReportsProps = {
  diagnosisReports: IDiagnosisReport[];
  setDiagnosisReport: React.Dispatch<
    React.SetStateAction<IDiagnosisReport | null>
  >;
  setOpenEditDiagnosisReport: React.Dispatch<React.SetStateAction<boolean>>;
};

const PastDiagnosisReports = ({
  diagnosisReports,
  setDiagnosisReport,
  setOpenEditDiagnosisReport,
}: PastDiagnosisReportsProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2">
        <span className="text-sm">View Past Reports</span>
      </DialogTrigger>
      <DialogContent
        id="hide"
        className="w-full max-w-4xl h-[90vh] overflow-y-scroll scrollbar-hide"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl md:text-2xl text-secondary-gray font-bold">
              Past Reports (
              {diagnosisReports.slice(0, diagnosisReports.length - 1).length})
            </span>
            <DialogClose onClick={() => setDiagnosisReport(null)}>
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            Manage all the treament reports for this patient
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {diagnosisReports
            .slice(0, diagnosisReports.length - 1)
            .map((report) => (
              <div
                key={report._id}
                className="w-full h-full bg-white flex flex-col gap-3 p-3"
              >
                <ContentHeader
                  handleClick={() => {
                    setDiagnosisReport(report);
                    setOpenEditDiagnosisReport(true);
                  }}
                  title={`Report ${report.diagnosisReportId}`}
                >
                  <span className="text-sm text-white">Modify</span>
                  <Edit className="text-white" size={20} />
                </ContentHeader>

                <div className="flex flex-col gap-2 mt-4">
                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Report ID
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.diagnosisReportId}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Doctor Name
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.doctorName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Date of Diagnosis
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.date.split("T")[0]}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Symptoms
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.symptoms}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Recommended Tests
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.recommendedTest}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Follow-up Date
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.followUpDate.split("T")[0]}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-3">
                  <h2 className="text-primary-green font-medium">Notes</h2>

                  <div className="flex flex-col w-full">
                    <p className="text-sm text-secondary-gray">
                      {report.notes}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PastDiagnosisReports;
