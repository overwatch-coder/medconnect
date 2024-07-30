import { z } from "zod";

export const medicalHistorySchema = z.object({
  description: z.string().trim().min(1, "Description is required"),
  date: z.string().trim().min(1, "Date is required"),
  cause: z.string().trim().min(1, "Cause is required"),
  wasSurgeryRequired: z.string().default("false").optional(),
  hasBreathingProblem: z.string().default("false").optional(),
  hasSkinProblem: z.string().default("false").optional(),
  hospitalizationDate: z
    .string()
    .trim()
    .min(1, "Hospitalization date is required"),
  hadSurgeryComplication: z.string().default("false").optional(),
  formUrl: z.any().optional(),
});
