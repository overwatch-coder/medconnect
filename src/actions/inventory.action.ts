"use server";

import { currentUser } from "@/actions/user.action";
import { axiosInstance } from "@/lib/utils";
import { Inventory } from "@/types/backend";
import { InventoryType } from "@/types/index";
import { isAxiosError } from "axios";

// === INVENTORY ===
// get all inventories
export const getAllInventories = async (): Promise<Inventory[]> => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const res = await axiosInstance.get(
      `/chps-compound/${user?.staff?.chpsCompoundId}/inventories`,
      {
        headers: {
          Authorization: `Bearer ${user.auth.token}`,
        },
      }
    );

    const resData = res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    const inventories = resData?.data as Inventory[];

    return inventories.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.data?.message,
      in: "getAllInventories action",
    });

    return error;
  }
};

//create a new inventory
export const createOrEditInventory = async (
  data: InventoryType,
  inventoryId?: string
): Promise<Inventory> => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("You are not authorized the inventories");
    }

    const url = inventoryId
      ? `/chps-compound/${user?.staff?.chpsCompoundId}/inventory/${inventoryId}`
      : `/chps-compound/${user?.staff?.chpsCompoundId}/inventories`;

    const backendData = {
      name: data.productName,
      type: data.productType,
      inStock: data.inStock,
      receivedDate: data.receivedDate,
      expiryDate: data.expiryDate,
      manufacturer: data.manufacturer,
    };

    const res = await axiosInstance({
      method: inventoryId ? "PATCH" : "POST",
      url: url,
      data: backendData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    const inventory = resData?.data as Inventory;

    return inventory;
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

// delete inventory
export const deleteInventory = async (inventoryId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const res = await axiosInstance.delete(
      `/chps-compound/${user?.staff?.chpsCompoundId}/inventory/${inventoryId}`,
      {
        headers: {
          Authorization: `Bearer ${user.auth.token}`,
        },
      }
    );

    const resData = {
      status: true,
    };

    return resData;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.data?.message,
      in: "deleteInventory catch",
    });

    return error;
  }
};
