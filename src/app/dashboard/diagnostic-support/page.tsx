import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import { Metadata } from "next";
import DiagnosticSupportChat from "@/app/dashboard/diagnostic-support/DiagnosticSupportChat";

export const metadata: Metadata = {
  title: "Diagnostic Support - MedConnect",
  description: "Your diagnostic support",
  icons: {
    icon: "/favicon.ico",
  },
};

const DiagnosticSupport = () => {
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
