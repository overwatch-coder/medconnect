import { z } from "zod";

export const treatmentPlanSchema = z
  .object({
    name: z.string().trim().min(1, "Plan name is required"),
    startDate: z.string().trim().min(1, "Start date is required"),
    endDate: z.string().trim().min(1, "End date is required"),
    objective: z.string().trim().min(1, "Objective is required"),
    medicationName: z.string().trim().min(1, "Medication name is required"),
    followUpSchedule: z
      .string()
      .trim()
      .min(1, "Follow-up schedule is required"),
    notes: z.string().trim().min(1, "Notes are required"),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return endDate > startDate;
    },
    {
      message: "End date must be greater than start date",
      path: ["endDate"],
    }
  );
