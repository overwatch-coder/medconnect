"use client";
import { isAxiosError } from "axios";
import React from "react";

type RenderCustomErrorProps = {
  isError: boolean;
  error: Error | null;
};

const RenderCustomError = ({ isError, error }: RenderCustomErrorProps) => {
  const [close, setClose] = React.useState(false);

  React.useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setClose(true);
      }, 5000);
    }
  }, [isError]);

  return (
    !close &&
    isError && (
      <div className="w-full rounded p-3 bg-red-300 flex flex-col gap-1">
        <p className="text-red-500">
          {isAxiosError(error) ? error.response?.data?.message : error?.message}
        </p>
      </div>
    )
  );
};

export default RenderCustomError;
