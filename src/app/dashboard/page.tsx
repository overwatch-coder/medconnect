import React from "react";
import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AdminDashboard from "@/app/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/app/dashboard/SuperAdminDashboard";
import { getPatients } from "@/actions/patients.action";
import { Patient } from "@/types/backend";

const Dashboard = async () => {
  const data = await getPatients();
  const patients = data.status ? (data.data as Patient[]) : [];

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <DashboardContentHeader headerTitle="Dashboard" showDate={true} />

      <AdminDashboard patients={patients} />

      <SuperAdminDashboard />
    </div>
  );
};

export default Dashboard;
