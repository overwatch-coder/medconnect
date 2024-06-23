import { z } from "zod";

export const settingsSchema = z.object({
  compoundName: z
    .string()
    .trim()
    .min(1, { message: "Compound Name cannot be empty" })
    .optional(),
  compoundEmail: z
    .string()
    .min(1, { message: "Compound Email is required" })
    .email({ message: "Please enter a valid email address" }),
  compoundPassword: z
    .string()
    .min(1, "Password is required")
    .min(8, { message: "Password must be at least 8 characters long" }),
  location: z
    .string()
    .trim()
    .min(1, { message: "Location cannot be empty" })
    .optional(),
  region: z
    .string()
    .trim()
    .min(1, { message: "Region cannot be empty" })
    .optional(),
  district: z
    .string()
    .trim()
    .min(1, { message: "District cannot be empty" })
    .optional(),
  contactInformation: z.string().trim().optional(),
  availableServices: z.string().trim().optional(),
  operatingHours: z
    .string()
    .trim()
    .min(1, { message: "Operating hours cannot be empty" })
    .optional(),
  staffInformation: z.string().trim().optional(),
  facilityDetails: z.string().trim().optional(),
  historicalInformation: z.string().trim().optional(),
  communityOutreachContact: z.string().trim().optional(),
  emergencyContact: z.string().trim().optional(),
  notifications: z.coerce.boolean().default(false),
  profilePicture: z.any().optional(),
});

export const settingsGeneralInformationSchema = settingsSchema.pick({
  compoundName: true,
  location: true,
  region: true,
  district: true,
  contactInformation: true,
  availableServices: true,
});

export const settingsAdditionalInformationSchema = settingsSchema.pick({
  operatingHours: true,
  staffInformation: true,
  facilityDetails: true,
  historicalInformation: true,
  communityOutreachContact: true,
  emergencyContact: true,
});

export const settingsNotificationsSchema = settingsSchema.pick({
  notifications: true,
});
