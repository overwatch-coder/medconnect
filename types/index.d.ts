import { contactFormSchema } from "@/schema/contact.schema";
import { medicalHistorySchema } from "@/schema/medical-history.schema";
import {
  patientAdditionalInformationSchema,
  patientEmergencyContactSchema,
  patientGeneralInformationSchema,
  patientSchema,
} from "@/schema/patient.schema";
import {
  settingsAdditionalInformationSchema,
  settingsGeneralInformationSchema,
  settingsNotificationsSchema,
  settingsSchema,
} from "@/schema/setting.schema";
import { ticketSchema } from "@/schema/ticket.schema";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  userSchema,
} from "@/schema/user.schema";
import { z } from "zod";

export type SuccessResponse = {
  success: true;
  message: string;
  data: any;
};

export type ErrorResponse = {
  success: false;
  message: string;
};

export type ResponseData = SuccessResponse | ErrorResponse;

// User Schema
export type User = z.infer<typeof userSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type CreateUserType = Omit<User, "_id">;

// Contact Schema
export type ContactFormType = z.infer<typeof contactFormSchema>;

// Patient Schema
export type PatientGeneralInformationType = z.infer<
  typeof patientGeneralInformationSchema
>;

export type PatientAdditionalInformationType = z.infer<
  typeof patientAdditionalInformationSchema
>;

export type PatientEmergencyContactType = z.infer<
  typeof patientEmergencyContactSchema
>;

export type PatientType = z.infer<typeof patientSchema>;

// Settings Schema
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

// Ticket Schema
export type TicketType = z.infer<typeof ticketSchema>;

// Medical History Schema
export type MedicalHistoryType = z.infer<typeof medicalHistorySchema>;
