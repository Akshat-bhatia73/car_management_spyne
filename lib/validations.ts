import { z } from "zod";

export const carSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.string()).min(1).max(10),
  tags: z.object({
    car_type: z.string().min(1, "Car type is required"),
    company: z.string().min(1, "Company is required"),
    dealer: z.string().min(1, "Dealer is required"),
  }),
  userId: z.string().optional(),
});

export type CarFormData = z.infer<typeof carSchema>; 