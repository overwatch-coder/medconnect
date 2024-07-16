"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";

type DeleteModalProps<T> = {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  deleteFn: (
    data?: T | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  pending?: boolean;
};

const DeleteModal = <T,>({
  openModal,
  setOpenModal,
  title,
  description,
  deleteFn,
  pending,
}: DeleteModalProps<T>) => {
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

          <form
            method="post"
            className="flex items-center justify-end gap-5 ms-auto w-full md:w-1/2"
          >
            <AlertDialogCancel className="rounded-none w-full bg-transparent hover:bg-transparent border border-secondary-gray/50 text-secondary-gray">
              Cancel
            </AlertDialogCancel>

            <Button
              onClick={(e) => {
                e.preventDefault();
                deleteFn();
              }}
              disabled={pending}
              className="text-white bg-primary-green py-3 w-full rounded-none"
            >
              {pending ? (
                <ClipLoader size={28} loading={pending} color="white" />
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
