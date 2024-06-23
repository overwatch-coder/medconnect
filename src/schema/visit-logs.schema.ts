import { z } from "zod";

export const visitLogsSchema = z.object({
  logID: z.string().trim().min(1, "Log ID is required"),
  visitDate: z.string().trim().min(1, "Date of Visit is required"),
  visitTime: z.string().trim().min(1, "Time of Visit is required"),
  visitPurpose: z.string().trim().min(1, "Purpose of Visit is required"),
  attendingHO: z.string().trim().min(1, "Attending H.O is required"),
  notes: z.string().trim().min(1, "Notes is required").optional(),
});
