"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { MEDCONNECT_DASHBOARD_LINKS } from "@/constants";
import { Button } from "@/components/ui/button";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useUserAtom } from "@/hooks";
import { axiosInstance } from "@/lib/utils";
import { ResponseData } from "@/types/index";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import { currentUser } from "@/actions/user.action";

const DashboardSidebar = () => {
  const [user, setUser] = useUserAtom();
  const pathname = usePathname();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const result = await currentUser(user.userId!, user.token!);

      if (!result.success) {
        if (result.errors && result?.errors[0]!.includes("Forbidden")) {
          toast.info("Session expired. Please login again to continue");

          setUser({
            token: null,
            user: null,
            userId: null,
          });

          router.replace("/login?redirect=/dashboard");
        }

        throw new Error(result?.errors ? result.errors[0] : result.message);
      }

      setUser({
        token: user.token,
        user: result.data,
        userId: user.userId,
      });

      return result;
    },
    refetchInterval: 1 * (60 * 60 * 1000),
  });

  if (data?.errors) {
    toast.error(data.errors[0]);
  }

  // handle logout
  const handleLogout = async () => {
    // TODO: handle logout
    const res = await axiosInstance.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const data: ResponseData = res.data;

    data.success ? toast.success(data.message) : toast.error(data.message);

    setUser({
      token: null,
      user: null,
      userId: null,
    });
  };

  if (!user.token) {
    router.replace("/login");
  }

  return (
    <section className="flex flex-col items-center lg:items-start gap-3 px-5 h-full bg-secondary-gray w-[70px] lg:w-[250px] fixed top-0 left-0 pb-7 overflow-y-scroll scrollbar-hide">
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
        {MEDCONNECT_DASHBOARD_LINKS.map((link) => {
          const activePath = pathname === link.path;

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

      <Button
        onClick={handleLogout}
        variant={"link"}
        className="flex flex-col items-start mt-16 hover:no-underline hover:scale-105 transition"
      >
        <div className="flex items-center gap-4 font-bold">
          <RiLogoutCircleLine size={25} color="white" />
          <span className="text-white text-lg hidden lg:block">Logout</span>
        </div>
      </Button>
    </section>
  );
};

export default DashboardSidebar;
