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
  inputType?:
    | "text"
    | "date"
    | "select"
    | "textarea"
    | "time"
    | "hidden"
    | "number"
    | "datetime-local";
  selectOptions?: { value: string; label: string }[];
  isInputPassword?: boolean;
  disableField?: boolean;
};

// Helper function to get nested errors
const getNestedError = <T extends FieldValues>(
  errors: FieldErrors<T>,
  inputName: Path<T>
): string | undefined => {
  const keys = inputName.split(".") as (keyof T)[];
  let error = errors;
  for (const key of keys) {
    if (error[key]) {
      error = error[key] as FieldErrors<T>;
    } else {
      return undefined;
    }
  }
  return (error as FieldErrors<FieldValues>).message as unknown as string;
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
  disableField,
}: CustomInputFormProps<T>) => {
  const errorMessage = getNestedError(errors, inputName);

  return (
    <div
      className={cn("flex flex-col items-start space-y-4 w-full", className)}
    >
      {inputType !== "hidden" && (
        <label className="text-primary-gray/50" htmlFor={inputName as string}>
          {labelName}
        </label>
      )}

      {!["select", "textarea"].includes(inputType!) && (
        <input
          type={isInputPassword ? "password" : inputType!}
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
          disabled={disableField}
        />
      )}

      {inputType === "select" && (
        <select
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
          {...register(inputName)}
          defaultValue={value}
          disabled={disableField}
        >
          <option value="">Select one</option>
          {selectOptions &&
            selectOptions.map((option, index) => (
              <option
                className="text-secondary-gray"
                key={index}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
        </select>
      )}

      {inputType === "textarea" && (
        <textarea
          rows={5}
          className="px-3 py-2 rounded w-full focus:border-2 ring-0 outline-none border border-secondary-gray placeholder:text-secondary-gray/60"
          {...register(inputName)}
          placeholder={placeholderText}
          defaultValue={value}
          disabled={disableField}
        />
      )}

      {errorMessage && (
        <p className="text-red-500 text-xs py-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default CustomInputForm;
