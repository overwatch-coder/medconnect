"use client";

import React from "react";
import { OutreachProgramType } from "@/types/index";
import "add-to-calendar-button";
import { getEndTime } from "@/lib/utils";
import { useAuth } from "@/hooks";

const getTime = (time: string) => {
  return time.split(" ")[0];
};

const AddToCalendarButton = ({ program }: { program: OutreachProgramType }) => {
  const [user] = useAuth();
  const name = `[Reminder] Add ${program.title} to Calendar`;
  const startDate = `${program.programDate}`;
  const startTime = program.programStartTime;
  const endTime = getEndTime(startTime);
  const attendee = `${user?.isSuperAdmin ? user?.admin?.name : user?.staff?.fullName}|${user?.auth.email}`;
  const organizer = `${program.organizerName}|${program.id}@gmail.com`;

  return (
    <>
      <add-to-calendar-button
        name={name}
        startDate={startDate}
        options="['Apple','Google','iCal','Microsoft365','Outlook.com','Yahoo']"
        buttonStyle="3d"
        listStyle="modal"
        hideIconButton
        startTime={getTime(startTime)}
        endTime={getTime(endTime)}
        organizer={organizer}
        attendee={attendee}
        iCalFileName="add-program-to-calendar"
        inline
        trigger="click"
        label="Add To Calendar"
        hideCheckmark
        size="2"
      />
    </>
  );
};

export default AddToCalendarButton;
