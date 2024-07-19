import React from "react";
import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AdminDashboard from "@/app/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/app/dashboard/SuperAdminDashboard";
import { getAllStaff } from "@/actions/staff.action";
import { getAllChpsCompounds } from "@/actions/chps-compound.action";

const Dashboard = async () => {
  const totalChpsCompounds = await getAllChpsCompounds();
  const totalHealthOfficials = await getAllStaff();

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <DashboardContentHeader headerTitle="Dashboard" showDate={true} />

      <AdminDashboard />

      <SuperAdminDashboard
        totalChpsCompounds={totalChpsCompounds}
        totalHealthOfficials={totalHealthOfficials}
      />
    </div>
  );
};

export default Dashboard;
