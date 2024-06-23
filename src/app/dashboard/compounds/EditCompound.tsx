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
import { settingsSchemaWithoutRefinement } from "@/schema/setting.schema";
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import ImagePreview from "@/components/ImagePreview";
import { FormSectionHeader } from "@/app/dashboard/compounds/add-new/AddCompoundForm";
import { useRouter } from "next/navigation";
import NotificationModal from "@/components/NotificationModal";
import CustomInputForm from "@/components/CustomInputForm";
import { SettingsType } from "@/types/index";

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

  const [showEditNotificationModal, setShowEditNotificationModal] =
    useState(false);

  // get selected compound data to be edited
  const compoundData = compoundsData.find(
    (compound) => compound.compoundId.toLowerCase() === compoundId.toLowerCase()
  );

  const {
    register,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
  } = useForm<Partial<SettingsType>>({
    resolver: zodResolver(settingsSchemaWithoutRefinement.partial()),
    mode: "all",
  });

  const profilePicture = watch("profilePicture");

  const submitEditCompound: SubmitHandler<Partial<SettingsType>> = async (
    data
  ) => {
    console.log({ data });
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
                        setValue("profilePicture", file);
                      }}
                      shouldEnablePreview={true}
                      shouldAllowMultiple={false}
                      renderLabel={() => (
                        <div className="flex gap-3 p-2 items-center justify-center">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-secondary-gray">
                            <Upload
                              size={30}
                              className="text-secondary-gray/50"
                            />
                          </div>
                          <p className="text-sm text-black font-semibold flex items-center gap-1">
                            Drag and drop files here or{" "}
                            <span className="text-red-500">Browse File</span>
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
                      <CustomInputForm
                        labelName="Compound Name"
                        inputName="compoundName"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter your compound name"
                        register={register}
                        value={compoundData.compoundName}
                      />

                      <CustomInputForm
                        labelName="Location"
                        inputName="location"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter your location"
                        register={register}
                        value={compoundData.location}
                      />

                      <CustomInputForm
                        labelName="Region"
                        inputName="region"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter your region"
                        register={register}
                        value={compoundData.region}
                      />
                    </div>

                    <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
                      <CustomInputForm
                        labelName="District"
                        inputName="district"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter your district"
                        register={register}
                      />

                      <CustomInputForm
                        labelName="Contact Information"
                        inputName="contactInformation"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter your contact information"
                        register={register}
                      />

                      <CustomInputForm
                        labelName="Available Services"
                        inputName="availableServices"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter available services"
                        register={register}
                      />
                    </div>

                    <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between md:w-1/3">
                      <CustomInputForm
                        labelName="Email Address"
                        inputName="email"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter compound email"
                        register={register}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                  <FormSectionHeader title="Additional Information" />

                  <div className="flex flex-col gap-5 px-2 md:px-5">
                    <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
                      <CustomInputForm
                        labelName="Operating Hours"
                        inputName="operatingHours"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter operating hours"
                        register={register}
                      />

                      <CustomInputForm
                        labelName="Staff Information"
                        inputName="staffInformation"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter staff information"
                        register={register}
                      />

                      <CustomInputForm
                        labelName="Facility Details"
                        inputName="facilityDetails"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter facility details"
                        register={register}
                      />
                    </div>

                    <div className="flex flex-col gap-4 w-full md:flex-row items-center justify-between">
                      <CustomInputForm
                        labelName="Historical Information"
                        inputName="historicalInformation"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter historical information"
                        register={register}
                      />

                      <CustomInputForm
                        labelName="Community Outreach Programs"
                        inputName="communityOutreachContact"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter community outreach programs"
                        register={register}
                      />

                      <CustomInputForm
                        labelName="Emergency Contact"
                        inputName="emergencyContact"
                        errors={errors}
                        inputType="text"
                        placeholderText="Enter emergency contact"
                        register={register}
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
