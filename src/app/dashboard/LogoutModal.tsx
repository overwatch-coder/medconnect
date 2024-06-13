"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { axiosInstance } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useUserAtom } from "@/hooks";
import { ResponseData } from "@/types/index";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const LogoutModal = () => {
  const [user, setUser] = useUserAtom();

  // handle logout
  const handleLogout = async () => {
    const res = await axiosInstance.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data: ResponseData = res.data;

    data.success ? toast.success(data.message) : toast.error(data.message);

    setUser({
      token: null,
      user: null,
      userId: null,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={"link"}
          className="flex flex-col items-start mt-16 hover:no-underline hover:scale-105 transition"
        >
          <div className="flex items-center gap-4 font-bold">
            <RiLogoutCircleLine size={25} color="white" />
            <span className="text-white text-lg hidden lg:block">Logout</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent id="hide" className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl text-secondary-gray font-bold">
              Logout
            </span>
            <DialogClose>
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>

          <DialogDescription className="flex flex-col gap-5">
            <p className="text-secondary-gray font-semibold">
              Are you sure you want to logout?
            </p>

            <div className="flex items-center justify-end">
              <Button
                onClick={handleLogout}
                className="text-white bg-primary-green md:px-10 py-3 w-full md:w-fit"
              >
                Confirm
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;