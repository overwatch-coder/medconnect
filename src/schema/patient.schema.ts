import { z } from "zod";

export const patientGeneralInformationSchema = z.object({
  firstName: z.string().trim().min(1, "First Name is required"),
  lastName: z.string().trim().min(1, "Last Name is required"),
  gender: z
    .string()
    .trim()
    .min(1, "Gender is required")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
  nationalId: z
    .string()
    .trim()
    .min(1, "National ID is required")
    .min(10, "National ID must be less than 10 digits"),
  contact: z
    .string()
    .trim()
    .min(1, "Phone Number is required")
    .min(9, "Phone Number must not be less than 9 digits")
    .max(15, "Phone Number must be less than 15 digits"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" }),
  location: z.string().trim().min(1, "Location is required"),
  district: z.string().trim().min(1, "District is required"),
  maritalStatus: z
    .string()
    .trim()
    .min(1, "Marital Status is required")
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1)),
});

export const patientAdditionalInformationSchema = z.object({
  allergies: z.string().trim().optional(),
  knownCondition: z.string().trim().optional(),
  primaryPhysician: z.string().trim().optional(),
  insuranceProvider: z.string().trim().optional(),
  insurancePolicyNumber: z.string().trim().optional(),
});

export const patientEmergencyContactSchema = z.object({
  emergencyContactNameOne: z
    .string()
    .trim()
    .min(1, "Emergency Contact Name is required"),
  emergencyContactPhoneNumberOne: z
    .string()
    .trim()
    .min(1, "Emergency Contact Phone Number is required")
    .min(9, "Emergency Contact Phone Number must not be less than 9 digits")
    .max(15, "Emergency Contact Phone Number must be less than 15 digits"),
  emergencyContactAddressOne: z
    .string()
    .trim()
    .min(1, "Emergency Contact Address is required"),
  emergencyContactRelationshipOne: z
    .string()
    .trim()
    .min(1, "Emergency Contact Relationship is required"),
  emergencyContactNameTwo: z
    .string()
    .trim()
    .min(1, "Emergency Contact Name is required"),
  emergencyContactPhoneNumberTwo: z
    .string()
    .trim()
    .min(1, "Emergency Contact Phone Number is required")
    .min(9, "Emergency Contact Phone Number must not be less than 9 digits")
    .max(15, "Emergency Contact Phone Number must be less than 15 digits"),
  emergencyContactAddressTwo: z
    .string()
    .trim()
    .min(1, "Emergency Contact Address is required"),
  emergencyContactRelationshipTwo: z
    .string()
    .trim()
    .min(1, "Emergency Contact Relationship is required"),
});

export const patientSchema = z.object({
  general: patientGeneralInformationSchema,
  additional: patientAdditionalInformationSchema,
  emergency: patientEmergencyContactSchema,
});
