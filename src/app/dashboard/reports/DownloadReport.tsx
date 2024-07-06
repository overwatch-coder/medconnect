import { ReportType } from "@/app/dashboard/reports/page";
import { Button } from "@/components/ui/button";
import { User } from "@/types/index";
import { ArrowLeft, Download, Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type DownloadReportProps = {
  report: ReportType;
  user: Omit<User, "password">;
  isAdmin: boolean;
  setShowDownload: (showDownload: boolean) => void;
};

const DownloadReport = ({
  report,
  user,
  isAdmin,
  setShowDownload,
}: DownloadReportProps) => {
  return (
    <section className="w-full flex items-start justify-center mx-auto max-w-xl">
      <div className="flex flex-col gap-5 w-full">
        <Link
          href="#"
          onClick={() => setShowDownload(false)}
          className="flex items-center gap-2 group w-fit"
        >
          <ArrowLeft
            className="text-secondary-gray group-hover:text-primary-green"
            size={20}
          />
          <span className="text-secondary-gray group-hover:text-primary-green">
            Back to Reports
          </span>
        </Link>

        <section className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full p-3 bg-secondary-gray">
            <h2 className="text-lg flex items-center gap-3 font-bold text-white">
              <Maximize2 size={20} className="text-white cursor-pointer" />
              <span>{report.name}</span>
            </h2>

            <Button className="bg-white hover:bg-white text-secondary-gray text-center rounded px-5 py-3 flex items-center justify-center gap-2">
              <span className="text-sm">Download Report</span>
              <Download className="text-secondary-gray" size={20} />
            </Button>
          </div>

          <div className="w-full h-full">
            <Image
              src="/assets/images/download-report.png"
              alt={report.name}
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </div>
    </section>
  );
};

export default DownloadReport;
