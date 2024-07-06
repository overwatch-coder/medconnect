import { z } from "zod";

export const ticketSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(1, { message: "Please enter a subject" })
    .max(100, { message: "Subject is too long" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Please enter a description" })
    .max(1000, { message: "Message is too long" }),
  attachment: z.any().optional(),
});

export const superAdminTicketSchema = z.object({
  requestedBy: z.string().trim().min(1, "This field cannot be empty"),
  ticketID: z.string().trim().min(1, "Please enter the ticket ID"),
  subject: z.string().trim().min(1, "Please enter the subject"),
  description: z.string().trim().min(1, "Please enter the description"),
  userId: z.string().optional(),
  priority: z.string().trim().min(1, "Priority is required"),
  createdAt: z.string().trim().min(1, "This field cannot be empty"),
  status: z.string().trim().min(1, "Please choose a status"),
});
