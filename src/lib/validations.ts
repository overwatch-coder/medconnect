import { ZodSchema, ZodError } from "zod";
import { getErrors } from "@/lib/parse-error";
import { ResponseData } from "@/types/index";

type ValidateError = {
  status: false;
  errors: string[];
  message: string;
};

type ValidateSuccess<T> = {
  status: true;
  data: T;
};

type ValidateSchema<T> = ValidateError | ValidateSuccess<T>;

export const validateSchema = <TData>(
  schema: ZodSchema<TData>,
  data: TData
): ValidateSchema<TData> => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const { status, ...error } = getErrors(true, result.error as ZodError);

    return {
      status: false,
      ...error,
    };
  }
  return { status: true, data: result.data as TData };
};

type SuccessData = {
  status: true;
  data: Record<string, any>;
  message: string;
};

type ErrorData = {
  status: false;
  errors: string[];
  message: string;
};

type FormattedResponseData = SuccessData | ErrorData;

export const formatResponse = (
  resData: ResponseData
): FormattedResponseData => {
  if (resData.status) {
    return {
      status: true,
      message: resData?.message ?? "Success",
      data: resData.data,
    };
  }

  let error = "";
  let customMessage = resData.message === "Request failed with status code 400";

  if (customMessage) {
    error =
      "You have entered invalid data, please try again. Check the data you have entered and try again.";
  }

  return {
    status: false,
    message: resData?.message ?? "An error occurred, please try again later.",
    errors: customMessage
      ? [error]
      : Array.isArray(resData?.message)
        ? resData?.message
        : [resData?.message ?? "An error occurred, please try again."],
  };
};

export const handleApiError = (error: any) => {
  return getErrors(false, error);
};

// check if a field exsists in the data
export const hasField = (data: Record<string, any>, field: string) => {
  return Object.keys(data).includes(field);
};
