"use client";

import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import "react-toastify/dist/ReactToastify.css";

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
  return (
    <QueryClientProvider client={queryClient}>
      <NextTopLoader color="#40E0D0" showSpinner={false} />
      {children}
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
