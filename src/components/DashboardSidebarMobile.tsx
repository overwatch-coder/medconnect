"use client";

import LogoutModal from "@/app/dashboard/LogoutModal";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  MEDCONNECT_DASHBOARD_LINKS,
  MEDCONNECT_SUPER_ADMIN_DASHBOARD_LINKS,
} from "@/constants";
import { useAuth } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineDashboard } from "react-icons/md";

const DashboardSidebarMobile = () => {
  const pathname = usePathname();
  const [user] = useAuth();

  const dashboardLinks = user?.isSuperAdmin
    ? MEDCONNECT_SUPER_ADMIN_DASHBOARD_LINKS
    : MEDCONNECT_DASHBOARD_LINKS;

  return (
    <Sheet>
      <SheetTrigger>
        <MdOutlineDashboard size={25} className="text-secondary-gray" />
      </SheetTrigger>

      <SheetContent
        side={"left"}
        className="bg-secondary-gray scrollbar-hide pb-7 flex flex-col h-full gap-3 overflow-y-scroll"
      >
        <div className="flex flex-col gap-3 pt-5 pb-2">
          <Link href={"/"} className="flex items-center gap-3 pb-2">
            <Image
              src="/assets/icons/logo-green.svg"
              alt="medconnect logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <p className="text-white font-extrabold text-2xl">
              Med<span className="text-primary-green">Connect</span>
            </p>
          </Link>
          <hr />
        </div>

        {/* Dashboard Menu Items */}
        <ul className="flex flex-col flex-1 gap-6 pt-5 mb-auto text-sm">
          {dashboardLinks.map((link) => {
            if (link.path === "/dashboard") {
              const isDashboardActive = pathname === link.path;
              return (
                <SheetClose asChild key={link.path}>
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
                    <span>{link.name}</span>
                  </Link>
                </SheetClose>
              );
            }

            const activePath = pathname.startsWith(link.path);
            return (
              <SheetClose asChild key={link.path}>
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
                  <span>{link.name}</span>
                </Link>
              </SheetClose>
            );
          })}

          <div className="mt-auto px-4">
            <LogoutModal showLogoutName={true} />
          </div>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSidebarMobile;
