import React from "react";

const CustomErrorElement = ({ errors }: { errors: string[] }) => {
  return (
    <>
      {errors.length > 0 && (
        <div className="w-full rounded p-3 bg-red-300 flex flex-col gap-1">
          {errors.map((err, idx) => (
            <p key={idx} className="text-red-500">
              {err}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default CustomErrorElement;
