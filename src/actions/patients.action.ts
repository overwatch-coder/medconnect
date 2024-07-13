"use server";

import { fetchData, mutateData } from "@/actions/api-request.action";
import { currentUser } from "@/actions/user.action";
import { handleApiError } from "@/lib/validations";
import { Patient } from "@/types/backend";
import { PatientType } from "@/types/index";

// get all patiens
export const getPatients = async () => {
  try {
    const user = await currentUser();

    const resData = await fetchData(`/patient`, {
      token: user?.auth.token,
    });

    if (!resData.status) {
      return resData;
    }

    return resData;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// get all patients from the chps compound
export const getChpsPatients = async () => {
  try {
    const user = await currentUser();

    const resData = await fetchData(`/patient/${user?.staff?.chpsCompoundId}`, {
      token: user?.auth.token,
    });

    if (!resData.status) {
      return resData;
    }

    return resData;
  } catch (error: any) {
    return handleApiError(error);
  }
};

// get patient by id
export const getPatient = async (patientId: string) => {
  const results = await getChpsPatients();
  const patients = results.status ? (results.data as Patient[]) : [];

  return patients.find((patient) => patient._id === patientId);
};

// create a new patient
export const createOrEditPatient = async (
  data: PatientType,
  patientId?: string
) => {
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

    const resData = await mutateData(url, dataForBackend, {
      method: patientId ? "PATCH" : "POST",
      token: user?.auth.token,
    });

    if (!resData.status) {
      return resData;
    }

    return resData;
  } catch (error: any) {
    return handleApiError(error);
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
