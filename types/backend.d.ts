import { ErrorResponse, SuccessResponse } from "./index.d";

// === AUTHENTICATION ===
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

// === PATIENT ===
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

// === CHPS COMPOUND ===
declare interface ChpsCompound {
  _id: string;
  name: string;
  contact: string;
  emergencyContact: string;
  location: string;
  region: string;
  district: string;
  operatingHours: string;
  availableServices: string[];
  hasAcceptedTC: boolean;
  profilePictureUrl?: string;
  authUserId: string;
  createdById: string;
  __v: number;
}

// === DIAGNOSTIC SUPPORT ===
declare interface ChatResponse {
  observation: string[];
  answer: string;
  id: string;
  patientId: string;
  status: true;
  message: string;
}

declare interface AiChat {
  observation: string[];
  answer: string;
  role: "ai";
}

declare interface UserChat {
  message: string;
  role: "user";
}

export type ConversationChats = AiChat | UserChat;

declare interface Conversation {
  id: string;
  shortPatientId: string;
  patientId: string;
  time: string;
  date: string;
  name: string;
  compoundId: string;
  chats: ConversationChats[];
}
