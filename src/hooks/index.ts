import { UserDataSaved } from "@/actions/user-cookie.action";
import { User } from "@/types/index";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("user", {
  user: null as Omit<User, "password"> | null,
});

export const useUserAtom = () => useAtom(userAtom);

export const authAtom = atomWithStorage("auth", null as UserDataSaved | null);

export const useAuth = () => useAtom(authAtom);
