"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import { NAV_ITEMS } from "@/constants";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks";

const Header = () => {
  const [user] = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // change header background color onscroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-screen fixed flex top-0 left-0 z-50 items-center justify-between py-3 px-5 md:px-16 xl:px-24 2xl:px-40 text-secondary-gray overflow-x-hidden transition-colors duration-300 ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="/assets/icons/logo-black.svg"
          alt="Logo"
          width={30}
          height={30}
        />
        <h1 className="text-2xl flex items-center font-bold text-secondary-gray">
          <span className="text-primary-green">Med</span>Connect
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <nav className="items-center gap-5 hidden md:flex">
        {NAV_ITEMS.map((item, index) => {
          const isActiveLink = pathname === item.url;
          return (
            <Link
              key={index}
              href={item.url}
              className={`${
                isActiveLink ? "text-primary-green" : "hover:text-primary-green"
              }  text-secondary-gray font-semibold`}
            >
              {item.name}
            </Link>
          );
        })}
        <Link
          href={user ? "/dashboard" : "/login"}
          className="bg-primary-green hover:scale-105 transition text-white rounded px-8 py-2"
        >
          {user ? "Dashboard" : "Login"}
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <aside className="md:hidden">
        <MobileNav />
      </aside>
    </header>
  );
};

export default Header;
