"use server";

import { axiosInstance } from "@/lib/utils";
import { ResponseData } from "@/types/index";
import { formatResponse, handleApiError } from "@/lib/validations";

type MutateDataConfig = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  contentType?: "application/json" | "multipart/form-data";
  token?: string;
};

// fetch data from api
export const fetchData = async (
  url: string,
  config?: Omit<MutateDataConfig, "method" | "contentType">
): Promise<ReturnType<typeof formatResponse>> => {
  try {
    const res = await axiosInstance.get(url, {
      headers: {
        "Content-Type": "application/json",
        ...(config?.token && { Authorization: `Bearer ${config.token}` }),
      },
    });

    const resData: ResponseData = res.data;

    return formatResponse(resData);
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const mutateData = async <TData = Record<string, any>>(
  url: string,
  data: TData,
  config?: MutateDataConfig
): Promise<ReturnType<typeof formatResponse>> => {
  try {
    const res = await axiosInstance.request({
      method: config?.method ?? "POST",
      url,
      data,
      headers: {
        "Content-Type": config?.contentType ?? "application/json",
        ...(config?.token && { Authorization: `Bearer ${config.token}` }),
      },
    });

    const resData: ResponseData = res.data;

    return formatResponse(resData);
  } catch (error: any) {
    return handleApiError(error);
  }
};
