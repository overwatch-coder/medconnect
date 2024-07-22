"use server";

import { fetchData, mutateData } from "@/actions/api-request.action";
import { currentUser } from "@/actions/user.action";
import { EditCompoundType } from "@/app/dashboard/compounds/EditCompound";
import { axiosInstance } from "@/lib/utils";
import { handleApiError } from "@/lib/validations";
import { ChpsCompound, IChpsCompound } from "@/types/backend";
import { CompoundType } from "@/types/index";
import { isAxiosError } from "axios";

// === GET ALL CHPS COMPOUNDS ===
export const getAllChpsCompounds = async (): Promise<ChpsCompound[]> => {
  try {
    const user = await currentUser();
    if (!user || !user.isSuperAdmin) {
      throw new Error("You are not authorized to access this feature");
    }

    const res = await axiosInstance.get("/chps-compound", {
      headers: {
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.data?.message,
      in: "chps-compound.action.ts",
    });

    return [];
  }
};

// === GET CHPS COMPOUND BY ID ===
export const getChpsById = async (chpsId: string): Promise<ChpsCompound> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const res = await axiosInstance.get(`/chps-compound/${chpsId}`, {
      headers: {
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      throw new Error(resData?.message || "Error fetching chps compound");
    }

    const chpsCompound = resData?.data as ChpsCompound;

    return chpsCompound;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      in: "getChpsById catch",
    });

    return error;
  }
};

// === GET CHPS COMPOUND ===
export const getChpsCompound = async () => {
  try {
    const user = await currentUser();
    if (!user || !user.staff) {
      throw new Error("You are not authorized to access this feature");
    }

    const resData = await fetchData(
      `/chps-compound/${user.staff.chpsCompoundId}`,
      {
        token: user.auth.token,
      }
    );

    if (!resData.status) {
      return resData;
    }

    return resData;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// === CREATE CHPS COMPOUND ===
export const createChpsCompound = async (
  data: CompoundType
): Promise<IChpsCompound> => {
  try {
    const user = await currentUser();
    if (!user || !user.isSuperAdmin) {
      throw new Error("You are not authorized to create a compound");
    }

    const url = "/chps-compound";

    const formatData = {
      ...data,
      profilePictureUrl: data.profilePictureUrl || "",
      availableServices: data.availableServices
        ? data.availableServices.split(",")
        : [],
    };

    const res = await axiosInstance.post(url, formatData, {
      headers: {
        Authorization: `Bearer ${user.auth.token}`,
        "Content-Type": "application/json",
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      throw new Error(resData?.message || "Error creating compound");
    }

    return resData?.data as IChpsCompound;
  } catch (error: any) {
    console.log({
      error,
      axios: error?.response?.data,
      in: "createChpsCompound catch",
    });

    if (
      isAxiosError(error) &&
      error?.response?.data?.message.includes("Duplicate key error")
    ) {
      throw new Error("Compound name already exists!");
    }

    return error;
  }
};

// === UPDATE CHPS COMPOUND ===
export const updateChpsCompound = async (
  data: EditCompoundType,
  chpsId: string
): Promise<ChpsCompound> => {
  try {
    const user = await currentUser();
    if (!user || !user.isSuperAdmin) {
      throw new Error("You are not authorized to update a compound");
    }

    const url = `/chps-compound/${chpsId}`;

    const formatData = {
      ...data,
      profilePictureUrl: data.profilePictureUrl || "",
      availableServices: data.availableServices
        ? data.availableServices.split(",")
        : [],
    };

    const res = await axiosInstance.put(url, formatData, {
      headers: {
        Authorization: `Bearer ${user.auth.token}`,
        "Content-Type": "application/json",
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      throw new Error(resData?.message || "Error updating compound");
    }

    return resData?.data as ChpsCompound;
  } catch (error: any) {
    console.log({
      error,
      axios: error?.response?.data,
      in: "updateChpsCompound catch",
    });

    if (
      isAxiosError(error) &&
      error?.response?.data?.message.includes("Duplicate key error")
    ) {
      throw new Error("Compound name already exists!");
    }

    return error;
  }
};

// === DELETE CHPS COMPOUND ===
export const deleteChpsCompound = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to delete this compound");
    }

    const res = await axiosInstance.delete(`/chps-compound/${id}`, {
      headers: {
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    const resData = {
      status: true,
    };

    return resData;
  } catch (error: any) {
    console.log({ error, in: "deleteChpsCompound catch" });
    return error;
  }
};
