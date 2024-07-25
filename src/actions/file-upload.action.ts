"use server";

import { currentUser } from "@/actions/user.action";
import { axiosInstance } from "@/lib/utils";

// === Upload File ===
export const uploadFile = async (file: File): Promise<string> => {
  try {
    const user = await currentUser();

    console.log({ user, file, in: "uploadFile try" });

    if (!user) {
      throw new Error("Unauthorized access!. Please login.");
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    console.log({ res, in: "uploadFile res" });

    if (res.status !== 200) {
      throw new Error("Could not upload file. Please try again.");
    }

    const fileUrl: string = res.data.fileUrl;

    return fileUrl;
  } catch (error: any) {
    console.log({
      error: error,
      data: error?.response?.data,
      message: error?.response?.data?.message,
      in: "uploadFile catch",
    });

    return error;
  }
};
