"use server";

import { getChpsPatients, getPatient } from "@/actions/patients.action";
import { currentUser } from "@/actions/user.action";
import { axiosInstance } from "@/lib/utils";
import {
  IAppointment,
  IDiagnosisReport,
  IMedicalHistory,
  IPrescription,
  ITreatmentPlan,
  IVisitLogs,
} from "@/types/backend";
import {
  AppointmentType,
  DiagnosisReportType,
  MedicalHistoryType,
  PrescriptionType,
  TreatmentPlanType,
  VisitLogsType,
} from "@/types/index";

// === PRESCRIPTIONS ===
// Get All Prescriptions for all patients
export const getAllPrescriptions = async (): Promise<IPrescription[]> => {
  try {
    const patients = await getChpsPatients();
    if (!patients) {
      throw new Error("No patients found");
    }

    const prescriptions: IPrescription[] = [];

    for (const patient of patients) {
      const prescriptionsForPatient = await getPrescriptions(patient._id);

      if (!prescriptionsForPatient) {
        throw new Error("No prescriptions found");
      }

      prescriptions.push(...prescriptionsForPatient);
    }

    return prescriptions;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.respnse?.data?.message,
      in: "getAllPrescriptions catch",
    });
    return error;
  }
};

// Get All Prescriptions for a patient
export const getPrescriptions = async (
  patientId: string
): Promise<IPrescription[]> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized!");
    }

    const res = await axiosInstance.get(`/patient/${patientId}/prescriptions`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as IPrescription[];
  } catch (error: any) {
    console.log({ error, in: "getPrescriptions catch" });
    return error;
  }
};

// Create or Edit a Prescription
export const createOrEditPrescription = async (
  data: PrescriptionType,
  patientId: string,
  prescriptionId?: string
): Promise<IPrescription> => {
  try {
    const user = await currentUser();

    const url = prescriptionId
      ? `/patient/${patientId}/prescriptions/${prescriptionId}`
      : `/patient/${patientId}/prescriptions`;

    const dataForBackend = {
      healthOfficialName: data.healthOfficialName,
      date: data.date,
      notes: data.notes,
      medication: {
        name: data.medicationName,
        dosage: data.dosage,
        frequency: data.frequency,
        duration: data.duration,
      },
    };

    const res = await axiosInstance({
      url: url,
      method: prescriptionId ? "PATCH" : "POST",
      data: dataForBackend,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      console.log({ error: resData, in: "Error if" });
      throw new Error(
        resData?.message ||
          `Error while ${prescriptionId ? "updating" : "creating"} prescription`
      );
    }

    return resData?.data as IPrescription;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      in: "createOrEditPrescription catch",
    });
    return error;
  }
};

// delete a prescription
export const deletePrescription = async (
  patientId: string,
  prescriptionId: string
) => {
  try {
    const user = await currentUser();
    if (!user || !user.staff) {
      throw new Error("Not authorized");
    }

    const res = await axiosInstance.delete(
      `/patient/${patientId}/prescriptions/${prescriptionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.auth.token}`,
        },
      }
    );

    console.log({ res, in: "deletePrescription res" });

    const resData = { status: true };

    return resData;
  } catch (error: any) {
    console.log({ error, in: "deletePrescription catch" });
    return error;
  }
};

// === TREATMENT PLANS ===
// Get All Treatmentplans
export const getTreatmentPlans = async (
  patientId: string
): Promise<ITreatmentPlan[]> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized!");
    }

    const res = await axiosInstance.get(
      `/patient/${patientId}/treatment-plans`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth.token}`,
        },
      }
    );

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as ITreatmentPlan[];
  } catch (error: any) {
    console.log({ error, in: "getTreatmentPlans catch" });
    return error;
  }
};

// Create or Edit a Prescription
export const createOrEditTreatmentPlan = async (
  data: TreatmentPlanType,
  patientId: string,
  treatmentPlanId?: string
): Promise<ITreatmentPlan> => {
  try {
    const user = await currentUser();

    const url = treatmentPlanId
      ? `/patient/${patientId}/treatment-plans/${treatmentPlanId}`
      : `/patient/${patientId}/treatment-plans`;

    const res = await axiosInstance({
      url: url,
      method: treatmentPlanId ? "PATCH" : "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      console.log({ error: resData, in: "Error if" });
      throw new Error(
        resData?.message ||
          `Error while ${treatmentPlanId ? "updating" : "creating"} treatment plans`
      );
    }

    return resData?.data as ITreatmentPlan;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      in: "createOrEditTreatmentPlan catch",
    });
    return error;
  }
};

// delete a prescription
export const deleteTreatmentPlan = async (
  patientId: string,
  treatmentPlanId: string
) => {
  try {
    const user = await currentUser();
    if (!user || !user.staff) {
      throw new Error("Not authorized");
    }

    const res = await axiosInstance.delete(
      `/patient/${patientId}/treatment-plans/${treatmentPlanId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.auth.token}`,
        },
      }
    );

    console.log({ res, in: "deleteTreatmentPlan res" });

    const resData = { status: true };

    return resData;
  } catch (error: any) {
    console.log({ error, in: "deleteTreatmentPlan catch" });
    return error;
  }
};

// === DIAGNOSIS REPORTS ===
// Get All Diagnosis Reports
export const getDiagnosisReports = async (
  patientId: string
): Promise<IDiagnosisReport[]> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized!");
    }

    const res = await axiosInstance.get(
      `/patient/${patientId}/diagnosis-reports`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth.token}`,
        },
      }
    );

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as IDiagnosisReport[];
  } catch (error: any) {
    console.log({ error, in: "getDiagnosisReport catch" });
    return error;
  }
};

// Create or Edit a diagnosis report
export const createOrEditDiagnosisReport = async (
  data: DiagnosisReportType,
  patientId: string,
  diagnosisReportId?: string
): Promise<IDiagnosisReport> => {
  try {
    const user = await currentUser();

    const url = diagnosisReportId
      ? `/patient/${patientId}/diagnosis-reports/${diagnosisReportId}`
      : `/patient/${patientId}/diagnosis-reports`;

    const res = await axiosInstance({
      url: url,
      method: diagnosisReportId ? "PATCH" : "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      console.log({ error: resData, in: "Error if" });
      throw new Error(
        resData?.message ||
          `Error while ${diagnosisReportId ? "updating" : "creating"} diagnosis report`
      );
    }

    return resData?.data as IDiagnosisReport;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      in: "createOrEditDiagnosisReport catch",
    });
    return error;
  }
};

// delete a diagnosis report
export const deleteDiagnosisReport = async (
  patientId: string,
  diagnosisReportId: string
) => {
  try {
    const user = await currentUser();
    if (!user || !user.staff) {
      throw new Error("Not authorized");
    }

    const res = await axiosInstance.delete(
      `/patient/${patientId}/diagnosis-reports/${diagnosisReportId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.auth.token}`,
        },
      }
    );

    console.log({ res, in: "deleteDiagnosisReport res" });

    const resData = { status: true };

    return resData;
  } catch (error: any) {
    console.log({ error, in: "deleteDiagnosisReport catch" });
    return error;
  }
};

// === VISIT LOGS ===
// Get All Visit logs
export const getVisitLogs = async (
  patientId: string
): Promise<IVisitLogs[]> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized!");
    }

    const res = await axiosInstance.get(`/patient/${patientId}/visit-logs`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as IVisitLogs[];
  } catch (error: any) {
    console.log({ error, in: "createOrEditVisitLogs catch" });
    return error;
  }
};

// Create or Edit a diagnosis report
export const createOrEditVisitLog = async (
  data: VisitLogsType,
  patientId: string,
  visitLogId?: string
): Promise<IVisitLogs> => {
  try {
    const user = await currentUser();

    const url = visitLogId
      ? `/patient/${patientId}/visit-logs/${visitLogId}`
      : `/patient/${patientId}/visit-logs`;

    const res = await axiosInstance({
      url: url,
      method: visitLogId ? "PATCH" : "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      console.log({ error: resData, in: "Error if" });
      throw new Error(
        resData?.message ||
          `Error while ${visitLogId ? "updating" : "creating"} visit log`
      );
    }

    return resData?.data as IVisitLogs;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      in: "createOrEditVisitLogs catch",
    });
    return error;
  }
};

// delete a diagnosis report
export const deleteVisitLog = async (patientId: string, visitLogId: string) => {
  try {
    const user = await currentUser();
    if (!user || !user.staff) {
      throw new Error("Not authorized");
    }

    const res = await axiosInstance.delete(
      `/patient/${patientId}/visit-logs/${visitLogId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.auth.token}`,
        },
      }
    );

    console.log({ res, in: "deleteVisitLog res" });

    const resData = { status: true };

    return resData;
  } catch (error: any) {
    console.log({ error, in: "deleteVisitLog catch" });
    return error;
  }
};

// === APPOINTMENTS ===
// get all appointments for all patients
export const getAllAppointments = async (): Promise<IAppointment[]> => {
  try {
    const patients = await getChpsPatients();
    if (!patients) {
      throw new Error("No patients found");
    }

    const appointments: IAppointment[] = [];

    for (const patient of patients) {
      const appointmentsForPatient = await getPatientAppointments(patient._id);

      if (!appointmentsForPatient) {
        throw new Error("No appointments found");
      }

      appointments.push(...appointmentsForPatient);
    }

    return appointments;
  } catch (error: any) {
    console.log({ error, in: "getAllAppointments catch" });
    return error;
  }
};

// Get All Appointments
export const getPatientAppointments = async (
  patientId: string
): Promise<IAppointment[]> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized!");
    }

    const res = await axiosInstance.get(`/patient/${patientId}/appointments`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.auth.token}`,
      },
    });

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    const patient = await getPatient(patientId);

    if (!patient) {
      throw new Error("Patient not found");
    }

    const appointments = resData?.data as IAppointment[];

    return appointments.map((appointment) => {
      return {
        ...appointment,
        patient: patient,
      };
    });
  } catch (error: any) {
    console.log({ error, in: "getPatientAppointments catch" });
    return error;
  }
};

// Create or Edit a appointment
export const createOrEditAppointment = async (
  data: AppointmentType,
  patientId: string,
  appointmentId?: string
): Promise<IAppointment> => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized!");
    }

    const url = appointmentId
      ? `/patient/${patientId}/appointments/${appointmentId}`
      : `/patient/${patientId}/appointments`;

    const backendData = appointmentId
      ? {
          date: data.date,
          official: data.official,
          isClosed: data.isClosed === "true" ? true : false,
        }
      : {
          date: data.date,
          official: data.official,
          isClosed: false,
        };

    const res = await axiosInstance({
      url: url,
      method: appointmentId ? "PATCH" : "POST",
      data: backendData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = res.data;

    if (!resData?.status) {
      console.log({ error: resData, in: "Error if" });
      throw new Error(
        resData?.message ||
          `Error while ${appointmentId ? "updating" : "creating"} appointment`
      );
    }

    return resData?.data as IAppointment;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      messageInData: error?.response?.data?.message,
      in: "createOrEditAppointment catch",
    });
    return error;
  }
};

// delete a appointment
export const deleteAppointment = async (
  patientId: string,
  appointmentId: string
) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Not authorized");
    }

    const res = await axiosInstance.delete(
      `/patient/${patientId}/appointments/${appointmentId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.auth.token}`,
        },
      }
    );

    console.log({ res, in: "deleteAppointment res" });

    const resData = { status: true };

    return resData;
  } catch (error: any) {
    console.log({ error, in: "deleteAppointment catch" });
    return error;
  }
};

//  ====== MEDICAL HISTORY =======
// Get All Medical History
export const getMedicalHistory = async (
  patientId: string
): Promise<IMedicalHistory[]> => {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("Unauthorized!");
    }

    const res = await axiosInstance.get(
      `/patient/${patientId}/medical-history`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.auth.token}`,
        },
      }
    );

    const resData = await res.data;

    if (!resData?.status) {
      throw new Error(resData?.message);
    }

    return resData?.data as IMedicalHistory[];
  } catch (error: any) {
    console.log({ error, in: "getMedicalHistory catch" });
    return error;
  }
};

// Get a single medical history
export const getMedicalHistoryById = async (
  patientId: string,
  medicalHistoryId: string
): Promise<IMedicalHistory> => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("User not found");
    }

    const res = await axiosInstance.get(
      `/patient/${patientId}/medical-history/${medicalHistoryId}`,
      {
        headers: {
          Authorization: `Bearer ${user?.auth.token}`,
        },
      }
    );

    const resData = await res.data;

    if (resData?.status === "error") {
      throw new Error(resData?.message);
    }

    return resData?.data as IMedicalHistory;
  } catch (error: any) {
    console.log({ error, in: "getMedicalHistoryById catch" });
    return error;
  }
};

// Create or Edit a medical history
export const createOrEditMedicalHistory = async (
  data: MedicalHistoryType,
  patientId: string,
  medicalHistoryId?: string
): Promise<IMedicalHistory> => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("Unauthorized!");
    }

    const url = medicalHistoryId
      ? `/patient/${patientId}/medical-history/${medicalHistoryId}`
      : `/patient/${patientId}/medical-history/`;

    console.log({ url, data, user, in: "createOrEditMedicalHistory url" });

    const formData = {
      ...data,
      hadSurgeryComplication:
        data.hadSurgeryComplication === "true" ? true : false,
      wasSurgeryRequired: data.wasSurgeryRequired === "true" ? true : false,
      hasBreathingProblem: data.hasBreathingProblem === "true" ? true : false,
      hasSkinProblem: data.hasSkinProblem === "true" ? true : false,
      formUrl: data.formUrl as string,
    };

    console.log({ formData, in: "createOrEditMedicalHistory formData" });

    const res = await axiosInstance({
      url: url,
      method: medicalHistoryId ? "PATCH" : "POST",
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.auth.token}`,
      },
    });

    const resData = await res.data;

    console.log({ resData, res, in: "createOrEditMedicalHistory resData" });

    if (!resData?.status) {
      console.log({ error: resData, in: "Error if" });
      throw new Error(
        resData?.message ||
          `Error while ${medicalHistoryId ? "updating" : "creating"} medical history`
      );
    }

    return resData?.data as IMedicalHistory;
  } catch (error: any) {
    console.log({
      error,
      data: error?.response?.data,
      message: error?.respnse?.data?.message,
      in: "createOrEditMedicalHistory catch",
    });
    return error;
  }
};

// delete a medical history
export const deleteMedicalHistory = async (
  patientId: string,
  medicalHistoryId: string
) => {
  try {
    const user = await currentUser();
    if (!user || !user.staff) {
      throw new Error("Not authorized");
    }

    const res = await axiosInstance.delete(
      `/patient/${patientId}/medical-history/${medicalHistoryId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.auth.token}`,
        },
      }
    );

    console.log({ res, in: "deleteMedicalHistory res" });

    const resData = { status: true };

    return resData;
  } catch (error: any) {
    console.log({ error, in: "deleteMedicalHistory catch" });
    return error;
  }
};
