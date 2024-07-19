"use client";

import CustomInputForm from "@/components/CustomInputForm";
import ImagePreview from "@/components/ImagePreview";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { CompoundType } from "@/types/index";
import { useAuth } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { compoundSchema } from "@/schema/compound.schema";
import { z } from "zod";
import { fileToBase64 } from "file64";
import axios from "axios";
import { useMutateData } from "@/hooks/useFetch";
import { createChpsCompound } from "@/actions/chps-compound.action";
import { ChpsCompound } from "@/types/backend";

const AddCompoundForm = () => {
  const router = useRouter();
  const [user] = useAuth();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<CompoundType & { profilePicture: any }>({
    resolver: zodResolver(
      compoundSchema.extend({
        profilePicture: z.any().optional(),
      })
    ),
    defaultValues: {
      createdById: user?.admin?._id!,
      authUserId: user?.auth.id!,
      isSuperAdmin: user?.isSuperAdmin!,
    },
    mode: "all",
  });

  const profilePicture = watch("profilePicture");

  const { mutateAsync, isPending: pending } = useMutateData<
    CompoundType,
    ChpsCompound
  >({
    mutationFn: async (data: CompoundType) => createChpsCompound(data),
    config: {
      queryKey: ["compounds"],
    },
  });

  const submitAddCompound: SubmitHandler<
    CompoundType & { profilePicture: any }
  > = async (data) => {
    const baseUrl =
      "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5";

    const profilePicbase64 = data.profilePicture
      ? await fileToBase64(data.profilePicture)
      : "";
    console.log({ profilePicbase64, data });

    const res = await axios.post(`${baseUrl}&source=${profilePicbase64}`);
    const profilePictureUrl = res.data?.image?.url as string;

    const { profilePicture, ...rest } = data;

    console.log({ profilePictureUrl, rest });

    await mutateAsync(
      { ...rest, profilePictureUrl: profilePictureUrl },
      {
        onSuccess: (data) => {
          toast.success("Compound added successfully");
          const compoundId = data?._id!;
          queryClient.invalidateQueries({ queryKey: ["compounds"] });
          router.replace(`/dashboard/compounds/${compoundId}`);
        },
        onError: (err) => {
          toast.error("Something went wrong");
        },
      }
    );
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
      <form
        onSubmit={handleSubmit(submitAddCompound)}
        method="POST"
        className="flex flex-col gap-5 px-3 pt-5 pb-10 bg-white h-full"
      >
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
              />

              <CustomInputForm
                labelName="Location"
                inputName="location"
                errors={errors}
                inputType="text"
                placeholderText="Enter your location"
                register={register}
              />

              <CustomInputForm
                labelName="Region"
                inputName="region"
                errors={errors}
                inputType="text"
                placeholderText="Enter your region"
                register={register}
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
              />

              <CustomInputForm
                labelName="Contact Information"
                inputName="contact"
                errors={errors}
                inputType="text"
                placeholderText="Enter your contact information"
                register={register}
              />

              <CustomInputForm
                labelName="Available Services (comma separated)"
                inputName="availableServices"
                errors={errors}
                inputType="text"
                placeholderText="Enter available services"
                register={register}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
              <CustomInputForm
                labelName="Email Address"
                inputName="email"
                errors={errors}
                inputType="text"
                placeholderText="Enter compound email"
                register={register}
              />

              <CustomInputForm
                labelName="Auth User ID"
                inputName="authUserId"
                errors={errors}
                inputType="hidden"
                register={register}
              />

              <CustomInputForm
                labelName="Created By ID"
                inputName="createdById"
                errors={errors}
                inputType="hidden"
                register={register}
              />

              <CustomInputForm
                labelName="Is Super Admin?"
                inputName="isSuperAdmin"
                errors={errors}
                inputType="hidden"
                register={register}
              />

              <CustomInputForm
                labelName="Do you accept the terms and conditions?"
                inputName="hasAcceptedTC"
                errors={errors}
                inputType="hidden"
                register={register}
                value={["true", "false"][Math.floor(Math.random() * 2)]}
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

            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-5">
              {/* <CustomInputForm
                labelName="Historical Information"
                inputName="historicalInformation"
                errors={errors}
                inputType="text"
                placeholderText="Enter historical information"
                register={register}
              /> */}

              {/* <CustomInputForm
                labelName="Community Outreach Programs"
                inputName="communityOutreachContact"
                errors={errors}
                inputType="text"
                placeholderText="Enter community outreach programs"
                register={register}
              /> */}

              {/* <CustomInputForm
                labelName="Staff Information"
                inputName="staffInformation"
                errors={errors}
                inputType="text"
                placeholderText="Enter staff information"
                register={register}
              /> */}

              {/* <CustomInputForm
                labelName="Facility Details"
                inputName="facilityDetails"
                errors={errors}
                inputType="text"
                placeholderText="Enter facility details"
                register={register}
              /> */}
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
                    <Upload size={30} className="text-secondary-gray/50" />
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

        <AddCompoundFormButton pending={pending} />
      </form>
    </section>
  );
};

export default AddCompoundForm;

// Form Section Header
export const FormSectionHeader = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <span className="text-secondary-gray text-lg font-semibold">{title}</span>
    </div>
  );
};

// Add Compound Form Button
const AddCompoundFormButton = ({ pending }: { pending: boolean }) => {
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
          variant={"default"}
          type="submit"
          disabled={pending}
          className="w-full md:w-fit px-5 md:px-10 py-3"
        >
          {pending ? (
            <ClipLoader size={28} loading={pending} color="white" />
          ) : (
            "Add Compound"
          )}
        </Button>
      </div>
    </div>
  );
};
