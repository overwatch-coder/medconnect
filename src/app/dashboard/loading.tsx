import React from "react";
import Image from "next/image";

const DashboardLoader = () => {
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center bg-primary-dark">
      <Image
        src={"/assets/icons/logo-header.svg"}
        alt="logo"
        width={120}
        height={120}
        quality={100}
        loading="lazy"
        className="object-contain animate-bounce"
      />
      <p className="font-semibold animate-bounce">
        <span className="text-secondary-gray text-3xl">MedConnect</span>
      </p>
    </div>
  );
};

export default DashboardLoader;
