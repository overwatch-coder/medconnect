import { z } from "zod";

export const appointmentSchema = z.object({
  patientName: z.string().trim().min(1, "Patient Name is required"),
  patientID: z.string().trim().min(1, "Patient ID is required"),
  age: z.string().trim().min(1, "Age is required"),
  date: z.string().trim().min(1, "Date is required"),
  time: z.string().trim().min(1, "Time is required"),
  assignedHO: z.string().trim().min(1, "Assigned H.O is required"),
  phoneNumber: z.string().trim().min(1, "Phone Number is required"),
});

export const rescheduleAppointmentSchema = appointmentSchema.pick({
  date: true,
  time: true,
  patientID: true,
});
