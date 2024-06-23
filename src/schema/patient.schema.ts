import { z } from "zod";

export const patientGeneralInformationSchema = z.object({
  patientId: z.string().trim().min(1, "Patient ID is required"),
  firstName: z.string().trim().min(1, "First Name is required"),
  lastName: z.string().trim().min(1, "Last Name is required"),
  gender: z.string().trim().min(1, "Gender is required"),
  dateOfBirth: z.string().trim().min(1, "Date of Birth is required"),
  address: z.string().trim().min(1, "Address is required"),
  nationalId: z.string().trim().min(1, "National ID is required"),
  phoneNumber: z
    .string()
    .trim()
    .min(1, "Phone Number is required")
    .max(15, "Phone Number must be less than 15 digits"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email({ message: "Please enter a valid email address" }),
  location: z.string().trim().min(1, "Location is required"),
  district: z.string().trim().min(1, "District is required"),
  maritalStatus: z.string().trim().min(1, "Marital Status is required"),
  profilePicture: z.any().optional(),
});

export const patientAdditionalInformationSchema = z.object({
  allergies: z.string().trim().min(1, "Allergies is required"),
  knownConditions: z.string().trim().min(1, "Known Conditions is required"),
  primaryCarePhysician: z
    .string()
    .trim()
    .min(1, "Primary Care Physician is required"),
  insuranceProvider: z.string().trim().min(1, "Insurance Provider is required"),
  insurancePolicyNumber: z
    .string()
    .trim()
    .min(1, "Insurance Policy Number is required"),
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
  generalInformation: patientGeneralInformationSchema,
  additionalInformation: patientAdditionalInformationSchema,
  emergencyContact: patientEmergencyContactSchema,
});
