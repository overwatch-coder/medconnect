import DashboardContentHeader from "@/app/dashboard/DashboardContentHeader";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { Metadata } from "next";
import React from "react";
import { IoIosArrowRoundUp } from "react-icons/io";
import InventoryTable from "@/app/dashboard/inventory/InventoryTable";
import AddInventory from "@/app/dashboard/inventory/AddInventory";

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

      {/* Patients Data Overview */}
      <div className="flex flex-col gap-2 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Total Inventory Items */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Total Inventory Items
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>60</span>
              <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
                <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
                <span>10%</span>
              </span>
            </p>
          </div>

          {/* Recently Added Items */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Recently Added Items
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>100</span>
            </p>
          </div>

          {/* Expired Items */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Expired Items
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>300</span>
            </p>
          </div>

          {/* Low Stock Items */}
          <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
            <h2 className="font-semibold text-secondary-gray md:text-lg">
              Low Stock Items
            </h2>

            <p className="font-bold text-2xl relative text-primary-green">
              <span>50</span>
            </p>
          </div>
        </div>
      </div>

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
