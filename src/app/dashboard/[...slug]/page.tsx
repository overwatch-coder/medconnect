import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import React from "react";

type DashboardTypeProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = ({ params: { slug } }: DashboardTypeProps) => {
  const pathname = `${slug}`;
  const routeHeader = /-/.test(pathname)
    ? pathname.replace(/-/g, " ")
    : pathname;

  return {
    title: `${routeHeader} - MedConnect`,
    description: `Welcome to the ${routeHeader} page of your MedConnect dashboard.`,
    icons: {
      icon: "/favicon.ico",
    },
  };
};

const DashboardType = ({ params: { slug } }: DashboardTypeProps) => {
  const pathname = `${slug}`;

  const routeHeader = /-/.test(pathname)
    ? pathname.replace(/-/g, " ")
    : pathname;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <DashboardContentHeader headerTitle={routeHeader} showDate={false} />

      <section className="flex flex-col gap-5"></section>
    </div>
  );
};

export default DashboardType;
