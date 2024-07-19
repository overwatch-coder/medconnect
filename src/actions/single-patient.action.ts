"use server";

import { currentUser } from "@/actions/user.action";
import { axiosInstance } from "@/lib/utils";
import {
  IDiagnosisReport,
  IPrescription,
  ITreatmentPlan,
  IVisitLogs,
} from "@/types/backend";
import {
  DiagnosisReportType,
  PrescriptionType,
  TreatmentPlanType,
  VisitLogsType,
} from "@/types/index";

// === PRESCRIPTIONS ===
// Get All Prescriptions
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
