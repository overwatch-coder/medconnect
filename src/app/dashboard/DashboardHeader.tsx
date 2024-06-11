"use client";

import React from "react";
import { Menu, Settings, Bell } from "lucide-react";
import { MdOutlineQuestionMark } from "react-icons/md";
import DashboardMobileHeader from "@/app/dashboard/DashboardMobileHeader";
import Link from "next/link";
import Image from "next/image";
import { useUserAtom } from "@/hooks";

const DashboardHeader = () => {
  const [user] = useUserAtom();
  const isSuperAdmin = user.user?.compoundName === "admin";

  return (
    <header className="w-full py-2 px-3 md:px-4 bg-white z-50">
      <div className="flex items-center justify-between relative">
        <h2 className="text-xl capitalize md:text-2xl text-secondary-gray font-extrabold">
          {isSuperAdmin ? "MedConnect" : user.user?.compoundName ?? "Guest"}{" "}
          <br className="md:hidden" />{" "}
          {!isSuperAdmin && <span>CHPS Compound</span>}
        </h2>

        {/* MobileNav */}
        <div className="md:hidden me-[10px] md:me-0">
          <DashboardMobileHeader />
        </div>

        <ul className="hidden items-center gap-6 md:flex">
          <Link
            href={"#"}
            className="hover:scale-105 transition p-4 rounded-full bg-primary-gray/10 flex flex-col items-center relative"
          >
            <Bell size={15} className="text-primary-gray" />
            <span className="text-white bg-red-500 rounded-full text-sm absolute top-0 right-0 h-5 w-5 text-center flex flex-col items-center">
              4
            </span>
          </Link>

          <Link
            href={"#"}
            className="hover:scale-105 transition p-4 rounded-full bg-primary-gray/10 flex flex-col items-center"
          >
            <MdOutlineQuestionMark size={15} className="text-primary-gray" />
          </Link>

          <Link
            href={"#"}
            className="hover:scale-105 transition p-4 rounded-full bg-primary-gray/10 flex flex-col items-center"
          >
            <Settings size={15} className="text-primary-gray" />
          </Link>

          <div className="rounded-md bg-primary-gray/10 py-1 px-3 flex items-center gap-3">
            <Image
              src="/assets/icons/dashboard-header.svg"
              alt="avatar"
              width={35}
              height={35}
            />
            <p className="flex flex-col gap-1 text-secondary-gray">
              <span className="font-bold capitalize">
                {isSuperAdmin
                  ? "MedConnect"
                  : user.user?.compoundName ?? "Guest"}
              </span>
              <span className="font-medium text-sm">
                {isSuperAdmin ? "Super Admin" : "C.H.P.S. Compound"}
              </span>
            </p>
          </div>
        </ul>
      </div>
    </header>
  );
};

export default DashboardHeader;
