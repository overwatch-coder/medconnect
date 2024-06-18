import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MEDCONNECT_DASHBOARD_NOTIFICATIONS as notifications } from "@/constants";
import { Bell, X } from "lucide-react";

const NotificationsModal = () => {
  return (
    <Dialog>
      <DialogTrigger>
        {/* Mobile Menu */}
        <p className="hover:scale-105 bg-white/30 md:hidden relative flex items-center gap-3 p-4 transition rounded">
          <Bell size={20} className={"text-white"} />
          <span className={"text-white text-base"}>Notifications</span>
          <span className="top-5 right-2 absolute flex flex-col items-center w-5 h-5 text-sm text-center text-white bg-red-500 rounded-full">
            4
          </span>
        </p>

        {/* Desktop Menu */}
        <p className="hover:scale-105 bg-secondary-gray/10 md:flex relative flex-col items-center hidden p-4 transition rounded-full">
          <Bell size={20} className={"text-secondary-gray"} />
          <span className="absolute top-0 right-0 flex flex-col items-center w-5 h-5 text-sm text-center text-white bg-red-500 rounded-full">
            4
          </span>
        </p>
      </DialogTrigger>

      <DialogContent
        id="hide"
        className="flex flex-col gap-4 w-full max-w-[97vw] md:max-w-[70vw] max-h-[95vh] h-full px-0 rounded-xl"
      >
        <DialogHeader className="scrollbar-hide overflow-y-scroll">
          <DialogTitle className="border-b-secondary-gray flex items-center justify-between pb-4 border-b">
            <span className="md:text-3xl ps-5 text-secondary-gray text-xl font-bold">
              Notifications
            </span>
            <DialogClose>
              <X
                className="me-5 text-red-500 border border-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>

          <DialogDescription>
            {/* Notifications */}
            <div className="flex flex-col gap-7 px-3 py-5 bg-white rounded-md max-h-screen h-full overflow-y-scroll scrollbar-hide">
              {notifications.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-secondary-gray text-lg font-bold text-center">
                    No messages available at the moment
                  </p>
                </div>
              )}

              {notifications.map((notice, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-3 text-secondary-gray"
                >
                  <div className="flex gap-4 items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-3 text-start">
                        <p
                          style={{ backgroundColor: notice.typeColor }}
                          className="text-white text-xs font-semibold w-fit rounded-full py-2 px-4 text-center opacity-50"
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationsModal;
