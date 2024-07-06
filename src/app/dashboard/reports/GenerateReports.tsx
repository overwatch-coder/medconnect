"use client";
import DownloadReport from "@/app/dashboard/reports/DownloadReport";
import { ReportType } from "@/app/dashboard/reports/page";
import ReportAnalytics from "@/app/dashboard/reports/ReportAnalytics";
import CustomInputForm from "@/components/CustomInputForm";
import { Button } from "@/components/ui/button";
import { getAllMonths, getAllYears } from "@/lib/utils";
import { User } from "@/types/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { z } from "zod";

type GenerateReportsProps = {
  reports: ReportType[];
  user: Omit<User, "password">;
  isAdmin: boolean;
};

const generateReportSchema = z.object({
  type: z.string().min(1, "Please select a type"),
  year: z.string().min(4, "Please select a year"),
  month: z.string().min(2, "Please select a month"),
  reportType: z.string().min(1, "Please select a report type"),
  userId: z.string().min(1, "Please select a user"),
  reportName: z.string().min(1, "Please enter a report name"),
});

type GenerateReportsFormData = z.infer<typeof generateReportSchema>;

const GenerateReports = ({ reports, user, isAdmin }: GenerateReportsProps) => {
  const [selectedReport, setSelectedReport] = useState<ReportType>(reports[0]);
  const [showDownload, setShowDownload] = useState(false);

  const handleReportChange = (report: ReportType) => {
    setSelectedReport(report);
    reset();
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GenerateReportsFormData>({
    resolver: zodResolver(generateReportSchema),
    defaultValues: {
      userId: user._id,
      reportType: selectedReport.type,
      reportName: selectedReport.name,
    },
    mode: "all",
  });

  const { mutateAsync, isPending: pending } = useMutation({
    mutationKey: ["report"],
    mutationFn: async (data: GenerateReportsFormData) => {
      console.log(data);
      return data;
    },
    onSuccess: () => {
      console.log("success");
      toast.success("Report generated successfully");
      setShowDownload(true);
      reset();
    },
  });

  const handleFormSubmit = async (data: GenerateReportsFormData) => {
    console.log(data);
    await mutateAsync(data);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {isAdmin && !showDownload && <ReportAnalytics />}

      {!showDownload ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full h-full">
          <section className="bg-white rounded-md shadow w-full flex flex-col gap-5 p-5 col-span-1">
            <h2 className="font-bold text-xl text-primary-green">
              Report Type
            </h2>

            <div className="flex flex-col items-start gap-4 w-full">
              {reports.map((report) => (
                <Button
                  key={report.type}
                  className={`flex flex-col items-start text-start gap-2 ${isAdmin ? `p-3 w-full md:w-2/3 ${report.type === selectedReport.type ? "bg-primary-green hover:bg-primary-green" : "bg-secondary-gray hover:bg-secondary-gray"} ` : "bg-transparent hover:bg-transparent"}`}
                  onClick={() => handleReportChange(report)}
                >
                  <span
                    className={`font-medium ${isAdmin ? "text-white text-base" : `text-black text-lg hover:text-primary-green ${report.type === selectedReport.type ? "text-primary-green" : "text-black"}`}`}
                  >
                    {isAdmin ? report.name : report.name.split(" ")[0]}
                  </span>
                </Button>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-md shadow w-full flex flex-col gap-5 p-5 col-span-1">
            <h2 className="font-bold text-xl text-primary-green">
              {selectedReport.name}
            </h2>

            <form
              className="flex flex-col gap-4 w-full md:w-1/2"
              method="POST"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <CustomInputForm
                labelName="Type"
                inputName="type"
                register={register}
                errors={errors}
                inputType="select"
                selectOptions={selectedReport.reportTypes.map((reportType) => ({
                  value: reportType.value,
                  label: reportType.name,
                }))}
                placeholderText="Select a report type"
              />

              <CustomInputForm
                labelName="Year"
                inputName="year"
                register={register}
                errors={errors}
                inputType="select"
                selectOptions={getAllYears().map((year) => ({
                  value: year.toString(),
                  label: year.toString(),
                }))}
                placeholderText="Select a report year"
              />

              <CustomInputForm
                labelName="Month"
                inputName="month"
                register={register}
                errors={errors}
                inputType="select"
                selectOptions={getAllMonths().map((month) => ({
                  value: month,
                  label: month,
                }))}
                placeholderText="Select a report month"
              />

              <CustomInputForm
                labelName="Report Type"
                inputName="reportType"
                register={register}
                errors={errors}
                inputType="hidden"
                value={selectedReport.type}
                placeholderText="Enter main report type"
              />

              <CustomInputForm
                labelName="User ID"
                inputName="userId"
                register={register}
                errors={errors}
                inputType="hidden"
                value={user._id}
                placeholderText="Enter User ID"
              />

              <CustomInputForm
                labelName="Report Name"
                inputName="reportName"
                register={register}
                errors={errors}
                inputType="hidden"
                value={selectedReport.name}
                placeholderText="Enter a report name"
              />

              <Button
                className="w-full text-white text-center bg-primary-green hover:bg-primary-green rounded-none"
                disabled={pending}
              >
                {pending ? (
                  <ClipLoader size={28} loading={pending} color="white" />
                ) : (
                  "Generate Report"
                )}
              </Button>
            </form>
          </section>
        </div>
      ) : (
        <DownloadReport
          report={selectedReport}
          user={user}
          isAdmin={isAdmin}
          setShowDownload={setShowDownload}
        />
      )}
    </div>
  );
};

export default GenerateReports;
