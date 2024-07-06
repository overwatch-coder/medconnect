import {
  appointmentSchema,
  rescheduleAppointmentSchema,
} from "@/schema/appointment.schema";
import { contactFormSchema } from "@/schema/contact.schema";
import { diagnosisReportSchema } from "@/schema/diagnosis-report.schema";
import {
  healthOfficialAdditionalInformationSchema,
  healthOfficialEmergencyContactSchema,
  healthOfficialSchema,
} from "@/schema/health-officials.schema";
import { inventorySchema } from "@/schema/inventory.schema";
import { medicalHistorySchema } from "@/schema/medical-history.schema";
import { outreachProgramSchema } from "@/schema/outreach-programs.schema";
import {
  patientAdditionalInformationSchema,
  patientEmergencyContactSchema,
  patientGeneralInformationSchema,
  patientSchema,
} from "@/schema/patient.schema";
import { prescriptionSchema } from "@/schema/prescription.schema";
import {
  settingsAdditionalInformationSchema,
  settingsGeneralInformationSchema,
  settingsNotificationsSchema,
  settingsSchema,
} from "@/schema/setting.schema";
import { ticketSchema } from "@/schema/ticket.schema";
import { treatmentPlanSchema } from "@/schema/treatment-plan.schema";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  userSchema,
} from "@/schema/user.schema";
import { visitLogsSchema } from "@/schema/visit-logs.schema";
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

// Prescription Schema
export type PrescriptionType = z.infer<typeof prescriptionSchema>;

// Treatment Plan Schema
export type TreatmentPlanType = z.infer<typeof treatmentPlanSchema>;

// Diagnosis Report Schema
export type DiagnosisReportType = z.infer<typeof diagnosisReportSchema>;

// Visit Logs Schema
export type VisitLogsType = z.infer<typeof visitLogsSchema>;

// Appointment Schema
export type AppointmentType = z.infer<typeof appointmentSchema>;
export type RescheduleAppointmentType = z.infer<
  typeof rescheduleAppointmentSchema
>;

// Inventory Schema
export type InventoryType = z.infer<typeof inventorySchema>;

// Health Officials Schema
export type HealthOfficialType = z.infer<typeof healthOfficialSchema>;
export type HealthOfficialAdditionalInformationType = z.infer<
  typeof healthOfficialAdditionalInformationSchema
>;
export type HealthOfficialEmergencyContactType = z.infer<
  typeof healthOfficialEmergencyContactSchema
>;

// Outreach Programs Schema
export type OutreachProgramType = z.infer<typeof outreachProgramSchema>;
