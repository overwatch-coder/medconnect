"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "@/hooks";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { logout } from "@/actions/user.action";
import { removeUserFromCookies } from "@/actions/user-cookie.action";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";

const LogoutModal = ({ showLogoutName }: { showLogoutName?: boolean }) => {
  const [_, setUser] = useAuth();
  const [pending, setPending] = useState(false);
  const router = useRouter();

  // handle logout
  const handleLogout = async () => {
    setPending(true);
    const data = await logout();
    if (!data.status) {
      setPending(false);
      toast.error("An error occurred while logging out");
    } else {
      await removeUserFromCookies();
      setUser(null);
      setPending(false);
      toast.success("Logout Successful");
      router.replace("/login");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex flex-col items-start mt-16 hover:no-underline hover:scale-105 transition">
        <span className="flex items-center gap-4 font-bold">
          <RiLogoutCircleLine size={25} color="white" />
          {showLogoutName ? (
            <span className="text-white text-lg">Logout</span>
          ) : (
            <span className="text-white text-lg hidden lg:block">Logout</span>
          )}
        </span>
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
            <span className="text-secondary-gray font-semibold">
              Are you sure you want to logout?
            </span>
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={handleLogout}
              disabled={pending}
              className="text-white bg-primary-green md:px-10 py-3 w-full md:w-fit"
            >
              {pending ? (
                <ClipLoader loading={pending} size={20} color="white" />
              ) : (
                "Confirm"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModal;
