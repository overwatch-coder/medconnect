import { ErrorResponse, SuccessResponse } from "./index.d";

interface AuthData {
  id: string;
  role: "Admin" | "Staff";
  token: string;
  email: string;
}

interface AdminData {
  _id: string;
  name: string;
  contact: string;
  authUserId: string;
  profilePicture?: string;
  profilePictureUrl?: string;
}

interface StaffData {
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

interface UserType {
  auth: AuthData;
  user: AdminData | StaffData;
}

export type LoginResponse = SuccessResponse<UserType> | ErrorResponse;
