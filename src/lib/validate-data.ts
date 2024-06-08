import { ZodError } from "zod";

export const getErrors = (error: ZodError) => ({
  errors: error.issues.map((issue) => issue.message),
  success: false,
  data: null,
  message: "validation error",
});
