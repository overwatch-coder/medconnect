"use server";

import { currentUser } from "@/actions/user.action";
import { HealthSubmitData } from "@/app/dashboard/health-officials/add-official/AddHealthOfficialInfo";
import { axiosInstance } from "@/lib/utils";
import { IStaff } from "@/types/backend";

// === GET ALL STAFF ===
export const getAllStaff = async (
  role: string = "admin"
): Promise<IStaff[]> => {
  try {
    const user = await currentUser();
    if (!user || !user.isSuperAdmin) {
      throw new Error("You are not authorized to access this feature");
    }

    const res = await axiosInstance.get(`/staff/${role}`, {
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
      axios: error?.response?.data,
      in: "staff.action.ts",
    });

    return [];
  }
};

// === GET STAFF BY COMPOUND ID ===
export const getStaffByCompoundId = async (
  chpsId: string
): Promise<IStaff[]> => {
  try {
    const user = await currentUser();
    const res = axiosInstance.get(`/staff/${chpsId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const data = (await res).data;

    return data?.data as IStaff[];
  } catch (error: any) {
    console.log({ error, in: "getStaffByCompoundId" });
    return error;
  }
};

// === CREATE OR EDIT STAFF ===
export const createOrEditStaff = async (data: {
  data: HealthSubmitData;
  staffId?: string;
  deleteStaff?: boolean;
}) => {
  try {
    const user = await currentUser();
    const url = data.staffId
      ? `/staff/${user?.staff?.chpsCompoundId}/${data.staffId}`
      : `/staff`;

    const res = await axiosInstance({
      method: data.deleteStaff ? "DELETE" : data.staffId ? "PUT" : "POST",
      url: url,
      data: data.data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as IStaff;
  } catch (error: any) {
    console.log({
      error,
      in: "createOrEditStaff error",
      data: error?.response?.data?.message[0]?.path,
    });
    return error;
  }
};
