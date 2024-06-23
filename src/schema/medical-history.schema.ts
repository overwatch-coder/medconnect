import { z } from "zod";

export const medicalHistorySchema = z.object({
  problemStartDate: z.string().trim().min(1, "Date is required"),
  problemDescription: z
    .string()
    .trim()
    .min(1, "Problem description is required"),
  causeOfCurrentProblem: z
    .string()
    .trim()
    .min(1, "Cause of current problem is required"),
  surgeryRequirement: z
    .string()
    .trim()
    .min(1, "Surgery requirement is required"),
  breathingProblems: z.string().trim().min(1, "Breathing problems is required"),
  currentWoundOrSkinProblems: z
    .string()
    .trim()
    .min(1, "Current wound/skin problems is required"),
  surgeryYear: z.string().trim().min(1, "Surgery year is required"),
  complications: z.string().trim().min(1, "Complications is required"),
  medicalHistoryAttachment: z.any().optional(),
});
