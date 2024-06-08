import React from "react";
import Image from "next/image";

const Loading = () => {
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
        <span className="text-green-700 text-2xl">MedConnect</span>
      </p>
    </div>
  );
};

export default Loading;
