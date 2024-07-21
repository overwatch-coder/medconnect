"use server";

import { currentUser } from "@/actions/user.action";
import { axiosInstance } from "@/lib/utils";
import { Patient } from "@/types/backend";
import { PatientType } from "@/types/index";
import { isAxiosError } from "axios";

// get all patients
export const getPatients = async (): Promise<Patient[]> => {
  try {
    const user = await currentUser();

    const res = await axiosInstance.get(`/patient`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    if (!res.data?.status) {
      throw new Error(res.data?.message || "Error fetching patients");
    }

    return res.data?.data as Patient[];
  } catch (error: any) {
    console.log({ error, in: "getPatients" });
    return error;
  }
};

// get all patients from the chps compound
export const getChpsPatients = async (chpsId?: string): Promise<Patient[]> => {
  try {
    const user = await currentUser();
    const compoundId = user?.staff?.chpsCompoundId;

    const res = await axiosInstance.get(`/patient/chps/${compoundId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    if (!res.data?.status) {
      throw new Error(res.data?.message || "Error fetching chps patients");
    }

    const data: Patient[] = res.data?.data;

    return data;
  } catch (error: any) {
    console.log({ error, data: error?.response?.data, in: "getChpsPatients error" });
    return error;
  }
};

// get patient by id
export const getPatient = async (
  patientId: string
): Promise<Patient | undefined> => {
  try {
    const user = await currentUser();

    if (!user || !user.staff) {
      throw new Error("Not authorized");
    }

    const patients = (await getChpsPatients(
      user?.staff?.chpsCompoundId
    )) as Patient[];
    const patient = patients.find((patient) => patient._id === patientId);

    if (!patient) {
      throw new Error("Patient not found");
    }

    return patient;
  } catch (error: any) {
    console.log({ error, in: "getPatients error" });
    return error;
  }
};

// create a new patient
export const createOrEditPatient = async (
  data: PatientType,
  patientId?: string
): Promise<Patient> => {
  try {
    const user = await currentUser();

    const url = patientId
      ? `/patient/chps/${user?.staff?.chpsCompoundId}/${patientId}`
      : `/patient/chps/${user?.staff?.chpsCompoundId}`;

    const dataForBackend = {
      ...data.general,
      additional: {
        ...data.additional,
        allergies: data.additional.allergies
          ? data.additional.allergies.split(",")
          : [],
      },
      emergencyContacts: [
        {
          name: data.emergency.emergencyContactNameOne,
          relationship: data.emergency.emergencyContactRelationshipOne,
          address: data.emergency.emergencyContactAddressOne,
          contact: data.emergency.emergencyContactPhoneNumberOne,
        },
        {
          name: data.emergency.emergencyContactNameTwo,
          relationship: data.emergency.emergencyContactRelationshipTwo,
          address: data.emergency.emergencyContactAddressTwo,
          contact: data.emergency.emergencyContactPhoneNumberTwo,
        },
      ],
    };

    const res = await axiosInstance({
      url: url,
      method: patientId ? "PATCH" : "POST",
      data: dataForBackend,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = res.data;
    console.log({ resData, in: "Before error if" });

    if (!resData?.status) {
      console.log({ error: resData, in: "Error if" });
      throw new Error(resData?.message || "Error updating patient");
    }

    return resData?.data as Patient;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      in: "createOrEditPatient catch",
    });
    if (
      isAxiosError(error) &&
      error?.response?.data?.message.includes('Duplicate key error {"email":')
    ) {
      throw new Error("Patient email already exists!");
    }

    return error;
  }
};

// delete a patient
export const deletePatient = async (patientId: string) => {
  try {
    const user = await currentUser();
    if (!user || !user.staff) {
      throw new Error("Not authorized");
    }

    const res = await axiosInstance.delete(
      `/patient/chps/${user.staff.chpsCompoundId}/${patientId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.auth.token}`,
        },
      }
    );

    console.log({ res, in: "deletePatient res" });

    const resData = { status: true };

    return resData;
  } catch (error: any) {
    console.log({ error, in: "deletePatient" });
    return error;
  }
};
