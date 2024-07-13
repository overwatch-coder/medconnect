"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MessageCirclePlus } from "lucide-react";
import { useChats, usePatients } from "@/hooks";
import { Patient } from "@/types/backend";

const NewChatModal = () => {
  const [{ selectedPatient }, setConvos] = useChats();
  const [patients] = usePatients();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"default"}
          className="py-4 px-5 flex items-center gap-2"
        >
          <MessageCirclePlus size={25} className="text-primary-green" />
          <span>Start New Chat</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <div className="flex flex-col gap-5 max-w-sm">
          <div className="flex flex-col gap-2">
            <DropdownMenuLabel className="text-primary-gray/50">
              Select Patient
            </DropdownMenuLabel>

            <DropdownMenuRadioGroup
              value={selectedPatient?._id || ""}
              onValueChange={(id) =>
                setConvos((prev) => ({
                  ...prev,
                  selectedPatient: patients.find(
                    (patient) => patient._id === id
                  ) as Patient,
                }))
              }
            >
              {patients.map((patient) => (
                <DropdownMenuRadioItem
                  className="cursor-pointer"
                  key={patient._id}
                  value={patient._id}
                >
                  {`${patient.firstName} ${patient.lastName}`}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NewChatModal;
