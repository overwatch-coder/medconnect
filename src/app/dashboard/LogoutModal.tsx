"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { RiLogoutCircleLine } from "react-icons/ri";
import { useUserAtom } from "@/hooks";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { logout, removeUserFromCookies } from "@/actions/user.action";

const LogoutModal = () => {
  const [user, setUser] = useUserAtom();

  // handle logout
  const handleLogout = async () => {
    const data = await logout();

    data.success ? toast.success(data.message) : toast.error(data.message);

    await removeUserFromCookies();

    setUser({
      user: null,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex flex-col items-start mt-16 hover:no-underline hover:scale-105 transition">
        <p className="flex items-center gap-4 font-bold">
          <RiLogoutCircleLine size={25} color="white" />
          <span className="text-white text-lg hidden lg:block">Logout</span>
        </p>
      </AlertDialogTrigger>

      <AlertDialogContent id="hide" className="flex flex-col gap-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span className="text-xl text-secondary-gray font-bold">
              Logout
            </span>
            <AlertDialogCancel className="outline-none bg-transparent hover:bg-transparent border-none border-0">
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </AlertDialogCancel>
          </AlertDialogTitle>

          <AlertDialogDescription className="flex flex-col gap-5">
            <p className="text-secondary-gray font-semibold">
              Are you sure you want to logout?
            </p>
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="text-white bg-primary-green md:px-10 py-3 w-full md:w-fit"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
