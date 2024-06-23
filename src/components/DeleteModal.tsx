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
} from "@/components/ui/alert-dialog";

import { X } from "lucide-react";

type DeleteModalProps = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  deleteFn: (data?: any) => Promise<any>;
};

const DeleteModal = ({
  openModal,
  setOpenModal,
  title,
  description,
  deleteFn,
}: DeleteModalProps) => {
  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent id="hide" className="flex flex-col gap-6">
        <AlertDialogHeader className="flex flex-col gap-4">
          <AlertDialogTitle className="flex items-center justify-between">
            <span className="text-xl text-secondary-gray font-bold">
              {title}
            </span>
            <AlertDialogCancel className="outline-none bg-transparent hover:bg-transparent border-none border-0">
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </AlertDialogCancel>
          </AlertDialogTitle>

          <AlertDialogDescription className="flex flex-col gap-5">
            <p className="text-secondary-gray font-semibold">{description}</p>
          </AlertDialogDescription>

          <AlertDialogFooter className="flex items-center justify-end ms-auto w-full md:w-1/2">
            <AlertDialogCancel className="rounded-none w-full bg-transparent hover:bg-transparent border border-secondary-gray/50 text-secondary-gray">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteFn}
              className="text-white bg-primary-green py-3 w-full rounded-none"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
