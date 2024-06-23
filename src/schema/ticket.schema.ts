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
