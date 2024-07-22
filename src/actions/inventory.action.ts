"use server";

import { fetchData, mutateData } from "@/actions/api-request.action";
import { currentUser } from "@/actions/user.action";
import { axiosInstance } from "@/lib/utils";
import { handleApiError } from "@/lib/validations";
import { Inventory } from "@/types/backend";
import { InventoryType } from "@/types/index";
import { isAxiosError } from "axios";

//create a new inventory
export const createOrEditInventory = async (
  data: Inventory,
  inventoryId?: string
): Promise<Inventory> => {
  try {
    const user = await currentUser();

    const url = inventoryId
      ? `/chps-compound/${user?.staff?.chpsCompoundId}/inventory/${inventoryId}`
      : `/chps-compound/${user?.staff?.chpsCompoundId}/inventories`;

    const res = await axiosInstance({
      method: data.name ? "DELETE" : data.inventoryId ? "PUT" : "POST",
      url: url,
      data: data.name,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as Inventory;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      in: "createOrEditInventory catch",
    });
    if (
      isAxiosError(error) &&
      error?.response?.data.message.includes('Duplicate key error {"name')
    ) {
      throw new Error("Product name already exists!");
    }
    return error;
  }
};
