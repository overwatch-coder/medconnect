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

declare interface UserType {
  auth: AuthData;
  admin: AdminData | null;
  staff: StaffData | null;
  isSuperAdmin: boolean;
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
  workSchedule: any[];
  chpsCompoundId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// === PATIENT ===
declare interface PatientAdditionInfo {
  bloodGroup: string;
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
  dateOfBirth: string;
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
declare interface IChpsCompound {
  chpsCompound: ChpsCompound;
  staff: StaffData;
}

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

export interface ChatPayload {
  question: Question;
  patient: string;
  userId: string;
}

//  === STAFF (HEALTH OFFICIALS) ===
export interface IStaff {
  _id: string;
  staffId: string;
  fullName: string;
  dateOfBirth: string;
  dateOfHire: string;
  contact: string;
  position: string;
  email: string;
  gender: string;
  workSchedule: string[];
  chpsCompoundId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// === MEDICAL HISTORY ===
declare interface IMedicalHistory {
  patientId: string;
  description: string;
  cause: string;
  hospitalizationDate: string;
  formUrl: string;
  date: string;
  hadSurgeryComplication: boolean;
  wasSurgeryRequired: boolean;
  hasBreathingProblem: boolean;
  hasSkinProblem: boolean;
  _id: string;
  __v: number;
}

// === PRESCIPTION ===
declare interface IPrescription {
  patientId: string;
  notes: string;
  healthOfficialName: string;
  date: string;
  medication: IMedication;
  _id: string;
  prescriptionId: string;
  __v: number;
}

declare interface IMedication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  _id: string;
}

// === TREATMENT PLAN
declare interface ITreatmentPlan {
  patientId: string;
  name: string;
  startDate: string;
  endDate: string;
  objective: string;
  medicationName: string;
  followUpSchedule: string;
  notes: string;
  _id: string;
  treatmentPlanId: string;
  __v: number;
}

// === DIAGNOSTIC REPORT ===
declare interface IDiagnosisReport {
  patientId: string;
  doctorName: string;
  date: string;
  followUpDate: string;
  notes: string;
  symptoms: string;
  finalDiagnosis: string;
  recommendedTest: string;
  _id: string;
  diagnosisReportId: string;
  __v: number;
}

// === VISIT LOGS ===
declare interface IVisitLogs {
  patientId: string;
  date: string;
  purpose: string;
  official: string;
  notes: string;
  _id: string;
  visitLogId: string;
  __v: number;
}

// === INVENTORY ==
declare interface Inventory {
  _id: string;
  name: string;
  type: string;
  manufacturer: string;
  inStock: number;
  receivedDate: string;
  expiryDate: string;
  chpsCompoundId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// === APPOINTMENT ===
declare interface IAppointment {
  patientId: string;
  date: string;
  official: string;
  isClosed: boolean;
  _id: string;
  __v: number;
  patient: Patient;
}

// === OUTREACH PROGRAMS ===
declare interface IOutreachProgram {
  title: string;
  description: string;
  organizerName: string;
  organizerPhone: string;
  organization: string;
  location: string;
  targetGroup: string;
  programDate: string;
  programStartTime: string;
  estimatedAudience: number;
  createdById: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type OutreachChoice = "Volunteer" | "Participate";

declare interface IOutreachProgramChoice {
  choice: OutreachChoice;
  supportType?: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: boolean;
  outreachProgramId: string;
  chpsCompoundId: string;
}

// === TICKETS ===
declare interface ITicket {
  subject: string;
  description: string;
  imageUrl: string;
  requestedById: string;
  status: string;
  priority: string;
  _id: string;
  ticketId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
