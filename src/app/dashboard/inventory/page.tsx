import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import InventoryTable from "@/app/dashboard/inventory/InventoryTable";
import AddInventory from "@/app/dashboard/inventory/AddInventory";
import InventoryAnalytics from "@/app/dashboard/inventory/InventoryAnalytics";

export const metadata: Metadata = {
  title: "Inventory - MedConnect",
  description: "Manage your inventory",
  icons: {
    icon: "/favicon.ico",
  },
};

const Inventory = () => {
  return (
    <div className="flex flex-col gap-5 w-full my-5 relative">
      <DashboardContentHeader
        headerTitle={"Inventory Overview"}
        showDate={false}
      >
        <AddInventory />
      </DashboardContentHeader>

      {/* Data Overview */}
      <InventoryAnalytics />

      <section className="bg-white rounded-md shadow w-full">
        <div className="border-b border-b-secondary-gray w-full flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full p-3">
            <h2 className="text-secondary-gray text-xl font-medium">
              Medicine Inventory
            </h2>

            <Button className="bg-transparent hover:bg-transparent border-2 border-primary-green hover:scale-105 transition py-2 px-5 flex items-center gap-3 rounded-md text-white">
              <Upload className="text-primary-green" size={20} />
              <span className="font-bold text-primary-green">Upload</span>
            </Button>
          </div>
        </div>

        {/* Inventory Table */}
        <InventoryTable />
      </section>
    </div>
  );
};

export default Inventory;
