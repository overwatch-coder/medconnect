"use client";

import AccountSettingsForm from "@/app/dashboard/settings/AccountSettingsForm";
import ImagePreview from "@/components/ImagePreview";
import NotificationModal from "@/components/NotificationModal";
import { Button } from "@/components/ui/button";
import { useUserAtom } from "@/hooks";
import { SettingsType, settingsSchema } from "@/schema/setting.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileDrop } from "@instructure/ui-file-drop";
import { Edit, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";

const AddCompoundForm = () => {
  const [user, setUser] = useUserAtom();
  const [profilePicture, setProfilePicture] =
    useState<ArrayLike<File | DataTransferItem>>();

  const {
    register,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<SettingsType>({
    resolver: zodResolver(settingsSchema),
    mode: "all",
  });

  const submitAddCompound: SubmitHandler<SettingsType> = async (data) => {
    console.log({ data });
  };

  const handleAccountAdd = () => {
    console.log("Add account");
  };

  return (
    <section className="flex flex-col rounded w-full pt-10 scrollbar-hide">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center justify-center gap-2 rounded-t-md bg-secondary-gray/20 px-5 py-3 w-fit">
          <p className="text-secondary-gray text-center font-medium">
            Add a compound
          </p>
        </div>
      </div>

      {/* Account Settings */}
      <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
        {/* General Information */}
        <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
          <FormSectionHeader title="General Information" />

          <form
            onSubmit={handleSubmit(submitAddCompound)}
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
                value={""}
                placeholderText="Enter your compound name"
              />

              <AccountSettingsForm
                labelName="Location"
                inputName="location"
                errorExists={Boolean(errors.location)}
                errorMessage={errors.location?.message || ""}
                register={register}
                value={""}
                placeholderText="Enter your location"
              />

              <AccountSettingsForm
                labelName="Region"
                inputName="region"
                errorExists={Boolean(errors.region)}
                errorMessage={errors.region?.message || ""}
                register={register}
                value={""}
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
                value={""}
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
                value={""}
                placeholderText="Enter available services"
              />
            </div>
          </form>
        </div>

        {/* Additional Information */}
        <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
          <FormSectionHeader title="Additional Information" />

          <form
            onSubmit={handleSubmit(submitAddCompound)}
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
                value={""}
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
          </form>
        </div>

        {/* Upload Profile Picture */}
        <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
          <FormSectionHeader title="Upload Profile Picture" />

          {/* Attachment */}
          <div className="flex flex-col gap-4 p-2 w-full rounded-md border border-secondary-gray bg-transparent">
            <FileDrop
              id="profilePicture"
              name="profilePicture"
              onDropAccepted={(file) => {
                setProfilePicture(file);
              }}
              shouldEnablePreview={true}
              shouldAllowMultiple={false}
              renderLabel={() => (
                <div className="flex flex-col gap-5 p-2 items-center justify-center">
                  <Upload size={30} className="text-black" />
                  <p className="text-sm text-black">
                    Drag and drop files here <br /> or click to browse
                  </p>
                </div>
              )}
            />

            {profilePicture && profilePicture.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap overflow-x-scroll scrollbar-hide">
                {Array.from(profilePicture).map((image, idx: number) => (
                  <ImagePreview
                    image={URL.createObjectURL(image as File)}
                    key={idx}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <AddCompoundFormButton
          pending={pending}
          handleAccountAdd={handleAccountAdd}
        />
      </div>
    </section>
  );
};

export default AddCompoundForm;

export const FormSectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <h2 className="text-secondary-gray text-lg font-semibold">{title}</h2>
    </div>
  );
};

const AddCompoundFormButton = ({
  handleAccountAdd,
  pending,
}: {
  handleAccountAdd: () => void;
  pending: boolean;
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-end w-full py-5">
      <div className="flex items-center gap-5">
        <Button
          variant={"destructive"}
          className="w-full md:w-fit px-5 md:px-10 py-3"
          type="button"
          disabled={pending}
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        <Button
          onClick={handleAccountAdd}
          variant={"default"}
          type="submit"
          disabled={pending}
          className="w-full md:w-fit px-5 md:px-10 py-3"
        >
          {pending ? (
            <ClipLoader size={28} loading={pending} color="white" />
          ) : (
            "Add"
          )}
        </Button>
      </div>
    </div>
  );
};
