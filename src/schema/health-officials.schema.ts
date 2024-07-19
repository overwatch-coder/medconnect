import { z } from "zod";

export const healthOfficialSchema = z.object({
  staffID: z.string().min(1, "Staff ID is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  contactNumber: z.string().min(1, "Contact Number is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  position: z.string().min(1, "Position is required"),
  location: z.string().min(1, "Location is required"),
  dateStarted: z.string().min(1, "Date Started is required"),
});

export const healthOfficialAdditionalInformationSchema = z.object({
  medicalHistory: z.string().min(1, "Medical History is required"),
  workStation: z.string().min(1, "Work Station is required"),
});

export const healthOfficialEmergencyContactSchema = z.object({
  contactName: z.string().min(1, "Contact Name is required"),
  location: z.string().min(1, "Location is required"),
  phoneNumber: z.string().min(1, "Phone Number is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export const HealthStaffSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  dateOfHire: z.string().min(1, "Date of Hire is required"),
  position: z.string().min(1, "Position is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  gender: z
    .string()
    .min(1, "Gender is required")
    .transform((val) => val.charAt(0).toUpperCase().concat(val.slice(1))),
  workSchedule: z.string().min(1, "Work Schedule is required"),
  chpsCompoundId: z.string().min(1, "Chps Compound ID is required"),
  contact: z.string().min(1, "Contact is required"),
});
