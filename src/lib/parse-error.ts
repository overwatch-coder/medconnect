import { ZodError } from "zod";

export const getErrors = (
  error?: any,
  isZodError: boolean = false,
  errorData?: ZodError<any>
) => {
  if (isZodError) {
    return {
      errors: errorData?.issues.map((issue) => issue.message),
      success: false,
      data: null,
      message: "Zod Validation Error",
    };
  }

  return {
    errors: [error?.response.data.message ?? error?.message] as string[],
    success: false,
    data: null,
    message: error?.message as string,
  };
};
