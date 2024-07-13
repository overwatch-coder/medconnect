import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import { Metadata } from "next";
import DiagnosticSupportChat from "@/app/dashboard/diagnostic-support/DiagnosticSupportChat";
import { getChpsCompound } from "@/actions/chps-compound.action";
import { ChpsCompound } from "@/types/backend";

export const metadata: Metadata = {
  title: "Diagnostic Support - MedConnect",
  description: "Your diagnostic support",
  icons: {
    icon: "/favicon.ico",
  },
};

const DiagnosticSupport = async () => {
  // const result = await getChpsCompound();

  // const chpsCompound = result.status ? (result.data as ChpsCompound) : null;

  return (
    <div className="flex flex-col gap-5 w-full my-5">
      <section className="flex flex-col gap-5 w-full h-full">
        <DashboardContentHeader
          headerTitle="Diagnostic Support"
          showDate={true}
        />

        <DiagnosticSupportChat />
      </section>
    </div>
  );
};

export default DiagnosticSupport;
