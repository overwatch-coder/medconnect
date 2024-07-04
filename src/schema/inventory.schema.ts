import { z } from "zod";

export const inventorySchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productType: z.string().min(1, "Product type is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  expiryDate: z.string().min(1, "Expiry date is required"),
  inStock: z.string().min(1, "In stock is required"),
  receivedDate: z.string().min(1, "Received date is required"),
});
