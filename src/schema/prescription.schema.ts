import { z } from "zod";

export const prescriptionSchema = z.object({
  date: z.string().trim().min(1, "Date is required"),
  healthOfficialName: z
    .string()
    .trim()
    .min(1, "Health Official Name is required"),
  medicationName: z.string().trim().min(1, "Medication Name is required"),
  dosage: z.string().trim().min(1, "Dosage is required"),
  frequency: z.string().trim().min(1, "Frequency is required"),
  duration: z.string().trim().min(1, "Duration is required"),
  notes: z.string().trim().min(1, "Notes is required"),
});
