import { z } from "zod";

export const diagnosisReportSchema = z.object({
  doctorName: z.string().trim().min(1, "Doctor Name is required"),
  date: z.string().trim().min(1, "Diagnosis Date is required"),
  followUpDate: z.string().trim().min(1, "Follow Up Date is required"),
  symptoms: z.string().trim().min(1, "Symptom is required"),
  recommendedTest: z.string().trim().min(1, "Recommended Tests is required"),
  notes: z.string().trim().min(1, "Notes is required"),
});
