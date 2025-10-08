import { z } from "zod";

export const schema = () =>
    z.object({
        month: z.string().min(1, "Month is required"),
        total_amount: z
            .string()
            .min(1, "Total amount is required")
            .refine((v) => !isNaN(Number(v)), "Must be a number"),
        bill_category_id: z
            .string()
            .min(1, "Bill category is required"),
        flat_id: z
            .string()
            .min(1, "Flat is required"),
    });
