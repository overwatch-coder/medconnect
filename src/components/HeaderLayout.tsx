"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { MEDCONNECT_OFFERS } from "@/constants";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

// Header based on pathname/route
const HeaderLayout = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return <HeaderBackgroundLayout />;
  } else {
    return <Header />;
  }
};

export default HeaderLayout;

const HeaderBackgroundLayout = () => {
  return (
    <section className="bg-primary-gray/10 pb-16">
      {/* Header with Background and Hero */}
      <div className="bg-hero2 flex flex-col gap-5 bg-bottom md:bg-top bg-cover bg-no-repeat md:max-h-[100vh] h-full">
        <Header />
        <Hero />
      </div>

      {/* MedConnect - What We Offer */}
      <div className="w-full -mt-20 mx-auto px-5 md:px-16 xl:px-24 2xl:px-40">
        <div className="flex flex-col lg:flex-row items-center gap-5">
          {MEDCONNECT_OFFERS.map((value, index) => (
            <div
              key={index}
              className={`flex items-center justify-center p-5 w-full h-[300px] rounded ${
                index === 1 ? "bg-primary-green" : "bg-white"
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <Image
                  src={value.icon}
                  alt={value.name}
                  width={50}
                  height={50}
                  className="object-contain"
                  loading="lazy"
                />
                <h3 className="font-semibold text-xl">{value.name}</h3>
                <p className="font-light text-center">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
