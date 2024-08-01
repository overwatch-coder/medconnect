import seedColor from "seed-color";
import { useNotification } from "@/hooks";
import { revalidateTag } from "next/cache";

type NotificationPayload = {
  type: string;
  title: string;
  description: string;
};

export const usePostNotification = () => {
  const { refetchNotifications } = useNotification();

  const postNotification = async (
    payload: NotificationPayload,
    markAsRead: boolean = false
  ) => {
    try {
      const formData = markAsRead
        ? null
        : {
            ...payload,
            timeAgo: new Date().toISOString(),
            typeColor: seedColor(payload.type).toHex(),
          };

      const res = await fetch("/api/notifications", {
        method: markAsRead ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: markAsRead ? null : JSON.stringify(formData),
      });

      const data = await res.json();

      console.log({ data, in: "postNotification success" });

      revalidateTag("notifications");

      refetchNotifications();

      return data;
    } catch (err) {
      console.log({ err, in: "postNotification error" });
    }
  };

  return { postNotification };
};
