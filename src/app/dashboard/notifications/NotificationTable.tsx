"use client";
import { Trash2, X } from "lucide-react";
import React, { useState } from "react";
import { GrCheckbox, GrCheckboxSelected, GrPowerCycle } from "react-icons/gr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import ProgressBar from "@ramonak/react-progress-bar";

type NotificationTableProps = {
  notifications: {
    type: string;
    title: string;
    description: string;
    timeAgo: string;
    typeColor: string;
  }[];
};

const NotificationTable = ({ notifications }: NotificationTableProps) => {
  const [filteredNotifications, setFilteredNotifications] =
    useState(notifications);

  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //   handle select multiple notification
  const handleNotificationSelected = (id: number) => {
    if (selectedNotifications.includes(id)) {
      setSelectedNotifications(
        selectedNotifications.filter((nid) => nid !== id)
      );
    } else {
      setSelectedNotifications([...selectedNotifications, id]);
    }
  };

  //   handle select all notifications
  const handleSelectAll = () => {
    if (selectedNotifications.length === notifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notifications.map((_, idx) => idx));
    }
  };

  // handle delete notification
  const handleDelete = () => {
    if (filteredNotifications.length === 0) {
      return;
    }

    setFilteredNotifications(
      filteredNotifications.filter(
        (_, idx) => !selectedNotifications.includes(idx)
      )
    );
    setSelectedNotifications([]);

    setShowDeleteModal(true);
    setTimeout(() => {
      setShowDeleteModal(false);
    }, 5000);
  };

  return (
    <section className="flex flex-col rounded w-full">
      <div className="bg-secondary-gray/20 py-2 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div onClick={handleSelectAll}>
            {selectedNotifications.length === notifications.length ? (
              <GrCheckboxSelected
                size={20}
                className="text-white cursor-pointer"
              />
            ) : (
              <GrCheckbox size={20} className="text-white cursor-pointer" />
            )}
          </div>
          <p className="text-secondary-gray text-xl font-bold">Messages</p>
        </div>
        <div className="flex items-center gap-2">
          <GrPowerCycle size={20} className="text-red-500 cursor-pointer" />
          <Trash2
            onClick={handleDelete}
            size={20}
            className={`${
              filteredNotifications.length === 0
                ? "cursor-not-allowed text-secondary-gray/50"
                : "text-secondary-gray cursor-pointer"
            } `}
          />
        </div>
      </div>

      {/* Notifications */}
      <div className="flex flex-col gap-7 px-3 py-5 bg-white rounded-md max-h-screen h-full overflow-y-scroll scrollbar-hide">
        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-secondary-gray text-lg font-bold text-center">
              No messages available at the moment
            </p>
          </div>
        )}

        {filteredNotifications.map((notice, idx) => (
          <div key={idx} className="flex flex-col gap-3 text-secondary-gray">
            <div className="flex gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div onClick={() => handleNotificationSelected(idx)}>
                  {selectedNotifications.includes(idx) ? (
                    <GrCheckboxSelected
                      size={20}
                      className="text-secondary-gray cursor-pointer"
                    />
                  ) : (
                    <GrCheckbox
                      size={20}
                      className="text-secondary-gray cursor-pointer"
                    />
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <p
                    style={{ backgroundColor: notice.typeColor }}
                    className="text-white text-xs font-semibold w-fit rounded-full py-2 px-4 text-center"
                  >
                    {notice.type}
                  </p>
                  <h3 className="font-semibold">{notice.title}</h3>
                  <p className="text-sm font-light opacity-50">
                    {notice.description}
                  </p>

                  <p className="text-secondary-gray/50 text-sm sm:hidden font-semibold">
                    {notice.timeAgo}
                  </p>
                </div>
              </div>

              <p className="hidden sm:block text-secondary-gray/50 text-sm font-semibold">
                {notice.timeAgo}
              </p>
            </div>
          </div>
        ))}
      </div>

      <NotificationDeletedModal openModal={showDeleteModal} />
    </section>
  );
};

export default NotificationTable;

const NotificationDeletedModal = ({ openModal }: { openModal: boolean }) => {
  return (
    <Dialog open={openModal}>
      <DialogContent id="hide" className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl text-secondary-gray font-bold">
              Notification deleted
            </span>
            <DialogClose>
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>

          <DialogDescription className="flex flex-col gap-5 w-full">
            <p className="text-secondary-gray font-semibold">
              The selected message(s) have been deleted successfully
            </p>

            <div className="">
              <ProgressBar
                completed={100}
                bgColor="#D00D2D4D"
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
