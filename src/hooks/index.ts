import { MedConnect, Patient } from "@/types/backend";
import { User } from "@/types/index";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// === User ===
export const userAtom = atomWithStorage("user", {
  user: null as Omit<User, "password"> | null,
});

export const useUserAtom = () => useAtom(userAtom);

export const authAtom = atomWithStorage("auth", null as MedConnect | null);

export const useAuth = () => useAtom(authAtom);

// === Patient ===
export const patientsAtom = atom([] as Patient[]);

export const usePatientsAtom = () => useAtom(patientsAtom);
