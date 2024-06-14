import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

type DashboardContentHeaderProps = {
  headerTitle: string;
  showDate?: boolean;
  showButton?: boolean;
  buttonName?: string;
  buttonLink?: string;
};

const DashboardContentHeader = ({
  headerTitle,
  showDate,
  showButton,
  buttonName,
  buttonLink,
}: DashboardContentHeaderProps) => {
  return (
    <section className="flex items-center justify-between py-3">
      <h2 className="text-secondary-gray capitalize text-xl font-semibold">
        {headerTitle}
      </h2>
      <div className="flex items-center gap-2">
        {showDate && (
          <p className="text-secondary-gray font-light italic">
            {new Date().toLocaleDateString("en", {
              dateStyle: "long",
            })}
          </p>
        )}
        {showButton && (
          <Button className="bg-primary-green py-2 px-4">
            <Link href={`${buttonLink}`} className="flex items-center gap-2">
              <CirclePlus className="text-white" size={20} />
              <span className="text-white font-bold">
                {buttonName || "Add"}
              </span>
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
};

export default DashboardContentHeader;
