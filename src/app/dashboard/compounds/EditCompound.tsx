"use client";

import React, { useState } from "react";
import { MEDCONNECT_SUPER_ADMIN_DASHBOARD_COMPOUNDS_WITH_ACTIONS as compoundsData } from "@/constants";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingsSchema, SettingsType } from "@/schema/setting.schema";
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import ImagePreview from "@/components/ImagePreview";
import AccountSettingsForm from "@/app/dashboard/settings/AccountSettingsForm";
import { FormSectionHeader } from "@/app/dashboard/compounds/add-new/AddCompoundForm";
import { useRouter } from "next/navigation";
import NotificationModal from "@/components/NotificationModal";

type EditCompoundModalProps = {
  openModal: boolean;
  setShowEditCompoundModal: React.Dispatch<React.SetStateAction<boolean>>;
  compoundId: string;
  setEditCompoundId: React.Dispatch<React.SetStateAction<string>>;
};

const EditCompoundModal = ({
  openModal,
  setShowEditCompoundModal,
  compoundId,
  setEditCompoundId,
}: EditCompoundModalProps) => {
  const router = useRouter();

  const [profilePicture, setProfilePicture] =
    useState<ArrayLike<File | DataTransferItem>>();
  const [showEditNotificationModal, setShowEditNotificationModal] =
    useState(false);

  // get selected compound data to be edited
  const compoundData = compoundsData.find(
    (compound) => compound.compoundId.toLowerCase() === compoundId.toLowerCase()
  );

  const {
    register,
    reset,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<SettingsType>({
    resolver: zodResolver(settingsSchema),
    mode: "all",
  });

  const submitEditCompound: SubmitHandler<SettingsType> = async (data) => {
    console.log({ data, profilePicture });
    setShowEditNotificationModal(true);
    setTimeout(() => {
      setShowEditNotificationModal(false);
    }, 4000);
    setShowEditCompoundModal(false);
  };

  // no compound found
  if (!compoundData) {
    router.push("/dashboard/compounds");
    return;
  }

  return (
    <Dialog open={openModal}>
      <DialogContent
        id="hide"
        className="flex flex-col gap-4 w-full max-w-[90vw] max-h-[95vh] h-full oveflow-hidden"
      >
        <DialogHeader className="overflow-y-scroll scrollbar-hide">
          <DialogTitle className="flex items-center justify-between">
            <span className="text-xl md:text-2xl text-secondary-gray font-bold">
              Edit Compound Details
            </span>
            <DialogClose
              onClick={() => {
                setEditCompoundId("");
                setShowEditCompoundModal(false);
                reset();
              }}
            >
              <X
                className="border border-red-500 text-red-500 rounded-full"
                size={25}
              />
            </DialogClose>
          </DialogTitle>

          <DialogDescription className="flex flex-col gap-5 max-w-screen w-full overflow-x-hidden scrollbar-hide">
            <form
              onSubmit={handleSubmit(submitEditCompound)}
              className="flex flex-col gap-4 w-full"
              method="POST"
              encType="multipart/form-data"
            >
              <div className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full">
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
                        {Array.from(profilePicture).map(
                          (image, idx: number) => (
                            <ImagePreview
                              image={URL.createObjectURL(image as File)}
                              key={idx}
                            />
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* General Information */}
                <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                  <FormSectionHeader title="General Information" />

                  <div className="flex flex-col gap-5 px-2 md:px-5">
                    <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
                      <AccountSettingsForm
                        labelName="Compound Name"
                        inputName="compoundName"
                        errorExists={Boolean(errors.compoundName)}
                        errorMessage={errors.compoundName?.message || ""}
                        register={register}
                        value={compoundData.compoundName}
                        placeholderText="Enter your compound name"
                      />

                      <AccountSettingsForm
                        labelName="Location"
                        inputName="location"
                        errorExists={Boolean(errors.location)}
                        errorMessage={errors.location?.message || ""}
                        register={register}
                        value={compoundData.location}
                        placeholderText="Enter your location"
                      />

                      <AccountSettingsForm
                        labelName="Region"
                        inputName="region"
                        errorExists={Boolean(errors.region)}
                        errorMessage={errors.region?.message || ""}
                        register={register}
                        value={compoundData.region}
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
                  </div>
                </div>

                {/* Additional Information */}
                <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                  <FormSectionHeader title="Additional Information" />

                  <div className="flex flex-col gap-5 px-2 md:px-5">
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
                        errorMessage={
                          errors.historicalInformation?.message || ""
                        }
                        register={register}
                        value={""}
                        placeholderText="Enter historical information"
                      />

                      <AccountSettingsForm
                        labelName="Community Outreach Programs"
                        inputName="communityOutreachContact"
                        errorExists={Boolean(errors.communityOutreachContact)}
                        errorMessage={
                          errors.communityOutreachContact?.message || ""
                        }
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
                  </div>
                </div>

                {/* Notification Preferences */}
                <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                  <FormSectionHeader title="Preferences" />

                  <h3 className="text-primary-gray/50 ps-2 md:ps-5">
                    Notification Preferences
                  </h3>
                  <div className="flex flex-col gap-5 px-2 md:px-5">
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
                  </div>
                </div>

                {/* Submit form button */}
                <EditCompoundButton
                  pending={pending}
                  reset={reset}
                  setShowEditCompoundModal={setShowEditCompoundModal}
                  setEditCompoundId={setEditCompoundId}
                />
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>

      <NotificationModal
        openModal={showEditNotificationModal}
        title="Compound Details Updated"
        description="Your details has been updated successfully"
        progressBgColor="#40E0D080"
      />
    </Dialog>
  );
};

export default EditCompoundModal;

const EditCompoundButton = ({
  pending,
  reset,
  setShowEditCompoundModal,
  setEditCompoundId,
}: {
  pending: boolean;
  reset: () => void;
  setShowEditCompoundModal: React.Dispatch<React.SetStateAction<boolean>>;
  setEditCompoundId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex gap-5 flex-row items-center justify-end">
      <Button
        disabled={pending}
        onClick={() => {
          setEditCompoundId("");
          setShowEditCompoundModal(false);
          reset();
        }}
        type="reset"
        variant={"destructive"}
        className="text-center text-white rounded-md"
      >
        Cancel
      </Button>

      <Button
        variant={"default"}
        disabled={pending}
        className="text-white rounded-md text-center"
      >
        {pending ? (
          <ClipLoader size={28} loading={pending} color="white" />
        ) : (
          "Update"
        )}
      </Button>
    </div>
  );
};
