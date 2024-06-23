import { User } from "@/types/index";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("user", {
  user: null as Omit<User, "password"> | null,
});

export const useUserAtom = () => useAtom(userAtom);
