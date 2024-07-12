import { UserType, Patient } from "@/types/backend";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// === Auth ===
export const authAtom = atomWithStorage("auth", null as UserType | null);
export const useAuth = () => useAtom(authAtom);

// === Patient ===
export const patientsAtom = atom([] as Patient[]);
export const usePatientsAtom = () => useAtom(patientsAtom);
