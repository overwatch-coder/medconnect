"use client";

import AccountSettingsForm from "@/app/dashboard/settings/AccountSettingsForm";
import NotificationModal from "@/components/NotificationModal";
import { Button } from "@/components/ui/button";
import { useUserAtom } from "@/hooks";
import { SettingsType, settingsSchema } from "@/schema/setting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";

const AccountSettings = () => {
  const [user, setUser] = useUserAtom();
  const isSuperAdmin = user.user?.compoundName === "admin";
  const [showAccountUpdateModal, setShowAccountUpdateModal] = useState(false);

  const {
    register,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<SettingsType>({
    resolver: zodResolver(settingsSchema),
    mode: "all",
  });

  const submitAccountUpdate: SubmitHandler<SettingsType> = async (data) => {
    console.log({ data });
  };

  const handleAccountUpdate = () => {
    setShowAccountUpdateModal(true);
    setTimeout(() => {
      setShowAccountUpdateModal(false);
    }, 4000);
  };

  return (
    <section className="flex flex-col rounded w-full scrollbar-hide">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center justify-center gap-2 rounded-t-md bg-secondary-gray/20 px-5 py-3 w-fit">
          <p className="text-secondary-gray text-center font-medium">
            Account Setting
          </p>
        </div>
      </div>

      {/* Account Settings */}
      <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
        {/* Profile Header */}
        <div className="rounded-md border border-secondary-gray/50 w-full p-4 flex items-center gap-5">
          <Image
            src="/assets/icons/dashboard-header.svg"
            alt="avatar"
            width={100}
            height={100}
          />
          <p className="flex flex-col gap-1 text-white md:text-secondary-gray">
            <span className="font-bold text-lg capitalize">
              {isSuperAdmin ? "MedConnect" : user.user?.compoundName ?? "Guest"}{" "}
              C.H.P.S. Compound
            </span>
            {user.user?.region && (
              <span className="text-primary-gray/50 font-semibold">
                {user.user.region}{" "}
                {user.user.region.toLowerCase().includes("region")
                  ? ""
                  : "Region"}
              </span>
            )}
            {user.user?.location && (
              <span className="font-light text-primary-gray/50 text-sm">
                {user.user.location}
              </span>
            )}
          </p>
        </div>

        {/* General Information */}
        <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
          <AccountSettingFormHeader title="General Information" />

          <form
            onSubmit={handleSubmit(submitAccountUpdate)}
            className="flex flex-col gap-5 px-2 md:px-5"
            method="POST"
          >
            <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
              <AccountSettingsForm
                labelName="Compound Name"
                inputName="compoundName"
                errorExists={Boolean(errors.compoundName)}
                errorMessage={errors.compoundName?.message || ""}
                register={register}
                value={user.user?.compoundName}
                placeholderText="Enter your compound name"
              />

              <AccountSettingsForm
                labelName="Location"
                inputName="location"
                errorExists={Boolean(errors.location)}
                errorMessage={errors.location?.message || ""}
                register={register}
                value={user.user?.location}
                placeholderText="Enter your location"
              />

              <AccountSettingsForm
                labelName="Region"
                inputName="region"
                errorExists={Boolean(errors.region)}
                errorMessage={errors.region?.message || ""}
                register={register}
                value={user.user?.region}
                placeholderText="Enter your region"
              />
            </div>

            <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
              <AccountSettingsForm
                labelName="District"
                inputName="district"
                errorExists={Boolean(errors.district)}
                errorMessage={errors.district?.message || ""}
                register={register}
                value={user.user?.district}
                placeholderText="Enter your district"
              />

              <AccountSettingsForm
                labelName="Contact Information"
                inputName="contactInformation"
                errorExists={Boolean(errors.contactInformation)}
                errorMessage={errors.contactInformation?.message || ""}
                register={register}
                value={""}
                placeholderText="Enter your contact information"
              />

              <AccountSettingsForm
                labelName="Available Services"
                inputName="availableServices"
                errorExists={Boolean(errors.availableServices)}
                errorMessage={errors.availableServices?.message || ""}
                register={register}
                value={user.user?.availableServices}
                placeholderText="Enter available services"
              />
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
          <AccountSettingFormHeader title="Additional Information" />

          <form
            onSubmit={handleSubmit(submitAccountUpdate)}
            className="flex flex-col gap-5 px-2 md:px-5"
            method="POST"
          >
            <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
              <AccountSettingsForm
                labelName="Operating Hours"
                inputName="operatingHours"
                errorExists={Boolean(errors.operatingHours)}
                errorMessage={errors.operatingHours?.message || ""}
                register={register}
                value={user.user?.operatingHours}
                placeholderText="Enter operating hours"
              />

              <AccountSettingsForm
                labelName="Staff Information"
                inputName="staffInformation"
                errorExists={Boolean(errors.staffInformation)}
                errorMessage={errors.staffInformation?.message || ""}
                register={register}
                value={""}
                placeholderText="Enter staff information"
              />

              <AccountSettingsForm
                labelName="Facility Details"
                inputName="facilityDetails"
                errorExists={Boolean(errors.facilityDetails)}
                errorMessage={errors.facilityDetails?.message || ""}
                register={register}
                value=""
                placeholderText="Enter facility details"
              />
            </div>

            <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
              <AccountSettingsForm
                labelName="Historical Inforamtion"
                inputName="historicalInformation"
                errorExists={Boolean(errors.historicalInformation)}
                errorMessage={errors.historicalInformation?.message || ""}
                register={register}
                value={""}
                placeholderText="Enter historical information"
              />

              <AccountSettingsForm
                labelName="Community Outreach Programs"
                inputName="communityOutreachContact"
                errorExists={Boolean(errors.communityOutreachContact)}
                errorMessage={errors.communityOutreachContact?.message || ""}
                register={register}
                value={""}
                placeholderText="Enter community outreach programs"
              />

              <AccountSettingsForm
                labelName="Emergency Contact"
                inputName="emergencyContact"
                errorExists={Boolean(errors.emergencyContact)}
                errorMessage={errors.emergencyContact?.message || ""}
                register={register}
                value={""}
                placeholderText="Enter emergency contact"
              />
            </div>

            <div></div>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
          <AccountSettingFormHeader title="Preferences" />

          <h3 className="text-primary-gray/50 ps-2 md:ps-5">
            Notification Preferences
          </h3>
          <form
            onSubmit={handleSubmit(submitAccountUpdate)}
            className="flex flex-col gap-5 px-2 md:px-5"
            method="POST"
          >
            <div className="items-top flex space-x-2">
              <input
                type="checkbox"
                {...register("notifications")}
                className="border-secondary-gray border-2"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="notifications"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email Notifications
                </label>
              </div>
            </div>
          </form>
        </div>

        <AccountSettingsFormButton
          pending={pending}
          handleAccountUpdate={handleAccountUpdate}
        />
      </div>

      <NotificationModal
        openModal={showAccountUpdateModal}
        title="User details updated"
        description="Your details has been updated successfully"
        progressBgColor="#40E0D080"
      />
    </section>
  );
};

export default AccountSettings;

const AccountSettingFormHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <h2 className="text-secondary-gray text-lg font-semibold">{title}</h2>

      <Button className="flex items-center gap-2 p-4 rounded-full bg-transparent hover:bg-transparent border border-primary-gray/50">
        <span className="text-primary-gray/50">Edit</span>
        <Edit size={15} className="text-primary-gray/50" />
      </Button>
    </div>
  );
};

const AccountSettingsFormButton = ({
  handleAccountUpdate,
  pending,
}: {
  handleAccountUpdate: () => void;
  pending: boolean;
}) => {
  return (
    <div className="flex items-center justify-end w-full py-5">
      <div className="flex items-center gap-5">
        <Button
          variant={"destructive"}
          className="w-full md:w-fit px-5 md:px-10 py-3"
          type="button"
          disabled={pending}
        >
          Cancel
        </Button>

        <Button
          onClick={handleAccountUpdate}
          variant={"default"}
          type="submit"
          disabled={pending}
          className="w-full md:w-fit px-5 md:px-10 py-3"
        >
          {pending ? (
            <ClipLoader size={28} loading={pending} color="white" />
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </div>
  );
};
