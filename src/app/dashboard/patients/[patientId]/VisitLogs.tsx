"use client";

import { getVisitLogs } from "@/actions/single-patient.action";
import AddVisitLog from "@/app/dashboard/patients/[patientId]/visit-logs/AddVisitLog";
import VisitLogsTable from "@/app/dashboard/patients/[patientId]/visit-logs/VisitLogsTable";
import { useFetch } from "@/hooks/useFetch";
import { IVisitLogs, Patient } from "@/types/backend";

const VisitLogs = ({ patient }: { patient: Patient }) => {
  const {
    data: visitLogs,
    isLoading,
    refetch: refetchLogs,
  } = useFetch<IVisitLogs[]>({
    queryFn: async () => getVisitLogs(patient._id),
    queryKey: ["patients", "visit-logs", patient._id],
  });

  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <section className="bg-white rounded-md shadow w-full">
        <div className="border-b border-b-secondary-gray w-full flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full p-3">
            <h2 className="text-secondary-gray text-xl font-medium">
              All Patient Visit Logs
            </h2>

            <AddVisitLog patient={patient} refetchLogs={refetchLogs} />
          </div>
        </div>

        {/* Visit Logs Table */}
        <VisitLogsTable visitLogs={visitLogs} isLoading={isLoading} />
      </section>
    </div>
  );
};

export default VisitLogs;
