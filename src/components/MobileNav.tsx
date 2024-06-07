import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/constants";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={25} className="text-secondary-gray" />
      </SheetTrigger>

      <SheetContent className="px-3 py-10 min-h-screen bg-secondary-gray text-white">
        <SheetHeader>
          <SheetTitle className="py-5">
            <Link href={"/"} className="flex items-center gap-2 justify-center">
              <Image
                src="/assets/icons/logo-green.svg"
                alt="Logo"
                width={50}
                height={50}
                placeholder="blur"
              />
              <h1 className="text-3xl flex items-center font-bold text-white">
                <span className="text-primary-green">Med</span>Connect
              </h1>
            </Link>
          </SheetTitle>

          <SheetDescription>
            <nav className="gap-7 flex flex-col w-full">
              {NAV_ITEMS.map((item, index) => {
                const active = pathname === item.url;

                return (
                  <Link
                    key={index}
                    href={item.url}
                    className={`${
                      active
                        ? "bg-primary-green"
                        : "font-medium hover:bg-primary-green"
                    } py-2 rounded w-full px-5 text-xl text-start transition text-white`}
                  >
                    {item.name}
                  </Link>
                );
              })}

              <Link
                href={"/login"}
                className="bg-transparent border-primary-green border hover:scale-105 transition text-white rounded px-5 py-2 w-full text-xl text-center"
              >
                Login
              </Link>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
