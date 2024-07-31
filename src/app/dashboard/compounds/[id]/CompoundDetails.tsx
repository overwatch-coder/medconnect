"use client";
import { FormSectionHeader } from "@/app/dashboard/compounds/add-new/AddCompoundForm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ChpsCompound } from "@/types/backend";

type CompoundDetailsProps = {
  id: string;
  compoundData: ChpsCompound;
};

const CompoundDetails = ({ id, compoundData }: CompoundDetailsProps) => {
  const router = useRouter();

  return (
    <section className="flex flex-col rounded w-full scrollbar-hide">
      <div className="flex items-center justify-between w-full gap-4 bg-primary-green">
        {/* Compound Details Header */}
        <div className="flex items-center gap-2 px-5 py-3">
          <ArrowLeft
            onClick={() => router.push("/dashboard/compounds")}
            strokeWidth={2}
            size={20}
            className="text-[#1877F2] cursor-pointer"
          />

          <p className="text-white text-center font-medium">
            {compoundData.name} ({compoundData._id.slice(18).toUpperCase()})
          </p>
        </div>
      </div>

      {/* Compound Details Content */}
      <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
        {/* Profile Header */}
        <div className="rounded-md border border-secondary-gray/50 w-full p-4 flex items-center gap-5">
          <Image
            src={
              compoundData?.profilePictureUrl ??
              "/assets/icons/dashboard-header.svg"
            }
            alt="avatar"
            width={100}
            height={100}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/icons/dashboard-header.svg";
            }}
          />
          <p className="flex flex-col gap-1 text-white md:text-secondary-gray">
            <span className="font-bold text-lg capitalize">
              {compoundData.name}
            </span>
            <span className="text-primary-gray/50 font-semibold">
              {compoundData.region}
            </span>
            <span className="font-light text-primary-gray/50 text-sm">
              {compoundData.location}
            </span>
          </p>
        </div>

        {/* General Information */}
        <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
          <FormSectionHeader title="General Information" />

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Compound Name</h2>
              <p>{compoundData.name}</p>
            </div>
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Location</h2>
              <p>{compoundData.location}</p>
            </div>
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>District</h2>
              <p>{compoundData.district}</p>
            </div>
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Contact Information</h2>
              <p>{compoundData.contact}</p>
            </div>
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Available Services</h2>
              <p>{compoundData.availableServices.join(", ")}</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
          <FormSectionHeader title="Additional Information" />

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Operating Hours</h2>
              <p>{compoundData.operatingHours}</p>
            </div>
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Staff Information</h2>
              <p>{"Not Available"}</p>
            </div>
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Facility Details</h2>
              <p>{"Not Available"}</p>
            </div>
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Historical Information</h2>
              <p>{"Not Available"}</p>
            </div>
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Community Outreach Program</h2>
              <p>{"Not Available"}</p>
            </div>
            <div className="grid grid-cols-2 text-secondary-gray/70">
              <h2>Emergency Contact</h2>
              <p>{compoundData.emergencyContact}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompoundDetails;
