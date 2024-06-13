"use client";

import { SettingsType } from "@/schema/setting.schema";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type InputName = keyof SettingsType;

type AccountSettingsFormProps = {
  labelName: string;
  inputName: InputName;
  errorExists: boolean;
  errorMessage: string;
  register: UseFormRegister<SettingsType>;
  value?: string;
  placeholderText?: string;
};

const AccountSettingsForm = ({
  labelName,
  inputName,
  errorExists,
  errorMessage,
  register,
  placeholderText,
  value,
}: AccountSettingsFormProps) => {
  return (
    <div className="flex flex-col space-y-4 w-full">
      <label className="text-primary-gray/50" htmlFor={inputName}>
        {labelName}
      </label>

      <input
        type="text"
        className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
        {...register(inputName)}
        placeholder={placeholderText}
        defaultValue={value}
      />
      {errorExists && (
        <p className="text-red-500 text-xs py-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default AccountSettingsForm;
