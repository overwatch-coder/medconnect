import { ErrorResponse, SuccessResponse } from "./index.d";

declare interface AuthData {
  id: string;
  role: "Admin" | "Staff";
  token: string;
  email: string;
}

declare interface AdminData {
  _id: string;
  name: string;
  contact: string;
  authUserId: string;
  profilePicture?: string;
  profilePictureUrl?: string;
}

declare interface StaffData {
  _id: string;
  staffId: string;
  fullName: string;
  dateOfBirth: string;
  dateOfHire: string;
  contact: string;
  position: string;
  email: string;
  gender: string;
  workSchedule: Record<string, any>;
  chpsCompoundId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

declare interface UserType {
  auth: AuthData;
  user: AdminData | StaffData;
}

declare interface MedConnect {
  auth: AuthData;
  admin: AdminData | null;
  staff: StaffData | null;
  isSuperAdmin: boolean;
}

export type LoginResponse = SuccessResponse<UserType> | ErrorResponse;

// === Patient ===
// firstName: z.string(),
//     lastName: z.string(),
//     gender: z.enum(GENDERS),
//     maritalStatus: z.enum(MARITAL_STATUSES),
//     nationalId: z.string().min(10),
//     contact: z.string().min(9),
//     email: z.string().email(),
//     location: z.string(),
//     district: z.string(),
//     profilePictureUrl: z.string().optional().default(""),
//     additional: additionalInfoSchema,
//     emergencyContacts: z.array(emergencyInfoSchema).min(1),

// const additionalInfoSchema = z.object({
//   allergies: z.array(z.string()).optional(),
//   knownCondition: z.string().optional(),
//   primaryPhysician: z.string().optional(),
//   insuranceProvider: z.string().optional(),
//   insurancePolicyNumber: z.string().optional(),
// });
// const emergencyInfoSchema = z.object({
//   name: z.string(),
//   relationship: z.string(),
//   address: z.string(),
//   contact: z.string(),
// });

declare interface PatientAdditionInfo {
  allergies: string[];
  knownCondition: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
}

declare interface PatientEmergencyContact {
  name: string;
  relationship: string;
  address: string;
  contact: string;
}

declare interface PatientBasicInfo {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  nationalId: string;
  contact: string;
  email: string;
  location: string;
  district: string;
  profilePictureUrl?: string;
  chpsCompoundId: string;
  patientId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type Patient = PatientBasicInfo & {
  additional: PatientAdditionInfo | null;
  emergencyContacts: PatientEmergencyContact[];
};
