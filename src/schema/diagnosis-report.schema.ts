import { z } from "zod";

export const diagnosisReportSchema = z.object({
  reportID: z.string().trim().min(1, "Report ID is required"),
  doctorName: z.string().trim().min(1, "Doctor Name is required"),
  diagnosisDate: z.string().trim().min(1, "Diagnosis Date is required"),
  followUpDate: z.string().trim().min(1, "Follow Up Date is required"),
  symptoms: z.string().trim().min(1, "Symptom is required"),
  recommendedTests: z.string().trim().min(1, "Recommended Tests is required"),
  notes: z.string().trim().min(1, "Notes is required"),
  diagnoisReportAttachments: z.any().optional(),
});
