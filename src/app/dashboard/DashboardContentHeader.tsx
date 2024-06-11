import React from "react";

type DashboardContentHeaderProps = {
  headerTitle: string;
  showDate?: boolean;
};

const DashboardContentHeader = ({
  headerTitle,
  showDate,
}: DashboardContentHeaderProps) => {
  return (
    <section className="flex items-center justify-between py-3">
      <h2 className="text-secondary-gray capitalize text-xl font-semibold">
        {headerTitle}
      </h2>
      {showDate && (
        <p className="text-secondary-gray font-light italic">
          {new Date().toLocaleDateString("en", {
            dateStyle: "long",
          })}
        </p>
      )}
    </section>
  );
};

export default DashboardContentHeader;
