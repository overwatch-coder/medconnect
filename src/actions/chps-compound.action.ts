"use server";

import { fetchData, mutateData } from "@/actions/api-request.action";
import { currentUser } from "@/actions/user.action";
import { handleApiError } from "@/lib/validations";
import { ChpsCompound } from "@/types/backend";

// === GET ALL CHPS COMPOUNDS ===
export const getAllChpsCompounds = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const resData = await fetchData(`/chps-compound`, {
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
export const createChpsCompound = async (data: ChpsCompound) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const resData = await mutateData(`/chps-compound`, data, {
      method: "POST",
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
