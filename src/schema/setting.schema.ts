import { z } from "zod";

export const settingsSchema = z.object({
  compoundName: z
    .string()
    .trim()
    .min(1, { message: "Compound Name cannot be empty" })
    .optional(),
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

export type SettingsType = z.infer<typeof settingsSchema>;

export type SettingsGeneralInformationType = z.infer<
  typeof settingsGeneralInformationSchema
>;

export type SettingsAdditionalInformationType = z.infer<
  typeof settingsAdditionalInformationSchema
>;

export type SettingsNotificationsType = z.infer<
  typeof settingsNotificationsSchema
>;
