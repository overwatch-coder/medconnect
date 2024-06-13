"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import ProgressBar from "@ramonak/react-progress-bar";
import { X } from "lucide-react";

type NotificationModalProps = {
  openModal: boolean;
  title: string;
  description: string;
  progressBgColor: string;
};

const NotificationModal = ({
  openModal,
  title,
  description,
  progressBgColor,
}: NotificationModalProps) => {
  return (
    <Dialog open={openModal}>
      <DialogContent id="hide" className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl text-secondary-gray font-bold">
              {title}
            </span>
            <DialogClose>
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>

          <DialogDescription className="flex flex-col gap-5 w-full">
            <p className="text-secondary-gray font-semibold">{description}</p>

            <div className="">
              <ProgressBar
                completed={100}
                bgColor={progressBgColor}
                labelColor="#ffffff"
                transitionDuration="1s"
                animateOnRender={true}
                maxCompleted={100}
                customLabel="."
                height="5px"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationModal;
