"use client";

import CustomInputForm from "@/components/CustomInputForm";
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
              <CustomInputForm
                labelName="Compound Name"
                inputName="compoundName"
                errors={errors}
                inputType="text"
                register={register}
                value={user.user?.compoundName}
                placeholderText="Enter your compound name"
              />

              <CustomInputForm
                labelName="Location"
                inputName="location"
                errors={errors}
                inputType="text"
                register={register}
                value={user.user?.location}
                placeholderText="Enter your location"
              />

              <CustomInputForm
                labelName="Region"
                inputName="region"
                errors={errors}
                inputType="text"
                register={register}
                value={user.user?.region}
                placeholderText="Enter your region"
              />
            </div>

            <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
              <CustomInputForm
                labelName="District"
                inputName="district"
                errors={errors}
                inputType="text"
                register={register}
                value={user.user?.district}
                placeholderText="Enter your district"
              />

              <CustomInputForm
                labelName="Contact Information"
                inputName="contactInformation"
                errors={errors}
                inputType="text"
                register={register}
                value={""}
                placeholderText="Enter your contact information"
              />

              <CustomInputForm
                labelName="Available Services"
                inputName="availableServices"
                errors={errors}
                inputType="text"
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
              <CustomInputForm
                labelName="Operating Hours"
                inputName="operatingHours"
                errors={errors}
                inputType="text"
                register={register}
                value={user.user?.operatingHours}
                placeholderText="Enter operating hours"
              />

              <CustomInputForm
                labelName="Staff Information"
                inputName="staffInformation"
                errors={errors}
                inputType="text"
                register={register}
                value={""}
                placeholderText="Enter staff information"
              />

              <CustomInputForm
                labelName="Facility Details"
                inputName="facilityDetails"
                errors={errors}
                inputType="text"
                register={register}
                value=""
                placeholderText="Enter facility details"
              />
            </div>

            <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
              <CustomInputForm
                labelName="Historical Inforamtion"
                inputName="historicalInformation"
                errors={errors}
                inputType="text"
                register={register}
                value={""}
                placeholderText="Enter historical information"
              />

              <CustomInputForm
                labelName="Community Outreach Programs"
                inputName="communityOutreachContact"
                errors={errors}
                inputType="text"
                register={register}
                value={""}
                placeholderText="Enter community outreach programs"
              />

              <CustomInputForm
                labelName="Emergency Contact"
                inputName="emergencyContact"
                errors={errors}
                inputType="text"
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
                id="notifications"
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
