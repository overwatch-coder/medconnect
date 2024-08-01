"use client";

import React, { useEffect, useState } from "react";
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
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClipLoader from "react-spinners/ClipLoader";
import ImagePreview from "@/components/ImagePreview";
import { FormSectionHeader } from "@/app/dashboard/compounds/add-new/AddCompoundForm";
import { useRouter } from "next/navigation";
import NotificationModal from "@/components/NotificationModal";
import CustomInputForm from "@/components/CustomInputForm";
import { CompoundType } from "@/types/index";
import { useFetch, useMutateData } from "@/hooks/useFetch";
import {
  getChpsById,
  updateChpsCompound,
} from "@/actions/chps-compound.action";
import { ChpsCompound } from "@/types/backend";
import RenderCustomError from "@/components/RenderCustomError";
import { compoundSchema } from "@/schema/compound.schema";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import { axiosInstance } from "@/lib/utils";
import { useAuth } from "@/hooks";

type EditCompoundModalProps = {
  openModal: boolean;
  setShowEditCompoundModal: React.Dispatch<React.SetStateAction<boolean>>;
  compoundId: string;
  setEditCompoundId: React.Dispatch<React.SetStateAction<string>>;
};

export type EditCompoundType = Omit<CompoundType, "createdById" | "email"> & {
  profilePicture: any;
};

const editCompoundSchema = compoundSchema
  .omit({
    createdById: true,
    email: true,
  })
  .extend({
    profilePicture: z.any().optional(),
  });

const EditCompoundModal = ({
  openModal,
  setShowEditCompoundModal,
  compoundId,
  setEditCompoundId,
}: EditCompoundModalProps) => {
  const [user] = useAuth();
  const { data: compound, refetch: fetchCompound } = useFetch<ChpsCompound>({
    queryFn: async () => await getChpsById(compoundId),
    queryKey: ["compounds", compoundId],
    enabled: true,
  });
  const queryClient = useQueryClient();

  const router = useRouter();

  const [showEditNotificationModal, setShowEditNotificationModal] =
    useState(false);

  const {
    register,
    formState: { errors, isSubmitting: pending },
    handleSubmit,
    watch,
    setValue,
  } = useForm<EditCompoundType>({
    resolver: zodResolver(editCompoundSchema),
    defaultValues: {
      name: compound?.name!,
      contact: compound?.contact!,
      emergencyContact: compound?.emergencyContact!,
      location: compound?.location!,
      district: compound?.district!,
      region: compound?.region!,
      operatingHours: compound?.operatingHours!,
      hasAcceptedTC: compound?.hasAcceptedTC!,
      availableServices:
        compound?.availableServices && compound?.availableServices.length > 0
          ? compound?.availableServices.join(",")
          : "",
    },
    mode: "all",
  });

  const profilePicture = watch("profilePicture");
  const name = watch("name");

  const { mutateAsync, error, reset, isError } = useMutateData<
    EditCompoundType,
    ChpsCompound
  >({
    mutationFn: async (data: EditCompoundType) =>
      updateChpsCompound(data, compoundId),
    config: {
      queryKey: ["compounds"],
    },
    notificationData: {
      type: "Compound Update",
      title: "Compound details have been updated",
      description: `The compound ${name} has been updated successfully`,
    },
  });

  const submitForm: SubmitHandler<EditCompoundType> = async (data) => {
    if (profilePicture && profilePicture.length > 0) {
      const formData = new FormData();
      formData.append("image", profilePicture[0]);

      const res = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user?.auth.token}`,
        },
      });

      const resData = await res.data;

      data.profilePictureUrl = resData?.fileUrl || compound?.profilePictureUrl;
    } else {
      data.profilePictureUrl = compound?.profilePictureUrl;
    }

    const { profilePicture: pic, ...rest } = data;

    await mutateAsync(rest as EditCompoundType, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["compounds"] });
        queryClient.invalidateQueries({ queryKey: ["compounds", ""] });

        fetchCompound({});

        toast.success("Compound updated successfully");

        setShowEditNotificationModal(true);
        setTimeout(() => {
          setShowEditNotificationModal(false);
        }, 3000);
        setShowEditCompoundModal(false);
        setEditCompoundId("");

        router.replace(`/dashboard/compounds/${compoundId}`);
      },
      onError: (err) => {
        toast.error("Something went wrong while updating compound");
      },
    });
  };

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
              onSubmit={handleSubmit(submitForm)}
              method="POST"
              className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full"
            >
              <RenderCustomError error={error} isError={isError} />
              {/* General Information */}
              <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                <FormSectionHeader title="General Information" />

                <div className="flex flex-col gap-5 px-2 md:px-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
                    <CustomInputForm
                      labelName="Compound Name"
                      inputName="name"
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter your compound name"
                      register={register}
                      value={compound?.name}
                    />

                    <CustomInputForm
                      labelName="Location"
                      inputName="location"
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter your location"
                      register={register}
                      value={compound?.location}
                    />

                    <CustomInputForm
                      labelName="Region"
                      inputName="region"
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter your region"
                      register={register}
                      value={compound?.region}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
                    <CustomInputForm
                      labelName="District"
                      inputName="district"
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter your district"
                      register={register}
                      value={compound?.district}
                    />

                    <CustomInputForm
                      labelName="Contact Information"
                      inputName="contact"
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter your contact information"
                      register={register}
                      value={compound?.contact}
                    />

                    <CustomInputForm
                      labelName="Available Services (comma separated)"
                      inputName="availableServices"
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter available services"
                      register={register}
                      value={
                        compound?.availableServices &&
                        compound?.availableServices.length > 0
                          ? compound?.availableServices.join(",")
                          : ""
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
                <FormSectionHeader title="Additional Information" />

                <div className="flex flex-col gap-5 px-2 md:px-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
                    <CustomInputForm
                      labelName="Operating Hours"
                      inputName="operatingHours"
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter operating hours"
                      register={register}
                      value={compound?.operatingHours}
                    />

                    <CustomInputForm
                      labelName="Emergency Contact"
                      inputName="emergencyContact"
                      errors={errors}
                      inputType="text"
                      placeholderText="Enter emergency contact"
                      register={register}
                      value={compound?.emergencyContact}
                    />
                  </div>
                </div>
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

              <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="hasAcceptedTC"
                    className="border-secondary-gray border-2"
                    {...register("hasAcceptedTC")}
                    onCheckedChange={(value) =>
                      setValue("hasAcceptedTC", value as boolean)
                    }
                    defaultChecked={compound?.hasAcceptedTC}
                  />

                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="hasAcceptedTC"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Do you accept the terms and conditions?
                    </label>
                  </div>
                </div>
              </div>

              <EditCompoundButton
                pending={pending}
                reset={reset}
                setShowEditCompoundModal={setShowEditCompoundModal}
                setEditCompoundId={setEditCompoundId}
              />
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

// <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
{
  /* <CustomInputForm
                labelName="Historical Information"
                inputName="historicalInformation"
                errors={errors}
                inputType="text"
                placeholderText="Enter historical information"
                register={register}
              /> */
}

{
  /* <CustomInputForm
                labelName="Community Outreach Programs"
                inputName="communityOutreachContact"
                errors={errors}
                inputType="text"
                placeholderText="Enter community outreach programs"
                register={register}
              /> */
}

{
  /* <CustomInputForm
                labelName="Staff Information"
                inputName="staffInformation"
                errors={errors}
                inputType="text"
                placeholderText="Enter staff information"
                register={register}
              /> */
}

{
  /* <CustomInputForm
                labelName="Facility Details"
                inputName="facilityDetails"
                errors={errors}
                inputType="text"
                placeholderText="Enter facility details"
                register={register}
              /> */
}
// </div>;
