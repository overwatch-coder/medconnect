"use client";

import { getChpsPatients } from "@/actions/patients.action";
import { usePatients } from "@/hooks";
import { Patient } from "@/types/backend";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [_, setPatients] = usePatients();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const result = await getChpsPatients();

      if (result.status) {
        setPatients(result.data as Patient[]);

        return result.data as Patient[];
      }
    },
    refetchInterval(query) {
      return queryClient.getQueryData(["patients"]) ? false : 1000 * 60 * 1;
    },
  });

  useEffect(() => {
    if (data) {
      setPatients(data);
    }

    return () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    };
  }, [data, queryClient, setPatients]);

  return <>{children}</>;
};

export default DashboardProvider;
