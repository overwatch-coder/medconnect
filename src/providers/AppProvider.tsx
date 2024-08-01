"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";
import { INotification } from "@/types/backend";
import moment from "moment-timezone";

type NotificationContextType = {
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
  unreadNotifications: number;
  setUnreadNotifications: React.Dispatch<React.SetStateAction<number>>;
  refetchNotifications: () => void;
};

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  setNotifications: () => {},
  unreadNotifications: 0,
  setUnreadNotifications: () => {},
  refetchNotifications: () => {},
});

const AppProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  queryClient.setDefaultOptions({
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  });

  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = (await response.json()) as {
        status: boolean;
        data: INotification[];
      };

      if (data.status) {
        setNotifications(data.data);
        setUnreadNotifications(
          data.data.filter((notification) => !notification.isRead).length
        );
      }
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
    }
  };

  const refetchNotifications = useCallback(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    fetchNotifications();

    setInterval(() => {
      refetchNotifications();
    }, moment.duration(30, "seconds").asMilliseconds());
  }, [refetchNotifications]);

  const values = {
    notifications,
    setNotifications,
    unreadNotifications,
    setUnreadNotifications,
    refetchNotifications,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="#40E0D0" showSpinner={false} />
      <NotificationContext.Provider value={values}>
        {children}
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </NotificationContext.Provider>
    </QueryClientProvider>
  );
};

export default AppProvider;
