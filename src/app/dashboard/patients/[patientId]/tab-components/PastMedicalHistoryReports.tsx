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
import { IMedicalHistory } from "@/types/backend";
import ContentHeader from "@/app/dashboard/health-officials/[staffId]/ContentHeader";
import { Edit, X } from "lucide-react";

type PastMedicalHistoryReportsProps = {
  medicalHistoryReports: IMedicalHistory[];
  setMedicalHistoryReport: React.Dispatch<
    React.SetStateAction<IMedicalHistory | null>
  >;
  setOpenEditMedicalHistory: React.Dispatch<React.SetStateAction<boolean>>;
};

const PastMedicalHistoryReports = ({
  medicalHistoryReports,
  setMedicalHistoryReport,
  setOpenEditMedicalHistory,
}: PastMedicalHistoryReportsProps) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full bg-primary-green hover:bg-primary-green text-white text-center rounded-none px-4 py-3 flex items-center justify-center gap-2">
        <span className="text-sm">View Past History</span>
      </DialogTrigger>
      <DialogContent
        id="hide"
        className="w-full max-w-4xl h-[90vh] overflow-y-scroll scrollbar-hide"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl md:text-2xl text-secondary-gray font-bold">
              Past Histories (
              {
                medicalHistoryReports.slice(0, medicalHistoryReports.length - 1)
                  .length
              }
              )
            </span>
            <DialogClose onClick={() => setMedicalHistoryReport(null)}>
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            Manage all the medical history reports for this patient
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {medicalHistoryReports
            .slice(0, medicalHistoryReports.length - 1)
            .map((report) => (
              <div
                key={report._id}
                className="w-full h-full bg-white flex flex-col gap-3 p-3"
              >
                <ContentHeader
                  className="uppercase"
                  handleClick={() => {
                    setMedicalHistoryReport(report);
                    setOpenEditMedicalHistory(true);
                  }}
                  title={`Report ${report._id.slice(18)}`}
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
                      {new Date(report.date).toISOString().split("T")[0]}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Problem Description
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Cause of Current Problem
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.cause}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Surgery Requirement
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.wasSurgeryRequired ? "Yes" : "No"}
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
                      {report.hasBreathingProblem ? "True" : "False"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 place-content-start place-items-start text-sm">
                    <h3 className="text-primary-gray font-semibold">
                      Current Wound/Skin Problems
                    </h3>
                    <p className="text-primary-gray/50 font-medium">
                      {report.hasSkinProblem ? "True" : "False"}
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
                        new Date(report.hospitalizationDate)
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
                      {report.hadSurgeryComplication ? "True" : "False"}
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

export default PastMedicalHistoryReports;
