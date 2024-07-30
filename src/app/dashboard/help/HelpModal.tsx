"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { MdOutlineQuestionMark } from "react-icons/md";
import HelpTable from "@/app/dashboard/help/HelpTable";

const HelpModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        {/* Desktop Menu */}
        <p className="hover:scale-105 transition p-4 rounded-full bg-primary-gray/10 flex-col items-center hidden md:flex">
          <MdOutlineQuestionMark size={15} className={"text-secondary-gray"} />
        </p>

        {/* Mobile Menu */}
        <p className="hover:scale-105 transition md:hidden p-4 rounded md:rounded-full bg-white/30 md:bg-primary-gray/10 flex items-center gap-3">
          <MdOutlineQuestionMark size={20} className={"text-white"} />
          <span className={"text-white text-base"}>Help</span>
        </p>
      </DialogTrigger>

      <DialogContent
        id="hide"
        className="flex flex-col gap-4 w-full max-w-[97vw] md:max-w-[85vw] max-h-[95vh] h-full px-0 rounded-xl"
      >
        <DialogHeader className="">
          <DialogTitle className="border-b-secondary-gray flex items-center justify-between pb-4 border-b">
            <span className="md:text-3xl ps-5 text-secondary-gray text-xl font-bold">
              My Tickets
            </span>
            <DialogClose>
              <X
                className="me-5 text-red-500 border border-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>

          <HelpTable />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
