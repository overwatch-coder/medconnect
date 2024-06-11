import React from "react";

const DashboardType = ({ params: { slug } }: { params: { slug: string } }) => {
  const pathname = `${slug}`;

  const routeHeader = /-/.test(pathname)
    ? pathname.replace(/-/g, " ")
    : pathname;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <section className="flex items-center justify-between py-3">
        <h2 className="text-secondary-gray capitalize text-xl font-semibold">
          {routeHeader}
        </h2>
        <p className="text-secondary-gray font-light italic">
          {new Date().toLocaleDateString("en", {
            dateStyle: "long",
          })}
        </p>
      </section>

      <section className="flex flex-col gap-5"></section>
    </div>
  );
};

export default DashboardType;
