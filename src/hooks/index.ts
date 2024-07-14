import { getChats } from "@/actions/ai-chat.action";
import { initialSelectedChat } from "@/constants/form-data";
import { UserType, Patient, Conversation, ChatAtomType } from "@/types/backend";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// === Auth ===
export const authAtom = atomWithStorage("auth", null as UserType | null);
export const useAuth = () => useAtom(authAtom);

// === Patient ===
export const patientsAtom = atomWithStorage("patients", [] as Patient[]);
export const usePatients = () => useAtom(patientsAtom);

// === Chats ===

export const chatsAtom = atomWithStorage<ChatAtomType>("chats", {
  chats: [] as Conversation[],
  selectedChat: initialSelectedChat,
  newChat: true,
  selectedPatient: null as Patient | null,
});

export const useChats = () => useAtom(chatsAtom);
