"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  MEDCONNECT_DASHBOARD_LINKS,
  MEDCONNECT_SUPER_ADMIN_DASHBOARD_LINKS,
} from "@/constants";

import { useAuth } from "@/hooks";
import LogoutModal from "@/app/dashboard/LogoutModal";

const DashboardSidebar = () => {
  const [user] = useAuth();
  const pathname = usePathname();

  const dashboardLinks = user?.isSuperAdmin
    ? MEDCONNECT_SUPER_ADMIN_DASHBOARD_LINKS
    : MEDCONNECT_DASHBOARD_LINKS;

  return (
    <section className="hidden bg-secondary-gray scrollbar-hide pb-7 lg:w-60 lg:items-start fixed top-0 left-0 md:flex flex-col items-center w-16 h-full gap-3 px-5 overflow-y-scroll">
      <div className="flex flex-col gap-3 pt-10 pb-5">
        <Link href={"/"} className="flex items-center gap-3 pb-2">
          <Image
            src="/assets/icons/logo-green.svg"
            alt="medconnect logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <p className="text-white font-extrabold text-2xl hidden lg:block">
            Med<span className="text-primary-green">Connect</span>
          </p>
        </Link>
        <Separator className="bg-white my-1" />
      </div>

      {/* Dashboard Menu Items */}
      <ul className="flex flex-col gap-6 mb-auto">
        {dashboardLinks.map((link) => {
          if (link.path === "/dashboard") {
            const isDashboardActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${
                  isDashboardActive
                    ? "bg-white text-primary-green rounded"
                    : "hover:rounded text-white hover:bg-white hover:text-primary-green"
                } px-3 py-2 font-semibold hover:scale-105 transition flex items-center gap-3 group`}
              >
                <link.icon
                  size={25}
                  className={`${
                    isDashboardActive
                      ? "text-primary-green"
                      : "group-hover:text-primary-green text-white"
                  }`}
                />
                <span className="hidden lg:block">{link.name}</span>
              </Link>
            );
          }

          const activePath = pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`${
                activePath
                  ? "bg-white text-primary-green rounded"
                  : "hover:rounded text-white hover:bg-white hover:text-primary-green"
              } px-3 py-2 font-semibold hover:scale-105 transition flex items-center gap-3 group`}
            >
              <link.icon
                size={25}
                className={`${
                  activePath
                    ? "text-primary-green"
                    : "group-hover:text-primary-green text-white"
                }`}
              />
              <span className="hidden lg:block">{link.name}</span>
            </Link>
          );
        })}
      </ul>

      <LogoutModal />
    </section>
  );
};

export default DashboardSidebar;
