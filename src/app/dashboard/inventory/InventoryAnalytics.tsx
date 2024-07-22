"use client";

import { getAllInventories } from "@/actions/inventory.action";
import { RenderEmptyComponent } from "@/app/dashboard/health-officials/HealthOfficialsTable";
import { useFetch } from "@/hooks/useFetch";
import { Inventory } from "@/types/backend";
import React, { useState, useEffect } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const InventoryAnalytics = () => {
  const { data: inventoryData, isLoading } = useFetch<Inventory[]>({
    queryFn: async () => await getAllInventories(),
    queryKey: ["inventory"],
    enabled: true,
  });
  const [inventories, setInventories] = useState<Inventory[]>([]);

  useEffect(() => {
    if (inventoryData) {
      setInventories(inventoryData);
    }
  }, [inventoryData]);

  if (isLoading) {
    return <RenderEmptyComponent />;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Inventory Items */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Total Inventory Items
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>{inventories.length}</span>
            <span className="text-red-500 text-xs absolute bottom-0 left-10 flex items-center">
              <IoIosArrowRoundUp size={10} className="text-red-500" />{" "}
              <span>{Math.floor(Math.random() * 100)}%</span>
            </span>
          </p>
        </div>

        {/* Recently Added Items */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Recently Added Items
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {
                inventories.filter(
                  (item) =>
                    new Date(item.receivedDate).getTime() >
                    Date.now() - 1000 * 60 * 60 * 24 * 14
                ).length
              }
            </span>
          </p>
        </div>

        {/* Expired Items */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Expired Items
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {
                inventories.filter(
                  (item) => new Date(item.expiryDate).getTime() < Date.now()
                ).length
              }
            </span>
          </p>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white rounded-md p-4 col-span-1 flex flex-col gap-3  w-full">
          <h2 className="font-semibold text-secondary-gray md:text-lg">
            Low Stock Items
          </h2>

          <p className="font-bold text-2xl relative text-primary-green">
            <span>
              {inventories.filter((item) => item.inStock < 10).length}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InventoryAnalytics;
