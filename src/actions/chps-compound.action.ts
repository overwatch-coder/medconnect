"use server";

import { fetchData, mutateData } from "@/actions/api-request.action";
import { currentUser } from "@/actions/user.action";
import { axiosInstance } from "@/lib/utils";
import { handleApiError } from "@/lib/validations";
import { ChpsCompound } from "@/types/backend";
import { CompoundType } from "@/types/index";

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
    // return handleApiError(error);
    console.log({
      error,
      axios: error?.response?.data,
      in: "chps-compound.action.ts",
    });

    return [];
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
): Promise<ChpsCompound> => {
  try {
    const user = await currentUser();
    if (!user || !user.isSuperAdmin) {
      throw new Error("You are not authorized to access this feature");
    }

    const formatData = {
      ...data,
      createdById: user?.admin?._id!,
      authUserId: user?.auth.id!,
      availableServices: data.availableServices
        ? data.availableServices.split(",")
        : [],
    };

    const res = await axiosInstance.post("/chps-compound", formatData, {
      headers: {
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as ChpsCompound;
  } catch (error: any) {
    // return handleApiError(error);
    console.log({
      error,
      axios: error?.response?.data,
      in: "chps-compound.action.ts",
    });

    return error;
  }
};

// === UPDATE CHPS COMPOUND ===
export const updateChpsCompound = async (data: ChpsCompound, id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const resData = await mutateData(`/chps-compound/${id}`, data, {
      method: "PATCH",
      token: user.auth.token,
    });

    if (!resData.status) {
      return resData;
    }

    return resData;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// === DELETE CHPS COMPOUND ===
export const deleteChpsCompound = async (id: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const resData = await mutateData(
      `/chps-compound/${id}`,
      {},
      {
        method: "DELETE",
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
