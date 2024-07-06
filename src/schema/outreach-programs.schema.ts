import { z } from "zod";

export const programSchema = z.object({
  title: z.string().min(1, "Program title is required"),
  description: z.string().min(1, "Program description is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  targetGroup: z.string().min(1, "Target group is required"),
  numberOfParticipants: z.coerce
    .number()
    .min(1, "Number of participants is required"),
  location: z.string().min(1, "Location is required"),
  programDate: z.string().min(1, "Program date is required"),
  programStartTime: z.string().min(1, "Program start time is required"),
  organizerName: z.string().optional(),
  organization: z.string().optional(),
  id: z.string().optional(),
  image: z.string().optional(),
});

export const outreachProgramSchema = programSchema.superRefine((data, ctx) => {
  if (data.organizerName && !data.organization) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Organization is required if organizer name is provided",
      path: ["organization"],
    });
  }
});
