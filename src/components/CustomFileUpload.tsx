"use client";
import { FormSectionHeader } from "@/app/dashboard/compounds/add-new/AddCompoundForm";
import ImagePreview from "@/components/ImagePreview";
import { FileDrop } from "@instructure/ui-file-drop";
import { Upload } from "lucide-react";
import React from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

type CustomFileUploadProps<T extends FieldValues> = {
  itemName: Path<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  title: string;
  allowMultiple?: boolean;
};

const CustomFileUpload = <T extends FieldValues>({
  itemName,
  setValue,
  watch,
  title,
  allowMultiple,
}: CustomFileUploadProps<T>) => {
  return (
    <div className="flex flex-col gap-5 p-4 rounded-md border border-secondary-gray/50 w-full">
      <FormSectionHeader title={title} />

      {/* Attachment */}
      <div className="flex flex-col gap-4 p-2 w-full rounded-md border border-secondary-gray bg-transparent">
        <FileDrop
          id="profilePicture"
          name="profilePicture"
          onDropAccepted={(file) => {
            setValue(itemName, file as PathValue<T, Path<T>>);
          }}
          shouldEnablePreview={true}
          shouldAllowMultiple={allowMultiple ? true : false}
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

        {watch(itemName) && watch(itemName).length > 0 && (
          <div className="flex items-center gap-3 flex-wrap overflow-x-scroll scrollbar-hide">
            {Array.from(watch(itemName)).map((image, idx: number) => (
              <ImagePreview
                image={URL.createObjectURL(image as File)}
                key={idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFileUpload;
