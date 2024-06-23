import { z } from "zod";

export const treatmentPlanSchema = z.object({
  treatmentPlanNumber: z
    .string()
    .trim()
    .min(1, "Treatment plan number is required"),
  planName: z.string().trim().min(1, "Plan name is required"),
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: z.string().trim().min(1, "End date is required"),
  objectives: z.string().trim().min(1, "Objective is required"),
  medicationName: z.string().trim().min(1, "Medication name is required"),
  followUpSchedule: z.string().trim().min(1, "Follow-up schedule is required"),
  notes: z.string().trim().min(1, "Notes are required"),
  treatmentPlanAttachment: z.any().optional(),
});
