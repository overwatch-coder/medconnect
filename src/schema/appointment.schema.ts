import { z } from "zod";

export const appointmentSchema = z.object({
  date: z.string().trim().min(1, "Date is required"),
  official: z.string().trim().min(1, "Assigned Health Official is required"),
  isClosed: z.string().default("false"),
  patientId: z.string().trim().min(1, "Patient ID is required"),
});
