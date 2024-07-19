import { z } from "zod";

export const visitLogsSchema = z.object({
  date: z.string().trim().min(1, "Date and Time of Visit is required"),
  purpose: z.string().trim().min(1, "Purpose of Visit is required"),
  official: z.string().trim().min(1, "Attending H.O is required"),
  notes: z.string().trim().min(1, "Notes is required"),
});
