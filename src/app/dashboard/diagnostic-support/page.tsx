import { Metadata } from "next";

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
      <p>Diagnostic Support</p>
    </div>
  );
};

export default DiagnosticSupport;
