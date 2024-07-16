import React from "react";
import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import AdminDashboard from "@/app/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/app/dashboard/SuperAdminDashboard";
import { getPatients } from "@/actions/patients.action";
import { Patient } from "@/types/backend";
import { getStaffByCompoundId } from "@/actions/staff.action";
import { currentUser } from "@/actions/user.action";

const Dashboard = async () => {
  const user = await currentUser();
  const patients = (await getPatients()) as Patient[];
  const healthOfficials = await getStaffByCompoundId(user?.staff?.chpsCompoundId!);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <DashboardContentHeader headerTitle="Dashboard" showDate={true} />

      <AdminDashboard patients={patients} healthOfficials={healthOfficials} />

      <SuperAdminDashboard />
    </div>
  );
};

export default Dashboard;
