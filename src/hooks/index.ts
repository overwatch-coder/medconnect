import { NotificationContext } from "@/providers/AppProvider";
import { UserType, Patient } from "@/types/backend";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useContext } from "react";

// === Auth ===
export const authAtom = atomWithStorage("auth", null as UserType | null);
export const useAuth = () => useAtom(authAtom);

// === Patient ===
export const patientsAtom = atom([] as Patient[]);
export const usePatients = () => useAtom(patientsAtom);

// === Notifications ===
export const useNotification = () => useContext(NotificationContext);
