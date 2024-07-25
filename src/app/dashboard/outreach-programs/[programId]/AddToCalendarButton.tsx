"use client";

import React from "react";
import "add-to-calendar-button";
import { getEndTime } from "@/lib/utils";
import { useAuth } from "@/hooks";
import { IOutreachProgram } from "@/types/backend";

const getTime = (time: string) => {
  return time;
};

const AddToCalendarButton = ({ program }: { program: IOutreachProgram }) => {
  const [user] = useAuth();
  const name = `[Reminder] Add ${program.title} to Calendar`;
  const startDate = `${program.programDate}`;
  // const startTime = program.programStartTime;
  // const endTime = getEndTime(startTime);
  const attendee = `${user?.isSuperAdmin ? user?.admin?.name : user?.staff?.fullName}|${user?.auth.email}`;
  const organizer = `${program.organizerName}|${program.organizerName}@gmail.com`;

  return (
    <>
      <add-to-calendar-button
        name={name}
        startDate={startDate}
        options="['Apple','Google','iCal','Microsoft365','Outlook.com','Yahoo']"
        buttonStyle="3d"
        listStyle="modal"
        hideIconButton
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
