"use server";

import { currentUser } from "@/actions/user.action";
import { RegisterProgramSchemaType } from "@/app/dashboard/outreach-programs/[programId]/RegisterProgram";
import { axiosInstance } from "@/lib/utils";
import { IOutreachProgram, IOutreachProgramChoice } from "@/types/backend";
import { OutreachProgramType } from "@/types/index";

// === OUTREACH PROGRAMS ===

// get all outreach programs
export const getAllOutreachPrograms = async (): Promise<IOutreachProgram[]> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const userId = user.isSuperAdmin ? user?.admin?._id : user?.staff?._id;

    const res = await axiosInstance.get(`/admin/${userId}/outreach-programs`, {
      headers: {
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message || "Unable to fetch outreach programs");
    }

    return resData?.data as IOutreachProgram[];
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.data?.message,
      in: "getAllOutreachPrograms action",
    });

    return error;
  }
};

// get a single outreach program
export const getOutreachProgram = async (
  programId: string
): Promise<IOutreachProgram> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const userId = user.isSuperAdmin ? user?.admin?._id : user?.staff?._id;

    const res = await axiosInstance.get(
      `/admin/${userId}/outreach-programs/${programId}`,
      {
        headers: {
          Authorization: `Bearer ${user.auth.token}`,
        },
      }
    );

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message || "Unable to fetch outreach program");
    }

    return resData?.data as IOutreachProgram;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.data?.message,
      in: "getOutreachProgram action",
    });

    return error;
  }
};

// create a new outreach program
export const createOrEditOutreachProgram = async (
  data: OutreachProgramType,
  programId?: string
): Promise<IOutreachProgram> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const userId = user.isSuperAdmin ? user?.admin?._id : user?.staff?._id;

    const url = programId
      ? `/admin/${userId}/outreach-programs/${programId}`
      : `/admin/${userId}/outreach-programs`;

    const backendData = {
      title: data.title,
      description: data.description,
      organizerName: data.organizerName,
      organizerPhone: data.phoneNumber,
      organization: data.organization,
      location: data.location,
      targetGroup: data.targetGroup,
      estimatedAudience: data.numberOfParticipants,
      programDate: data.programDate,
      programStartTime: data.programStartTime,
    };

    const res = await axiosInstance({
      method: programId ? "PATCH" : "POST",
      url: url,
      data: backendData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(
        resData?.message || "Unable to create or edit outreach program"
      );
    }

    return resData?.data as IOutreachProgram;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      in: "createOrEditOutreachProgram catch",
    });

    return error;
  }
};

// delete outreach program
export const deleteOutreachProgram = async (programId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You are not authorized to access this feature");
    }

    const userId = user.isSuperAdmin ? user?.admin?._id : user?.staff?._id;

    const res = await axiosInstance.delete(
      `/admin/${userId}/outreach-programs/${programId}`,
      {
        headers: {
          Authorization: `Bearer ${user.auth.token}`,
        },
      }
    );

    if (res.status !== 204) {
      throw new Error("Unable to delete outreach program");
    }

    const resData = {
      status: true,
    };

    return resData;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.data?.message,
      in: "deleteOutreachProgram catch",
    });

    return error;
  }
};

// === OUTREACH PROGRAM PARTICIPATION ===
// submit a participation request (volunteer or participate)
export const submitOutreachProgramParticipation = async (
  data: RegisterProgramSchemaType
): Promise<IOutreachProgramChoice> => {
  try {
    const user = await currentUser();
    if (!user || user.isSuperAdmin) {
      throw new Error("You are not authorized to access this feature");
    }

    const backendData =
      data.choice === "Volunteer"
        ? {
            status: data.status === "true" ? true : false,
            choice: data.choice,
            outreachProgramId: data.outreachProgramId,
            supportType: data.supportType!,
          }
        : {
            status: data.status === "true" ? true : false,
            choice: data.choice,
            outreachProgramId: data.outreachProgramId,
          };

    const chpsId = user.staff?.chpsCompoundId;

    const res = await axiosInstance({
      method: "POST",
      url: `/chps-compound/${chpsId}/outreach-participations`,
      data: backendData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message || "Unable to submit participation");
    }

    return resData?.data as IOutreachProgramChoice;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.data?.message,
      in: "submitOutreachProgramParticipation catch",
    });

    return error;
  }
};
