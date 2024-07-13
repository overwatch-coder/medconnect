import { ZodError } from "zod";

export const getErrors = <
  TError extends ZodError & { response?: { data: { message: string } } },
>(
  isZodError: boolean,
  error: TError
) => {
  return {
    errors: isZodError
      ? error.issues.map((issue) => issue.message)
      : ([error?.response?.data?.message || error?.message] as string[]),
    status: false as false,
    message: isZodError ? "Zod Validation Error" : (error?.message as string),
  };
};
