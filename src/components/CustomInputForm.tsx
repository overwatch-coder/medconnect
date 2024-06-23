"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type CustomInputFormProps<T extends FieldValues> = {
  labelName: string;
  inputName: Path<T>;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  value?: string;
  placeholderText?: string;
  className?: string;
  inputType?: "text" | "date" | "select" | "textarea" | "time";
  selectOptions?: { value: string; label: string }[];
  isInputPassword?: boolean;
};

const CustomInputForm = <T extends FieldValues>({
  labelName,
  inputName,
  errors,
  register,
  placeholderText,
  value,
  inputType,
  className,
  selectOptions,
  isInputPassword,
}: CustomInputFormProps<T>) => {
  return (
    <div className={cn("flex flex-col space-y-4 w-full", className)}>
      <label className="text-primary-gray/50" htmlFor={inputName as string}>
        {labelName}
      </label>

      {inputType === "date" && (
        <input
          type="date"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
          max={new Date().toISOString().split("T")[0]}
        />
      )}

      {inputType === "time" && (
        <input
          type="time"
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
        />
      )}

      {inputType === "select" && (
        <select
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
          {...register(inputName)}
          defaultValue={value}
        >
          <option value="">Select one</option>
          {selectOptions &&
            selectOptions.map((option, index) => (
              <option
                className="text-secondary-gray"
                key={index}
                value={option.value.toLowerCase()}
              >
                {option.label}
              </option>
            ))}
        </select>
      )}

      {inputType === "text" && (
        <input
          type={isInputPassword ? "password" : "text"}
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
        />
      )}

      {inputType === "textarea" && (
        <textarea
          rows={5}
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
        />
      )}

      {errors[inputName] && (
        <p className="text-red-500 text-xs py-2">
          {errors[inputName]?.message as string}
        </p>
      )}
    </div>
  );
};

export default CustomInputForm;
