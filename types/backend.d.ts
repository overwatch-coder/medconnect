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
  admin: AdminData | null;
  staff: StaffData | null;
  isSuperAdmin: boolean;
}

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
