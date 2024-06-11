import { User } from "@/schema/user.schema";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("user", {
  token: null as string | null,
  user: null as Omit<User, "password"> | null,
  userId: null as string | null,
});

export const useUserAtom = () => useAtom(userAtom);
