import React from "react";
import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AdminDashboard from "@/app/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/app/dashboard/SuperAdminDashboard";
import { currentUser } from "@/actions/user.action";

const Dashboard = async () => {
  const user = await currentUser();

  const isSuperAdmin = user?.isSuperAdmin;
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <DashboardContentHeader headerTitle="Dashboard" showDate={true} />

      {!isSuperAdmin && <AdminDashboard />}

      {isSuperAdmin && <SuperAdminDashboard />}
    </div>
  );
};

export default Dashboard;
