"use server";

import { currentUser } from "@/actions/user.action";
import { axiosInstance } from "@/lib/utils";
import { ITicket } from "@/types/backend";
import { TicketType } from "@/types/index";

// get qll tickets
export const getAllTickets = async (): Promise<ITicket[]> => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized. Please login again.");
    }

    const url = user?.isSuperAdmin
      ? `/admin/${user?.admin?._id}/tickets`
      : `/chps-compound/${user?.staff?.chpsCompoundId}/tickets`;

    const res = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as ITicket[];
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.message,
      in: "getChspsTickets catch",
    });

    return error;
  }
};

// create a new ticket
export const createTicket = async (data: TicketType): Promise<ITicket> => {
  try {
    const user = await currentUser();

    if (!user || user.isSuperAdmin) {
      throw new Error("Unauthorized access.");
    }

    const url = `/chps-compound/${user?.staff?.chpsCompoundId}/tickets`;

    const formData = {
      subject: data.subject,
      description: data.description,
      imageUrl: data.attachment as string,
    };

    const res = await axiosInstance.post(url, formData, {
      headers: {
        Authorization: `Bearer ${user?.auth.token}`,
        "Content-Type": "application/json",
      },
    });

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as ITicket;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.message,
      in: "createTicket catch",
    });

    return error;
  }
};

// update an existing ticket
export const updateTicket = async (
  data: {
    status: "OPEN" | "CLOSED";
    priority: "HIGH" | "MEDIUM" | "LOW";
  },
  ticketId: string
) => {
  try {
    const user = await currentUser();

    if (!user || !user.isSuperAdmin) {
      throw new Error("Unauthorized access.");
    }

    const url = `/admin/${user?.admin?._id}/tickets/${ticketId}`;

    const formData = {
      status: data.status,
      priority: data.priority,
    };

    const res = await axiosInstance.patch(url, formData, {
      headers: {
        Authorization: `Bearer ${user?.auth.token}`,
        "Content-Type": "application/json",
      },
    });

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as ITicket;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.message,
      in: "updateTicket catch",
    });

    return error;
  }
};

// delete ticket
export const deleteTicket = async (ticketId: string) => {
  try {
    const user = await currentUser();

    if (!user || !user.isSuperAdmin) {
      throw new Error("Unauthorized access.");
    }

    const url = `/admin/${user?.admin?._id}/tickets/${ticketId}`;

    const res = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${user?.auth.token}`,
        "Content-Type": "application/json",
      },
    });

    console.log({ res, in: "deleteTicker res" });

    const resData = { status: true };

    return resData;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.response?.message,
      in: "deleteTicket catch",
    });

    return error;
  }
};
