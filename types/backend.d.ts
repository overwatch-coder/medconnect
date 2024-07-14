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
  age?: string;
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

// === DIAGNOSTIC SUPPORT CHAT ===
interface ChatAtomType {
  chats: Conversation[];
  selectedChat: Conversation;
  newChat: boolean;
  selectedPatient: Patient | null;
}

declare interface PostChatResponse {
  observation: string[];
  answer: string;
  chatObjectId: string;
  messageObjectId: string;
}

declare interface GetChatsResponse {
  id: string;
  patient: {
    name: string;
    age: number;
    gender: string;
    location: string;
  };
  title: string;
  chatId: string;
}

declare interface MessageResponse {
  id: string;
  chatObjectId: string;
  question: string;
  observation: string[];
  answer: string;
}

declare interface AiChat {
  observation: string[];
  answer: string;
  role: "ai";
  chatId: string;
  messageId: string;
}

declare interface UserChat {
  message: string;
  role: "user";
  chatId: string;
  messageId: string;
}

export type ConversationChats = AiChat | UserChat;

declare interface Conversation {
  id: string;
  patient: {
    name: string;
    age: number;
    gender: string;
    location: string;
  };
  title: string;
  chatId: string;
  chatObjectId: string;
  chats: ConversationChats[];
}

export interface Convo {
  id: string;
  patient: {
    name: string;
    age: number;
    gender: string;
    location: string;
  };
  title: string;
  chatId: string;
}

export interface Message {
  id: string;
  chatObjectId: string;
  question: string;
  observation: string;
  answer: string;
}

declare interface Question {
  text: string;
}

export interface QuestionPayload {
  question: Question;
  userId: string;
}

export interface ChatPayload{
  question:Question;
  patient: string;
  userId:string;
}
