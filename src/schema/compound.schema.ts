import { z } from "zod";

export const compoundSchema = z.object({
  email: z
    .string()
    .min(1, "Email is require")
    .email("Enter a valid email address"),
  name: z
    .string()
    .min(1, "Compound name is required")
    .min(6, "Name should be at least 6 characters"),
  contact: z
    .string()
    .min(1, "Contact info is required")
    .min(9, "Contact info should be at least 9 characters"),
  emergencyContact: z
    .string()
    .min(1, "Emergency contact info is required")
    .min(9, "Emergency contact info should be at least 9 characters"),
  location: z.string().min(1, "Location is required"),
  district: z.string().min(1, "District is required"),
  region: z.string().min(1, "Region is required"),
  operatingHours: z.string().min(1, "Operating hours is required"),
  availableServices: z.string().optional(),
  hasAcceptedTC: z.coerce.boolean().default(false),
  profilePictureUrl: z.string().optional(),
  createdById: z.string().min(1, "Created by id is required"),
});
