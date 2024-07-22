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
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";

type DeleteCompoundProps = {
  handleDelete: (compoundId: string) => void;
  compoundId: string;
  markedCompoundIds: string[];
  pending: boolean;
};

const DeleteCompound = ({
  handleDelete,
  compoundId,
  markedCompoundIds,
  pending,
}: DeleteCompoundProps) => {
  const disabledButton =
    markedCompoundIds.length === 0 || !markedCompoundIds.includes(compoundId);

  const handleDeleteCompound = () => {
    handleDelete(compoundId);
  };

  return (
    <Dialog>
      {disabledButton ? (
        <Trash2 size={15} className="text-red-300 cursor-not-allowed" />
      ) : (
        <DialogTrigger>
          <Trash2 size={15} className="text-red-500 cursor-pointer" />
        </DialogTrigger>
      )}

      <DialogContent id="hide" className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl text-secondary-gray font-bold">
              Delete Compound
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
              Are you sure you want to delete this compound from the system?
            </p>

            <div className="flex items-center gap-4 justify-end">
              <DialogClose>
                <Button className="text-white bg-transparent text-black/60 border border-black/50 hover:bg-transparent md:px-10 py-3 w-full md:w-fit">
                  Cancel
                </Button>
              </DialogClose>

              <DialogClose>
                <Button
                  onClick={handleDeleteCompound}
                  className="text-white bg-primary-green md:px-10 py-3 w-full md:w-fit"
                >
                  Confirm
                </Button>
              </DialogClose>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCompound;
