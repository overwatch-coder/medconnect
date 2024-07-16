"use server";

import { mutateData } from "@/actions/api-request.action";
import { currentUser } from "@/actions/user.action";
import { axiosInstance } from "@/lib/utils";
import { handleApiError } from "@/lib/validations";
import { Patient } from "@/types/backend";
import { PatientType } from "@/types/index";

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
export const getChpsPatients = async (): Promise<Patient[]> => {
  try {
    const user = await currentUser();

    const res = await axiosInstance.get(
      `/patient/${user?.staff?.chpsCompoundId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.auth.token}`,
        },
      }
    );

    if (!res.data?.status) {
      throw new Error(res.data?.message || "Error fetching chps patients");
    }

    const data: Patient[] = res.data?.data;

    return data;
  } catch (error: any) {
    console.log({ error, in: "getChpsPatients" });
    return error;
  }
};

// get patient by id
export const getPatient = async (
  patientId: string
): Promise<Patient | undefined> => {
  try {
    const patients = (await getPatients()) as Patient[];
    return patients.find((patient) => patient._id === patientId);
  } catch (error: any) {
    console.log({ error, in: "getPatients" });
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
      ? `/patient/${user?.staff?.chpsCompoundId}/${patientId}`
      : `/patient/${user?.staff?.chpsCompoundId}`;

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

    if (!resData?.status) {
      throw new Error(resData?.message || "Error updating patient");
    }

    return resData?.data as Patient;
  } catch (error: any) {
    console.log({ error, in: "createOrEditPatient" });
    return error;
  }
};

// delete a patient
export const deletePatient = async (patientId: string) => {
  try {
    const user = await currentUser();

    const resData = await mutateData(
      `/patient/${user?.staff?.chpsCompoundId}/${patientId}`,
      {},
      {
        method: "DELETE",
        token: user?.auth.token,
      }
    );

    if (!resData.status) {
      return resData;
    }

    return resData;
  } catch (error: any) {
    return handleApiError(error);
  }
};
